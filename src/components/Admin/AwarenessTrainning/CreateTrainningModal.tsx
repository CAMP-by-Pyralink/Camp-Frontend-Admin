import { useState } from "react";
import CreateTrainingStep1 from "./CreateTrainingStep1";
import CreateTrainningStep2 from "./CreateTrainningStep2";
import CreateTrainingStep3 from "./CreateTrainingStep3";
import { X } from "lucide-react";
import {
  CreateTrainingData,
  useTrainingStore,
  LessonType,
  QuestionType,
} from "../../../store/useAwarenessTrainingStore";

const CreateTrainningModal = ({ setCreateTraining }: any) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CreateTrainingData>({
    bannerImage: "",
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    modules: [
      {
        moduleTitle: "",
        lessons: [{ lessonType: "" as LessonType, content: "" }],
      },
    ],
    questions: [
      {
        question: "",
        questionType: "" as QuestionType,
        options: ["", ""],
        correctAnswer: "",
        answerMethod: "",
      },
    ],
  });

  const { createTraining, isCreatingTraining } = useTrainingStore();

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleChange = (data: Partial<CreateTrainingData>) => {
    setFormData((prevData) => {
      // Create deep clone of previous data
      const newData: CreateTrainingData = {
        ...prevData,
        ...data,
        modules: prevData.modules.map((module, idx) => ({
          ...module,
          ...(data.modules && data.modules[idx]),
          lessons: data.modules?.[idx]?.lessons
            ? [...(data.modules[idx].lessons || [])]
            : module.lessons,
        })),
        questions: data.questions || prevData.questions,
      };

      // console.log("Updated formData:", newData);
      return newData;
    });
  };

  const handleSave = async () => {
    console.log("Final formData being submitted:", formData);
    try {
      await createTraining(formData);
      setCreateTraining(false);
    } catch (error) {
      console.error("Failed to create training:", error);
    }
  };

  return (
    <div
      className="fixed z-[999] inset-0 bg-[#344054B2] bg-opacity-40 flex justify-center items-center h-screen"
      style={{ backdropFilter: "blur(7.06999969482422px)" }}
    >
      <div className="bg-white w-[799px] overflow-y-auto rounded-2xl max-h-[90%] custom-scrollba h-full">
        <div className="flex items-center justify-between bg-[#DEEFFC] py-6 px-12">
          <h1 className="text-[#333333] font-medium text-xl">
            Create Training Content
          </h1>
          <X
            className="text-[#454545]"
            onClick={() => setCreateTraining(false)}
          />
        </div>
        <div className="mt-4 space-y-4">
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            {currentStep === 1 && (
              <CreateTrainingStep1 onChange={handleChange} />
            )}
            {currentStep === 2 && (
              <CreateTrainningStep2 onChange={handleChange} />
            )}
            {currentStep === 3 && (
              <CreateTrainingStep3 onChange={handleChange} />
            )}
          </form>
        </div>
        <div className="mt-4 w-full px-12 flex gap-4 mb-8">
          <button
            onClick={handlePrev}
            className={`basis-[50%] border rounded-md text-textColor border-primary900 py-4 px-6 ${
              currentStep >= 2 ? "block" : "hidden"
            }`}
          >
            Back
          </button>
          <button
            onClick={currentStep === 1 ? handleSave : handleNext}
            className={`basis-[50%] bg-primary500 rounded-md py-4 px-6 text-white`}
            disabled={isCreatingTraining}
          >
            {currentStep === 3 ? "Save" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTrainningModal;
