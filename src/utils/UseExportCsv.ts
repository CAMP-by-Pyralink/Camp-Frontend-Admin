export const handleExport = (
  data: any[],
  format: "pdf" | "csv" | "xls",
  filename: string
) => {
  if (format === "pdf") {
    // Logic for exporting PDF
    console.log(`Exporting ${filename} as PDF`, data);
  } else if (format === "csv") {
    // Logic for exporting CSV
    console.log(`Exporting ${filename} as CSV`, data);
  } else if (format === "xls") {
    // Logic for exporting XLS
    console.log(`Exporting ${filename} as XLS`, data);
  }
};
