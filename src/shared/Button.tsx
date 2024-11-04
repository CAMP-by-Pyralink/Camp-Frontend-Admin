type ButtonProps = {
  label: string;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <div
      className=" bg-primary500 w-[180px] rounded-lg py-[0px] px-[18px] cursor-pointer text-white text-center flex items-center justify-center"
      onClick={onClick}
    >
      {label}
    </div>
  );
};

export default Button;
