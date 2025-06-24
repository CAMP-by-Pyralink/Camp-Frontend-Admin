// import Button from "../../shared/Button";
import { useEffect, useState } from "react";
import CampaignsTable from "../../components/Admin/PhishingStimulation/Campaigns/CampaignsTable";
import HeaderTitle from "../../shared/HeaderTitle";
import PagesHomeLayout from "../../shared/PagesHomeLayout";
import FilterModal from "../../components/Admin/UserManagement/FilterModal";
import LockedPage from "../../shared/LockedPage";
import { useCampaignStore } from "../../store/useCampaignStore";

// Define FilterConfig interface
interface FilterConfig {
  key: string;
  label: string;
  type: "select" | "date" | "text"; // Only allow these types
  options?: { label: string; value: string }[]; // Only for "select" type
}

interface SelectedFilters {
  department: string;
  status: string;
}

const Campaigns = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // State to hold the selected filter values
  const [selectedFilters, setSelectedFilters] = useState({
    department: "",
    status: "",
  });
  const { getAllCampaigns, campaigns } = useCampaignStore();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  useEffect(() => {
    getAllCampaigns("1", debouncedSearch);
  }, [debouncedSearch]);

  const handleFilterClick = () => {
    setIsFilterModalOpen((prev) => !prev);
    console.log("Filter button clicked");
  };

  const handleFilterChange = (key: string, value: string) => {
    // Update selected filter value based on key (filter)
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleExportClick = () => {
    // Export logic based on id
  };
  // Define your filters array
  const filters: FilterConfig[] = [
    {
      key: "department",
      label: "Department",
      type: "select", // Correct type here
      options: [
        { label: "HR", value: "hr" },
        { label: "Management", value: "management" },
        // { label: "Marketing", value: "marketing" },
      ],
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Phished", value: "phished" },
        { label: "Passed", value: "passed" },
        // { label: "Not Started", value: "not_started" },
      ],
    },
  ];
  const locked = false;

  if (locked) {
    return <LockedPage />;
  }
  return (
    <div>
      <HeaderTitle
        title="Phishing Campaigns"
        subTitle="View phishing campaigns"
      ></HeaderTitle>
      {/*  */}
      <PagesHomeLayout
        onFilterClick={handleFilterClick}
        onExportClick={handleExportClick}
        showFilter={true}
        showExport={true}
        onSearch={(value) => setSearchTerm(value)} // Handle search input
        searchTerm={searchTerm} // Pass search term to layout
      >
        <CampaignsTable />
      </PagesHomeLayout>
      {/*  */}
      {isFilterModalOpen && (
        <FilterModal
          filters={filters}
          handleFilterClick={() => setIsFilterModalOpen(false)} // Close filter modal
          onApplyFilters={(filters) => console.log(filters)} // Log selected filters
          selectedFilters={selectedFilters} // Pass selected filters
          handleFilterChange={handleFilterChange} // Handle filter value changes
        />
      )}
    </div>
  );
};

export default Campaigns;
