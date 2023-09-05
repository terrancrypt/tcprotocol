import React from "react";
import FaucetInformation from "./components/FaucetInformation";
import FaucetTokenList from "./components/FaucetTokenList";
import { useNetwork } from "wagmi";

const FaucetPage: React.FC = () => {
  const { chain } = useNetwork();

  return (
    <div className="justify-center container mx-auto">
      {/* title & description */}
      <div className="text-center mb-12 px-20">
        <h1 className="text-gray-200 text-5xl font-bold">FAUCET</h1>
      </div>

      <div className="rounded-lg flex space-x-4">
        {/* information board */}
        {chain ? (
          <>
            <FaucetInformation chainName={chain ? chain.name : ""} />
            <FaucetTokenList chainId={chain ? chain.id : ""} />
          </>
        ) : (
          <p className="text-white text-center w-full">
            "You need to connect your wallet to see this page!"
          </p>
        )}
      </div>
    </div>
  );
};

export default FaucetPage;
