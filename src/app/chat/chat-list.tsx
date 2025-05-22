"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// Initialize Supabase client

interface Chat {
  id: string;
  is_group: boolean;
  group_name: string | null;
  group_description: string | null;
  group_avatar: string | null;
  created_by: string | null;
  created_at: string;
}

interface ChatsListProps {
  onSelectChat: (chatId: string) => void;
}

const ChatsList: React.FC<ChatsListProps> = ({ onSelectChat }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClientComponentClient();

    const fetchChats = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("chats")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setChats(data || []);
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching chats:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  if (loading) {
    return (
      <div className="font-sans text-sm p-4 text-center text-gray-500">
        Loading chats...
      </div>
    );
  }

  if (error) {
    return (
      <div className="font-sans text-sm p-4 text-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="font-sans flex flex-col h-full overflow-y-auto bg-white custom-scrollbar">
      {chats.length === 0 ? (
        <div className="p-4 text-center text-gray-500">No chats found.</div>
      ) : (
        <ul className="flex-1">
          {chats.map((chat) => (
            <li
              key={chat.id}
              className="flex flex-col p-2 transition duration-200 ease-in-out hover:bg-gray-100 cursor-pointer"
            >
              <div className="flex items-center h-8">
                <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 mr-2 text-white bg-gray-200 rounded-full">
                  {chat.group_avatar ? (
                    <img
                      src={chat.group_avatar}
                      alt="Group Avatar"
                      className="object-cover w-full h-full rounded-full"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = `https://placehold.co/40x40/cccccc/000000?text=👥`;
                      }}
                    />
                  ) : chat.is_group ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4.5 h-4.5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.54.87 2.57 1.91 2.57 2.45V19h4v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4.5 h-4.5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {chat.group_name || "Unnamed Chat"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {chat.group_description || "No description"}
                  </p>
                </div>
                <div className="ml-2">
                  <p className="text-xs text-gray-500">
                    {new Date(chat.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatsList;
