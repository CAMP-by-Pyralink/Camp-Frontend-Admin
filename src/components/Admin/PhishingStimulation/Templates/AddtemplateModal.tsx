import { X, Upload, Plus } from "lucide-react";
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
import { Loader2 } from "lucide-react";

interface AddTemplateModalProps {
  onClose: () => void;
  templateToEdit?: PhishingTemplate | null;
}

interface InsertVariableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (variable: string) => void;
}

const InsertVariableModal: React.FC<InsertVariableModalProps> = ({
  isOpen,
  onClose,
  onInsert,
}) => {
  const variables = [
    { name: "fName", label: "First Name" },
    { name: "lName", label: "Last Name" },
    { name: "department", label: "Department" },
    { name: "companyName", label: "Company Name" },
    { name: "URL", label: "Phishing URL" },
  ];

  if (!isOpen) return null;

  const handleVariableInsert = (variable: { name: string; label: string }) => {
    if (variable.name === "URL") {
      // Insert the URL as a clickable link with the dashboard route
      const linkHTML = `<a href="\${URL}/dashboard/phished-page" style="color: #2563eb; text-decoration: underline;">\${URL}/dashboard/phished-page</a>`;
      onInsert(linkHTML);
    } else {
      // Insert regular variable
      onInsert(`\${${variable.name}}`);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Insert Variable</h3>
          <X
            className="cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={onClose}
          />
        </div>

        <div className="space-y-2">
          {variables.map((variable) => (
            <button
              key={variable.name}
              onClick={() => handleVariableInsert(variable)}
              className="w-full text-left p-3 rounded hover:bg-gray-100 flex justify-between items-center"
            >
              <span>{variable.label}</span>
              <span className="text-sm text-gray-500 font-mono">
                {variable.name === "URL"
                  ? `\${URL}/dashboard/phished-page`
                  : `\${${variable.name}}`}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const AddTemplateModal: React.FC<AddTemplateModalProps> = ({
  onClose,
  templateToEdit,
}) => {
  const { createPhishingTemplate, updatePhishingTemplate, isLoading } =
    usePhishingStore();
  const [title, setTitle] = useState(templateToEdit?.title || "");
  const [content, setContent] = useState(
    templateToEdit?.content
      ? templateToEdit.content.replace(/&lt;/g, "<").replace(/&gt;/g, ">")
      : ""
  );
  const [bannerImage, setBannerImage] = useState<string | null>(
    templateToEdit?.bannerImage || null
  );
  const [showVariableModal, setShowVariableModal] = useState(false);

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

  const handleInsertVariable = (variable: string) => {
    const editor = document.querySelector(".ql-editor") as HTMLElement;
    if (editor) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const textNode = document.createTextNode(variable);
        range.insertNode(textNode);
        range.setStartAfter(textNode);
        range.setEndAfter(textNode);
        selection.removeAllRanges();
        selection.addRange(range);
        setContent(editor.innerHTML);
      } else {
        setContent((prev) => prev + variable);
      }
    }
  };

  const formatContentForEmail = (htmlContent: string) => {
    return `
      <div style="background-color: #e2e2ff; padding: 3rem 1.5rem; display: flex; flex-direction: column; align-items: center;">
        <div style="clear: both; width: 90%; background-color: #ffffff; margin: auto; padding: 2rem; border-radius: 2rem; display: block;">
          ${htmlContent}
        </div>
      </div>
    `;
  };

  const handleSubmit = async () => {
    if (!title || !content || !bannerImage) {
      toast.error("Please fill in all fields and upload an image.");
      return;
    }

    // 1. First get the raw HTML from Quill
    const rawHTML = content;

    // 2. Manually decode any existing encoded characters (just in case)
    const decodedHTML = rawHTML
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");

    // 3. Sanitize the decoded HTML (security critical!)
    const sanitizedContent = DOMPurify.sanitize(decodedHTML);

    // 4. Format as email template
    const emailFormattedContent = `
    <div style="background-color: #e2e2ff; padding: 3rem 1.5rem; display: flex; flex-direction: column; align-items: center;">
      <div style="clear: both; width: 90%; background-color: #ffffff; margin: auto; padding: 2rem; border-radius: 2rem; display: block;">
        ${sanitizedContent}
      </div>
    </div>
  `;

    // 5. Create form data (will be sent as raw HTML)
    const formData: createTemplateData = {
      title,
      content: emailFormattedContent,
      bannerImage,
    };

    // 6. DEBUG: Log what we're about to send
    console.log("Final content being sent:", formData.content);

    // 7. Make the API call
    let response;
    if (templateToEdit) {
      response = await updatePhishingTemplate(templateToEdit._id, formData);
    } else {
      response = await createPhishingTemplate(formData);
    }

    if (response) {
      onClose();
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-[#344054B2] bg-opacity-40 flex justify-center items-center z-40"
        style={{ backdropFilter: "blur(7px)" }}
      >
        <div className="bg-white w-[700px] px-8 py-6 rounded-lg shadow-lg h-[90%] overflow-y-auto relative">
          <X
            className="absolute right-6 top-6 cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={onClose}
          />

          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {templateToEdit ? "Edit Template" : "Create New Template"}
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Cover image
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  className="mt-1 block w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-none"
                  onChange={handleFileChange}
                />
                {bannerImage && (
                  <div className="mt-3">
                    <img
                      src={bannerImage}
                      alt="Banner preview"
                      className="w-full h-32 object-cover rounded-md border"
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <QuillToolbar toolbarId={"t1"} />
              <ReactQuill
                modules={modules("t1")}
                formats={formats}
                theme="snow"
                value={content}
                onChange={setContent}
                placeholder="Enter your message..."
                className="h-44"
              />

              <div className="mt-3 flex justify-start">
                <button
                  type="button"
                  onClick={() => setShowVariableModal(true)}
                  className="flex items-center px-4 py-2 text-sm text-blue-600 border border-blue-300 rounded-md hover:bg-blue-50 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Insert Variable
                </button>
              </div>
            </div>
          </div>

          <button
            className={`mt-6 w-full bg-blue-600 text-white py-2 rounded-md text-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center justify-center
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

      <InsertVariableModal
        isOpen={showVariableModal}
        onClose={() => setShowVariableModal(false)}
        onInsert={handleInsertVariable}
      />
    </>
  );
};

export default AddTemplateModal;
