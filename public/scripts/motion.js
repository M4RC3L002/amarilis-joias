// Native browser motion: no animation runtime or continuous scroll listener.
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const motionEase = 'cubic-bezier(.23, 1, .32, 1)';
let previousPath;
let lastInputWasKeyboard = false;
let pageAnimation;
let storyObserver;

document.addEventListener(
  'keydown',
  () => {
    lastInputWasKeyboard = true;
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

function enhancePage(path) {
  storyObserver?.disconnect();
  pageAnimation?.cancel();
  const changedPage = previousPath !== undefined && previousPath !== path;
  const firstVisit = previousPath === undefined;
  previousPath = path;
  if (reducedMotion.matches || lastInputWasKeyboard) return;

  // Only navigation animates; favorites and quantity updates stay immediate.
  if (changedPage) {
    pageAnimation = $('#main').animate(
      [
        { opacity: 0.86, transform: 'translateY(6px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ],
      { duration: 180, easing: motionEase },
    );
  }
  if (firstVisit && path === '/') {
    document
      .querySelectorAll('.hero-copy h1, .hero-copy p, .hero-copy .button')
      .forEach((element, index) => {
        element.animate(
          [
            { opacity: 0.55, transform: 'translateY(10px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          { duration: 280, delay: index * 45, easing: motionEase },
        );
      });
  }

  // One editorial reveal, with readable content even if observers fail.
  const story = document.querySelector('.story-text');
  if (story && 'IntersectionObserver' in window) {
    storyObserver = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        storyObserver.disconnect();
        if (!reducedMotion.matches)
          story.animate(
            [
              { opacity: 0.75, transform: 'translateY(12px)' },
              { opacity: 1, transform: 'translateY(0)' },
            ],
            { duration: 280, easing: motionEase },
          );
      },
      { threshold: 0.2 },
    );
    storyObserver.observe(story);
  }
}

reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) {
    storyObserver?.disconnect();
    document.getAnimations().forEach((animation) => animation.cancel());
  }
});
