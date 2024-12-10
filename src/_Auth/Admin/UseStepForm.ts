import { ReactElement, useState } from "react";

export function UseStepForm(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function next() {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  }

  function back() {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  }

  // function goTo(index: number) {
  //     setCurrentStepIndex(index);
  // }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    // goTo,
    next,
    back,
    steps,
    isFirstStep: currentStepIndex === 0,
    isSecondStep: currentStepIndex === 1,
    isThirdStep: currentStepIndex === 2,
    isFourthStep: currentStepIndex === 3,
    isLastStep: currentStepIndex === steps.length - 1,
  };
}
