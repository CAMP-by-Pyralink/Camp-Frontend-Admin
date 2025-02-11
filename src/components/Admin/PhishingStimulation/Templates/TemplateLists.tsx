import { useState, useEffect } from "react";
import {
  PhishingTemplate,
  usePhishingStore,
} from "../../../../store/usePhishingStore";
import closeIcon from "../../../../assets/svgs/close.svg";
import { Link } from "react-router-dom";

const TemplateLists: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<PhishingTemplate | null>(
    null
  );
  const { phishingTemplates, fetchPhishingTemplates } = usePhishingStore();
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

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {phishingTemplates.map(({ bannerImage, title, content }, index) => (
          <div
            key={index}
            className="bg-white border border-[#D3D3D3] p-3 rounded-lg flex flex-col gap-2 cursor-pointer"
            onClick={() => handleCardClick(index)}
          >
            <div className=" w-full h-[300px]">
              <img
                src={bannerImage}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-[#333333] font-medium text-xl">{title}</h1>
            <p className="text-[#333333] text-sm text-opacity-80">{content}</p>
          </div>
        ))}
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
      {isModalOpen && selectedCard && (
        <div
          className="fixed inset-0 bg-[#344054B2] bg-opacity-40 flex justify-center items-center "
          style={{ backdropFilter: "blur(7.06999969482422px)" }}
        >
          <div className="bg-white min-w-[494px] p-8 flex flex-col gap-8 rounded-md">
            <div className="flex justify-between">
              <h1 className="text-[#454545] text-xl font-bold">
                {selectedCard.title}
              </h1>
              <img
                src={closeIcon}
                alt="Close"
                aria-label="Close"
                onClick={handleCloseModal}
                className="cursor-pointer"
              />
            </div>
            <input
              type="text"
              placeholder="Create campaign name"
              className="border border-[#D0D5DD] p-4 rounded-md placeholder:text-[#454545]"
            />
            <Link
              to={`/phishing-details`}
              state={{
                title: selectedCard.title,
                img: selectedCard.bannerImage,
              }}
            >
              <button className="w-full bg-primary500 py-4 px-6 rounded-lg text-white">
                Next
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateLists;
