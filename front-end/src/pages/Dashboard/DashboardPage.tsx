import React, { useState, useEffect } from "react";
import {
  Position,
  getAllPositionsInformation,
} from "../../services/contracts/interactEngineContract";
import { sepolia, useAccount, useNetwork } from "wagmi";
import { optimismGoerli, polygonMumbai } from "wagmi/chains";
import Positions from "./components/Positions";
import { Spin, message } from "antd";
import AllCollateralDeposited from "./components/AllCollateralDeposited";

const DashboardPage: React.FC = () => {
  // Local State
  const [positions, setPostions] = useState<Position[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [callback, setCallback] = useState<boolean>(false);

  // Wagmi
  const { address } = useAccount();
  const { chain } = useNetwork();

  // Chains
  const chains = [sepolia.id, polygonMumbai.id, optimismGoerli.id];

  // Fetch Functionals
  const fetchPostions = async () => {
    setIsLoading(true);
    try {
      const result = await getAllPositionsInformation(chains, address as any);
      if (result) {
        setPostions(result);
      }
    } catch (error) {
      message.error("Can't fetch data!");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Callback
  const handleCallback = () => {
    setCallback(!callback);
  };

  useEffect(() => {
    fetchPostions();
  }, [chain, callback]);

  return (
    <>
      <div className="justify-center container mx-auto">
        <div className="text-center mb-12 px-20">
          <h1 className="text-gray-200 text-5xl font-bold mb-16">DASHBOARD</h1>
          {chain ? (
            <div className="flex justify-between gap-2 items-start">
              <div className=" flex-[0.5]">
                <h2 className="text-gray-200 text-xl font-bold mb-4 uppercase">
                  Your Collateral Deposited In Protocol
                </h2>
                <AllCollateralDeposited />
              </div>
              <div className="flex-1">
                <h2 className="text-gray-200 text-xl font-bold mb-4 uppercase">
                  Your Active Positions
                </h2>
                {isLoading ? (
                  <Spin size="large" />
                ) : (
                  <Positions
                    positionsInfo={positions}
                    onCallback={handleCallback}
                  />
                )}
              </div>
            </div>
          ) : (
            <p className="text-white">
              "You need to connect your wallet to see this page!"
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
