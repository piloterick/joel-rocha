
// Current Year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
const scrollTop = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    if (window.scrollY > 500) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }
});

// Scroll to Top
scrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Mobile Menu Toggle - FIXED
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    
    mobileMenu.classList.toggle('active');
    
    if (mobileMenu.classList.contains('active')) {
        document.body.classList.add('menu-open');
        mobileMenuBtn.innerHTML = '<i class="bi bi-x-lg"></i>';
    } else {
        document.body.classList.remove('menu-open');
        mobileMenuBtn.innerHTML = '<i class="bi bi-list"></i>';
    }
}

// Close menu on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }
});

// Video Modal
function openVideoModal() {
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    videoFrame.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    videoFrame.src = '';
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal on outside click
document.getElementById('videoModal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeVideoModal();
    }
});

// Close on Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeVideoModal();
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission
document.getElementById('bookingForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    const message = `🎵 *Nova Solicitação de Orçamento*

👤 *Nome:* ${data.name}
📱 *Telefone:* ${data.phone}
📧 *E-mail:* ${data.email}
🎉 *Tipo de Evento:* ${data.eventType}
📅 *Data:* ${data.date}
📝 *Detalhes:* ${data.message || 'Não informado'}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/21999774828?text=${encodedMessage}`, '_blank');

    this.reset();
    alert('Redirecionando para o WhatsApp...');
});

// Phone Input Mask
document.getElementById('phone').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 0) {
        value = '(' + value;
    }
    if (value.length > 3) {
        value = value.slice(0, 3) + ') ' + value.slice(3);
    }
    if (value.length > 10) {
        value = value.slice(0, 10) + '-' + value.slice(10);
    }

    e.target.value = value;
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .pricing-card, .feature-item, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Gallery Lightbox
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function () {
        const img = this.querySelector('img');
        if (img) {
            const lightbox = document.createElement('div');
            lightbox.style.cssText = `
                        position: fixed;
                        inset: 0;
                        background: rgba(0,0,0,0.95);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 2000;
                        cursor: pointer;
                        padding: 40px;
                        backdrop-filter: blur(10px);
                    `;

            const lightboxImg = document.createElement('img');
            lightboxImg.src = img.src;
            lightboxImg.style.cssText = `
                        max-width: 90%;
                        max-height: 90%;
                        object-fit: contain;
                        border-radius: 15px;
                        box-shadow: 0 30px 80px rgba(255,107,53,0.3);
                        border: 3px solid rgba(255,107,53,0.5);
                    `;

            lightbox.appendChild(lightboxImg);
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';

            lightbox.addEventListener('click', function () {
                document.body.removeChild(lightbox);
                document.body.style.overflow = '';
            });
        }
    });
});

// Pause marquee on hover
document.querySelectorAll('.reviews-track').forEach(track => {
    track.addEventListener('mouseenter', function () {
        this.style.animationPlayState = 'paused';
    });
    track.addEventListener('mouseleave', function () {
        this.style.animationPlayState = 'running';
    });
});

// Parallax effect
window.addEventListener('scroll', function () {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    if (scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = scrolled * 0.4 + 'px';
    }
});

// Tilt effect on cards
document.querySelectorAll('.service-card, .pricing-card').forEach(card => {
    card.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 25;
        const rotateY = (centerX - x) / 25;

        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = '';
    });
});

// Pausar outros vídeos quando um começar a tocar
document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('.video-item video');
    
    videos.forEach(video => {
        video.addEventListener('play', function() {
            // Pausa todos os outros vídeos
            videos.forEach(otherVideo => {
                if (otherVideo !== video) {
                    otherVideo.pause();
                }
            });
        });
    });
});

const video = document.getElementById("video");

document.addEventListener("visibilitychange", function() {
    if (document["hidden"]) {
        video.pause();
    } else {
        video.play();
    }
});

console.log('🎵 Joel Rocha Eventos - Site carregado com sucesso!');