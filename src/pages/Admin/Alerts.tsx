import AlertsTable from "../../components/Admin/Alerts/AlertsTable";
import HeaderTitle from "../../shared/HeaderTitle";
import PagesHomeLayout from "../../shared/PagesHomeLayout";

const Alerts = () => {
  return (
    <div>
      <div className=" flex justify-between mb-4">
        <HeaderTitle
          title="Alerts"
          subTitle=" Manage all alerts across the platform here."
        ></HeaderTitle>
        {/* <Button onClick={handleAdd} label="Add New" /> */}
      </div>
      {/*  */}
      <PagesHomeLayout
        // onFilterClick={handleFilterClick}
        // onExportClick={handleExportClick}
        showFilter={true}
        showExport={true}
      >
        <AlertsTable />
      </PagesHomeLayout>
    </div>
  );
};

export default Alerts;
