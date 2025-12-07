// Pauline Hayes - Artist Portfolio
document.addEventListener('DOMContentLoaded', () => {
    
    // ========== Navigation ==========
    const nav = document.querySelector('.main-nav');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    // Scroll effect for nav
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            
            // Animate hamburger to X
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (mobileMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu on link click
    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
    
    // ========== Smooth Scroll ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.main-nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========== Stats Counter Animation ==========
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for stats
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => statsObserver.observe(stat));
    
    // ========== Gallery/Project Filters ==========
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // ========== Contact Form ==========
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const name = document.getElementById('name').value;
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalContent = submitBtn.innerHTML;
            
            // Show sending state
            submitBtn.innerHTML = `
                <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
                    <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"/>
                </svg>
                <span>Sending...</span>
            `;
            submitBtn.disabled = true;
            
            // Add spinner animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                .spinner {
                    animation: spin 1s linear infinite;
                }
            `;
            document.head.appendChild(style);
            
            // Show success message after form submission
            setTimeout(() => {
                submitBtn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span>Message Sent!</span>
                `;
                submitBtn.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
                
                // Show confirmation alert with sender's name
                alert(`Dear ${name}, your message has been sent to Pauline. Thank you for reaching out!`);
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalContent;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 3000);
            }, 1500);
        });
    }
    
    // ========== Scroll Animations ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add animation class to elements
    const animateElements = document.querySelectorAll(
        '.section-header, .project-card, .skill-category, .process-step, .testimonial-card, .highlight, .contact-item'
    );
    
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        scrollObserver.observe(el);
    });
    
    // ========== Active Nav Link Highlight ==========
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    const highlightNav = () => {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    window.addEventListener('scroll', highlightNav);
    
    // ========== Parallax Effect on Hero Shapes ==========
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.03;
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // ========== Add Visual Feedback to Buttons ==========
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.97)';
        });
        btn.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // ========== Lazy Load Images ==========
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // ========== Puppet Detail Modal ==========
    const puppetDescriptions = {
        '4.png': {
            title: 'Fairy Tale Classics',
            description: 'Meet the enchanting cast of Little Red Riding Hood! Each character is lovingly handcrafted with felt costumes and expressive faces, perfect for bringing this timeless tale to life.'
        },
        '7.png': {
            title: 'Woodland Wonderland',
            description: 'A charming duo of forest friends! This curious mouse and clever fox are ready for adventure, complete with fuzzy felt details and bright googly eyes.'
        },
        '5.png': {
            title: 'Nursery Rhyme Friends',
            description: 'The Three Little Pigs are here to tell their famous story! Each piglet has its own personality, dressed in colourful felt outfits with adorable button noses.'
        },
        '3.png': {
            title: 'Magical Creatures',
            description: 'This magnificent barn owl spreads its cardboard wings wide! Hand-painted with care, those big googly eyes are always watching for woodland adventures.'
        },
        '6.png': {
            title: 'Little Red Close-up',
            description: 'Sweet Little Red Riding Hood in all her detail! Notice her yarn braids, cosy felt hood, and that basket ready for Grandmother\'s treats.'
        },
        '2.png': {
            title: 'Around the World',
            description: 'Bonjour! This jaunty French sailor sports a classic striped shirt and beret, with pipe cleaner arms ready to wave hello from across the sea.'
        }
    };

    // Create modal HTML
    const modalHTML = `
        <div id="puppetModal" class="puppet-modal">
            <div class="puppet-modal-content">
                <button class="puppet-modal-close">&times;</button>
                <img id="modalImage" src="" alt="">
                <div class="puppet-modal-info">
                    <h3 id="modalTitle"></h3>
                    <p id="modalDescription"></p>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Add modal styles
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .puppet-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.85);
            z-index: 10000;
            justify-content: center;
            align-items: center;
        }
        .puppet-modal.active { display: flex; }
        .puppet-modal-content {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            border-radius: 20px;
            max-width: 600px;
            width: 90%;
            overflow: hidden;
            position: relative;
            box-shadow: 0 25px 50px rgba(0,0,0,0.5);
        }
        .puppet-modal-close {
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            font-size: 28px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            z-index: 10;
        }
        .puppet-modal-close:hover { background: rgba(255,255,255,0.3); }
        .puppet-modal-content img {
            width: 100%;
            max-height: 400px;
            object-fit: cover;
        }
        .puppet-modal-info {
            padding: 25px;
            color: white;
        }
        .puppet-modal-info h3 {
            font-size: 1.5rem;
            margin-bottom: 10px;
            color: #d97398;
        }
        .puppet-modal-info p {
            font-size: 1rem;
            line-height: 1.6;
            color: rgba(255,255,255,0.9);
        }
    `;
    document.head.appendChild(modalStyle);

    // Handle View Details clicks
    const modal = document.getElementById('puppetModal');
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const card = link.closest('.project-card');
            const img = card.querySelector('.project-img');
            const imgSrc = img.getAttribute('src');
            
            const info = puppetDescriptions[imgSrc] || { title: 'Character Details', description: 'A beautiful handcrafted creation by Pauline.' };
            
            document.getElementById('modalImage').src = imgSrc;
            document.getElementById('modalTitle').textContent = info.title;
            document.getElementById('modalDescription').textContent = info.description;
            modal.classList.add('active');
        });
    });

    // Close modal
    document.querySelector('.puppet-modal-close').addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });

    console.log('Pauline Hayes Portfolio loaded successfully!');
});
