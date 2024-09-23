"use client";
import React from "react";
import RoyalGamesGlobalStylesheet from "../components/royal-games-global-stylesheet";
import GameTypesLink from "../components/game-types-link";
import RoyalGamesLeaderboardLink from "../components/royal-games-leaderboard-link";
import CreditExchangeLink from "../components/credit-exchange-link";
import * as ShadcnUI from "@/design-libraries/shadcn-ui";

function RoyalGamesResponsiveHeader() {
  const [isSearchVisible, setIsSearchVisible] = React.useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);

  const toggleSearch = () => setIsSearchVisible(!isSearchVisible);
  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);

  return (
    <>
      <RoyalGamesGlobalStylesheet />
      <header
        className="bg-[#293044] px-4 py-2 flex items-center justify-between"
        role="banner"
      >
        <div className="flex items-center">
          <img
            src="https://ucarecdn.com/35b300c3-a162-413f-af5d-5ab6256750be/-/format/auto/"
            alt="Royal Games Logo"
            className="h-10 w-auto mr-4"
            loading="lazy"
          />
          <nav className="hidden md:flex space-x-4" role="navigation">
            <GameTypesLink href="/games" />
            <RoyalGamesLeaderboardLink href="/leaderboard" />
            <CreditExchangeLink href="/exchange" />
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          {isSearchVisible && (
            <input
              type="text"
              placeholder="Search..."
              className="bg-white text-black px-2 py-1 rounded"
              aria-label="Search"
            />
          )}
          <button
            onClick={toggleSearch}
            className="text-white text-2xl"
            aria-label="Toggle search"
          >
            <i className="fas fa-search"></i>
          </button>
          <button className="text-white text-2xl" aria-label="Notifications">
            <i className="fas fa-bell"></i>
          </button>
          <button className="text-white text-2xl" aria-label="Help">
            <i className="fas fa-question-circle"></i>
          </button>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center"
              aria-haspopup="true"
              aria-expanded={isDropdownVisible}
            >
              <img
                src="/path/to/user-avatar.jpg"
                alt="User Avatar"
                className="h-10 w-10 rounded-full"
                loading="lazy"
              />
            </button>
            {isDropdownVisible && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-700">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Profile
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Settings
                </a>
                <a
                  href="/account/logout"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

function RoyalGamesResponsiveHeaderStory() {
  return (
    <div className="w-full">
      <RoyalGamesResponsiveHeader />
    </div>
  );
}

export default RoyalGamesResponsiveHeader;