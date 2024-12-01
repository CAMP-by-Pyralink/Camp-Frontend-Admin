import { useState } from "react";
import uploadVideoIcon from "../../../assets/svgs/upload-video-icon.svg";
import uploadDocumentIcon from "../../../assets/svgs/upload-document-icon.svg";
import uploadLinkicon from "../../../assets/svgs/link-icon.svg";
import uploadTexticon from "../../../assets/svgs/upload-text-img-icon.svg";
import TextEditor from "./TextEditor";
import LexicalEditor from "./Editor";
import Editor from "./Editor";

const CreateTrainningStep2 = () => {
  const uploadtabs = [
    { icon: uploadVideoIcon, name: "Video" },
    { icon: uploadDocumentIcon, name: "Document" },
    { icon: uploadLinkicon, name: "Link" },
    { icon: uploadTexticon, name: "Text & Image" },
  ];
  const [activeTab, setActiveTab] = useState(0);
  //   const [showTabs, setShowTabs] = useState(false);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };
  return (
    <div className=" px-12 space-y-8">
      <div>
        <label htmlFor="" className=" block text-sm font-medium">
          Module training
        </label>
        <input
          type="text"
          placeholder="New lesson"
          className=" border border-primary100 py-4 px-3 w-full rounded-md"
        />
      </div>
      {/*  */}
      <h1>Select lesson type</h1>
      {/* lesson type tab */}
      <div className=" flex justify-between">
        {uploadtabs.map(({ icon, name }, index) => (
          <div
            key={index}
            className={`flex justify-center items-center gap-4 w-[125px] h-[116px] ${
              activeTab === index &&
              "bg-blue50 border border-primary200 rounded-md "
            }`}
            onClick={() => handleTabClick(index)}
          >
            <div className=" flex flex-col items-center gap-4">
              <img src={icon} alt="" />
              <h1>{name}</h1>
            </div>
          </div>
        ))}
      </div>
      {/*  */}
      <div>
        {/* Upload Video */}
        {activeTab === 0 && (
          <div>
            <label htmlFor="" className=" block text-sm font-medium">
              Upload video
            </label>
            <input
              type="file"
              placeholder="New lesson"
              className=" border border-primary100 py-4 px-3 w-full rounded-md"
            />
          </div>
        )}
        {/* Upload Document */}
        {activeTab === 1 && (
          <div>
            <label htmlFor="" className=" block text-sm font-medium">
              Upload Document
            </label>
            <input
              type="file"
              placeholder="New lesson"
              className=" border border-primary100 py-4 px-3 w-full rounded-md"
            />
          </div>
        )}{" "}
        {/* Upload Link */}
        {activeTab === 2 && (
          <div>
            <label htmlFor="" className=" block text-sm font-medium">
              Insert Link
            </label>
            <input
              type="text"
              placeholder="Paste link"
              className=" border border-primary100 py-4 px-3 w-full rounded-md"
            />
          </div>
        )}{" "}
        {/* Upload Video */}
        {activeTab === 3 && <Editor />}
      </div>
    </div>
  );
};

export default CreateTrainningStep2;
