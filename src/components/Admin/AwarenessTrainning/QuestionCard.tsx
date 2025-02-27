import React from "react";
import { Controller, useFieldArray, useWatch } from "react-hook-form";
import deleteIcon from "../../../assets/svgs/deleteIcon-gray.svg";
import addIcon from "../../../assets/svgs/add-circle.svg";

interface QuestionCardProps {
  question: any;
  questionIndex: number;
  control: any;
  onRemove: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionIndex,
  control,
  onRemove,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${questionIndex}.choices`,
  });

  const questionType = useWatch({
    control,
    name: `questions.${questionIndex}.type`,
    defaultValue: question.type,
  });

  return (
    <div className="w-full p-8 mb-4 border border-primary100 rounded-2xl shadow space-y-8">
      <div className="w-full flex gap-4 items-start">
        {/* Question Input */}
        <div className="w-full">
          <label className="block text-sm text-[#101928] font-semibold mb-2">
            Question
          </label>
          <Controller
            name={`questions.${questionIndex}.text`}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Enter your question"
                className="border border-primary100 py-4 px-3 w-full rounded-md"
              />
            )}
          />
        </div>

        {/* Question Type Dropdown */}
        <div className="w-full">
          <label className="block text-sm text-[#101928] font-semibold mb-2">
            Question type
          </label>
          <Controller
            name={`questions.${questionIndex}.type`}
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="border border-primary100 bg-transparent py-4 px-3 w-full rounded-md"
              >
                <option value="Multiple choices">Multiple choices</option>
                <option value="Checkboxes">Checkboxes</option>
                <option value="Short text">Short text</option>
                <option value="Long text">Long text</option>
              </select>
            )}
          />
        </div>

        <button type="button" onClick={onRemove} className="text-red-500 mt-7">
          Delete
        </button>
      </div>

      {/* Conditional Rendering Based on Question Type */}
      {questionType === "Multiple choices" || questionType === "Checkboxes" ? (
        <div className="space-y-4">
          <label className="block text-sm text-[#101928] font-semibold">
            Choices
          </label>
          {fields.map((item, choiceIndex) => (
            <div key={item.id} className="flex items-center gap-3">
              <Controller
                name={`questions.${questionIndex}.choices.${choiceIndex}.isChecked`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type={
                      questionType === "Multiple choices" ? "radio" : "checkbox"
                    }
                    className="h-4 w-4"
                  />
                )}
              />

              <Controller
                name={`questions.${questionIndex}.choices.${choiceIndex}.text`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder={`Option ${String.fromCharCode(
                      65 + choiceIndex
                    )}`}
                    className="border border-primary100 py-4 px-3 w-96 rounded-md"
                  />
                )}
              />

              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(choiceIndex)}
                  className="text-red-500"
                >
                  <img src={deleteIcon} alt="Delete" className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              append({
                id: `c${fields.length + 1}`,
                text: "",
                isChecked: false,
              })
            }
            className="flex items-center gap-2 text-black text-sm font-medium"
          >
            Add Option
            <img src={addIcon} alt="Add" className="h-5 w-5" />
          </button>
        </div>
      ) : null}

      {/* Answer Input for Text-based Questions */}
      {(questionType === "Short text" || questionType === "Long text") && (
        <div className="space-y-4">
          <label className="block text-sm text-[#101928] font-semibold">
            Answer
          </label>
          <Controller
            name={`questions.${questionIndex}.answer`}
            control={control}
            render={({ field }) =>
              questionType === "Short text" ? (
                <input
                  {...field}
                  type="text"
                  placeholder="Enter short answer"
                  className="border border-primary100 py-4 px-3 w-full rounded-md"
                />
              ) : (
                <textarea
                  {...field}
                  placeholder="Enter long answer"
                  className="border border-primary100 py-4 px-3 w-full rounded-md"
                  rows={4}
                />
              )
            }
          />
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
