import React, { ChangeEvent, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import fileUploadIcon from "../../assets/svgs/file-upload.svg";

interface AddFrameworkProps {
  frameworkType: "3 x 3 Matrix" | "4 x 4 Matrix" | "";
  updateFrameworkType: (frameworkType: "3 x 3 Matrix" | "4 x 4 Matrix") => void;
  updateFrameworkFile: (fileBase64: string) => void;
}

const AddFramework: React.FC<AddFrameworkProps> = ({
  frameworkType,
  updateFrameworkType,
  updateFrameworkFile,
}) => {
  // Convert file to Base64
  const fileToBase64 = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    console.log(reader.result);
    reader.onloadend = () => {
      if (reader.result) {
        // const pureBase64 = base64WithPrefix.split(",")[1];
        updateFrameworkFile(reader.result.toString());
      }
    };
  };

  // Handle framework type selection
  const handleFrameworkTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "3 x 3 Matrix" | "4 x 4 Matrix";
    updateFrameworkType(value);
  };

  // Handle file drop
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        fileToBase64(acceptedFiles[0]); // Convert file to Base64
      }
    },
    [updateFrameworkFile]
  );

  // Initialize dropzone
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      accept: { "application/pdf": [".pdf"] },
      multiple: false,
    });

  // Show selected file name
  const filePreview =
    acceptedFiles && acceptedFiles.length > 0 ? acceptedFiles[0].name : null;

  return (
    <div className="space-y-4">
      <h1 className="text-[#1B1818] text-4xl font-bold mb-2 tracking-[-4%] leading-[43.2px]">
        Upload framework for <br /> risk assessment
      </h1>

      {/* Framework Type Selection */}
      <div>
        <label htmlFor="frameworkType" className="block mb-2">
          Framework type
        </label>
        <select
          id="frameworkType"
          name="frameworkType"
          value={frameworkType}
          onChange={handleFrameworkTypeChange}
          className="block w-full px-3 py-4 border border-[#D0D5DD] bg-white rounded-md shadow-sm focus:outline-none text-sm"
        >
          <option value="" disabled>
            Select Framework type
          </option>
          <option value="3 x 3 Matrix">3 x 3 Matrix</option>
          <option value="4 x 4 Matrix">4 x 4 Matrix</option>
        </select>
      </div>

      {/* File Upload Dropzone */}
      <div
        {...getRootProps()}
        className={`border-dashed border-[1.5px] border-[#D0D5DD] rounded-lg px-6 py-12 mb-8 cursor-pointer transition-colors ${
          isDragActive ? "bg-gray-100" : ""
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-gray-600 text-center">Drop the file here ...</p>
        ) : filePreview ? (
          <div className="flex flex-col items-center">
            <img src={fileUploadIcon} alt="File Upload Icon" className="mt-4" />
            <p className="text-gray-600 mt-2">{filePreview}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <img src={fileUploadIcon} alt="File Upload Icon" className="mt-4" />
            <p className="text-gray-600 mb-4 text-center">
              Click to upload or drag and drop <br />
              <span className="text-center text-[#98A2B3]">PDF</span>
            </p>
            <p className="text-gray-400 mb-4">OR</p>
            <button
              type="button"
              className="bg-[#C7C7CC] w-40 py-2 border text-white font-bold mb-4 rounded-xl"
            >
              Browse Files
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddFramework;
