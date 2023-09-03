import React from "react";
import Connect from "../Connect/Connect";
import SwitchNetwork from "../SwitchNetwork/SwitchNetwork";

const Header: React.FC = () => {
  return (
    <div className="h-[60px] w-full">
      <div className="flex h-full justify-between items-center">
        <img src="imgs/tcp-logo-bgtrans.png" alt="" className="h-full" />

        <nav></nav>
        <SwitchNetwork />
        <Connect />
      </div>
    </div>
  );
};

export default Header;
