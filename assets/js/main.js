// Initialize Lucide icons
lucide.createIcons();

// Fix icon sizes after init
document.querySelectorAll('.hero-room svg').forEach(svg => { svg.setAttribute('width','18'); svg.setAttribute('height','18'); });
document.querySelectorAll('.hero-pretitle svg').forEach(svg => { svg.setAttribute('width','14'); svg.setAttribute('height','14'); });
document.querySelectorAll('.hero-badge svg').forEach(svg => { svg.setAttribute('width','12'); svg.setAttribute('height','12'); });
document.querySelectorAll('.benefit-icon-wrap svg').forEach(svg => { svg.setAttribute('width','24'); svg.setAttribute('height','24'); });
document.querySelectorAll('.exp-icon svg').forEach(svg => { svg.setAttribute('width','18'); svg.setAttribute('height','18'); });
document.querySelectorAll('.testimonial-quote svg').forEach(svg => { svg.setAttribute('width','16'); svg.setAttribute('height','16'); });
document.querySelectorAll('.rating-stars svg').forEach(svg => { svg.setAttribute('width','18'); svg.setAttribute('height','18'); });
document.querySelectorAll('.trust-item svg').forEach(svg => { svg.setAttribute('width','14'); svg.setAttribute('height','14'); });
document.querySelectorAll('.footer-address svg').forEach(svg => { svg.setAttribute('width','14'); svg.setAttribute('height','14'); });
document.querySelectorAll('.urgency svg').forEach(svg => { svg.setAttribute('width','15'); svg.setAttribute('height','15'); });
document.querySelectorAll('.btn svg').forEach(svg => { svg.setAttribute('width','16'); svg.setAttribute('height','16'); });

// Sticky bar
const hero = document.getElementById('hero');
const stickyBar = document.getElementById('stickyBar');
const stickyMobile = document.getElementById('stickyMobile');

const observer = new IntersectionObserver(([entry]) => {
  const show = !entry.isIntersecting;
  stickyBar.classList.toggle('visible', show);
  stickyMobile.classList.toggle('visible', show);
}, { threshold: 0.1 });
observer.observe(hero);

// FAQ accordion
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = btn.classList.contains('active');
  document.querySelectorAll('.faq-question').forEach(q => {
    q.classList.remove('active');
    q.nextElementSibling.style.maxHeight = null;
  });
  if (!isOpen) {
    btn.classList.add('active');
    answer.style.maxHeight = answer.scrollHeight + 'px';
  }
}

// Scroll animations
const animatables = document.querySelectorAll('.benefit-card, .exp-card, .step, .testimonial, .faq-item');
animatables.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .55s ease, transform .55s ease';
});
const animateOnScroll = () => {
  animatables.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 60) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  });
};
window.addEventListener('scroll', animateOnScroll, { passive: true });
window.addEventListener('load', animateOnScroll);

// Lightbox
const galleryItems = Array.from(document.querySelectorAll('.gallery-item[data-lightbox]'));
const lightbox     = document.getElementById('lightbox');
const lightboxImg  = document.getElementById('lightboxImg');
const lightboxDots = document.getElementById('lightboxDots');
let currentIndex   = 0;

// Collect image data
const galleryData = galleryItems.map(item => ({
  src: item.querySelector('img').src,
  alt: item.querySelector('img').alt,
  caption: item.querySelector('.gallery-caption').textContent.trim()
}));

// Build dots
galleryData.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'lightbox-dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', 'Foto ' + (i + 1));
  dot.addEventListener('click', () => goTo(i));
  lightboxDots.appendChild(dot);
});

function updateDots() {
  lightboxDots.querySelectorAll('.lightbox-dot').forEach((d, i) => {
    d.classList.toggle('active', i === currentIndex);
  });
}

function goTo(index) {
  currentIndex = (index + galleryData.length) % galleryData.length;
  const data = galleryData[currentIndex];
  updateDots();

  lightboxImg.classList.add('loading');

  setTimeout(() => {
    lightboxImg.src = data.src;
    lightboxImg.alt = data.alt;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        lightboxImg.classList.remove('loading');
      });
    });
  }, 350); // espera a que termine el fade-out (igual que la transición CSS)
}

function openLightbox(index) {
  currentIndex = index;
  const data = galleryData[currentIndex];
  lightboxImg.src = data.src;
  lightboxImg.alt = data.alt;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
  updateDots();
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

// Open on click
galleryItems.forEach((item, i) => {
  item.addEventListener('click', () => openLightbox(i));
});

// Controls
document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxBackdrop').addEventListener('click', closeLightbox);
document.getElementById('lightboxPrev').addEventListener('click', () => goTo(currentIndex - 1));
document.getElementById('lightboxNext').addEventListener('click', () => goTo(currentIndex + 1));

// Touch swipe
let touchStartX = 0;
lightbox.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
lightbox.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 40) goTo(currentIndex + (diff > 0 ? 1 : -1));
}, { passive: true });

// Keyboard
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'ArrowRight') goTo(currentIndex + 1);
  if (e.key === 'ArrowLeft')  goTo(currentIndex - 1);
  if (e.key === 'Escape')     closeLightbox();
});
