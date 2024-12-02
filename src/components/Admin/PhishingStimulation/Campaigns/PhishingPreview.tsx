import { useNavigate } from "react-router-dom";
import cardImgFour from "../../../../assets/password-expiration.png";

const PhishingPreview = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div>
      <div className=" mb-8">
        <h1 className=" text-greyText text-2xl font-medium mb-2">
          Preview Phishing Campaign
        </h1>
        <p className=" text-[#828690] text-xs" onClick={handleGoBack}>
          Go back
        </p>
      </div>
      {/*  */}
      <div className="bg-blue50 p-8 rounded-md min-h-[80vh] flex items-center justify-center">
        <div className=" bg-[#F8FAFE] p-8">
          <div className=" py-5 px-7 bg-white shadow-custom-shadow max-w-[381px] ">
            <div className=" flex flex-col gap-4">
              <h1 className=" text-textColor font-medium text-lg">
                Password Expiration Notice
              </h1>
              <img src={cardImgFour} alt="" />
              <div className=" flex flex-col gap-4 text-xs text-[#5A5555]">
                <p>
                  Dear Olajide, <br /> We have noticed unusual activity in your
                  bank account and need you to verify your identity to ensure
                  your account remains secure. Please click the link below to
                  review the activity and verify your account:
                  <h1 className=" underline text-primary500">Verify Now</h1>
                </p>
                <p>
                  If this action is not taken within 24 hours, your account may
                  be restricted.
                </p>
                <p>Best regards,</p>
                <p className=" text-[#864DE0]">
                  Bank of America, Fraud Department
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhishingPreview;
