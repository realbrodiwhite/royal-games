"use client";
import React from "react";
import * as ShadcnUI from "@/design-libraries/shadcn-ui";

function RoyalGamesChatWidget({
  isOpen,
  toggleWidget,
  selectedThread,
  messages,
  newMessage,
  setNewMessage,
  handleSendMessage,
  contacts,
  handleSelectThread,
  hasNewMessages,
  hasNotifications,
  isAdmin,
  handleAIAssistantChat,
  handleDataAnalystChat,
}) {
  const { data: session, status } = useSession();
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={`fixed bottom-4 right-4 transition-all duration-300 ${
        isOpen ? "w-80 h-96" : "w-16 h-16"
      }`}
    >
      {isOpen ? (
        <div className="flex flex-col h-full bg-transparent rounded-lg shadow-lg overflow-hidden">
          <div className="bg-[#1b1f38] text-white p-3 flex justify-between items-center">
            <h3 className="font-bold">Royal Games Comms</h3>
            <button
              onClick={toggleWidget}
              className="text-white hover:text-gray-200"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="flex-grow overflow-y-auto p-3 bg-white bg-opacity-80">
            {selectedThread ? (
              <div className="h-full flex flex-col">
                <div className="flex-grow overflow-y-auto mb-3">
                  {messages
                    .filter((m) => m.threadId === selectedThread.id)
                    .map((message, index) => (
                      <div
                        key={index}
                        className={`mb-2 ${
                          message.sender === "user" ? "text-right" : "text-left"
                        }`}
                      >
                        <span
                          className={`inline-block p-2 rounded-lg ${
                            message.sender === "user"
                              ? "bg-[#f7b32b] text-[#1b1f38]"
                              : "bg-gray-200 text-[#1b1f38]"
                          }`}
                        >
                          {message.content}
                        </span>
                      </div>
                    ))}
                </div>
                <div className="flex">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-grow border rounded-l-lg p-2"
                    placeholder="Type a message..."
                    name="message"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-[#f7b32b] text-[#1b1f38] p-2 rounded-r-lg"
                  >
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div
                  onClick={() => handleAIAssistantChat()}
                  className="cursor-pointer hover:bg-gray-100 p-2 rounded mb-2"
                >
                  <i className="fas fa-robot mr-2"></i>AI Customer Support
                </div>
                {isAdmin && (
                  <div
                    onClick={() => handleDataAnalystChat()}
                    className="cursor-pointer hover:bg-gray-100 p-2 rounded mb-2"
                  >
                    <i className="fas fa-chart-bar mr-2"></i>Data Analyst AI
                  </div>
                )}
                <h4 className="font-bold mb-2">Contacts</h4>
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 mb-2 border rounded"
                  name="search"
                />
                {filteredContacts.map((contact, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelectThread(contact)}
                    className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                  >
                    {contact.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <button
          onClick={toggleWidget}
          className={`w-full h-full rounded-full bg-[#f7b32b] text-[#1b1f38] flex items-center justify-center shadow-lg ${
            hasNewMessages || hasNotifications ? "animate-pulse" : ""
          }`}
        >
          <i className="fas fa-comment-dots text-2xl"></i>
        </button>
      )}
    </div>
  );
}

function RoyalGamesChatWidgetStory() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedThread, setSelectedThread] = React.useState(null);
  const [newMessage, setNewMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const [contacts, setContacts] = React.useState([]);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const { data: session, status } = useSession();

  React.useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/db/royalgames-users", {
        method: "POST",
        body: JSON.stringify({
          query: "SELECT * FROM `user_accounts` WHERE `id` != ?",
          values: [session.user.id],
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setContacts(data.map((user) => ({ id: user.id, name: user.name })));
        });

      fetch("/api/db/extended-user-details", {
        method: "POST",
        body: JSON.stringify({
          query: "SELECT * FROM `user_credits` WHERE `user_id` = ?",
          values: [session.user.id],
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0 && data[0].credit_balance > 1000) {
            setIsAdmin(true);
          }
        });
    }
  }, [status, session]);

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([
        ...messages,
        { threadId: selectedThread.id, sender: "user", content: newMessage },
      ]);
      setNewMessage("");

      if (selectedThread.id === "ai_assistant") {
        fetch("/integrations/groq/", {
          method: "POST",
          body: JSON.stringify({
            messages: [{ role: "user", content: newMessage }],
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            setMessages((prev) => [
              ...prev,
              {
                threadId: "ai_assistant",
                sender: "ai",
                content: data.choices[0].message.content,
              },
            ]);
          });
      } else if (selectedThread.id === "data_analyst") {
        fetch("/integrations/anthropic-claude/", {
          method: "POST",
          body: JSON.stringify({
            messages: [{ role: "user", content: newMessage }],
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            setMessages((prev) => [
              ...prev,
              {
                threadId: "data_analyst",
                sender: "ai",
                content: data.choices[0].message.content,
              },
            ]);
          });
      }
    }
  };

  const handleSelectThread = (contact) => {
    setSelectedThread(contact);
  };

  const handleAIAssistantChat = () => {
    setSelectedThread({ id: "ai_assistant", name: "AI Customer Support" });
  };

  const handleDataAnalystChat = () => {
    setSelectedThread({ id: "data_analyst", name: "Data Analyst AI" });
  };

  const hasNewMessages = messages.length > 0;
  const hasNotifications = false;

  return (
    <div className="fixed bottom-4 right-4">
      <RoyalGamesChatWidget
        isOpen={isOpen}
        toggleWidget={toggleWidget}
        selectedThread={selectedThread}
        messages={messages}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
        contacts={contacts}
        handleSelectThread={handleSelectThread}
        hasNewMessages={hasNewMessages}
        hasNotifications={hasNotifications}
        isAdmin={isAdmin}
        handleAIAssistantChat={handleAIAssistantChat}
        handleDataAnalystChat={handleDataAnalystChat}
      />
    </div>
  );
}

export default RoyalGamesChatWidget;