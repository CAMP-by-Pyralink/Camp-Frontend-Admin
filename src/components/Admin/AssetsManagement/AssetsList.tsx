import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalLayout from "../../../shared/ModalLayout";
import DeleteModal from "../../../shared/DeleteModal";
import { useAssetsStore } from "../../../store/useAssetsStore";
import Loader from "../../../shared/Loader";
// import useAssetStore from "../../../stores/useAssetStore";

interface Asset {
  _id: string;
  assetId?: string; // Will generate this from _id if needed
  name?: string; // This might need to be mapped from another field
  assetImage: string;
  category: string;
  purchaseDate: string;
  location: string;
  department: string;
  assignedTo?: string; // This might need to be mapped from department
  status: string;
  antivirusStatus: string;
  warrantyExpiration: string;
  subscriptionRenewal: string;
}

const AssetsList = () => {
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  // New state for tracking selected assets
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [deleteMode, setDeleteMode] = useState<"single" | "multiple">("single");
  const [assetToDelete, setAssetToDelete] = useState<string | null>(null);

  const navigate = useNavigate();
  const { assets, isLoading, getAllAsset, deleteAsset } = useAssetsStore();

  // Fetch assets on component mount and when page changes
  useEffect(() => {
    const fetchAssets = async () => {
      await getAllAsset({ page: currentPage, limit: 10 });
    };

    fetchAssets();
  }, [getAllAsset, currentPage]);

  const handleMenuClick = (assetId: string) => {
    setSelectedAssetId((prev) => (prev === assetId ? null : assetId));
  };

  const handleViewClick = (asset: Asset) => {
    navigate(`/asset-detail/${asset._id}`, { state: { selectedAsset: asset } });
  };

  // Modified to handle both single and multiple deletions
  const handleDeleteClick = async () => {
    if (deleteMode === "single" && assetToDelete) {
      console.log("Deleting single asset:", assetToDelete);
      const response = await deleteAsset(assetToDelete);
      if (response) {
        setDeleteModalVisible(false);
        setAssetToDelete(null);
      }
    } else if (deleteMode === "multiple" && selectedAssets.length > 0) {
      console.log("Deleting multiple assets:", selectedAssets);
      // You might need to implement a batch delete function in your store
      // For now, we'll delete them one by one
      let allSuccessful = true;
      for (const assetId of selectedAssets) {
        const success = await deleteAsset(assetId);
        if (!success) {
          allSuccessful = false;
        }
      }

      if (allSuccessful) {
        setDeleteModalVisible(false);
        setSelectedAssets([]);
      }
    }
  };

  // Function to initiate deletion for a single asset
  const initiateDeleteSingle = (assetId: string) => {
    setDeleteMode("single");
    setAssetToDelete(assetId);
    setDeleteModalVisible(true);
  };

  // Function to initiate deletion for multiple assets
  const initiateDeleteMultiple = () => {
    if (selectedAssets.length > 0) {
      setDeleteMode("multiple");
      setDeleteModalVisible(true);
    }
  };

  // Handle select all checkbox
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      // Select all assets
      setSelectedAssets(transformedAssets.map((asset) => asset._id));
    } else {
      // Deselect all
      setSelectedAssets([]);
    }
  };

  // Handle individual asset selection
  const handleSelectAsset = (assetId: string, checked: boolean) => {
    if (checked) {
      setSelectedAssets((prev) => [...prev, assetId]);
    } else {
      setSelectedAssets((prev) => prev.filter((id) => id !== assetId));
    }
  };

  // Transform backend data to match the format expected by the UI
  const transformedAssets = assets.map((asset) => ({
    ...asset,
    assetId: `AS ${asset._id.substring(0, 3)}`,
    name: asset.category, // Default name to category if no name field exists
    assignedTo: asset.department, // Use department as assignedTo
  }));

  const TableHeader = () => (
    <thead>
      <tr className="text-[8.4px] bg-[#F0F2F5] text-left text-greyText">
        <th className="p-2 border-b font-extrabold border-gray-200">
          <input
            type="checkbox"
            className="w-4 h-4"
            aria-label="Select all"
            checked={
              selectedAssets.length === transformedAssets.length &&
              transformedAssets.length > 0
            }
            onChange={handleSelectAll}
          />
        </th>
        <th className="p-2 border-b font-extrabold border-gray-200">
          ASSET ID
        </th>
        <th className="p-2 border-b font-extrabold border-gray-200">
          ASSET NAME
        </th>
        <th className="p-2 border-b font-extrabold border-gray-200">
          CATEGORY
        </th>
        <th className="p-2 border-b font-extrabold border-gray-200">
          PURCHASE DATE
        </th>
        <th className="p-2 border-b font-extrabold border-gray-200">
          LOCATION
        </th>
        <th className="p-2 border-b font-extrabold border-gray-200">
          ASSIGNED TO
        </th>
        <th className="p-2 border-b font-extrabold border-gray-200">STATUS</th>
        <th className="p-2 border-b font-extrabold border-gray-200">
          ANTIVIRUS STATUS
        </th>
        <th className="p-2 border-b font-extrabold border-gray-200">
          WARRANTY EXPIRATION
        </th>
        <th className="p-2 border-b font-extrabold border-gray-200">
          SUBSCRIPTION RENEWAL
        </th>
        <th className="p-2 border-b font-extrabold border-gray-200"></th>
      </tr>
    </thead>
  );

  interface DropdownMenuProps {
    onView: () => void;
    onDelete: () => void;
    onClose: () => void;
  }

  const DropdownMenu: React.FC<DropdownMenuProps> = ({
    onView,
    onDelete,
    onClose,
  }) => (
    <div className="absolute right-2 mt-2 w-[120px] bg-white border border-[#C7C7CC] rounded-md shadow-lg z-10">
      <ul className="text-left">
        <li
          className="px-4 py-2 text-[#333333] hover:bg-blue-50 cursor-pointer"
          onClick={() => {
            onView();
            onClose();
          }}
        >
          View
        </li>
        <hr />
        <li
          className="px-4 py-2 text-[#333333] hover:bg-blue-50 cursor-pointer"
          onClick={() => {
            console.log("Print barcode");
            onClose();
          }}
        >
          Print barcode
        </li>
        <hr />
        <li
          className="px-4 py-2 text-[#333333] hover:bg-blue-50 cursor-pointer"
          onClick={() => {
            console.log("Edit asset");
            onClose();
          }}
        >
          Edit
        </li>
        <hr />
        <li
          className="px-4 py-2 text-[#FF0301] hover:bg-blue-50 cursor-pointer"
          onClick={() => {
            onDelete();
            onClose();
          }}
        >
          Delete
        </li>
      </ul>
    </div>
  );

  interface TableRowProps {
    asset: Asset;
    onMenuClick: (assetId: string) => void;
    onViewClick: (asset: Asset) => void;
    onDeleteClick: (assetId: string) => void;
    isDropdownVisible: boolean;
    isSelected: boolean;
    onSelectChange: (assetId: string, checked: boolean) => void;
  }

  const TableRow: React.FC<TableRowProps> = ({
    asset,
    onMenuClick,
    onViewClick,
    onDeleteClick,
    isDropdownVisible,
    isSelected,
    onSelectChange,
  }) => (
    <tr className="text-[#101928] text-xs relative">
      <td className="p-2 border-b border-gray-200">
        <input
          type="checkbox"
          className="w-4 h-4"
          checked={isSelected}
          onChange={(e) => onSelectChange(asset._id, e.target.checked)}
        />
      </td>
      <td className="p-2 border-b border-gray-200">{asset.assetId}</td>
      <td className="p-2 border-b border-gray-200">
        {asset.name || asset.category}
      </td>
      <td className="p-2 text-greytext border-b border-gray-200">
        {asset.category}
      </td>
      <td className="p-2 border-b border-gray-200">
        {new Date(asset.purchaseDate).toLocaleDateString("en-GB")}
      </td>
      <td className="p-2 border-b border-gray-200">{asset.location}</td>
      <td className="p-2 border-b border-gray-200">
        {asset.assignedTo || asset.department}
      </td>
      <td className="p-2 border-b border-gray-200">
        <span
          className={`py-[2px] px-3 rounded-full ${
            asset.status.toLowerCase() === "active"
              ? "bg-[#E4FCDE] text-[#0B7B69]"
              : "bg-[#FCDEDE] text-[#B30100]"
          }`}
        >
          {asset.status}
        </span>
      </td>
      <td className="p-2 border-b border-gray-200">{asset.antivirusStatus}</td>
      <td className="p-2 border-b border-gray-200">
        {new Date(asset.warrantyExpiration).toLocaleDateString("en-GB")}
      </td>
      <td className="p-2 border-b border-gray-200">
        {asset.subscriptionRenewal}
      </td>
      <td className="p-2 border-b border-gray-200 text-center relative">
        <div
          className="cursor-pointer flex items-center justify-center border border-[#E4E7EC] rounded-lg w-8 h-8"
          onClick={() => onMenuClick(asset._id)}
        >
          ⋮
        </div>
        {isDropdownVisible && (
          <DropdownMenu
            onView={() => onViewClick(asset)}
            onDelete={() => onDeleteClick(asset._id)}
            onClose={() => onMenuClick("")}
          />
        )}
      </td>
    </tr>
  );

  return (
    <div className="p-4">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* Action buttons for multiple deletion */}
          <div className="flex justify-between mb-4">
            <div className="flex items-center">
              {selectedAssets.length > 0 && (
                <button
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium"
                  onClick={initiateDeleteMultiple}
                >
                  Delete Selected ({selectedAssets.length})
                </button>
              )}
            </div>
            {/* You could add other actions here like export, etc. */}
          </div>

          <table className="w-full border-collapse border border-gray-200">
            <TableHeader />
            <tbody className="bg-white">
              {transformedAssets.map((asset) => (
                <TableRow
                  key={asset._id}
                  asset={asset}
                  onMenuClick={handleMenuClick}
                  onViewClick={handleViewClick}
                  onDeleteClick={initiateDeleteSingle}
                  isDropdownVisible={selectedAssetId === asset._id}
                  isSelected={selectedAssets.includes(asset._id)}
                  onSelectChange={handleSelectAsset}
                />
              ))}
            </tbody>
          </table>

          {/* Pagination controls */}
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-[#070707]">
              Page {currentPage} of {useAssetsStore.getState().totalPages || 1}
            </span>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 text-sm text-gray-500 border rounded-lg bg-white"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <button
                className="px-4 py-2 text-sm text-gray-500 border rounded-lg bg-white"
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(
                      prev + 1,
                      useAssetsStore.getState().totalPages || 1
                    )
                  )
                }
                disabled={currentPage === useAssetsStore.getState().totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {deleteModalVisible && (
        <ModalLayout>
          <DeleteModal
            backClick={() => setDeleteModalVisible(false)}
            onDelete={handleDeleteClick}
            itemCount={deleteMode === "multiple" ? selectedAssets.length : 1}
            title={
              deleteMode === "multiple"
                ? "Delete Multiple Assets"
                : "Delete Asset"
            }
            message={
              deleteMode === "multiple"
                ? `Are you sure you want to delete these ${selectedAssets.length} selected assets?`
                : "Are you sure you want to delete this asset?"
            }
          />
        </ModalLayout>
      )}
    </div>
  );
};

export default AssetsList;
