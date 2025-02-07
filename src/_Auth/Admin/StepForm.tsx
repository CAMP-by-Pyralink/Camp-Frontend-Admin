import { useNavigate } from "react-router-dom";
import AddDepartments from "./AddDepartments";
import AddFramework from "./AddFramework";
import AddUsers from "./AddUsers";
import { UseStepForm } from "./UseStepForm";
import { ArrowBigLeft } from "lucide-react";
import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { useAuthStore, OnboardingData } from "../../store/useAuthStore";

const StepForm = () => {
  const { onboardCompany } = useAuthStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    companyDepartments: [] as string[],
    onboardingType: "" as "manual" | "scan" | "",
    frameworkType: "" as "3 x 3 Matrix" | "4 x 4 Matrix" | "",
    frameworkFile: "" as string,
  });

  const email = sessionStorage.getItem("email");

  const updateFormData = useCallback((fields: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  }, []);

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    UseStepForm([
      <AddDepartments
        key="stepOne"
        {...formData}
        updateFields={updateFormData}
      />,
      <AddUsers
        key="stepTwo"
        onboardingType={formData.onboardingType}
        updateOnboardingType={(value) =>
          updateFormData({ onboardingType: value })
        }
      />,
      <AddFramework
        key="stepThree"
        frameworkType={formData.frameworkType}
        updateFrameworkType={(value) =>
          updateFormData({ frameworkType: value })
        }
        updateFrameworkFile={(file) => updateFormData({ frameworkFile: file })}
      />,
    ]);

  const handleSubmit = async () => {
    if (isLastStep) {
      if (!formData.frameworkFile) {
        toast.error("Please upload a framework file.");
        return;
      }

      // Prepare onboarding data. Make sure formData matches the OnboardingData interface.
      const onboardingData: OnboardingData = {
        email: email || "",
        companyDepartments: formData.companyDepartments,
        onboardingType: formData.onboardingType as "manual" | "scan",
        frameworkType: formData.frameworkType as
          | "3 x 3 Matrix"
          | "4 x 4 Matrix",
        frameworkFile: formData.frameworkFile,
      };

      console.log(onboardingData);
      // Call the store's action to send data to the backend.
      const response = await onboardCompany(onboardingData);
      console.log("onboardingResonse", response);
      if ((response && response.status === 201) || 200) {
        toast.success("Onboarding successful!");
        navigate("/signin");
      }
    } else {
      next();
      console.log(formData);
    }
  };

  return (
    <div className="max-w-[480px] relative">
      {!isFirstStep && (
        <div
          className="absolute -top-[15%] bg-primary500 cursor-pointer flex items-center justify-center border  border-primary500 w-8 h-8 rounded-full "
          onClick={back}
        >
          <ArrowBigLeft color="white" />
        </div>
      )}
      {step}
      <div className=" mt-12 w-full flex items-center gap-6">
        {!isFirstStep && (
          <button className=" w-full border border-primary900 py-3 flex items-center justify-center rounded-md text-black font-semibold">
            Skip
          </button>
        )}
        <button
          className="  w-full bg-primary500 py-3 flex items-center justify-center rounded-md text-white font-semibold"
          onClick={handleSubmit}
        >
          {isLastStep ? "Submit" : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default StepForm;
