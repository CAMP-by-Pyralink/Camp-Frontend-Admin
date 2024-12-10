import { Link } from "react-router-dom";
import ModalLayout from "../../shared/ModalLayout";
import closeIcon from "../../assets/svgs/closeicongrey.svg";
import premiumIcon from "../../assets/svgs/premium-sub.svg";

const PremiumModal = ({ setViewDetailedClicked }: any) => {
  return (
    <>
      {/* <ModalLayout> */}
      <div className="relative bg-white min-w-[476px] min-h-[372px] flex items-center justify-center  rounded-md p-8 ">
        <div className=" flex flex-col items-center gap-4">
          <img
            src={closeIcon}
            alt=""
            className=" absolute right-4 top-4 cursor-pointer"
            onClick={() => setViewDetailedClicked(false)}
          />
          <div className=" bg-blue50 w-[92px] h-[92px] rounded-full flex items-center justify-center">
            <img src={premiumIcon} alt="" width={40} />
          </div>
          {/* <h1 className=" text-2xl text-greyText">New Scan</h1> */}
          <h1 className=" text-2xl text-greyText">
            Access full reports on premium
          </h1>
          {/* <input
            type="text"
            placeholder="Search"
            className=" border border-[#D0D5DD] rounded-md w-[374px] py-2 px-[16px] placeholder:text-sm placeholder:text-[#454545]"
          /> */}
          <Link to="/checkout">
            <button
              className=" bg-primary500 py-2 px-6 rounded-lg text-white"
              // onClick={() => setScanStarted(true)}
            >
              {/* Start scanning */}
              Try premium
            </button>
          </Link>
        </div>
      </div>
      {/* </ModalLayout> */}
    </>
  );
};

export default PremiumModal;
