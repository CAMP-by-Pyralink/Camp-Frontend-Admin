import { useState, ChangeEvent, useEffect } from "react";
import addIcon from "../../assets/svgs/add-halfcircle-icon.svg";

type AddDepartmentsData = {
  companyDepartments: string[];
};

type AddDepartmentsProps = AddDepartmentsData & {
  updateFields: (fields: Partial<AddDepartmentsData>) => void;
};

const AddDepartments: React.FC<AddDepartmentsProps> = ({
  companyDepartments,
  updateFields,
}) => {
  // Use local state to manage the UI, then update the parent's state when changes occur
  const [localDepartments, setLocalDepartments] =
    useState<string[]>(companyDepartments);
  const [customDepartment, setCustomDepartment] = useState<string>("");
  const [isCustomInputVisible, setIsCustomInputVisible] =
    useState<boolean>(false);

  // Whenever localDepartments changes, update the parent state
  useEffect(() => {
    updateFields({ companyDepartments: localDepartments });
  }, [localDepartments, updateFields]);

  // Handle selecting a department from the dropdown
  const handleSelectDepartment = (
    event: ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedDepartment = event.target.value;
    if (selectedDepartment && !localDepartments.includes(selectedDepartment)) {
      const newDepartments = [...localDepartments, selectedDepartment];
      setLocalDepartments(newDepartments);
    }
  };

  // Handle adding a custom department
  const handleAddCustomDepartment = (): void => {
    if (customDepartment && !localDepartments.includes(customDepartment)) {
      const newDepartments = [...localDepartments, customDepartment];
      setLocalDepartments(newDepartments);
      setCustomDepartment("");
      setIsCustomInputVisible(false);
    }
  };

  return (
    <div>
      <h1 className="text-[#1B1818] text-4xl font-bold mb-2">Department</h1>
      <p className="text-greyText text-sm">
        Add departments to your organization
      </p>

      {/* Dropdown */}
      <div className="mt-8">
        <label htmlFor="department">Departments</label>
        <select
          id="department"
          name="department"
          defaultValue=""
          onChange={handleSelectDepartment}
          className="block w-full px-3 py-4 border border-[#D0D5DD] bg-white rounded-md shadow-sm focus:outline-none text-sm"
        >
          <option value="" disabled>
            Select department
          </option>
          <option value="ICT">ICT</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
          <option value="Business">Business</option>
          {/* Add additional options here */}
        </select>
      </div>

      {/* Selected departments */}
      <div className="flex flex-wrap items-center gap-4 justify-between mt-4">
        <div className="flex flex-wrap gap-2">
          {localDepartments.map((dept, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-secondary100 rounded-full text-sm"
            >
              {dept}
            </span>
          ))}
        </div>

        {/* Custom add button */}
        <button
          type="button"
          onClick={() => setIsCustomInputVisible(!isCustomInputVisible)}
          className="px-4 py-1 text-sm border border-[#333333] rounded-full flex items-center gap-2"
        >
          Custom add
          <img src={addIcon} alt="Add" />
        </button>
      </div>

      {/* Custom department input */}
      {isCustomInputVisible && (
        <div className="mt-4 flex items-center gap-4">
          <div className="w-full">
            <label htmlFor="customDepartment">Custom department</label>
            <div className="flex items-center gap-4">
              <input
                type="text"
                id="customDepartment"
                value={customDepartment}
                onChange={(e) => setCustomDepartment(e.target.value)}
                placeholder="Enter custom department"
                className="block w-full px-3 py-4 border border-[#D0D5DD] rounded-md focus:outline-none text-sm"
              />
              <button
                type="button"
                onClick={handleAddCustomDepartment}
                className="w-[168px] px-4 py-3 text-white bg-primary500 rounded-md"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddDepartments;
