import { RotatingLines } from "react-loader-spinner";
import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="loading-container hdh">
      <ClipLoader size={50} color="#123abc" />
    </div>
  );
};

export default Loader;
