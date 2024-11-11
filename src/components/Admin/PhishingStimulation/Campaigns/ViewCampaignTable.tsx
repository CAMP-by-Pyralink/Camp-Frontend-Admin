import { useNavigate } from "react-router-dom"; // Import useNavigate
import Table from "../../../../shared/Table";

interface AssignedTraining {
  id: number; // Ensure ID is included
  email: string;
  department: string;
  templateName: string;
  campaignName: string;
  //   audience: string[];
  status: string;
  date: string;
}

const assignedData: AssignedTraining[] = [
  {
    id: 1,
    email: "Olamide@gmail.com",
    department: "Management",
    templateName: "Happy birthday",
    campaignName: "Work test",
    status: "Passed",
    date: "23/04/2023  11:59PM",
  },
  {
    id: 2,
    email: "Olamide@gmail.com",
    department: "HR",
    templateName: "Happy birthday",
    campaignName: "Work test",
    status: "Phished",
    date: "23/04/2023  11:59PM",
  },
  {
    id: 3,
    department: "HR",
    email: "Olamide@gmail.com",
    templateName: "Happy birthday",
    campaignName: "Work test",
    status: "Passed",
    date: "23/04/2023  11:59PM",
  },
];

const assignedColumns = [
  { key: "email", header: "EMAIL" },
  { key: "department", header: "DEPARTMENT" },
  { key: "campaignName", header: "CAMPAIGN NAME" },
  { key: "templateName", header: "TEMPLATE NAME" },

  //   {
  //     key: "audience",
  //     header: "AUDIENCE",
  //     render: (audiences: string[]) => (
  //       <div className="flex flex-wrap gap-2">
  //         {audiences.map((audience, index) => (
  //           <span
  //             key={index}
  //             className="py-1 px-3 rounded-lg bg-[#DEEFFC] text-[#1790E7]"
  //           >
  //             {audience}
  //           </span>
  //         ))}
  //       </div>
  //     ),
  //   },
  {
    key: "status",
    header: "STATUS",
    render: (status: string) => (
      <span
        className={`py-[2px] px-4 rounded-full text-[14px] ${
          status === "Passed"
            ? "bg-[#E3F9DB] text-[#2FB500]"
            : "bg-[#FFE2E1] text-[#FF5756]"
        }`}
      >
        {status}
      </span>
    ),
  },
  { key: "date", header: "DATE" },
];

const ViewCampaignsTable = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  //   const handleRowClick = (row: AssignedTraining) => {
  //     console.log(`Row clicked with id: ${row.id}`); // Debugging log
  //     console.log("Navigating with state:", {
  //       templateName: row.templateName,
  //       campaignName: row.campaignName,
  //       //   audience: row.audience,
  //     });
  //     navigate(`/phishing-simulation/campaign-details/${row.id}`, {
  //       state: {
  //         templateName: row.templateName,
  //         campaignName: row.campaignName,
  //         audience: row.audience,
  //       },
  //     });
  //   };

  return (
    <div>
      <div>
        <Table
          headerBgColor="white"
          data={assignedData}
          columns={assignedColumns}
          // onRowClick={handleRowClick} // Pass the row click handler
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

export default ViewCampaignsTable;
