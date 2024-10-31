import React from "react";

interface EditUserFormProps {
  setEditModalOpen: () => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ setEditModalOpen }) => {
  return (
    <div className="w-[60rem] bg-white shadow-lg rounded-lg overflow-hidden">
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
            <label className="block text-sm font-medium text-gray-700">
              User ID
            </label>
            <input
              type="text"
              value="PY 11234"
              disabled
              className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
            />
          </div>
          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <select
              defaultValue="Human Resource"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
            >
              <option>Human Resource</option>
              <option>IT</option>
              <option>Sales</option>
            </select>
          </div>
          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <input
              type="text"
              value="Admin"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
            />
          </div>
          {/* Email address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              value="thegabriellamcpherson@email.com"
              disabled
              className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
            />
          </div>
          {/* Last name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last name
            </label>
            <input
              type="text"
              value="McPherson"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              value="+2348113994658"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
            />
          </div>
          {/* First name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First name
            </label>
            <input
              type="text"
              value="McPherson"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          {/* Home Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Home Address
            </label>
            <input
              type="text"
              value="House 6, Troupe street, Ajah."
              className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-4 p-3 text-white bg-blue-600 rounded-md font-medium hover:bg-blue-700"
        >
          Save & continue
        </button>
      </form>
    </div>
  );
};

export default EditUserForm;
