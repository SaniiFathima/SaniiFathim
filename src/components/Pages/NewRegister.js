"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useInstance } from "../../../src/hooks/contractHooks";

export default function Register() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { contractInstance, address } = useInstance();

  const handleEvent = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log(name, location, address);
      await contractInstance.setNGOToContract(name, location, address, []);
      router.push("/ngo");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-200 p-4">
      <form className="w-full max-w-md p-8 bg-gray-50 border border-gray-300 rounded-lg shadow-lg animate-fadeInUp" onSubmit={handleEvent}>
        <h5 className="text-3xl font-bold text-gray-900 text-center animate-fadeInDown mb-4">
          Register Your NGO
        </h5>
        <div className="space-y-4 animate-fadeIn">
          <label
            htmlFor="name"
            className="block mb-1 text-base font-medium text-gray-900"
          >
            Name of the NGO
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
            placeholder="Trust for Animals"
            required
          />
        </div>
        <div className="space-y-4 animate-fadeIn">
          <label
            htmlFor="location"
            className="block mb-1 text-base font-medium text-gray-900"
          >
            Location of the NGO
          </label>
          <input
            type="text"
            name="location"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Parc de la Cité"
            className="w-full p-3 text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full px-5 py-3 text-lg text-white bg-amber-600 rounded-lg font-medium text-center ${isLoading ? 'cursor-not-allowed' : 'hover:bg-amber-700'} focus:outline-none focus:ring-4 focus:ring-amber-500 animate-fadeIn`}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Register"}
        </button>
      </form>
    </div>
  );
}
