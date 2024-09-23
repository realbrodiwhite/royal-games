"use client";
import React from "react";
import RoyalGamesGlobalStylesheet from "../components/royal-games-global-stylesheet";
import * as ShadcnUI from "@/design-libraries/shadcn-ui";

function RoyalGamesWelcomeUser({ userName, isNewUser, userTitle }) {
  const { data: session, status } = useSession();
  const welcomePhrases = [
    `Hark! {USERNAME} approaches!`,
    `Greetings, noble {USERNAME}!`,
    `Well met, {USERNAME}!`,
    `Welcome back, {USERNAME}!`,
    `Salutations, {USERNAME}!`,
    `Ho there, {USERNAME}!`,
    `A fine day to you, {USERNAME}!`,
    `May your quests be fruitful, {USERNAME}!`,
    `The realm rejoices at your return, {USERNAME}!`,
    `Your presence honors us, {USERNAME}!`,
    `Ah, the illustrious {USERNAME} graces us!`,
    `By the gods, it's {USERNAME}!`,
    `Hear ye, hear ye! {USERNAME} has arrived!`,
    `Welcome to our humble abode, {USERNAME}!`,
    `The stars shine brighter with {USERNAME} here!`,
    `A royal welcome to you, {USERNAME}!`,
    `Your legend precedes you, {USERNAME}!`,
    `The kingdom flourishes with {USERNAME}'s return!`,
    `Blessings upon you, {USERNAME}!`,
    `May fortune favor you, {USERNAME}!`,
  ];

  const speakers = [
    "the Fairest Maiden",
    "Court Jester",
    "Sir Alfred",
    "Local Peasant",
    "Brom the Blacksmith",
    "Town Beggar",
  ];

  const getRandomWelcomePhrase = () => {
    const phrase =
      welcomePhrases[Math.floor(Math.random() * welcomePhrases.length)];
    const speaker = speakers[Math.floor(Math.random() * speakers.length)];
    const useUserName = Math.random() < 0.7 && userName;
    return `"${phrase.replace(
      "{USERNAME}",
      useUserName ? userName : userTitle || "adventurer"
    )}" said ${speaker}`;
  };

  const welcomePhrase = getRandomWelcomePhrase();

  return (
    <div className="relative w-full" style={{ aspectRatio: "2/1" }}>
      <RoyalGamesGlobalStylesheet />
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src="https://ucarecdn.com/35b300c3-a162-413f-af5d-5ab6256750be/-/format/auto/"
          alt="Royal Games Logo"
          className="w-full h-full object-cover opacity-25"
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-4/5 text-center">
          <p
            className="text-sm font-bold italic text-[#f7b32b] px-2"
            style={{
              textShadow:
                "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
            }}
          >
            {welcomePhrase}
          </p>
        </div>
      </div>
    </div>
  );
}

function RoyalGamesWelcomeUserStory() {
  return (
    <div>
      <RoyalGamesWelcomeUser
        userName="Arthur"
        isNewUser={false}
        userTitle="King"
      />
      <RoyalGamesWelcomeUser
        userName="Guinevere"
        isNewUser={false}
        userTitle="Queen"
      />
      <RoyalGamesWelcomeUser
        userName="Lancelot"
        isNewUser={true}
        userTitle="Sir"
      />
      <RoyalGamesWelcomeUser />
    </div>
  );
}

export default RoyalGamesWelcomeUser;