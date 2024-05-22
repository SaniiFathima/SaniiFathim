import React from 'react';
import Head from 'next/head';
import GoBackButton from "../../components/UI/GoBackButton";

export default function About() {
  return (
    <>
      <Head>
        <title>About Us</title>
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About Our NGO Management System</h1>
        <p className="max-w-2xl text-center text-lg text-gray-700 mb-4">
          Our platform leverages blockchain technology to enhance transparency, security, and efficiency in NGO management. 
          With blockchain, we ensure that all transactions and records are immutable, verifiable, and easily auditable, 
          providing a trustless system that empowers NGOs and their stakeholders.
        </p>
        <p className="max-w-2xl text-center text-lg text-gray-700">
          This site helps manage volunteers, donations, and various NGO operations seamlessly, 
          ensuring that all activities are transparent and accountable.
        </p>
      </div>
      <GoBackButton />
    </>
  );
}
