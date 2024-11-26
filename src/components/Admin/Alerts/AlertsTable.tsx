import React, { useState } from "react";
import { MoreVertical, AlertCircle } from "lucide-react";
import ModalLayout from "../../../shared/ModalLayout";
import DeleteModal from "../../../shared/DeleteModal";

interface Alert {
  id: string;
  message: string;
  timestamp: string;
  severity: "Critical" | "Moderate" | "Low";
}

interface SeverityFilter {
  label: string;
  count: number;
}

const AlertsTable: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("1");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("All");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleBackClick = () => {
    setDeleteModal(false);
  };
  const handleDeleteClick = () => {
    console.log("clicked");
    setDeleteModal(false);
  };

  // Dummy data for different tabs
  const dummyAlerts: Record<string, Alert[]> = {
    "1": [
      // All
      {
        id: "1",
        message:
          "Adobe suite subscription will be expiring on 12th of December, 2024",
        timestamp: "Just now",
        severity: "Critical",
      },
      {
        id: "2",
        message: "Server maintenance required for Database cluster",
        timestamp: "5 mins ago",
        severity: "Moderate",
      },
      {
        id: "3",
        message: "System backup completed successfully",
        timestamp: "10 mins ago",
        severity: "Low",
      },
      {
        id: "4",
        message: "High CPU usage detected on production server",
        timestamp: "15 mins ago",
        severity: "Critical",
      },
      {
        id: "5",
        message: "New security patch available for installation",
        timestamp: "20 mins ago",
        severity: "Moderate",
      },
    ],
    "2": [
      // Warranty
      {
        id: "1",
        message: "Hardware warranty expiring in 30 days - Server Rack A",
        timestamp: "2 hours ago",
        severity: "Critical",
      },
      {
        id: "2",
        message: "Printer maintenance warranty renewal required",
        timestamp: "3 hours ago",
        severity: "Moderate",
      },
      {
        id: "3",
        message: "Network switch warranty status updated",
        timestamp: "4 hours ago",
        severity: "Low",
      },
    ],
    "3": [
      // Parts/Boms
      {
        id: "1",
        message: "Low inventory alert: RAM modules",
        timestamp: "1 day ago",
        severity: "Critical",
      },
      {
        id: "2",
        message: "New shipment arrived: Storage drives",
        timestamp: "2 days ago",
        severity: "Moderate",
      },
      {
        id: "3",
        message: "Parts request approved: Cooling fans",
        timestamp: "3 days ago",
        severity: "Low",
      },
    ],
    "4": [
      // Log
      {
        id: "1",
        message: "Critical error in application log",
        timestamp: "1 hour ago",
        severity: "Critical",
      },
      {
        id: "2",
        message: "Multiple failed login attempts detected",
        timestamp: "2 hours ago",
        severity: "Moderate",
      },
      {
        id: "3",
        message: "System performance log updated",
        timestamp: "3 hours ago",
        severity: "Low",
      },
    ],
  };

  const severityFilters: SeverityFilter[] = [
    { label: "All", count: 100 },
    { label: "Critical", count: 15 },
    { label: "Moderate", count: 60 },
    { label: "Low", count: 25 },
  ];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleButtonClick = (userId: string) => {
    setSelectedUserId((prevUserId) => (prevUserId === userId ? null : userId));
  };

  const filteredAlerts = dummyAlerts[activeTab].filter(
    (alert) => selectedSeverity === "All" || alert.severity === selectedSeverity
  );
  const handleDeleteListClick = () => {
    setDeleteModal((prev) => !prev);
    setDeleteModal(false);
  };

  return (
    <div className="bg-white p-8">
      {/* Severity Filters */}
      <div className="flex gap-4 mb-6">
        {severityFilters.map((filter) => (
          <button
            key={filter.label}
            onClick={() => setSelectedSeverity(filter.label)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md border ${
              selectedSeverity === filter.label
                ? "bg-primary100 border-[#282EFF] text-primary500"
                : "border-[#D0D5DD] hover:bg-gray-50"
            }`}
          >
            {filter.label === "All" ? (
              <span className="flex items-center justify-center">
                <AlertCircle className=" text-[#98A2B3] w-4 h-4" />
              </span>
            ) : (
              <AlertCircle
                className={`w-4 h-4 ${
                  filter.label === "Critical"
                    ? "text-red-500"
                    : filter.label === "Moderate"
                    ? "text-yellow-500"
                    : "text-blue-500"
                }`}
              />
            )}
            <span>{filter.label}</span>
            <span
              className={`ml-2 font-medium px-3 rounded-full text-xs ${
                selectedSeverity === filter.label
                  ? " bg-primary500 text-white"
                  : "bg-[#E4E7EC] text-[#344054] "
              }`}
            >
              {filter.count}
            </span>
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="space-y-2">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-center justify-between p-4 border-b border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <AlertCircle
                className={`w-5 h-5 ${
                  alert.severity === "Critical"
                    ? "text-red-500"
                    : alert.severity === "Moderate"
                    ? "text-yellow-500"
                    : "text-blue-500"
                }`}
              />
              <span className=" text-xs">{alert.message}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[8px] text-[#555555]">
                {alert.timestamp}
              </span>
              <div className=" relative">
                <button
                  className="relative border w-8 h-8 border-[#E4E7EC] rounded-lg flex items-center justify-center"
                  onClick={() => handleButtonClick(alert.id)}
                >
                  <MoreVertical className="w-4 h-4 text-sm text-black" />
                </button>
                {selectedUserId === alert.id && (
                  <div className="absolute left-0 mt-2 w-[89px]  bg-white border border-[#C7C7CC] rounded-md p-2  shadow-[5px_5px_40px_rgba(107,151,255,0.3)] z-10">
                    <h1
                      onClick={() => {
                        {
                          setDeleteModal((prev) => !prev);
                        }
                      }}
                    >
                      Delete
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {deleteModal && (
        <ModalLayout>
          <DeleteModal
            backClick={handleBackClick}
            onDelete={handleDeleteClick}
          />
        </ModalLayout>
      )}
    </div>
  );
};

export default AlertsTable;
