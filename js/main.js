// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Project modal functionality
    const projectCards = document.querySelectorAll('.project-card');
    const projectModal = document.querySelector('.project-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalBody = document.querySelector('.modal-body');
    
    if (projectCards.length > 0 && projectModal && closeModal && modalBody) {
        projectCards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('btn')) {
                    const projectId = card.getAttribute('data-project');
                    const projectTitle = card.querySelector('h3').textContent;
                    const projectDesc = card.querySelector('p').textContent;
                    const projectTech = card.querySelector('.project-tech').innerHTML;
                    const projectImg = card.querySelector('img').src;
                    
                    modalBody.innerHTML = `
                        <div class="modal-image">
                            <img src="${projectImg}" alt="${projectTitle}">
                        </div>
                        <h2>${projectTitle}</h2>
                        <p class="modal-description">${projectDesc}</p>
                        <div class="modal-tech">${projectTech}</div>
                        <div class="modal-actions">
                            <a href="#" class="btn primary-btn">View Live</a>
                            <a href="#" class="btn secondary-btn">Source Code</a>
                        </div>
                    `;
                    
                    projectModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
        
        closeModal.addEventListener('click', () => {
            projectModal.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                projectModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});

// Button effects
document.addEventListener('DOMContentLoaded', function() {
    // Apply button effects to all buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Add green glow effect
        button.style.boxShadow = '0 0 10px rgba(0, 255, 128, 0.3)';
        
        // Add hover effect
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 0 15px rgba(0, 255, 128, 0.6), 0 0 30px rgba(0, 255, 128, 0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '0 0 10px rgba(0, 255, 128, 0.3)';
        });
        
        // Add click/ripple effect
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(function() {
                ripple.remove();
            }, 600);
        });
    });
});