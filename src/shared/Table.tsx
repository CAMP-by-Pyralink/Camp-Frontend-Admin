import React from "react";

interface ColumnConfig<T> {
  key: keyof T;
  header: string;
  render?: (value: any) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: ColumnConfig<T>[];
  headerBgColor?: string;
  sectionName: string;
}

const Table = <T,>({
  data,
  columns,
  headerBgColor = "bg-[#F0F2F5]",
  sectionName,
}: TableProps<T>) => {
  return (
    <div className="overflow-x-auto bg-white  shadow-[5px_5px_40px_rgba(107,151,255,0.3)]  p-4 mb-6">
      <h3 className="text-lg font-semibold mb-4">{sectionName}</h3>
      <table className=" text-greyText w-full text-left border-separate border-spacing-0">
        <thead>
          <tr
            className={`${headerBgColor} text-[#344054] text-[12px] leading-3`}
          >
            {columns.map((column) => (
              <th key={String(column.key)} className=" p-4 border-b">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-100">
              {columns.map((column) => (
                <td key={String(column.key)} className=" px-4 py-8 border-b">
                  {column.render
                    ? column.render(row[column.key])
                    : (row[column.key] as React.ReactNode)}
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
