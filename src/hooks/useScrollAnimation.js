import { useEffect } from 'react';

export const useScrollAnimation = (selector = '.animate', offset = 100) => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(selector);
      if (!elements.length) return;

      const windowHeight = window.innerHeight;

      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        if (elementPosition < windowHeight - offset) {
          element.classList.add('animated');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [selector, offset]);
};
