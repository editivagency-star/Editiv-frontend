import { useEffect, useRef, useState } from "react";

/**
 * useScrollReveal — triggers a CSS class when element enters viewport
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: options.threshold || 0.12,
        rootMargin: options.rootMargin || "0px 0px -80px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return [ref, isVisible];
}

/**
 * useCountUp — animates a number from 0 to target
 */
export function useCountUp(target, start = false, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime = null;
    let raf;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);

  return count;
}

/**
 * ScrollReveal wrapper component
 */
export default function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  className = "",
  as: Tag = "div",
}) {
  const [ref, isVisible] = useScrollReveal();

  return (
    <Tag
      ref={ref}
      className={`scroll-reveal ${animation} ${isVisible ? "revealed" : ""} ${className}`}
      style={isVisible ? { transitionDelay: `${delay}ms` } : {}}
    >
      {children}
    </Tag>
  );
}
