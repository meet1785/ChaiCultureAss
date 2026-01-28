/**
 * Chai Culture - Coming Soon Landing Page
 * Interactive JavaScript Features
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initEmailSignup();
    initSmoothAnimations();
    initParallaxEffects();
    initMagneticButtons();
    initCursorGlow();
    initTypingEffect();
});

/**
 * Email Signup Form Handler
 * Handles form submission with validation and success feedback
 */
function initEmailSignup() {
    const form = document.getElementById('signupForm');
    const emailInput = document.getElementById('emailInput');
    const successMessage = document.getElementById('successMessage');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        // Validate email
        if (!isValidEmail(email)) {
            showError(emailInput, 'Please enter a valid email address');
            return;
        }
        
        // Simulate form submission
        submitEmail(email)
            .then(() => {
                // Show success message
                form.style.display = 'none';
                successMessage.classList.add('show');
                
                // Store email in localStorage (for demo purposes)
                storeEmail(email);
                
                // Optional: Track conversion
                trackConversion('email_signup');
            })
            .catch((error) => {
                console.error('Submission error:', error);
                showError(emailInput, 'Something went wrong. Please try again.');
            });
    });
    
    // Clear error state on input
    emailInput.addEventListener('input', function() {
        clearError(this);
    });
}

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - Whether email is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Simulate email submission
 * In production, replace with actual API call
 * @param {string} email - Email address to submit
 * @returns {Promise} - Resolves when submission is complete
 */
function submitEmail(email) {
    return new Promise((resolve, reject) => {
        // Simulate network request
        const submitBtn = document.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const originalText = btnText.textContent;
        
        // Show loading state
        btnText.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // Simulate success (90% of the time)
            if (Math.random() > 0.1) {
                resolve({ success: true, email });
            } else {
                btnText.textContent = originalText;
                submitBtn.disabled = false;
                reject(new Error('Network error'));
            }
        }, 1500);
    });
}

/**
 * Store email in localStorage
 * @param {string} email - Email to store
 */
