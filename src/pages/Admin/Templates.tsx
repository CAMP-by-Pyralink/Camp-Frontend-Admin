import TemplateLists from "../../components/Admin/PhishingStimulation/Templates/TemplateLists";
import Button from "../../shared/Button";
import HeaderTitle from "../../shared/HeaderTitle";
import PagesHomeLayout from "../../shared/PagesHomeLayout";

const Templates = () => {
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
      <div className=" flex justify-between mb-">
        <HeaderTitle
          title="Phishing Simulation"
          subTitle="  Create phishing simulations to test your employees."
        ></HeaderTitle>
        <Button onClick={handleAdd} label="Add New" />
      </div>
      {/*  */}
      <PagesHomeLayout
        onFilterClick={handleFilterClick}
        onExportClick={handleExportClick}
        showFilter={true}
        showExport={false}
      >
        <TemplateLists />
        {/* Your content */}
      </PagesHomeLayout>
    </div>
  );
};

export default Templates;
