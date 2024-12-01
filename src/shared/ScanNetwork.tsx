import closeIcon from "../assets/svgs/close.svg";
import scanIcon from "../assets/svgs/scan-network-icon.svg";

interface ScanNetworkProps {
  type: string;
  onCreate: () => void;
  onClose: () => void;
  startScan: () => void; // Changed from scanNetwork to startScan
}

const ScanNetwork: React.FC<ScanNetworkProps> = ({
  onCreate,
  onClose,
  startScan, // Updated here
}) => {
  return (
    <div
      className="fixed inset-0 bg-[#344054B2] bg-opacity-40 flex justify-center items-center "
      style={{ backdropFilter: "blur(7.06999969482422px)" }}
    >
      <div className="bg-[#F7F9FC] w-fit px-12 py-6 rounded-lg shadow-lg relative">
        <h1 className=" text-center text-2xl font-medium mb-8 mt-4">
          {/* Upload CSV */}
        </h1>
        <img
          src={closeIcon}
          className=" absolute  z-50 right-4 top-4 cursor-pointer"
          alt=""
          onClick={onClose}
        />
        <div className="text-center flex flex-col items-center gap-4">
          <img src={scanIcon} alt="" />
          <h2 className="text-2xl font-semibold mb-4">Scan Network</h2>
          <p className="text-[#04012D] mb-4">
            Scan through company’s network to add users
          </p>

          <button
            onClick={() => {
              startScan(); // Updated here to use startScan
            }}
            className="w-full bg-primary500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600"
          >
            Scan
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScanNetwork;
