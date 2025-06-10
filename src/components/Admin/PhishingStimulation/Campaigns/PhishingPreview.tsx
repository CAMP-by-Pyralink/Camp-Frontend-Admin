import React from "react";
import { useNavigate } from "react-router-dom";
import { X, ArrowLeft, Eye, Shield, AlertTriangle } from "lucide-react";

const PhishingPreview = ({ templateData, handleCloseModal }: any) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleClose = () => {
    navigate(-1);
  };

  // Function to decode HTML entities and return safe HTML
  const decodeHtmlEntities = (str: any) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = str;
    return textarea.value;
  };

  // Function to create markup from decoded HTML
  const createMarkup = (htmlContent: any) => {
    const decodedContent = decodeHtmlEntities(htmlContent);
    return { __html: decodedContent };
  };

  console.log(templateData);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center h-screen z-50 p-4">
      {/* Header */}
      <div className="w-full max-w-4xl mb-4 flex justify-end items-center">
        <button
          onClick={handleCloseModal}
          className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Preview Container */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[85vh] flex overflow-hidden">
        {/* Right Content - Email Preview */}
        <div className="flex-1 flex flex-col">
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              Email Preview
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              How recipients will see this phishing simulation
            </p>
          </div>

          <div className="flex-1 overflow-auto">
            <div className="p-8">
              {/* Email Container */}
              <div className="max-w-2xl mx-auto">
                <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                  {/* Email Header */}
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h1 className="text-lg font-semibold text-gray-800 mt-3">
                      {templateData.templateName}
                    </h1>
                  </div>

                  {/* Email Body */}
                  <div className="p-6">
                    {templateData.templateImage && (
                      <div className="mb-6">
                        <img
                          src={templateData.templateImage}
                          alt="Email content"
                          className="w-full max-w-md mx-auto rounded-lg shadow-sm"
                        />
                      </div>
                    )}

                    <div
                      className="prose prose-sm max-w-none email-content"
                      dangerouslySetInnerHTML={createMarkup(
                        templateData.templateContent
                      )}
                      style={{
                        lineHeight: "1.6",
                        color: "#374151",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .email-content p {
          margin-bottom: 1rem;
        }
        .email-content a {
          display: inline-block;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
          text-align: center;
          margin: 8px 0;
        }
        .email-content .ql-align-center {
          text-align: center;
        }
        .email-content strong {
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default PhishingPreview;
