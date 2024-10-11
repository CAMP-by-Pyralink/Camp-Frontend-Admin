import infoIcon from "../../../assets/svgs/info.svg";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
const RiskRahting = () => {
  const pieData = [
    { name: "Critical", value: 12.3 },
    { name: "Medium", value: 14.6 },
    { name: "Low", value: 24.3 },
    // { name: "MANAGT.", value: 48.8 },
  ];
  const COLORS = ["#5358FF", "#5F22C1", "#7E81FF"];

  return (
    <div className=" w-[302px] shadow-[5px_5px_40px_rgba(107,151,255,0.3)] px-8 py-6">
      <div className=" flex items-center gap-2">
        <img src={infoIcon} alt="" />
        <h1 className=" leading-[19.2%]  tracking-[-2%]">
          Risk Severity Ratings
        </h1>
      </div>
      {/*  */}
      <div className="flex-col items-center mt-6">
        <PieChart width={204.85} height={204.85}>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%" // Center X
            cy="50%" // Center Y
            outerRadius={100}
            // innerRadius={} // for donut style
            fill="#8884d8"
            label={false} //to  Disable default labels
          >
            {pieData.map((entry, index) => (
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
          className=" flex flex-col"
          style={{ marginTop: "20px", display: "flex", gap: "1rem" }}
        >
          {pieData.map((item, index) => (
            <div key={index} className="  flex items-center gap-2">
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
              <div className=" flex gap-1 items-center">
                <p
                  className={` text-[9px] `}
                  style={
                    {
                      // color: COLORS[index % COLORS.length],
                    }
                  }
                >
                  {item.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiskRahting;
