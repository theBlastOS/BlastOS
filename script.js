// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Optimized scroll event listener with throttling
let ticking = false;
let header = null;
let lastScrollY = 0;

function updateHeader() {
    if (!header) header = document.querySelector('.header');
    
    const currentScrollY = window.scrollY;
    
    // Only update if scroll position changed significantly
    if (Math.abs(currentScrollY - lastScrollY) > 10) {
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        lastScrollY = currentScrollY;
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
    }
}, { passive: true });

// Optimized animation with Intersection Observer API
let observer = null;

function createIntersectionObserver() {
    if ('IntersectionObserver' in window) {
        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.animated) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.animated = true;
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
    }
    return observer;
}

// Fallback for browsers without Intersection Observer
function animateOnScrollFallback() {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;
    
    document.querySelectorAll('.feature-card, .download-card, .stat').forEach(element => {
        if (!element.animated) {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                element.animated = true;
            }
        }
    });
}

// Initialize animation styles with caching
function initAnimations() {
    const animationElements = document.querySelectorAll('.feature-card, .download-card, .stat');
    
    animationElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        element.animated = false;
        
        // Use Intersection Observer if available
        if (observer) {
            observer.observe(element);
        }
    });
}

// Optimized button effects with event delegation
function addButtonEffects() {
    document.addEventListener('click', function(e) {
        if (e.target.matches('.btn')) {
            const button = e.target;
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
            `;
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
    });
}

// Add ripple effect styles
function addRippleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Mobile menu toggle (for future enhancement)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-open');
}

// Simplified loading animation (removed as it might hurt performance)
function showLoadingAnimation() {
    // Skip loading animation for better performance
    // Real loading indicators should be based on actual resource loading
    return;
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create intersection observer first
    observer = createIntersectionObserver();
    
    initAnimations();
    addButtonEffects();
    addRippleStyles();
    updateLanguageButton();
    
    // Add fallback scroll listener if Intersection Observer not supported
    if (!observer) {
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(animateOnScrollFallback);
                ticking = true;
            }
        }, { passive: true });
        
        // Trigger initial animation check
        setTimeout(animateOnScrollFallback, 100);
    }
});

// Enhanced interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Desktop icons interaction
    const desktopIcons = document.querySelectorAll('.desktop-icon');
    
    desktopIcons.forEach((icon, index) => {
        icon.addEventListener('click', () => {
            icon.style.transform = 'scale(1.3) rotateZ(10deg)';
            icon.style.filter = 'brightness(1.2)';
            setTimeout(() => {
                icon.style.transform = 'scale(1) rotateZ(0deg)';
                icon.style.filter = 'brightness(1)';
            }, 300);
        });
        
        // Add staggered animation on load
        icon.style.animation = `fadeInUp 0.6s ease ${index * 0.2}s both`;
    });
    
    // Enhanced performance optimizations
    
    // Add window dragging effect (visual only)
    const window = document.querySelector('.window');
    let isDragging = false;
    let startX, startY, startLeft, startTop;
    
    window.addEventListener('mousedown', (e) => {
        if (e.target.closest('.window-header')) {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            startLeft = window.offsetLeft;
            startTop = window.offsetTop;
            window.style.cursor = 'grabbing';
        }
    });
    
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            window.style.transform = `perspective(1000px) rotateY(-5deg) rotateX(5deg) translate(${deltaX * 0.1}px, ${deltaY * 0.1}px)`;
        }
    });
    
    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            window.style.cursor = 'default';
            window.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(5deg)';
        }
    });
});

// Language toggle functionality
function toggleLanguage() {
    const currentLang = i18n.getCurrentLanguage();
    const newLang = currentLang === 'zh-CN' ? 'en' : 'zh-CN';
    i18n.setLanguage(newLang);
    updateLanguageButton();
}

function updateLanguageButton() {
    const currentLangSpan = document.getElementById('current-lang');
    const currentLang = i18n.getCurrentLanguage();
    
    if (currentLangSpan) {
        currentLangSpan.textContent = currentLang === 'zh-CN' ? '中文' : 'English';
    }
}

// Add Easter egg with better performance
let clickCount = 0;
let logoElement = null;

document.addEventListener('DOMContentLoaded', () => {
    logoElement = document.querySelector('.logo h1');
    if (logoElement) {
        logoElement.addEventListener('click', () => {
            clickCount++;
            if (clickCount === 5) {
                const easterEggMessage = typeof i18n !== 'undefined' ? i18n.t('easter-egg') : '🎉 你发现了一个彩蛋！BlastOS 即将改变世界！';
                alert(easterEggMessage);
                clickCount = 0;
            }
        });
    }
});