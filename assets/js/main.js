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
