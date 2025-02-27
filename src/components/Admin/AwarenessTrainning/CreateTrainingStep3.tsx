import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import QuestionCard from "./QuestionCard";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import dragIcon from "../../../assets/svgs/dragIcon.svg";
import { QuestionType } from "../../../store/useAwarenessTrainingStore";

// export type QuestionType = "multiple-choice" | "checkbox" | "input" | "others";

export interface Choice {
  id: string;
  text: string;
  isChecked: boolean;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  choices: Choice[];
}

interface FormData {
  questions: Question[];
}

const CreateTrainingStep3: React.FC<{ onChange: (data: any) => void }> = ({
  onChange,
}) => {
  const { control, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      questions: [
        {
          id: "q1",
          text: "",
          type: "" as QuestionType,
          choices: Array.from({ length: 4 }, (_, i) => ({
            id: `c${i + 1}`,
            text: "",
            isChecked: false,
          })),
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

  const onSubmit = (data: FormData) => {
    const transformedQuestions = data.questions.map((q) => ({
      question: q.text,
      questionType: q.type,
      options: q.choices.map((c) => c.text),
      correctAnswer: q.choices.find((c) => c.isChecked)?.text || "",
      answerMethod: "user-selection",
    }));

    console.log("Transformed questions:", transformedQuestions);
    onChange({ questions: transformedQuestions });
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
              type: "" as QuestionType,
              choices: Array.from({ length: 4 }, (_, i) => ({
                id: `c${i + 1}`,
                text: "",
                isChecked: false,
              })),
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
