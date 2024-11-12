import { useState } from "react";
import { useParams } from "react-router-dom";
import closeIcon from "../../../assets/svgs/close.svg";
interface Permission {
  id: string;
  label: string;
  description: string;
}

interface CreateUserManualProps {
  type: string;
  onCreate: () => void;
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

const CreateUserManual: React.FC<CreateUserManualProps> = ({
  //   type,
  onCreate,
  onClose,
}) => {
  const [email, setEmail] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([
    "allAccess",
  ]);
  const { type } = useParams<{ type: string }>();

  const togglePermission = (id: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(id) ? prev.filter((perm) => perm !== id) : [...prev, id]
    );
  };

  return (
    <div
      className="fixed inset-0 bg-[#344054B2] bg-opacity-40 flex justify-center items-center max-h-[764px]"
      style={{ backdropFilter: "blur(7.06999969482422px)" }}
    >
      <div className="bg-[#F7F9FC] w-fit px-8 py-4 rounded-lg shadow-lg relative">
        <h1 className=" text-center text-2xl font-medium mb-4 mt-4">Manual</h1>
        <img
          src={closeIcon}
          className=" absolute right-4 top-4 cursor-pointer"
          alt=""
          onClick={onClose}
        />
        <div>
          <div className="text-[#454545] text-center mb-4">
            <h2 className="text-2xl font-semibold mb-">
              Create a New {type === "Admin" ? "Admin" : "Employee"}
            </h2>
            <p className="text-[#333333] mb-">
              Enter {type === "Admin" ? "admin's" : "employee's"} details to add
              a new {type === "Admin" ? "admin" : "employee"}
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
                <div className="flex flex-col mt-[-5px]">
                  <label className="text-sm text-[#101928] font-semibold ml-3">
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
            onClick={onCreate}
            className="w-full bg-primary500 text-white py-2 rounded-lg font-semibold mb-8"
          >
            Create
          </button>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default CreateUserManual;
