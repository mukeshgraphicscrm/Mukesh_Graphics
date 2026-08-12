export const smoothScroll = (e, href) => {
  e.preventDefault();
  const targetId = href.replace('#', '');
  
  if (targetId === 'root' || targetId === '') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Remove hash from URL
    history.replaceState('', document.title, window.location.pathname + window.location.search);
    return;
  }
  
  const element = document.getElementById(targetId);
  
  if (element) {
    // Remove hash from URL to keep it clean
    history.replaceState('', document.title, window.location.pathname + window.location.search);
    const navHeight = 100; // Offset for fixed navbar
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - navHeight;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1200; // 1.2s duration for a smooth, premium feel
    let start = null;

    // Cubic ease-in-out function for a very smooth acceleration and deceleration
    const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percent = Math.min(progress / duration, 1);
      
      window.scrollTo(0, startPosition + distance * easeInOutCubic(percent));
      
      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }
};
