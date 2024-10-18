import successIcon from "../../assets/svgs/successIcon.svg";
import closeIcon from "../../assets/svgs/closeicongrey.svg";

const SuccessModal = () => {
  return (
    <div className="min-h-screen  flex items-center justify-center ">
      <div className="bg-white shadow-[5px_5px_40px_rgba(107,151,255,0.3)] relative p-12 w-[532px] rounded-lg  text-center">
        <img
          src={closeIcon}
          className=" absolute top-8 right-8 text-[#141B34]"
          alt=""
        />
        <div className=" flex items-center justify-center mb-6">
          <img src={successIcon} alt="" className="  w-[98px] h-[103px]" />
        </div>
        <h2 className="text-3xl text-[#454545] font-medium mb-1">Successful</h2>
        <p className="text-[#8E8E93] text-lg ">Account created successfully</p>
        {/* <button className="bg-blue-500 text-white py-2 px-6 rounded-lg">
          Go to Dashboard
        </button> */}
      </div>
    </div>
  );
};

export default SuccessModal;
