import { useState } from "react";
import AddPartModal from "./AddPartModal";
import { AssetFormData } from "./AddorEditAssets";

interface PartsItemsStepProps {
  formData: AssetFormData;
  setFormData: React.Dispatch<React.SetStateAction<AssetFormData>>;
  handleChange: (field: string, value: string) => void;
}
const PartsItemsStep: React.FC<PartsItemsStepProps> = ({
  formData,
  setFormData,
  handleChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="space-y-">
      {/* Add Part Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={openModal}
          className="px-8 py-2 border border-primary600 text-primary600 rounded-lg "
        >
          Add New
        </button>
      </div>

      {/* Parts Table */}
      {/* <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-2 border">Part Number</th>
              <th className="text-left p-2 border">Asset ID</th>
              <th className="text-left p-2 border">Quantity</th>
              <th className="text-left p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border">123456</td>
              <td className="p-2 border">Asset-001</td>
              <td className="p-2 border">5</td>
              <td className="p-2 border">
                <button className="text-red-500 hover:underline">Remove</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div> */}

      {/* Modal */}
      {isModalOpen && <AddPartModal onClose={closeModal} />}
    </div>
  );
};

export default PartsItemsStep;
