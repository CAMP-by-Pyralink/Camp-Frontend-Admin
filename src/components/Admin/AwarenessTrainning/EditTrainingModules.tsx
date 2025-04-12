// EditTrainingModules.tsx

import { useEffect } from "react";
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

  const transformDataToFormState = (trainingData: any) => {
    // Format dates correctly
    const formatDate = (dateString: string) => {
      if (!dateString) return "";

      try {
        // Convert to YYYY-MM-DD format for input type="date"
        const date = new Date(dateString);
        return date.toISOString().split("T")[0];
      } catch (error) {
        console.error("Error formatting date:", error);
        return "";
      }
    };

    const transformQuestions = (questions: any[]) => {
      if (!questions || !questions.length) return [];

      return questions.map((q) => {
        // Determine the actual question type - handle different property names
        const questionType = q.type || q.questionType || "multiple-choice";

        // Determine if it's long text input type
        const isLongText =
          questionType === "input" &&
          (q.correctAnswer?.length > 100 ||
            q.answer?.length > 100 ||
            q.isLongText);

        // Handle question choices for multiple-choice and checkbox types
        let choices = [];
        if (questionType === "multiple-choice" || questionType === "checkbox") {
          // First, check if we have existing options in the API response format
          if (Array.isArray(q.options) && q.options.length > 0) {
            // Process existing options from backend
            choices = q.options.map((option: any, index: number) => {
              const choiceText =
                typeof option === "object" ? option.text : option;
              let isChecked = false;

              // For multiple-choice, check if this choice matches the correct answer
              if (questionType === "multiple-choice") {
                isChecked = choiceText === (q.correctAnswer || q.answer);
              }
              // For checkbox, check if this choice is in the comma-separated correct answers
              else if (questionType === "checkbox") {
                const correctAnswers = (q.correctAnswer || q.answer || "")
                  .split(",")
                  .map((a: string) => a.trim());
                isChecked = correctAnswers.includes(choiceText);
              }

              return {
                id: `choice-${index}-${Math.random()
                  .toString(36)
                  .substr(2, 9)}`,
                text: choiceText,
                isChecked,
              };
            });
          }
          // If we already have choices in the expected format (from form state)
          else if (Array.isArray(q.choices) && q.choices.length > 0) {
            choices = q.choices.map((choice: any) => {
              const choiceText =
                typeof choice === "object" ? choice.text : choice;
              let isChecked = false;

              // For multiple-choice, check if this choice matches the correct answer
              if (questionType === "multiple-choice") {
                isChecked = choiceText === (q.correctAnswer || q.answer);
              }
              // For checkbox, check if this choice is in the comma-separated correct answers
              else if (questionType === "checkbox") {
                const correctAnswers = (q.correctAnswer || q.answer || "")
                  .split(",")
                  .map((a: string) => a.trim());
                isChecked = correctAnswers.includes(choiceText);
              }

              return {
                id:
                  typeof choice === "object"
                    ? choice.id ||
                      `choice-${Math.random().toString(36).substr(2, 9)}`
                    : `choice-${Math.random().toString(36).substr(2, 9)}`,
                text: choiceText,
                isChecked,
              };
            });
          } else {
            // Create default choices when none exist
            choices = [
              {
                id: `choice-${Math.random().toString(36).substr(2, 9)}`,
                text: "Option A",
                isChecked: false,
              },
              {
                id: `choice-${Math.random().toString(36).substr(2, 9)}`,
                text: "Option B",
                isChecked: false,
              },
            ];

            // If we have correct answers but no choices, try to map them
            if (q.correctAnswer || q.answer) {
              const correctValues =
                questionType === "checkbox"
                  ? (q.correctAnswer || q.answer || "")
                      .split(",")
                      .map((a: string) => a.trim())
                  : [q.correctAnswer || q.answer];

              choices = choices.map((choice: any) => ({
                ...choice,
                isChecked: correctValues.includes(choice.text),
              }));
            }
          }
        }

        return {
          text: q.text || q.question || "",
          type: questionType,
          isLongText,
          answer: q.correctAnswer || q.answer || "",
          choices: choices,
          displayType: isLongText
            ? "Long text"
            : questionType === "checkbox"
            ? "Checkbox"
            : questionType === "input"
            ? "Short text"
            : "Multiple choice",
        };
      });
    };

    return {
      bannerImage: trainingData.training.bannerImage || null,
      title: trainingData.training.title || "",
      description: trainingData.training.description || "",
      startDate: formatDate(trainingData.training.startDate) || "",
      endDate: formatDate(trainingData.training.endDate) || "",
      modules:
        trainingData.modules?.map((module: any, moduleIndex: number) => ({
          id: moduleIndex + 1,
          title: module.moduleTitle || module.title || "",
          isCollapsed: false,
          lessons: module.lessons.map((lesson: any, lessonIndex: number) => ({
            id: lessonIndex + 1,
            title: lesson.lessonTitle || lesson.title || "",
            type: lesson.lessonType || lesson.type || "video",
            content: lesson.content,
            quizzes:
              lesson.questions && lesson.questions.length > 0
                ? [
                    {
                      id: 1,
                      questions: transformQuestions(lesson.questions),
                    },
                  ]
                : [],
          })),
        })) || [],
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

  // EditTrainingModules.tsx (updated parts)

  const handleUpdateTraining = async (formData: any) => {
    try {
      console.log("Preparing to update with data:", formData);

      const transformQuestionsForBackend = (questions: any[]) => {
        return questions.map((q: any) => ({
          question: q.text,
          questionType: q.type,
          correctAnswer: q.type === "input" ? q.answer : undefined,
          options:
            q.type !== "input" ? q.choices.map((c: any) => c.text) : undefined,
          isLongText: q.isLongText || undefined,
        }));
      };

      // Correctly structure dataToUpdate with proper field mappings
      const dataToUpdate = {
        _id: Array.isArray(singleTraining?.training)
          ? singleTraining.training[0]?._id
          : singleTraining?.training?._id || trainingId,
        bannerImage: formData.bannerImage || "",
        title: formData.title,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate,
        modules: formData.modules,
      };

      if (trainingId) {
        console.log("Sending update with data:", dataToUpdate);
        const response = await updateTraining(trainingId, dataToUpdate);
        if (response) navigate("/awareness-training");
      }
    } catch (error) {
      console.error("Error updating training:", error);
    }
  };

  if (!singleTraining) return <div>Loading...</div>;

  const initialFormData = transformDataToFormState(singleTraining);

  // Debug log to verify the choices are properly populated
  console.log("Transformed data:", initialFormData);
  console.log(
    "Questions with choices:",
    initialFormData.modules.flatMap((m: { lessons: any[] }) =>
      m.lessons.flatMap((l) =>
        l.quizzes.flatMap((q: { questions: any[] }) =>
          q.questions.filter(
            (question: { type: string }) =>
              question.type === "multiple-choice" ||
              question.type === "checkbox"
          )
        )
      )
    )
  );

  return (
    <CreateTrainingModules
      initialData={initialFormData}
      onSave={handleUpdateTraining}
      isEditMode={true}
    />
  );
};

export default EditTrainingModules;
