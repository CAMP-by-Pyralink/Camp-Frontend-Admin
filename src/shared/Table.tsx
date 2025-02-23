import React from "react";

interface ColumnConfig<T> {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T]) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: ColumnConfig<T>[];
  headerBgColor?: string;
  sectionName: string;
  onRowClick?: (row: T) => void;
}

const Table = <T,>({
  data,
  columns,
  headerBgColor = "bg-[#00000]",
  sectionName,
  onRowClick,
}: TableProps<T>) => {
  return (
    <div className="overflow-x-aut bg-white shadow-[5px_5px_40px_rgba(107,151,255,0.3)] roundd-lg rounded-t-xl mb-6">
      <h3 className="text-greyText mt-4 font-medium mb-4 ml-4">
        {sectionName}
      </h3>
      <table className="text-greyText w-full text-left border-separate border-spacing-0">
        <thead>
          <tr
            className={`${headerBgColor} text-[#344054] font-bold text-[12px] leading-3`}
          >
            {columns.map((column) => (
              <th key={String(column.key)} className="p-4 border-b">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="hover:bg-gray-200"
              onClick={() => onRowClick && onRowClick(row)}
            >
              {columns.map((column) => (
                <td key={String(column.key)} className="px-4 py-6 border-b">
                  {column.render
                    ? column.render(row[column.key])
                    : (row[column.key] as React.ReactNode)}{" "}
                  {/* Type assertion */}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
