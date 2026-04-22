// ============================================
// ICONS
// ============================================
import { createIcons, SquareArrowOutUpRight, ArrowLeft, DatabaseZap, EyeOff, Pencil } from 'lucide';
createIcons({ icons: { SquareArrowOutUpRight, ArrowLeft, DatabaseZap, EyeOff, Pencil } });

// ============================================
// MOBILE SIDEBAR TOGGLE
// ============================================
const topbarToggle = document.getElementById('topbar-toggle');
const sidebar      = document.getElementById('sidebar');
const overlay      = document.getElementById('sidebar-overlay');

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

sidebar.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    if (window.innerWidth <= 768) closeSidebar();
  });
});

// ============================================
// HERO IMAGE SCROLL FADE
// ============================================
const heroImg = document.querySelector('.cs-hero-img');

if (heroImg) {
  const sidebarMeta = document.querySelector('.sidebar .cs-meta');
  const sidebarTags = document.querySelector('.sidebar .cs-tags');

  const updateScrollFade = () => {
    const rect = heroImg.getBoundingClientRect();
    const viewportCenter = window.innerHeight / 2;

    let opacity = 1;
    if (rect.bottom < viewportCenter) {
      const progress = (viewportCenter - rect.bottom) / viewportCenter;
      opacity = Math.max(0, 1 - progress);
    }

    heroImg.style.opacity = opacity;
    const sidebarOpacity = Math.max(0, 1 - (1 - opacity) * 2.5);
    if (sidebarMeta) sidebarMeta.style.opacity = sidebarOpacity;
    if (sidebarTags) sidebarTags.style.opacity = sidebarOpacity;
  };

  window.addEventListener('scroll', updateScrollFade, { passive: true });
  updateScrollFade();
}

// ============================================
// SYNC HERO STACK HEIGHT TO LEFT IMAGE
// ============================================
const heroMain  = document.querySelector('.cs-hero-main');
const heroStack = document.querySelector('.cs-hero-stack');

if (heroMain && heroStack) {
  const sync = () => {
    heroStack.style.height = heroMain.getBoundingClientRect().height + 'px';
  };
  new ResizeObserver(sync).observe(heroMain);
  heroMain.addEventListener('load', sync);
  sync();
}
