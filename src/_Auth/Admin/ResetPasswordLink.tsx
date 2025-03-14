import { useRef, useState } from "react";
import closeIcon from "../../assets/svgs/closeicongrey.svg";
import otpIcon from "../../assets/svgs/otpicon.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const ResetPasswordLink = () => {
  const inputLength = 4;
  const [otp, setOtp] = useState<string[]>(Array(inputLength).fill(""));
  const navigate = useNavigate();

  const { resendTokenForgotPassword, isLoading, verifyEmailResetPassword } =
    useAuthStore();

  // Create a ref array to store input elements
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Handles input change for each OTP digit
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;

    console.log(otp.join(""));
    // Allow only digits
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      // Use only the last character if user pastes more than one digit
      newOtp[index] = value.slice(-1);
      setOtp(newOtp);

      // Move focus to the next input if available and the current input is not empty
      if (value && index < inputLength - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle key down for backspace (and other keys if necessary)
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // When pressing backspace on an empty input, focus previous
      inputRefs.current[index - 1]?.focus();
    }
  };

  const email = sessionStorage.getItem("email");

  const handleResendToken = async () => {
    if (email) await resendTokenForgotPassword({ email });
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Join the OTP digits into one string
    const otpCode = otp.join("");
    console.log("Entered OTP:", otpCode);

    if (email) {
      const response = await verifyEmailResetPassword({
        email,
        token: otpCode,
      });
      if (response) {
        navigate("/reset-password");
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-[5px_5px_40px_rgba(107,151,255,0.3)] p-6 rounded-lg w-fit text-center relative">
        {/* OTP Icon */}
        <div className="flex justify-center items-center mb-4">
          <img src={otpIcon} alt="OTP icon" className="h-12 w-12" />
        </div>

        {/* Heading and description */}
        <h2 className="text-lg font-medium text-[#101828]">
          Please check your email.
        </h2>
        <p className="text-sm text-[#667085] mb-4">
          {/* We&apos;ve sent a code to <strong>{email}</strong> */}
        </p>

        {/* OTP Form */}
        <form onSubmit={handleOtpSubmit}>
          <div className="w-full flex items-center justify-center mb-4">
            <div className="flex gap-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  maxLength={1}
                  className="text-center text-2xl text-neutral-600 p-3 border border-primary600 rounded-lg w-14 h-14 outline-none focus:ring-2 focus:ring-primary500/20 focus:border-primary500"
                  // required
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-primary500 mb-6">
            Didn&apos;t get a code?{" "}
            <p
              className=" inline underline cursor-pointer"
              onClick={handleResendToken}
            >
              Click to resend.
            </p>
          </p>

          {/* Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              type="button"
              className="py-2 px-4 rounded-lg border border-[#D0D5DD] font-medium text-[#344054] w-[174px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              // disabled={isVerifyingEmail}
              className="bg-primary500 text-white py-2 px-4 rounded-lg font-medium w-[174px] flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className=" size-6 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>Verify</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordLink;
