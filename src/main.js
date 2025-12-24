/**
 * FANTOM-MATIC.BLOG - JS Core
 * 2025 Edition
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. ИНИЦИАЛИЗАЦИЯ ВНЕШНИХ БИБЛИОТЕК ---

  // Иконки Lucide
  if (typeof lucide !== 'undefined') {
      lucide.createIcons();
  }

  // Плавный скролл Lenis
  const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
  });

  function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);


  // --- 2. МОБИЛЬНОЕ МЕНЮ (BURGER) ---

  const burger = document.getElementById('burger-menu');
  const nav = document.getElementById('main-nav');
  const body = document.body;
  const navLinks = document.querySelectorAll('.nav__link');

  if (burger && nav) {
      burger.addEventListener('click', () => {
          const isActive = nav.classList.toggle('active');
          burger.classList.toggle('active');

          // Блокируем скролл при открытом меню
          body.style.overflow = isActive ? 'hidden' : '';
      });

      // Закрытие меню при клике на ссылку (для якорей)
      navLinks.forEach(link => {
          link.addEventListener('click', () => {
              nav.classList.remove('active');
              burger.classList.remove('active');
              body.style.overflow = '';
          });
      });
  }


  // --- 3. HERO: СМЕНА СЛОВ В ЗАГОЛОВКЕ ---

  const wordSwitcher = document.getElementById('changing-word');
  if (wordSwitcher) {
      const words = ["будущее", "инновации", "карьеру", "проекты"];
      let wordIndex = 0;

      setInterval(() => {
          // Плавное исчезновение
          wordSwitcher.style.opacity = '0';
          wordSwitcher.style.transform = 'translateY(10px)';

          setTimeout(() => {
              wordIndex = (wordIndex + 1) % words.length;
              wordSwitcher.textContent = words[wordIndex];

              // Плавное появление
              wordSwitcher.style.opacity = '1';
              wordSwitcher.style.transform = 'translateY(0)';
          }, 500); // Половина времени перехода
      }, 3000);
  }


  // --- 4. КОНТАКТНАЯ ФОРМА: ВАЛИДАЦИЯ И КАПЧА ---

  const contactForm = document.getElementById('contact-form');
  const phoneInput = document.getElementById('phone-input');
  const successMsg = document.getElementById('form-success');
  const captchaQuestion = document.getElementById('captcha-question');
  const captchaAnswerInput = document.getElementById('captcha-answer');

  // Генерация капчи (Франция, 2025)
  let num1 = Math.floor(Math.random() * 10) + 1;
  let num2 = Math.floor(Math.random() * 5) + 1;
  let correctSum = num1 + num2;

  if (captchaQuestion) {
      captchaQuestion.textContent = `${num1} + ${num2}`;
  }

  // Валидация телефона (только цифры и плюс в начале)
  if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
          let value = e.target.value;
          // Разрешаем + только в начале, остальное только цифры
          e.target.value = value.replace(/(?!^\+)[^\d]/g, '');
      });
  }

  // Обработка отправки
  if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
          e.preventDefault();

          // Проверка капчи
          if (parseInt(captchaAnswerInput.value) !== correctSum) {
              alert('Пожалуйста, решите математический пример правильно.');
              return;
          }

          // Имитация отправки (AJAX)
          const submitBtn = contactForm.querySelector('button[type="submit"]');
          const originalBtnText = submitBtn.innerHTML;

          submitBtn.disabled = true;
          submitBtn.innerHTML = 'Отправка...';

          setTimeout(() => {
              // Скрываем форму и показываем успех
              contactForm.style.display = 'none';
              successMsg.style.display = 'flex';

              // Плавная прокрутка к сообщению об успехе
              lenis.scrollTo('#contact', { offset: -50 });

              console.log('Форма успешно отправлена (симуляция)');
          }, 1500);
      });
  }


  // --- 5. COOKIE POPUP ---

  const createCookiePopup = () => {
      if (localStorage.getItem('cookies-accepted')) return;

      const popup = document.createElement('div');
      popup.className = 'cookie-popup';
      popup.innerHTML = `
          <div class="cookie-popup__content">
              <p>Этот сайт использует cookies для улучшения работы. Подробнее — в нашей <a href="cookies.html">Cookie политике</a>.</p>
              <button class="btn btn--primary" id="accept-cookies">Принять</button>
          </div>
      `;
      body.appendChild(popup);

      document.getElementById('accept-cookies').addEventListener('click', () => {
          localStorage.setItem('cookies-accepted', 'true');
          popup.classList.add('cookie-popup--hidden');
          setTimeout(() => popup.remove(), 500);
      });
  };

  // Показываем куки через 2 секунды после загрузки
  setTimeout(createCookiePopup, 2000);


  // --- 6. ЭФФЕКТ ПОЯВЛЕНИЯ ПРИ СКРОЛЛЕ (REVEAL) ---

  const observerOptions = {
      threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              revealObserver.unobserve(entry.target);
          }
      });
  }, observerOptions);

  // Элементы для анимации (заголовки, карточки)
  const elementsToReveal = document.querySelectorAll('.feature-card, .blog-card, .section-title, .about__image');
  elementsToReveal.forEach(el => {
      el.classList.add('reveal-init');
      revealObserver.observe(el);
  });
});