// import Button from "../../shared/Button";
import CampaignsTable from "../../components/Admin/PhishingStimulation/Campaigns/CampaignsTable";
import PagesHomeLayout from "../../shared/PagesHomeLayout";

const Campaigns = () => {
  const handleFilterClick = () => {
    // Filter logic based on id
  };

  const handleExportClick = () => {
    // Export logic based on id
  };
  return (
    <div>
      <div className=" flex justify-between mb-4">
        <div className=" text-greyText">
          <h1 className=" text-2xl  font-medium tracking-[-2%] leading-[28.8px]">
            Phishing Campaigns
          </h1>
          <p className=" text-sm">View phishing campaigns</p>
        </div>
        {/* <Button onClick={handleAdd} label="Add New" /> */}
      </div>
      {/*  */}
      <PagesHomeLayout
        onFilterClick={handleFilterClick}
        onExportClick={handleExportClick}
        showFilter={true}
        showExport={true}
      >
        <CampaignsTable />
      </PagesHomeLayout>
    </div>
  );
};

export default Campaigns;
