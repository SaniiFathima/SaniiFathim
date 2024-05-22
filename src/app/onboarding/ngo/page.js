// Page.js
"use client";

import React, { useState, useEffect } from "react";
import RegisterOnboard from "../../../components/Pages/NewRegister";
import Image from "next/image";
import styles from "../../page.module.css"; // Import your CSS module if using CSS modules

export default function Page() {
  const [isImageVisible, setIsImageVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsImageVisible(false);
    }, 2000); // Image will fade out after 1.7 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div
        className={`relative overflow-hidden min-h-screen flex flex-col items-center justify-center ${styles.animatedBackground}`}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: "url(/register.png)" }}
        ></div>

        <div className="relative z-10 text-center mt-10 mb-20 px-4">
          <div className="text-5xl leading-tight tracking-tight font-extrabold text-white bg-opacity-50 rounded-xl p-4 animate-fadeInDown">
            Oh oh! Looks like you need to{" "}
            <span className="text-yellow-300">register</span> first.
          </div>
          <div className="text-3xl leading-tight tracking-tight font-extrabold text-white bg-opacity-50 rounded-xl p-4 mt-4 animate-fadeInUp">
            Let&apos;s get you on board
          </div>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row justify-center items-center gap-5 mt-10 mb-20 px-4 animate-fadeIn">
          {isImageVisible ? (
            <Image
              src="/login2.png"
              height={500}
              width={500}
              alt="Register"
              className="rounded-lg shadow-lg transition-opacity duration-1000 ease-in-out opacity-100"
            />
          ) : (
            <div className="w-full lg:w-1/2 mt-10 lg:mt-0">
              <RegisterOnboard />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
