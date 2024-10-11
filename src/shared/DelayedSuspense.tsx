import { useState, useEffect, ReactNode } from "react";
import { Suspense } from "react";

interface DelayedSuspenseProps {
  children: ReactNode; // Children can be any valid ReactNode
  fallback: ReactNode; // Fallback should also be a ReactNode
  delay?: number; // Delay is optional and defaults to 10000
}

const DelayedSuspense: React.FC<DelayedSuspenseProps> = ({
  children,
  fallback,
  delay = 10000,
}) => {
  const [isDelayOver, setIsDelayOver] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDelayOver(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <Suspense fallback={isDelayOver ? fallback : null}>
      {isDelayOver ? children : fallback}
    </Suspense>
  );
};

export default DelayedSuspense;
