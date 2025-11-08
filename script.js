// ============================================
// THEME TOGGLE FUNCTIONALITY
// ============================================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const logo = document.querySelector('header img');

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', currentTheme);

// Set initial logo based on theme
if (currentTheme === 'light') {
    logo.src = 'src/glogoblack.png';
} else {
    logo.src = 'src/g logo white.png';
}

themeToggle.addEventListener('click', () => {
    const theme = body.getAttribute('data-theme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Change logo based on theme
    if (newTheme === 'light') {
        logo.src = 'src/glogoblack.png';
    } else {
        logo.src = 'src/g logo white.png';
    }
});


// ============================================
// HAMBURGER MENU FUNCTIONALITY
// ============================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const mobileOverlay = document.getElementById('mobile-overlay');

function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
}

function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    mobileOverlay.classList.remove('active');
    body.style.overflow = '';
}

hamburger.addEventListener('click', toggleMenu);

// Close menu when clicking on overlay
mobileOverlay.addEventListener('click', closeMenu);

// Close menu when clicking on a link
const menuLinks = document.querySelectorAll('header nav a');
menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});


// ============================================
// RETRACTABLE HEADER ON SCROLL
// ============================================
let lastScrollTop = 0;
const header = document.querySelector('header');
const scrollThreshold = 100;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class for styling
    if (scrollTop > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }

    // Hide/show header based on scroll direction
    if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
        // Scrolling down
        header.classList.add('header-hidden');
    } else {
        // Scrolling up
        header.classList.remove('header-hidden');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});


// ============================================
// SCROLL SPY NAVIGATION
// ============================================
const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('.nav-link');

const scrollSpyOptions = {
    threshold: 0.3,
    rootMargin: '-100px 0px -60% 0px'
};

const scrollSpyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            
            // Remove active class from all links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to current section's link
            const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}, scrollSpyOptions);

// Observe all sections for scroll spy
sections.forEach(section => {
    scrollSpyObserver.observe(section);
});


// ============================================
// SCROLL-TRIGGERED ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);


// ============================================
// INITIALIZE ON DOM CONTENT LOADED
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Animate sections
    const animateSections = document.querySelectorAll('main section');
    animateSections.forEach((section) => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });

    // Animate service list items
    const serviceItems = document.querySelectorAll('.service-list li');
    serviceItems.forEach((item) => {
        item.classList.add('animate-on-scroll');
        observer.observe(item);
    });

    // Animate contact info items
    const contactItems = document.querySelectorAll('.contact-info li');
    contactItems.forEach((item) => {
        item.classList.add('animate-on-scroll');
        observer.observe(item);
    });

    // Animate about image
    const aboutImg = document.querySelector('#about img');
    if (aboutImg) {
        aboutImg.classList.add('animate-scale');
        observer.observe(aboutImg);
    }

    // Smooth scroll for navigation links
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 10;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Manually set active state immediately for better UX
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
});


// ============================================
// RESPONSIVE UTILITIES
// ============================================

// Detect screen size changes
let isMobile = window.innerWidth <= 768;

window.addEventListener('resize', () => {
    const wasMobile = isMobile;
    isMobile = window.innerWidth <= 768;
    
    // If switching from mobile to desktop, close menu
    if (wasMobile && !isMobile) {
        closeMenu();
    }
});


// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Debounce function for scroll events (if needed for additional features)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events (if needed for additional features)
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}


// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Handle keyboard navigation for menu
document.addEventListener('keydown', (e) => {
    // Close menu on Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMenu();
    }
});

// Focus trap for mobile menu
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

navMenu.addEventListener('keydown', (e) => {
    if (!navMenu.classList.contains('active')) return;
    
    const focusableContent = navMenu.querySelectorAll(focusableElements);
    const firstFocusable = focusableContent[0];
    const lastFocusable = focusableContent[focusableContent.length - 1];
    
    // Tab key
    if (e.key === 'Tab') {
        if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
            }
        } else {
            // Tab
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    }
});


// ============================================
// CONSOLE LOG FOR DEBUGGING
// ============================================
console.log('🚀 Portfolio JavaScript loaded successfully!');
console.log('✅ Theme toggle initialized');
console.log('✅ Hamburger menu initialized');
console.log('✅ Scroll spy active');
console.log('✅ Animations ready');
console.log('✅ Responsive features enabled');

