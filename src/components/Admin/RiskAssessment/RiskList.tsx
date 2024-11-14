import { useState } from "react";
import Table from "../../../shared/Table";
import { Link } from "react-router-dom";

interface Risks {
  id: number;
  riskId: string;
  name: string;
  category: string;
  impact: string;
  probability: string;
  mitigrationStrategy: string;
  owner: string;
  //   audience: string[];
  status: string;
  reviewDate: string;
  note: string;
  //   recipient: number;
}

const risks: Risks[] = [
  {
    id: 1,
    riskId: "RA 111",
    name: "Data Loss",
    category: "Operational",
    impact: "High",
    probability: "High",
    mitigrationStrategy: "Conduct regular phishing simulations and training",
    owner: "IT",
    status: "Active",
    reviewDate: "22/09/2024",
    note: "Focus on training new employees",
  },
  {
    id: 2,
    riskId: "RA 112",
    name: "Data Loss",
    category: "Operational",
    impact: "High",
    probability: "High",
    mitigrationStrategy: "Cybersecurity",
    owner: "Management",
    status: "Active",
    reviewDate: "22/09/2024",
    note: "Focus on training new employees",
  },
  {
    id: 3,
    riskId: "RA 113",
    name: "Data Loss",
    category: "Operational",
    impact: "Medium",
    probability: "Medium",
    mitigrationStrategy: "Cybersecurity",
    owner: "IT",
    status: "Mitigated",
    reviewDate: "22/09/2024",
    note: "Focus on training new employees",
  },
  {
    id: 4,
    riskId: "RA 114",
    name: "Data Loss",
    category: "Operational",
    impact: "Low",
    probability: "Low",
    mitigrationStrategy: "Operational",
    owner: "IT",
    status: "Mitigated",
    reviewDate: "22/09/2024",
    note: "Focus on training new employees",
  },
];

const RiskList = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const handleButtonClick = (id: string) => {
    setSelectedUserId((prevUserId) => (prevUserId === id ? null : id));
  };

  return (
    <div>
      <div>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className=" text-[8.4px] bg-[#F0F2F5] text-left text-greyText">
              <th className="p-2 border-b border-gray-200">
                <input type="checkbox" />
              </th>
              <th className="p-2 border-b font-extrabold border-gray-200">
                RISK ID
              </th>
              <th className="p-2 border-b font-extrabold border-gray-200">
                RISK NAME
              </th>
              <th className="p-2 border-b font-extrabold border-gray-200">
                CATEGORY
              </th>
              <th className="p-2 border-b font-extrabold border-gray-200">
                RISK IMPACT
              </th>
              <th className="p-2 border-b font-extrabold border-gray-200">
                RISK PROBABILITY
              </th>
              <th className="p-2 border-b font-extrabold border-gray-200">
                MITIGRATION STRATEGY
              </th>
              <th className="p-2 border-b font-extrabold border-gray-200">
                RISK OWNER
              </th>
              <th className="p-2 border-b font-extrabold border-gray-200">
                STATUS
              </th>
              <th className="p-2 border-b font-extrabold border-gray-200">
                REVIEW DATE
              </th>
              <th className="p-2 border-b font-extrabold border-gray-200">
                NOTE
              </th>
              <th className="p-2 border-b font-extrabold border-gray-200"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {risks.map((risk) => (
              <tr
                key={risk.id}
                className="text-[#101928] text-xs hover:bg-gray-50 relative"
              >
                <td className="p-2 border-b border-gray-200">
                  <input type="checkbox" />
                </td>
                <td className="p-2 border-b border-gray-200">{risk.riskId}</td>
                <td className="p-2 border-b border-gray-200">{risk.name}</td>
                <td className="p-2 text-greytext  border-b border-gray-200">
                  {risk.category}
                </td>
                <td className={`p-2 border-b border-gray-200 w-fit `}>
                  <span
                    className={`py-[2px] px-3 rounded-xl ${
                      risk.probability === "Low"
                        ? "bg-[#E4FCDE] text-[#0B7B69]"
                        : risk.probability === "Medium"
                        ? "bg-[#FFF3CD] text-[#856404]"
                        : risk.probability === "High"
                        ? "bg-[#FCDEDE] text-[#B30100]"
                        : ""
                    }`}
                  >
                    {risk.impact}
                  </span>
                </td>
                <td className={`p-2 border-b border-gray-200 w-fit `}>
                  <span
                    className={`py-[2px] px-3 rounded-xl ${
                      risk.probability === "Low"
                        ? "bg-[#E4FCDE] text-[#0B7B69]"
                        : risk.probability === "Medium"
                        ? "bg-[#FFF3CD] text-[#856404]"
                        : risk.probability === "High"
                        ? "bg-[#F8D7DA] text-[#721C24]"
                        : ""
                    }`}
                  >
                    {risk.probability}
                  </span>
                </td>
                <td className="p-2 border-b max-w-[20px] border-gray-200">
                  {risk.mitigrationStrategy}
                </td>
                <td className="p-2 border-b border-gray-200">
                  <span className=" bg-blue-100 text-blue600 py-[2px] px-3 rounded-xl">
                    {risk.owner}
                  </span>
                </td>
                <td className="p-2 border-b border-gray-200">
                  <span
                    className={` py-[2px] px-3 rounded-full ${
                      risk.status === "Mitigated"
                        ? "bg-[#E4FCDE] text-[#0B7B69]"
                        : "bg-[#FCDEDE] text-[#B30100]"
                    }`}
                  >
                    {risk.status}
                  </span>
                </td>
                <td className="p-2 border-b border-gray-200">
                  {risk.reviewDate}
                </td>
                <td className="p-2 border-b border-gray-200">{risk.note}</td>

                <td className="p-2 border-b border-gray-200 text-center relative">
                  <div
                    className=" cursor-pointer flex items-center justify-center border border-[#E4E7EC] rounded-lg w-8 h-8"
                    onClick={() => handleButtonClick(risk.riskId)}
                  >
                    ⋮
                  </div>

                  {selectedUserId === risk.riskId && (
                    <div className="absolute left-0 mt-2 w-[89px]  bg-white border border-[#C7C7CC] rounded-md  shadow-[5px_5px_40px_rgba(107,151,255,0.3)] z-10">
                      <ul className="text-left">
                        <Link to={`/risk-detail/${risk.id}`}>
                          <li className="px-4 py-2 text-[#333333] hover:bg-blue50 cursor-pointer">
                            View
                          </li>
                        </Link>
                        <hr />
                        <li className="px-4 py-2 text-[#333333] hover:bg-blue50 cursor-pointer">
                          Edit
                        </li>
                        <hr />
                        <li className="px-4 py-2 text-[#FF0301] hover:bg-blue50 cursor-pointer">
                          Delete
                        </li>
                      </ul>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-[#070707]">Page 1 of 7</span>
        <div className="flex gap-2">
          <button className="px-[14px] py-2 text-sm text-[#D0D5DD] border rounded-lg border-[#EAECF0] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] bg-white">
            Prev
          </button>
          <button className="px-[14px] py-2 text-sm border rounded-lg border-[#EAECF0] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] bg-white">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default RiskList;
