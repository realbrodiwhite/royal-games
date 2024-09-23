"use client";
import React from "react";
import GameGridDisplay from "../components/game-grid-display";
import RoyalGamesResponsiveHeader from "../components/royal-games-responsive-header";
import RoyalGamesWelcomeUser from "../components/royal-games-welcome-user";
import RoyalGamesFooter from "../components/royal-games-footer";
import * as ShadcnUI from "@/design-libraries/shadcn-ui";

function RoyalGamesLayout() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedThread, setSelectedThread] = React.useState(null);
  const [messages, setMessages] = React.useState([]);
  const [newMessage, setNewMessage] = React.useState("");
  const [contacts, setContacts] = React.useState([]);

  const toggleWidget = () => setIsOpen(!isOpen);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([
        ...messages,
        { threadId: selectedThread?.id, sender: "user", content: newMessage },
      ]);
      setNewMessage("");
    }
  };

  const handleSelectThread = (contact) => {
    setSelectedThread(contact);
  };

  React.useEffect(() => {
    if (status === "authenticated") {
      setContacts([
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
      ]);
    }
  }, [status]);

  return (
    <BackgroundContainer>
      <RoyalGamesResponsiveHeader className="fixed top-0 w-full z-[10000]" />

      <div className="flex flex-col justify-between min-h-screen pt-16">
        <main className="flex-grow flex flex-col z-[9998]">
          <RoyalGamesWelcomeUser session={session} />
          <GameGridDisplay />
        </main>

        <div className="fixed bottom-4 right-4 z-[9999] p-4">
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
            hasNewMessages={messages.length > 0}
            hasNotifications={false}
            isAdmin={false}
            handleAIAssistantChat={() => {}}
            handleDataAnalystChat={() => {}}
          />
        </div>

        <RoyalGamesFooter className="z-[9998] mt-auto" />
      </div>
    </BackgroundContainer>
  );
}

function RoyalGamesLayoutStory() {
  return (
    <div>
      <RoyalGamesLayout />
    </div>
  );
}

export default RoyalGamesLayout;