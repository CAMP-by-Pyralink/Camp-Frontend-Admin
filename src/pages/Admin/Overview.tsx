import AssetsTable from "../../components/Admin/Dashboard/AssetsTable";
import AssignedAssets from "../../components/Admin/Dashboard/AssignedAssets";
import CompletionChart from "../../components/Admin/Dashboard/CompletionChart";
import QuickStat from "../../components/Admin/Dashboard/QuickStat";
import RiskRahting from "../../components/Admin/Dashboard/RiskRahting";
import TrainingProgress from "../../components/Admin/Dashboard/TrainingProgress";
import VulnerabilityChart from "../../components/Admin/Dashboard/VulnerabilityChart";
import HeaderTitle from "../../shared/HeaderTitle";
// import CustomizationSetting from "../../shared/CustomizationSetting";

const Overview = () => {
  return (
    <div>
      <HeaderTitle
        title="Dashboard"
        subTitle="Hi Flutter, welcome back"
      ></HeaderTitle>
      <div>
        {/* Customization Setting
        {openCustomizationSetting && <CustomizationSetting />} */}
      </div>
      <QuickStat />
      <div className=" flex gap-4 mt-4 w-full">
        <AssignedAssets />
        <TrainingProgress />
      </div>
      <div className=" mt-4 flex gap-4">
        <VulnerabilityChart />
        <CompletionChart />
      </div>
      <div className=" mt-4 flex gap-4">
        <RiskRahting />
        <AssetsTable />
      </div>
    </div>
  );
};

export default Overview;
