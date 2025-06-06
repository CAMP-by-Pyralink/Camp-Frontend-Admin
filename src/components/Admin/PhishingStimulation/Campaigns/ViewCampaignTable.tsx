import { useNavigate } from "react-router-dom";
import Table from "../../../../shared/Table";
import { useCampaignStore } from "../../../../store/useCampaignStore";
import { useState, useEffect } from "react";
import Loader from "../../../../shared/Loader";

interface RecipientData {
  _id: string;
  email: string;
  department: string;
  templateName: string;
  campaignName: string;
  status: string;
  sentStatus: string;
  opened: boolean;
  clicked: boolean;
  phished: boolean;
  scheduledTime: string;
  createdAt: string;
  fName: string;
  lName: string;
  companyName: string;
}

interface TableData {
  id: string;
  email: string;
  name: string;
  department: string;
  templateName: string;
  campaignName: string;
  status: string;
  sentStatus: string;
  date: string;
  opened: boolean;
  clicked: boolean;
  phished: boolean;
}

const ViewCampaignsTable = ({ singleCampaign, isLoading }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  if (isLoading) return <Loader />;

  // Transform backend data to table format
  const transformData = (): TableData[] => {
    if (!singleCampaign?.recipients) return [];

    return singleCampaign.recipients.map(
      (recipient: any): TableData => ({
        id: recipient._id,
        email: recipient.email,
        name: `${recipient.fName} ${recipient.lName}`.trim(),
        department: recipient.department || "N/A",
        templateName: singleCampaign.templateName || "N/A",
        campaignName: singleCampaign.campaignName || "N/A",
        status: recipient.status || "Unknown",
        sentStatus: recipient.sentStatus || "not-sent",
        opened: recipient.opened || false,
        clicked: recipient.clicked || false,
        phished: recipient.phished || false,
        date: formatDate(recipient.scheduledTime || recipient.createdAt),
      })
    );
  };

  // Format date helper
  const formatDate = (dateString: string): string => {
    if (!dateString) return "N/A";

    try {
      const date = new Date(dateString);
      return (
        date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }) +
        " " +
        date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    } catch (error) {
      return "Invalid Date";
    }
  };

  // Get status display text and color - Fixed to handle undefined recipient
  const getStatusDisplay = (recipient: TableData | undefined) => {
    // Add null check
    if (!recipient) {
      return { text: "Unknown", color: "bg-[#F1F5F9] text-[#475569]" };
    }

    if (recipient.phished)
      return { text: "Phished", color: "bg-[#FFE2E1] text-[#FF5756]" };
    if (recipient.status === "passed")
      return { text: "Passed", color: "bg-[#E3F9DB] text-[#2FB500]" };
    if (recipient.clicked)
      return { text: "Clicked", color: "bg-[#FFF4E6] text-[#FF8A00]" };
    if (recipient.opened)
      return { text: "Opened", color: "bg-[#F0F9FF] text-[#0EA5E9]" };
    if (recipient.sentStatus === "sent")
      return { text: "Sent", color: "bg-[#F8FAFC] text-[#64748B]" };
    return { text: "Not Sent", color: "bg-[#F1F5F9] text-[#475569]" };
  };

  const tableData = transformData();

  // Pagination logic
  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = tableData.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const assignedColumns = [
    {
      key: "email",
      header: "EMAIL",
    },
    {
      key: "name",
      header: "NAME",
    },
    {
      key: "department",
      header: "DEPARTMENT",
    },
    {
      key: "campaignName",
      header: "CAMPAIGN NAME",
    },
    {
      key: "templateName",
      header: "TEMPLATE NAME",
    },
    {
      key: "status",
      header: "STATUS",
      render: (value: string, row: TableData, index?: number) => {
        // Enhanced error handling - use row if available, otherwise create fallback
        const recipient =
          row ||
          ({
            phished: false,
            status: value || "Unknown",
            clicked: false,
            opened: false,
            sentStatus: "not-sent",
          } as TableData);

        const statusInfo = getStatusDisplay(recipient);
        return (
          <span
            className={`py-[2px] px-4 rounded-full text-[14px] ${statusInfo.color}`}
          >
            {statusInfo.text}
          </span>
        );
      },
    },
    {
      key: "sentStatus",
      header: "DELIVERY STATUS",
      render: (sentStatus: string, row?: TableData) => {
        // Handle undefined sentStatus
        const status = sentStatus || "not-sent";
        return (
          <span
            className={`py-[2px] px-4 rounded-full text-[14px] capitalize ${
              status === "sent"
                ? "bg-[#E3F9DB] text-[#2FB500]"
                : status === "failed"
                ? "bg-[#FFE2E1] text-[#FF5756]"
                : "bg-[#F1F5F9] text-[#475569]"
            }`}
          >
            {status.replace("-", " ")}
          </span>
        );
      },
    },
    {
      key: "date",
      header: "SCHEDULED DATE",
    },
  ];

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-lg text-gray-600">Loading campaign data...</div>
      </div>
    );
  }

  // No data state
  if (!singleCampaign?.recipients || singleCampaign.recipients.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-lg text-gray-600">
          No recipients found for this campaign.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <Table
          headerBgColor="white"
          data={currentData}
          columns={assignedColumns}
          // onRowClick={handleRowClick} // You can uncomment this if you need row click functionality
        />
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-[#070707]">
          Page {currentPage} of {totalPages} ({tableData.length} total
          recipients)
        </span>
        <div className="flex gap-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-[14px] py-2 text-sm border rounded-lg border-[#EAECF0] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] bg-white ${
              currentPage === 1
                ? "text-[#D0D5DD] cursor-not-allowed"
                : "text-[#070707] hover:bg-gray-50 cursor-pointer"
            }`}
          >
            Prev
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-[14px] py-2 text-sm border rounded-lg border-[#EAECF0] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] bg-white ${
              currentPage === totalPages
                ? "text-[#D0D5DD] cursor-not-allowed"
                : "text-[#070707] hover:bg-gray-50 cursor-pointer"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewCampaignsTable;
