import { useState } from "react";
import downArrow from "../../../assets/svgs/downarrgrey.svg";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const AssignedAssets = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState("Assigned Assets");

  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelectContent = (content: string) => {
    setSelectedContent(content);
    setIsOpen(false); // Close the dropdown after selection
  };

  // Define the data for the chart
  const pieData = [
    { name: "Assigned", value: 1300 },
    { name: "Unassigned", value: 1900 },
    // { name: "Series C", value: 20 },
  ];

  // Define custom colors for the pie slices
  const COLORS = ["#B794EC", "#5F22C1"];

  return (
    <div className="shadow-[5px_5px_40px_rgba(107,151,255,0.3)] p-6 rounded-lg">
      <div className="relative">
        <div
          className="relative border border-neutrals200 w-fit py-2 px-2 rounded-lg flex gap-4 cursor-pointer mb-4"
          onClick={handleToggleDropdown}
        >
          <h1 className="text-baseBlack leading-[16.8px] font-normal">
            {selectedContent}
          </h1>
          <img src={downArrow} alt="Dropdown arrow" />
        </div>
        {isOpen && (
          <div className="absolute top-[25px] z-50 shadow-[5px_5px_40px_rgba(107,151,255,0.3)] border border-[#C7C7CC] rounded bg-white  mt-2">
            <div
              className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectContent("Assigned Assets")}
            >
              Assigned Assets
            </div>
            <hr />
            <div
              className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectContent("Assigned by type")}
            >
              Assigned by type
            </div>
          </div>
        )}
      </div>
      {/* Pie Chart */}
      <div className="flex flex-col items-center relative">
        <PieChart width={219} height={219}>
          {/* Define the pie and set the innerRadius to create a donut shape */}
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%" // Center X
            cy="50%" // Center Y
            outerRadius={100}
            innerRadius={60} // This makes it a donut
            fill="#8884d8"
            label={false} // Disable default labels
          >
            {pieData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          {/* Tooltip for hover information */}
          <Tooltip />
        </PieChart>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: 40,
            fontWeight: "",
            color: "black",
          }}
        >
          {pieData.reduce((acc, current) => acc + current.value, 0)}
        </div>
      </div>

      {/* Render the details manually below the Pie Chart with color indicators */}
      <div style={{ marginTop: "20px", display: "flex", gap: "1rem" }}>
        {pieData.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {/* Color indicator rectangle */}
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: COLORS[index % COLORS.length],
              }}
            />
            {/* Label and value */}
            <div>
              <p>
                {item.name} {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignedAssets;
