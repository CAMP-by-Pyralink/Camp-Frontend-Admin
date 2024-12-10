import fileUploadIcon from "../../assets/svgs/file-upload.svg";

const AddFramework = () => {
  return (
    <div className=" space-y-4">
      <h1 className=" text-[#1B1818] text-4xl font-bold mb-2 tracking-[-4%] leading-[43.2px]">
        Upload framework for <br /> risk assessment
      </h1>
      {/*  */}
      <div className=" ">
        <label htmlFor="">Framework type</label>
        <select
          id="employee"
          name="employee"
          defaultValue="Select department"
          className="block w-full px-3 py-4 border border-[#D0D5DD] bg-white rounded-md shadow-sm focus:outline-none  text-sm"
        >
          <option value="">3 x 3 Matrix</option>
          <option value="">4 x 4 Matrix</option>
        </select>
      </div>
      {/*  */}
      <div className="border-dashed border-[1.5px] border-[#D0D5DD] rounded-lg px-6 py-12 mb-8">
        <div className="flex flex-col items-center justify-center h-40">
          <img src={fileUploadIcon} alt="File Upload Icon" className=" mt-4" />
          <p className="text-gray-600 mb-4 text-center">
            Click to upload or drag and drop <br />
            <span className=" text-center text-[#98A2B3] ">PDF</span>
          </p>
          <p className="text-gray-400 mb-4">OR</p>
          <input type="file" className="hidden" id="fileUpload" />
          <label
            htmlFor="fileUpload"
            className="block bg-[#C7C7CC] w-40 py-2 border text-white font-bold mb-4 rounded-xl text-center cursor-pointer"
          >
            Browse Files
          </label>
        </div>
      </div>
    </div>
  );
};

export default AddFramework;
