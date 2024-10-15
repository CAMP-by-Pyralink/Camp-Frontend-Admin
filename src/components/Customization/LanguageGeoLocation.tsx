import { useState } from "react";
import downArrow from "../../assets/svgs/downarrfilled.svg";
import currencyIcon from "../../assets/svgs/currencyicon.svg";
import languagesIcon from "../../assets/svgs/languageIcon.svg";

const LanguageGeoLocation = () => {
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("USD");
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);

  const languages = ["English", "French", "Spanish", "German"];
  const currencies = ["USD", "EUR", "GBP", "JPY"];

  return (
    <>
      <div className="bg-white p-8 rounded-[15px]">
        <h2 className="text-textColor mb-4">Language and Geo Location</h2>

        {/* Language Dropdown */}
        <div className="text-black">
          <h1>Language</h1>
          <div className="relative">
            <div
              onClick={() => setIsLanguageOpen((prev) => !prev)}
              className="w-full text-neutrals600 p-2 h-14 border border-gray-300 rounded-md cursor-pointer flex justify-between items-center"
            >
              <span>{language}</span>
              <div className="flex gap-2 items-center">
                <img src={languagesIcon} alt="" />
                <img src={downArrow} alt="" />
              </div>
            </div>
            {isLanguageOpen && (
              <div className="absolute z-10 bg-white border border-gray-300 rounded-md  w-full">
                {languages.map((lang) => (
                  <div
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setIsLanguageOpen(false);
                    }}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                  >
                    {lang}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Currency Dropdown */}
        <div className="text-black mt-4">
          <h1>Currency</h1>
          <div className="relative">
            <div
              onClick={() => setIsCurrencyOpen((prev) => !prev)}
              className="w-full text-neutrals600 p-2 h-14 border border-gray-300 rounded-md cursor-pointer flex justify-between items-center"
            >
              <span>{currency}</span>
              <div className="flex gap-2 items-center">
                <img src={currencyIcon} alt="" />
                <img src={downArrow} alt="" />
              </div>
            </div>
            {isCurrencyOpen && (
              <div className="absolute z-10 bg-white border border-gray-300 rounded-md  w-full">
                {currencies.map((curr) => (
                  <div
                    key={curr}
                    onClick={() => {
                      setCurrency(curr);
                      setIsCurrencyOpen(false);
                    }}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                  >
                    {curr}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LanguageGeoLocation;
