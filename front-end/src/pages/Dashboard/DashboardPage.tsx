import React, { useState, useEffect } from "react";
import {
  Position,
  getAllPositionsInformation,
} from "../../services/contracts/interactEngineContract";
import { sepolia, useAccount } from "wagmi";
import { optimismGoerli, polygonMumbai } from "wagmi/chains";
import Positions from "./components/Positions";
import { Spin, message } from "antd";

const DashboardPage: React.FC = () => {
  // Local State
  const [positions, setPostions] = useState<Position[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Wagmi
  const { address } = useAccount();

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

  useEffect(() => {
    fetchPostions();
  }, []);

  return (
    <>
      <div className="justify-center container mx-auto">
        <div className="text-center mb-12 px-20">
          <h1 className="text-gray-200 text-5xl font-bold mb-16">DASHBOARD</h1>
          {isLoading ? (
            <Spin size="large" />
          ) : (
            <Positions positionsInfo={positions} />
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
