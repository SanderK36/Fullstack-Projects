import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import "./FadeIn.css";

type FadeInProps = {
  children: ReactNode;
};

function FadeIn({ children }: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={elementRef} className={`fade-in ${isVisible ? "visible" : ""}`}> {children} </div>
  );
}

export default FadeIn;