import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import QuestionCard from "./QuestionCard";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import dragIcon from "../../../assets/svgs/dragIcon.svg";
import { QuestionType } from "../../../store/useAwarenessTrainingStore";

interface Choice {
  id: string;
  text: string;
  isChecked: boolean;
}

interface Question {
  id: string;
  text: string;
  type: QuestionType;
  choices: Choice[];
  answer?: string;
  isLongText?: boolean; // Added to distinguish between short and long text inputs
  displayType?: string; // For UI display purposes
}

interface FormData {
  questions: Question[];
}

const CreateTrainingStep3: React.FC<{ onChange: (data: any) => void }> = ({
  onChange,
}) => {
  const { control, watch, setValue } = useForm<FormData>({
    defaultValues: {
      questions: [
        {
          id: "q1",
          text: "",
          type: "multiple-choice",
          displayType: "Multiple choice", // For UI display
          choices: Array.from({ length: 2 }, (_, i) => ({
            id: `c${i + 1}`,
            text: "",
            isChecked: false,
          })),
          answer: "",
          isLongText: false,
        },
      ],
    },
  });

  const {
    fields: questions,
    append,
    remove,
    move,
  } = useFieldArray({
    control,
    name: "questions",
  });

  const formData = watch();

  // Use a debounced version of the onChange handler to prevent excessive updates
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     const transformedQuestions = formData.questions.map((q) => {
  //       const answerMethod = getAnswerMethod(q.type, q.isLongText);
  //       const options = ["multiple-choice", "checkbox"].includes(q.type)
  //         ? q.choices.map((c) => c.text)
  //         : [];
  //       const correctAnswer = getCorrectAnswer(q);

  //       return {
  //         question: q.text,
  //         questionType: q.type,
  //         options,
  //         correctAnswer,
  //         answerMethod,
  //         isLongText: q.isLongText, // Pass this to backend if needed
  //       };
  //     });

  //     onChange({ questions: transformedQuestions });
  //   }, 300); // 300ms debounce

  //   return () => clearTimeout(timer);
  // }, [formData, onChange]);
  useEffect(() => {
    const stringifiedFormData = JSON.stringify(formData.questions);

    const timer = setTimeout(() => {
      const transformedQuestions = formData.questions.map((q) => {
        const answerMethod = getAnswerMethod(q.type, q.isLongText);
        const options = ["multiple-choice", "checkbox"].includes(q.type)
          ? q.choices.map((c) => c.text)
          : [];
        const correctAnswer = getCorrectAnswer(q);

        return {
          question: q.text,
          questionType: q.type,
          options,
          correctAnswer,
          answerMethod,
          isLongText: q.isLongText,
        };
      });

      onChange({ questions: transformedQuestions });
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [JSON.stringify(formData.questions), onChange]);

  const getCorrectAnswer = (q: Question) => {
    switch (q.type) {
      case "multiple-choice":
        return q.choices.find((c) => c.isChecked)?.text || "";
      case "checkbox":
        return q.choices
          .filter((c) => c.isChecked)
          .map((c) => c.text)
          .join(",");
      case "input":
        return q.answer || "";
      default:
        return "";
    }
  };

  const getAnswerMethod = (type: QuestionType, isLongText?: boolean) => {
    switch (type) {
      case "multiple-choice":
        return "multi-choice";
      case "checkbox":
        return "checkbox";
      case "input":
        return isLongText ? "input" : "input";
      default:
        return "null";
    }
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    move(result.source.index, result.destination.index);
  };

  return (
    <div className="px-12">
      <div className="space-y-6">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="questions-list">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-4"
              >
                {questions.map((question, questionIndex) => (
                  <Draggable
                    key={question.id}
                    draggableId={question.id}
                    index={questionIndex}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="flex items-center gap-4"
                      >
                        <div
                          {...provided.dragHandleProps}
                          className="cursor-grab mb-24"
                        >
                          <img src={dragIcon} alt="Drag" className="size-12" />
                        </div>
                        <QuestionCard
                          question={question}
                          questionIndex={questionIndex}
                          control={control}
                          setValue={setValue}
                          onRemove={() => remove(questionIndex)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <button
          type="button"
          onClick={() =>
            append({
              id: `q${questions.length + 1}`,
              text: "",
              type: "multiple-choice",
              displayType: "Multiple choice", // For UI display
              choices: Array.from({ length: 2 }, (_, i) => ({
                id: `c${i + 1}`,
                text: "",
                isChecked: false,
              })),
              answer: "",
              isLongText: false,
            })
          }
          className="mt-4 px-4 py-2 border border-primary500 text-black rounded"
        >
          Add Question
        </button>
      </div>
    </div>
  );
};

export default CreateTrainingStep3;
