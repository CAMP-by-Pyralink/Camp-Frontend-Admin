import { useParams, useLocation, Link } from "react-router-dom";
import CampaignStats from "./CampaignStats";
import PagesHomeLayout from "../../../../shared/PagesHomeLayout";
import Breadcrumb from "../../../../shared/BreadCrumb";
import ViewCampaignsTable from "./ViewCampaignTable";
import { useState } from "react";
import FilterModal from "../../UserManagement/FilterModal";

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

const CampaignDetails = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // State to hold the selected filter values
  const [selectedFilters, setSelectedFilters] = useState({
    department: "",
    status: "",
  });

  const { id } = useParams<{ id: string }>(); // Get the campaign ID from params
  const location = useLocation(); // Access location to get state
  const { templateName, campaignName, audience } = location.state || {}; // Destructure state
  console.log("Location State:", location.state);
  console.log(templateName, campaignName, audience);
  const handleAdd = () => {
    console.log("first");
  };
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

  const handleExportClick = () => {};

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
    // {
    //   key: "dateAdded",
    //   label: "Date Added",
    //   type: "date",
    // },
  ];

  return (
    <div>
      <div className=" py-4  flex items-center gap-1 text-[#828690]">
        <Link to="/phishing-simulation/campaigns">
          <h1>Campaigns</h1>
        </Link>
        <span> {">"}</span>
        <span className=" font-bold underline">View campaign</span>
        {/* <Breadcrumb /> */}
      </div>
      {/* Pass data to CampaignStats */}
      <CampaignStats
        title={campaignName}
        subtitle={templateName}
        audiences={audience}
        deliveryDates={{
          start: "July 10, 2023",
          end: "July 14, 2023",
          nextStart: "August 10, 2023",
          nextEnd: "August 14, 2023",
        }}
        stats={[
          { percentage: 90, label: "sent" },
          { percentage: 45, label: "opened" },
          { percentage: 40, label: "clicked" },
          { percentage: 23, label: "phished" },
        ]}
      />

      <PagesHomeLayout
        onFilterClick={handleFilterClick}
        onExportClick={handleExportClick}
        showFilter={true}
        showExport={true}
      >
        <ViewCampaignsTable />
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

export default CampaignDetails;
