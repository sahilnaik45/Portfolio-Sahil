// DOM Elements
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
const form = document.getElementById('contactForm');

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Generate skills cards
    generateSkills();
    
    // Generate projects cards
    generateProjects();
    
    // Setup CV download
    setupCvDownload();
});

// Updated Skills Data
const skills = [
    {
        icon: 'fab fa-html5',
        name: 'HTML5',
        description: 'Semantic markup, responsive design'
    },
    {
        icon: 'fab fa-css3-alt',
        name: 'CSS3',
        description: 'Modern layouts, animations'
    },
    {
        icon: 'fab fa-js',
        name: 'JavaScript',
        description: 'DOM manipulation, ES6+ features'
    },
    {
        icon: 'fab fa-bootstrap',
        name: 'Bootstrap',
        description: 'Responsive frameworks'
    },
    {
        icon: 'fab fa-python',
        name: 'Python',
        description: 'Scripting, problem-solving, automation'
    },
    {
        icon: 'fas fa-database',
        name: 'MySQL',
        description: 'Database management'
    },
    {
        icon: 'fas fa-code',
        name: 'C Programming',
        description: 'Algorithm implementation'
    },
    {
        icon: 'fas fa-language',
        name: 'Multilingual',
        description: 'English, Hindi, Marathi'
    }
];

// Generate Skills Cards
function generateSkills() {
    const skillsGrid = document.querySelector('.skills-grid');

    skills.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card card-hover-effect';
        skillCard.setAttribute('data-aos', 'fade-up');

        skillCard.innerHTML = `
            <div class="skill-icon">
                <i class="${skill.icon}"></i>
            </div>
            <h3 class="skill-name">${skill.name}</h3>
            <p class="skill-description">${skill.description}</p>
        `;

        // Simplified 3D tilt effect
        skillCard.addEventListener('mousemove', (e) => {
            const rect = skillCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const xAxis = (centerX - x) / 40; // Lower sensitivity
            const yAxis = (centerY - y) / 40;

            skillCard.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });

        skillCard.addEventListener('mouseenter', () => {
            skillCard.style.transition = 'transform 0.2s ease';
        });

        skillCard.addEventListener('mouseleave', () => {
            skillCard.style.transition = 'transform 0.5s ease';
            skillCard.style.transform = 'rotateY(0deg) rotateX(0deg)';
        });

        skillsGrid.appendChild(skillCard);
    });
}

// Projects Data
const projects = [
    {
        title: 'PAW PALACE',
        image: 'pawpalace.png',
        tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
        demo: 'https://raw.githack.com/sahilnaik45/paw-palace/refs/heads/main/index.html',
        code: 'https://github.com/sahilnaik45/paw-palace.git'
    },
    {
        title: 'The Hitmans Legacy',
        image: 'the hitmans legacy.png',
        tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
        demo: 'https://raw.githack.com/sahilnaik45/The-Hitmans-Legacy/refs/heads/main/rohit.html',
        code: 'https://github.com/sahilnaik45/The-Hitmans-Legacy.git'
    },
];

// Generate Project Cards
function generateProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card card-hover-effect';
        projectCard.setAttribute('data-aos', 'fade-up');
        
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <div class="project-tech">
                    ${project.tech.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                </div>
                <div class="project-buttons">
                    <a href="${project.demo}" class="demo-button">Live Demo</a>
                    <a href="${project.code}" class="code-button">View Code</a>
                </div>
            </div>
        `;
        
        // Improved 3D tilt effect with better button interaction
        projectCard.addEventListener('mousemove', (e) => {
            // Don't apply tilt if mouse is over buttons
            if (e.target.closest('.project-buttons')) return;
            
            const rect = projectCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // More subtle tilt values
            const xAxis = (centerX - x) / 30; // Reduced sensitivity
            const yAxis = (centerY - y) / 30; // Reduced sensitivity
            
            projectCard.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
            
            // Subtler shadow effect
            const shadowX = -xAxis;
            const shadowY = yAxis;
            projectCard.style.boxShadow = `${shadowX}px ${shadowY}px 15px rgba(0, 0, 0, 0.15)`;
        });
        
        projectCard.addEventListener('mouseenter', () => {
            projectCard.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
        
        projectCard.addEventListener('mouseleave', () => {
            projectCard.style.transition = 'all 0.5s ease';
            projectCard.style.transform = 'rotateY(0deg) rotateX(0deg)';
            projectCard.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        });
        
        // Disable tilt when hovering over buttons
        const buttons = projectCard.querySelectorAll('.project-buttons a');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                projectCard.style.transform = 'none';
                projectCard.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
            });
        });
        
        projectsGrid.appendChild(projectCard);
    });
}

// CV Download Functionality
function setupCvDownload() {
    const downloadCvButton = document.querySelector('.about-buttons .outline');
    if (downloadCvButton) {
        downloadCvButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create a temporary anchor element
            const link = document.createElement('a');
            link.href = 'SAHIL NAIK.docx'; // Update this path to your CV file
            link.download = 'SAHIL NAIK.docx'; // Customize the downloaded filename
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});