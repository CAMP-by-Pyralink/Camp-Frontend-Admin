type ButtonProps = {
  label: string;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <div
      className=" bg-primary500 rounded-lg py-[10px] px-[18px] cursor-pointer text-white text-center"
      onClick={onClick}
    >
      {label}
    </div>
  );
};

export default Button;
