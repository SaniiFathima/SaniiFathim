import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LandingCard({ title, description, image, button, actionRoute }) {
  const router = useRouter();

  const routeClickHandler = () => {
    router.push(actionRoute);
  };

  return (
    <div className="relative group w-full max-w-md mx-auto transform transition-transform duration-300 hover:scale-105">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-black rounded-lg shadow-lg transform -skew-y-3 group-hover:skew-y-0 transition-transform duration-300"></div>
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
        <Image
          className="rounded-t-lg"
          src={image}
          height={500}
          width={500}
          alt={title}
        />
        <div className="p-6">
          <h5 className="mb-2 text-2xl md:text-3xl font-space leading-tight text-neutral-800">
            {title}
          </h5>
          <p className="mb-4 text-base text-neutral-600">
            {description}
          </p>
          <button
            type="button"
            onClick={routeClickHandler}
            className="text-white bg-amber-500 hover:bg-amber-600 transition duration-75 ease-in font-medium rounded-lg text-base px-6 py-3.5 text-center"
          >
            {button}
          </button>
        </div>
      </div>
    </div>
  );
}
