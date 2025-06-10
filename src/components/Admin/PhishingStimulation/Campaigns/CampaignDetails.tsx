import { useParams, useLocation, Link } from "react-router-dom";
import CampaignStats from "./CampaignStats";
import PagesHomeLayout from "../../../../shared/PagesHomeLayout";
import Breadcrumb from "../../../../shared/BreadCrumb";
import ViewCampaignsTable from "./ViewCampaignTable";
import { useEffect, useState } from "react";
import FilterModal from "../../UserManagement/FilterModal";
import { useCampaignStore } from "../../../../store/useCampaignStore";
import Loader from "../../../../shared/Loader";

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

  const { getSingleCampaign, isLoading, singleCampaign } = useCampaignStore();

  useEffect(() => {
    if (id) {
      getSingleCampaign(id);
    }
  }, [id, getSingleCampaign]);

  console.log(singleCampaign, "singleCamp");

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Helper function to format time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Calculate stats from backend data
  const calculateStats = () => {
    if (
      !singleCampaign ||
      !singleCampaign.recipients ||
      singleCampaign.recipients.length === 0
    ) {
      return [
        { percentage: 0, label: "sent" },
        { percentage: 0, label: "opened" },
        { percentage: 0, label: "clicked" },
        { percentage: 0, label: "phished" },
      ];
    }

    const totalRecipients = singleCampaign.recipients.length;
    const sentCount = singleCampaign.recipients.filter(
      (r: { sentStatus: string }) => r.sentStatus === "sent"
    ).length;
    const openedCount = singleCampaign.recipients.filter(
      (r: { opened: boolean }) => r.opened === true
    ).length;
    const clickedCount = singleCampaign.recipients.filter(
      (r: { clicked: boolean }) => r.clicked === true
    ).length;
    const phishedCount = singleCampaign.recipients.filter(
      (r: { phished: boolean }) => r.phished === true
    ).length;

    return [
      {
        percentage:
          totalRecipients > 0
            ? Math.round((sentCount / totalRecipients) * 100)
            : 0,
        label: "sent",
      },
      {
        percentage:
          totalRecipients > 0
            ? Math.round((openedCount / totalRecipients) * 100)
            : 0,
        label: "opened",
      },
      {
        percentage:
          totalRecipients > 0
            ? Math.round((clickedCount / totalRecipients) * 100)
            : 0,
        label: "clicked",
      },
      {
        percentage:
          totalRecipients > 0
            ? Math.round((phishedCount / totalRecipients) * 100)
            : 0,
        label: "phished",
      },
    ];
  };

  // Get delivery dates from backend data
  const getDeliveryDates = () => {
    if (
      !singleCampaign ||
      !singleCampaign.sendAt ||
      singleCampaign.sendAt.length === 0
    ) {
      return {
        start: "Not scheduled",
        end: "Not scheduled",
        nextStart: "Not scheduled",
        nextEnd: "Not scheduled",
      };
    }

    const scheduledDate = singleCampaign.sendAt[0];
    const formattedDate = formatDate(scheduledDate);
    const formattedTime = formatTime(scheduledDate);

    return {
      start: formattedDate,
      end: formattedDate, // Assuming same day delivery
      nextStart: "Not scheduled", // You can calculate next delivery if needed
      nextEnd: "Not scheduled",
      time: formattedTime,
    };
  };

  // Helper function to normalize audience data
  const normalizeAudienceData = (audienceData: any): string[] => {
    if (!audienceData) return [];

    // If it's already an array of strings, return as is
    if (Array.isArray(audienceData) && typeof audienceData[0] === "string") {
      return audienceData;
    }

    // If it's an array of objects with name/type structure, extract names
    if (
      Array.isArray(audienceData) &&
      audienceData[0] &&
      typeof audienceData[0] === "object" &&
      "name" in audienceData[0]
    ) {
      return audienceData.map((item: any) => item.name);
    }

    // If it's a single string, wrap in array
    if (typeof audienceData === "string") {
      return [audienceData];
    }

    return [];
  };

  // Get audiences from backend data
  const getAudiences = () => {
    if (
      !singleCampaign ||
      !singleCampaign.recipients ||
      singleCampaign.recipients.length === 0
    ) {
      // Use the normalized audience from location state as fallback
      return normalizeAudienceData(audience);
    }

    // Extract unique departments from recipients
    const departments = [
      ...new Set(
        singleCampaign.recipients
          .map((r: { department: any }) => r.department)
          .filter(Boolean)
      ),
    ];
    return departments.length > 0
      ? departments
      : normalizeAudienceData(audience);
  };

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
        { label: "ICT", value: "ICT" },
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

  // Show loading state while data is being fetched
  if (isLoading) {
    return <Loader />;
  }

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

      {/* Pass backend data to CampaignStats */}
      <CampaignStats
        title={singleCampaign?.campaignName || campaignName || "Campaign"}
        subtitle={singleCampaign?.templateName || templateName || "Template"}
        audiences={getAudiences()}
        deliveryDates={getDeliveryDates()}
        stats={calculateStats()}
      />

      <PagesHomeLayout
        onFilterClick={handleFilterClick}
        onExportClick={handleExportClick}
        showFilter={true}
        showExport={true}
      >
        <ViewCampaignsTable
          singleCampaign={singleCampaign}
          isLoading={isLoading}
        />
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
