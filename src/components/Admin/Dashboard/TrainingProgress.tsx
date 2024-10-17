import icon1 from "../../../assets/svgs/training1.svg";
import icon2 from "../../../assets/svgs/training2.svg";
import linkSquare from "../../../assets/svgs/link-square.svg";
import bookSquare from "../../../assets/svgs/book-square.svg";
import icon3 from "../../../assets/svgs/training3.svg";
import rightArrow from "../../../assets/svgs/rightarr.svg";

const TrainingProgress = () => {
  const trainings = [
    {
      icon: bookSquare,
      header: "Training in progress",
      type: "Cybersecurity for Beginners",
      completionRate: "32%",
      bg: "#F9F5FF",
    },
    {
      icon: linkSquare,
      header: "Phishing simulation in progress",
      type: "Email Account Suspension Alert",
      completionRate: "48%",
      bg: "#FFEDED",
    },
    {
      icon: bookSquare,
      header: "Completed Trainings",
      type: "Awareness Trainings",
      completionRate: "100%",
      bg: "#F9F5FF",
    },
  ];

  return (
    <div className=" flex-1 flex flex-col gap-4">
      {trainings.map(({ icon, header, type, completionRate, bg }, index) => (
        <div
          key={index}
          className="py-4 px-6 flex items-center gap-4 border border-gray-200 rounded-lg shadow-[5px_5px_40px_rgba(107,151,255,0.3)]"
        >
          <img
            src={icon}
            alt=""
            className=" p-5 rounded-full"
            style={{ background: bg }}
          />
          <div className="flex-1">
            <div className="flex justify-between">
              <h1 className=" text-sm text-secondary500">{header}</h1>
              <div className="flex items-center cursor-pointer">
                <p className="text-secondary600 text-xs">view all</p>
                <img src={rightArrow} alt="Right arrow" className="ml-1" />
              </div>
            </div>
            <h1 className="text-[#333333] font-medium text-xl leading-[28px]">
              {type}
            </h1>
            <div className="mt-2 flex gap-2 items-center">
              <div className="relative w-full h-[10px] bg-secondary100 rounded-[6px]">
                <div
                  className="absolute h-full bg-secondary600 rounded"
                  style={{ width: completionRate }} // Set width based on completion rate
                ></div>
              </div>
              <p className="text-right font-medium">{completionRate}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrainingProgress;
