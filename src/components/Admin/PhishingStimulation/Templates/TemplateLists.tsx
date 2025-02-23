import { useState, useEffect } from "react";
import {
  PhishingTemplate,
  usePhishingStore,
} from "../../../../store/usePhishingStore";
import closeIcon from "../../../../assets/svgs/close.svg";
import { Link } from "react-router-dom";
import he from "he";
import { X, Edit, Trash, MoreVertical } from "lucide-react";
import toast from "react-hot-toast";
import AddTemplateModal from "./AddTemplateModal";

const TemplateLists: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<PhishingTemplate | null>(
    null
  );
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
    setIsOptionsModalOpen(true);
  };

  const handleCloseOptionsModal = () => {
    setIsOptionsModalOpen(false);
    setSelectedCard(null);
  };

  const handleDelete = async (id: string) => {
    const response = await deletePhishingTemplate(id);
    if (response && response.status === 200) {
      toast.success("Template deleted successfully!");
      fetchPhishingTemplates(page);
      handleCloseOptionsModal();
    } else {
      toast.error("Failed to delete template.");
    }
  };

  const handleEdit = () => {
    setIsOptionsModalOpen(false);
    setIsModalOpen(true);
    console.log(selectedCard, "Sss");
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
              <div className=" w-full h-[300px]">
                <img
                  src={bannerImage}
                  alt={title}
                  className="w-full h-full object-cover "
                />
              </div>
              {/*  */}
              <div className=" flex justify-between">
                <h1 className="text-[#333333] font-medium text-xl">{title}</h1>
                <button
                  className=" hover:text-gray-700"
                  onClick={() => handleOptionsClick(index)}
                >
                  <MoreVertical className=" size-6" />
                </button>
              </div>

              <div
                className="prose prose-blue prose-xl prose-headings:underline prose-a:text-[#0007FC] prose-headings:text-[2rem] text-[#333333] text-sm text-opacity-80"
                dangerouslySetInnerHTML={{ __html: he.decode(content) }}
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
      {isOptionsModalOpen && selectedCard && (
        <div
          className="fixed inset-0 bg-[#344054B2] bg-opacity-40 flex justify-center items-center "
          style={{ backdropFilter: "blur(7.06999969482422px)" }}
        >
          <div className="bg-white min-w-[300px] p-8 flex flex-col gap-4 rounded-md">
            <div className="flex justify-between">
              <h1 className="text-[#454545] text-xl font-bold">Options</h1>
              <img
                src={closeIcon}
                alt="Close"
                aria-label="Close"
                onClick={handleCloseOptionsModal}
                className="cursor-pointer"
              />
            </div>
            <button
              className="w-full bg-blue-600 text-white py-2 rounded-md text-lg font-semibold hover:bg-blue-700 transition-all duration-300"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              className="w-full bg-red-600 text-white py-2 rounded-md text-lg font-semibold hover:bg-red-700 transition-all duration-300"
              onClick={() => handleDelete(selectedCard._id)}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateLists;
