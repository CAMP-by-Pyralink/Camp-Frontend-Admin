// EditTrainingModules.tsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CreateTrainingModules from "./CreateTrainingModules";
import { useTrainingStore } from "../../../store/useAwarenessTrainingStore";

const EditTrainingModules = () => {
  const { trainingId } = useParams<{ trainingId: string }>();
  const navigate = useNavigate();
  const { fetchSingleTraining, singleTraining, updateTraining } =
    useTrainingStore();

  useEffect(() => {
    if (trainingId) fetchSingleTraining(trainingId);
  }, [trainingId, fetchSingleTraining]);

  const transformDataToFormState = (trainingData: any): FormState => {
    return {
      bannerImage: trainingData.bannerImage,
      title: trainingData.title,
      description: trainingData.description,
      startDate: trainingData.startDate,
      endDate: trainingData.endDate,
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
                      question: question.question,
                      questionType: question.questionType,
                      options: question.options,
                      correctAnswer: question.correctAnswer,
                      answerMethod: question.answerMethod,
                    })),
                  },
                ]
              : [],
        })),
      })),
    };
  };

  const handleUpdateTraining = async (formData: FormState) => {
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
