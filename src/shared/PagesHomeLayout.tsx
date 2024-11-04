import filterIcon from "../assets/svgs/filtericon.svg";

interface PagesHomeLayoutProps {
  onFilterClick?: () => void;
  onExportClick?: () => void;
  showFilter?: boolean;
  showExport?: boolean;
  children?: React.ReactNode; // Rename Children to children
}

const PagesHomeLayout: React.FC<PagesHomeLayoutProps> = ({
  onFilterClick,
  onExportClick,
  showFilter = false,
  showExport = false,
  children, // Rename Children to children
}) => {
  return (
    <div className="bg-blue50 p-8 rounded-md">
      <div className="bg-white rounded-md w-full py-[10px] px-[20px]">
        <div className="flex items-center justify-between">
          <input
            type="text"
            placeholder="Search"
            className="border-[0.5px] border-black rounded-lg px-4 py-2 w-full max-w-xs"
          />
          <div className="flex gap-2">
            {showFilter && (
              <div
                className="flex items-center border border-primary500 px-3 py-[2px] rounded shadow-sm"
                onClick={onFilterClick}
              >
                <img src={filterIcon} className="mr-2" alt="" />
                Filter
              </div>
            )}
            {showExport && (
              <button
                className="flex items-center bg-primary500 text-white px-4 py-2 rounded-md shadow-sm "
                onClick={onExportClick}
              >
                {/* <BsDownload className="mr-2" /> */}
                Export CSV
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
};

export default PagesHomeLayout;
