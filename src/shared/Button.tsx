type ButtonProps = {
  label: string;
  onClick?: () => void;
  width: string;
};

const Button: React.FC<ButtonProps> = ({ label, onClick, width }) => {
  return (
    <div
      className=" bg-primary500 rounded-lg py-3 px-[18px] cursor-pointer text-white text-center flex items-center justify-center"
      onClick={onClick}
      style={{
        width: width,
      }}
    >
      {label}
    </div>
  );
};

export default Button;
