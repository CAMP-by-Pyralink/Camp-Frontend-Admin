import React from "react";
import Button from "../../../shared/Button";

const Warranty = () => {
  const handleAddWaranty = () => {
    console.log("first");
  };
  return (
    <div id="warranty">
      <div className="bg-[#DEEFFC33] p-[10px]">
        <h1 className="text-sm font-medium text-[#333333]">
           This shows the repairs to an asset the warranty provider is
          responsible for:
        </h1>
      </div>
      <div className=" py-[10px] max-w-[760px]">
        <h1 className=" mb-4 text-textColor text-sm font-medium">
          Asset Warranty
        </h1>
        <input
          type="text"
          className=" w-[760px] h-[261px] border border-[#D0D5DD] outline-none rounded-md"
        />
        <div className=" flex justify-end mt-4">
          {/* <button className=" bg-primary500 text-sm px-3 py-[10px] rounded text-white font-semibold">
            Add Warranty
          </button> */}
          <Button label="Add Warranty" width="180px"></Button>
        </div>
      </div>
    </div>
  );
};

export default Warranty;
