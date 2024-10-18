import closeIcon from "../../assets/svgs/closeicongrey.svg";

const ResetPasswordLink = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white  relative shadow-[5px_5px_40px_rgba(107,151,255,0.3)] p-16 rounded-lg text-center w-full max-w-[523px]">
        <img
          src={closeIcon}
          className=" absolute top-8 right-8 text-[#141B34]"
          alt=""
        />
        <h2 className="text-3xl text-[#454545] font-medium mb-4">
          Forgot Password
        </h2>
        <p className="text-[#475569] text-lg leading-[27px] mb-6">
          No worries, verification link has been to sent to your{" "}
          <strong>ol**@gmail.com.</strong>
          {""} Click on the link to reset your password
        </p>
        <p className=" text-[#475569]">
          Didn’t Receive link?{" "}
          <span className=" text-primary500 font-semibold underline">
            Resend link
          </span>
        </p>
        <p className="text-[#475569]">Resend code in 00:59</p>
      </div>
    </div>
  );
};

export default ResetPasswordLink;
