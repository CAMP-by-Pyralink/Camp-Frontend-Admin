import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import PagesHomeLayout from "../../shared/PagesHomeLayout";
import HeaderTitle from "../../shared/HeaderTitle";
import { useAdminStore } from "../../store/useAdminStore";
import CreateUserManual from "../../components/Admin/UserManagement/CreateUserManual";
import UploadCsvModal from "../../shared/UploadCsvModal";
import NetworkScanFlow from "../../components/Admin/UserManagement/NetworkScanFlow";
import FilterModal from "../../components/Admin/UserManagement/FilterModal";
import UserList from "../../components/Admin/UserManagement/UserList";
import addUsersIcon from "../../assets/svgs/adduser.svg";
import downArrowIcon from "../../assets/svgs/downArrWhiteSolid.svg";

// Define types for data structure
type UserType = {
  _id: string;
  email: string;
  fName: string;
  lName: string;
  role: string;
  department: string;
  companyName: string;
  createdAt: string;
};

type DataCacheType = {
  Admin: {
    all: UserType[];
    search: Record<string, UserType[]>;
  };
  User: {
    all: UserType[];
    search: Record<string, UserType[]>;
  };
};

// Create cache object outside component to persist between renders
const dataCache: DataCacheType = {
  Admin: { all: [], search: {} },
  User: { all: [], search: {} },
};

