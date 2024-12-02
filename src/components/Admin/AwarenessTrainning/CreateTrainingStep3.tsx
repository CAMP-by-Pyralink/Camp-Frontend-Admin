import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import QuestionCard from "./QuestionCard";

export type QuestionType = "Multiple choices" | "Checkboxes";

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

const CreateTrainingStep3: React.FC = () => {
  const { control, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      questions: [
        {
          id: "q1",
          text: "",
          type: "Multiple choices",
          choices: [{ id: "c1", text: "", isChecked: false }],
        },
      ],
    },
  });

  const {
    fields: questions,
    append,
    update,
  } = useFieldArray({
    control,
    name: "questions",
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {questions.map((question, questionIndex) => (
          <QuestionCard
            key={question.id}
            question={question}
            questionIndex={questionIndex}
            control={control}
            update={update}
          />
        ))}

        <button
          type="button"
          onClick={() =>
            append({
              id: `q${questions.length + 1}`,
              text: "",
              type: "Multiple choices",
              choices: [{ id: `c1`, text: "", isChecked: false }],
            })
          }
          className="mt-4 px-4 py-2 border border-primary500 text-black rounded"
        >
          Add Question
        </button>

        {/* <button
          type="submit"
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
        >
          Submit
        </button> */}
      </form>
    </div>
  );
};

export default CreateTrainingStep3;
