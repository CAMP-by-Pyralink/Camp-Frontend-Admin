import closeIcon from "../../../assets/svgs/close.svg";
const FilterModal = ({ handleFilterClick }) => {
  return (
    <div
      className="fixed inset-0 bg-[#344054B2] bg-opacity-40 flex justify-center items-center min-h-screen "
      style={{ backdropFilter: "blur(7.06999969482422px)" }}
    >
      <div className="bg-white rounded-lg shadow-lg  w-full max-w-xl">
        <div className="bg-[#DEEFFC] py-4 px-12 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Filter options
          </h2>
          {/* <div className="text-gray-500 hover:text-gray-800">✕</div> */}
          <img
            src={closeIcon}
            alt=""
            className=" cursor-pointer"
            onClick={handleFilterClick}
          />
        </div>

        <div className=" px-12 mt-8 grid grid-cols-2 gap-4">
          {/* Department */}
          <div>
            <label className="block text-[#101928] text-sm font-medium">
              Department
            </label>
            <select className="mt-1 w-full border border-[#D4D5FF] rounded px-3 py-2 text-[#98A2B3] text-sm">
              <option>Filter by department</option>
              {/* Add department options here */}
            </select>
          </div>

          {/* Training Status */}
          <div>
            <label className="block text-[#101928] text-sm font-medium">
              Training status
            </label>
            <select className="mt-1 w-full border border-[#D4D5FF] rounded px-3 py-2 text-[#98A2B3] text-sm">
              <option>Select training status</option>
              {/* Add training status options here */}
            </select>
          </div>

          {/* Assigned Asset Category */}
          <div>
            <label className="block text-[#101928] text-sm font-medium">
              Assigned Asset category
            </label>
            <select className="mt-1 w-full border border-[#D4D5FF] rounded px-3 py-2 text-[#98A2B3] text-sm">
              <option>Select asset category</option>
              {/* Add asset category options here */}
            </select>
          </div>

          {/* Simulation Score */}
          <div>
            <label className="block text-[#101928] text-sm font-medium">
              Simulation score
            </label>
            <select className="mt-1 w-full border border-[#D4D5FF] rounded px-3 py-2 text-[#98A2B3] text-sm">
              <option>Select simulation score</option>
              {/* Add simulation score options here */}
            </select>
          </div>

          {/* Date Added - From */}
          <div>
            <label className="block text-[#101928] text-sm font-medium">
              Date Added
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="date"
                className="w-full border border-[#D4D5FF] rounded px-3 py-2 text-[#98A2B3] text-sm"
                placeholder="From"
              />
              <input
                type="date"
                className="w-full border border-gray-300 rounded px-3 py-2 text-[#98A2B3] text-sm"
                placeholder="To"
              />
            </div>
          </div>
        </div>

        <div className="my-6 mx-12">
          <button className="w-full bg-primary500 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
