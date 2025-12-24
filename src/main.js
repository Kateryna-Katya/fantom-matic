/**
 * FANTOM-MATIC — Core Engine 2025
 * Инновационная образовательная платформа
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. ИНИЦИАЛИЗАЦИЯ БИБЛИОТЕК
  // ==========================================

  // Иконки Lucide
  if (typeof lucide !== 'undefined') {
      lucide.createIcons();
  }

  // Lenis Smooth Scroll (Плавный скролл)
  const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      orientation: 'vertical',
  });

  function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);


  // ==========================================
  // 2. МОБИЛЬНОЕ МЕНЮ (NAV & BURGER)
  // ==========================================

  const burger = document.getElementById('burger-menu');
  const nav = document.getElementById('main-nav');
  const body = document.body;
  const navLinks = document.querySelectorAll('.nav__link');

  if (burger && nav) {
      burger.addEventListener('click', () => {
          const isActive = nav.classList.toggle('active');
          burger.classList.toggle('active');

          // Блокировка скролла при открытом меню
          body.style.overflow = isActive ? 'hidden' : '';
      });

      // Закрытие при клике на ссылки (якоря)
      navLinks.forEach(link => {
          link.addEventListener('click', () => {
              nav.classList.remove('active');
              burger.classList.remove('active');
              body.style.overflow = '';
          });
      });
  }


  // ==========================================
  // 3. HERO: СМЕНА СЛОВ В ЗАГОЛОВКЕ
  // ==========================================

  const wordSwitcher = document.getElementById('changing-word');
  if (wordSwitcher) {
      const words = ["будущее", "инновации", "карьеру", "проекты"];
      let wordIndex = 0;

      setInterval(() => {
          wordSwitcher.style.opacity = '0';
          wordSwitcher.style.transform = 'translateY(15px)';

          setTimeout(() => {
              wordIndex = (wordIndex + 1) % words.length;
              wordSwitcher.textContent = words[wordIndex];

              wordSwitcher.style.opacity = '1';
              wordSwitcher.style.transform = 'translateY(0)';
          }, 500);
      }, 3500);
  }


  // ==========================================
  // 4. КОНТАКТНАЯ ФОРМА (ФРАНЦИЯ 2025)
  // ==========================================

  const contactForm = document.getElementById('contact-form');
  const phoneInput = document.getElementById('phone-input');
  const successMsg = document.getElementById('form-success');
  const captchaLabel = document.getElementById('captcha-question');
  const captchaInput = document.getElementById('captcha-answer');

  // Математическая капча
  let n1 = Math.floor(Math.random() * 10) + 1;
  let n2 = Math.floor(Math.random() * 9) + 1;
  let sum = n1 + n2;

  if (captchaLabel) {
      captchaLabel.textContent = `${n1} + ${n2}`;
  }

  // Валидация телефона (только цифры и +)
  if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
          e.target.value = e.target.value.replace(/(?!^\+)[^\d]/g, '');
      });
  }

  // Обработка отправки формы
  if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
          e.preventDefault();

          // Проверка капчи
          if (parseInt(captchaInput.value) !== sum) {
              alert('Пожалуйста, решите математический пример правильно.');
              return;
          }

          // Анимация отправки
          const btn = contactForm.querySelector('button[type="submit"]');
          const originalText = btn.innerHTML;
          btn.disabled = true;
          btn.innerHTML = '<span class="loader-simple">Отправка...</span>';

          // Имитация задержки сети (Франция -> Сервер)
          setTimeout(() => {
              contactForm.style.transition = 'opacity 0.5s ease';
              contactForm.style.opacity = '0';

              setTimeout(() => {
                  contactForm.style.display = 'none';
                  successMsg.style.display = 'flex'; // Гарантированный показ

                  // Перерисовка иконок в сообщении успеха
                  if (window.lucide) lucide.createIcons();

                  // Скролл к сообщению
                  lenis.scrollTo('#contact', { offset: -100 });
              }, 500);
          }, 1800);
      });
  }


  // ==========================================
  // 5. COOKIE POPUP (GDPR READY)
  // ==========================================

  const initCookies = () => {
      if (localStorage.getItem('fantom_matic_cookies')) return;

      const popup = document.createElement('div');
      popup.className = 'cookie-popup';
      popup.innerHTML = `
          <div class="cookie-popup__header">
              <div class="cookie-popup__icon"><i data-lucide="shield-check"></i></div>
              <p>Мы используем cookies для работы платформы во Франции. <a href="./cookies.html">Подробнее</a></p>
          </div>
          <div class="cookie-popup__actions">
              <button class="btn btn--primary" id="c-accept">Принять</button>
              <button class="btn btn--ghost" id="c-reject">Отклонить</button>
          </div>
      `;

      document.body.appendChild(popup);
      if (window.lucide) lucide.createIcons();

      // Появление
      setTimeout(() => popup.classList.add('is-show'), 2500);

      const closePopup = () => {
          popup.classList.remove('is-show');
          localStorage.setItem('fantom_matic_cookies', 'true');
          setTimeout(() => popup.remove(), 700);
      };

      document.getElementById('c-accept').addEventListener('click', closePopup);
      document.getElementById('c-reject').addEventListener('click', closePopup);
  };

  initCookies();


  // ==========================================
  // 6. SCROLL REVEAL (АНИМАЦИЯ ПОЯВЛЕНИЯ)
  // ==========================================

  const revealItems = document.querySelectorAll('.feature-card, .blog-card, .section-title, .about__image');

  const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              revealObserver.unobserve(entry.target);
          }
      });
  }, { threshold: 0.15 });

  revealItems.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(40px)';
      item.style.transition = 'all 0.9s cubic-bezier(0.22, 1, 0.36, 1)';
      revealObserver.observe(item);
  });

  // Динамический класс для анимации через observer
  const style = document.createElement('style');
  style.innerHTML = `
      .revealed {
          opacity: 1 !important;
          transform: translateY(0) !important;
      }
  `;
  document.head.appendChild(style);

});