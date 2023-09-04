import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)] ">
      <div className="mx-auto px-4 text-center max-w-screen-lg">
        <h1 className="text-gray-200 text-7xl font-bold mb-8">
          The best place to Borrow and Earn in DeFi
        </h1>
        <p className="text-gray-200 text-lg md:text-xl lg:text-2xl mb-12">
          Power up your portfolio by Borrowing, Lending and Multiplying your favourite assets. Made Safe and Easy by industry leading automation tools.
        </p>
        <button className="bg-sky-950 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-brown-600 hover:bg-blue-900 transition-all duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HomePage;
