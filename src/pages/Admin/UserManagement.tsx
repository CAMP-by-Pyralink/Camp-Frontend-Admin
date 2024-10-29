import { useParams } from "react-router-dom";
import { FiFilter } from "react-icons/fi";
import { BsDownload } from "react-icons/bs";
import CreateUserModal from "../../components/Admin/UserManagement/CreateUserModal";

import addUsersIcon from "../../assets/svgs/adduser.svg";
import Button from "../../shared/Button";
import UserList from "../../components/Admin/UserManagement/UserList";
import { useState } from "react";

const UserManagement = ({ label, omClick }) => {
  const { type } = useParams<{ type: string }>(); // Fetch the dynamic type from the URL (e.g., "user" or "admin")
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeUser, setActiveUser] = useState(false);
  const handleAddUserClick = () => {
    setIsModalOpen(true);
    console.log("clicked");
    console.log(isModalOpen);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {activeUser ? (
        <div className=" bg-red-500 flex justify-center items-center h-screen">
          <div className=" flex flex-col items-center gap-4">
            <img src={addUsersIcon} alt="" className=" w-[288.25px]" />
            <p className=" text-[#464646]">
              Nothing here, add/Upload your employes
            </p>
            <Button label="Add User" onClick={handleAddUserClick}></Button>
          </div>
          {isModalOpen && <CreateUserModal onClose={handleCloseModal} />}
        </div>
      ) : (
        <div>
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-greyText text-2xl font-medium">
                {type === "admin" ? "Manage Admins" : "Manage Users"}
              </h1>
              <h3 className="text-greyText text-sm">
                {type === "admin"
                  ? "Create admins and assign roles"
                  : "Create users and assign roles"}
              </h3>
            </div>
            <div
              className="bg-primary500 py-[10px] text-center rounded-lg text-white w-[180px] cursor-pointer"
              onClick={handleAddUserClick}
            >
              Add {type === "admin" ? "Admin" : "User"}
            </div>
          </div>
          {/*  */}
          <div className=" bg-blue50 p-8 rounded-md">
            <div className="bg-white  rounded-md w-full mt-4 py-[10px] px-[20px]">
              <div className="flex items-center justify-between ">
                <input
                  type="text"
                  placeholder="Search"
                  className=" border-[0.5px] border-black rounded-lg px-4 py-2 w-full max-w-xs"
                />
                <div className="flex gap-2">
                  <button className="flex items-center border border-primary500 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-200">
                    <FiFilter className="mr-2" />
                    Filter
                  </button>
                  <button className="flex items-center bg-primary500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700">
                    <BsDownload className="mr-2" />
                    Export CSV
                  </button>
                </div>
              </div>
            </div>
            {/*  */}
            <div className=" mt-8">
              <UserList />
            </div>
          </div>

          {/* Render the CreateUserModal when the modal state is true */}
          {isModalOpen && <CreateUserModal onClose={handleCloseModal} />}
        </div>
      )}
    </div>
  );
};

export default UserManagement;
