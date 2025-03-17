import { Link } from "react-router-dom";
import closeIcon from "../../../assets/svgs/closeicongrey.svg";
interface AssignTrainingModalProps {
  setAssignModal: (value: boolean) => void;
}

const AssignTrainingModal = ({ setAssignModal }: AssignTrainingModalProps) => {
  return (
    <div
      className="fixed inset-0 bg-[#344054B2] bg-opacity-40 flex justify-center items-center z-[999]"
      style={{ backdropFilter: "blur(7.06999969482422px)" }}
    >
      <div className=" bg-white">
        {/* modal header */}
        <div className=" bg-[#DEEFFC] py-6 px-12 flex items-center justify-between">
          <h1 className=" text-[#454545] font-medium text-xl">
            Assign Training
          </h1>
          <img src={closeIcon} alt="" onClick={() => setAssignModal(false)} />
        </div>
        {/*  */}
        <div className=" py-12 px-12">
          {/* Selection */}
          <div className=" space-y-2">
            {/*eselect employee  */}
            <div className=" flex items-center gap-1">
              <input type="checkbox" name="" id="" />
              <h2>Employee</h2>
            </div>
            {/*select department  */}
            <div className=" flex items-center gap-1">
              <input type="checkbox" name="" id="" />
              <h2>Department</h2>
            </div>
          </div>
          {/*  */}
          <div>
            <div className=" w-full h-[1px] bg-[#B5B3B3] my-8"></div>
          </div>
          {/*Employee selection  */}
          <div className=" space-y-6">
            <h1 className=" text-[#454545] font-medium">Select employee</h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Select employee"
                className=" border border-primary100 py-4 px-24 w-[465px] rounded-md"
              />
              <div className=" absolute bg-[#F2F2F2] top-0 h-full w-20 flex items-center justify-center py-1">
                <h1 className=" text-[#98A2B3] text-sm">Filter</h1>
              </div>
            </div>
          </div>
          {/* button */}
          <Link to="/awareness-training">
            <button className=" text-white bg-primary500 rounded-md py-3 font-semibold w-full mt-8">
              Assign Training
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AssignTrainingModal;
