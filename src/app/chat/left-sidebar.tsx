import React from "react";
import Image from "next/image";
import { TiHome } from "react-icons/ti";
import { BsChatDotsFill } from "react-icons/bs";
import { IoTicket } from "react-icons/io5";
import { FaChartLine } from "react-icons/fa6";
import { TfiMenuAlt } from "react-icons/tfi";
import { HiMegaphone } from "react-icons/hi2";
import { TiFlowMerge } from "react-icons/ti";
import { IoSparklesSharp } from "react-icons/io5";
import { RiContactsBookFill } from "react-icons/ri";
import { IoIosSettings } from "react-icons/io";
import { TbStarsFilled } from "react-icons/tb";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { MdOutlineChecklist } from "react-icons/md";
import { RiFolderImageFill } from "react-icons/ri";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, isActive }) => {
  const activeClasses = isActive
    ? "bg-gray-100 text-green-700 rounded-md py-2"
    : "text-gray-500 hover:bg-gray-200 rounded-md py-2 shadow-xs";

  return (
    <div
      className={`flex items-center justify-center p-3 cursor-pointer transition-colors duration-200 ${activeClasses}`}
      aria-label={label}
    >
      {icon}
    </div>
  );
};

// Main Sidebar component
const LeftSidebar: React.FC = () => {
  return (
    <div className="font-sans flex flex-col h-screen w-16 bg-white text-white shadow-lg border-r-gray-300 border">
      <div className="flex items-center justify-center p-2 mt-1">
        <div className="relative">
          <Image
            src="/favicon.ico"
            alt="Periskope Logo"
            width={20}
            height={20}
            priority
            className="rounded-full"
          />
          <span className="absolute bottom-[-30%] left-[80%] transform -translate-x-1/2 text-green-700 text-xs bg-white rounded-lg font-bold leading-none">
            12
          </span>
        </div>
      </div>

      <nav className="flex-1 flex flex-col items-center space-y-2 py-3">
        <SidebarItem icon={<TiHome size={20} />} label="Home" />

        <SidebarItem
          icon={<BsChatDotsFill size={15} />}
          label="Chat"
          isActive={true}
        />

        <SidebarItem icon={<IoTicket size={15} />} label="Tickets" />
        <SidebarItem icon={<FaChartLine size={15} />} label="Charts" />
        <SidebarItem
          icon={<TfiMenuAlt size={15} strokeWidth={0.5} />}
          label="Menu"
        />
        <SidebarItem icon={<HiMegaphone size={16} />} label="Megaphone" />
        <SidebarItem
          icon={
            <div className="relative w-6 h-6">
              <TiFlowMerge size={18} />
              <IoSparklesSharp
                size={13}
                color="#EBBE05"
                className="absolute -top-1 -right-1"
              />
            </div>
          }
          label="Git merge"
        />
        <SidebarItem
          icon={<RiContactsBookFill size={16} />}
          label="Contact book"
        />
        <SidebarItem icon={<RiFolderImageFill size={16} />} label="Gallery" />
        <SidebarItem icon={<MdOutlineChecklist size={16} />} label="Tasks" />
        <SidebarItem icon={<IoIosSettings size={17} />} label="Settings" />
      </nav>

      <nav className="flex-1 flex flex-col items-center space-y-1 py-6 mb-0">
        <SidebarItem icon={<TbStarsFilled size={16} />} label="Favourites" />
        <SidebarItem
          icon={<TbLayoutSidebarLeftExpandFilled size={17} />}
          label="Expand"
        />
      </nav>
    </div>
  );
};

export default LeftSidebar;
