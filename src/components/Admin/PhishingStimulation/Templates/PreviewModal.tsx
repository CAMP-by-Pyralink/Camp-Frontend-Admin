import { Link, useLocation, useParams } from "react-router-dom";
import closeIcon from "../../../../assets/svgs/closeicongrey.svg";

import editIcon from "../../../../assets/svgs/edit-icon.svg";
const PreviewModal = ({ setContinueClicked }) => {
  // const { title } = useParams<{ title: string }>();
  const location = useLocation();

  // Destructure title and img from location.state
  const { title, img } = location.state || {};
  console.log("Location state:", location.state);
  console.log(title, img);

  return (
    <div
      className=" overflow-y-scroll fixed inset-0 bg-[#344054B2] bg-opacity-40 flex justify-center items-center min-h-screen "
      style={{ backdropFilter: "blur(7.06999969482422px)" }}
    >
      <div className="bg-white rounded-lg shadow-lg  w-full max-w-xl">
        <div className="bg-[#DEEFFC] py-4 px-12 flex justify-between items-center border-b">
          <h2 className="text-2xl  text-[#333333]">Preview & Apply</h2>
          {/* <div className="text-gray-500 hover:text-gray-800">✕</div> */}
          <img
            src={closeIcon}
            alt=""
            className=" cursor-pointer"
            // onClick={handleFilterClick}
            onClick={() => setContinueClicked((prev) => !prev)}
          />
        </div>
        {/*  */}
        <div className=" py-4 px-4">
          <div className=" mx-12">
            <label htmlFor="" className=" block text-[#333333] font-medium">
              Campaign name
            </label>
            <input
              type="text"
              value="Work test"
              className=" p-4 border border-[#D0D5DD] w-full rounded-md text-sm mb-4"
            />
          </div>
          <hr />
        </div>
        {/*  */}
        <div className=" py- px-4">
          <div className=" mx-12 mb-4">
            <div className=" flex items-center justify-between mb-4">
              <h1 className=" text-[#454545] text-xl font-semibold">
                Delivery type: <span className=" font-normal">(recurring)</span>
              </h1>
              <div className=" flex items-center gap-2">
                <h1>Edit</h1>
                <img src={editIcon} alt="" />
              </div>
            </div>
            {/*  */}
            <h1>
              Start date: July 10,2023 <br />
              Next campaign: August 10,2023 <br />
              Recipients: 38 employees <br />
              Delivery time: 8am to 4pm (GMT)
            </h1>
          </div>
          <hr />
        </div>
        {/*  */}
        <div className=" py-4 px-4">
          <div className=" mx-12">
            <div className=" flex items-center justify-between mb-4">
              <h1 className=" text-[#454545] text-xl font-semibold">
                Recipient <span className=" font-normal">(department)</span>
              </h1>
              <div className=" flex items-center gap-2">
                <h1>Edit</h1>
                <img src={editIcon} alt="" />
              </div>
            </div>
            {/*  */}
            <div className=" flex gap-4 items-center mb-8">
              <div className=" bg-blue50 w-fit py-1 px-2 rounded-[10px] text-[#454545] text-sm">
                <div className=" flex gap-4 items-center">
                  <h1>
                    Human resource(29) <span>x</span>
                  </h1>
                </div>
              </div>
              <div className=" bg-blue-50 w-fit py-1 px-2 rounded-[10px] text-[#454545] text-sm">
                <div className=" flex gap-4 items-center">
                  <h1>
                    Human resource(29) <span>x</span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
        {/*  */}
        <div className=" py- px-4">
          <div className=" mx-12">
            <div className=" flex items-center justify-between mb-4">
              <h1 className=" text-[#454545] text-xl font-semibold">
                Template
              </h1>
              <div className=" flex items-center gap-2">
                <h1>Edit</h1>
                <img src={editIcon} alt="" />
              </div>
            </div>
            <div className=" flex gap-4 items-center">
              <img src={img} alt={title} className=" w-[85px]" />
              <h1 className=" text-[#454545] font-semibold text-2xl">
                {title}
              </h1>
            </div>
            <div className=" flex gap-4 items-center py-8">
              <Link to="/phishing-simulation/campaigns">
                <button className=" py-4 px-6 bg-primary500 font-medium text-white rounded-lg">
                  Start campaign
                </button>
              </Link>
              <button className=" font-medium py-4 px-6 text-primary500 border border-primary500 rounded-lg ">
                Send test email
              </button>
              <h1 className=" underline text-primary500 ml-8">Preview</h1>
            </div>
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default PreviewModal;
