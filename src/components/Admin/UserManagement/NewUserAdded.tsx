import successIcon from "../../../assets/svgs/successIcon.svg";
// import closeIcon from "../../../assets/svgs/close.svg";

const NewUserAdded = ({ handleCloseModal, onClose }) => {
  return (
    <div className="   ">
      <div className=" relative p-4 w-[532px] rounded-lg  text-center">
        {/* <img
          src={closeIcon}
          className=" absolute top-8 right-8 text-[#141B34]"
          alt=""
        /> */}
        <div className=" flex items-center justify-center mb-6">
          <img src={successIcon} alt="" className="  w-[60px] h-[60px]" />
        </div>
        <h2 className="text-3xl text-[#454545] font-medium mb-1">
          New User Added
        </h2>
        <p className="text-[#04012D] text-lg ">
          You have successfully added <br /> olamide@pyralink
        </p>
        {/* <button className="bg-blue-500 text-white py-2 px-6 rounded-lg">
          Go to Dashboard
        </button> */}
        <button
          //   onClick={handleCreateClick} // Call handleCreateClick on click
          className="w-full mt-4 bg-primary500 text-white py-2 rounded-lg font-semibold"
          // onClick={handleCloseModal}
          onClick={onClose}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default NewUserAdded;
