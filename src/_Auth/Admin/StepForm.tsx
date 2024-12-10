import { useNavigate } from "react-router-dom";
import AddDepartments from "./AddDepartments";
import AddFramework from "./AddFramework";
import AddUsers from "./AddUsers";
import { UseStepForm } from "./UseStepForm";
// import backArrow from "../../assets/svgs/";
import { StepBack, ArrowBigLeft } from "lucide-react";

const StepForm = () => {
  const navigate = useNavigate();
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    UseStepForm([
      <AddDepartments
        key="stepOne"
        // {...formData}
        // errors={errors}
        // updateFields={updateFormData}
      />,
      <AddUsers
        key="stepTwo"
        // {...formData}
        // errors={errors}
        // isDoctor={isDoctor}
        // updateFields={updateFormData}
      />,
      <AddFramework
        key="stepThree"
        // {...formData}
        // errors={errors}
        // updateFields={updateFormData}
      />,
    ]);

  const handleSubmit = () => {
    if (isLastStep) {
      navigate("/signin");
    } else {
      next();
    }
  };

  return (
    <div className=" max-w-[480px]">
      <div
        className="absolute top-[10%] bg-primary500 cursor-pointer flex items-center justify-center border  border-primary500 w-8 h-8 rounded-full "
        onClick={back}
      >
        <ArrowBigLeft color="white" />
      </div>
      {step}
      {/*  */}
      <div className=" mt-12 w-full flex items-center gap-6">
        {!isFirstStep && (
          <button
            className=" w-full border border-primary900 py-3 flex items-center justify-center rounded-md text-black font-semibold"
            // onClick={next}
          >
            Skip
          </button>
        )}
        <button
          className="  w-full bg-primary500 py-3 flex items-center justify-center rounded-md text-white font-semibold"
          onClick={handleSubmit}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default StepForm;
