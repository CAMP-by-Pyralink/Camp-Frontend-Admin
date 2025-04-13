import { X } from "lucide-react";
import React, { useState, useEffect } from "react";
import {
  usePhishingStore,
  createTemplateData,
  PhishingTemplate,
} from "../../../../store/usePhishingStore";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import QuillToolbar, { modules, formats } from "../../../../utils/QuillToolBar";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import he from "he";
import { Loader2 } from "lucide-react";

interface AddTemplateModalProps {
  onClose: () => void;
  templateToEdit?: PhishingTemplate | null;
}

const AddTemplateModal: React.FC<AddTemplateModalProps> = ({
  onClose,
  templateToEdit,
}) => {
  const { createPhishingTemplate, updatePhishingTemplate, isLoading } =
    usePhishingStore();
  const [title, setTitle] = useState(templateToEdit?.title || "");
  const [content, setContent] = useState(
    templateToEdit?.content ? he.decode(templateToEdit.content) : ""
  );
  const [bannerImage, setBannerImage] = useState<string | null>(
    templateToEdit?.bannerImage || null
  );

  useEffect(() => {
    if (templateToEdit) {
      setTitle(templateToEdit.title);
      setContent(he.decode(templateToEdit.content));
      setBannerImage(templateToEdit.bannerImage);
    }
  }, [templateToEdit]);

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

    const sanitizedContent = DOMPurify.sanitize(content);

    const formData: createTemplateData = {
      title,
      content: sanitizedContent,
      bannerImage,
    };

    let response;
    if (templateToEdit) {
      response = await updatePhishingTemplate(templateToEdit._id, formData);
    } else {
      response = await createPhishingTemplate(formData);
    }

    if (response) {
      onClose();
      // alert("response is true");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-[#344054B2] bg-opacity-40 flex justify-center items-center"
      style={{ backdropFilter: "blur(7px)" }}
    >
      <div className="bg-white w-[700px] px-8 py-6 rounded-lg shadow-lg relative">
        <X
          className="absolute right-6 top-6 cursor-pointer text-gray-500 hover:text-gray-700"
          onClick={onClose}
        />

        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {templateToEdit ? "Edit Template" : "Create New Template"}
        </h2>

        <div className="space-y-5">
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

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <QuillToolbar toolbarId={"t1"} />
            <ReactQuill
              modules={modules("t1")}
              formats={formats}
              theme="snow"
              value={content}
              onChange={(value: React.SetStateAction<string>) =>
                setContent(value)
              }
              placeholder="Enter your message..."
              className="h-44"
            />
          </div>
        </div>

        <button
          className={`mt-6 w-full bg-primary800 text-white py-2 rounded-md text-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center justify-center
             ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
            `}
          onClick={handleSubmit}
          disabled={!!isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="size-6 mr-2 animate-spin" />
              {templateToEdit ? "Updating..." : "Saving..."}
            </>
          ) : (
            <>{templateToEdit ? "Update" : "Save"}</>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddTemplateModal;
