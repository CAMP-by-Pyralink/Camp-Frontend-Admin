import RiskList from "../../components/Admin/RiskAssessment/RiskList";
import Button from "../../shared/Button";
import PagesHomeLayout from "../../shared/PagesHomeLayout";

const RiskAssessment = () => {
  const handleAdd = () => {
    console.log("first");
  };
  const handleFilterClick = () => {
    // Filter logic based on id
  };

  const handleExportClick = () => {
    // Export logic based on id
  };
  return (
    <div>
      <div className=" flex justify-between mb-4">
        <div className=" text-greyText">
          <h1 className=" text-2xl  font-medium tracking-[-2%] leading-[28.8px]">
            Risk Assessment
          </h1>
          <p className=" text-sm">Register and assign risk</p>
        </div>
        <Button onClick={handleAdd} label="Add New" />
      </div>
      {/*  */}
      <PagesHomeLayout
        onFilterClick={handleFilterClick}
        onExportClick={handleExportClick}
        showFilter={true}
        showExport={false}
      >
        <RiskList />

        {/* Your content */}
      </PagesHomeLayout>
    </div>
  );
};

export default RiskAssessment;
