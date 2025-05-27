// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const mobileDarkModeToggle = document.getElementById('mobileDarkModeToggle');
const html = document.documentElement;

// Check for saved user preference or system preference
const savedMode = localStorage.getItem('darkMode');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedMode === 'dark' || (!savedMode && systemPrefersDark)) {
    enableDarkMode();
}

// Toggle dark mode
darkModeToggle.addEventListener('click', toggleDarkMode);
mobileDarkModeToggle.addEventListener('click', toggleDarkMode);

function toggleDarkMode() {
    if (html.classList.contains('dark')) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
}

function enableDarkMode() {
    html.classList.add('dark');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    mobileDarkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem('darkMode', 'dark');
}

function disableDarkMode() {
    html.classList.remove('dark');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    mobileDarkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem('darkMode', 'light');
}

// Listen for system color scheme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('darkMode')) {
        if (e.matches) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    }
});