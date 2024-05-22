"use client";

import React, { useEffect, useState } from "react";
import LandingCard from "../../components/UI/LandingCard";
import { useNGOContract } from "../../hooks/contractHooks";

export default function Page() {
  const { contractInstance, address } = useNGOContract();
  const [ngoName, setNgoName] = useState("");

  useEffect(() => {
    const fetchNGOName = async () => {
      if (contractInstance && address) {
        const name = await contractInstance.getNGOName(address);
        setNgoName(name);
      }
    };
    fetchNGOName();
  }, [contractInstance, address]);

  return (
    <div className="bg-black py-10 px-4 flex flex-col items-center">
      <div className="relative w-full flex justify-center items-center mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-black opacity-75 rounded-xl"></div>
        <h1 className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-extrabold font-space text-white p-6 text-center animate-bounce">
          Welcome, {ngoName || "NGO"}
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full px-4">
        <LandingCard
          title="Register activity"
          description="Create an activity and invite volunteers to register for it"
          image="/ngo-signup.png"
          button="Register"
          actionRoute="/ngo/register"
        />
        <LandingCard
          title="View dashboard"
          description="Check your present activities"
          image="/ngo-dashboard.png"
          button="View"
          actionRoute="/ngo/dashboard"
        />
      </div>
    </div>
  );
}
