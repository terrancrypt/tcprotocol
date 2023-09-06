import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNetwork } from "wagmi";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import BorrowStep from "./components/BorrowStep";

const BorrowDetailPage: React.FC = () => {
  const collateralList = useSelector(
    (state: RootState) => state.collateralSlice
  );
  const { chain } = useNetwork();
  const { vaultId, chainName } = useParams();
  let vaultInformation;
  if (Object.keys(collateralList).length != 0 && chainName) {
    vaultInformation = collateralList[chainName].vaults[Number(vaultId)];
  }

  return (
    <>
      {Object.keys(collateralList).length === 0 ? (
        <Spin />
      ) : (
        <>
          {chain == null ? (
            <div>You need to connect wallet to see this page!</div>
          ) : (
            <div className="flex justify-between text-white gap-4">
              <div className="bg-white text-[#0f1841] p-4 rounded-lg space-y-4 flex-[0.3] shadow-md">
                <h1 className="text-2xl font-bold">
                  {vaultInformation?.vaultSymbol} Vault
                </h1>
                <p>Network: {chainName}</p>
                <p>
                  Total Deposited:{" "}
                  {parseFloat(vaultInformation?.balance as string).toFixed(2)}
                </p>
                <p>Total Value: ${vaultInformation?.valueInUSD}</p>
              </div>
              <div className="flex-1 p-4 bg-white text-black rounded-lg shadow-md">
                {chain.name == chainName ? (
                  <BorrowStep />
                ) : (
                  <p>You need to change the network.</p>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default BorrowDetailPage;
