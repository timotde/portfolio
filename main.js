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
  // Drop the stagger once revealed so it doesn't delay hover transitions later
  el.addEventListener('transitionend', (e) => {
    if (e.target === el && e.propertyName === 'transform') el.style.transitionDelay = '';
  });
  revealObserver.observe(el);
});

// ============================================
// SIDEBAR BUTTONS + PROJECT CARDS — CURSOR SHEEN
// ============================================
document.querySelectorAll('.action-email, .action-icon, .card:not(.card--placeholder)').forEach(btn => {
  btn.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    const r = btn.getBoundingClientRect();
    btn.style.setProperty('--px', `${e.clientX - r.left}px`);
    btn.style.setProperty('--py', `${e.clientY - r.top}px`);
  });
  btn.addEventListener('pointerleave', () => {
    btn.style.removeProperty('--px');
    btn.style.removeProperty('--py');
  });
});

// ============================================
// SIDEBAR TOOLTIPS — WARM HAND-OFF + ESCAPE
// ============================================
const TOOLTIP_SHOW_MS = 390; // 210ms delay + 180ms fade, so the first tooltip finishes before going warm
const WARM_HOLD_MS = 300;

document.querySelectorAll('.sidebar-actions').forEach(row => {
  let warmTimer;
  let coolTimer;

  row.querySelectorAll('.action-icon').forEach(icon => {
    icon.addEventListener('pointerenter', (e) => {
      if (e.pointerType !== 'mouse' || row.classList.contains('is-warm')) return;
      clearTimeout(warmTimer);
      warmTimer = setTimeout(() => row.classList.add('is-warm'), TOOLTIP_SHOW_MS);
    });
    icon.addEventListener('pointerleave', () => clearTimeout(warmTimer));
  });

  row.addEventListener('pointerenter', () => clearTimeout(coolTimer));
  row.addEventListener('pointerleave', () => {
    clearTimeout(warmTimer);
    coolTimer = setTimeout(() => row.classList.remove('is-warm'), WARM_HOLD_MS);
    row.classList.remove('is-dismissed');
  });
  row.addEventListener('focusin', () => row.classList.remove('is-dismissed'));
});

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  document.querySelectorAll('.sidebar-actions').forEach(row => row.classList.add('is-dismissed'));
});

// ============================================
// "ENGINEER" NPM AUDIT POPOVER
// ============================================
const spellWords = document.querySelectorAll('.spell');

if (spellWords.length) {
  const popover = document.createElement('div');
  popover.className = 'audit';
  popover.setAttribute('role', 'dialog');
  popover.setAttribute('aria-label', 'npm audit');
  popover.hidden = true;
  popover.innerHTML = `
    <div class="audit-body">
      <p class="audit-msg">1 vulnerability in <span class="audit-pkg">engineer</span></p>
      <p class="audit-detail">designer has commit access</p>
    </div>
    <button type="button" class="audit-fix">npm audit fix</button>
  `;
  document.body.appendChild(popover);

  const msg = popover.querySelector('.audit-msg');
  const detail = popover.querySelector('.audit-detail');
  const fixBtn = popover.querySelector('.audit-fix');
  let activeWord = null;

  const closePopover = (returnFocus = false) => {
    if (popover.hidden) return;
    popover.hidden = true;
    activeWord?.setAttribute('aria-expanded', 'false');
    if (returnFocus) activeWord?.focus();
    activeWord = null;
  };

  const openPopover = (word, anchorX, top) => {
    activeWord = word;
    word.setAttribute('aria-expanded', 'true');
    popover.hidden = false;
    const { width, height } = popover.getBoundingClientRect();
    const left = Math.max(8, Math.min(anchorX - 24, innerWidth - width - 8));
    popover.style.left = `${left}px`;
    popover.style.top = `${Math.max(8, Math.min(top, innerHeight - height - 8))}px`;
    popover.style.setProperty('--pointer-x', `${Math.max(14, Math.min(anchorX - left, width - 14))}px`);
    fixBtn.focus();
  };

  const onTrigger = (e) => {
    const word = e.currentTarget;
    if (word.classList.contains('spell--resolved')) return;
    e.preventDefault();
    e.stopPropagation();
    if (activeWord === word) return closePopover();
    closePopover();
    const rect = word.getBoundingClientRect();
    const fromPointer = e.type === 'contextmenu';
    openPopover(
      word,
      fromPointer ? e.clientX : rect.left + rect.width / 2,
      (fromPointer ? e.clientY : rect.bottom) + 10
    );
  };

  spellWords.forEach(word => {
    word.addEventListener('click', onTrigger);
    word.addEventListener('contextmenu', onTrigger);
  });

  fixBtn.addEventListener('click', () => {
    spellWords.forEach(word => {
      word.classList.add('spell--resolved');
      word.removeAttribute('aria-haspopup');
      word.removeAttribute('aria-expanded');
    });
    msg.textContent = 'fixed 0 of 1 vulnerabilities';
    detail.innerHTML = '<span class="audit-ok">✓ working as intended</span>';
    msg.setAttribute('tabindex', '-1');
    msg.focus();
    fixBtn.hidden = true;
    setTimeout(() => closePopover(true), 1400);
  });

  popover.addEventListener('focusout', (e) => {
    if (!popover.contains(e.relatedTarget) && e.relatedTarget !== activeWord) closePopover();
  });
  document.addEventListener('click', (e) => {
    if (!popover.contains(e.target)) closePopover();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePopover(true);
  });
  addEventListener('resize', () => closePopover());
  addEventListener('scroll', () => closePopover(), true);
}
