import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import editIcon from "../../../../assets/svgs/edit-icon.svg";
import { useCampaignStore } from "../../../../store/useCampaignStore";
import PhishingPreview from "../Campaigns/PhishingPreview";

interface User {
  _id: string;
  fName: string;
  lName: string;
  email: string;
  department: string;
  profileImage?: string;
}

interface PreviewModalProps {
  campaignData?: {
    campaignName: string;
    selectedTarget: string;
    selectedDepartments: string[];
    selectedEmployees: User[];
    selectedDates: Date[];
    startTime: string;
    endTime: string;
    selectedTimezone: string;
    isToggled: boolean;
    frequency?: string;
    startDate?: Date;
    deliveryPeriod?: string;
    users?: User[];
  };
  templateData?: {
    templateName: string;
    templateImage: string;
    templateId: string;
  };
}

const PreviewModal: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const { createCampaign, sendTestMail } = useCampaignStore();
  const [isLoading, setIsLoading] = useState(false);

  const { campaignData, templateData } = location.state || {};

  if (!campaignData || !templateData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-600 mb-4">
            No campaign data available
          </h2>
          <Link
            to="/phishing-simulation/campaigns"
            className="text-primary500 underline"
          >
            Go back to campaigns
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour24 = parseInt(hours);
    const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
    const period = hour24 >= 12 ? "PM" : "AM";
    return `${hour12}:${minutes}${period}`;
  };

  const getRecipientInfo = () => {
    switch (campaignData.selectedTarget) {
      case "all":
        return {
          count: campaignData.users?.length || 0,
          type: "all employees",
          details: [],
        };
      case "department":
        const deptEmployeeCount =
          campaignData.users?.filter((user: any) =>
            campaignData.selectedDepartments.includes(user.department)
          ).length || 0;
        return {
          count: deptEmployeeCount,
          type: "department",
          details: campaignData.selectedDepartments.map((dept: any) => {
            const count =
              campaignData.users?.filter(
                (user: any) => user.department === dept
              ).length || 0;
            return { name: dept, count };
          }),
        };
      case "employee":
        return {
          count: campaignData.selectedEmployees.length,
          type: "specific employees",
          details: campaignData.selectedEmployees.map((emp: any) => ({
            name: `${emp.fName} ${emp.lName}`,
            email: emp.email,
          })),
        };
      default:
        return { count: 0, type: "none", details: [] };
    }
  };

  const getNextCampaignDate = () => {
    if (!campaignData.isToggled || !campaignData.startDate) return null;

    const nextDate = new Date(campaignData.startDate);
    switch (campaignData.frequency) {
      case "Daily":
        nextDate.setDate(nextDate.getDate() + 1);
        break;
      case "Weekly":
        nextDate.setDate(nextDate.getDate() + 7);
        break;
      case "Monthly":
        nextDate.setMonth(nextDate.getMonth() + 1);
        break;
      case "Quarterly":
        nextDate.setMonth(nextDate.getMonth() + 3);
        break;
    }
    return nextDate;
  };

  const getDeliveryPeriod = () => {
    if (!campaignData.selectedDates || campaignData.selectedDates.length === 0)
      return "0 days";

    const dates = campaignData.selectedDates.map((d: any) => new Date(d));
    const minDate = new Date(Math.min(...dates.map((d: any) => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map((d: any) => d.getTime())));

    const diffTime = Math.abs(maxDate.getTime() - minDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    return `${diffDays} day${diffDays !== 1 ? "s" : ""}`;
  };

  const getStartDate = () => {
    if (!campaignData.selectedDates || campaignData.selectedDates.length === 0)
      return new Date();

    const dates = campaignData.selectedDates.map((d: any) => new Date(d));
    const minDate = new Date(Math.min(...dates.map((d: any) => d.getTime())));
    return minDate;
  };

  const recipientInfo = getRecipientInfo();
  const nextCampaignDate = getNextCampaignDate();
  const deliveryPeriod = campaignData.isToggled
    ? campaignData.deliveryPeriod
    : getDeliveryPeriod();
  const startDate = campaignData.isToggled
    ? campaignData.startDate
    : getStartDate();

  const handleEdit = (section: string) => {
    navigate(-1, {
      state: {
        editMode: true,
        editSection: section,
        campaignData,
        templateData,
      },
    });
  };

  const handleCreateCampaign = async () => {
    setIsLoading(true);
    try {
      const campaignTo =
        campaignData.selectedTarget === "employee" ? "user" : "department";

      const getCampaignTargetIds = () => {
        switch (campaignData.selectedTarget) {
          case "all":
            return campaignData.users?.map((user: any) => user._id) || [];
          case "department":
            return campaignData.selectedDepartments;
          case "employee":
            return campaignData.selectedEmployees.map(
              (employee: any) => employee._id
            );
          default:
            return [];
        }
      };

      const campaignPayload = {
        campaignName: campaignData.campaignName,
        campaignTo,
        campaignToId: getCampaignTargetIds(),
        dates: campaignData.selectedDates.map((date: any) =>
          date instanceof Date ? date.toISOString().split("T")[0] : date
        ),
        startTime: campaignData.startTime,
        endTime: campaignData.endTime,
        timeZone: campaignData.selectedTimezone,
      };

      const result = await createCampaign(
        campaignPayload,
        templateData.templateId
      );
      if (result) {
        navigate("/phishing-simulation/campaigns");
      }
    } catch (error) {
      console.error("Error creating campaign:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendTestMail = async () => {
    await sendTestMail(templateData.templateId);
  };

  const handleCloseModal = () => {
    setShowPreviewModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-primary500 text-sm font-semibold cursor-pointer">
            <span onClick={() => navigate(-2)}> Phishing </span>
            <span className="" onClick={() => navigate(-1)}>
              / Select target
            </span>
            <span className="text-neutrals500">/ Preview & Apply</span>
          </h1>
        </div>

        <div className="overflow-hidden">
          <div className="">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-[#333333]">
                Preview & Apply
              </h2>
            </div>
          </div>

          <div className="p-8 space-y-8">
            <div>
              <label className="block text-[#333333] font-medium mb-3">
                Campaign name
              </label>
              <input
                type="text"
                value={campaignData.campaignName}
                className="p-4 border border-[#D0D5DD] w-full rounded-md text-sm bg-gray-50"
                readOnly
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[#454545] text-xl font-semibold">
                  Delivery type:{" "}
                  <span className="font-normal">
                    ({campaignData.isToggled ? "recurring" : "one-time"})
                  </span>
                </h3>
                <button
                  onClick={() => handleEdit("delivery")}
                  className="flex items-center gap-2 text-primary500 hover:text-primary600 transition-colors"
                >
                  <span>Edit</span>
                  <img src={editIcon} alt="Edit" className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <div>
                  <h4 className="font-semibold text-[#454545]">
                    Start date:{" "}
                    <span className="font-normal">
                      {formatDate(startDate as Date)}
                    </span>
                  </h4>
                </div>

                <div>
                  <h4 className="font-semibold text-[#454545]">
                    Delivery period:{" "}
                    <span className="font-normal">{deliveryPeriod}</span>
                  </h4>
                </div>

                {campaignData.isToggled && nextCampaignDate && (
                  <div>
                    <h4 className="font-semibold text-[#454545]">
                      Next campaign:{" "}
                      <span className="font-normal">
                        {formatDate(nextCampaignDate)}
                      </span>
                    </h4>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold text-[#454545]">
                    Recipients:{" "}
                    <span className="font-normal">
                      {recipientInfo.count} {recipientInfo.type}
                    </span>
                  </h4>
                </div>

                <div>
                  <h4 className="font-semibold text-[#454545]">
                    Delivery time:{" "}
                    <span className="font-normal">
                      {formatTime(campaignData.startTime)} to{" "}
                      {formatTime(campaignData.endTime)} (
                      {campaignData.selectedTimezone})
                    </span>
                  </h4>
                </div>

                {campaignData.isToggled && (
                  <>
                    <div>
                      <h4 className="font-semibold text-[#454545]">
                        Frequency:{" "}
                        <span className="font-normal">
                          {campaignData.frequency}
                        </span>
                      </h4>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[#454545] text-xl font-semibold">
                  Recipients{" "}
                  <span className="font-normal">({recipientInfo.type})</span>
                </h3>
                <button
                  onClick={() => handleEdit("recipients")}
                  className="flex items-center gap-2 text-primary500 hover:text-primary600 transition-colors"
                >
                  <span>Edit</span>
                  <img src={editIcon} alt="Edit" className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex flex-wrap gap-3">
                  {campaignData.selectedTarget === "all" && (
                    <div className="bg-blue-100 border border-blue-200 py-2 px-4 rounded-lg text-[#454545] text-sm">
                      All Employees ({recipientInfo.count})
                    </div>
                  )}

                  {campaignData.selectedTarget === "department" &&
                    recipientInfo.details.map((dept: any, index: any) => (
                      <div
                        key={index}
                        className="bg-blue-100 border border-blue-200 py-2 px-4 rounded-lg text-[#454545] text-sm"
                      >
                        {dept.name} ({dept.count})
                      </div>
                    ))}

                  {campaignData.selectedTarget === "employee" &&
                    recipientInfo.details.map((emp: any, index: any) => (
                      <div
                        key={index}
                        className="bg-blue-100 border border-blue-200 py-2 px-4 rounded-lg text-[#454545] text-sm"
                      >
                        {emp.name}
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[#454545] text-xl font-semibold">
                  Template
                </h3>
                <button
                  onClick={() => handleEdit("template")}
                  className="flex items-center gap-2 text-primary500 hover:text-primary600 transition-colors"
                >
                  <span>Edit</span>
                  <img src={editIcon} alt="Edit" className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex gap-4 items-center mb-6">
                  <div className="w-20 h-12 bg-gray-200 rounded overflow-hidden">
                    <img
                      src={templateData.templateImage}
                      alt={templateData.templateName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-[#454545] font-semibold text-lg">
                    {templateData.templateName}
                  </h4>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-6 border-t">
              <button
                onClick={handleCreateCampaign}
                disabled={isLoading}
                className={`py-3 px-6 font-medium rounded-lg transition-colors ${
                  isLoading
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-primary500 text-white hover:bg-primary600"
                }`}
              >
                {isLoading ? "Starting Campaign..." : "Start campaign"}
              </button>
              <button
                className="font-medium py-3 px-6 text-primary500 border border-primary500 rounded-lg hover:bg-primary50 transition-colors"
                onClick={handleSendTestMail}
              >
                Send test email
              </button>
              {/* <Link to="/phishing-simulation/preview"> */}
              <button
                className="font-medium py-3 px-6 text-primary500 underline hover:text-primary600 transition-colors"
                onClick={() => setShowPreviewModal(true)}
              >
                Preview Template
              </button>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </div>

      {showPreviewModal && (
        <PhishingPreview
          templateData={templateData}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default PreviewModal;
