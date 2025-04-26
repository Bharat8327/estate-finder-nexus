
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Send, Image, MapPin, Phone, Calendar, User, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  text: string;
  sender: "user" | "other";
  timestamp: Date;
  status?: "sent" | "delivered" | "read";
  attachments?: { type: "image" | "document"; url: string; name?: string }[];
}

interface ChatBoxProps {
  recipientName: string;
  recipientAvatar?: string;
  propertyId?: string;
  propertyTitle?: string;
  propertyLocation?: string;
  isOnline?: boolean;
  lastSeen?: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({
  recipientName,
  recipientAvatar = "https://randomuser.me/api/portraits/men/32.jpg",
  propertyId,
  propertyTitle,
  propertyLocation = "Bengaluru, Karnataka",
  isOnline = false,
  lastSeen = "2 hours ago"
}) => {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello, I'm interested in your property. Is it still available?",
      sender: "user",
      timestamp: new Date(Date.now() - 3600000),
      status: "read"
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
      status: "read"
    },
    {
      id: "4",
      text: "The property is located near schools, hospitals, and shopping centers. There's also a park within walking distance.",
      sender: "other",
      timestamp: new Date(Date.now() - 1800000),
    },
  ]);
  
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message,
        sender: "user",
        timestamp: new Date(),
        status: "sent"
      };

      setMessages([...messages, newMessage]);
      setMessage("");
      
      // Show toast notification
      toast({
        title: "Message sent",
        description: "Your message has been sent successfully.",
      });

      // Simulate a reply after a short delay
      setTimeout(() => {
        const reply: Message = {
          id: (Date.now() + 1).toString(),
          text: "Thanks for your message. I'll get back to you shortly.",
          sender: "other",
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, reply]);
      }, 1500);
    }
  };
  
  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachment(file);
      toast({
        title: "File attached",
        description: `${file.name} is ready to be sent.`,
      });
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' });
    }
  };
  
  // Group messages by date
  const groupedMessages = messages.reduce((groups: {date: string; messages: Message[]}[], message) => {
    const messageDate = formatDate(message.timestamp);
    const existingGroup = groups.find(group => group.date === messageDate);
    
    if (existingGroup) {
      existingGroup.messages.push(message);
    } else {
      groups.push({
        date: messageDate,
        messages: [message]
      });
    }
    
    return groups;
  }, []);

  return (
    <div className="flex flex-col bg-white rounded-lg shadow overflow-hidden h-full">
      {/* Chat Header */}
      <div className="border-b p-3 flex items-center justify-between bg-gray-50">
        <div className="flex items-center">
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border border-gray-200">
              <img
                src={recipientAvatar}
                alt={recipientName}
                className="w-full h-full object-cover"
              />
            </div>
            {isOnline && (
              <span className="absolute bottom-0 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            )}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{recipientName}</h3>
            <div className="flex items-center text-xs text-gray-500">
              {isOnline ? (
                <span className="text-green-600">Online now</span>
              ) : (
                <span>Last seen {lastSeen}</span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" title="Call">
            <Phone className="h-4 w-4 text-gray-600" />
          </Button>
          <Button variant="ghost" size="icon" title="View Profile">
            <User className="h-4 w-4 text-gray-600" />
          </Button>
        </div>
      </div>
      
      {/* Property Info Bar */}
      {propertyTitle && (
        <div className="bg-gray-50 p-2 flex items-center justify-between border-b">
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-1 text-primary" /> 
            <span className="font-medium">{propertyTitle}</span>
            {propertyLocation && <span className="ml-1 text-gray-500">• {propertyLocation}</span>}
          </div>
          <Button variant="secondary" size="sm" className="text-xs">
            View Property
          </Button>
        </div>
      )}

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4 bg-gray-50">
        <div className="space-y-6">
          {groupedMessages.map((group, groupIndex) => (
            <div key={groupIndex} className="space-y-3">
              <div className="flex justify-center">
                <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                  {group.date}
                </span>
              </div>
              
              {group.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "other" && (
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-2 mt-1">
                      <img
                        src={recipientAvatar}
                        alt={recipientName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="max-w-[75%]">
                    <div
                      className={`px-4 py-2.5 rounded-2xl ${
                        msg.sender === "user"
                          ? "bg-primary text-white rounded-tr-none"
                          : "bg-gray-100 text-gray-800 rounded-tl-none"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                    
                    <div
                      className={`flex items-center text-xs mt-1 ${
                        msg.sender === "user" ? "justify-end" : ""
                      }`}
                    >
                      <span className={msg.sender === "user" ? "text-gray-500" : "text-gray-500"}>
                        {formatTime(msg.timestamp)}
                      </span>
                      
                      {msg.sender === "user" && msg.status && (
                        <span className="ml-1.5 text-gray-500">
                          {msg.status === "sent" && "✓"}
                          {msg.status === "delivered" && "✓✓"}
                          {msg.status === "read" && <span className="text-blue-500">✓✓</span>}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        
        {/* Typing Indicator (optional) */}
        <div className="flex items-center mt-2 pl-10 animate-pulse">
          {/* Uncomment to show typing indicator */}
          {/* <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
            <div className="w-2 h-2 rounded-full bg-gray-400 animation-delay-100"></div>
            <div className="w-2 h-2 rounded-full bg-gray-400 animation-delay-200"></div>
          </div>
          <span className="text-xs text-gray-500 ml-2">{recipientName} is typing...</span> */}
        </div>
      </ScrollArea>

      {/* Attachment Preview */}
      {attachment && (
        <div className="bg-gray-50 p-2 border-t flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-gray-200 rounded p-1 mr-2">
              <Image className="h-4 w-4 text-gray-600" />
            </div>
            <span className="text-sm truncate max-w-[250px]">{attachment.name}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setAttachment(null)}>
            Remove
          </Button>
        </div>
      )}

      {/* Message Input */}
      <div className="border-t p-3 bg-white">
        <div className="flex items-end gap-2">
          <Textarea
            placeholder="Type your message..."
            className="flex-1 min-h-[60px] max-h-[150px] resize-none border-gray-200 focus:ring-primary"
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
            <div className="relative">
              <input
                type="file"
                id="attachment"
                className="sr-only"
                onChange={handleAttachmentChange}
                accept="image/*,.pdf,.doc,.docx"
              />
              <Button
                variant="outline"
                size="icon"
                type="button"
                className="rounded-full"
                onClick={() => document.getElementById("attachment")?.click()}
              >
                <Image className="h-4 w-4" />
                <span className="sr-only">Attach file</span>
              </Button>
            </div>
            <Button
              type="button"
              size="icon"
              className="rounded-full bg-primary hover:bg-primary/90"
              onClick={handleSendMessage}
              disabled={!message.trim() && !attachment}
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </div>
        
        <div className="text-xs text-gray-400 mt-1.5 px-1">
          Press Shift + Enter for a new line
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
