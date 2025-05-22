"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Message {
  id: string;
  chat_id: string;
  sender_id: string;
  sender_name: string;
  content: string;
  created_at: string;
}

interface MessagesProps {
  chatId: string;
  currentUserId: string;
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB").replaceAll("/", "-");
}

function formatTime(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false });
}

const Messages: React.FC<MessagesProps> = ({ chatId, currentUserId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClientComponentClient();
    if (!chatId) return;
    setLoading(true);
    setError(null);
    supabase
      .from("messages")
      .select("*")
      .eq("chat_id", chatId)
      .order("created_at", { ascending: true })
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setMessages(data || []);
        setLoading(false);
      });
  }, [chatId]);

  if (!chatId) {
    return <div className="flex flex-1 items-center justify-center text-gray-400">Select a chat to view messages</div>;
  }

  if (loading) {
    return <div className="flex flex-1 items-center justify-center text-gray-400">Loading messages...</div>;
  }

  if (error) {
    return <div className="flex flex-1 items-center justify-center text-red-500">{error}</div>;
  }

  // Group messages by date
  const grouped: { [date: string]: Message[] } = {};
  messages.forEach((msg) => {
    const date = formatDate(msg.created_at);
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(msg);
  });

  return (
    <div className="font-sans flex flex-col h-full w-full px-6 py-4 overflow-y-auto bg-[#f0f2f5] custom-scrollbar">
      {Object.entries(grouped).map(([date, msgs]) => (
        <div key={date}>
          <div className="flex justify-center my-4">
            <span className="bg-white text-gray-500 text-xs px-3 py-1 rounded-full shadow border border-gray-200">{date}</span>
          </div>
          {msgs.map((msg) => {
            const isMe = msg.sender_id === currentUserId;
            return (
              <div
                key={msg.id}
                className={`flex ${isMe ? "justify-end" : "justify-start"} mb-2`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 shadow text-sm whitespace-pre-line ${
                    isMe
                      ? "bg-green-100 text-gray-900 border border-green-200"
                      : "bg-white text-gray-900 border border-gray-200"
                  }`}
                >
                  {!isMe && (
                    <div className="font-semibold text-green-700 text-xs mb-1">{msg.sender_name}</div>
                  )}
                  <div>{msg.content}</div>
                  <div className="flex justify-end text-[0.65rem] text-gray-400 mt-1">
                    {formatTime(msg.created_at)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Messages;
