import React, { useState } from "react";
import otpIcon from "../../assets/svgs/otpicon.svg";
import { Link } from "react-router-dom";
const OTPVerification = () => {
  const [otp, setOtp] = useState(Array(4).fill(""));

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(otp.join(""));
    // Handle OTP verification logic
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-[5px_5px_40px_rgba(107,151,255,0.3)] p-6 rounded-lg  w-fit  text-center relative">
        {/* Mail Icon */}
        <div className="flex justify-center items-center mb-4">
          <div className="">
            {/* <AiOutlineMail className="text-blue-500" size={32} /> */}
            <img src={otpIcon} alt="" className=" h-12 w-12" />
          </div>
        </div>

        {/* Heading and description */}
        <h2 className="text-lg font-medium text-[#101828] ">
          Please check your email.
        </h2>
        <p className="text-sm text-[#667085] mb-4">
          We&apos;ve sent a code to <strong>olamidee@gmail.com</strong>
        </p>

        {/* OTP Form */}
        <form onSubmit={handleOtpSubmit}>
          <div className=" w-full h-full flex items-center justify-center">
            <div className="w-full flex  gap-4 mb-4">
              {otp.map((digit, index) => (
                <div className=" w-full">
                  <input
                    key={index}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(e, index)}
                    maxLength={1}
                    className="text-center text-2xl text-neutrals600 p-3 border border-primary600 rounded-lg w-14 h-14"
                    required
                  />
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm text-primary500 mb-6">
            Didn&apos;t get a code?{" "}
            <a href="#" className=" underline">
              Click to resend.
            </a>
          </p>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              className="flex-1 py-[10px] px-[18px] rounded-lg border border-[#D0D5DD] font-medium text-[#344054] w-[174px]"
            >
              Cancel
            </button>
            <Link to="/successful">
              {" "}
              <button
                type="submit"
                className="flex-1 bg-primary500 text-white py-[10px] px-[18px] rounded-lg font-medium w-[174px]"
              >
                Verify
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;
