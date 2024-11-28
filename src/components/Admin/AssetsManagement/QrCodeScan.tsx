import qrcodeImg from "../../../assets/qr-code.png";
import closeIcon from "../../../assets/svgs/close.svg";
import bgShape from "../../../assets/svgs/qr-code-shape.svg";
interface Props {
  onClose: () => void;
}
const QrCodeScan = ({ onClose }: Props) => {
  return (
    <div className="bg-[#F7F9FC] w-[715px] h-[538px] px py- rounded-lg shadow-lg relative flex flex-col items-center justify-center ">
      <img
        src={closeIcon}
        className=" absolute  z-50 right-4 top-4 cursor-pointer"
        alt=""
        onClick={onClose}
      />
      <h1 className=" text-greyText font-medium text-2xl mb-1">Scan QR Code</h1>
      <div className=" absolut">
        <img src={qrcodeImg} alt="" className=" w-full" />
        <h1>Scan QR Code to access device camera to scan asset barcode</h1>
      </div>
      {/* <img src={bgShape} alt="" className=" absol" /> */}
      {/* <div
        className=" absolute bottom-0 left-0"
        style={{
          width: "100%",
          height: "300px",
          backgroundColor: "lightblue",
          clipPath: "circle(50% at 50% 100%)",
        }}
      ></div> */}
    </div>
  );
};

export default QrCodeScan;
