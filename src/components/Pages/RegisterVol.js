"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useInstance } from "../../../src/hooks/contractHooks";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { contractInstance, address } = useInstance();

  const handleEvent = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log(name, email, phone, address);
      await contractInstance.setVolunteerToContract(name, email, phone, address);
      router.push("/volunteer");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-200 p-4">
      <form className="space-y-6" onSubmit={handleEvent}>
        <h5 className="text-2xl font-space text-gray-900 dark:text-black">
          Please enter your details
        </h5>
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-base font-space text-gray-900 dark:text-black"
          >
            Your Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-50 border border-gray-300 placeholder:font-space text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
            placeholder="John Doe"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-base font-space text-gray-900 dark:text-black"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 placeholder:font-space text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
            placeholder="john.doe@example.com"
            required
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block mb-2 text-base font-space text-gray-900 dark:text-black"
          >
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-gray-50 border border-gray-300 placeholder:font-space text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
            placeholder="123-456-7890"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full text-white !bg-amber-700 hover:!bg-amber-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-space rounded-lg text-xl px-5 py-2.5 text-center"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Register"}
        </button>
      </form>
    </div>
  );
}
