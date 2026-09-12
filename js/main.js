// Back to Top Button
const backToTop = document.getElementById('backToTop');

if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
}

// Dark/Light Mode
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)');

function applyTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
    }

    if (themeToggle) {
        themeToggle.textContent =
            theme === 'light'
                ? 'Dark Mode'
                : 'Light Mode';
    }
}

// Use saved preference first
// If there is no saved preference, follow the OS theme
if (savedTheme) {
    applyTheme(savedTheme);
} else {
    applyTheme(
        systemPrefersLight.matches
            ? 'light'
            : 'dark'
    );
}

// Manual theme toggle
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const newTheme =
            document.body.classList.contains('light-mode')
                ? 'dark'
                : 'light';

        // Save the user's choice
        // so it stays across all pages.
        localStorage.setItem('theme', newTheme);

        applyTheme(newTheme);
    });
}

// If there is no saved preference, automatically follow OS theme changes
systemPrefersLight.addEventListener('change', (event) => {
    if (!localStorage.getItem('theme')) {
        applyTheme(
            event.matches
                ? 'light'
                : 'dark'
        );
    }
});