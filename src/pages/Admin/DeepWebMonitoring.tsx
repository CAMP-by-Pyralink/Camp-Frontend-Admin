import ScanSearch from "../../components/Deep-Web-Moniroting/ScanSearch";
import HeaderTitle from "../../shared/HeaderTitle";
import LockedPage from "../../shared/LockedPage";
const DeepWebMonitoring = () => {
  const locked = true;

  if (locked) {
    return <LockedPage />;
  }
  return (
    <div className=" h-full ">
      {/* <h1 className="text-greyText text-2xl font-medium">
        Deep web monitoring
      </h1>
      <p className=" text-sm text-greyText">
        Scan the dark web for any potential data leaks
      </p> */}
      <HeaderTitle
        title="Deep web monitoring"
        subTitle="Scan the dark web for any potential data leaks"
      ></HeaderTitle>
      <div className=" flex items-center justify-center h-full mt-8">
        <ScanSearch />
      </div>
    </div>
  );
};

export default DeepWebMonitoring;
