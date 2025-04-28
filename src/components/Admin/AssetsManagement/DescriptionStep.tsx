import ReactQuill from "react-quill";
import QuillToolbar, { modules, formats } from "../../../utils/QuillToolBar";
import { AssetFormData } from "./AddorEditAssets";

interface DescriptionStepProps {
  formData: AssetFormData;
  setFormData: React.Dispatch<React.SetStateAction<AssetFormData>>;
  handleChange: (field: string, value: string) => void;
}

const DescriptionStep: React.FC<DescriptionStepProps> = ({
  formData,
  setFormData,
  handleChange,
}) => {
  return (
    <div className="space-y-4">
      <label className="block text-gray-700 font-medium">
        Add Specification
      </label>

      <QuillToolbar toolbarId={"t1"} />
      <ReactQuill
        modules={modules("t1")}
        formats={formats}
        theme="snow"
        value={formData.techSpecifications}
        onChange={(value: any) => {
          setFormData((prev) => ({ ...prev, techSpecifications: value }));
        }}
        placeholder="Write description..."
        className="border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 [&_.ql-container]:min-h-[150px] [&_.ql-container]:border-0 [&_.ql-editor]:min-h-[150px] [&_.ql-editor]:p-3 text-sm"
      />
    </div>
  );
};

export default DescriptionStep;
