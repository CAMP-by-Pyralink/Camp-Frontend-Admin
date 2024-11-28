import { useState } from "react";
import CreateTrainingStep1 from "./CreateTrainingStep1";
import CreateTrainningStep2 from "./CreateTrainningStep2";
import CreateTrainingStep3 from "./CreateTrainingStep3";

const CreateTrainningModal = ({ setCreateTraining }: any) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div
      className="  fixed z-[999] inset-0 bg-[#344054B2] bg-opacity-40 flex justify-center  items-center h-full  "
      style={{ backdropFilter: "blur(7.06999969482422px)" }}
    >
      <div className=" bg-white w-[799px] h-full overflow-y-scroll">
        <div className=" flex items-center justify-between bg-[#DEEFFC] py-6 px-12 ">
          <h1>Create Training Content</h1>
          <h1 onClick={() => setCreateTraining(false)}>X</h1>
        </div>
        {/*  */}
        <div className=" mt-4 space-y-4">
          <form action="">
            {currentStep === 1 && <CreateTrainingStep1 />}
            {currentStep === 2 && <CreateTrainningStep2 />}
            {currentStep === 3 && <CreateTrainingStep3 />}
          </form>
        </div>
        {/* button  */}
        <div className=" mt-4 w-full px-12 flex gap-4 mb-8">
          <>
            <button
              onClick={handlePrev}
              className={` basis-[50%] border rounded-md text-textColor border-primary900  py-4 px-6 ${
                currentStep >= 2 ? "block" : "hidden"
              }`}
            >
              back
            </button>
          </>

          <button
            onClick={handleNext}
            className=" basis-[50%] bg-primary500 rounded-md py-4 px-6 text-white"
          >
            next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTrainningModal;
