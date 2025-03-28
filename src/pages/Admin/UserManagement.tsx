import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import filterIcon from "../../assets/svgs/filtericon.svg";
import addUsersIcon from "../../assets/svgs/adduser.svg";
import downArrowIcon from "../../assets/svgs/downArrWhiteSolid.svg";
import searchIcon from "../../assets/svgs/search.svg";
import UserList from "../../components/Admin/UserManagement/UserList";
import CreateUserManual from "../../components/Admin/UserManagement/CreateUserManual";
import UploadCsvModal from "../../shared/UploadCsvModal";
import NetworkScanFlow from "../../components/Admin/UserManagement/NetworkScanFlow";
import HeaderTitle from "../../shared/HeaderTitle";
import PagesHomeLayout from "../../shared/PagesHomeLayout";
import { useAdminStore } from "../../store/useAdminStore";
import FilterModal from "../../components/Admin/UserManagement/FilterModal";

const UserManagement = () => {
  const { type } = useParams<{ type: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [uploadCsv, setUploadCsv] = useState(false);
  const [scanNetwork, setScanNetwork] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Simplified state management
  const [hasInitialData, setHasInitialData] = useState(false);
  const [searchHasResults, setSearchHasResults] = useState(true);

  const { admins, users, getAdmins, getUsers } = useAdminStore();
  const currentData = type === "Admin" ? admins : users;

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        if (type === "Admin") {
          await getAdmins();
        } else {
          await getUsers();
        }
        setHasInitialData(currentData.length > 0);
      } catch (error) {
        console.error("Error loading data:", error);
        setHasInitialData(false);
      }
    };
    loadData();
  }, [type]);

  // Handle search with debounce
  useEffect(() => {
    const search = async () => {
      if (!searchTerm) {
        setSearchHasResults(true);
        return;
      }

      try {
        if (type === "Admin") {
          await getAdmins(searchTerm);
        } else {
          await getUsers(searchTerm);
        }
        setSearchHasResults(currentData.length > 0);
      } catch (error) {
        console.error("Search error:", error);
        setSearchHasResults(false);
      }
    };

    const timer = setTimeout(search, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, type]);

  const handleManual = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUploadCsv(false);
    setScanNetwork(false);
  };
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Empty state component
  const EmptyState = () => (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center gap-4">
        <img src={addUsersIcon} alt="Add Users" className="w-[288.25px]" />
        <p className="text-[#464646]">
          Nothing here, add/upload your {type === "Admin" ? "Admins" : "Users"}!
        </p>
        <div className="relative">
          <div
            className="bg-primary500 py-[10px] text-center rounded-lg text-white w-[180px] cursor-pointer flex items-center justify-center gap-2"
            onClick={toggleDropdown}
          >
            Add {type === "Admin" ? "Admin" : "User"}
            <img src={downArrowIcon} alt="" />
          </div>
          {isOpen && (
            <div className="absolute top-[82%] right-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <button
                className="w-full text-left px-4 py-2 border-b text-textColor hover:bg-blue50"
                onClick={() => {
                  setIsOpen(false);
                  handleManual();
                }}
              >
                Manual
              </button>
              <button
                className="w-full text-left px-4 py-2 border-b text-textColor hover:bg-blue50"
                onClick={() => {
                  setIsOpen(false);
                  setUploadCsv(true);
                }}
              >
                Upload CSV
              </button>
              <button
                className="w-full text-left px-4 py-2 border-b text-textColor hover:bg-blue50"
                onClick={() => {
                  setIsOpen(false);
                  setScanNetwork(true);
                }}
              >
                Scan network
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // No results found component
  const NoResultsFound = () => (
    <div className="flex flex-col items-center justify-center py-16">
      <p className="text-gray-500 text-lg">
        No results found for "{searchTerm}"
      </p>
      <button
        className="mt-4 text-primary500"
        onClick={() => setSearchTerm("")}
      >
        Clear search
      </button>
    </div>
  );

  if (!hasInitialData && currentData.length === 0) {
    return (
      <>
        <EmptyState />
        {isModalOpen && (
          <CreateUserManual onClose={handleCloseModal} type={type} />
        )}
      </>
    );
  }

  return (
    <div>
      <div className="relative mb-4 flex justify-between items-center">
        <HeaderTitle
          title="User Management"
          subTitle={
            type === "Admin" ? "Add or view Admins" : "Add or view Users"
          }
        />
        <div className="relative">
          <div
            className="bg-primary500 py-[10px] text-center rounded-lg text-white w-[180px] cursor-pointer flex items-center justify-center gap-2"
            onClick={toggleDropdown}
          >
            Add {type === "Admin" ? "Admin" : "User"}
            <img src={downArrowIcon} alt="" />
          </div>
          {isOpen && (
            <div className="absolute top-[82%] right-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <button
                className="w-full text-left px-4 py-2 border-b text-textColor hover:bg-blue50"
                onClick={() => {
                  setIsOpen(false);
                  handleManual();
                }}
              >
                Manual
              </button>
              <button
                className="w-full text-left px-4 py-2 border-b text-textColor hover:bg-blue50"
                onClick={() => {
                  setIsOpen(false);
                  setUploadCsv(true);
                }}
              >
                Upload CSV
              </button>
              <button
                className="w-full text-left px-4 py-2 border-b text-textColor hover:bg-blue50"
                onClick={() => {
                  setIsOpen(false);
                  setScanNetwork(true);
                }}
              >
                Scan network
              </button>
            </div>
          )}
        </div>
      </div>

      <PagesHomeLayout
        onFilterClick={() => setIsFilterModalOpen(true)}
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        onExportClick={() => {}}
        showFilter={true}
        showExport={true}
      >
        {searchTerm && !searchHasResults ? (
          <NoResultsFound />
        ) : (
          <UserList data={currentData} />
        )}
      </PagesHomeLayout>

      {isModalOpen && (
        <CreateUserManual onClose={handleCloseModal} type={type} />
      )}
      {uploadCsv && <UploadCsvModal onClose={handleCloseModal} />}
      {scanNetwork && <NetworkScanFlow onClose={handleCloseModal} />}
      {isFilterModalOpen && (
        <FilterModal
          filters={filters}
          handleFilterClick={() => setIsFilterModalOpen(false)}
          onApplyFilters={(filters) => console.log(filters)}
          selectedFilters={selectedFilters}
          handleFilterChange={handleFilterChange}
        />
      )}
    </div>
  );
};

// Filter configuration (should be moved to a separate file)
const filters = [
  {
    key: "department",
    label: "Department",
    type: "select",
    options: [
      { label: "HR", value: "hr" },
      { label: "Engineering", value: "engineering" },
      { label: "Marketing", value: "marketing" },
    ],
  },
  // ... other filter configurations ...
];

export default UserManagement;
