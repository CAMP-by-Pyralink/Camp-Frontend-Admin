import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { AlertCircle, Database, Shield, HardDrive } from "lucide-react";

interface ScanResult {
  keyword: string;
  scanDate: string;
  runtime: string;
  exposureLevel: number;
  phishingSites: string[];
}

const ScanDetails: React.FC = () => {
  // Sample data for the gauge
  const gaugeData = [
    { value: 60 }, // Red section
    { value: 20 }, // Yellow section
    { value: 20 }, // Green section
  ];

  const COLORS = ["#ef4444", "#f59e0b", "#22c55e"];

  const sampleData: ScanResult = {
    keyword: "pyntrix.com",
    scanDate: "22-09-2024",
    runtime: "6 minutes, 20 seconds",
    exposureLevel: 75,
    phishingSites: [
      "www.it-match4nd24h.com/xxx/",
      "www.shoaroomcommunity.com/kata/ja/shop/",
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex items-center gap-4 mb-4">
            {/* Gauge Chart */}
            <div className="w-32 h-16 relative">
              <PieChart width={128} height={64}>
                <Pie
                  data={gaugeData}
                  cx={64}
                  cy={64}
                  startAngle={180}
                  endAngle={0}
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={0}
                  dataKey="value"
                >
                  {gaugeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
              <div className="absolute bottom-0 left-0 w-full text-center">
                <div className="text-sm font-medium">Exposure level</div>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex gap-2">
              <span className="text-gray-600">Keyword:</span>
              <span className="font-medium">{sampleData.keyword}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-600">Scan date:</span>
              <span className="font-medium">{sampleData.scanDate}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-600">Test Runtime:</span>
              <span className="font-medium">{sampleData.runtime}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
            View detailed report
          </button>
          <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg text-sm">
            New scan
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="text-red-500" size={20} />
            <span className="text-sm text-gray-600">
              Potential phishing websites
            </span>
          </div>
          <div className="text-2xl font-semibold text-red-500">20</div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="text-red-500" size={20} />
            <span className="text-sm text-gray-600">
              Potential cybersquatting domains
            </span>
          </div>
          <div className="text-2xl font-semibold text-red-500">20</div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Database className="text-red-500" size={20} />
            <span className="text-sm text-gray-600">
              Data Potential typosquatting domains
            </span>
          </div>
          <div className="text-2xl font-semibold text-red-500">20</div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Database className="text-red-500" size={20} />
            <span className="text-sm text-gray-600">Data Leaks</span>
          </div>
          <div className="text-2xl font-semibold text-red-500">20</div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <HardDrive className="text-red-500" size={20} />
            <span className="text-sm text-gray-600">
              Compromised Devices/ Infrastructure
            </span>
          </div>
          <div className="text-2xl font-semibold text-red-500">20</div>
        </div>
      </div>

      {/* Phishing Websites Table */}
      <div>
        <h3 className="text-lg font-medium mb-4">
          Potential phishing websites
        </h3>
        <div className="bg-gray-50 rounded-lg">
          <div className="grid grid-cols-2 py-2 px-4 border-b border-gray-200">
            <div className="text-sm font-medium text-gray-600">
              Phishing site
            </div>
            <div className="text-sm font-medium text-gray-600">Time</div>
          </div>
          {sampleData.phishingSites.map((site, index) => (
            <div
              key={index}
              className="grid grid-cols-2 py-2 px-4 border-b border-gray-100"
            >
              <div className="text-sm text-blue-600">{site}</div>
              <div className="text-sm text-gray-600">20:01:35</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScanDetails;
