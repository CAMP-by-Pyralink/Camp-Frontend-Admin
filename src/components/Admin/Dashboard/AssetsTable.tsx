interface Asset {
  id: string;
  name: string;
  category: string;
  purchaseDate: string;
  assignedTo: string;
}

const assetsData: Asset[] = [
  {
    id: "AS 112",
    name: "Photoshop",
    category: "Software",
    purchaseDate: "22-09-2024",
    assignedTo: "Design team",
  },
  {
    id: "AS 112",
    name: "Laptop",
    category: "Hardware",
    purchaseDate: "22-09-2024",
    assignedTo: "Olamide",
  },
  {
    id: "AS 112",
    name: "Laptop",
    category: "Hardware",
    purchaseDate: "22-09-2024",
    assignedTo: "HR",
  },
  {
    id: "AS 112",
    name: "Laptop",
    category: "Hardware",
    purchaseDate: "22-09-2024",
    assignedTo: "HR",
  },
  {
    id: "AS 112",
    name: "Laptop",
    category: "Hardware",
    purchaseDate: "22-09-2024",
    assignedTo: "HR",
  },
];

const AssetsTable: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-[5px_5px_40px_rgba(107,151,255,0.3)] w-full">
      <div className="flex justify-between items-center">
        <h2 className=" ">Assets</h2>
        <a href="/view-all" className="text-primary500 hover:underline">
          View all
        </a>
      </div>
      <div className="mt-4 ml-4 overflow-x-auto">
        <table className="min-w-[80%] table-auto border-collapse">
          <thead>
            <tr className=" text-left text-sm text-[#454545] font-bold">
              <th className="px-[20px] py-[11px] ">ASSET ID</th>
              <th className="px-[20px] py-[11px] ">ASSET NAME</th>
              <th className="px-[20px] py-[11px] ">CATEGORY</th>
              <th className="px-[20px] py-[11px] ">PURCHASE DATE</th>
              <th className="px-[20px] py-[11px] ">ASSIGNED</th>
            </tr>
          </thead>
          <tbody className="text-[#404040] text-[10px] font-medium">
            {assetsData.map((asset, index) => (
              <tr key={index} className=" border-t-[0.5px] border-[#E8E8E8]">
                <td className="px-8 py-6 text-[#404040]">{asset.id}</td>
                <td className="px-8 py-2 text-[#404040]">{asset.name}</td>
                <td className="px-8 py-2">{asset.category}</td>
                <td className="px-8 py-2">{asset.purchaseDate}</td>
                <td className="px-8 py-2">{asset.assignedTo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetsTable;
