import AlertsTable from "../../components/Admin/Alerts/AlertsTable";
import PagesHomeLayout from "../../shared/PagesHomeLayout";

const Alerts = () => {
  return (
    <div>
      <div className=" flex justify-between mb-4">
        <div className=" text-greyText">
          <h1 className=" text-2xl  font-medium tracking-[-2%] leading-[28.8px]">
            Alerts
          </h1>
          <p className=" text-sm">
            Manage all alerts across the platform here.
          </p>
        </div>
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
