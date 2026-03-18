// Matrix Rain Effect
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const alphabet = katakana + latin + nums;

const fontSize = 16;
const columns = canvas.width / fontSize;

const rainDrops = [];

for (let x = 0; x < columns; x++) {
    rainDrops[x] = 1;
}

const draw = () => {
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

setInterval(draw, 30);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
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
    const currentProfession = professions[professionIndex];

    if (isDeleting) {
        typingText.textContent = currentProfession.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentProfession.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentProfession.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        professionIndex = (professionIndex + 1) % professions.length;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
}

setTimeout(typeEffect, 1000);

// Navigation
const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const scrollTop = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }

    if (window.scrollY > 500) {
        scrollTop.classList.add('active');
    } else {
        scrollTop.classList.remove('active');
    }
});

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        navLinks.classList.remove('active');
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = this.querySelector('button');
    const originalText = btn.textContent;

    btn.textContent = 'TRANSMITTING...';
    btn.style.background = 'var(--hacker-cyan)';

    setTimeout(() => {
        btn.textContent = 'DATA_SENT_SUCCESS';
        btn.style.background = 'var(--matrix-green)';

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            this.reset();
        }, 2000);
    }, 1500);
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';

            if (entry.target.classList.contains('skill-category')) {
                const levels = entry.target.querySelectorAll('.language-level');
                levels.forEach(level => {
                    const width = level.style.width;
                    level.style.width = '0';
                    setTimeout(() => {
                        level.style.width = width;
                    }, 200);
                });
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-category, .project-card, .info-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});