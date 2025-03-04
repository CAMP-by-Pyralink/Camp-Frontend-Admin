import { useState } from "react";
import uploadVideoIcon from "../../../assets/svgs/upload-video-icon.svg";
import uploadDocumentIcon from "../../../assets/svgs/upload-document-icon.svg";
import uploadLinkicon from "../../../assets/svgs/link-icon.svg";
import uploadTexticon from "../../../assets/svgs/upload-text-img-icon.svg";
import Editor from "./Editor";
import { LessonType } from "../../../store/useAwarenessTrainingStore";

const CreateTrainningStep2 = ({
  onChange,
}: {
  onChange: (data: any) => void;
}) => {
  const uploadtabs = [
    { icon: uploadVideoIcon, name: "Video", type: "video" as LessonType },
    {
      icon: uploadDocumentIcon,
      name: "Document",
      type: "document" as LessonType,
    },
    { icon: uploadLinkicon, name: "Link", type: "link" as LessonType },
    {
      icon: uploadTexticon,
      name: "Text & Image",
      type: "text & image" as LessonType,
    },
  ];
  const [activeTab, setActiveTab] = useState(0);

  // Set lesson type when tab changes
  const handleTabClick = (index: number) => {
    setActiveTab(index);
    onChange({
      modules: [
        {
          lessons: [
            {
              lessonType: uploadtabs[index].type,
              content: "",
            },
          ],
        },
      ],
    });
  };

  // Handle text inputs (module title and link)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "moduleTitle") {
      onChange({
        modules: [{ moduleTitle: value }],
      });
    } else if (name === "linkContent") {
      onChange({
        modules: [
          {
            lessons: [
              {
                lessonType: "link",
                content: value,
              },
            ],
          },
        ],
      });
    }
  };

  // Convert files to Base64
  const handleFileChange =
    (type: LessonType) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        onChange({
          modules: [
            {
              lessons: [
                {
                  lessonType: type,
                  content: base64,
                },
              ],
            },
          ],
        });
      };
      reader.readAsDataURL(file);
    };

  return (
    <div className="px-12 space-y-8">
      {/* Module Title Input */}
      <div>
        <label htmlFor="moduleTitle" className="block text-sm font-medium">
          Module training
        </label>
        <input
          type="text"
          name="moduleTitle"
          placeholder="New lesson"
          className="border border-primary100 py-4 px-3 w-full rounded-md"
          onChange={handleInputChange}
        />
      </div>

      {/* Lesson Type Tabs */}
      <h1>Select lesson type</h1>
      <div className="flex justify-between">
        {uploadtabs.map(({ icon, name }, index) => (
          <div
            key={index}
            className={`flex justify-center items-center gap-4 w-[125px] h-[116px] ${
              activeTab === index &&
              "bg-blue50 border border-primary200 rounded-md"
            }`}
            onClick={() => handleTabClick(index)}
          >
            <div className="flex flex-col items-center gap-4">
              <img src={icon} alt="" />
              <h1>{name}</h1>
            </div>
          </div>
        ))}
      </div>

      {/* Content Inputs */}
      <div>
        {activeTab === 0 && (
          <div>
            <label htmlFor="videoContent" className="block text-sm font-medium">
              Upload video
            </label>
            <input
              type="file"
              accept="video/*"
              className=" border border-primary100 py-4 px-3 w-full rounded-md"
              onChange={handleFileChange("video")}
            />
          </div>
        )}

        {activeTab === 1 && (
          <div>
            <label
              htmlFor="documentContent"
              className="block text-sm font-medium"
            >
              Upload Document
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className=" border border-primary100 py-4 px-3 w-full rounded-md"
              onChange={handleFileChange("document")}
            />
          </div>
        )}

        {activeTab === 2 && (
          <div>
            <label htmlFor="linkContent" className="block text-sm font-medium">
              Insert Link
            </label>
            <input
              type="text"
              name="linkContent"
              placeholder="Paste link"
              className="border border-primary100 py-4 px-3 w-full rounded-md"
              onChange={handleInputChange}
            />
          </div>
        )}

        {activeTab === 3 && <Editor />}
      </div>
    </div>
  );
};

export default CreateTrainningStep2;
