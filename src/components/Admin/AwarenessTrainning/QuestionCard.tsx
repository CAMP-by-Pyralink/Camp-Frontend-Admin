// // QuestionCard.tsx
// import React from "react";
// import { Controller, useFieldArray } from "react-hook-form";
// import deleteIcon from "../../../assets/svgs/deleteIcon-gray.svg";
// import addIcon from "../../../assets/svgs/add-circle.svg";

// interface QuestionCardProps {
//   question: any;
//   questionIndex: number;
//   control: any;
//   onRemove: () => void;
// }

// const QuestionCard: React.FC<QuestionCardProps> = ({
//   question,
//   questionIndex,
//   control,
//   onRemove,
// }) => {
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: `questions.${questionIndex}.choices`,
//   });

//   return (
//     <div className="w-full p-8 mb-4 border border-primary100 rounded-2xl shadow space-y-8">
//       <div className="w-full flex gap-4 items-start">
//         {/* Question Input */}
//         <div className="w-full">
//           <label className="block text-sm font-medium mb-2">Question</label>
//           <Controller
//             name={`questions.${questionIndex}.text`}
//             control={control}
//             render={({ field }) => (
//               <input
//                 {...field}
//                 placeholder="Enter your question"
//                 className="border border-primary100 py-2 px-3 w-full rounded-md"
//               />
//             )}
//           />
//         </div>

//         {/* Question Type */}
//         <div className="w-full">
//           <label className="block text-sm font-medium mb-2">
//             Question type
//           </label>
//           <Controller
//             name={`questions.${questionIndex}.type`}
//             control={control}
//             render={({ field }) => (
//               <select
//                 {...field}
//                 className="border border-primary100 py-2 px-3 w-full rounded-md"
//               >
//                 <option value="Multiple choices">Multiple choices</option>
//                 <option value="Checkboxes">Checkboxes</option>
//                 <option value="Short text">Short text</option>
//                 <option value="Long text">Long text</option>
//               </select>
//             )}
//           />
//         </div>

//         <button type="button" onClick={onRemove} className="text-red-500 mt-7">
//           Delete
//         </button>
//       </div>

//       {/* Only show choices for MCQ/Checkboxes */}
//       {(question.type === "Multiple choices" ||
//         question.type === "Checkboxes") && (
//         <div className="space-y-4">
//           <label className="block text-sm font-medium">Criteria</label>
//           {fields.map((item, choiceIndex) => (
//             <div key={item.id} className="flex items-center gap-3">
//               <Controller
//                 name={`questions.${questionIndex}.choices.${choiceIndex}.isChecked`}
//                 control={control}
//                 render={({ field }) => (
//                   <input
//                     {...field}
//                     type={
//                       question.type === "Multiple choices"
//                         ? "radio"
//                         : "checkbox"
//                     }
//                     className="h-4 w-4"
//                   />
//                 )}
//               />

//               <Controller
//                 name={`questions.${questionIndex}.choices.${choiceIndex}.text`}
//                 control={control}
//                 render={({ field }) => (
//                   <input
//                     {...field}
//                     placeholder={`Criteria ${String.fromCharCode(
//                       65 + choiceIndex
//                     )}`}
//                     className="border border-primary100 py-2 px-3 w-96 rounded-md"
//                   />
//                 )}
//               />

//               {fields.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => remove(choiceIndex)}
//                   className="text-red-500"
//                 >
//                   <img src={deleteIcon} alt="Delete" className="h-5 w-5" />
//                 </button>
//               )}
//             </div>
//           ))}

//           <button
//             type="button"
//             onClick={() =>
//               append({
//                 id: `c${fields.length + 1}`,
//                 text: "",
//                 isChecked: false,
//               })
//             }
//             className="flex items-center gap-2 text-primary500"
//           >
//             <img src={addIcon} alt="Add" className="h-5 w-5" />
//             Add Criteria
//           </button>
//         </div>
//       )}

//       {/* Show simple input for text answers */}
//       {(question.type === "Short text" || question.type === "Long text") && (
//         <div className="space-y-4">
//           <label className="block text-sm font-medium">Answer</label>
//           <Controller
//             name={`questions.${questionIndex}.text`}
//             control={control}
//             render={({ field }) =>
//               question.type === "Short text" ? (
//                 <input
//                   {...field}
//                   type="text"
//                   className="border border-primary100 py-2 px-3 w-full rounded-md"
//                   readOnly
//                 />
//               ) : (
//                 <textarea
//                   {...field}
//                   className="border border-primary100 py-2 px-3 w-full rounded-md"
//                   rows={4}
//                   readOnly
//                 />
//               )
//             }
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuestionCard;
// QuestionCard.tsx
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

  // Watch question type for real-time updates
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
          <label className="block text-sm font-medium mb-2">Question</label>
          <Controller
            name={`questions.${questionIndex}.text`}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Enter your question"
                className="border border-primary100 py-2 px-3 w-full rounded-md"
              />
            )}
          />
        </div>

        {/* Question Type Dropdown */}
        <div className="w-full">
          <label className="block text-sm font-medium mb-2">
            Question type
          </label>
          <Controller
            name={`questions.${questionIndex}.type`}
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="border border-primary100 py-2 px-3 w-full rounded-md"
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
          <label className="block text-sm font-medium">Criteria</label>
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
                    placeholder={`Criteria ${String.fromCharCode(
                      65 + choiceIndex
                    )}`}
                    className="border border-primary100 py-2 px-3 w-96 rounded-md"
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
            className="flex items-center gap-2 text-primary500"
          >
            <img src={addIcon} alt="Add" className="h-5 w-5" />
            Add Criteria
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default QuestionCard;
