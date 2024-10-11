import logoIcon from "../assets/svgs/logoicon.svg";
import downArrow from "../assets/svgs/downarrfilled.svg";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import { useCustomization } from "../contexts/CustomizationContext";

const CustomizationSetting = ({ handleCustomizationClick }) => {
  const [value, setValue] = useState<number>(30);
  const [selectedColor, setSelectedColor] = useState("Default");
  // const [openCustomizationSetting, setOpenCustomizationSetting] =
  //   useState(true);

  // const handleCustomizationClick = () => {
  //   setOpenCustomizationSetting(!openCustomizationSetting);
  // };
  const {
    logo,
    font,
    fontSize,
    themeColor,
    setLogo,
    setFont,
    setFontSize,
    setThemeColor,
  } = useCustomization();
  const [hexCode, setHexCode] = useState<string>(themeColor);

  // Handle slider change
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
    setFontSize(newValue as number); // Update the font size
  };

  // Handle file upload for logo
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string); // Set the uploaded logo
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle hex color change for theme
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHex = e.target.value;
    setHexCode(newHex); // Update hex input state
    setThemeColor(newHex); // Set the new theme color
  };

  // Predefined color themes
  const colorThemes = [
    {
      name: "Default",
      color: "#00037B",
    },
    {
      name: "Black",
      color: "#0A0A0B",
    },
    {
      name: "Sky Blue",
      color: "#147BC5",
    },
    {
      name: "Green",
      color: "#0B7B69",
    },
    {
      name: "Orange",
      color: "#CC7914",
    },
  ];

  return (
    <div className=" bg-[#F6F6F6] px-4 py-4 absolute z-50 right-8 top-[68px] w-fit h-[89.3%] overflow-y-scroll">
      <div className=" flex items-center justify-between mb-4 pb-4 border-[#DDDDDD] border-b">
        <h1>Customization Setting</h1>
        <p className=" cursor-pointer" onClick={handleCustomizationClick}>
          X
        </p>
      </div>
      <div className=" flex flex-col gap-4">
        {/* Logo*/}
        <div className="bg-white p-4 rounded-[15px] flex items-center gap-4 ">
          <div>
            <img
              src={logo || logoIcon} // Show the selected logo or default logo
              alt="Logo"
              className=" w-[111px] h-[108px] rounded-[6px]"
            />
          </div>
          <div className=" flex flex-col gap-2 text-sm leading-[21.28px]">
            <h1>Add a logo</h1>
            <h1 className=" text-[#646464]">
              Logo must not be more than 500kb
            </h1>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="upload-logo"
              onChange={handleFileUpload}
            />
            <label htmlFor="upload-logo">
              <button className=" border border-[#454545] w-fit rounded-lg py-[6px] px-[10px] text-[#646464] leading-[21.28px]">
                Upload
              </button>
            </label>
          </div>
        </div>

        {/* Font */}
        <div className="bg-white p-4 rounded-[15px]">
          <h1 className=" text-[#101928] font-medium">Font</h1>
          <div className=" relative">
            <input
              type="text"
              value={font} // Bind to the selected font
              onChange={(e) => setFont(e.target.value)} // Handle font change
              className="w-full  mt-2 py-2 px-3 rounded-[6px] placeholder:text-[#98A2B3]  h-[59px] outline-none border border-primary100"
              placeholder="Select Font"
            />
            <label>
              <img
                src={downArrow}
                alt="Dropdown arrow"
                className=" absolute top-[50%] right-4 "
              />
            </label>
          </div>

          {/* Select font size */}
          <div>
            <h1 className=" text-[#101928] font-medium mt-4">
              Select a Font Size
            </h1>
            <div>
              <Box sx={{ width: 200 }}>
                <Stack
                  spacing={2}
                  direction="row"
                  sx={{ alignItems: "center", mb: 1 }}
                >
                  <Slider
                    aria-label="Font size"
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="on"
                    min={12}
                    max={48}
                  />
                </Stack>
              </Box>

              <div className="flex gap-4 text-xs mt-2">
                <span style={{ fontSize: "12px" }}>Aa</span>
                <span style={{ fontSize: "24px" }}>Aa</span>
                <span style={{ fontSize: "36px" }}>Aa</span>
                <span style={{ fontSize: "48px" }}>Aa</span>
              </div>
            </div>
          </div>
        </div>

        {/* Select theme */}
        <div className="bg-white p-4 rounded-[15px]">
          <h1 className=" text-[#101928] font-medium">Select color theme</h1>
          <div className=" grid grid-cols-3  gap-4 mt-4">
            {colorThemes.map(({ name, color }, index) => (
              <div
                onClick={() => {
                  setSelectedColor(name);
                  setThemeColor(color); // Update the selected color
                }}
                key={index}
                className={`bg-[#F6F6F6] flex gap-2 py-2 px-[14px] rounde-[6px] ${
                  selectedColor === name
                    ? " border border-[#9A9A9A] rounded-[6px]"
                    : ""
                }`}
              >
                <div
                  className=" w-[70px] h-[21px]"
                  style={{ background: color }}
                ></div>
                <h1>{name}</h1>
              </div>
            ))}
          </div>

          {/* Input Hex Code */}
          <div className=" relative mt-16">
            <input
              type="text"
              value={hexCode} // Hex input value bound to hexCode state
              onChange={handleHexChange} // Handle hex input change
              className="w-full  mt-2 py-2 px-3 rounded-[6px] placeholder:text-[#98A2B3]  h-[59px] outline-none border border-primary100"
              placeholder="Input Hex Code"
            />
            <label>
              <img
                src={downArrow}
                alt="Dropdown arrow"
                className=" absolute top-[50%] right-4 "
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationSetting;
