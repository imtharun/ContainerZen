import { useState } from "react";
import {
  HiOutlineSquares2X2 as DashboardIcon,
  HiOutlineSquaresPlus as ApplicationIcon,
} from "react-icons/hi2";
import { RiUserSettingsLine as UserSettingIcon } from "react-icons/ri";
import { BsStack as ResourcesIcon } from "react-icons/bs";

const SideBar = () => {
  const [isVisible, setIsVisible] = useState(false);

  const contents = [
    {
      icon: <DashboardIcon className="w-[1.4rem] h-6" />,
      name: "Dashboard",
    },
    {
      icon: <ApplicationIcon className="w-[1.4rem] h-6" />,
      name: "Applications",
    },
    {
      icon: <ResourcesIcon className="w-[1.4rem] h-6" />,
      name: "Resources",
    },
    {
      icon: <UserSettingIcon className="w-[1.4rem] h-6" />,
      name: "Settings",
    },
  ];

  return (
    <>
      <div className="sm:hidden absolute bottom-0 bg-dark w-full p-3 ">
        <div
          className={`flex justify-center overflow-x-scroll no-scrollbar  text-light `}
        >
          {contents.map((ele, index) => {
            return (
              <MiniContainerForSmallScreen
                key={index + 1}
                icon={ele.icon}
                name={ele.name}
              />
            );
          })}
        </div>
      </div>
      <div
        onMouseEnter={() => {
          setIsVisible(true);
          console.log("entered", isVisible);
        }}
        onMouseLeave={() => {
          setIsVisible(false);
          console.log("exited");
        }}
        className={`hidden sm:block absolute bg-light text-dark h-[90vh] p-3 transition-all duration-300 ease-out ${
          !isVisible ? "w-[66px]" : "w-[236px]"
        }`}
      >
        {contents.map((ele, index) => {
          return (
            <MiniContainerForLargerScreen
              key={index + 1}
              icon={ele.icon}
              name={ele.name}
              isVisible={isVisible}
              setIsVisible={setIsVisible}
            />
          );
        })}
      </div>
    </>
  );
};

export const MiniContainerForSmallScreen = ({ icon, name }) => {
  return (
    <div className="flex items-center flex-col mx-2">
      {icon}
      <p className="text-xs">{name}</p>
    </div>
  );
};

export const MiniContainerForLargerScreen = ({ icon, name, isVisible }) => {
  return (
    <div className="border-b border-b-gray-400 ">
      <div className="hover:bg-slate-200 rounded-md my-1 p-2 mx-auto">
        <div
          className={`flex items-center ${
            !isVisible ? "w-5rem" : "w-[13rem]"
          } text-center"`}
        >
          {icon}
          {isVisible && <p className="mx-auto font-medium">{name}</p>}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
