import React from "react";
import { TbLayoutSidebarRightExpandFilled } from "react-icons/tb";
import { LuRefreshCw } from "react-icons/lu";
import { LuPencilLine } from "react-icons/lu";
import { RiMenu4Line } from "react-icons/ri";
import { RiListCheck2 } from "react-icons/ri";
import { BiSolidNetworkChart } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { RiFolderImageFill } from "react-icons/ri";
import { RiListSettingsFill } from "react-icons/ri";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, isActive }) => {
  const activeClasses = isActive
    ? "bg-gray-100 text-green-700 rounded-md py-2"
    : "text-gray-400 hover:bg-gray-200 rounded-md py-3";

  return (
    <div
      className={`flex items-center justify-center p-3 cursor-pointer transition-colors duration-200 ${activeClasses}`}
      aria-label={label}
    >
      {icon}
    </div>
  );
};

const RightSidebar: React.FC = () => {
  return (
    <div className="font-sans flex flex-col w-14 bg-white text-gray-400 shadow-inner border-l border-gray-300 h-full">
      <nav className="flex-1 flex flex-col items-center space-y-2 py-3">
        <SidebarItem
          icon={<TbLayoutSidebarRightExpandFilled size={16} />}
          label="Expand"
        />
        <SidebarItem icon={<LuRefreshCw size={16} />} label="Refresh" />
        <SidebarItem icon={<LuPencilLine size={16} />} label="Pencil" />
        <SidebarItem icon={<RiMenu4Line size={16} />} label="Menu" />
        <SidebarItem icon={<RiListCheck2 size={16} />} label="Tasklist" />
        <SidebarItem icon={<BiSolidNetworkChart size={16} />} label="Graph" />
        <SidebarItem icon={<FaUsers size={16} />} label="Users" />
        <SidebarItem icon={<MdAlternateEmail size={16} />} label="Mail" />
        <SidebarItem icon={<RiFolderImageFill size={16} />} label="Gallery" />
        <SidebarItem icon={<RiListSettingsFill size={16} />} label="Settings" />
      </nav>
    </div>
  );
};

export default RightSidebar;
