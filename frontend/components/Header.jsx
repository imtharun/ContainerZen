import Image from "next/image";
import containerImage from "@/assets/container.png";
import { BsPerson as PersonIcon } from "react-icons/bs";

const Header = () => {
  return (
    <header className="h-[10vh] z-30 bg-mid-dark p-4 text-light flex items-center justify-between shadow-2xl">
      <div className="flex items-center justify-center">
        <Icon />
        <h1 className="pl-3 text-xl hidden sm:block font-medium">
          ContainerZen
        </h1>
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
