import { useNavigate } from "react-router-dom";
import Table from "../../../../shared/Table";
import { useCampaignStore } from "../../../../store/useCampaignStore";
import { useEffect } from "react";

interface Campaign {
  _id: string;
  campaignName: string;
  companyName: string;
  createdAt: string;
  recipientCount: number;
  templateTitle: string;
  users: Array<{
    _id: string;
    fName: string;
    lName: string;
    email: string;
  }>;
}

interface TableRowData {
  id: string;
  templateName: string;
  campaignName: string;
  audience: string[];
  status: string;
  recipient: number;
  companyName: string;
  createdAt: string;
}

const assignedColumns = [
  { key: "templateName", header: "TEMPLATE NAME" },
  { key: "campaignName", header: "CAMPAIGN NAME" },
  {
    key: "audience",
    header: "AUDIENCE",
    render: (audiences: string[]) => (
      <div className="flex flex-wrap gap-2">
        {audiences.map((audience, index) => (
          <span
            key={index}
            className="py-1 px-3 rounded-lg bg-[#DEEFFC] text-[#1790E7]"
          >
            {audience}
          </span>
        ))}
      </div>
    ),
  },
  {
    key: "status",
    header: "STATUS",
    render: (status: string) => (
      <span
        className={`py-[2px] px-3 rounded-xl text-[14px] ${
          status === "Completed"
            ? "bg-[#DFFCDE] text-[#00B598]"
            : "bg-[#FFF0DD] text-[#CC7914]"
        }`}
      >
        {status}
      </span>
    ),
  },
  { key: "recipient", header: "RECIPIENT" },
];

const CampaignsTable = () => {
  const navigate = useNavigate();
  const { getAllCampaigns, campaigns } = useCampaignStore();

  useEffect(() => {
    getAllCampaigns();
  }, [getAllCampaigns]);

  console.log(campaigns, "campaigns");

  // Transform backend data to match table format
  const transformedData: TableRowData[] = campaigns.map(
    (campaign: Campaign) => ({
      id: campaign._id,
      templateName: campaign.templateTitle,
      campaignName: campaign.campaignName,
      audience: campaign.users.map((user) => `${user.fName} ${user.lName}`), // Using user names as audience
      status: "In progress", // You can add logic to determine status based on your business rules
      recipient: campaign.recipientCount,
      companyName: campaign.companyName,
      createdAt: campaign.createdAt,
    })
  );

  const handleRowClick = (row: TableRowData) => {
    console.log(`Row clicked with id: ${row.id}`);
    console.log("Navigating with state:", {
      templateName: row.templateName,
      campaignName: row.campaignName,
      audience: row.audience,
    });
    navigate(`/phishing-simulation/campaign-details/${row.id}`, {
      state: {
        templateName: row.templateName,
        campaignName: row.campaignName,
        audience: row.audience,
        companyName: row.companyName,
        createdAt: row.createdAt,
      },
    });
  };

  return (
    <div>
      <div>
        <Table
          headerBgColor="white"
          data={transformedData}
          columns={assignedColumns}
          onRowClick={handleRowClick}
        />
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-[#070707]">Page 1 of 7</span>
        <div className="flex gap-2">
          <button className="px-[14px] py-2 text-sm text-[#D0D5DD] border rounded-lg border-[#EAECF0] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] bg-white">
            Prev
          </button>
          <button className="px-[14px] py-2 text-sm border rounded-lg border-[#EAECF0] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] bg-white">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignsTable;
