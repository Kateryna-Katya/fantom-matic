// 1. Инициализация иконок и Lenis
lucide.createIcons();
const lenis = new Lenis();
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// 2. Мобильное меню
const burger = document.getElementById('burger-menu');
const menu = document.querySelector('.menu-overlay');
const navLinks = document.querySelectorAll('.nav__link');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.classList.toggle('no-scroll'); // Чтобы не скроллилось при открытом меню
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        menu.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

// 3. Смена слов в Hero
const words = ["будущее", "инновации", "карьеру", "проекты"];
let currentIndex = 0;
const wordElement = document.getElementById('changing-word');

function changeWord() {
    wordElement.style.opacity = '0';
    wordElement.style.transform = 'translateY(10px)';

    setTimeout(() => {
        currentIndex = (currentIndex + 1) % words.length;
        wordElement.textContent = words[currentIndex];
        wordElement.style.opacity = '1';
        wordElement.style.transform = 'translateY(0)';
    }, 400);
}

setInterval(changeWord, 3000);

// 4. Простая анимация появления при скролле (Reveal Effect)
const revealElements = document.querySelectorAll('.feature-card, .blog-card, .section-title');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease-out';
    revealObserver.observe(el);
});