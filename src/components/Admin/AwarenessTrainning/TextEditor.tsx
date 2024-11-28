import React, { useState } from "react";
import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

const CreateTrainningStep2 = () => {
  const [value, setValue] = useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }], // Header sizes
      ["bold", "italic", "underline", "strike", "blockquote"], // Formatting options
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ], // Lists and indentation
      ["link", "image"], // Links and images
      ["clean"], // Remove formatting
    ],
  };

  return (
    <div>
      hh
      {/* <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
      /> */}
    </div>
  );
};

export default CreateTrainningStep2;

// import React, { useState, useMemo } from "react";
// import ReactQuill from "react-quill";
// // import "react-quill/dist/quill.snow.css";

// const TextEditor = () => {
//   const [value, setValue] = useState("");

//   // Custom toolbar options
//   const modules = useMemo(
//     () => ({
//       toolbar: [
//         [{ header: [1, 2, 3, 4, 5, 6, false] }],
//         ["bold", "italic", "underline", "strike"],
//         [{ color: [] }, { background: [] }],
//         [{ list: "ordered" }, { list: "bullet" }],
//         [{ script: "sub" }, { script: "super" }],
//         [{ align: [] }],
//         ["link", "image", "video"],
//         ["clean"],
//       ],
//       // Add image upload handler if needed
//       imageUpload: {
//         url: "/your-upload-endpoint", // Replace with your upload endpoint
//         method: "POST",
//         name: "image",
//         withCredentials: false,
//       },
//     }),
//     []
//   );

//   // Custom formats
//   const formats = [
//     "header",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "color",
//     "background",
//     "list",
//     "bullet",
//     "script",
//     "align",
//     "link",
//     "image",
//     "video",
//   ];

//   // Custom styles
//   const editorStyle = {
//     height: "200px",
//     backgroundColor: "#f9f9f9",
//     // border: "1px solid #e0e0e0",
//     borderRadius: "8px",
//   };

//   return (
//     <div className="">
//       <h2 className="text-xl font-bold mb-2">Create Training Content</h2>
//       <ReactQuill
//         theme="snow"
//         value={value}
//         onChange={setValue}
//         // modules={modules}
//         formats={formats}
//         style={editorStyle}
//         placeholder="Start writing your training content..."
//       />
//       {/* Optional: Display current content */}
//       {/* <div className="mt-4">
//         <h3 className="font-semibold">Current Content:</h3>
//         <div dangerouslySetInnerHTML={{ __html: value }} />
//       </div> */}
//     </div>
//   );
// };

// export default TextEditor;
