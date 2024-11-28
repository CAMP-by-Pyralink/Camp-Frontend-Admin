import React from "react";
import { Controller } from "react-hook-form";
import deleteIcon from "../../../assets/svgs/deleteIcon-gray.svg";
import addIcon from "../../../assets/svgs/add-circle.svg";

export type QuestionType = "Multiple choices" | "Checkboxes";

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
}

interface QuestionCardProps {
  question: Question;
  questionIndex: number;
  control: any;
  update: (index: number, updatedData: any) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionIndex,
  control,
  update,
}) => {
  return (
    <div className="w-full p-8 mb-4 border border-primary100 rounded-2x shadow space-y-8">
      <div className=" w-full flex gap-4">
        {/* Question Input */}
        <div className=" w-full">
          <label htmlFor="" className=" block text-sm font-medium">
            Question
          </label>
          <Controller
            name={`questions.${questionIndex}.text`}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Question"
                className=" border border-primary100 py-4 px-3 w-full  rounded-md"
              />
            )}
          />
        </div>
        {/* Question Type */}
        <div className=" w-full">
          <label htmlFor="" className=" block text-sm font-medium">
            Question type
          </label>
          <Controller
            name={`questions.${questionIndex}.type`}
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className=" border border-primary100 py-4 px-3 w-full  rounded-md"
              >
                <option value="Multiple choices">Multiple choices</option>
                <option value="Checkboxes">Checkboxes</option>
              </select>
            )}
          />
        </div>
      </div>

      {/* Choices */}
      <label htmlFor="" className=" block text-sm font-medium">
        Choices
      </label>
      <Controller
        name={`questions.${questionIndex}.choices`}
        control={control}
        render={({ field: { value } }) => (
          <div>
            {value.map((choice: Choice, choiceIndex: number) => (
              <div key={choice.id} className="flex items-center mb-2 space-x-2">
                {/* Choice Selection */}
                <Controller
                  name={`questions.${questionIndex}.choices.${choiceIndex}.isChecked`}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type={
                        question.type === "Multiple choices"
                          ? "radio"
                          : "checkbox"
                      }
                      className="mr-2"
                    />
                  )}
                />

                {/* Choice Text */}
                <div className=" flex items-center gap-4">
                  <Controller
                    name={`questions.${questionIndex}.choices.${choiceIndex}.text`}
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        placeholder="Option"
                        className=" border border-primary100 py-4 px-3 w-[393px] rounded-md"
                      />
                    )}
                  />
                  <img src={deleteIcon} alt="" />
                </div>
              </div>
            ))}
          </div>
        )}
      />
      {/* Add Option */}
      <button
        type="button"
        onClick={() =>
          update(questionIndex, {
            ...question,
            choices: [
              ...question.choices,
              {
                id: `c${question.choices.length + 1}`,
                text: "",
                isChecked: false,
              },
            ],
          })
        }
        className="mt-2 flex items-center gap-2 "
      >
        Add Option
        <img src={addIcon} alt="" />
      </button>
    </div>
  );
};

export default QuestionCard;
