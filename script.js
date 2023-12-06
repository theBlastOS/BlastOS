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

function updateHeader() {
    if (!header) header = document.querySelector('.header');
    
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
    }
}, { passive: true });

// Optimized animation with cached elements and intersection observer
let animationElements = [];
let animationTicking = false;

function animateOnScroll() {
    if (!animationTicking) {
        requestAnimationFrame(() => {
            const windowHeight = window.innerHeight;
            const elementVisible = 150;
            
            animationElements.forEach(element => {
                if (!element.animated) {
                    const elementTop = element.getBoundingClientRect().top;
                    if (elementTop < windowHeight - elementVisible) {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                        element.animated = true;
                    }
                }
            });
            
            animationTicking = false;
        });
        animationTicking = true;
    }
}

// Initialize animation styles with caching
function initAnimations() {
    animationElements = [...document.querySelectorAll('.feature-card, .download-card, .stat')];
    
    animationElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        element.animated = false;
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

// Add loading animation
function showLoadingAnimation() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'loading-overlay';
    const loadingText = typeof i18n !== 'undefined' ? i18n.t('loading') : '正在加载 BlastOS...';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>${loadingText}</p>
        </div>
    `;
    
    const loadingStyles = `
        #loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            color: white;
        }
        
        .loading-spinner {
            text-align: center;
        }
        
        .spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-top: 3px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = loadingStyles;
    document.head.appendChild(styleSheet);
    document.body.appendChild(loadingOverlay);
    
    // Remove loading overlay after 2 seconds
    setTimeout(() => {
        loadingOverlay.style.opacity = '0';
        loadingOverlay.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            loadingOverlay.remove();
            styleSheet.remove();
        }, 500);
    }, 2000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    showLoadingAnimation();
    initAnimations();
    addButtonEffects();
    addRippleStyles();
    updateLanguageButton();
    
    // Add scroll listener for animations
    window.addEventListener('scroll', animateOnScroll);
    
    // Trigger initial animation check
    setTimeout(animateOnScroll, 100);
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
    
    // Optimized parallax effect (removed duplicate ticking variable)
    
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

// Add Easter egg
let clickCount = 0;
document.querySelector('.logo h1').addEventListener('click', () => {
    clickCount++;
    if (clickCount === 5) {
        const easterEggMessage = i18n.t('easter-egg');
        alert(easterEggMessage);
        clickCount = 0;
    }
});