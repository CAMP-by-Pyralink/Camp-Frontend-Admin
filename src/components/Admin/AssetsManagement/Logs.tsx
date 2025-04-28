import React from "react";

// Define interface for logs
interface Log {
  _id: string;
  action: string;
  performedBy: {
    _id: string;
    email: string;
    fName: string;
    lName: string;
    profileImage: string;
  };
  description: string;
  changes: any;
  assetId: string;
  timestamp: string;
  createdAt: string;
  updatedAt: string;
}

interface AssetProps {
  singleAsset:
    | {
        _id: string;
        assetName: string;
        logs: Log[];
        // other properties
      }
    | null
    | any;
}

// Table header as a separate component
const TableHeader: React.FC = () => (
  <thead>
    <tr className="text-left text-greyText text-xs font-bold">
      {["DATE", "ACTIVITY TYPE", "USER", "DESCRIPTION"].map((header) => (
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

// Format date helper function
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Table row for individual log
const TableRow: React.FC<{ log: Log }> = ({ log }) => (
  <tr className="text-gray-800 text-sm py-4">
    <td className="p-3 py-4 border-b border-[#E4E7EC]">
      {formatDate(log.timestamp)}
    </td>
    <td className="p-3 border-b border-[#E4E7EC]">{log.action}</td>
    <td className="p-3 border-b border-[#E4E7EC]">
      {`${log.performedBy.fName} ${log.performedBy.lName}`}
    </td>
    <td className="p-3 border-b border-[#E4E7EC]">{log.description}</td>
  </tr>
);

const Logs: React.FC<AssetProps> = ({ singleAsset }: any) => {
  return (
    <div className="p-4">
      <h1 className="my-4 text-lg font-medium">Asset Activity Logs</h1>
      {/* <div className="flex justify-end">
        <button className="bg-primary500 text-sm px-12 py-2 rounded text-white mb-4">
          Add Entry
        </button>
      </div> */}
      <table className="w-full border-collapse border border-[#E4E7EC] bg-white">
        <TableHeader />
        <tbody className="">
          {singleAsset.logs && singleAsset.logs.length > 0 ? (
            singleAsset.logs.map((log: Log) => (
              <TableRow key={log._id} log={log} />
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-4 text-center text-gray-500">
                No logs available for this asset
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Logs;
