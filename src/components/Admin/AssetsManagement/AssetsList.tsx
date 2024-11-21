import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalLayout from "../../../shared/ModalLayout";
import DeleteModal from "../../../shared/DeleteModal";

interface Assets {
  id: number;
  assetId: string;
  name: string;
  category: string;
  purchaseDate: string;
  location: string;
  assignedTo: string;
  status: string;
  antivirusStatus: string;
  warrantyExpiration: string;
  subscriptionRenewal: string;
}

const assets: Assets[] = [
  {
    id: 1,
    assetId: "AS 111",
    name: "Photoshop",
    category: "Software",
    purchaseDate: "22/09/2024",
    location: "Inventory",
    assignedTo: "Design team",
    status: "Active",
    antivirusStatus: "Up-to-date",
    warrantyExpiration: "22/09/2024",
    subscriptionRenewal: "Monthly",
  },
  {
    id: 2,
    assetId: "AS 112",
    name: "Laptop",
    category: "Hardware",
    purchaseDate: "22/09/2024",
    location: "Management",
    assignedTo: "Design team",
    status: "Inactive",
    antivirusStatus: "Up-to-date",
    warrantyExpiration: "22/09/2024",
    subscriptionRenewal: "Monthly",
  },
  {
    id: 3,
    assetId: "AS 113",
    name: "Laptop",
    category: "Software",
    purchaseDate: "22/09/2024",
    location: "IT",
    assignedTo: "Design team",
    status: "Active",
    antivirusStatus: "Up-to-date",
    warrantyExpiration: "22/09/2024",
    subscriptionRenewal: "Monthly",
  },
  {
    id: 4,
    assetId: "AS 114",
    name: "Laptop",
    category: "Hardware",
    purchaseDate: "22/09/2024",
    location: "IT",
    assignedTo: "Design team",
    status: "Active",
    antivirusStatus: "Up-to-date",
    warrantyExpiration: "22/09/2024",
    subscriptionRenewal: "Monthly",
  },
];

const TableHeader = () => (
  <thead>
    <tr className="text-[8.4px] bg-[#F0F2F5] text-left text-greyText">
      {[
        "",
        "ASSET ID",
        "ASSET NAME",
        "CATEGORY",
        "PURCHASE DATE",
        "LOCATION",
        "ASSIGNED TO",
        "STATUS",
        "ANTIVIRUS STATUS",
        "WARRANTY EXPIRATION",
        "SUBSCRIPTION RENEWAL",
        "",
      ].map((header) => (
        <th
          key={header}
          className="p-2 border-b font-extrabold border-gray-200"
        >
          {header}
        </th>
      ))}
    </tr>
  </thead>
);

interface TableRowProps {
  asset: Assets;
  onMenuClick: (assetId: string) => void;
  onViewClick: (asset: Assets) => void;
  onDeleteClick: () => void;
  isDropdownVisible: boolean;
}

const TableRow: React.FC<TableRowProps> = ({
  asset,
  onMenuClick,
  onViewClick,
  onDeleteClick,
  isDropdownVisible,
}) => (
  <tr className="text-[#101928] text-xs relative">
    <td className="p-2 border-b border-gray-200">
      <input type="checkbox" />
    </td>
    <td className="p-2 border-b border-gray-200">{asset.assetId}</td>
    <td className="p-2 border-b border-gray-200">{asset.name}</td>
    <td className="p-2 text-greytext border-b border-gray-200">
      {asset.category}
    </td>
    <td className="p-2 border-b border-gray-200">{asset.purchaseDate}</td>
    <td className="p-2 border-b border-gray-200">{asset.location}</td>
    <td className="p-2 border-b border-gray-200">{asset.assignedTo}</td>
    <td className="p-2 border-b border-gray-200">
      <span
        className={`py-[2px] px-3 rounded-full ${
          asset.status === "Active"
            ? "bg-[#E4FCDE] text-[#0B7B69]"
            : "bg-[#FCDEDE] text-[#B30100]"
        }`}
      >
        {asset.status}
      </span>
    </td>
    <td className="p-2 border-b border-gray-200">{asset.antivirusStatus}</td>
    <td className="p-2 border-b border-gray-200">{asset.warrantyExpiration}</td>
    <td className="p-2 border-b border-gray-200">
      {asset.subscriptionRenewal}
    </td>
    <td className="p-2 border-b border-gray-200 text-center relative">
      <div
        className="cursor-pointer flex items-center justify-center border border-[#E4E7EC] rounded-lg w-8 h-8"
        onClick={() => onMenuClick(asset.assetId)}
      >
        ⋮
      </div>
      {isDropdownVisible && (
        <DropdownMenu
          onView={() => onViewClick(asset)}
          onDelete={onDeleteClick}
        />
      )}
    </td>
  </tr>
);

interface DropdownMenuProps {
  onView: () => void;
  onDelete: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ onView, onDelete }) => (
  <div className="absolute left-0 mt-2 w-[120px] bg-white border border-[#C7C7CC] rounded-md shadow-lg z-10">
    <ul className="text-left">
      <li
        className="px-4 py-2 text-[#333333] hover:bg-blue50 cursor-pointer"
        onClick={onView}
      >
        View
      </li>
      <hr />
      <li
        className="px-4 py-2 text-[#333333] hover:bg-blue50 cursor-pointer"
        onClick={onView}
      >
        Print barcode
      </li>
      <hr />{" "}
      <li
        className="px-4 py-2 text-[#333333] hover:bg-blue50 cursor-pointer"
        onClick={onView}
      >
        Edit
      </li>
      <hr />
      <li
        className="px-4 py-2 text-[#FF0301] hover:bg-blue50 cursor-pointer"
        onClick={onDelete}
      >
        Delete
      </li>
    </ul>
  </div>
);

const AssetsList = () => {
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const navigate = useNavigate();

  const handleMenuClick = (assetId: string) => {
    setSelectedAssetId((prev) => (prev === assetId ? null : assetId));
  };

  const handleViewClick = (asset: Assets) => {
    navigate(`/asset-detail/${asset.id}`, { state: { selectedAsset: asset } });
  };

  const handleDeleteClick = () => {
    console.log("Delete confirmed!");
    setDeleteModalVisible(false);
  };

  return (
    <div>
      <table className="w-full border-collapse border border-gray-200">
        <TableHeader />
        <tbody className="bg-white">
          {assets.map((asset) => (
            <TableRow
              key={asset.id}
              asset={asset}
              onMenuClick={handleMenuClick}
              onViewClick={handleViewClick}
              onDeleteClick={() => setDeleteModalVisible(true)}
              isDropdownVisible={selectedAssetId === asset.assetId}
            />
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-[#070707]">Page 1 of 7</span>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm text-gray-500 border rounded-lg bg-white">
            Prev
          </button>
          <button className="px-4 py-2 text-sm text-gray-500 border rounded-lg bg-white">
            Next
          </button>
        </div>
      </div>

      {deleteModalVisible && (
        <ModalLayout>
          <DeleteModal
            backClick={() => setDeleteModalVisible(false)}
            onDelete={handleDeleteClick}
          />
        </ModalLayout>
      )}
    </div>
  );
};

export default AssetsList;
