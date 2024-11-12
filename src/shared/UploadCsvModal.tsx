import fileUploadIcon from "../assets/svgs/file-upload.svg";
import closeIcon from "../assets/svgs/close.svg";

interface UploadCsvModalProps {
  type: string;
  onCreate: () => void;
  onClose: () => void;
}

const UploadCsvModal: React.FC<UploadCsvModalProps> = ({
  //   type,
  onCreate,
  onClose,
}) => {
  return (
    <div
      className="fixed inset-0 bg-[#344054B2] bg-opacity-40 flex justify-center items-center max-h-[764px]"
      style={{ backdropFilter: "blur(7.06999969482422px)" }}
    >
      <div className="bg-[#F7F9FC] w-fit px-12 py-6 rounded-lg shadow-lg relative">
        <h1 className=" text-center text-2xl font-medium mb-8 mt-4">
          {/* Upload CSV */}
        </h1>
        <img
          src={closeIcon}
          className=" absolute  z-50 right-4 top-4 cursor-pointer"
          alt=""
          onClick={onClose}
        />
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Upload CSV</h2>
          <p className="text-[#04012D] mb-4">
            <a
              href="#"
              className="text-primary400 text-base font-bold underline"
            >
              Download
            </a>{" "}
            this template, populate your data and upload
          </p>

          <div className="border-dashed border-[1.5px] border-[#D0D5DD] rounded-lg px-6 py-12 mb-8">
            <div className="flex flex-col items-center justify-center h-40">
              <img
                src={fileUploadIcon}
                alt="File Upload Icon"
                className=" mt-4"
              />
              <p className="text-gray-600 mb-4">
                Click to upload or drag and drop <br />
                <span className=" text-[#98A2B3] ">CSV</span>
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

          <button
            onClick={onCreate}
            className="w-full bg-primary500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadCsvModal;
