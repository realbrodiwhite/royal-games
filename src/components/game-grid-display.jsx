"use client";
import React from "react";
import RoyalGamesGlobalStylesheet from "../components/royal-games-global-stylesheet";
import * as ShadcnUI from "@/design-libraries/shadcn-ui";

function GameGridDisplay() {
  const [activeCategory, setActiveCategory] = React.useState("All");
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const categories = [
    "Board Games",
    "Lottery Tickets",
    "Scratcher Tickets",
    "Slot Games",
    "Sports Bets",
    "Table Games",
    "All",
  ];

  const games = {
    "Slot Games": [
      "Duck Hunt",
      "Egyptian Treasure",
      "Lucky 13's",
      "Mega Moolah",
      "Rap Star",
      "Rock Climbers",
      "Slot Shottas",
      "Starburst",
      "Trenchbabies",
    ],
    "Board Games": [
      "Bingo",
      "Checkers",
      "Chess",
      "Clue",
      "Coin Flip",
      "Monopoly",
      "Rock Paper Scissors",
      "TicTacToe",
    ],
    "Table Games": ["Baccarat", "Blackjack", "Craps", "Poker", "Roulette"],
    "Lottery Tickets": [
      "Daily Double Down",
      "Lotto Royale",
      "Mega Monthly",
      "Weekly Winners",
    ],
    "Scratcher Tickets": ["Cashout Colorado", "Half Stepper", "Lucky Scratch"],
    "Sports Bets": [
      "Dog Racing",
      "Horse Racing",
      "MLB",
      "MLS",
      "NASCAR",
      "NBA",
      "NCAA",
      "NFL",
      "NHRA",
      "NHL",
    ],
    All: [],
  };

  games["All"] = Object.values(games).flat();

  const filteredGames = games[activeCategory];

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setCurrentIndex(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, Math.max(0, filteredGames.length - 5))
    );
  };

  const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsla(${hue}, 70%, 50%, 0.7)`;
  };

  const visibleGames = filteredGames.slice(currentIndex, currentIndex + 5);

  return (
    <div className="w-full px-4 md:px-8 py-6">
      <h1 className="sr-only">Game Categories</h1>

      <div className="flex flex-wrap justify-center mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`m-1 px-5 py-3 text-base md:text-lg font-bold rounded-full transition-colors duration-300 ${
              activeCategory === category
                ? "bg-[#f7b32b] text-[#1b1f38]"
                : "bg-[#293044] text-white hover:bg-[#f7b32b] hover:text-[#1b1f38]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="relative">
        <button
          onClick={handlePrev}
          className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-100 text-white p-3 rounded-full transition-all duration-300 text-2xl md:text-4xl"
        >
          <i className="fas fa-chevron-left"></i>
        </button>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 20}%)` }}
          >
            {visibleGames.map((game, index) => (
              <div
                key={game}
                className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2 flex-shrink-0 transition-all duration-300 ${
                  index === Math.floor(visibleGames.length / 2)
                    ? "scale-110 z-10"
                    : "scale-100"
                }`}
              >
                <div className="bg-[#1b1f38] rounded-3xl shadow-lg p-4 h-full flex flex-col justify-between">
                  <div>
                    <img
                      src={`/images/${game
                        .toLowerCase()
                        .replace(/\s+/g, "-")}.jpg`}
                      alt={game}
                      className="w-full h-40 object-cover rounded-2xl mb-4"
                    />
                    <h3 className="text-white font-bold text-center mb-2 text-xl">
                      {game}
                    </h3>
                    <div className="flex flex-wrap justify-center mb-2">
                      {["#Action", "#Fun", "#Exciting"].map((tag) => (
                        <span
                          key={tag}
                          className="text-xs m-1 px-2 py-1 rounded-full"
                          style={{ backgroundColor: getRandomColor() }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-white text-sm text-center mb-4 line-clamp-3 min-h-[4.5em]">
                      {`Enjoy the thrilling game of ${game}. Place your bets and test your luck in this exciting adventure! (${
                        Math.floor(Math.random() * 50) + 100
                      } chars)`}
                    </p>
                  </div>
                  <button className="bg-[#f7b32b] text-[#1b1f38] font-bold py-2 px-4 rounded-full hover:bg-[#f89c1c] transition-colors duration-300 mt-auto mx-auto w-full max-w-[200px]">
                    Play Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-100 text-white p-3 rounded-full transition-all duration-300 text-2xl md:text-4xl"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      <style jsx global>{`
        @keyframes scaleUp {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .scale-110 {
          animation: scaleUp 0.3s forwards;
        }
      `}</style>
    </div>
  );
}

function GameGridDisplayStory() {
  return (
    <div className="bg-[#0a0f23] min-h-screen">
      <RoyalGamesGlobalStylesheet />
      <GameGridDisplay />
    </div>
  );
}

export default GameGridDisplay;