import Table from "../../../shared/Table";

// Define the structure of each row in the data (optional, helps with TypeScript)
interface Asset {
  id: string;
  name: string;
  category: string;
  status: string;
  antivirusStatus: string;
}

// Sample data for assets
const assetData: Asset[] = [
  {
    id: "PY-MF-2031",
    name: "Laptop",
    category: "Hardware",
    status: "Active",
    antivirusStatus: "Up-to-date",
  },
  {
    id: "PY-MF-2032",
    name: "Desktop",
    category: "Hardware",
    status: "Inactive",
    antivirusStatus: "Up-to-date",
  },
  {
    id: "PY-MF-2032",
    name: "Desktop",
    category: "Hardware",
    status: "Inactive",
    antivirusStatus: "N/A",
  },
  {
    id: "PY-MF-2032",
    name: "Desktop",
    category: "Hardware",
    status: "Active",
    antivirusStatus: "Up-to-date",
  },
];

// Define the columns with keys and headers, optionally with custom rendering
const assetColumns = [
  { key: "id", header: "Asset ID" },
  { key: "name", header: "Asset Name" },
  { key: "category", header: "Category" },
  {
    key: "status",
    header: "Status",
    render: (value: string) => (
      <span
        className={` text-white text-[10px] border rounded-xl py-[2px] px-3 ${
          value === "Active"
            ? "text-[#036B26] bg-[#E7F6EC]"
            : "text-[#AD3307] bg-[#FFECE5]"
        }`}
      >
        {value}
      </span>
    ),
  },
  {
    key: "antivirusStatus",
    header: "Antivirus Status",
    render: (value: string) => (
      <span
        className={`text-[10px] border border-[#036B26] rounded-xl py-[2px] px-3${
          value === "Up-to-date"
            ? " text-[#036B26] "
            : " text-[#98A2B3] border-[#98A2B3]"
        }`}
      >
        {value}
      </span>
    ),
  },
];

const ProfileAssignedAssets = () => {
  return (
    <>
      {/* // <div className="bg-white p-6 rounded-lg shadow-md mb-6"> */}
      {/* <h3 className="text-lg font-semibold mb-4">Assigned Assets</h3> */}
      <Table
        sectionName="Assigned Assets"
        data={assetData}
        columns={assetColumns}
        // headerBgColor="bg-blue-500"
      />

      {/* <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="text-left py-2">Asset ID</th>
            <th className="text-left py-2">Asset Name</th>
            <th className="text-left py-2">Category</th>
            <th className="text-left py-2">Status</th>
            <th className="text-left py-2">Antivirus Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2">PY-MF-2031</td>
            <td className="py-2">Laptop</td>
            <td className="py-2">Hardware</td>
            <td className="py-2 text-green-500">Active</td>
            <td className="py-2 text-green-500">Up-to-date</td>
          </tr>
        </tbody>
      </table> */}
    </>
  );
};

export default ProfileAssignedAssets;
