import { RotatingLines } from "react-loader-spinner";

const Loader = () => {
  return (
    <div>
      <RotatingLines
        visible={true}
        // height="96"
        width="96"
        color="#828282"
        strokeWidth="1"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
