import { RiFolderDownloadFill } from "react-icons/ri";
import { GoSearch } from "react-icons/go";
import { IoFilter, IoCloseCircle } from "react-icons/io5";

const FilterBar: React.FC = () => {
  return (
    <nav className="font-sans bg-white border border-r-gray-200 border-t-gray-200 overflow-x-auto whitespace-nowrap border-white">
      <div className="flex items-center gap-2 px-1 py-2 border border-b-gray-200 border-white">
        <button className="flex items-center gap-1 px-3 py-1 font-semibold bg-white rounded-sm text-green-700 transition whitespace-nowrap">
          <RiFolderDownloadFill size={16} />
          <span className="text-xs">Custom filter</span>
        </button>

        <button className="flex items-center gap-1 px-3 py-1 text-xs font-medium bg-white shadow-sm rounded-sm text-gray-800 hover:bg-gray-50 transition cursor-pointer">
          Save
        </button>

        <button className="flex items-center gap-1 px-3 py-1 font-medium bg-white shadow-sm rounded-sm text-gray-800 hover:bg-gray-50 transition cursor-pointer">
          <GoSearch size={13} />
          <span className="text-xs">Search</span>
        </button>

        <button className="relative flex items-center gap-1 px-3 py-1 font-semibold bg-white shadow-sm rounded-sm text-green-700 hover:bg-gray-50 transition cursor-pointer">
          <IoFilter size={15} />
          <span className="text-xs">Filtered</span>
          <IoCloseCircle
            size={16}
            className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
          />
        </button>
      </div>
    </nav>
  );
};

export default FilterBar;
