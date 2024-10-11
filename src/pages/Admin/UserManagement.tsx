import React, { useState } from "react";
import CreateUserModal from "../../components/Admin/UserManagement/CreateUserModal";

const UserManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const handleAddUserClick = () => {
    setIsModalOpen(true); // Open the modal when "Add User" is clicked
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-greyText text-2xl font-medium">
            User Management
          </h1>
          <h3 className="text-greyText text-sm">
            Create users and assign role
          </h3>
        </div>
        <div
          className="bg-primary500 py-[10px] text-center rounded-lg text-white w-[180px] cursor-pointer"
          onClick={handleAddUserClick} // Trigger modal on click
        >
          Add User
        </div>
      </div>

      {/* Render the CreateUserModal when the modal state is true */}
      {isModalOpen && <CreateUserModal onClose={handleCloseModal} />}
    </div>
  );
};

export default UserManagement;
