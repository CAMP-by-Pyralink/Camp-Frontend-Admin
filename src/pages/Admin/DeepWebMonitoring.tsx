import ScanSearch from "../../components/Deep-Web-Moniroting/ScanSearch";
const DeepWebMonitoring = () => {
  return (
    <div className=" h-[80vh]">
      <h1 className="text-greyText text-2xl font-medium">
        Deep web monitoring
      </h1>
      <p className=" text-sm text-greyText">
        Scan the dark web for any potential data leaks
      </p>
      <div className=" flex items-center justify-center h-full">
        <ScanSearch />
      </div>
    </div>
  );
};

export default DeepWebMonitoring;
