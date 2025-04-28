import { useEffect, useState } from "react";
import { AssetFormData } from "./AddorEditAssets";
import laptop from "../../../assets/laptop.png";
import code from "../../../assets/barcode.png";
import InfoRow from "./InfoRow";
import { useAdminStore } from "../../../store/useAdminStore";

interface WarrantyStepProps {
  formData: AssetFormData;
  setFormData: React.Dispatch<React.SetStateAction<AssetFormData>>;
  handleChange: (field: string, value: string) => void;
}

const GeneralInfoStep: React.FC<WarrantyStepProps> = ({
  formData,
  setFormData,
  handleChange,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { departments, fetchDepartments, getUsers, users } = useAdminStore();

  useEffect(() => {
    fetchDepartments();
    getUsers();
  }, [fetchDepartments]);

  console.log(users, "deep");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData((prev) => ({
          ...prev,
          assetImage: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Image Upload Section */}
      <div className="py-[21px] px-[43px] bg-[#EBECFF] rounded-md ">
        <div className="bg-white grid grid-cols-3 px-[30px] py-5 w-full">
          {/* Uploaded or default image */}
          <div>
            <img
              src={imagePreview || formData.assetImage}
              alt=""
              className="w-[100px] h-[100px] object-cover"
            />
          </div>

          {/* Asset name */}
          <h1 className="text-[#333333] font-medium text-[24px] border-[1px] h-fit w-fit px-4 py-1 border-[#D4D5FF]">
            {formData.assetName || ""}
          </h1>

          {/* Barcode section */}
          <div className="flex flex-col items-center">
            <img src={code} alt="Barcode" className="w-[80px]" />
            <div className="text-[#333333] font-medium text-[16px] pl-4">
              {formData.barCode || ""}
            </div>
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="imageUpload"
        />

        {/* Upload Button */}
        <button
          onClick={() => document.getElementById("imageUpload")?.click()}
          className="text-white bg-primary500 rounded px-3 py-[10px] text-sm font-medium mt-5"
        >
          Upload Image
        </button>
      </div>

      {/* Form Info Rows */}
      <div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 w-full">
          {/* Asset Name */}
          <InfoRow
            label="Asset name"
            value={formData.assetName}
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, assetName: val }))
            }
            required
          />

          {/* Bar Code */}
          <InfoRow
            label="Bar code"
            value={formData.barCode}
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, barCode: val }))
            }
          />

          {/* Purchase Date - DATE */}
          <InfoRow
            label="Purchase date"
            type="date"
            value={formData.purchaseDate}
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, purchaseDate: val }))
            }
          />

          {/* Department */}
          <InfoRow
            label="Select Department (optional)"
            type="select"
            value={formData.department}
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, department: val }))
            }
            options={departments.map((dept) => dept)}
          />

          {/* Location */}
          <InfoRow
            label="Location"
            value={formData.location}
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, location: val }))
            }
          />

          {/* Current Location */}
          <InfoRow
            label="Current Location"
            value={formData.currentLocation}
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, currentLocation: val }))
            }
          />

          {/* Category */}
          <InfoRow
            label="Select category"
            type="select"
            value={formData.category}
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, category: val }))
            }
            options={["Software", "Hardware"]}
          />

          {/* Assign Asset */}
          <InfoRow
            label="Assign asset (optional)"
            type="select"
            value={formData.assignedTo}
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, assignedTo: val }))
            }
            options={users.map((user) => ({
              label: `${user.fName} ${user.lName}`,
              value: user._id,
            }))}
          />

          {/* Status */}
          <InfoRow
            label="Status"
            type="select"
            value={formData.status}
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, status: val }))
            }
            options={["Active", "Inactive"]}
          />

          {/* Antivirus Status - SELECT */}
          <InfoRow
            label="Antivirus Status"
            type="select"
            value={formData.antivirusStatus}
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, antivirusStatus: val }))
            }
            options={["Up-to-date", "Expired"]}
          />

          {/* Subscription Renewal */}
          <InfoRow
            label="Subscription renewal"
            type="select"
            value={formData.subscriptionRenewal}
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, subscriptionRenewal: val }))
            }
            options={["Monthly", "Yearly"]}
          />

          {/* Warranty Expiration - DATE */}
          <InfoRow
            label="Warranty Expiration"
            type="date"
            value={formData.warrantyExpiration}
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, warrantyExpiration: val }))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralInfoStep;
