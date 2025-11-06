import { AssetFormData } from "./AddorEditAssets";

interface WarrantyStepProps {
  formData: AssetFormData;
  setFormData: React.Dispatch<React.SetStateAction<AssetFormData>>;
  handleChange: (field: string, value: string) => void;
}

const WarrantyStep: React.FC<WarrantyStepProps> = ({
  formData,
  setFormData,
  handleChange,
}) => {
  return (
    <div className="space-y-1">
      <label className="block text-[#101928] font-medium">Warranty</label>
      <textarea
        placeholder="Enter warranty details..."
        className="w-full min-h-[200px] border rounded p-3"
        value={formData.warranty}
        onChange={(e) => {
          const value = e.target.value; // Get the value from the event target
          setFormData((prev) => ({ ...prev, warranty: value }));
          console.log({ ...formData, warranty: value });
        }}
      />
    </div>
  );
};

export default WarrantyStep;