const UserManagement: React.FC = () => {
  const { type } = useParams<{ type?: string }>();
  const userType = type === "Admin" ? "Admin" : "User"; // Default to User if undefined

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [uploadCsv, setUploadCsv] = useState(false);
  const [scanNetwork, setScanNetwork] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [hasDataEverExisted, setHasDataEverExisted] = useState(
    dataCache[userType].all.length > 0
  );

  const { admins, users, getAdmins, getUsers, isLoading } = useAdminStore();
  const currentData = userType === "Admin" ? admins : users;

  // Update data cache when data changes
  useEffect(() => {
    if (currentData && currentData.length > 0) {
      dataCache[userType].all = [...currentData];
      setHasDataEverExisted(true);
    }
  }, [currentData, userType]);

  // Reset search when switching between Admin and User views
  useEffect(() => {
    setSearchTerm(""); // Reset search when type changes
  }, [userType]);

  // Initial data load - use cached data immediately if available
  useEffect(() => {
    const loadData = async () => {
      // Check if we have cached data
      if (dataCache[userType].all.length > 0) {
        setHasDataEverExisted(true);
      }

      // Load fresh data in background
      try {
        if (userType === "Admin") {
          const result = await getAdmins();
          // Don't test result directly since it's void
          if (admins && admins.length > 0) {
            setHasDataEverExisted(true);
            dataCache.Admin.all = [...admins];
          }
        } else {
          const result = await getUsers();
          // Don't test result directly since it's void
          if (users && users.length > 0) {
            setHasDataEverExisted(true);
            dataCache.User.all = [...users];
          }
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, [userType, getAdmins, getUsers, admins, users]);

  // Handle search with debounce
  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      setIsSearching(true);
      try {
        if (searchTerm.trim() !== "") {
          console.log(`Searching for ${searchTerm} in ${userType} list`);
          if (userType === "Admin") {
            await getAdmins(searchTerm);
          } else {
            await getUsers(searchTerm);
          }
        } else {
          console.log(`Loading all ${userType}s`);
          if (userType === "Admin") {
            await getAdmins();
          } else {
            await getUsers();
          }
        }
      } catch (error) {
        console.error(`Error searching ${userType}:`, error);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchTerm, userType, getAdmins, getUsers]);

  const handleManual = useCallback(() => setIsModalOpen(true), []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setUploadCsv(false);
    setScanNetwork(false);

    // Refresh data after closing modal
    if (userType === "Admin") {
      getAdmins();
    } else {
      getUsers();
    }
  }, [userType, getAdmins, getUsers]);

  const handleCreateUser = useCallback(() => {
    // Handle user creation logic here
    console.log("User created");
    handleCloseModal();
  }, [handleCloseModal]);

  const handleClearSearch = useCallback(() => {
    setSearchTerm("");
    if (userType === "Admin") {
      getAdmins();
    } else {
      getUsers();
    }
  }, [userType, getAdmins, getUsers]);

  const toggleDropdown = useCallback(() => setIsOpen((prev) => !prev), []);

  const EmptyState = useMemo(
    () => (
      <div className="flex flex-col items-center justify-center py-20">
        <img src={addUsersIcon} alt="Add Users" className="w-[288.25px]" />
        <p className="text-gray-600 mt-4">
          No {userType === "Admin" ? "Admins" : "Users"} found. Add or upload to
          begin.
        </p>
        <div className="mt-4 relative">
          <button
            className="bg-primary500 text-white py-2 px-6 rounded-lg flex items-center gap-2"
            onClick={toggleDropdown}
          >
            Add {userType === "Admin" ? "Admin" : "User"}
            <img src={downArrowIcon} alt="Down arrow" />
          </button>
          {isOpen && (
            <div className="absolute mt-2 bg-white shadow-lg border rounded-md w-44 z-10">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  setIsOpen(false);
                  handleManual();
                }}
              >
                Manual
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  setIsOpen(false);
                  setUploadCsv(true);
                }}
              >
                Upload CSV
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  setIsOpen(false);
                  setScanNetwork(true);
                }}
              >
                Scan Network
              </button>
            </div>
          )}
        </div>
      </div>
    ),
    [userType, isOpen, toggleDropdown, handleManual]
  );

  const NoResults = useMemo(
    () => (
      <div className="flex flex-col items-center py-20 text-center">
        <p className="text-gray-500">No results found for "{searchTerm}"</p>
        <button
          className="mt-4 underline text-primary500"
          onClick={handleClearSearch}
        >
          Clear Search
        </button>
      </div>
    ),
    [searchTerm, handleClearSearch]
  );

  const Loader = useMemo(
    () => (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900" />
        <span className="ml-2 text-gray-500">Loading...</span>
      </div>
    ),
    []
  );

  // Get data to display - prioritizing cached data when loading
  const dataToDisplay = useMemo(() => {
    if (currentData?.length > 0) {
      return currentData;
    }

    // If we're loading but have cached data, show cached data
    if (isLoading && dataCache[userType].all.length > 0) {
      return dataCache[userType].all;
    }

    return [];
  }, [currentData, isLoading, userType]);

  // Determine what to render
  const contentToRender = useMemo(() => {
    // If loading but we have cached data, show the table with cached data
    if (isLoading && dataCache[userType].all.length > 0) {
      return (
        <UserList
          data={dataCache[userType].all}
          setHasData={setHasDataEverExisted}
        />
      );
    }

    // If loading without cache or searching, show loader
    // if ((isLoading && !dataCache[userType].all.length) || isSearching) {
    //   return Loader;
    // }

    if (currentData?.length === 0) {
      // If searching with no results, show no results component
      if (searchTerm) {
        return NoResults;
      }

      // If never had data before, show empty state
      if (!hasDataEverExisted) {
        return EmptyState;
      }

      // Otherwise show empty table
      return <UserList data={[]} setHasData={setHasDataEverExisted} />;
    }

    // Show current data
    return <UserList data={currentData} setHasData={setHasDataEverExisted} />;
  }, [
    isLoading,
    isSearching,
    currentData,
    searchTerm,
    hasDataEverExisted,
    userType,
    Loader,
    NoResults,
    EmptyState,
    setHasDataEverExisted,
  ]);

  return (
    <div>
      <div className="flex items- justify-between">
        <HeaderTitle
          title="User Management"
          subTitle={
            userType === "Admin" ? "Add or view Admins" : "Add or view Users"
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
            <div className="absolute top-[30%] right-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
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
        {contentToRender}
      </PagesHomeLayout>

      {isModalOpen && (
        <CreateUserManual
          onClose={handleCloseModal}
          type={userType}
          onCreate={handleCreateUser}
        />
      )}
      {uploadCsv && (
        <UploadCsvModal
          onClose={handleCloseModal}
          type={userType}
          onCreate={handleCreateUser}
        />
      )}
      {scanNetwork && <NetworkScanFlow onClose={handleCloseModal} />}
      {isFilterModalOpen && (
        <FilterModal
          filters={[]}
          handleFilterClick={() => setIsFilterModalOpen(false)}
          onApplyFilters={(filters) => console.log(filters)}
          selectedFilters={{}}
          handleFilterChange={() => {}}
        />
      )}
    </div>
  );
};

export default UserManagement;
