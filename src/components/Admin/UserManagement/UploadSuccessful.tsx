import successIcon from "../../../assets/svgs/successIcon.svg";
// import closeIcon from "../../../assets/svgs/close.svg";
interface UploadSuccessfulProps {
  handleCloseModal: () => void;
  onClose: () => void;
}
const UploadSuccessful: React.FC<UploadSuccessfulProps> = ({
  // handleCloseModal,
  onClose,
}) => {
  return (
    <div className="   ">
      <div className=" relative p-6 w-[532px] rounded-lg  text-center">
        {/* <img
          src={closeIcon}
          className=" absolute top-8 right-8 text-[#141B34]"
          alt=""
        /> */}
        <div className=" flex items-center justify-center mb-6">
          <img src={successIcon} alt="" className="  w-[60px] h-[60px]" />
        </div>
        <h2 className="text-3xl text-[#454545] font-medium mb-1">
          Upload successful
        </h2>
        <p className="text-[#8E8E93] text-lg ">
          You have successfully added 128 users
        </p>
        {/* <button className="bg-blue-500 text-white py-2 px-6 rounded-lg">
          Go to Dashboard
        </button> */}
        <button
          //   onClick={handleCreateClick} // Call handleCreateClick on click
          className="w-full mt-4 bg-primary500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600"
          // onClick={handleCloseModal}
          onClick={onClose}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default UploadSuccessful;
