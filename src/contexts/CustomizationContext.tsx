import React, { createContext, useContext, useState } from "react";

interface CustomizationContextProps {
  logo: string | null;
  font: string;
  fontSize: number;
  themeColor: string;
  setLogo: (logo: string) => void;
  setFont: (font: string) => void;
  setFontSize: (size: number) => void;
  setThemeColor: (color: string) => void;
}

const CustomizationContext = createContext<
  CustomizationContextProps | undefined
>(undefined);

export const CustomizationProvider: React.FC = ({ children }) => {
  const [logo, setLogo] = useState<string | null>(null);
  const [font, setFont] = useState<string>("");
  const [fontSize, setFontSize] = useState<number>(16);
  const [themeColor, setThemeColor] = useState<string>("#000250");

  return (
    <CustomizationContext.Provider
      value={{
        logo,
        font,
        fontSize,
        themeColor,
        setLogo,
        setFont,
        setFontSize,
        setThemeColor,
      }}
    >
      {children}
    </CustomizationContext.Provider>
  );
};

export const useCustomization = () => {
  const context = useContext(CustomizationContext);
  if (!context) {
    throw new Error(
      "useCustomization must be used within a CustomizationProvider"
    );
  }
  return context;
};
