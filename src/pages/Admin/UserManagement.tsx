import { useParams } from "react-router-dom";
import filterIcon from "../../assets/svgs/filtericon.svg";
import { BsDownload } from "react-icons/bs";
import CreateUserModal from "../../components/Admin/UserManagement/CreateUserModal";
import addUsersIcon from "../../assets/svgs/adduser.svg";
import Button from "../../shared/Button";
import UserList from "../../components/Admin/UserManagement/UserList";
import { useState } from "react";
import FilterModal from "../../components/Admin/UserManagement/FilterModal";
import downArrowIcon from "../../assets/svgs/downArrWhiteSolid.svg";
import CreateUserManual from "../../components/Admin/UserManagement/CreateUserManual";
import UploadCsvModal from "../../shared/UploadCsvModal";
import ScanNetwork from "../../shared/ScanNetwork";

const UserManagement = ({ label, omClick }) => {
  const { type } = useParams<{ type: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeUser, setActiveUser] = useState(false);
  const [uploadCsv, setUploadCsv] = useState(false);
  const [scanNetwork, setScanNetwork] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleManual = () => {
    setIsModalOpen(true);
    console.log("Add User button clicked");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUploadCsv(false);
    setScanNetwork(false);
  };

  const handleFilterClick = () => {
    setIsFilterModalOpen((prev) => !prev);
    console.log("Filter button clicked");
  };

  return (
    <div>
      {activeUser ? (
        <div className=" bg-red-500 flex justify-center items-center h-screen">
          <div className="flex flex-col items-center gap-4">
            <img
              src={addUsersIcon}
              alt="Add Users Icon"
              className="w-[288.25px]"
            />
            <p className="text-[#464646]">
              Nothing here, add/upload your employees
            </p>
            <Button label="Add User"></Button>
          </div>
          {isModalOpen && <CreateUserModal onClose={handleCloseModal} />}
        </div>
      ) : (
        <div>
          <div className="relative mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-greyText text-2xl font-medium">
                User Management
              </h1>
              <h3 className="text-greyText text-sm">
                {type === "Admin"
                  ? "Add or view admin users"
                  : "Add or view users"}
              </h3>
            </div>

            {/* Dropdown Button Wrapper */}
            <div className="relative">
              <div
                className="bg-primary500 py-[10px] text-center rounded-lg text-white w-[180px] cursor-pointer flex items-center justify-center gap-2 "
                onClick={toggleDropdown}
              >
                Add {type === "admin" ? "Admin" : "User"}
                <img src={downArrowIcon} alt="" />
              </div>

              {/* Dropdown Menu */}
              {isOpen && (
                <div className="absolute top-[82%] right-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button
                    className="w-full text-left px-4 py-2 border-b text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setIsOpen(false);
                      handleManual();
                    }}
                  >
                    Manual
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 border-b text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setIsOpen(false);
                      setUploadCsv(true);
                    }}
                  >
                    Upload CSV
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 border-b text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setIsOpen(false);
                      setScanNetwork(true);
                      // Add logic to handle "Scan network" option
                    }}
                  >
                    Scan network
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="bg-blue50 p-8 rounded-md">
            <div className="bg-white rounded-md w-full py-[10px] px-[20px]">
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-[0.5px] border-black rounded-lg px-4 py-2 w-full max-w-xs"
                />
                <div className="flex gap-2">
                  {/* Filter Button */}
                  <div
                    className="flex items-center border border-primary500 px-3 py-[2px] rounded shadow-sm cursor-pointer"
                    onClick={handleFilterClick}
                  >
                    <img src={filterIcon} className="mr-2" alt="Filter Icon" />
                    Filter
                  </div>

                  {/* Export Button */}
                  <button className="flex items-center bg-primary500 text-white px-4 py-2 rounded-md shadow-sm">
                    <BsDownload className="mr-2" />
                    Export CSV
                  </button>
                </div>
              </div>
            </div>

            {/* User List */}
            <div className="mt-8">
              <UserList />
            </div>
          </div>

          {/* Modals */}
          {isModalOpen && <CreateUserManual onClose={handleCloseModal} />}
          {uploadCsv && <UploadCsvModal onClose={handleCloseModal} />}
          {scanNetwork && <ScanNetwork onClose={handleCloseModal} />}
          {isFilterModalOpen && (
            <FilterModal handleFilterClick={handleFilterClick} />
          )}
        </div>
      )}
    </div>
  );
};

export default UserManagement;