function storeEmail(email) {
    try {
        const emails = JSON.parse(localStorage.getItem('chaiCultureEmails') || '[]');
        emails.push({
            email,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('chaiCultureEmails', JSON.stringify(emails));
    } catch (e) {
        console.warn('Could not store email in localStorage:', e);
    }
}

/**
 * Show error state on input
 * @param {HTMLElement} input - Input element
 * @param {string} message - Error message
 */
function showError(input, message) {
    const wrapper = input.closest('.input-wrapper');
    wrapper.style.borderColor = '#c0392b';
    wrapper.style.animation = 'shake 0.5s ease';
    
    // Create or update error message
    let errorEl = wrapper.parentElement.querySelector('.error-message');
    if (!errorEl) {
        errorEl = document.createElement('p');
        errorEl.className = 'error-message';
        errorEl.style.cssText = 'color: #c0392b; font-size: 0.85rem; margin-top: 0.5rem; text-align: center;';
        wrapper.parentElement.insertBefore(errorEl, wrapper.nextSibling);
    }
    errorEl.textContent = message;
    
    // Remove shake animation after it completes
    setTimeout(() => {
        wrapper.style.animation = '';
    }, 500);
}

/**
 * Clear error state on input
 * @param {HTMLElement} input - Input element
 */
function clearError(input) {
    const wrapper = input.closest('.input-wrapper');
    wrapper.style.borderColor = 'transparent';
    
    const errorEl = wrapper.parentElement.querySelector('.error-message');
    if (errorEl) {
        errorEl.remove();
    }
}

/**
 * Track conversion events
 * In production, integrate with analytics
 * @param {string} eventName - Name of the event
 */
function trackConversion(eventName) {
    // Placeholder for analytics integration
    console.log(`Conversion tracked: ${eventName}`);
    
    // Example: Google Analytics
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', eventName, {
    //         'event_category': 'engagement',
    //         'event_label': 'coming_soon_page'
    //     });
    // }
}

/**
 * Initialize smooth scroll-triggered animations
 * Using Intersection Observer for performance
 */
function initSmoothAnimations() {
    // Add shake keyframes dynamically
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(styleSheet);
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Initialize subtle parallax effects
 * Adds depth to decorative elements
 */
function initParallaxEffects() {
    const ornaments = document.querySelectorAll('.ornament');
    const steamContainer = document.querySelector('.steam-container');
    
    if (ornaments.length === 0 && !steamContainer) return;
    
    // Throttle function for performance
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
    
    // Mouse move handler for subtle parallax
    const handleMouseMove = throttle((e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        // Calculate offset from center (normalized -1 to 1)
        const xOffset = (clientX / innerWidth - 0.5) * 2;
        const yOffset = (clientY / innerHeight - 0.5) * 2;
        
        // Apply subtle movement to ornaments
        ornaments.forEach((ornament, index) => {
            const multiplier = (index % 2 === 0) ? 1 : -1;
            const movement = 10 * multiplier;
            ornament.style.transform = `translate(${xOffset * movement}px, ${yOffset * movement}px)`;
        });
        
        // Apply movement to steam
        if (steamContainer) {
            steamContainer.style.transform = `translateX(${xOffset * 5}px)`;
        }
    }, 50);
    
    // Only enable on devices that likely have a mouse
    if (window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', handleMouseMove);
    }
}

/**
 * Utility: Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} - Debounced function
 */
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

// Add visible class styles
const visibleStyles = document.createElement('style');
visibleStyles.textContent = `
    [data-animate] {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    [data-animate].visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .cursor-glow {
        position: fixed;
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 0;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(visibleStyles);

/**
 * Magnetic effect for buttons and social links
 * Elements slightly move towards cursor on hover
 */
function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.social-link, .submit-btn');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

/**
 * Cursor glow effect
 * Creates a subtle golden glow that follows the cursor
 */
function initCursorGlow() {
    // Only on desktop devices
    if (!window.matchMedia('(pointer: fine)').matches) return;
    
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);
    
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth follow animation
    function animateGlow() {
        const dx = mouseX - glowX;
        const dy = mouseY - glowY;
        
        glowX += dx * 0.1;
        glowY += dy * 0.1;
        
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
        
        requestAnimationFrame(animateGlow);
    }
    
    animateGlow();
    
    // Hide when mouse leaves window
    document.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        glow.style.opacity = '1';
    });
}

/**
 * Typing effect for the tagline
 * Reveals text character by character
 */
function initTypingEffect() {
    const tagline = document.querySelector('.tagline');
    if (!tagline) return;
    
    const text = tagline.textContent;
    tagline.textContent = '';
    tagline.style.opacity = '1';
    
    let i = 0;
    const speed = 50;
    
    function typeWriter() {
        if (i < text.length) {
            tagline.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    
    // Start after a short delay
    setTimeout(typeWriter, 800);
}

/**
 * Add sparkle effect on click anywhere on page
 */
document.addEventListener('click', function(e) {
    createSparkle(e.clientX, e.clientY);
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 20px;
        height: 20px;
        pointer-events: none;
        z-index: 9999;
    `;
    
    // Create multiple particles
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        const angle = (i / 8) * Math.PI * 2;
        const velocity = 50 + Math.random() * 50;
        
        particle.style.cssText = `
            position: absolute;
            width: 6px;
            height: 6px;
            background: linear-gradient(135deg, #D4AF37, #F4E4BA);
            border-radius: 50%;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            animation: sparkleParticle 0.6s ease-out forwards;
            --tx: ${Math.cos(angle) * velocity}px;
            --ty: ${Math.sin(angle) * velocity}px;
        `;
        
        sparkle.appendChild(particle);
    }
    
    document.body.appendChild(sparkle);
    
    // Add keyframes if not exists
    if (!document.querySelector('#sparkle-keyframes')) {
        const style = document.createElement('style');
        style.id = 'sparkle-keyframes';
        style.textContent = `
            @keyframes sparkleParticle {
                0% {
                    transform: translate(-50%, -50%) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Remove after animation
    setTimeout(() => sparkle.remove(), 600);
}
