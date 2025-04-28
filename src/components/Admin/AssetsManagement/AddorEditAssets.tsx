import React, { ChangeEvent, useEffect, useState } from "react";
import GeneralInfoStep from "./GeneralInfoStep";
import DescriptionStep from "./DescriptionStep";
import WarrantyStep from "./WarrantyStep";
import PartsItemsStep from "./PartsItemsStep";
import { useAssetsStore } from "../../../store/useAssetsStore";
import { useNavigate, useParams } from "react-router-dom";

export interface AssetFormData {
  assetName: string;
  category: string;
  barCode: string;
  assetImage: string;
  status: string;
  subscriptionRenewal: string;
  purchaseDate: string;
  location: string;
  department: string;
  assignedTo: string;
  antivirusStatus: string;
  currentLocation: string;
  warranty: string;
  warrantyExpiration: string;
  techSpecifications: string;
  partsChanged: string;
}

const steps = [
  "General",
  "Technical Specification",
  "Warranty",
  "Parts & Boms",
];

const AddorEditAssets: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<AssetFormData>({
    assetName: "",
    category: "",
    barCode: "",
    assetImage: "",
    status: "",
    subscriptionRenewal: "",
    purchaseDate: "",
    department: "",
    assignedTo: "",
    antivirusStatus: "",
    location: "",
    currentLocation: "",
    warranty: "",
    warrantyExpiration: "",
    techSpecifications: "",
    partsChanged: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const { createAsset, getSingleAsset, singleAsset, isLoading, updateAsset } =
    useAssetsStore() as {
      createAsset: (data: AssetFormData) => Promise<boolean>;
      getSingleAsset: (id: string) => Promise<boolean | null>;
      singleAsset: Partial<AssetFormData> | null;
      isLoading: boolean;
      updateAsset: (
        assetId: string,
        data: Partial<AssetFormData>
      ) => Promise<any>;
    };

  useEffect(() => {
    if (id) {
      const fetchAsset = async () => {
        await getSingleAsset(id);
        setIsEditing(true);
      };
      fetchAsset();
    }
  }, [id, getSingleAsset]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleTabClick = (tab: string) => {
    setCurrentStep(steps.indexOf(tab));
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Final Form Data:", formData);

    if (isEditing && id) {
      const response = await updateAsset(id, formData);
      if (response) {
        navigate(-1);
      }
    } else {
      const response = await createAsset(formData);
      if (response) {
        navigate(-1);
      }
    }
  };

  const renderStepContent = () => {
    const commonProps = { formData, setFormData, handleChange };
    switch (currentStep) {
      case 0:
        return <GeneralInfoStep {...commonProps} />;
      case 1:
        return <DescriptionStep {...commonProps} />;
      case 2:
        return <WarrantyStep {...commonProps} />;
      case 3:
        return <PartsItemsStep {...commonProps} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (singleAsset && id) {
      // Decode techSpecifications
      const decodeHtmlEntities = (html: string) => {
        const textarea = document.createElement("textarea");
        textarea.innerHTML = html;
        return textarea.value;
      };

      setFormData({
        assetName: singleAsset.assetName || "",
        category: singleAsset.category || "",
        barCode: singleAsset.barCode || "",
        assetImage: singleAsset.assetImage || "",
        status: singleAsset.status || "",
        subscriptionRenewal: singleAsset.subscriptionRenewal || "",
        purchaseDate: singleAsset.purchaseDate || "",
        location: singleAsset.location || "",
        department: singleAsset.department || "",
        assignedTo: singleAsset.assignedTo || "",
        antivirusStatus: singleAsset.antivirusStatus || "",
        currentLocation: singleAsset.currentLocation || "",
        warranty: singleAsset.warranty || "",
        warrantyExpiration: singleAsset.warrantyExpiration || "",
        techSpecifications: singleAsset.techSpecifications
          ? decodeHtmlEntities(singleAsset.techSpecifications)
          : "",
        partsChanged: singleAsset.partsChanged || "",
      });
    }
  }, [singleAsset, id]);

  return (
    <form
      // onSubmit={handleSubmit}
      className="flex flex-col bg-white p-6 rounded-lg shadow-md w-full"
    >
      {/* Stepper Tabs */}
      <div className="flex w-fit whitespace-nowrap rounded-lg overflow-hidden bg-white border border-[#E4E7EC] mb-6">
        {steps.map((label, idx) => (
          <button
            key={label}
            type="button"
            onClick={() => handleTabClick(label)}
            className={`flex-1 py-3 px-4 text-base font-medium transition-colors duration-200 ${
              currentStep === idx
                ? "bg-[#F0F2F5] text-[#344054] font-semibold shadow-sm"
                : "bg-white text-[#475367] hover:bg-gray-50 font-medium"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Step Content */}
      <div className="min-h-[300px]">{renderStepContent()}</div>

      {/* Navigation Buttons */}
      <div className="flex justify-end mt-8">
        {/* <button
          type="button"
          onClick={prevStep}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Back
        </button> */}
        {currentStep < steps.length - 1 ? (
          <button
            type="button"
            onClick={nextStep}
            className="px-24 py-2 bg-primary500 text-white rounded-lg"
          >
            Next
          </button>
        ) : (
          <button
            // type="submit"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
            }}
            className="px-16 py-2 bg-primary500 text-white rounded-lg "
          >
            Save & Continue
          </button>
        )}
      </div>
    </form>
  );
};

export default AddorEditAssets;
