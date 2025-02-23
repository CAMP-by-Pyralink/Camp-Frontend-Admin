import { useState, useEffect } from "react";
import {
  PhishingTemplate,
  usePhishingStore,
} from "../../../../store/usePhishingStore";
import { MoreVertical } from "lucide-react";
import toast from "react-hot-toast";
import DOMPurify from "dompurify";
import he from "he";
import AddTemplateModal from "./AddtemplateModal";
// import AddTemplateModal from "./AddTemplateModal";

const TemplateLists: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<PhishingTemplate | null>(
    null
  );
  const [optionsIndex, setOptionsIndex] = useState<number | null>(null);
  const { phishingTemplates, fetchPhishingTemplates, deletePhishingTemplate } =
    usePhishingStore();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetchPhishingTemplates(page);
  }, [page, fetchPhishingTemplates]);

  const handleCardClick = (index: number) => {
    setSelectedCard(phishingTemplates[index]);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  const handleOptionsClick = (index: number) => {
    setSelectedCard(phishingTemplates[index]);
    setOptionsIndex(optionsIndex === index ? null : index);
  };

  const handleCloseOptionsModal = () => {
    setOptionsIndex(null);
    setSelectedCard(null);
  };

  const handleDelete = async (id: string) => {
    const response = await deletePhishingTemplate(id);
    if (response && response.status === 200) {
      // toast.success("Template deleted successfully!");
      fetchPhishingTemplates(page);
      handleCloseOptionsModal();
    }
    setOptionsIndex(null); // Hide the options menu
  };

  const handleEdit = () => {
    setOptionsIndex(null); // Hide the options menu
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {phishingTemplates.map(
          ({ _id, bannerImage, title, content }, index) => (
            <div
              key={index}
              className="bg-white border border-[#D3D3D3] p-3 rounded-lg flex flex-col gap-2 cursor-pointer relative"
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
                  onClick={() => handleOptionsClick(index)}
                >
                  <MoreVertical className="size-6" />
                  {optionsIndex === index && (
                    <div className="absolute top-8 right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      <button
                        className="w-full text-left px-4 py-2 border-b text-textColor hover:bg-blue50"
                        onClick={handleEdit}
                      >
                        Edit
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 text-textColor hover:bg-blue50"
                        onClick={() => handleDelete(_id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div
                className="prose prose-blue prose-xl prose-headings:underline prose-a:text-[#0007FC] prose-headings:text-[2rem] text-[#333333] text-sm text-opacity-80"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(he.decode(content)),
                }}
              />
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
    </div>
  );
};

export default TemplateLists;
