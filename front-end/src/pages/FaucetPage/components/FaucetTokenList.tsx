import React, { useState, useEffect } from "react";
import {
  mockWBTCContract,
  mockWETHContract,
} from "../../../services/contracts/contractList";
import { Spin, message } from "antd";
import {
  fetchTokenBalance,
  writeFaucet,
} from "../../../services/contracts/interactTokenContract";
import { useAccount } from "wagmi";
import { waitForTransaction } from "@wagmi/core";

interface FaucetTokenListProps {
  chainId: string | number;
}

const FaucetTokenList: React.FC<FaucetTokenListProps> = ({ chainId }) => {
  const [wETHAddress, setWETHAddress] = useState<string>("");
  const [wBTCAddress, setWBTCAddress] = useState<string>("");
  const [wETHBalance, setWETHBalance] = useState<string>("");
  const [wBTCBalance, setWBTCBalance] = useState<string>("");
  const [blockScan, setBlockScan] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { address } = useAccount();

  const fetchBalance = async () => {
    try {
      const wethBalance = await fetchTokenBalance(
        Number(chainId),
        mockWETHContract[Number(chainId)].address,
        address as any
      );
      const wbtcBalance = await fetchTokenBalance(
        Number(chainId),
        mockWBTCContract[Number(chainId)].address,
        address as any
      );
      setWETHBalance(parseFloat(wethBalance).toFixed(2));
      setWBTCBalance(parseFloat(wbtcBalance).toFixed(2));
    } catch (error) {
      message.error("Can't fetch token balance in your wallet!");
    }
  };

  useEffect(() => {
    if (
      mockWETHContract.hasOwnProperty(chainId) &&
      mockWBTCContract.hasOwnProperty(chainId)
    ) {
      setWETHAddress(mockWETHContract[Number(chainId)].address);
      setWBTCAddress(mockWBTCContract[Number(chainId)].address);
    } else {
      message.error("Fetch Failed!");
    }
    if (chainId == 11155111) {
      setBlockScan("https://sepolia.etherscan.io/");
    } else if (chainId == 80001) {
      setBlockScan("https://mumbai.polygonscan.com/");
    } else if (chainId == 420) {
      setBlockScan("https://goerli-optimism.etherscan.io/");
    }
    fetchBalance();
  }, [chainId]);

  const getFaucet = async (tokenAddress: string) => {
    try {
      setIsLoading(true);
      const hash = await writeFaucet(
        Number(chainId),
        tokenAddress,
        address as any
      );
      if (hash == null) {
        message.error("Failed");
      }
      message.info("Transaction confirmed!");
      const data = await waitForTransaction({
        chainId: Number(chainId),
        hash: hash as any,
      });
      if (data) {
        message.success("Transaction success!");
      } else {
        message.error("Transaction failed!");
      }
    } catch (error) {
      message.error("Failed!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="shadow-md flex-1 bg-white rounded-lg">
      <table className="min-w-full divide-y divide-gray-200 text-center">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider"
            >
              Token Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider"
            >
              Balance
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider"
            >
              Faucet
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">WETH</div>
              <div className="text-sm text-gray-500">
                <a
                  href={`${blockScan}address/${wETHAddress}`}
                  target="_blank"
                  className="text-cyan-800 hover:underline"
                >
                  {chainId == 80001 ? "PolygonScan" : "EtherScan"}
                </a>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{wETHBalance}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {isLoading ? (
                <Spin size="small" />
              ) : (
                <button
                  className="px-4 py-2 button-main rounded-md"
                  onClick={() => getFaucet(wETHAddress)}
                >
                  Faucet
                </button>
              )}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">WBTC</div>
              <div className="text-sm text-gray-500">
                <a
                  href={`${blockScan}address/${wBTCAddress}`}
                  target="_blank"
                  className="text-cyan-800 hover:underline"
                >
                  {chainId == 80001 ? "PolygonScan" : "EtherScan"}
                </a>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{wBTCBalance}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {isLoading ? (
                <Spin size="small" />
              ) : (
                <button
                  className="px-4 py-2 button-main rounded-md"
                  onClick={() => getFaucet(wBTCAddress)}
                >
                  Faucet
                </button>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FaucetTokenList;
