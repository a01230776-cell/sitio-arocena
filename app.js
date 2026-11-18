(() => {
  'use strict';
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#navigation');
  function closeMenu() { menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Abrir menú'); nav.classList.remove('is-open'); }
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    nav.classList.toggle('is-open', open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('is-open')) { closeMenu(); menu.focus(); } });
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  function activateTab(tab, focus = false) {
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected)); item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
    });
    if (focus) tab.focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', event => {
      let target;
      if (event.key === 'ArrowRight') target = tabs[(index + 1) % tabs.length];
      if (event.key === 'ArrowLeft') target = tabs[(index - 1 + tabs.length) % tabs.length];
      if (event.key === 'Home') target = tabs[0];
      if (event.key === 'End') target = tabs[tabs.length - 1];
      if (target) { event.preventDefault(); activateTab(target, true); }
    });
  });
  document.querySelectorAll('[data-dialog]').forEach(button => button.addEventListener('click', () => {
    const dialog = document.getElementById(button.dataset.dialog);
    dialog.showModal();
    dialog.scrollTop = 0;
    document.documentElement.classList.add('dialog-open');
  }));
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.addEventListener('close', () => document.documentElement.classList.remove('dialog-open'));
    dialog.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => dialog.close()));
    dialog.addEventListener('click', event => {
      const rect = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
    });
  });
  const form = document.getElementById('interest-form');
  const status = document.getElementById('form-status');
  const fields = ['name', 'email', 'consent'].map(id => document.getElementById(id));
  function errorFor(field) {
    if (field.id === 'name' && field.value.trim().length < 2) return 'Escribe tu nombre (al menos 2 caracteres).';
    if (field.id === 'email' && (!field.value.trim() || !field.validity.valid)) return 'Escribe un correo válido, por ejemplo: hola@correo.com.';
    if (field.id === 'consent' && !field.checked) return 'Marca la casilla para probar el registro con consentimiento.';
    return '';
  }
  function validate(field) {
    const message = errorFor(field);
    document.getElementById(`${field.id}-error`).textContent = message;
    field.setAttribute('aria-invalid', String(Boolean(message)));
    return !message;
  }
  fields.forEach(field => field.addEventListener('input', () => {
    status.hidden = true;
    if (field.getAttribute('aria-invalid') === 'true') validate(field);
  }));
  form.addEventListener('submit', event => {
    event.preventDefault();
    document.getElementById('email').value = document.getElementById('email').value.trim();
    const results = fields.map(validate);
    if (results.includes(false)) { fields[results.indexOf(false)].focus(); status.hidden = true; return; }
    status.textContent = 'Prueba completada. Así funcionará el registro de interés. No guardamos ni enviamos tus datos, no recibirás correos y no se ha realizado una reservación.';
    status.hidden = false;
    status.focus();
  });
  const config = window.LANDING_CONFIG || {};
  function enableChannel(id, url, caption) {
    const link = document.getElementById(id);
    link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer';
    link.setAttribute('aria-disabled', 'false'); link.querySelector('small').textContent = caption;
  }
  if (/^\d{8,15}$/.test(config.whatsappNumber || '')) enableChannel('whatsapp-link', `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(config.whatsappMessage || '')}`, 'Escríbenos para conocer más');
  if (/^[A-Za-z0-9._]{1,30}$/.test(config.instagramUsername || '')) enableChannel('instagram-link', `https://www.instagram.com/${config.instagramUsername}/`, `@${config.instagramUsername}`);
  document.querySelectorAll('.channel[aria-disabled="true"]').forEach(link => { link.removeAttribute('tabindex'); link.removeAttribute('role'); });

  const shareButton = document.getElementById('share-plan');
  const shareStatus = document.getElementById('share-status');
  const shareData = { title: 'Cenas entre arte · Museo Arocena', text: '¿Y si nuestra próxima salida fuera una cena entre arte? Descubre esta experiencia en desarrollo en Torreón.', url: config.shareUrl || location.href.split('#')[0] };
  shareButton.addEventListener('click', async () => {
    shareStatus.textContent = '';
    try {
      if (navigator.share) { await navigator.share(shareData); return; }
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareData.url);
        shareStatus.textContent = 'Enlace copiado. Compártelo con quien llevarías a esta mesa.';
        return;
      }
      throw new Error('Clipboard unavailable');
    } catch (error) {
      if (error.name === 'AbortError') return;
      shareStatus.textContent = 'Copia este enlace para compartir el plan: ';
      const link = document.createElement('a'); link.href = shareData.url; link.textContent = shareData.url;
      shareStatus.append(link);
    }
  });

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
    }, {threshold: 0.08});
    document.querySelectorAll('.manifesto-main, .dish-card, .journey-heading').forEach(element => { element.classList.add('reveal-ready'); observer.observe(element); });
  }
})();
