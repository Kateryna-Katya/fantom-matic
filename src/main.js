/**
 * FANTOM-MATIC.BLOG
 * Full Interactive Engine v2.0 (2025)
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. ИНИЦИАЛИЗАЦИЯ ИКОНОК ---
  if (window.lucide) lucide.createIcons();

  // --- 2. ПЛАВНЫЙ СКРОЛЛ (LENIS) ---
  const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
  });
  function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // --- 3. МОБИЛЬНОЕ МЕНЮ ---
  const burger = document.getElementById('burger-menu');
  const nav = document.getElementById('main-nav');

  if (burger && nav) {
      burger.addEventListener('click', () => {
          burger.classList.toggle('active');
          nav.classList.toggle('active');
          document.body.classList.toggle('no-scroll');
      });

      document.querySelectorAll('.nav__link').forEach(link => {
          link.addEventListener('click', () => {
              burger.classList.remove('active');
              nav.classList.remove('active');
              document.body.classList.remove('no-scroll');
          });
      });
  }

  // --- 4. HERO: СМЕНА СЛОВ ---
  const changingWord = document.getElementById('changing-word');
  if (changingWord) {
      const words = ["будущее", "инновации", "карьеру", "проекты"];
      let i = 0;
      setInterval(() => {
          changingWord.style.opacity = '0';
          setTimeout(() => {
              i = (i + 1) % words.length;
              changingWord.textContent = words[i];
              changingWord.style.opacity = '1';
          }, 500);
      }, 3000);
  }

  // --- 5. КОНТАКТНАЯ ФОРМА ---
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');
  const phoneInput = document.getElementById('phone-input');
  const captchaQ = document.getElementById('captcha-question');
  const captchaA = document.getElementById('captcha-answer');

  // Генерация капчи
  let n1 = Math.floor(Math.random() * 10) + 1;
  let n2 = Math.floor(Math.random() * 10) + 1;
  let sum = n1 + n2;
  if (captchaQ) captchaQ.textContent = `${n1} + ${n2}`;

  // Валидация телефона (только цифры)
  if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
          e.target.value = e.target.value.replace(/[^\d+]/g, '');
      });
  }

  // Отправка формы
  if (form) {
      form.addEventListener('submit', (e) => {
          e.preventDefault();

          // Проверка чекбокса (на всякий случай, хоть есть required)
          const isAgreed = document.getElementById('agree-check').checked;
          if (!isAgreed) {
              alert('Необходимо ваше согласие на обработку данных.');
              return;
          }

          // Проверка капчи
          if (parseInt(captchaA.value) !== sum) {
              alert('Ошибка в расчетах! Попробуйте еще раз.');
              return;
          }

          // Имитация отправки
          const btn = form.querySelector('button');
          btn.disabled = true;
          btn.innerHTML = 'Отправка...';

          setTimeout(() => {
              form.style.display = 'none';
              successMsg.style.display = 'flex';
              if (window.lucide) lucide.createIcons(); // Рисуем иконку успеха
              lenis.scrollTo('#contact');
          }, 1500);
      });
  }

  // --- 6. COOKIE POPUP (NEON) ---
  const initCookies = () => {
      if (localStorage.getItem('fantom_cookies_accepted')) return;

      const popup = document.createElement('div');
      popup.className = 'cookie-popup';
      popup.innerHTML = `
          <div class="cookie-popup__header">
              <div class="cookie-popup__icon"><i data-lucide="shield-check"></i></div>
              <p>Мы используем cookies для работы платформы во Франции. <a href="cookies.html">Подробнее</a></p>
          </div>
          <div class="cookie-popup__actions">
              <button class="btn btn--primary" id="c-acc">Принять</button>
              <button class="btn btn--ghost" id="c-rej">Отклонить</button>
          </div>
      `;
      document.body.appendChild(popup);
      if (window.lucide) lucide.createIcons();

      setTimeout(() => popup.classList.add('is-show'), 2000);

      const close = () => {
          popup.classList.remove('is-show');
          localStorage.setItem('fantom_cookies_accepted', 'true');
          setTimeout(() => popup.remove(), 600);
      };

      document.getElementById('c-acc').addEventListener('click', close);
      document.getElementById('c-rej').addEventListener('click', close);
  };
  initCookies();

  // --- 7. REVEAL ANIMATION (INTERSECTION OBSERVER) ---
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
          }
      });
  }, { threshold: 0.1 });

  document.querySelectorAll('.feature-card, .blog-card, .section-title, .about__image').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'all 0.8s ease-out';
      observer.observe(el);
  });

  // Добавляем стиль для анимации динамически
  const style = document.createElement('style');
  style.innerHTML = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);
});