import { X } from "lucide-react";
import React, { useState } from "react";
import {
  usePhishingStore,
  createTemplateData,
} from "../../../../store/usePhishingStore";
import toast from "react-hot-toast";

interface AddTemplateModalProps {
  onClose: () => void;
}

const AddTemplateModal: React.FC<AddTemplateModalProps> = ({ onClose }) => {
  const { createPhishingTemplate } = usePhishingStore();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [bannerImage, setBannerImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!title || !content || !bannerImage) {
      toast.error("Please fill in all fields and upload an image.");
      return;
    }

    const formData: createTemplateData = {
      title,
      content,
      bannerImage,
    };

    const response = await createPhishingTemplate(formData);
    if (response && response.status === 201) {
      toast.success("Template created successfully!");
      onClose();
    } else {
      toast.error("Failed to create template.");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-[#344054B2] bg-opacity-40 flex justify-center items-center"
      style={{ backdropFilter: "blur(7px)" }}
    >
      <div className="bg-white w-[700px] px-8 py-6 rounded-lg shadow-lg relative">
        {/* Close Button */}
        <X
          className="absolute right-6 top-6 cursor-pointer text-gray-500 hover:text-gray-700"
          onClick={onClose}
        />

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Edit/create new
        </h2>

        {/* Form Section */}
        <div className="space-y-5">
          {/* Upload Cover Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Cover image
            </label>
            <input
              type="file"
              className="mt-1 block w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-none"
              onChange={handleFileChange}
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-none"
              placeholder="Enter title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              className="w-full border border-gray-300 py-2 px-3 rounded-md h-36 focus:outline-none"
              placeholder="Enter your message..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
        </div>

        {/* Save Button */}
        <button
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md text-lg font-semibold hover:bg-blue-700 transition-all duration-300"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddTemplateModal;
