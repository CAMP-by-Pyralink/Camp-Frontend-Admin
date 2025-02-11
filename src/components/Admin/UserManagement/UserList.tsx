import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAdminStore } from "../../../store/useAdminStore";

const UserList: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { admins, getAdmins } = useAdminStore();

  useEffect(() => {
    getAdmins();
  }, [getAdmins]);

  const handleButtonClick = (userId: string) => {
    setSelectedUserId((prevUserId) => (prevUserId === userId ? null : userId));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format

    return `${day}/${month}/${year} ${formattedHours}:${minutes}${ampm}`;
  };

  return (
    <div className="relative">
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
        <tbody className="bg-white">
          {admins.map((admin) => (
            <tr
              key={admin._id}
              className="text-[#101928] hover:bg-gray-50 relative"
            >
              <td className="p-4 border-b border-gray-200">
                <input type="checkbox" />
              </td>
              <td className="p-4 border-b border-gray-200">{admin._id}</td>
              <td className="p-4 border-b border-gray-200">{`${admin.lName} ${admin.fName}`}</td>
              <td className="p-4 text-[#737373] text-[14px] border-b border-gray-200">
                {admin.department || "N/A"}
              </td>
              <td className="p-4 border-b border-gray-200">
                {formatDate(admin.createdAt) || "N/A"}
              </td>
              <td className="p-4 border-b border-gray-200 text-center relative">
                <div
                  className=" cursor-pointer flex items-center justify-center border border-[#E4E7EC] rounded-lg w-8 h-8"
                  onClick={() => handleButtonClick(admin._id)}
                >
                  ⋮
                </div>

                {selectedUserId === admin._id && (
                  <div className="absolute left-0 mt-2 w-[89px]  bg-white border border-[#C7C7CC] rounded-md  shadow-[5px_5px_40px_rgba(107,151,255,0.3)] z-10">
                    <ul className="text-left">
                      <Link to="/profile">
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

      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-[#070707]">Page 1 of 7</span>
        <div className="flex gap-2">
          <button className=" px-[14px] py-2 text-sm text-[#D0D5DD] border rounded-lg border-[#EAECF0] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] bg-white">
            Prev
          </button>
          <button className=" px-[14px] py-2 text-sm border rounded-lg  border-[#EAECF0] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] bg-white">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserList;
