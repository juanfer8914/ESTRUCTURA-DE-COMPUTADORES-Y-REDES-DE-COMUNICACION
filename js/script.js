const root = document.documentElement;
const themeToggle = document.querySelector('#theme-toggle');
const themeLabel = document.querySelector('#theme-label');
const themeIcon = document.querySelector('#theme-icon');
const savedTheme = localStorage.getItem('site-theme');

function setTheme(theme) {
  root.dataset.theme = theme;
  const dark = theme === 'dark';
  themeLabel.textContent = dark ? 'Tema claro' : 'Tema oscuro';
  themeIcon.textContent = dark ? '☼' : '◐';
  themeToggle.setAttribute('aria-label', dark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro');
  localStorage.setItem('site-theme', theme);
}
setTheme(savedTheme || 'light');
themeToggle.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

const shareButton = document.querySelector('#share-button');
const shareMenu = document.querySelector('#share-menu');
if (shareButton && shareMenu) {
  const shareUrl = window.location.href;
  const shareTitle = document.title;

  shareButton.addEventListener('click', () => {
    const isOpen = shareMenu.classList.toggle('open');
    shareButton.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', event => {
    if (!shareButton.contains(event.target) && !shareMenu.contains(event.target)) {
      shareMenu.classList.remove('open');
      shareButton.setAttribute('aria-expanded', 'false');
    }
  });

  shareMenu.querySelectorAll('.share-item').forEach(link => {
    const network = link.textContent.trim();
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(shareTitle);

    switch (network) {
      case 'X':
        link.href = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
        break;
      case 'Facebook':
        link.href = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'LinkedIn':
        link.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'WhatsApp':
        link.href = `https://wa.me/?text=${encodeURIComponent(`${shareTitle} ${shareUrl}`)}`;
        break;
      case 'Telegram':
        link.href = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      default:
        break;
    }
  });
}

const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('#main-nav');
navToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}));

const componentData = {
  alu: ['ALU / Unidad Aritmético-Lógica', 'Realiza operaciones aritméticas y lógicas sobre los datos que recibe.', 'comparar dos valores para decidir el siguiente salto de un programa.'],
  uc: ['UC / Unidad de Control', 'Interpreta las instrucciones y coordina el movimiento de datos entre los componentes.', 'ordenar una lectura de memoria y activar la unidad que debe ejecutarla.'],
  registros: ['Registros / memoria inmediata', 'Almacenan temporalmente operandos, direcciones y resultados dentro de la CPU.', 'conservar una dirección mientras la unidad de control prepara la siguiente operación.']
};
document.querySelectorAll('.component-card').forEach(card => card.addEventListener('click', () => {
  document.querySelectorAll('.component-card').forEach(item => item.classList.remove('active'));
  card.classList.add('active');
  const [title, description, example] = componentData[card.dataset.component];
  document.querySelector('#component-detail').innerHTML = `<span class="detail-tag">COMPONENTE ACTIVO</span><h4>${title}</h4><p>${description}</p><p class="detail-example"><strong>Ejemplo:</strong> ${example}</p>`;
}));

const cycleData = {
  fetch: ['FASE 01 / FETCH', 'La CPU obtiene la siguiente instrucción desde la memoria utilizando el contador de programa.'],
  decode: ['FASE 02 / DECODE', 'La unidad de control interpreta la instrucción y prepara los componentes que participarán.'],
  execute: ['FASE 03 / EXECUTE', 'La CPU ejecuta la operación, guarda el resultado y avanza hacia la próxima instrucción.']
};
document.querySelectorAll('.cycle-step').forEach(step => step.addEventListener('click', () => {
  document.querySelectorAll('.cycle-step').forEach(item => item.classList.remove('active'));
  step.classList.add('active');
  const [tag, text] = cycleData[step.dataset.cycle];
  document.querySelector('#cycle-description').innerHTML = `<span class="detail-tag">${tag}</span><p>${text}</p>`;
}));

const memoryData = {
  registros: ['Registros', 'La memoria más cercana al procesador. Guarda operandos e instrucciones en uso inmediato.'],
  cache: ['Memoria caché', 'Intermedia entre registros y RAM: conserva datos usados con frecuencia para reducir la espera.'],
  ram: ['Memoria RAM', 'Mantiene programas y datos en uso. Es rápida, de capacidad intermedia y volátil.'],
  storage: ['Almacenamiento secundario', 'Conserva grandes volúmenes de información de forma persistente, aunque con mayor latencia.']
};
document.querySelectorAll('.memory-level').forEach(level => level.addEventListener('click', () => {
  document.querySelectorAll('.memory-level').forEach(item => item.classList.remove('active'));
  level.classList.add('active');
  const [title, text] = memoryData[level.dataset.memory];
  document.querySelector('#memory-detail').innerHTML = `<span class="detail-tag">NIVEL SELECCIONADO</span><h4>${title}</h4><p>${text}</p>`;
}));

const addressData = {
  ip: ['192.168.1.10', 'Identificación lógica', 'Puede cambiar y permite ubicar un dispositivo dentro de una red o entre redes.'],
  mac: ['00:1A:2B:3C:4D:5E', 'Identificación física', 'Está asociada a la interfaz de red y se emplea en la comunicación dentro de la red local.']
};
document.querySelectorAll('.address-tab').forEach(tab => tab.addEventListener('click', () => {
  document.querySelectorAll('.address-tab').forEach(item => item.classList.remove('active'));
  tab.classList.add('active');
  const [address, title, description] = addressData[tab.dataset.address];
  document.querySelector('#address-display').innerHTML = `<span class="mono">${address}</span><strong>${title}</strong><p>${description}</p>`;
}));

const topologyData = {
  star: ['star-visual', 'ESTRELLA / ACTIVA', 'Todos los dispositivos se conectan a un punto central. Una falla en un cable afecta a un equipo; si falla el switch, se detiene la red.'],
  ring: ['ring-visual', 'ANILLO / CIRCULAR', 'Cada dispositivo conecta con dos vecinos formando un circuito. Una interrupción puede afectar el recorrido completo.'],
  bus: ['bus-visual', 'BUS / COMPARTIDO', 'Todos comparten una línea principal. Es simple de desplegar, pero una falla en el troncal puede interrumpir toda la comunicación.']
};
document.querySelectorAll('.topology-tab').forEach(tab => tab.addEventListener('click', () => {
  document.querySelectorAll('.topology-tab').forEach(item => item.classList.remove('active'));
  tab.classList.add('active');
  const [visualClass, label, text] = topologyData[tab.dataset.topology];
  const visual = document.querySelector('.topology-visual');
  visual.className = `topology-visual ${visualClass}`;
  document.querySelector('#topology-description').previousElementSibling.textContent = label;
  document.querySelector('#topology-description').textContent = text;
}));

const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(item => revealObserver.observe(item));

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
}), { rootMargin: '-30% 0px -60% 0px' });
sections.forEach(section => sectionObserver.observe(section));

const backToTop = document.querySelector('#back-to-top');
window.addEventListener('scroll', () => backToTop.classList.toggle('visible', window.scrollY > 700), { passive: true });
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
