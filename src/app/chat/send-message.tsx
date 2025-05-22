'use client';

import { PaperAirplaneIcon, PaperClipIcon, FaceSmileIcon, ClockIcon, SparklesIcon, DocumentTextIcon, MicrophoneIcon } from '@heroicons/react/24/outline';
import { useState, useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';

type Message = {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
};

export default function SendMessage() {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSending(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.error('User not authenticated');
        return;
      }

      const { error } = await supabase
        .from('messages')
        .insert([
          { 
            content: message,
            user_id: user.id,
          },
        ]);

      if (error) {
        console.error('Error sending message:', error);
      } else {
        setMessage('');
        inputRef.current?.focus();
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSending(false);
    }
  };

  // Set up real-time subscription
  useEffect(() => {
    type RealtimePayload<T> = {
      new: T;
      old: T | null;
      event: 'INSERT' | 'UPDATE' | 'DELETE';
      schema: string;
      table: string;
    };

    const channel = supabase
    .channel('messages_changes')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
      },
      (payload) => {
        // Handle new message
        console.log('New message:', payload.new);
        // You can update your UI here or use a state management solution
      }
    )
    .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <form onSubmit={handleSubmit} className="flex items-center gap-2 max-w-4xl mx-auto">
        <div className="flex items-center space-x-2 text-gray-500">
          <button type="button" className="p-2 hover:bg-gray-100 rounded-full">
            <PaperClipIcon className="h-5 w-5" />
          </button>
          <button type="button" className="p-2 hover:bg-gray-100 rounded-full">
            <FaceSmileIcon className="h-5 w-5" />
          </button>
          <button type="button" className="p-2 hover:bg-gray-100 rounded-full">
            <ClockIcon className="h-5 w-5" />
          </button>
          <button type="button" className="p-2 hover:bg-gray-100 rounded-full">
            <SparklesIcon className="h-5 w-5" />
          </button>
          <button type="button" className="p-2 hover:bg-gray-100 rounded-full">
            <DocumentTextIcon className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message..."
            className="w-full py-2 px-4 pr-12 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white"
            disabled={isSending}
          />
          <button 
            type="button" 
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700"
          >
            <MicrophoneIcon className="h-5 w-5" />
          </button>
        </div>

        <button
          type="submit"
          disabled={!message.trim() || isSending}
          className="p-2 text-white bg-green-500 rounded-full hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PaperAirplaneIcon className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}
