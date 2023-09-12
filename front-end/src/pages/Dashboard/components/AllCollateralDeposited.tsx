import { Collapse, CollapseProps, Spin, message } from "antd";
import React, { useState, useEffect } from "react";
import { sepolia, useAccount, useNetwork } from "wagmi";
import { waitForTransaction } from "@wagmi/core";
import { optimismGoerli, polygonMumbai } from "wagmi/chains";
import {
  getCurrentVaultId,
  getUserBalanceInVault,
  getVaultAddress,
  withdrawCollateral,
} from "../../../services/contracts/interactEngineContract";
import { getTokenSymbol } from "../../../services/contracts/interactTokenContract";
import { NavLink } from "react-router-dom";

interface CollateralDeposited {
  [chainId: number]: {
    vaults: {
      vaultName: string;
      vaultId: number;
      collateralDeposited: string;
    }[];
  };
}

const AllCollateralDeposited: React.FC = () => {
  // Local State Variables
  const [collateralDeposited, setCollateralDeposited] =
    useState<CollateralDeposited>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [callback, setCallback] = useState<boolean>(false);

  // Antd
  const [messageApi, contextHolder] = message.useMessage();

  // Wagmi
  const chains = [sepolia, polygonMumbai, optimismGoerli];
  const { address: userAddress } = useAccount();
  const { chain } = useNetwork();

  const fetchCollateralDeposited = async () => {
    setIsLoading(true);
    try {
      const collateralInfor: CollateralDeposited = {};
      for (const chain of chains) {
        collateralInfor[chain.id] = { vaults: [] };

        const currentVaultId = await getCurrentVaultId(chain.id);

        if (currentVaultId != null && currentVaultId != 0) {
          for (let i = 0; i < currentVaultId; i++) {
            const vaultAddress = await getVaultAddress(chain.id, i);
            const vaultSymbol = await getTokenSymbol(
              chain.id,
              vaultAddress as any
            );
            const balanceOfUser = await getUserBalanceInVault(
              chain.id,
              i,
              userAddress as any
            );

            if (vaultSymbol && balanceOfUser) {
              collateralInfor[chain.id].vaults.push({
                vaultName: vaultSymbol,
                vaultId: i,
                collateralDeposited: balanceOfUser,
              });
            }
          }
        }
      }
      setCollateralDeposited(collateralInfor);
    } catch (error) {
      message.error("Cannot fetch collateral deposited!");
    } finally {
      setIsLoading(false);
    }
  };

  const renderChain = (chainId: number) => {
    if (chainId == sepolia.id) {
      return sepolia.name;
    } else if (chainId == polygonMumbai.id) {
      return polygonMumbai.name;
    } else if (chainId == optimismGoerli.id) {
      return optimismGoerli.name;
    }
  };

  const handleWithdrawCollateral = async (
    chainId: number,
    vaultId: number,
    amount: number
  ) => {
    try {
      if (amount == 0) {
        message.info("Amount must be more than zero!");
        return;
      }
      setIsLoading(true);
      messageApi.open({
        type: "loading",
        content: "Transaction in progress...",
        duration: 0,
      });
      if (chainId != chain?.id) {
        message.info("You must be change network to withdraw!");
        return;
      }
      const hash = await withdrawCollateral(chainId, vaultId, amount);
      if (hash) {
        const wait = await waitForTransaction({ chainId, hash });
        if (wait) {
          message.success("Withdraw Success!").then(() => messageApi.destroy());
          setCallback(!callback);
        }
      }
    } catch (error) {
      message.error("Redeem failed!");
    } finally {
      setIsLoading(false);
      messageApi.destroy();
    }
  };

  const items: CollapseProps["items"] =
    collateralDeposited &&
    Object.entries(collateralDeposited).map(([chainId, data]) => ({
      key: chainId,
      label: `${renderChain(Number(chainId))} Network`,
      children: (
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className=" text-gray-700">
            <tr>
              <th className="px-6 py-4">Vault</th>
              <th className="px-6 py-4">Amount</th>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {data.vaults.map((vault: any) => (
              <tr className="border-b" key={vault.vaultId}>
                <td className="px-6 py-4">
                  <NavLink
                    to={`/borrow/${renderChain(Number(chainId))}/${
                      vault.vaultId
                    }`}
                    className="underline"
                  >
                    {vault.vaultName} Vault
                  </NavLink>
                </td>
                <td className="px-6 py-4">
                  {parseFloat(vault.collateralDeposited).toLocaleString()}{" "}
                </td>
                <td>
                  <button
                    className="button-main"
                    onClick={() =>
                      handleWithdrawCollateral(
                        Number(chainId),
                        vault.vaultId,
                        vault.collateralDeposited
                      )
                    }
                  >
                    Redeem
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ),
    }));

  useEffect(() => {
    fetchCollateralDeposited();
  }, [callback, userAddress]);

  return (
    <>
      {contextHolder}
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <Collapse
          className="bg-white/90"
          items={items}
          defaultActiveKey={["1"]}
        />
      )}
    </>
  );
};

export default AllCollateralDeposited;
