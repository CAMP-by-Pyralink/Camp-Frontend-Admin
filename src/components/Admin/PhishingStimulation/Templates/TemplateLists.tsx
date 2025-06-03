import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  PhishingTemplate,
  usePhishingStore,
} from "../../../../store/usePhishingStore";
import { MoreVertical } from "lucide-react";
import toast from "react-hot-toast";
import DOMPurify from "dompurify";
import he from "he";
import AddTemplateModal from "./AddtemplateModal";
import closeIcon from "../../../../assets/svgs/closeicongrey.svg";
import Button from "../../../../shared/Button";

const TemplateLists: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [templateClicked, setTemplateClicked] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<PhishingTemplate | null>(
    null
  );
  const [optionsIndex, setOptionsIndex] = useState<number | null>(null);
  const [campaignName, setCampaignName] = useState<string>("");

  const { phishingTemplates, fetchPhishingTemplates, deletePhishingTemplate } =
    usePhishingStore();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetchPhishingTemplates(page);
  }, [page, fetchPhishingTemplates]);

  const handleCardClick = (index: number) => {
    const template = phishingTemplates[index];
    setSelectedCard(template);
    setTemplateClicked(true);
    setCampaignName(""); // Reset campaign name
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  const handleCloseTemplateModal = () => {
    setTemplateClicked(false);
    setSelectedCard(null);
    setCampaignName("");
  };

  const handleOptionsClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation(); // Prevent card click event from firing
    setSelectedCard(phishingTemplates[index]);
    setOptionsIndex(optionsIndex === index ? null : index);
  };

  const handleCloseOptionsModal = () => {
    setOptionsIndex(null);
    setSelectedCard(null);
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const response = await deletePhishingTemplate(id);
    if (response && response.status === 200) {
      toast.success("Template deleted successfully!");
      fetchPhishingTemplates(page);
      handleCloseOptionsModal();
    }
    setOptionsIndex(null);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOptionsIndex(null);
    setIsModalOpen(true);
  };

  const handleNext = () => {
    if (!selectedCard || !campaignName.trim()) {
      toast.error("Please enter a campaign name");
      return;
    }

    // Navigate to phishing details page with template data
    navigate(`/phishing-details/${selectedCard._id}`, {
      state: {
        templateId: selectedCard._id,
        templateName: selectedCard.title,
        campaignName: campaignName.trim(),
        templateData: selectedCard,
      },
    });
  };

  // Utility to strip HTML tags and slice text
  const getSlicedContent = (html: string, maxLength = 200) => {
    const decoded = he.decode(html);
    const clean = DOMPurify.sanitize(decoded, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
    });
    return clean.length > maxLength ? clean.slice(0, maxLength) + "..." : clean;
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {phishingTemplates.map(
          ({ _id, bannerImage, title, content }, index) => (
            <div
              key={_id || index}
              className="bg-white border border-[#D3D3D3] p-3 rounded-lg flex flex-col gap-2 cursor-pointer relative"
              onClick={() => handleCardClick(index)}
            >
              <div className="absolute top-2 right-2"></div>
              <div className="w-full h-[300px]">
                <img
                  src={bannerImage}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-between">
                <h1 className="text-[#333333] font-medium text-xl">{title}</h1>
                <div
                  className="hover:text-gray-700 relative"
                  onClick={(e) => handleOptionsClick(e, index)}
                >
                  <MoreVertical className="size-6" />
                  {optionsIndex === index && (
                    <div className="absolute top-8 right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      <button
                        className="w-full text-left px-4 py-2 border-b text-textColor hover:bg-blue50"
                        onClick={(e) => handleEdit(e)}
                      >
                        Edit
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 text-textColor hover:bg-blue50"
                        onClick={(e) => handleDelete(e, _id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-[#333333] text-sm text-opacity-80">
                {getSlicedContent(content, 100)}
              </div>
            </div>
          )
        )}
      </div>

      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-[#070707]">Page {page}</span>
        <div className="flex gap-2">
          <button
            className="px-[14px] py-2 text-sm text-[#D0D5DD] border rounded-lg border-[#EAECF0] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] bg-white"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          <button
            className="px-[14px] py-2 text-sm border rounded-lg border-[#EAECF0] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] bg-white"
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {isModalOpen && (
        <AddTemplateModal
          onClose={handleCloseModal}
          templateToEdit={selectedCard}
        />
      )}

      {templateClicked && selectedCard && (
        <div className="fixed inset-0 bg-[#344054B2] bg-opacity-40 flex justify-center items-center h-screen z-50">
          <div className="px-8 py-6 bg-white rounded-lg shadow-lg w-full max-w-md space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#454545]">
                {selectedCard.title}
              </h2>
              <img
                src={closeIcon}
                alt="Close"
                className="cursor-pointer"
                onClick={handleCloseTemplateModal}
              />
            </div>
            <div>
              <input
                className="w-full border border-[#D0D5DD] rounded p-4 text-[#454545]"
                placeholder="Enter campaign name"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
              />
            </div>
            <Button label="Next" width="w-full" onClick={handleNext} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateLists;
