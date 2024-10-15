import infoIcon from "../../../assets/svgs/info.svg";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const CompletionChart = () => {
  const pieData = [
    { name: "IT", value: 12.3 },
    { name: "HR", value: 14.6 },
    { name: "ADMIN", value: 24.3 },
    { name: "MANAGT.", value: 48.8 },
  ];

  // Define custom colors for the pie slices
  const COLORS = ["#5358FF", "#1790E7", "#7E81FF", "#5F22C1"];

  return (
    <div className="flex-1 p-4 shadow-[5px_5px_40px_rgba(107,151,255,0.3)]">
      <div className="flex gap-2">
        <img src={infoIcon} alt="" />
        <h3 className=" text-black">Training completion rate</h3>
      </div>
      {/* Pie Chart */}
      <div className=" flex items-center justify-center">
        <div className="flex-col items-center mt-8">
          <PieChart width={204.85} height={204.85}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%" // Center X
              cy="50%" // Center Y
              outerRadius={100}
              innerRadius={45} // for donut style
              fill="#8884d8"
              label={true} // Disable default labels
              labelLine={false}
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
            className="flex flex-col"
            style={{ marginTop: "20px", display: "flex", gap: "1rem" }}
          >
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                {/* Color indicator rectangle */}
                <div
                  className=""
                  style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                />
                {/* Label and value */}
                <div className="flex gap-1 items-center">
                  <p
                    className={`text-[9px]`}
                    style={{
                      color: COLORS[index % COLORS.length],
                    }}
                  >
                    {item.name}
                  </p>
                  <span
                    className="text-[9px]"
                    style={{
                      background: COLORS[index % COLORS.length],
                    }}
                  >
                    {item.value}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletionChart;
