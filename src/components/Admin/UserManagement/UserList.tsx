import React from "react";
import { FiFilter } from "react-icons/fi";
import { BsDownload } from "react-icons/bs";

const UserList: React.FC = () => {
  return (
    <>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-[#F0F2F5] text-left text-greyText">
            <th className="p-4 border-b border-gray-200">
              <input type="checkbox" />
            </th>
            <th className="p-4 border-b border-gray-200">ID</th>
            <th className="p-4 border-b border-gray-200">Name</th>
            <th className="p-4 border-b border-gray-200">Department</th>
            <th className="p-4 border-b border-gray-200">Date Added</th>
            <th className="p-4 border-b border-gray-200"></th>
          </tr>
        </thead>
        <tbody className=" bg-white">
          {Array.from({ length: 8 }, (_, i) => (
            <tr key={i} className="text-[#101928] hover:bg-gray-50">
              <td className="p-4 border-b border-gray-200">
                <input type="checkbox" />
              </td>
              <td className="p-4 border-b border-gray-200">PY 0022</td>
              <td className="p-4 border-b border-gray-200">Kristin Watson</td>
              <td className="p-4 text-[#737373] text-[14px] border-b border-gray-200">
                IT
              </td>
              <td className="p-4 border-b border-gray-200">
                23/04/2023 11:59PM
              </td>
              <td className="p-4 border-b border-gray-200 text-center">
                <button className="text-gray-600 hover:text-gray-800">⋮</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600">Page 1 of 7</span>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm text-gray-500 border rounded-lg bg-gray-100 hover:bg-gray-200">
            Prev
          </button>
          <button className="px-3 py-1 text-sm  border rounded-lg bg-gray-100 hover:bg-gray-200">
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default UserList;
