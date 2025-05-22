import TopBar from "./topbar";
import LeftSidebar from "./left-sidebar";
import RightSidebar from "./right-sidebar";
import FilterBar from "./filter-bar";
import ChatsList from "./chat-list";

export default function ChatPage() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      <LeftSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <div className="flex flex-1 overflow-hidden">
          <div className="w-[30%] flex flex-col border-r border-gray-200">
            <FilterBar />
            <div className="flex-1 overflow-auto">
              <ChatsList />
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            {/* Main chat content will go here */}
          </div>
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
