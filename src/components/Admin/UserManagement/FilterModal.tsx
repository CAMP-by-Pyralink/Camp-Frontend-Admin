import React from "react";
import { useLocation } from "react-router-dom";
import closeIcon from "../../../assets/svgs/close.svg";

interface FilterConfig {
  key: string;
  label: string;
  type: "select" | "date" | "text";
  options?: { label: string; value: string }[];
}

interface FilterModalProps {
  filters: FilterConfig[];
  handleFilterClick: () => void;
  onApplyFilters: (filters: Record<string, string>) => void;
  selectedFilters: { [key: string]: string };
  handleFilterChange: (key: string, value: string) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  filters,
  handleFilterClick,
  onApplyFilters,
  selectedFilters,
  handleFilterChange,
}) => {
  const location = useLocation();
  const [filterValues, setFilterValues] = React.useState<
    Record<string, string>
  >({});

  // Determine if current page is the "special page"
  const isSpecialPage = location.pathname === "/asset-management"; // Adjust this to your special page's path

  const handleChange = (key: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onApplyFilters(filterValues);
    handleFilterClick(); // Close the modal
  };

  return (
    <div
      className="fixed inset-0 bg-[#344054B2] bg-opacity-40 flex justify-center items-center min-h-screen"
      style={{ backdropFilter: "blur(7.06999969482422px)" }}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl">
        {/* Modal Header */}
        <div className="bg-[#DEEFFC] py-4 px-12 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Filter Options
          </h2>
          <img
            src={closeIcon}
            alt="Close"
            className="cursor-pointer"
            onClick={handleFilterClick}
          />
        </div>

        {/* Filter Inputs */}
        <div className="px-12 mt-8 grid grid-cols-2 gap-4">
          {filters
            .filter((filter) => !(filter.key === "dateAdded" && isSpecialPage)) // Hide "Date Added" if on the special page
            .map((filter) => (
              <div key={filter.key} className="col-span-1">
                <label className="block text-[#101928] text-sm font-medium">
                  {filter.label}
                </label>

                {filter.type === "select" && (
                  <select
                    className="mt-1 w-full border border-[#D4D5FF] rounded px-3 py-4 text-textColor text-sm"
                    onChange={(e) => handleChange(filter.key, e.target.value)}
                  >
                    <option value="">Select {filter.label}</option>
                    {filter.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}

                {filter.type === "text" && (
                  <input
                    type="text"
                    placeholder={`Enter ${filter.label}`}
                    className="mt-1 w-full border border-[#D4D5FF] rounded px-3 py-4 text-[#98A2B3] text-sm"
                    onChange={(e) => handleChange(filter.key, e.target.value)}
                  />
                )}
              </div>
            ))}
        </div>

        {/* Special Date Filters */}
        {isSpecialPage ? (
          <div className="px-12 mt-8">
            {/* Purchase Date */}
            <div>
              <label className="block text-[#101928] text-sm font-medium">
                Purchase Date
              </label>
              <div className="flex gap-4">
                <input
                  type="date"
                  className="w-full border border-[#D4D5FF] rounded px-3 py-3"
                  onChange={(e) =>
                    handleChange("purchaseDateFrom", e.target.value)
                  }
                />
                <input
                  type="date"
                  className="w-full border border-[#D4D5FF] rounded px-3 py-3"
                  onChange={(e) =>
                    handleChange("purchaseDateTo", e.target.value)
                  }
                />
              </div>
            </div>

            {/* Warranty Expiration */}
            <div className="mt-4">
              <label className="block text-[#101928] text-sm font-medium">
                Warranty Expiration
              </label>
              <div className="flex gap-4">
                <input
                  type="date"
                  className="w-full border border-[#D4D5FF] rounded px-3 py-3"
                  onChange={(e) =>
                    handleChange("warrantyExpirationFrom", e.target.value)
                  }
                />
                <input
                  type="date"
                  className="w-full border border-[#D4D5FF] rounded px-3 py-3"
                  onChange={(e) =>
                    handleChange("warrantyExpirationTo", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="px-12 mt-8">
            <label className="block text-[#101928] text-sm font-medium mb-2">
              Date Added
            </label>
            <div className="flex items-center gap-4">
              <input
                type="date"
                value={filterValues["dateAddedFrom"] || ""}
                placeholder="From"
                className="w-full border border-[#D4D5FF] rounded px-3 py-3 text-[#101928] text-sm focus:ring-2 focus:ring-primary500 outline-none"
                onChange={(e) =>
                  handleFilterChange("dateAddedFrom", e.target.value)
                }
              />
              <input
                type="date"
                value={filterValues["dateAddedTo"] || ""}
                placeholder="To"
                className="w-full border border-[#D4D5FF] rounded px-3 py-3 text-[#101928] text-sm focus:ring-2 focus:ring-primary500 outline-none"
                onChange={(e) =>
                  handleFilterChange("dateAddedTo", e.target.value)
                }
              />
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="my-6 mx-12">
          <button
            className="w-full bg-primary500 text-white py-3 rounded-lg font-semibold transition-colors"
            onClick={handleSubmit}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
