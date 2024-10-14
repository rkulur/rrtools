import { ReactNode } from "react";

const Navbar = ({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) => {
  return (
    <header className="min-h-24 w-full bg-black text-white flex flex-col px-3 py-4 justify-center relative">
      <h1 className="font-extrabold text-4xl text-center">{title}</h1>
      {children}
    </header>
  );
};

export default Navbar;
