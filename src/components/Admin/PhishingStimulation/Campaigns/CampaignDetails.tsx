import { useParams, useLocation, Link } from "react-router-dom";
import CampaignStats from "./CampaignStats";
import PagesHomeLayout from "../../../../shared/PagesHomeLayout";
import Breadcrumb from "../../../../shared/BreadCrumb";
import ViewCampaignsTable from "./ViewCampaignTable";

const CampaignDetails = () => {
  const { id } = useParams<{ id: string }>(); // Get the campaign ID from params
  const location = useLocation(); // Access location to get state
  const { templateName, campaignName, audience } = location.state || {}; // Destructure state
  console.log("Location State:", location.state);
  console.log(templateName, campaignName, audience);
  const handleAdd = () => {
    console.log("first");
  };
  const handleFilterClick = () => {
    // Filter logic based on id
  };

  const handleExportClick = () => {
    // Export logic based on id
  };

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
    </div>
  );
};

export default CampaignDetails;
