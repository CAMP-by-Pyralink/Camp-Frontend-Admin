import { useState } from "react";
import { useParams } from "react-router-dom";
import fileUploadIcon from "../../../assets/svgs/file-upload.svg";
import UploadSuccessful from "./UploadSuccessful";
import NewUserAdded from "./NewUserAdded";

interface Permission {
  id: string;
  label: string;
  description: string;
}
interface CreateUserModalProps {
  onClose: () => void;
}

const permissions: Permission[] = [
  {
    id: "allAccess",
    label: "All Access",
    description: "This is a placeholder for the description",
  },
  {
    id: "access1",
    label: "Access 1",
    description: "This is a placeholder for the description",
  },
  {
    id: "access2",
    label: "Access 2",
    description: "This is a placeholder for the description",
  },
  {
    id: "access3",
    label: "Access 3",
    description: "This is a placeholder for the description",
  },
];

const CreateUserModal: React.FC<CreateUserModalProps> = ({ onClose }) => {
  const { type } = useParams<{ type: string }>();
  const [activeTab, setActiveTab] = useState<"manual" | "csv">("manual");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Admin");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([
    "allAccess",
  ]);
  const [create, setCreate] = useState(false);

  const togglePermission = (id: string) => {
    if (selectedPermissions.includes(id)) {
      setSelectedPermissions((prev) => prev.filter((perm) => perm !== id));
    } else {
      setSelectedPermissions((prev) => [...prev, id]);
    }
  };

  const handleCreateClick = () => {
    setCreate(true);
  };

  return (
    <div
      className="fixed inset-0 bg-[#344054B2] bg-opacity-40 flex justify-center items-center "
      style={{ backdropFilter: "blur(7.06999969482422px)" }}
    >
      <div className="bg-[#F7F9FC] w-fit px-8 py-6 rounded-lg shadow-lg relative">
        {!create ? (
          <>
            <div className="flex justify-between mb-2">
              <button
                className={`w-1/2 py-2 text-center text-base ${
                  activeTab === "manual"
                    ? "border-b-[5px] border-primary500 font-semibold bg-[#EBECFF]"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("manual")}
              >
                Manual
              </button>
              <button
                className={`w-1/2 py-2 text-center ${
                  activeTab === "csv"
                    ? "border-b-[5px] border-primary500 bg-[#EBECFF] font-semibold"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("csv")}
              >
                Upload CSV
              </button>
            </div>

            {activeTab === "manual" ? (
              <>
                <div className="text-[#454545] text-center">
                  <h2 className="text-2xl font-semibold mb-">
                    Create a New {type === "admin" ? "Admin" : "Employee"}
                  </h2>
                  <p className="text-[#333333] mb-">
                    Enter {type === "admin" ? "admin's" : "employee's"} details
                    to add a new {type === "Admin" ? "admin" : "employee"}
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-[#101928] text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border text-[#E4E7EC] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-[#101928] text-sm font-medium mb-1">
                    Role
                  </label>
                  <input
                    placeholder={type}
                    disabled
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className={`mb-6 ${type === "User" ? "hidden" : "block"}`}>
                  <h3 className="text-lg text-[#101928]">Permissions</h3>
                  <p className="text-[#101928] mb-4">
                    Set the permissions for this role
                  </p>
                  {permissions.map((perm) => (
                    <div key={perm.id} className="flex items-start mb-2">
                      <div
                        onClick={() => togglePermission(perm.id)}
                        style={{
                          width: "32.5px",
                          height: "20px",
                          borderRadius: "12px",
                          backgroundColor: selectedPermissions.includes(perm.id)
                            ? "#282EFF"
                            : "#ccc",
                          position: "relative",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: selectedPermissions.includes(perm.id)
                            ? "flex-end"
                            : "flex-start",
                          padding: "2px",
                        }}
                      >
                        <div
                          style={{
                            width: "16px",
                            height: "16px",
                            borderRadius: "50%",
                            backgroundColor: "#fff",
                            transition: "0.3s",
                          }}
                        />
                      </div>
                      <div className=" flex flex-col mt-[-5px]">
                        <label
                          htmlFor={perm.id}
                          className="text-sm text-[#101928] font-semibold ml-3"
                        >
                          {perm.label}
                        </label>
                        <p className="text-[#667185] ml-2 text-sm">
                          {perm.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleCreateClick} // Call handleCreateClick on click
                  className="w-full bg-primary500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600"
                >
                  Create
                </button>
              </>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-4">Upload CSV</h2>
                <p className="text-[#04012D] mb-4">
                  <a
                    href="#"
                    className="text-primary400 text-base font-bold underline"
                  >
                    Download
                  </a>{" "}
                  this template, populate your data and <br /> upload
                </p>

                <div className="border-dashed border-2 border-gray-400 rounded-lg p-6 mb-8">
                  <div className="flex flex-col items-center justify-center h-40">
                    <img src={fileUploadIcon} alt="" />
                    <p className="text-gray-600 mb-4">
                      Click to upload or drag and drop <br /> CSV.
                    </p>
                    <p className="text-gray-400 mb-4">OR</p>
                    <input type="file" className="hidden" id="fileUpload" />
                    <label
                      htmlFor="fileUpload"
                      className="block bg-[#C7C7CC] w-40 py-2 border text-white font-bold mb-4 rounded-xl text-center cursor-pointer"
                    >
                      Browse Files
                    </label>
                  </div>
                </div>

                <button
                  onClick={handleCreateClick} // Call handleCreateClick on click
                  className="w-full bg-primary500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600"
                >
                  Create
                </button>
              </div>
            )}
          </>
        ) : (
          <NewUserAdded />
        )}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          &#x2715;
        </button>
      </div>
    </div>
  );
};

export default CreateUserModal;
