// ============================================
// ICONS
// ============================================
import { createIcons, SquareArrowOutUpRight, ArrowRight } from 'lucide';
createIcons({ icons: { SquareArrowOutUpRight, ArrowRight } });

// ============================================
// MOBILE SIDEBAR TOGGLE
// ============================================
const topbarToggle  = document.getElementById('topbar-toggle');
const sidebar       = document.getElementById('sidebar');
const overlay       = document.getElementById('sidebar-overlay');

function openSidebar() {
  sidebar.classList.add('open');
  overlay.classList.add('active');
  topbarToggle.setAttribute('aria-expanded', 'true');
}

function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
  topbarToggle.setAttribute('aria-expanded', 'false');
}

topbarToggle.addEventListener('click', () => {
  sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
});

overlay.addEventListener('click', closeSidebar);

// Close when a sidebar link is tapped on mobile
sidebar.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    if (window.innerWidth <= 768) closeSidebar();
  });
});

// ============================================
// SCROLL-REVEAL
// ============================================
const fadeEls = document.querySelectorAll('.fade-in');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
);

fadeEls.forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.09}s`;
  revealObserver.observe(el);
});
