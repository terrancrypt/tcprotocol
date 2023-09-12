import React from "react";
import Connect from "../Connect/Connect";
import SwitchNetwork from "../SwitchNetwork/SwitchNetwork";
import { NavLink } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="h-[60px] container mx-auto px-6 sm:px-8 2xl:px-0">
        <div className="flex h-full justify-between items-center text-white">
          <NavLink className="h-full" to="/">
            <img
              src="imgs/tcp-logo-bgtrans-white.png"
              alt=""
              className="h-full"
            />
          </NavLink>

          <nav className="space-x-6 text-gray-200">
            <NavLink to="/dashboard" className="hover:underline transition-all">
              Dashboard
            </NavLink>
            <NavLink to="/borrow" className="hover:underline transition-all">
              Borrow
            </NavLink>
            <NavLink to="/faucet" className="hover:underline transition-all">
              Faucet
            </NavLink>
            <a
              href="https://github.com/terrancrypt/web3hackfest#tc-protocol"
              target="_blank"
              className="hover:underline transition-all"
            >
              Documentation
            </a>
          </nav>
          <div className="flex items-center space-x-2">
            <SwitchNetwork />
            <Connect />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
