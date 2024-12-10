import { useState, ChangeEvent } from "react";
import addIcon from "../../assets/svgs/add-halfcircle-icon.svg";

const AddDepartments: React.FC = () => {
  const [departments, setDepartments] = useState<string[]>([]); // Store selected departments
  const [customDepartment, setCustomDepartment] = useState<string>(""); // Store custom department input value
  const [isCustomInputVisible, setIsCustomInputVisible] =
    useState<boolean>(false); // Toggle custom input visibility

  // Handle selecting a department from the dropdown
  const handleSelectDepartment = (
    event: ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedDepartment = event.target.value;
    if (selectedDepartment && !departments.includes(selectedDepartment)) {
      setDepartments([...departments, selectedDepartment]);
      // setNewDepartment("");
    }
  };

  // Handle adding a custom department
  const handleAddCustomDepartment = (): void => {
    if (customDepartment && !departments.includes(customDepartment)) {
      setDepartments([...departments, customDepartment]);
      setCustomDepartment(""); // Clear input
      setIsCustomInputVisible(false); // Hide input box
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
          {departments.map((dept, index) => (
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
          <div className=" w-full">
            <label htmlFor="">Custom department</label>
            <div className="flex items-center gap-4">
              <input
                type="text"
                value={customDepartment}
                onChange={(e) => setCustomDepartment(e.target.value)}
                placeholder="Enter custom department"
                className="block w-full px-3 py-3 border border-[#D0D5DD] rounded-md focus:outline-none text-sm"
              />
              <button
                type="button"
                onClick={handleAddCustomDepartment}
                className=" w-[168px] px-4 py-3 text-white bg-primary500 rounded-md"
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
