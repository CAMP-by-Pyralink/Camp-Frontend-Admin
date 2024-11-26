import React, { useState } from "react";
import { AlertCircle, Database, HardDrive, Shield } from "lucide-react";
import Speedometer from "react-d3-speedometer";
import ModalLayout from "../../shared/ModalLayout";
import PremiumModal from "./PremiumModal";
import phishingWebsitesIcon from "../../assets/svgs/phishing-websites-icon.svg";
import cybersquattingIcon from "../../assets/svgs/cybersquatting-icon.svg";
import typosquattingIcon from "../../assets/svgs/typosquatting-icon.svg";
import lockedIcon from "../../assets/svgs/locked-icon.svg";
import pdfIcon from "../../assets/svgs/pdf-icon.svg";
import StartScanModal from "./StartScanModal";
interface TableRow {
  [key: string]: string | number;
}
interface Metric {
  icon: string;
  label: string;
  value: number;
  isPremium?: boolean;
  tableHeaders: string[];
  tableData: any[];
}

interface ScanResultData {
  keyword: string;
  scanDate: string;
  runtime: string;
  exposureLevel: number;
  metrics: Metric[];
}

const ScanResult: React.FC = () => {
  const [activeMetricIndex, setActiveMetricIndex] = useState(0);
  const [viewDetailedClicked, setViewDetailedClicked] = useState(false);
  const [newScanClicked, setNewScanClicked] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const sampleData: ScanResultData = {
    keyword: "pyntrix.com",
    scanDate: "22-09-2024",
    runtime: "6 minutes, 20 seconds",
    exposureLevel: 75,
    metrics: [
      {
        icon: phishingWebsitesIcon,
        label: "Potential phishing websites",
        value: 20,
        isPremium: false,
        tableHeaders: ["URL", "Time"],
        tableData: [
          { url: "www.tk-meachant24h.com/ww/", time: "20:01:35" },
          {
            url: "www.shcannconmmnumnjty.com/sgion/joji/hope/",
            time: "20:05:42",
          },
        ],
      },
      {
        icon: cybersquattingIcon,
        label: "Potential cybersquatting domains",
        value: 15,
        isPremium: false,
        tableHeaders: ["Domain", "Time"],
        tableData: [
          { domain: "www.cybersquat-1.com", time: "19:12:15" },
          { domain: "www.cybersquat-2.com", time: "19:45:23" },
        ],
      },
      {
        icon: typosquattingIcon,
        label: "Potential typosquatting domains",
        value: 10,
        isPremium: true,
        tableHeaders: ["Domain", "Time"],
        tableData: [
          { domain: "www.typosquat-1.com", time: "18:22:09" },
          { domain: "www.typosquat-2.com", time: "18:30:47" },
        ],
      },
      {
        icon: typosquattingIcon,
        label: "Data Leaks",
        value: 8,
        isPremium: true,
        tableHeaders: ["Keyword", "Type of Data", "Impact"],
        tableData: [
          {
            keyword: "email@example.com",
            type: "Email Address",
            impact: "High",
          },
          { keyword: "123-456-7890", type: "Phone Number", impact: "Medium" },
        ],
      },
      {
        icon: typosquattingIcon,
        label: "Compromised Devices/infrastructure",
        value: 5,
        isPremium: false,
        tableHeaders: ["Device Name", "Type", "User", "Impact", "Date"],
        tableData: [
          {
            name: "Server A",
            type: "Server",
            user: "Admin",
            impact: "Critical",
            date: "22-09-2024",
          },
          {
            name: "Laptop B",
            type: "Laptop",
            user: "John Doe",
            impact: "High",
            date: "20-09-2024",
          },
        ],
      },
    ],
  };

  const handleMetricClick = (index: number) => {
    if (sampleData.metrics[index].isPremium) {
      setShowPremiumModal(true);
    } else {
      setActiveMetricIndex(index);
    }
  };

  return (
    <div className="bg-white shadow-md py-6 px-12 rounded-md">
      {/* Scan Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-center">
          <Speedometer
            minValue={0}
            maxValue={100}
            value={sampleData.exposureLevel}
            width={200}
            height={100}
            needleColor="blue"
            startColor="green"
            endColor="red"
            segments={3}
            ringWidth={10}
          />
          <p className="mt-2 text-sm font-medium">Exposure Level</p>
        </div>
        <div className="">
          <h1 className="text-2xl font-semibold text-textColor">
            Result is here!
          </h1>
          <p className="text-sm">Scanned 10 times in the last 12 months</p>
          <div className=" space-y-2 mt-2">
            <div className="text-sm flex items-center gap-2">
              <h2 className="font-medium text-primary600 text-sm basis-[30%]">
                Keyword:
              </h2>
              <p className=" flex-1 text-sm text-left text-textColor ">
                {sampleData.keyword}
              </p>
            </div>
            <div className="text-sm flex items-center gap-4">
              <h2 className="font-medium text-primary600 text-sm basis-[30%]">
                Scan date:
              </h2>
              <p className=" flex-1 text-sm text-left text-textColor ">
                {sampleData.scanDate}
              </p>
            </div>
            <div className="text-sm flex items-center gap-4">
              <h2 className="font-medium text-primary600 text-sm basis-[%]">
                Test Runtime:
              </h2>
              <p className=" flex-1 text-sm text-left text-textColor ">
                {sampleData.runtime}
              </p>
            </div>
          </div>
        </div>
        {/* Buttons */}
        <div className="flex flex-col gap-2">
          <button
            className="bg-primary500 rounded-lg text-[#FAFAFA] font-medium py-2 px-4 flex items-center gap-2"
            onClick={() => setViewDetailedClicked(true)}
          >
            View detailed report
            <img src={pdfIcon} alt="" />
          </button>
          <button
            className="bg-blue-50 rounded-lg text-primary500 font-medium py-2 px-4"
            onClick={() => setNewScanClicked(true)}
          >
            New scan
          </button>
        </div>
      </div>

      {/* Divider */}
      <hr className="mb-6 bg-[#94949482] text-[#94949482]" />

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {sampleData.metrics.map((metric, index) => (
          <div
            key={index}
            className={`  px-5 py-8 flex-col flex gap-2 rounded-lg cursor-pointer relative group shadow-custom-shadow ${
              activeMetricIndex === index && !metric.isPremium
                ? "bg-white"
                : "bg-white"
            }`}
            onClick={() => handleMetricClick(index)}
          >
            {metric.isPremium && (
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-90 transition-opacity duration-200 flex items-center justify-center rounded-lg backdrop-blur-2xl">
                <div className=" flex items-center gap-4 flex-col">
                  <img src={lockedIcon} alt="" />
                  <p className="text-[#667085] font-medium ">
                    Subscribe to Premium
                  </p>
                </div>
              </div>
            )}
            <img src={metric.icon} alt="" className=" w-[34px] aspect-square" />
            <h2 className="  text-base text-[#667085]">{metric.label}</h2>
            <div className="text-4xl font-semibold text-[#FF5756]">
              {metric.value}
            </div>
          </div>
        ))}
      </div>

      {/* Compromised Devices Table */}
      {!sampleData.metrics[activeMetricIndex].isPremium && (
        <div className=" mt-24">
          <h3 className="text-xl mb-4">
            {sampleData.metrics[activeMetricIndex].label}
          </h3>
          <div className=" rounded-lg">
            <div className="flex justify-between items-center py-2 px-4 bg-[#F0F2F5]">
              {sampleData.metrics[activeMetricIndex].tableHeaders.map(
                (header, i) => (
                  <div
                    key={i}
                    className="text-xs font-medium text-[#344054] text-center "
                  >
                    {header}
                  </div>
                )
              )}
            </div>
            {sampleData.metrics[activeMetricIndex].tableData.map((row, i) => (
              <div
                key={i}
                className=" flex items-center justify-between py-2 px-4 text-textColor text-sm"
              >
                {Object.values(row).map((cell, j) => (
                  <div
                    key={j}
                    className="text-sm text-gray-600 text-center truncate"
                  >
                    {String(cell)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      {viewDetailedClicked && (
        <ModalLayout>
          <PremiumModal setViewDetailedClicked={setViewDetailedClicked} />
        </ModalLayout>
      )}

      {showPremiumModal && (
        <ModalLayout>
          <PremiumModal setViewDetailedClicked={setShowPremiumModal} />
        </ModalLayout>
      )}

      {newScanClicked && (
        <ModalLayout>
          <StartScanModal />
        </ModalLayout>
      )}
    </div>
  );
};

export default ScanResult;
