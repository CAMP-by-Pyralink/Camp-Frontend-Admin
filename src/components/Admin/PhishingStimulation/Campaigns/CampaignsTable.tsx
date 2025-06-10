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
  users?: Array<{
    _id: string;
    fName: string;
    lName: string;
    email: string;
  }>;
  departments?: string[];
}

interface TableRowData {
  id: string;
  templateName: string;
  campaignName: string;
  audience: Array<{
    name: string;
    type: "user" | "department";
  }>;
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
    render: (audiences: any) => (
      <div className="flex flex-wrap gap-2">
        {audiences.map((audience: any, index: any) => (
          <span
            key={index}
            className={`py-1 px-3 rounded-lg text-[14px] ${
              audience.type === "department"
                ? "bg-[#F0F9FF] text-[#0369A1] border border-[#BAE6FD]"
                : "bg-[#DEEFFC] text-[#1790E7]"
            }`}
          >
            {/* {audience.type === "department" && <span className="mr-1">🏢</span>}
            {audience.type === "user" && <span className="mr-1">👤</span>} */}
            {audience.name}
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
    (campaign: Campaign) => {
      // Determine if campaign is user-based or department-based
      const isUserBased = campaign.users && campaign.users.length > 0;
      const isDepartmentBased =
        campaign.departments && campaign.departments.length > 0;

      let audience: Array<{ name: string; type: "user" | "department" }> = [];

      if (isUserBased) {
        audience = campaign.users!.map((user) => ({
          name: `${user.fName} ${user.lName}`,
          type: "user" as const,
        }));
      } else if (isDepartmentBased) {
        audience = campaign.departments!.map((dept) => ({
          name: dept,
          type: "department" as const,
        }));
      }

      return {
        id: campaign._id,
        templateName: campaign.templateTitle,
        campaignName: campaign.campaignName,
        audience,
        status: "In progress", // You can add logic to determine status based on your business rules
        recipient: campaign.recipientCount,
        companyName: campaign.companyName,
        createdAt: campaign.createdAt,
      };
    }
  );

  const handleRowClick = (row: TableRowData) => {
    console.log(`Row clicked with id: ${row.id}`);

    // Convert audience objects back to simple string array for CampaignDetails
    const audienceNames = row.audience.map((item) => item.name);

    console.log("Navigating with state:", {
      templateName: row.templateName,
      campaignName: row.campaignName,
      audience: audienceNames,
    });
    navigate(`/phishing-simulation/campaign-details/${row.id}`, {
      state: {
        templateName: row.templateName,
        campaignName: row.campaignName,
        audience: audienceNames,
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
