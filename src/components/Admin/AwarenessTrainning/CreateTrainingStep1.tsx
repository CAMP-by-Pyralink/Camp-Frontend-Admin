import React from "react";

const CreateTrainingStep1 = () => {
  return (
    <div className=" px-12 space-y-6">
      <div>
        <label htmlFor="" className=" block text-sm font-medium">
          Upload image
        </label>
        <input
          type="text"
          className=" border border-primary100 py-4 px-3 w-[634px] rounded-md"
        />
      </div>
      {/*  */}
      <div>
        <label htmlFor="" className=" block text-sm font-medium">
          Training title
        </label>
        <input
          type="text"
          className=" border border-primary100 py-4 px-3 w-[634px] rounded-md"
        />
      </div>
      {/*  */}{" "}
      <div>
        <label htmlFor="" className=" block text-sm font-medium">
          Training description
        </label>
        <input
          type="text"
          className=" border border-primary100 py-2 px-3 w-[634px] h-[102px] rounded-md"
        />
      </div>
      {/*  */}
      <div className=" flex gap-4 w-[634px]">
        {/*  */}
        <div className=" w-full">
          <label htmlFor="" className=" block text-sm font-medium">
            Start date
          </label>
          <input
            type="date"
            className=" border border-primary100 py-2 px-3 w-full basis-[50%] rounded-md"
          />
        </div>
        {/*  */}
        <div className=" w-full">
          <label htmlFor="" className=" block text-sm font-medium">
            End date
          </label>
          <input
            type="date"
            className=" border border-primary100 py-2 px-3 w-full rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateTrainingStep1;
