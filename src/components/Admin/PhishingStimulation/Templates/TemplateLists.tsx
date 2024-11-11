import { useState } from "react";
import cardImgOne from "../../../../assets/Happybirthday.png";
import cardImgTwo from "../../../../assets/email.png";
import cardImgThree from "../../../../assets/fake-invoice.png";
import cardImgFour from "../../../../assets/password-expiration.png";
import closeIcon from "../../../../assets/svgs/close.svg";
import { Link } from "react-router-dom";

interface SimulationCard {
  img: string;
  title: string;
  description: string;
  id: number;
}

const TemplateLists: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<SimulationCard | null>(null);

  const simulationsCards: SimulationCard[] = [
    {
      id: 1,
      img: cardImgOne,
      title: "Happy Birthday!",
      description:
        "The phishing email mimics a notification from a bank, warning of suspicious activity on the recipient’s account.",
    },
    {
      id: 2,
      img: cardImgTwo,
      title: "Email Account Suspension Alert",
      description:
        "This phishing email pretends to be from a well-known email service provider (e.g., Gmail, Outlook) warning the recipient.",
    },
    {
      id: 3,
      img: cardImgThree,
      title: "Fake Invoice",
      description:
        "This phishing template impersonates a vendor or service provider and notifies the recipient that an invoice is overdue.",
    },
    {
      id: 4,
      img: cardImgFour,
      title: "Password Expiration Notice",
      description:
        "This phishing email poses as an internal IT department alert, warning employees that their work password will expire soon.",
    },
  ];

  const handleCardClick = (index: number) => {
    setSelectedCard(simulationsCards[index]);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {simulationsCards.map(({ img, title, description }, index) => (
          <div
            key={index}
            className="bg-white border border-[#D3D3D3] p-3 rounded-lg flex flex-col gap-2 cursor-pointer"
            onClick={() => handleCardClick(index)}
          >
            <img src={img} alt={title} className="w-full" />
            <h1 className="text-[#333333] font-medium text-xl">{title}</h1>
            <p className="text-[#333333] text-sm text-opacity-80">
              {description}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-[#070707]">Page 1 of 7</span>
        <div className="flex gap-2">
          <button className="px-[14px] py-2 text-sm text-[#D0D5DD] border rounded-lg border-[#EAECF0] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] bg-white">
            Prev
          </button>
          <button className="px-[14px] py-2 text-sm border rounded-lg border-[#EAECF0] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] bg-white">
            Next
          </button>
        </div>
      </div>
      {isModalOpen && selectedCard && (
        <div
          className="fixed inset-0 bg-[#344054B2] bg-opacity-40 flex justify-center items-center max-h-[764px]"
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
                img: selectedCard.img,
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
