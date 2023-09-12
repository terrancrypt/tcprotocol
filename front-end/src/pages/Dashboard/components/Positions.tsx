import React, { useState } from "react";
import {
  Position,
  cancelPosition,
} from "../../../services/contracts/interactEngineContract";
import { sepolia, useAccount, useNetwork } from "wagmi";
import { waitForTransaction } from "@wagmi/core";
import { optimismGoerli, polygonMumbai } from "wagmi/chains";
import { Spin, message } from "antd";
import { approveTcUSD } from "../../../services/contracts/interactTcUSDContract";

interface PositionsProps {
  positionsInfo: Position[] | undefined;
  onCallback: () => void;
}

const Positions: React.FC<PositionsProps> = ({ positionsInfo, onCallback }) => {
  // Local State Variables
  const [txLoading, setTxLoading] = useState<boolean>(false);

  // Antd
  const [messageApi, contextHolder] = message.useMessage();

  // Wagmi hooks
  const { address: userAddress } = useAccount();
  const { chain } = useNetwork();

  // Render function
  const renderChain = (chainId: number) => {
    if (chainId == sepolia.id) {
      return sepolia.name;
    } else if (chainId == polygonMumbai.id) {
      return polygonMumbai.name;
    } else if (chainId == optimismGoerli.id) {
      return optimismGoerli.name;
    }
  };

  const handleCancelPosition = async (
    chainId: number,
    positionId: number,
    amount: number
  ) => {
    try {
      setTxLoading(true);
      messageApi.open({
        type: "loading",
        content: "Transaction in progress...",
        duration: 0,
      });
      if (chain != undefined) {
        if (chainId != chain.id) {
          message.info(
            "You must be change your current network to cancel this position!"
          );
          messageApi.destroy();
          return;
        }
        const hash = await approveTcUSD(chainId, amount, userAddress as any);
        if (hash) {
          const wait = await waitForTransaction({ chainId, hash });
          if (wait) {
            message.success("Approve Success!");
            const cancelFunctionHash = await cancelPosition(
              chainId,
              positionId,
              userAddress as any
            );
            if (cancelFunctionHash) {
              const waitForCancel = await waitForTransaction({
                chainId,
                hash: cancelFunctionHash,
              });
              if (waitForCancel) {
                message
                  .success("Cancel Position Success!")
                  .then(() => messageApi.destroy());
                onCallback();
              }
            }
          }
        }
      }
    } catch (error) {
      message.error("Transaction failed!");
    } finally {
      setTxLoading(false);
      messageApi.destroy();
    }
  };

  const renderPositions = (): React.ReactNode => {
    return (
      <>
        {contextHolder}
        <Spin spinning={txLoading}>
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className=" text-gray-700 bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Chain
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount Collateral
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount tcUSD Borrowed
                </th>
                <th scope="col" className="px-6 py-3">
                  Health Factor
                </th>
                <th scope="col" className="px-6 py-3">
                  {" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {positionsInfo?.map((item, index) => (
                <tr className="bg-white border-b" key={index}>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {renderChain(item.chainId)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold">
                      {parseFloat(item.amountCollateral).toLocaleString()}
                    </span>{" "}
                    {item.collateralSymbol}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold">
                      {parseFloat(item.amountTCUSD).toLocaleString()}
                    </span>{" "}
                    tcUSD
                  </td>
                  <td className="px-6 py-4">
                    {parseFloat(item.heathFactor).toLocaleString()}
                  </td>
                  <td className="py-4 ">
                    <button
                      className="button-main"
                      onClick={() =>
                        handleCancelPosition(
                          item.chainId,
                          item.positionId,
                          Number(item.amountTCUSD)
                        )
                      }
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Spin>
      </>
    );
  };

  return <>{renderPositions()}</>;
};

export default Positions;
