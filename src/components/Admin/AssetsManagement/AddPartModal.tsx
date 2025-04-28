import { X } from "lucide-react";
import React from "react";
import InfoRow from "./InfoRow";

interface AddPartModalProps {
  onClose: () => void;
}

const AddPartModal: React.FC<AddPartModalProps> = ({ onClose }) => {
  return (
    <div
      className=" fixed inset-0 bg-[#344054B2] bg-opacity-40 flex justify-center items-center h-screen "
      style={{ backdropFilter: "blur(7.06999969482422px)" }}
    >
      <div className="bg-white w-[700px] px-8 py-6 rounded-lg shadow-lg relative">
        <div className=" flex items-center justify-between bg-[DEEFFC]">
          <h2 className="text-lg font-semibold mb-4">Add Part/Boms</h2>
          <X
            className="absolute right-6 top-6 cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={onClose}
          />
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 w-full">
          <InfoRow label="Part Name" value="" />
          <InfoRow label="Part Number" value="" />
          <InfoRow label="Amount" value="" />
          <InfoRow label="Quantity" value="" />
          <InfoRow label="Manufacturer" value="" />
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button className=" py-3 px-32 bg-primary500 text-white rounded-lg font-semibold ">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPartModal;
