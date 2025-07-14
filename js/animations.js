// Stats counter animation
document.addEventListener('DOMContentLoaded', () => {
    // Set copyright year
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Animate stats when they come into view
    const stats = document.querySelectorAll('.stat-number');
    
    if (stats.length > 0) {
        const animateStats = () => {
            stats.forEach(stat => {
                const rect = stat.getBoundingClientRect();
                const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;
                
                if (isVisible && !stat.classList.contains('animated')) {
                    stat.classList.add('animated');
                    const target = parseFloat(stat.getAttribute('data-count'));
                    const duration = 2000; // 2 seconds
                    const startTime = performance.now();
                    const isInteger = Number.isInteger(target);
                    
                    const updateCounter = (currentTime) => {
                        const elapsedTime = currentTime - startTime;
                        const progress = Math.min(elapsedTime / duration, 1);
                        const value = progress * target;
                        
                        if (isInteger) {
                            stat.textContent = Math.floor(value) + '+';
                        } else {
                            stat.textContent = value.toFixed(1);
                        }
                        
                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        }
                    };
                    
                    requestAnimationFrame(updateCounter);
                }
            });
        };
        
        // Run on scroll
        window.addEventListener('scroll', animateStats);
        // Run once on page load
        animateStats();
    }
    
    // Scroll animations for elements
    const scrollAnimateElements = document.querySelectorAll('.scroll-animate');
    
    const animateOnScroll = () => {
        scrollAnimateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150; // Adjust this value to change when the animation triggers
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    // Run once on page load
    animateOnScroll();
    
    // Add sequential animations for sections
    const addSequentialAnimations = () => {
        // Get all sections
        const sections = document.querySelectorAll('section');
        
        // Create an Intersection Observer
        // Enhanced animations for minimal white theme
        
        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    // Add staggered animation to child elements
                    const children = entry.target.querySelectorAll('.card, .tech-item, .timeline-item');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.style.animationDelay = `${index * 0.1}s`;
                            child.classList.add('fade-in');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);
        
        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
        
        // Button ripple effect
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        // Enhanced mobile navigation
        const navToggle = document.querySelector('.nav-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navLinks.classList.toggle('active');
                
                // Prevent body scroll when menu is open
                document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
            });
        }
        
        // Close mobile menu when clicking on links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
        
        // Smooth hover animations for cards
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Copyright year
        document.getElementById('year').textContent = new Date().getFullYear();
    }
    
    // Add hover animations for form elements
    const formElements = document.querySelectorAll('.contact-form input, .contact-form textarea');
    formElements.forEach(element => {
        element.addEventListener('mouseover', () => {
            element.style.borderColor = 'var(--primary-light)';
        });
        
        element.addEventListener('mouseout', () => {
            if (!element.matches(':focus')) {
                element.style.borderColor = '';
            }
        });
    });
    
    // Add special effects for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        // Hover effect
        button.addEventListener('mouseover', () => {
            button.classList.add('hover-effect');
        });
        
        button.addEventListener('mouseout', () => {
            button.classList.remove('hover-effect');
        });
        
        // Click/ripple effect
        button.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            // Position the ripple
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            // Remove ripple after animation completes
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Enhanced scroll animations
    const scrollElements = document.querySelectorAll('.scroll-animate');
    
    // Create different animation classes
    const animations = ['fadeIn', 'slideInLeft', 'slideInRight', 'slideUp', 'popIn'];
    
    // Assign random animations to elements without specific animation classes
    scrollElements.forEach(element => {
        // Skip elements that already have specific animation classes
        const hasAnimationClass = animations.some(animation => 
            element.classList.contains(animation));
            
        if (!hasAnimationClass) {
            // Get random animation
            const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
            element.classList.add(randomAnimation);
        }
    });
});