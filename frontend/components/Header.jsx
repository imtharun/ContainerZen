import Image from "next/image";
import containerImage from "@/assets/container.png";
import { BsPerson as PersonIcon } from "react-icons/bs";

const Header = ({ heading, user }) => {
  return (
    <header className="h-[10vh] z-30 bg-dark p-4 text-light flex items-center justify-between shadow-2xl">
      <div className="flex items-center justify-center">
        <Icon />
        <h1 className="pl-3 text-xl hidden sm:block">Container</h1>
      </div>
      <h1 className="text-2xl font-medium">{heading}</h1>
      <div className="flex items-center">
        <PersonIcon className="w-6 h-6" />
        <p className="ml-2 text-lg hidden sm:block border-b-[1.5px] border-transparent hover:border-b-[1.5px] hover:border-b-light transition-all duration-300">
          {user}
        </p>
      </div>
    </header>
  );
};

export const Icon = () => {
  return (
    <Image
      src={containerImage}
      className="w-8 h-8"
      alt="Container Icon"
      priority={true}
    />
  );
};

export default Header;
