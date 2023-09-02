import React from "react";
import CollateralList from "./components/CollateralList";
import Connect from "../../components/Connect/Connect";
import SwitchNetwork from "../../components/SwitchNetwork/SwitchNetwork";

const BorrowPage: React.FC = () => {
  return (
    <>
      <Connect />
      <SwitchNetwork />
    </>
  );
};

export default BorrowPage;
