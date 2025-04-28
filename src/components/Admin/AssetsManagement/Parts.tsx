import React from "react";

// Define TypeScript interface for a part
interface Part {
  id: number;
  name: string;
  number: string;
  amount: number;
  quantity: number;
  manufacturer: string;
}

// Sample data for parts
const parts: Part[] = [
  {
    id: 1,
    name: "256GB SSD",
    number: "348-55",
    amount: 2000,
    quantity: 2,
    manufacturer: "SANDISK",
  },
  {
    id: 2,
    name: "512GB SSD",
    number: "349-66",
    amount: 4000,
    quantity: 1,
    manufacturer: "SAMSUNG",
  },
];

// Table header as a separate component
const TableHeader: React.FC = () => (
  <thead>
    <tr className=" text-left text-greyText text-xs font-bold">
      {[
        "PART NAME",
        "PART NUMBER",
        "AMOUNT(S)",
        "QUANTITY",
        "MANUFACTURER",
      ].map((header) => (
        <th
          key={header}
          className="p-3 border-b font-bold border-[#E4E7EC] uppercase text-xs"
        >
          {header}
        </th>
      ))}
    </tr>
  </thead>
);

// Table row for individual part
const TableRow: React.FC<{ part: Part }> = ({ part, singleAsset }: any) => (
  <tr className="text-gray-800 text-sm py-4">
    <td className="p-3 py-4 border-b border-[#E4E7EC]">{part.name}</td>
    <td className="p-3 border-b border-[#E4E7EC]">{part.number}</td>
    <td className="p-3 border-b border-[#E4E7EC]">{`${part.amount.toLocaleString()}`}</td>
    <td className="p-3 border-b border-[#E4E7EC]">{part.quantity}</td>
    <td className="p-3 border-b border-[#E4E7EC]">{part.manufacturer}</td>
  </tr>
);

// Main Parts component
const Parts: React.FC = ({ singleAsset }: any) => {
  return (
    <div className="p-4 ">
      <h1 className=" my-4">
        This shows a list of all items (spare parts and other items) that are
        used on an asset during its whole lifetime:
      </h1>
      <div className=" flex justify-end">
        <button className="  bg-primary500 text-sm px-12 py-[10px] rounded text-white mb-4 ">
          Add new
        </button>
      </div>
      <table className="w-full border-collapse border border-[#E4E7EC] bg-white">
        <TableHeader />
        <tbody className="">
          {parts.map((part) => (
            <TableRow key={part.id} part={part} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Parts;
