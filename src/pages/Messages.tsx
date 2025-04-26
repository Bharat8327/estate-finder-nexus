
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBox from "@/components/ChatBox";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Sample chat contacts data
const chatContacts = [
  {
    id: "1",
    name: "Rajesh Kumar",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    lastMessage: "Is the property still available? I'd like to schedule a visit this weekend.",
    timestamp: "2025-04-24T14:22:00",
    unread: true,
    propertyId: "1",
    propertyTitle: "3BHK Apartment in Whitefield"
  },
  {
    id: "2",
    name: "Priya Sharma",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    lastMessage: "Can you provide more details about the amenities available in the apartment complex?",
    timestamp: "2025-04-24T11:15:00",
    unread: true,
    propertyId: "1",
    propertyTitle: "3BHK Apartment in Whitefield"
  },
  {
    id: "3",
    name: "Amit Patel",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    lastMessage: "What is the best price you can offer for the commercial space? I'm seriously interested.",
    timestamp: "2025-04-23T16:40:00",
    unread: false,
    propertyId: "2",
    propertyTitle: "Commercial Shop Space"
  },
  {
    id: "4",
    name: "Meera Reddy",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    lastMessage: "I've seen the property and I'm interested in making an offer. Can we discuss the details?",
    timestamp: "2025-04-22T09:15:00",
    unread: false,
    propertyId: "3",
    propertyTitle: "2BHK Apartment with Balcony"
  }
];

const Messages = () => {
  const [selectedContact, setSelectedContact] = useState(chatContacts[0]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter contacts based on search query
  const filteredContacts = chatContacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    contact.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Format timestamp for display
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    
    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-primary mb-6">Messages</h1>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 h-[calc(100vh-250px)]">
              {/* Contacts List */}
              <div className="border-r flex flex-col h-full">
                <div className="p-4 border-b">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search conversations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                <ScrollArea className="flex-1">
                  {filteredContacts.map(contact => (
                    <div
                      key={contact.id}
                      className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${
                        selectedContact.id === contact.id ? "bg-gray-50" : ""
                      }`}
                      onClick={() => setSelectedContact(contact)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={contact.avatar} alt={contact.name} />
                            <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {contact.unread && (
                            <span className="absolute top-0 right-0 w-3 h-3 bg-primary rounded-full border-2 border-white"></span>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline">
                            <h4 className="font-medium text-gray-900 truncate">
                              {contact.name}
                            </h4>
                            <span className="text-xs text-gray-500 flex-shrink-0">
                              {formatTimestamp(contact.timestamp)}
                            </span>
                          </div>
                          
                          <div className="text-xs text-gray-500 mt-0.5 flex items-center">
                            <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                            <span className="truncate">{contact.propertyTitle}</span>
                          </div>
                          
                          <p className={`text-sm mt-1 truncate ${contact.unread ? "font-medium text-gray-900" : "text-gray-600"}`}>
                            {contact.lastMessage}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {filteredContacts.length === 0 && (
                    <div className="p-4 text-center text-gray-500">
                      No conversations found
                    </div>
                  )}
                </ScrollArea>
              </div>
              
              {/* Chat Area */}
              <div className="col-span-2">
                {selectedContact ? (
                  <ChatBox
                    recipientName={selectedContact.name}
                    recipientAvatar={selectedContact.avatar}
                    propertyTitle={selectedContact.propertyTitle}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    Select a conversation to start chatting
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Messages;
