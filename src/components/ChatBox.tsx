
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Send, Image, MapPin } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "other";
  timestamp: Date;
}

interface ChatBoxProps {
  recipientName: string;
  recipientAvatar?: string;
  propertyId?: string;
  propertyTitle?: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({
  recipientName,
  recipientAvatar = "https://randomuser.me/api/portraits/men/32.jpg",
  propertyId,
  propertyTitle,
}) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello, I'm interested in your property. Is it still available?",
      sender: "user",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: "2",
      text: "Yes, it's still available. Would you like to schedule a visit?",
      sender: "other",
      timestamp: new Date(Date.now() - 3000000),
    },
    {
      id: "3",
      text: "Great! I'd like to know more about the amenities in the area.",
      sender: "user",
      timestamp: new Date(Date.now() - 2400000),
    },
    {
      id: "4",
      text: "The property is located near schools, hospitals, and shopping centers. There's also a park within walking distance.",
      sender: "other",
      timestamp: new Date(Date.now() - 1800000),
    },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message,
        sender: "user",
        timestamp: new Date(),
      };

      setMessages([...messages, newMessage]);
      setMessage("");

      // Simulate a reply after a short delay
      setTimeout(() => {
        const reply: Message = {
          id: (Date.now() + 1).toString(),
          text: "Thanks for your message. I'll get back to you shortly.",
          sender: "other",
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, reply]);
      }, 1000);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col bg-white rounded-lg shadow overflow-hidden h-full">
      {/* Chat Header */}
      <div className="border-b p-3 flex items-center">
        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
          <img
            src={recipientAvatar}
            alt={recipientName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{recipientName}</h3>
          {propertyTitle && (
            <div className="text-xs text-gray-500 flex items-center">
              <MapPin className="h-3 w-3 mr-1" /> {propertyTitle}
            </div>
          )}
        </div>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] px-4 py-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-primary text-white rounded-tr-none"
                    : "bg-gray-100 text-gray-800 rounded-tl-none"
                }`}
              >
                <p>{msg.text}</p>
                <div
                  className={`text-xs mt-1 ${
                    msg.sender === "user" ? "text-primary-foreground/70" : "text-gray-500"
                  }`}
                >
                  {formatTime(msg.timestamp)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="border-t p-3">
        <div className="flex items-end gap-2">
          <Textarea
            placeholder="Type your message..."
            className="flex-1 min-h-[80px] resize-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              size="icon"
              type="button"
              className="rounded-full"
            >
              <Image className="h-4 w-4" />
              <span className="sr-only">Attach image</span>
            </Button>
            <Button
              type="button"
              size="icon"
              className="rounded-full"
              onClick={handleSendMessage}
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
