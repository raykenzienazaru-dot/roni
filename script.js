document.addEventListener('DOMContentLoaded', () => {

    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    const navAnchors = document.querySelectorAll('.nav-links a');
    const mobileMenu = document.getElementById('mobile-menu');
    const sections = document.querySelectorAll('section, .hero-content');

    /* =========================
       NAVBAR SCROLL + ACTIVE LINK
    ========================== */
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        updateActiveLink();
    });

    /* =========================
       SMOOTH SCROLLING
    ========================== */
    navAnchors.forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();

            const targetId = anchor.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }

            navAnchors.forEach(link => link.classList.remove('active'));
            anchor.classList.add('active');

            // Tutup menu mobile setelah klik
            if (navLinks) {
                navLinks.classList.remove('active');
            }
        });
    });

    /* =========================
       MOBILE MENU TOGGLE
    ========================== */
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    /* =========================
       FORM SUBMIT
    ========================== */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            alert('Terima kasih! Pesan Anda telah dikirim. Saya akan membalas secepatnya.');
            contactForm.reset();
        });
    }

    /* =========================
       SCROLL ANIMATION
    ========================== */
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    /* =========================
       ACTIVE LINK BY SCROLL
    ========================== */
    function updateActiveLink() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navAnchors.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

});