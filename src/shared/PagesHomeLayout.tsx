import React, { useState } from "react";
import filterIcon from "../assets/svgs/filtericon.svg";
import searchIcon from "../assets/svgs/search.svg";
import exportArr from "../assets/svgs/export-arr.svg";

interface PagesHomeLayoutProps {
  onFilterClick?: () => void;
  onExportClick?: (format: "pdf" | "csv" | "xls") => void;
  onSearch?: (searchTerm: string) => void;
  searchTerm: string;
  showFilter?: boolean;
  showExport?: boolean;
  children?: React.ReactNode;
}

const PagesHomeLayout: React.FC<PagesHomeLayoutProps> = ({
  onFilterClick,
  onExportClick,
  onSearch,
  searchTerm = "",
  showFilter = false,
  showExport = false,
  children,
}) => {
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);

  const handleExport = (format: "pdf" | "csv" | "xls") => {
    setIsExportDropdownOpen(false);
    if (onExportClick) {
      onExportClick(format);
    }
  };

  return (
    <div className="bg-blue50 p-8 rounded-md min-h-[80vh]">
      <div className="bg-white rounded-md w-full py-[10px] px-[20px] relative">
        <div className="flex items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => onSearch && onSearch(e.target.value)}
              className="border-b-[0.5px] border-black outline-none px-12 py-2 w-full focus:outline-none"
            />
            <img
              src={searchIcon}
              alt=""
              className="absolute left-4 top-1/2 transform -translate-y-1/2"
            />
          </div>

          {/* Filter and Export Buttons */}
          <div className="flex gap-2">
            {/* {showFilter && (
              <div
                className="flex items-center border border-primary500 px-3 py-[2px] rounded shadow-sm cursor-pointer"
                onClick={onFilterClick}
              >
                <img src={filterIcon} className="mr-2" alt="" />
                Filter
              </div>
            )} */}
            {/* {showExport && (
              <div className="relative">
                <button
                  className="flex items-center bg-primary500 text-white px-4 py-2 rounded-md shadow-sm"
                  onClick={() => setIsExportDropdownOpen(!isExportDropdownOpen)}
                >
                  <img src={exportArr} className="mr-2" alt="" />
                  Export CSV
                </button>
                {isExportDropdownOpen && (
                  <div className="absolute z-50 right-0  text-textColor text-[10px] font-medium bg-white border rounded-md shadow-lg w-full">
                    <ul>
                      <li
                        className="px-4 py-2 hover:bg-blue50 cursor-pointer"
                        onClick={() => handleExport("pdf")}
                      >
                        .PDF
                      </li>
                      <hr />
                      <li
                        className="px-4 py-2 hover:bg-blue50 cursor-pointer"
                        onClick={() => handleExport("csv")}
                      >
                        .CSV
                      </li>
                      <hr />
                      <li
                        className="px-4 py-2 hover:bg-blue50 cursor-pointer"
                        onClick={() => handleExport("xls")}
                      >
                        .XLS
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )} */}
          </div>
        </div>
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
};

export default PagesHomeLayout;
