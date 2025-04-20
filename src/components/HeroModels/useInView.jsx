import { useState, useEffect, useRef } from "react";

/**
 * Custom hook to detect if an element is in the viewport
 * @param {Object} options - Intersection Observer options
 * @param {number} options.threshold - Percentage of element visibility needed to trigger (0-1)
 * @param {string} options.rootMargin - Margin around the root element
 * @returns {Array} [ref, isInView] - Ref to attach to element and boolean if element is in view
 */
const useInView = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when intersection status changes
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || "0px",
        ...options,
      }
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options.threshold, options.rootMargin]);

  return [ref, isInView];
};

export default useInView;
