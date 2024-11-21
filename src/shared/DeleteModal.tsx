import deleteIcon from "../assets/svgs/delete-icon.svg";
interface deleteModalProps {
  onDelete: () => void;
  backClick: () => void;
}
const DeleteModal: React.FC<deleteModalProps> = ({ onDelete, backClick }) => {
  return (
    <div className="bg-[#F7F9FC] w-fit px-12 py-6 rounded-lg shadow-lg relative flex flex-col items-center gap-8">
      <div className=" bg-[#FFECEC] p-[28px] rounded-full w-fit">
        <img src={deleteIcon} alt="" className=" w-[43px] h-[43px]" />
      </div>
      <h2 className=" text-xl text-[#454545] font-medium">
        Do you want to delete?
      </h2>
      <div className=" flex items-center gap-4">
        <button
          className=" bg-[#B30100] rounded-lg text-white py-2 px-4 w-[174px]"
          onClick={onDelete}
        >
          Yes, I do
        </button>
        <button
          className="border border-[#D0D5DD] rounded-lg text-[#344054] py-2 px-4 w-[174px]"
          onClick={backClick}
        >
          No, go back
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
