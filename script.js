document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const mapLink = document.querySelector('#mapLink');
    const mapContainer = document.querySelector('#mapContainer');
    const navItems = document.querySelectorAll('.nav-links a');

    // Hamburger menu toggle
    if (hamburger && navLinks) {
        const toggleMenu = () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            // Prevent body scroll when menu is open
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        };

        hamburger.addEventListener('click', toggleMenu);

        // Close menu when clicking a nav link
        navItems.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && 
                !navLinks.contains(e.target) && 
                navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Map toggle functionality
    if (mapLink && mapContainer) {
        mapLink.addEventListener('click', (e) => {
            e.preventDefault();
            mapContainer.classList.toggle('hidden');
            mapLink.textContent = mapContainer.classList.contains('hidden') 
                ? 'View Our Location on Map' 
                : 'Hide Map';
            
            // Smooth scroll to map when showing it
            if (!mapContainer.classList.contains('hidden')) {
                setTimeout(() => {
                    mapContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            }
        });
    }

    // Smooth scroll for all internal links
    document.querySelectorAll('a[href^="./"], a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Add active state to current page nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navItems.forEach(link => {
        const linkPage = link.getAttribute('href').replace('./', '');
        if (linkPage === currentPage || (linkPage === './' && currentPage === 'index.html')) {
            link.style.color = '#f4c430';
        }
    });

    // Form validation enhancement (if contact form exists)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const name = document.querySelector('#name');
            const email = document.querySelector('#email');
            const message = document.querySelector('#message');
            
            // Basic validation
            if (name && name.value.trim().length < 2) {
                e.preventDefault();
                alert('Please enter a valid name');
                name.focus();
                return;
            }
            
            if (email && !email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                e.preventDefault();
                alert('Please enter a valid email address');
                email.focus();
                return;
            }
            
            if (message && message.value.trim().length < 10) {
                e.preventDefault();
                alert('Please enter a message with at least 10 characters');
                message.focus();
                return;
            }
        });
    }

    // Image lazy loading for product cards
    const images = document.querySelectorAll('.product-card img');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('fade-in');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Add scroll effect to header
    let lastScroll = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        }
        
        lastScroll = currentScroll;
    });
});