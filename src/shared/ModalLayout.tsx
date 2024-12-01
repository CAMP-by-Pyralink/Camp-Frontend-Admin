interface ModalLayoutProps {
  children?: React.ReactNode;
}
const ModalLayout: React.FC<ModalLayoutProps> = ({ children }) => {
  return (
    <div
      className=" fixed inset-0 bg-[#344054B2] bg-opacity-40 flex justify-center items-center h-screen "
      style={{ backdropFilter: "blur(7.06999969482422px)" }}
    >
      {children}
    </div>
  );
};

export default ModalLayout;
