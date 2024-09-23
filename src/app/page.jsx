"use client";

import React from "react";
import { userSession } from "next-auth/react";
import RoyalGamesGlobalStylesheet from "../components/royal-games-global-stylesheet";
import RoyalGamesLayout from "../components/royal-games-layout";
import * as ShadcnUI from "@/design-libraries/shadcn-ui";

function MainComponent() {
  const { data: session, status } = useSession();
  const [userProfile, setUserProfile] = React.useState(null);
  const [userCredits, setUserCredits] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      setLoading(true);
      Promise.all([
        fetchUserProfile(session.user.id),
        fetchUserCredits(session.user.id),
      ]).finally(() => setLoading(false));
    }
  }, [status, session]);

  const fetchUserProfile = async (userId) => {
    try {
      const response = await fetch("/api/db/royalgames-users", {
        method: "POST",
        body: JSON.stringify({
          query: "SELECT * FROM `user_accounts` WHERE `id` = ?",
          values: [userId],
        }),
      });
      const data = await response.json();
      if (data.length > 0) {
        setUserProfile(data[0]);
      } else {
        await createUserProfile(session.user);
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  const fetchUserCredits = async (userId) => {
    try {
      const response = await fetch("/api/db/extended-user-details", {
        method: "POST",
        body: JSON.stringify({
          query: "SELECT * FROM `user_credits` WHERE `user_id` = ?",
          values: [userId],
        }),
      });
      const data = await response.json();
      if (data.length > 0) {
        setUserCredits(data[0]);
      } else {
        await createUserCredits(userId);
      }
    } catch (error) {
      console.error("Failed to fetch user credits:", error);
    }
  };

  const createUserProfile = async (user) => {
    try {
      await fetch("/api/db/royalgames-users", {
        method: "POST",
        body: JSON.stringify({
          query:
            "INSERT INTO `user_accounts` (`id`, `name`, `email`, `image`) VALUES (?, ?, ?, ?)",
          values: [user.id, user.name, user.email, user.image || ""],
        }),
      });
      setUserProfile(user);
    } catch (error) {
      console.error("Failed to create user profile:", error);
    }
  };

  const createUserCredits = async (userId) => {
    try {
      await fetch("/api/db/extended-user-details", {
        method: "POST",
        body: JSON.stringify({
          query:
            "INSERT INTO `user_credits` (`user_id`, `credit_balance`) VALUES (?, ?)",
          values: [userId, 0],
        }),
      });
      setUserCredits({ user_id: userId, credit_balance: 0 });
    } catch (error) {
      console.error("Failed to create user credits:", error);
    }
  };

  const updateUserProfile = async (updatedProfile) => {
    try {
      await fetch("/api/db/royalgames-users", {
        method: "POST",
        body: JSON.stringify({
          query:
            "UPDATE `user_accounts` SET `name` = ?, `email` = ?, `image` = ? WHERE `id` = ?",
          values: [
            updatedProfile.name,
            updatedProfile.email,
            updatedProfile.image,
            updatedProfile.id,
          ],
        }),
      });
      setUserProfile(updatedProfile);
    } catch (error) {
      console.error("Failed to update user profile:", error);
    }
  };

  const updateUserCredits = async (updatedCredits) => {
    try {
      await fetch("/api/db/extended-user-details", {
        method: "POST",
        body: JSON.stringify({
          query:
            "UPDATE `user_credits` SET `credit_balance` = ? WHERE `user_id` = ?",
          values: [updatedCredits.credit_balance, updatedCredits.user_id],
        }),
      });
      setUserCredits(updatedCredits);
    } catch (error) {
      console.error("Failed to update user credits:", error);
    }
  };

  return (
    <div>
      <RoyalGamesGlobalStylesheet />
      {loading ? <div>Loading...</div> : <RoyalGamesLayout />}
      <style jsx global>{`
        @keyframes rotateLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .game-carousel {
          animation: rotateLeft 20s linear infinite;
          display: flex;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;