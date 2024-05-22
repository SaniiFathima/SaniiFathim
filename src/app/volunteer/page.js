"use client";

import React, { useEffect, useState } from "react";
import LandingCard from "../../components/UI/LandingCard";
import { useNGOContract } from "../../hooks/contractHooks";

export default function Page() {
  const { contractInstance, address } = useNGOContract();
  const [volunteerName, setVolunteerName] = useState("");

  useEffect(() => {
    const fetchVolunteerName = async () => {
      if (contractInstance && address) {
        const name = await contractInstance.getVolunteerName(address);
        setVolunteerName(name);
      }
    };
    fetchVolunteerName();
  }, [contractInstance, address]);

  return (
    <div className="min-h-screen bg-black py-10 px-4 flex flex-col items-center">
      <div className="relative w-full flex justify-center items-center mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-black opacity-75 rounded-xl"></div>
        <h1 className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-extrabold font-space text-white p-6 text-center animate-bounce">
          Welcome, {volunteerName || "Volunteer"}
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full px-4">
        <LandingCard
          title="View your activities"
          description="Track and manage the activities you have registered for."
          image="/ngo-signup.png"
          button="Dashboard"
          actionRoute="/volunteer/dashboard"
        />
        <LandingCard
          title="View all the activities"
          description="Browse and participate in various volunteer activities."
          image="/ngo-dashboard.png"
          button="View"
          actionRoute="/volunteer/marketplace"
        />
      </div>
    </div>
  );
}
