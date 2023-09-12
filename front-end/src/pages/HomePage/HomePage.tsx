import React from "react";
import { NavLink } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)] ">
      <div className="mx-auto px-4 text-center max-w-screen-lg">
        <h1 className="text-gray-200 text-7xl font-bold mb-8">
          Stable Coin? Make it Easy!
        </h1>
        <p className="text-gray-200 text-lg md:text-xl lg:text-2xl mb-12">
          A project created by{" "}
          <a
            className="underline"
            href="https://github.com/terrancrypt"
            target="_blank"
          >
            terrancrypt
          </a>{" "}
          to create a place for you to borrow stablecoins with no interest, no
          fees, no time wasted!
        </p>
        <NavLink to={"/borrow"}>
          <button className="bg-[#0f1841] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-brown-600 hover:bg-blue-900 transition-all duration-300">
            Get Started
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default HomePage;
