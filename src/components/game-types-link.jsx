"use client";
import React from "react";
import * as ShadcnUI from "@/design-libraries/shadcn-ui";

function GameTypesLink({ href }) {
  return (
    <a
      href={href}
      className="text-white hover:text-[#ffcc00] transition-colors font-roboto inline-block"
    >
      Games
    </a>
  );
}

function GameTypesLinkStory() {
  return (
    <div className="w-full">
      <GameTypesLink href="/games" />
    </div>
  );
}

export default GameTypesLink;