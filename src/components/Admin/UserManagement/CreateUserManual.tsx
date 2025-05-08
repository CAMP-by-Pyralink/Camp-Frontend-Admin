import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import closeIcon from "../../../assets/svgs/close.svg";
import NewUserAdded from "./NewUserAdded";
import { useAdminStore } from "../../../store/useAdminStore";
import { generatePassword } from "../../../utils/generatePassword";
import Loader from "../../../shared/Loader";
import { Loader2 } from "lucide-react";

interface CreateUserManualProps {
  onCreate: () => void;
  onClose: () => void;
  type: string;
}

const CreateUserManual: React.FC<CreateUserManualProps> = ({
  onCreate,
  onClose,
}) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [department, setDepartment] = useState("");
  const [create, setCreate] = useState(false);
  const { type } = useParams<{ type: string }>();
  const {
    departments,
    fetchDepartments,
    registerAdmin,
    isLoading,
    isRegisteringAdmin,
    registerUser,
  } = useAdminStore();

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  // useEffect(() => {
  //   if (departments && departments.length > 0) {
  //     setDepartment(departments[0]);
  //   }
  // }, [departments]);

  // const handleCreateClick = async () => {
  //   // const password = generatePassword();
  //   const newUser = {
  //     fName: firstName,
  //     lName: lastName,
  //     email,
  //     // password,
  //     // confirmPassword: password,
  //     department,
  //     type: "admin",
  //     authProvider: "manual",
  //   };
  //   console.log("New User:", newUser);
  //   const response = await registerAdmin(newUser);
  //   if (response && response.status === 201) {
  //     setCreate(true);
  //     onCreate();
  //   } else {
  //     console.error("Failed to create user");
  //   }
  // };
  const handleCreateClick = async () => {
    // const password = generatePassword();
    const newUser = {
      fName: firstName,
      lName: lastName,
      email,
      // password,
      // confirmPassword: password,
      department,
      type: type.toLowerCase(),
      authProvider: "manual",
    };
    console.log("New User:", newUser);
    const response =
      type === "Admin"
        ? await registerAdmin(newUser)
        : await registerUser(newUser);
    if (response && response.status === 201) {
      setCreate(true);
      onCreate();
    } else {
      console.error("Failed to create user");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-[#344054B2] bg-opacity-40 flex justify-center items-center"
      style={{ backdropFilter: "blur(7px)" }}
    >
      <div className="bg-[#F7F9FC] w-fit px-8 py-4 rounded-lg shadow-lg relative">
        <img
          src={closeIcon}
          className="absolute right-4 top-4 cursor-pointer"
          alt="Close"
          onClick={onClose}
        />
        {!create ? (
          <div>
            <h1 className="text-center text-2xl font-medium mb-2 mt-">
              Manual
            </h1>

            <div>
              <div className="text-[#454545] text-center mb-2">
                <h2 className="text-2xl font-semibold">
                  Create a New {type === "Admin" ? "Admin" : "Employee"}
                </h2>
                <p className="text-[#333333]">
                  Enter {type === "Admin" ? "admin's" : "employee's"} details to
                  add a new {type === "Admin" ? "admin" : "employee"}
                </p>
              </div>
              {/* Email */}
              <div className="mb-4">
                <label className="block text-[#101928] text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:outline-none"
                />
              </div>
              {/* First name */}
              <div className="mb-4">
                <label className="block text-[#101928] text-sm font-medium mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:outline-none"
                />
              </div>
              {/* Last name */}
              <div className="mb-4">
                <label className="block text-[#101928] text-sm font-medium mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:outline-none"
                />
              </div>
              {/* Departments */}
              <div className="mb-4">
                <label className="block text-[#101928] text-sm font-medium mb-1">
                  Department
                </label>
                <select
                  value={department || ""}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:outline-none"
                >
                  <option value="" disabled>
                    Select Department
                  </option>
                  {departments?.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-[#101928] text-sm font-medium mb-1">
                  Role
                </label>
                <input
                  placeholder={type}
                  disabled
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              onClick={handleCreateClick}
              disabled={!!isRegisteringAdmin}
              className={`w-full bg-primary500 text-white py-3 rounded-lg font-bold flex items-center justify-center 
              ${isRegisteringAdmin ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isRegisteringAdmin ? (
                <>
                  <Loader2 className=" size-6 mr-2 animate-spin" />
                </>
              ) : (
                "Create"
              )}
            </button>
          </div>
        ) : (
          <NewUserAdded email={email} onClose={onClose} />
        )}
      </div>
    </div>
  );
};

export default CreateUserManual;
