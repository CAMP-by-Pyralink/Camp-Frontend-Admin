import filterIcon from "../assets/svgs/filtericon.svg";
import searchIcon from "../assets/svgs/search.svg";
import downArricon from "../assets/svgs/downarrAnchor.svg";

interface PagesHomeLayoutProps {
  onFilterClick?: () => void;
  onExportClick?: () => void;
  showFilter?: boolean;
  showExport?: boolean;
  children?: React.ReactNode;
}

const PagesHomeLayout: React.FC<PagesHomeLayoutProps> = ({
  onFilterClick,
  onExportClick,
  showFilter = false,
  showExport = false,
  children,
}) => {
  return (
    <div className="bg-blue50 p-8 rounded-md">
      <div className="bg-white rounded-md w-full py-[10px] px-[20px] relative">
        <div className="flex items-center justify-between">
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search"
              className="border-b-[0.5px] border-black rounded-lg px-12 py-2 w-full"
            />
            <img
              src={searchIcon}
              alt=""
              className="absolute left-4 top-1/2 transform -translate-y-1/2"
            />
          </div>
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
                className="flex items-center bg-primary500 text-white px-4 py-2 rounded-md shadow-sm"
                onClick={onExportClick}
              >
                {/* <BsDownload className="mr-2" /> */}
                <img src={downArricon} className=" mr-2" alt="" />
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
