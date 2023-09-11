import React from "react";
import { Position } from "../../../services/contracts/interactEngineContract";
import { sepolia } from "wagmi";
import { optimismGoerli, polygonMumbai } from "wagmi/chains";

interface PositionsProps {
  positionsInfo: Position[] | undefined;
}

const Positions: React.FC<PositionsProps> = ({ positionsInfo }) => {
  const chains = [sepolia.id, polygonMumbai.id, optimismGoerli.id];

  const renderChain = (chainId: number) => {
    if (chainId == sepolia.id) {
      return sepolia.name;
    } else if (chainId == polygonMumbai.id) {
      return polygonMumbai.name;
    } else if (chainId == optimismGoerli.id) {
      return optimismGoerli.name;
    }
  };

  const renderPositions = (): React.ReactNode => {
    return (
      <div>
        {positionsInfo?.map((item, index) => (
          <div key={index}>
            <p>Chain: {renderChain(item.chainId)}</p>
            <p>
              Amount Collateral:{" "}
              {parseFloat(item.amountCollateral).toLocaleString()}
            </p>
            <p>Amount tcUSD: {parseFloat(item.amountTCUSD).toLocaleString()}</p>
            <p>HealthFactor: {parseFloat(item.heathFactor).toLocaleString()}</p>
          </div>
        ))}
      </div>
    );
  };

  return <>{renderPositions()}</>;
};

export default Positions;
