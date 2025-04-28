import { LockIcon } from "lucide-react";
import mysteryBox from "../assets/svgs/mistery-box.svg";

const LockedPage = () => {
  return (
    <div className=" h-[80vh] w-full flex items-center justify-center flex-col gap-4">
      <div className="bg-[#EAEBFF] size-[300px] h-[300px] rounded-full flex items-center justify-center flex-col gap-4">
        <img src={mysteryBox} alt="" />
      </div>
      <div className=" flex flex-col items-center justify-center">
        <h1 className=" text-greyText font-medium text-2xl">Coming soon🎉</h1>
        <p className=" text-greyText text-sm">
          We will notify you when this feature is available{" "}
        </p>
      </div>
    </div>
  );
};

export default LockedPage;
