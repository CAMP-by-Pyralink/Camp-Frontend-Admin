import { useState } from "react";

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
  const [activeTab, setActiveTab] = useState<"manual" | "csv">("manual");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Admin");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([
    "allAccess",
  ]);

  const togglePermission = (id: string) => {
    if (selectedPermissions.includes(id)) {
      setSelectedPermissions((prev) => prev.filter((perm) => perm !== id));
    } else {
      setSelectedPermissions((prev) => [...prev, id]);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-[#344054B2] bg-opacity-40 flex justify-center items-center"
      style={{ backdropFilter: "blur(7.06999969482422px)" }}
    >
      <div className="bg-[#F7F9FC] w-fit px-8 py-6 rounded-lg shadow-lg relative">
        {/* Tabs */}
        <div className="flex justify-between mb-4">
          <button
            className={`w-1/2 py-2 text-center ${
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

        {/* Form */}
        {activeTab === "manual" ? (
          <>
            <div className=" text-[#454545] text-center">
              <h2 className="text-2xl font-semibold mb-2">Create a New User</h2>
              <p className="text-[#333333] mb-4">
                Enter user details to add a new user
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
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                {/* Add more roles as needed */}
              </select>
            </div>

            {/* Permissions */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold">Permissions</h3>
              <p className="text-gray-600 mb-4">
                Set the permissions for this role
              </p>

              {permissions.map((perm) => (
                <div key={perm.id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={perm.id}
                    checked={selectedPermissions.includes(perm.id)}
                    onChange={() => togglePermission(perm.id)}
                    className="mr-2 focus:ring-blue-500"
                  />
                  <label htmlFor={perm.id} className="text-sm font-semibold">
                    {perm.label}
                  </label>
                  <p className="text-gray-500 ml-2 text-sm">
                    {perm.description}
                  </p>
                </div>
              ))}
            </div>

            <button className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600">
              Create
            </button>
          </>
        ) : (
          <>
            {/* CSV Upload Tab Content */}
            <h2 className="text-2xl font-bold mb-4">Upload CSV</h2>
            <p className="text-gray-600 mb-6">
              Upload a CSV file to create users in bulk.
            </p>
            <input type="file" className="mb-4" />
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600">
              Upload CSV
            </button>
          </>
        )}

        {/* Close Button */}
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
