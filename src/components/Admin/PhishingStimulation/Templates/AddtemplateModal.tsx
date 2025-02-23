// import { X } from "lucide-react";
// import React, { useState, useEffect } from "react";
// import {
//   usePhishingStore,
//   createTemplateData,
//   PhishingTemplate,
// } from "../../../../store/usePhishingStore";
// import toast from "react-hot-toast";
// import ReactQuill from "react-quill";
// import QuillToolbar, { modules, formats } from "../../../../utils/QuillToolBar";
// import "react-quill/dist/quill.snow.css";
// import he from "he";
// import DOMPurify from "dompurify";

// interface AddTemplateModalProps {
//   onClose: () => void;
//   templateToEdit?: PhishingTemplate | null;
// }

// const AddTemplateModal: React.FC<AddTemplateModalProps> = ({
//   onClose,
//   templateToEdit,
// }) => {
//   const { createPhishingTemplate, updatePhishingTemplate } = usePhishingStore();
//   const [title, setTitle] = useState(templateToEdit?.title || "");
//   const [content, setContent] = useState(templateToEdit?.content || "");
//   const [bannerImage, setBannerImage] = useState<string | null>(
//     templateToEdit?.bannerImage || null
//   );
//   const sanitizedContent = DOMPurify.sanitize(content);

//   useEffect(() => {
//     if (templateToEdit) {
//       setTitle(templateToEdit.title);

//       // Decode and sanitize before setting content in the state
//       const decodedContent = he.decode(templateToEdit.content);
//       setContent(DOMPurify.sanitize(decodedContent));

//       setBannerImage(templateToEdit.bannerImage);
//     }
//   }, [templateToEdit]);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const file = e.target.files[0];
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setBannerImage(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!title || !content || !bannerImage) {
//       toast.error("Please fill in all fields and upload an image.");
//       return;
//     }

//     // Sanitize the content before sending it to the backend
//     useEffect(() => {
//       const sanitizedContent = DOMPurify.sanitize(content);
//       console.log(sanitizedContent, " check if content is sanitized");
//     }, [content]);
//     const sanitizedContent = DOMPurify.sanitize(content);
//     console.log(sanitizedContent, " check if content is sanitized");

//     const formData: createTemplateData = {
//       title,
//       content: sanitizedContent,
//       bannerImage,
//     };

//     let response;
//     if (templateToEdit) {
//       response = await updatePhishingTemplate(templateToEdit._id, formData);
//     } else {
//       response = await createPhishingTemplate(formData);
//     }

//     if (response && response.status === 201) {
//       toast.success(
//         templateToEdit
//           ? "Template updated successfully!"
//           : "Template created successfully!"
//       );
//       onClose();
//     } else {
//       toast.error(
//         templateToEdit
//           ? "Failed to update template."
//           : "Failed to create template."
//       );
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 bg-[#344054B2] bg-opacity-40 flex justify-center items-center"
//       style={{ backdropFilter: "blur(7px)" }}
//     >
//       <div className="bg-white w-[700px] px-8 py-6 rounded-lg shadow-lg relative">
//         {/* Close Button */}
//         <X
//           className="absolute right-6 top-6 cursor-pointer text-gray-500 hover:text-gray-700"
//           onClick={onClose}
//         />

//         {/* Title */}
//         <h2 className="text-xl font-semibold text-gray-800 mb-6">
//           {templateToEdit ? "Edit Template" : "Create New Template"}
//         </h2>

//         {/* Form Section */}
//         <div className="space-y-5">
//           {/* Upload Cover Image */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Upload Cover image
//             </label>
//             <input
//               type="file"
//               className="mt-1 block w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-none"
//               onChange={handleFileChange}
//             />
//           </div>

//           {/* Title */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Title
//             </label>
//             <input
//               type="text"
//               className="mt-1 block w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-none"
//               placeholder="Enter title..."
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />
//           </div>

//           {/* Content */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Content
//             </label>
//             <QuillToolbar toolbarId={"t1"} />
//             <ReactQuill
//               modules={modules("t1")}
//               formats={formats}
//               theme="snow"
//               value={content}
//               onChange={(value) => setContent(value)}
//               placeholder="Enter your message..."
//               className="h-44"
//             />
//           </div>
//         </div>

//         {/* Save Button */}
//         <button
//           className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md text-lg font-semibold hover:bg-blue-700 transition-all duration-300"
//           onClick={handleSubmit}
//         >
//           {templateToEdit ? "Update" : "Save"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddTemplateModal;
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

interface AddTemplateModalProps {
  onClose: () => void;
  templateToEdit?: PhishingTemplate | null;
}

const AddTemplateModal: React.FC<AddTemplateModalProps> = ({
  onClose,
  templateToEdit,
}) => {
  const { createPhishingTemplate, updatePhishingTemplate } = usePhishingStore();
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

    if (response && response.status === 201) {
      toast.success(
        templateToEdit
          ? "Template updated successfully!"
          : "Template created successfully!"
      );
      onClose();
    } else {
      toast.error(
        templateToEdit
          ? "Failed to update template."
          : "Failed to create template."
      );
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
              onChange={(value) => setContent(value)}
              placeholder="Enter your message..."
              className="h-44"
            />
          </div>
        </div>

        <button
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md text-lg font-semibold hover:bg-blue-700 transition-all duration-300"
          onClick={handleSubmit}
        >
          {templateToEdit ? "Update" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default AddTemplateModal;
