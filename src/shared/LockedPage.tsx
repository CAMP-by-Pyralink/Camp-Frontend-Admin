import { LockIcon } from "lucide-react";

const LockedPage = () => {
  return (
    <div className=" h-[80vh] w-full flex items-center justify-center ">
      <div className="bg-white size-12 ">
        <LockIcon className="  text-primary600 h-full w-full" />
      </div>
    </div>
  );
};

export default LockedPage;
