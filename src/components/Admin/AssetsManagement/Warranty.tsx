const Warranty = ({ singleAsset }: any) => {
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
        <textarea
          // type="text"
          value={singleAsset?.warranty}
          className=" w-[760px] h-[261px] border border-[#D0D5DD] outline-none rounded-md"
        />
      </div>
    </div>
  );
};

export default Warranty;
