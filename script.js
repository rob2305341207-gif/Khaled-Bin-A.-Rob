// Matrix Rain Effect
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas?.getContext ? canvas.getContext('2d') : null;

let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
let fontSize = 16;
let columns = Math.floor(canvasWidth / fontSize);
let rainDrops = [];

if (canvas && ctx) {
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
}

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const alphabet = katakana + latin + nums;

function initRain() {
    if (!canvas || !ctx) return;
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    columns = Math.floor(canvasWidth / fontSize);
    rainDrops = [];
    for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
    }
}

initRain();

const draw = () => {
    if (!canvas || !ctx) return;
    ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
};

if (canvas && ctx) {
    setInterval(draw, 30);
}

window.addEventListener('resize', () => {
    initRain();
});

// Typing Effect
const typingText = document.querySelector('.typing-text');
const professions = [
    'Full Stack Developer',
    'Aspiring DevOps Engineer',
    'Network Operator',
    'SQA Tester',
    'Penetration Tester'
];

let professionIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!typingText) return;

    const currentProfession = professions[professionIndex];

    if (isDeleting) {
        charIndex = Math.max(0, charIndex - 1);
    } else {
        charIndex = Math.min(currentProfession.length, charIndex + 1);
    }

    typingText.textContent = currentProfession.substring(0, charIndex);

    if (!isDeleting && charIndex === currentProfession.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1800);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        professionIndex = (professionIndex + 1) % professions.length;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, isDeleting ? 40 : 120);
    }
}

setTimeout(typeEffect, 1000);

// Navigation
const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const scrollTopBtn = document.querySelector('.scroll-top');
const progressBar = document.querySelector('.loading-bar');
const heroImage = document.querySelector('.hero-image');

menuToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        navLinks.classList.remove('active');

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    if (navbar) {
        if (scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 0 25px rgba(0, 255, 65, 0.28)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.2)';
        }
    }

    if (scrollTopBtn) {
        if (scrollY > 500) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    }

    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }

    if (heroImage) {
        heroImage.style.transform = `translateY(${scrollY * 0.08}px)`;
    }

    if (canvas) {
        canvas.style.transform = `translateY(${scrollY * 0.12}px)`;
    }
}, { passive: true });

// Scroll to top button
scrollTopBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Cursor glow
const glow = document.createElement('div');
glow.className = 'cursor-glow';
document.body.appendChild(glow);

document.addEventListener('mousemove', (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
});

// Reveal animations
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');

            if (entry.target.classList.contains('skill-category')) {
                const levels = entry.target.querySelectorAll('.language-level');
                levels.forEach(level => {
                    const width = level.style.width;
                    level.style.width = '0';
                    setTimeout(() => {
                        level.style.width = width;
                    }, 150);
                });
            }
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach((el, index) => {
    if (el.classList.contains('stagger-item')) {
        el.style.setProperty('--delay', `${index * 90}ms`);
    }
    revealObserver.observe(el);
});

// Extra stagger for groups
document.querySelectorAll('.stagger-group .stagger-item').forEach((el, index) => {
    el.style.transitionDelay = `${index * 90}ms`;
});

// Keep scroll-top hidden until DOM ready scroll works
window.addEventListener('load', () => {
    if (progressBar) {
        progressBar.style.width = '0%';
    }
});
