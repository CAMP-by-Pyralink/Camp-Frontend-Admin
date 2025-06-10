import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface CampaignStatsProps {
  title: string;
  subtitle: string;
  audiences: any[];
  deliveryDates: {
    start: string;
    end: string;
    nextStart: string;
    nextEnd: string;
    time?: string; // Optional time field
  };
  stats: { percentage: number; label: string }[];
}

const CampaignStats: React.FC<CampaignStatsProps> = ({
  title,
  subtitle,
  audiences,
  deliveryDates,
  stats,
}) => {
  // Helper function to render delivery info
  const renderDeliveryInfo = () => {
    if (deliveryDates.start === "Not scheduled") {
      return (
        <div className="mt-4 bg-purple-50 p-3 rounded-md">
          <p className="text-[10px] text-black">Delivery: Not scheduled</p>
        </div>
      );
    }

    return (
      <div className="mt-4 bg-purple-50 p-3 rounded-md">
        <p className="text-[10px] text-black">
          Delivery: {deliveryDates.start}
          {deliveryDates.time && ` at ${deliveryDates.time}`}
          {deliveryDates.end !== deliveryDates.start &&
            ` - ${deliveryDates.end}`}
        </p>
        {deliveryDates.nextStart !== "Not scheduled" && (
          <p className="text-[10px] text-black">
            Next Delivery: {deliveryDates.nextStart}
            {deliveryDates.nextEnd !== deliveryDates.nextStart &&
              ` - ${deliveryDates.nextEnd}`}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="bg-blue50 px-8 py-4 rounded-lg shadow-lg">
      <div className="bg-white p-6 rounded-lg shadow-[5px_5px_40px_rgba(107,151,255,0.3)] mb-4 flex flex-col">
        <div className="bg-purple500 flex items-center justify-around">
          <div>
            <h2 className="text-[#454545]">{title}</h2>
            <p className="text-2xl font-medium text-[#454545]">{subtitle}</p>
          </div>

          <div className="flex gap-2 mt-2">
            {audiences && audiences.length > 0 ? (
              audiences.map((audience, index) => (
                <span
                  key={index}
                  className="bg-blue50 text-[#454545] text-sm py-1 px-3 rounded-full"
                >
                  {audience} <span className="ml-1 cursor-pointer">✕</span>
                </span>
              ))
            ) : (
              <span className="text-[#454545] text-sm py-1 px-3">
                No audiences specified
              </span>
            )}
          </div>

          {/* Delivery Information */}
          {renderDeliveryInfo()}
        </div>

        {/* Stats Section */}
        <div className="flex mx-auto gap-20 mt-6">
          {stats.map((stat, index) => (
            <div key={index} className="w-[120px] relative">
              <CircularProgressbar
                value={stat.percentage}
                styles={buildStyles({
                  textColor: "#000000",
                  pathColor: "#864DE0",
                  trailColor: "#E4E4E4",
                })}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-black font-bold text-2xl">
                  {stat.percentage}%
                </span>
                <span className="text-black text-[10px] mt-1 capitalize">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampaignStats;
