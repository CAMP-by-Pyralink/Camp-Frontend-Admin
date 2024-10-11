import riskIcon from "../../../assets/svgs/Drisks.svg";
import assetIcon from "../../../assets/svgs/Dasseets.svg";
import scoreIcon from "../../../assets/svgs/DScore.svg";
import scanIcon from "../../../assets/svgs/Dscan.svg";
import infoIcon from "../../../assets/svgs/info.svg";

const QuickStat = () => {
  const QuickStatCards = [
    { title: "Total Risks", number: "216", percentage: "-10%", icon: riskIcon },
    {
      title: "Total Assets",
      number: "3200",
      percentage: "+10%",
      icon: assetIcon,
    },
    {
      title: "Safety Score",
      number: "24",
      percentage: "-40%",
      icon: scoreIcon,
    },
    { title: "Total Scans", number: "200", percentage: "+55%", icon: scanIcon },
  ];
  return (
    <div className=" grid grid-cols-4 gap-4 ">
      {QuickStatCards.map(({ title, icon, number, percentage }, index) => (
        <div
          key={index}
          className=" rounded-lg shadow-[5px_5px_40px_rgba(107,151,255,0.3)] p-[20px] border flex flex-col gap-2 relative"
        >
          <div className=" flex items-center justify-between">
            <img src={icon} alt="" width={40} height={40} />
            <img src={infoIcon} className=" " width={20} alt="" />
          </div>
          <h1 className=" text-[#667085] text-base font-medium leading-6 tracking-[0.5%]">
            {title}
          </h1>
          <div className=" flex items-center gap-2">
            <h1 className=" text-[#333843] font-medium">{number}</h1>
            <span
              className={`${
                percentage.includes("-")
                  ? "text-[#F04438] bg-[#FEEDEC] "
                  : "text-[#0D894F] bg-[#E7F4EE] "
              } font-medium px-[6px] py-[2px]  rounded-full`}
            >
              {percentage}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStat;
