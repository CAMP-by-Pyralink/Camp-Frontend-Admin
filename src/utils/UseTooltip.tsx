import { useState } from "react";

const UseTooltip = ({ title, children }: any) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      {showTooltip && (
        <div className="absolute top-12 left-0 w-full bg-gray-200 text-gray-900 rounded-md p-2 shadow-md">
          {title}
          <div className="absolute top-[-20px] left-20 w-4 h-4 bg-gray-200 transform rotate-45"></div>
        </div>
      )}
    </div>
  );
};

export default UseTooltip;
