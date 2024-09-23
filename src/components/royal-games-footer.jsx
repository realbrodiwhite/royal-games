"use client";
import React from "react";
import RoyalGamesGlobalStylesheet from "../components/royal-games-global-stylesheet";
import * as ShadcnUI from "@/design-libraries/shadcn-ui";

function RoyalGamesFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <RoyalGamesGlobalStylesheet />
      <footer className="bg-[#293044] text-white py-1 mt-1">
        <div className="container mx-auto text-center">
          <p className="mb-1 text-xs">
            &copy; {currentYear} Royal Games by Brodi Branded Inc. All rights
            reserved.
          </p>
          <img
            src="https://ucarecdn.com/8c572152-3325-4027-89b3-0d6cb48dbc29/-/format/auto/"
            alt="Royal Games Logo"
            className="mx-auto w-auto h-[1.1em]"
          />
        </div>
      </footer>
    </div>
  );
}

function RoyalGamesFooterStory() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="p-4">
          <h1 className="text-2xl mb-4">Main Content</h1>
          <p>
            This is some example content to show the footer at the bottom of the
            page.
          </p>
        </div>
      </div>
      <RoyalGamesFooter />
    </div>
  );
}

export default RoyalGamesFooter;