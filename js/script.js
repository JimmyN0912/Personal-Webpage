document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    
    if (burger) {
        burger.addEventListener('click', function() {
            nav.classList.toggle('open');
            burger.classList.toggle('toggle');
        });
    }
    
    // Project filtering in projects.html
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.dataset.filter;
                
                projectCards.forEach(card => {
                    const categories = card.dataset.category.split(' ');
                    if (filter === 'all' || categories.includes(filter)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send this data to a server
            // For demo purposes, we'll just log it and show a success message
            console.log({name, email, subject, message});
            
            // Show success message
            alert('Thank you for your message! I\'ll get back to you soon.');
            
            // Clear form
            contactForm.reset();
        });
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.project-card, .post-card, .skill, .timeline-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    // Initial check on load
    animateOnScroll();
    
    // Image modal functionality
    const modal = document.getElementById('imageModal');
    const modalImages = document.querySelectorAll('.modal-image');
    
    if (modal && modalImages.length > 0) {
        const modalImg = document.getElementById("modalImage");
        const captionText = document.getElementById("caption");
        
        modalImages.forEach(img => {
            img.addEventListener('click', function() {
                modal.style.display = "block";
                modalImg.src = this.src;
                captionText.innerHTML = this.alt;
            });
        });
        
        // Close modal when clicking the × button
        const closeBtn = document.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.style.display = "none";
            });
        }
        
        // Close modal when clicking outside the image
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    }
});

// Prevent handling contact form in script.js if contact.js is loaded
if (typeof window.contactJsLoaded === 'undefined') {
    window.contactJsLoaded = true;
    console.log("Contact form handling delegated to contact.js");
    
    // Check if we have a contactForm
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Remove any existing handlers from script.js
        const newForm = contactForm.cloneNode(true);
        contactForm.parentNode.replaceChild(newForm, contactForm);
    }
}
