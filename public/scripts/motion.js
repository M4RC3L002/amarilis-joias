// Progressive enhancement: content stays visible without motion or observers.
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let previousPath;
let lastInputWasKeyboard = false;
let revealObserver;
const pageAnimations = new Set();
const revealedDetails = new Set();
let heroPresented = false;

function stopPageMotion() {
  revealObserver?.disconnect();
  pageAnimations.forEach((animation) => animation.cancel());
  pageAnimations.clear();
}

document.addEventListener(
  'keydown',
  () => {
    lastInputWasKeyboard = true;
    stopPageMotion();
  },
  { passive: true },
);
document.addEventListener(
  'pointerdown',
  () => {
    lastInputWasKeyboard = false;
  },
  { passive: true },
);

function motionTokens() {
  const style = getComputedStyle(document.documentElement);
  return {
    easing: style.getPropertyValue('--ease-out').trim(),
    standard: parseFloat(style.getPropertyValue('--motion-standard')),
    reveal: parseFloat(style.getPropertyValue('--motion-reveal')),
    hero: parseFloat(style.getPropertyValue('--motion-hero')),
  };
}

function revealDetail(
  element,
  tokens,
  { delay = 0, distance = 16, scale = 1, duration = tokens.reveal } = {},
) {
  if (!element || !element.animate || reducedMotion.matches || lastInputWasKeyboard) return;
  // Preserve the original rotation, then release to the CSS hover transition.
  const base = getComputedStyle(element).transform;
  const resting = base === 'none' ? '' : base;
  const animation = element.animate(
    [
      {
        opacity: 0.35,
        transform: 'translateY(' + distance + 'px) scale(' + scale + ') ' + resting,
      },
      { opacity: 1, transform: base },
    ],
    { duration, delay, easing: tokens.easing, fill: 'backwards' },
  );
  pageAnimations.add(animation);
  animation.onfinish = animation.oncancel = () => pageAnimations.delete(animation);
}

function enhancePage(path) {
  stopPageMotion();
  const changedPage = previousPath !== undefined && previousPath !== path;
  previousPath = path;
  if (reducedMotion.matches || lastInputWasKeyboard) {
    if (path === '/') heroPresented = true;
    return;
  }
  const tokens = motionTokens();
  if (path !== '/') {
    // Functional pages get only a short navigation transition.
    if (changedPage) revealDetail($('#main'), tokens, { distance: 6, duration: tokens.standard });
    return;
  }
  if (!heroPresented) {
    heroPresented = true;
    document
      .querySelectorAll('.hero-copy h1, .hero-copy p, .hero-copy .button')
      .forEach((element, index) => {
        revealDetail(element, tokens, { delay: index * 45, distance: 12, duration: tokens.hero });
      });
    document.querySelectorAll('.floating-piece').forEach((element, index) => {
      revealDetail(element, tokens, {
        delay: 60 + index * 60,
        distance: 24,
        scale: 0.97,
        duration: tokens.hero,
      });
    });
  }
  if (!('IntersectionObserver' in window)) return;
  // One observer, no continuous scroll listener. A detail enters once per visit.
  const targets = [
    ...document.querySelectorAll(
      '.shop-categories h2, .shop-categories nav, .featured .section-title, .showcase-filters, #featuredGrid .card, .collection-story, .story > img, .story-text',
    ),
  ];
  revealObserver = new IntersectionObserver(
    (entries) => {
      let stagger = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target;
        revealObserver.unobserve(element);
        const key = element.dataset.motionKey;
        if (revealedDetails.has(key)) continue;
        revealedDetails.add(key);
        if (entry.boundingClientRect.bottom <= 0) continue;
        const isCard = element.matches('.card');
        const isImage = element.matches('.collection-story, .story > img');
        revealDetail(element, tokens, {
          delay: isCard ? (stagger++ % 4) * 45 : 0,
          distance: isCard ? 12 : isImage ? 0 : 16,
          scale: isImage ? 0.98 : 1,
        });
      }
    },
    { threshold: 0.08, rootMargin: '0px 0px -24px 0px' },
  );
  targets.forEach((element, index) => {
    const key = element.matches('.card')
      ? 'piece:' + element.querySelector('.photo').getAttribute('href')
      : 'section:' + targets.filter((target) => !target.matches('.card')).indexOf(element);
    element.dataset.motionKey = key;
    if (!revealedDetails.has(key)) revealObserver.observe(element);
  });
}

reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) stopPageMotion();
});
