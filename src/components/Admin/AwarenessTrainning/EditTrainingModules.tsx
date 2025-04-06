// EditTrainingModules.tsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CreateTrainingModules from "./CreateTrainingModules";
import { useTrainingStore } from "../../../store/useAwarenessTrainingStore";

const EditTrainingModules = ({ prepareDataForBackend }) => {
  const { trainingId } = useParams<{ trainingId: string }>();
  const navigate = useNavigate();
  const { fetchSingleTraining, singleTraining, updateTraining } =
    useTrainingStore();

  useEffect(() => {
    if (trainingId) fetchSingleTraining(trainingId);
  }, [trainingId, fetchSingleTraining]);

  const transformDataToFormState = (trainingData: any) => {
    return {
      ...trainingData,
      modules: trainingData.modules.map((module: any, moduleIndex: number) => ({
        id: moduleIndex + 1,
        title: module.moduleTitle,
        isCollapsed: false,
        lessons: module.lessons.map((lesson: any, lessonIndex: number) => ({
          id: lessonIndex + 1,
          title: lesson.lessonTitle,
          type: lesson.lessonType,
          content: lesson.content,
          quizzes:
            lesson.questions.length > 0
              ? [
                  {
                    id: 1,
                    questions: lesson.questions.map((question: any) => ({
                      id: `q${Math.random().toString(36).substr(2, 9)}`,
                      text: question.question,
                      type: question.questionType,
                      displayType: getDisplayType(question),
                      choices:
                        question.options?.map(
                          (option: string, index: number) => ({
                            id: `c${index + 1}`,
                            text: option,
                            isChecked: isOptionCorrect(question, option),
                          })
                        ) || [],
                      answer: question.correctAnswer,
                      isLongText:
                        question.answerMethod === "input" &&
                        question.correctAnswer?.length > 100,
                    })),
                  },
                ]
              : [],
        })),
      })),
    };
  };

  // Helper function to determine if option is correct
  const isOptionCorrect = (question: any, option: string) => {
    if (question.questionType === "multiple-choice") {
      return option === question.correctAnswer;
    }
    if (question.questionType === "checkbox") {
      return question.correctAnswer?.split(",").includes(option);
    }
    return false;
  };

  // Helper functions
  const getDisplayType = (question: any) => {
    if (question.questionType === "input") {
      return question.correctAnswer?.length > 100 ? "Long text" : "Short text";
    }
    return question.questionType === "multiple-choice"
      ? "Multiple choice"
      : "Checkbox";
  };

  // const isOptionCorrect = (question: any, option: string) => {
  //   if (question.questionType === "multiple-choice") {
  //     return option === question.correctAnswer;
  //   }
  //   if (question.questionType === "checkbox") {
  //     return question.correctAnswer?.split(",").includes(option);
  //   }
  //   return false;
  // };

  const handleUpdateTraining = async (formData: any) => {
    try {
      const formattedData = prepareDataForBackend(formData);
      if (trainingId) {
        await updateTraining(trainingId, formattedData);
        navigate("/awareness-training");
      }
    } catch (error) {
      console.error("Error updating training:", error);
    }
  };

  if (!singleTraining) return <div>Loading...</div>;

  return (
    <CreateTrainingModules
      initialData={transformDataToFormState(singleTraining)}
      onSave={handleUpdateTraining}
      isEditMode={true}
    />
  );
};

export default EditTrainingModules;
