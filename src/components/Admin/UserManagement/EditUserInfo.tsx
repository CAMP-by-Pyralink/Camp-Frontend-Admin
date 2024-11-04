import React from "react";

interface EditUserFormProps {
  setEditModalOpen: () => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ setEditModalOpen }) => {
  return (
    <div
      className="fixed inset-0 bg-[#344054B2] bg-opacity-40 flex justify-center items-center max-h-[764px]"
      style={{ backdropFilter: "blur(7.06999969482422px)" }}
    >
      <div className=" w-[60rem] bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-100 p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Edit user information
          </h2>
          <button
            className="text-xl text-gray-500 hover:text-gray-800"
            onClick={setEditModalOpen}
          >
            &times;
          </button>
        </div>
        <form className="p-8 space-y-4 border border-gray-300 rounded-md border-dotted">
          <div className="grid grid-cols-2 gap-4">
            {/* User ID */}
            <div>
              <label className="block text-sm font-medium text-[#101928]">
                User ID
              </label>
              <input
                type="text"
                value="PY 11234"
                disabled
                className="w-full mt-1 p-4 border border-gray-300 rounded-md bg-gray-100 text-[#98A2B3]"
              />
            </div>
            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-[#101928]">
                Department
              </label>
              <select
                defaultValue="Human Resource"
                className="w-full mt-1 p-4 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
              >
                <option>Human Resource</option>
                <option>IT</option>
                <option>Sales</option>
              </select>
            </div>
            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-[#101928]">
                Role
              </label>
              <select
                defaultValue="Admin"
                className="w-full mt-1 p-4 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
              >
                <option>Admin</option>
                <option>User</option>
                {/* <option>Sales</option> */}
              </select>
            </div>
            {/* Email address */}
            <div>
              <label className="block text-sm font-medium text-[#101928]">
                Email address
              </label>
              <input
                type="email"
                value="thegabriellamcpherson@email.com"
                disabled
                className="w-full mt-1 p-4 border border-gray-300 rounded-md bg-gray-100 text-[#98A2B3]"
              />
            </div>
            {/* Last name */}
            <div>
              <label className="block text-sm font-medium text-[#101928]">
                Last name
              </label>
              <input
                type="text"
                value="McPherson"
                className="w-full mt-1 p-4 border border-gray-300 rounded-md"
              />
            </div>
            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-[#101928]">
                Phone
              </label>
              <input
                type="tel"
                value="+2348113994658"
                disabled
                className="w-full mt-1 p-4 border border-gray-300 rounded-md bg-gray-100 text-[#98A2B3]"
              />
            </div>
            {/* First name */}
            <div>
              <label className="block text-sm font-medium text-[#101928]">
                First name
              </label>
              <input
                type="text"
                value="McPherson"
                className="w-full mt-1 p-4 border border-gray-300 rounded-md"
              />
            </div>
            {/* Home Address */}
            <div>
              <label className="block text-sm font-medium text-[#101928]">
                Home Address
              </label>
              <input
                type="text"
                disabled
                value="House 6, Troupe street, Ajah."
                className="w-full mt-1 p-4 border border-gray-300 rounded-md bg-gray-100 text-[#98A2B3]"
              />
            </div>
          </div>
          <button
            onClick={setEditModalOpen}
            type="submit"
            className="w-full mt-4 p-3 text-white bg-primary500 rounded-md font-medium "
          >
            Save & continue
          </button>
        </form>
      </div>
    </div>
    // absolute top-[50%] left-[55%] translate-x-[-50%] translate-y-[-50%]
  );
};

export default EditUserForm;
