"use client";

import React from "react";
import Register from "../../../components/Pages/Register";
import GoBackButton from "../../../components/UI/GoBackButton";
import Image from "next/image";


export default function page() {

  return (
    <>
      <div className="flex flex-row justify-center items-center mt-10 mb-44">
        <div className="mr-44">
          <div className="mb-10">
            <GoBackButton />
          </div>
          <Register />
        </div>
        <Image src="/formfill.png" height={650} width={650} alt="" />
      </div>
    </>
  );
}
