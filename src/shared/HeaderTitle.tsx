import React from "react";
interface HeaderTitleProps {
  title: string;
  subTitle: string;
}
const HeaderTitle: React.FC<HeaderTitleProps> = ({ title, subTitle }) => {
  return (
    <div className=" mb-12 mt-4 text-greyText">
      <h1 className="  text-2xl font-semibold mb-1  tracking-[-2%] leading-[28.8px]">
        {title}
      </h1>
      <h3 className=" font-medium  text-sm">{subTitle}</h3>
    </div>
  );
};

export default HeaderTitle;
