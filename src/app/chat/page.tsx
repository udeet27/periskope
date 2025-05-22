'use client';

import { useState, useEffect } from 'react';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import TopBar from "./topbar";
import LeftSidebar from "./left-sidebar";
import RightSidebar from "./right-sidebar";
import FilterBar from "./filter-bar";
import ChatsList from "./chat-list";
import Messages from './messages';
import SendMessage from './send-message';

export default function ChatPage() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setCurrentUserId(session.user.id);
      }
    };

    getCurrentUser();
  }, [supabase.auth]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      <LeftSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <div className="flex flex-1 overflow-hidden">
          <div className="w-[30%] flex flex-col border-r border-gray-200">
            <FilterBar />
            <div className="flex-1 overflow-auto">
              <ChatsList onSelectChat={setSelectedChatId} />
            </div>
          </div>
          <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
            {selectedChatId ? (
              <>
                <div className="flex-1 overflow-auto p-4">
                  <Messages chatId={selectedChatId} currentUserId={currentUserId} />
                </div>
                <div className="border-t border-gray-200 p-4 bg-white">
                  <SendMessage />
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center p-8">
                  <DocumentTextIcon className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-700">Select a chat to start messaging</h3>
                  <p className="mt-1 text-sm text-gray-500">Or start a new conversation</p>
                </div>
              </div>
            )}
          </div>
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
