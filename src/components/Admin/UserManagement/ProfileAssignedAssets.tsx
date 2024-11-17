import Table from "../../../shared/Table";

interface Asset {
  id: string;
  name: string;
  category: string;
  status: string;
  antivirusStatus: string;
}

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

const assetColumns = [
  { key: "id", header: "Asset ID" },
  { key: "name", header: "Asset Name" },
  { key: "category", header: "Category" },
  {
    key: "status",
    header: "Status",
    render: (value: string) => (
      <span
        className={` text-[10px] font-medium border rounded-xl py-[2px] px-3 ${
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
        className={`text-[10px] font-medium border border-[#036B26] rounded-xl py-[2px] px-3${
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
        headerBgColor="bg-[#F0F2F5]"
        sectionName="Assigned Assets"
        data={assetData}
        columns={assetColumns}
        // headerBgColor="bg-blue-500"
      />
    </>
  );
};

export default ProfileAssignedAssets;
