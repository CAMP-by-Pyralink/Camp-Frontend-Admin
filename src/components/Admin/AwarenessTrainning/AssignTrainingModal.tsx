import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import closeIcon from "../../../assets/svgs/closeicongrey.svg";
import { useAdminStore } from "../../../store/useAdminStore";
import { useTrainingStore } from "../../../store/useAwarenessTrainingStore";

interface AssignTrainingModalProps {
  setAssignModal: (value: boolean) => void;
  selectedTraining: string | null;
}

const AssignTrainingModal = ({
  setAssignModal,
  selectedTraining,
}: AssignTrainingModalProps) => {
  const [selectedOption, setSelectedOption] = useState<
    "employee" | "department"
  >("employee"); // Default to 'employee'
  const [selectedEmployee, setSelectedEmployee] = useState<string>(""); // Selected employee ID
  const [selectedDepartment, setSelectedDepartment] = useState<string>(""); // Selected department name

  const { fetchDepartments, getUsers, departments, users, isLoading } =
    useAdminStore();
  const { assignTraining } = useTrainingStore();
  useEffect(() => {
    fetchDepartments();
    getUsers();
  }, [fetchDepartments, getUsers]);

  const handleAssignTraining = async () => {
    if (!selectedTraining) {
      console.error("No training selected.");
      return;
    }

    // const payload = {
    //   trainingId: selectedTraining, // Ensure only the ID is passed
    //   addingType: selectedOption,
    //   ...(selectedOption === "employee" && { userId: selectedEmployee }),
    //   ...(selectedOption === "department" && {
    //     departmentName: selectedDepartment,
    //   }),
    // };

    const dataToSend = {
      addingType: selectedOption,
      ...(selectedOption === "employee" && { userId: selectedEmployee }),
      ...(selectedOption === "department" && {
        departmentName: selectedDepartment,
      }),
    };

    try {
      await assignTraining(selectedTraining, dataToSend);
      setAssignModal(false);
    } catch (error) {
      console.log("Error assigning training:", error);
    }
  };

  console.log(departments, "depts");

  return (
    <div
      className="fixed inset-0 bg-[#344054B2] bg-opacity-40 flex justify-center items-center z-[999]"
      style={{ backdropFilter: "blur(7.06999969482422px)" }}
    >
      <div className="bg-white rounded-lg max-w-[500px] w-full">
        {/* Modal Header */}
        <div className="bg-[#DEEFFC] py-6 px-12 flex items-center justify-between">
          <h1 className="text-[#454545] font-medium text-xl">
            Assign Training
          </h1>
          <img
            src={closeIcon}
            alt="Close"
            className="cursor-pointer"
            onClick={() => setAssignModal(false)}
          />
        </div>

        {/* Modal Content */}
        <div className="py-12 px-12">
          {/* Selection */}
          <div className="space-y-2">
            {/* Select Employee */}
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="assignType"
                checked={selectedOption === "employee"}
                onChange={() => setSelectedOption("employee")}
              />
              <h2>Employee</h2>
            </div>
            {/* Select Department */}
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="assignType"
                checked={selectedOption === "department"}
                onChange={() => setSelectedOption("department")}
              />
              <h2>Department</h2>
            </div>
          </div>

          <div className="w-full h-[1px] bg-[#B5B3B3] my-8"></div>

          {/* Employee Selection */}
          {selectedOption === "employee" && (
            <div className="space-y-6">
              <h1 className="text-[#454545] font-medium">Select Employee</h1>
              <select
                className="border border-primary100 py-4 px-4 w-full rounded-md"
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
              >
                <option value="">Select employee</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Department Selection */}
          {selectedOption === "department" && (
            <div className="space-y-6 mt-6">
              <h1 className="text-[#454545] font-medium">Select Department</h1>
              <select
                className="border border-primary100 py-4 px-4 w-full rounded-md"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="">Select department</option>
                {departments.map((dept, index) => (
                  <option key={index} value={dept} className=" ">
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Assign Training Button */}
          <button
            className="text-white bg-primary500 rounded-md py-3 font-semibold w-full mt-8"
            onClick={handleAssignTraining}
            disabled={
              isLoading ||
              (selectedOption === "employee" && !selectedEmployee) ||
              (selectedOption === "department" && !selectedDepartment)
            }
          >
            {isLoading ? "Assigning..." : "Assign Training"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignTrainingModal;
