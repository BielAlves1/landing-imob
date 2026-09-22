(function () {
  'use strict';

  // Configurações
  const WHATSAPP_NUMBER = '5500000000000';
  const DEFAULT_MESSAGE = 'Olá! Quero conhecer a plataforma para imobiliárias.';

  // Elementos
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuOpen = document.getElementById('menu-open');
  const menuClose = document.getElementById('menu-close');
  const pointerGlow = document.getElementById('pointer-glow');
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  const year = document.getElementById('year');

  // Navbar
  function updateNavbar() {
    if (!navbar) return;

    navbar.classList.toggle('is-scrolled', window.scrollY > 20);
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });

  updateNavbar();

  // Menu mobile
  function toggleMenu(force) {
    if (!mobileMenu || !menuToggle || !menuOpen || !menuClose) return;

    const shouldOpen = typeof force === 'boolean' ? force : !mobileMenu.classList.contains('is-open');

    mobileMenu.classList.toggle('is-open', shouldOpen);

    menuOpen.classList.toggle('hidden', shouldOpen);
    menuClose.classList.toggle('hidden', !shouldOpen);

    menuToggle.setAttribute('aria-expanded', String(shouldOpen));
    menuToggle.setAttribute('aria-label', shouldOpen ? 'Fechar menu' : 'Abrir menu');
  }

  menuToggle?.addEventListener('click', function () {
    toggleMenu();
  });

  document.querySelectorAll('.mobile-link').forEach(function (link) {
    link.addEventListener('click', function () {
      toggleMenu(false);
    });
  });

  // Fecha o menu ao pressionar Escape
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      toggleMenu(false);
    }
  });

  // Fecha o menu ao mudar para desktop
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 1024) {
      toggleMenu(false);
    }
  });

  // Scroll suave
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (event) {
      const id = this.getAttribute('href');

      if (!id || id === '#') return;

      const target = document.querySelector(id);

      if (!target) return;

      event.preventDefault();

      const headerHeight = navbar ? navbar.offsetHeight : 80;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;

      window.scrollTo({
        top: Math.max(0, top),
        behavior: 'smooth',
      });
    });
  });

  // Animações de entrada
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          const delay = Number(entry.target.dataset.delay || 0);

          entry.target.style.transitionDelay = `${delay}ms`;
          entry.target.classList.add('visible');

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      },
    );

    revealElements.forEach(function (element) {
      observer.observe(element);
    });
  } else {
    revealElements.forEach(function (element) {
      element.classList.add('visible');
    });
  }

  // FAQ
  document.querySelectorAll('.faq-toggle').forEach(function (button) {
    button.addEventListener('click', function () {
      const item = button.closest('.faq-item');

      if (!item) return;

      const wasOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        openItem.classList.remove('open');

        openItem.querySelector('.faq-toggle')?.setAttribute('aria-expanded', 'false');
      });

      if (!wasOpen) {
        item.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // WhatsApp
  function buildWhatsAppUrl(message) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  // Formulário de contato
  form?.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const name = document.getElementById('name')?.value.trim() || '';

    const phone = document.getElementById('phone')?.value.trim() || '';

    const email = document.getElementById('email')?.value.trim() || '';

    const company = document.getElementById('company')?.value.trim() || '';

    const message = document.getElementById('message')?.value.trim() || '';

    const lines = [
      DEFAULT_MESSAGE,
      '',
      `Nome: ${name}`,
      `WhatsApp: ${phone}`,
      `E-mail: ${email}`,
      company ? `Imobiliária: ${company}` : '',
      message ? `Mensagem: ${message}` : '',
    ].filter(Boolean);

    if (success) {
      success.classList.remove('hidden');
    }

    window.open(buildWhatsAppUrl(lines.join('\n')), '_blank', 'noopener,noreferrer');
  });

  // Botão flutuante do WhatsApp
  document.getElementById('whatsapp-float')?.addEventListener('click', function (event) {
    event.preventDefault();

    window.open(buildWhatsAppUrl(DEFAULT_MESSAGE), '_blank', 'noopener,noreferrer');
  });

  // Ano do rodapé
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  // Efeito de brilho do cursor
  if (pointerGlow && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener(
      'pointermove',
      function (event) {
        pointerGlow.style.transform = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%)`;
      },
      { passive: true },
    );
  }
})();
