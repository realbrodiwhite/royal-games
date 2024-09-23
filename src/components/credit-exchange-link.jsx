"use client";
import React from "react";
import * as ShadcnUI from "@/design-libraries/shadcn-ui";

function CreditExchangeLink({ href }) {
  const linkClass =
    "text-white hover:text-[#f7b32b] text-[min(5vh,16px)] hidden md:inline-block";
  return (
    <a href={href} className={linkClass}>
      Credit Exchange
    </a>
  );
}

function CreditExchangeLinkStory() {
  return (
    <div className="w-full flex justify-start">
      <CreditExchangeLink href="#" />
    </div>
  );
}

export default CreditExchangeLink;