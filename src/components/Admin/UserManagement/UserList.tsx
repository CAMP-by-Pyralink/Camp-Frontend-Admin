import React, { useState } from "react";
import { Link } from "react-router-dom";

interface User {
  id: string;
  name: string;
  department: string;
  dateAdded: string;
}

const UserList: React.FC = () => {
  const users: User[] = [
    {
      id: "PY 0022",
      name: "Kristin Watson",
      department: "IT",
      dateAdded: "23/04/2023 11:59PM",
    },
    {
      id: "PY 0023",
      name: "Jacob Black",
      department: "HR",
      dateAdded: "15/05/2023 10:00AM",
    },
    {
      id: "PY 0024",
      name: "Jacob Black",
      department: "HR",
      dateAdded: "15/05/2023 10:00AM",
    },
    {
      id: "PY 0025",
      name: "Jacob Black",
      department: "HR",
      dateAdded: "15/05/2023 10:00AM",
    },
    {
      id: "PY 0026",
      name: "Jacob Black",
      department: "HR",
      dateAdded: "15/05/2023 10:00AM",
    },
    {
      id: "PY 0027",
      name: "Jacob Black",
      department: "HR",
      dateAdded: "15/05/2023 10:00AM",
    },
  ];

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleButtonClick = (userId: string) => {
    setSelectedUserId((prevUserId) => (prevUserId === userId ? null : userId));
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
            <th className="p-4 border-b border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {users.map((user) => (
            <tr
              key={user.id}
              className="text-[#101928] hover:bg-gray-50 relative"
            >
              <td className="p-4 border-b border-gray-200">
                <input type="checkbox" />
              </td>
              <td className="p-4 border-b border-gray-200">{user.id}</td>
              <td className="p-4 border-b border-gray-200">{user.name}</td>
              <td className="p-4 text-[#737373] text-[14px] border-b border-gray-200">
                {user.department}
              </td>
              <td className="p-4 border-b border-gray-200">{user.dateAdded}</td>
              <td className="p-4 border-b border-gray-200 text-center relative">
                <button
                  className="text-gray-600 hover:text-gray-800"
                  onClick={() => handleButtonClick(user.id)}
                >
                  ⋮
                </button>

                {selectedUserId === user.id && (
                  <div className="absolute left-0 mt-2 w-28 bg-white border border-gray-300 rounded shadow-lg z-10">
                    <ul className="text-left">
                      <Link to="/profile">
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          View
                        </li>
                      </Link>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Edit
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
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
        <span className="text-sm text-gray-600">Page 1 of 7</span>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm text-gray-500 border rounded-lg bg-gray-100 hover:bg-gray-200">
            Prev
          </button>
          <button className="px-3 py-1 text-sm border rounded-lg bg-gray-100 hover:bg-gray-200">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserList;
