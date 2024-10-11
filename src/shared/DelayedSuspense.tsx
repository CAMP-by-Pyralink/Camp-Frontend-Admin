import { useState, useEffect } from "react";
import { Suspense } from "react";

const DelayedSuspense = ({ children, fallback, delay = 10000 }) => {
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
