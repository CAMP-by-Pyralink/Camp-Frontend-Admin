import { useNavigate } from "react-router-dom"; // Import useNavigate
import Table from "../../../../shared/Table";
// import Table from "../../../../shared/Table";

interface AssignedTraining {
  id: number; // Ensure ID is included
  templateName: string;
  campaignName: string;
  audience: string[];
  status: string;
  recipient: number;
}

const assignedData: AssignedTraining[] = [
  {
    id: 1,
    templateName: "Happy birthday",
    campaignName: "Work test",
    audience: ["IT", "Finance"],
    status: "Completed",
    recipient: 120,
  },
  {
    id: 2,
    templateName: "Happy birthday",
    campaignName: "Work test",
    audience: ["IT"],
    status: "In progress",
    recipient: 120,
  },
  {
    id: 3,
    templateName: "Happy birthday",
    campaignName: "Work test",
    audience: ["Human Resources", "Admin"],
    status: "In progress",
    recipient: 120,
  },
];

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
  const navigate = useNavigate(); // Initialize useNavigate

  const handleRowClick = (row: AssignedTraining) => {
    console.log(`Row clicked with id: ${row.id}`); // Debugging log
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
      },
    });
  };

  return (
    <div>
      <div>
        <Table
          headerBgColor="white"
          data={assignedData}
          columns={assignedColumns}
          onRowClick={handleRowClick} // Pass the row click handler
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
