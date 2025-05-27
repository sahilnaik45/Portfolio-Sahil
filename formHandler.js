// Initialize EmailJS (replace with your own User ID)
(function() {
    emailjs.init('_ue9dNboWumtIOZF4'); // Replace with your actual EmailJS user ID
})();

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formGroups = document.querySelectorAll('.form-group');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Simple validation
    if (!name || !email || !message) {
        showAlert('Please fill in all fields', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showAlert('Please enter a valid email address', 'error');
        return;
    }
    
    // Send email using EmailJS
    emailjs.sendForm('service_afzx1gj', 'template_e0q1r2i', this)
        .then(() => {
            showAlert('Message sent successfully!', 'success');
            contactForm.reset();
        }, (error) => {
            showAlert('Failed to send message. Please try again.', 'error');
            console.error('EmailJS Error:', error);
        });
});

// Helper function to validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show alert message
function showAlert(message, type) {
    // Remove any existing alerts
    const existingAlert = document.querySelector('.form-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    const alert = document.createElement('div');
    alert.className = `form-alert ${type}`;
    alert.textContent = message;
    
    contactForm.insertBefore(alert, contactForm.firstChild);
    
    // Remove alert after 5 seconds
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

// Add focus effects to form inputs
formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    const label = group.querySelector('label');
    
    input.addEventListener('focus', () => {
        label.style.color = '#6366f1';
        group.querySelector('.form-border').style.width = '100%';
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            label.style.color = '#94a3b8';
            group.querySelector('.form-border').style.width = '0';
        }
    });
    
    // Initialize labels for prefilled values (if any)
    if (input.value) {
        label.style.top = '-0.5rem';
        label.style.left = '0';
        label.style.fontSize = '0.8rem';
        label.style.color = '#6366f1';
        group.querySelector('.form-border').style.width = '100%';
    }
});