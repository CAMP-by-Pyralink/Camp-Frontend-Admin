import React from "react";
import { Controller, useFieldArray, useWatch } from "react-hook-form";
import deleteIcon from "../../../assets/svgs/deleteIcon-gray.svg";
import addIcon from "../../../assets/svgs/add-circle.svg";
import { QuestionType } from "../../../store/useAwarenessTrainingStore";

interface QuestionCardProps {
  question: any;
  questionIndex: number;
  control: any;
  setValue: any;
  onRemove: () => void;
}

// Mapping UI display options to backend values
const QUESTION_TYPE_MAPPING = {
  "Multiple choice": "multiple-choice",
  Checkbox: "checkbox",
  "Short text": "input",
  "Long text": "input",
};

// Inverse mapping for display purposes
const BACKEND_TO_UI_MAPPING = {
  "multiple-choice": "Multiple choice",
  checkbox: "Checkbox",
  input: "Short text", // Default to Short text for existing data
};

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionIndex,
  control,
  setValue,
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

  const handleChoiceChange = (choiceIndex: number, value: string) => {
    setValue(`questions.${questionIndex}.choices.${choiceIndex}.text`, value);
  };

  const handleCheckboxChange = (choiceIndex: number, checked: boolean) => {
    setValue(
      `questions.${questionIndex}.choices.${choiceIndex}.isChecked`,
      checked
    );
  };

  // Handle question type change
  const handleQuestionTypeChange = (uiValue: string) => {
    // Map the UI value to backend value
    const backendValue =
      QUESTION_TYPE_MAPPING[uiValue as keyof typeof QUESTION_TYPE_MAPPING];

    // Set the type value using the backend format
    setValue(`questions.${questionIndex}.type`, backendValue);

    // For long text, set a property to distinguish from short text
    if (uiValue === "Long text") {
      setValue(`questions.${questionIndex}.isLongText`, true);
    } else {
      setValue(`questions.${questionIndex}.isLongText`, false);
    }
  };

  // Determine if the current input type is long text
  const isLongText = useWatch({
    control,
    name: `questions.${questionIndex}.isLongText`,
    defaultValue: false,
  });

  // Get UI display value for current question type
  const displayQuestionType =
    questionType === "input" && isLongText
      ? "Long text"
      : BACKEND_TO_UI_MAPPING[
          questionType as keyof typeof BACKEND_TO_UI_MAPPING
        ] || "Short text";

  return (
    <div className="w-full p-8 mb-4 border border-primary100 rounded-2xl shadow space-y-8">
      <div className="w-full flex gap-4 items-start">
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

        <div className="w-full">
          <label className="block text-sm text-[#101928] font-semibold mb-2">
            Question type
          </label>
          {/* Use Controller with custom onChange handler */}
          <Controller
            name={`questions.${questionIndex}.displayType`}
            control={control}
            defaultValue={displayQuestionType}
            render={({ field }) => (
              <select
                value={displayQuestionType}
                onChange={(e) => {
                  field.onChange(e);
                  handleQuestionTypeChange(e.target.value);
                }}
                className="border border-primary100 bg-transparent py-4 px-3 w-full rounded-md"
              >
                <option value="Multiple choice">Multiple choice</option>
                <option value="Checkbox">Checkbox</option>
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

      {questionType !== "input" ? (
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
                      questionType === "multiple-choice" ? "radio" : "checkbox"
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
                    className="border text-black border-primary100 py-4 px-3 w-96 rounded-md"
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
      ) : (
        <div className="space-y-4">
          <label className="block text-sm text-[#101928] font-semibold">
            Correct Answer
          </label>
          <Controller
            name={`questions.${questionIndex}.answer`}
            control={control}
            render={({ field }) => (
              <div>
                {isLongText ? (
                  <textarea
                    {...field}
                    placeholder="Enter correct answer"
                    className="border border-primary100 py-4 px-3 w-full rounded-md min-h-24"
                  />
                ) : (
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter correct answer"
                    className="border border-primary100 py-4 px-3 w-full rounded-md"
                  />
                )}
              </div>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
