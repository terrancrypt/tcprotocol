import { readContract, writeContract } from "@wagmi/core";
import { engineContract } from "./contractList";
import EngineABI from "../abis/EngineABI.json";
import { formatEther, formatUnits, parseEther } from "ethers";

// read
async function getCurrentVaultId(chainId: number): Promise<number | null> {
  const address = engineContract[chainId].address;
  try {
    const result = await readContract({
      address: address as any,
      abi: EngineABI as typeof EngineABI,
      functionName: "getCurrentVaultId",
      chainId,
    });
    return Number(result);
  } catch (error) {
    return null;
  }
}

async function getVaultBalance(
  chainId: number,
  vaultId: number
): Promise<string | null> {
  const address = engineContract[chainId].address;
  try {
    const result: any = await readContract({
      address: address as any,
      abi: EngineABI as typeof EngineABI,
      functionName: "getVaultBalance",
      args: [vaultId],
      chainId,
    });
    return formatEther(result);
  } catch (error) {
    return null;
  }
}

async function getVaultAddress(
  chainId: number,
  vaultId: number
): Promise<string | null> {
  const address = engineContract[chainId].address;
  try {
    const result: any = await readContract({
      address: address as any,
      abi: EngineABI as typeof EngineABI,
      functionName: "getVaultAddress",
      args: [vaultId],
      chainId,
    });
    return String(result);
  } catch (error) {
    return null;
  }
}

async function getTotalValueInUSD(
  chainId: number,
  vaultBalance: string,
  vaultAddress: string
): Promise<any | null> {
  const address = engineContract[chainId].address;
  try {
    const result = await readContract({
      address: address as any,
      abi: EngineABI as typeof EngineABI,
      functionName: "getUSDValueOfCollateral",
      args: [vaultAddress, parseEther(vaultBalance as string)],
      chainId,
    });
    return formatEther(result as bigint);
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getUserBalanceInVault(
  chainId: number,
  vaultId: number,
  userAddress: string
): Promise<string | null> {
  const address = engineContract[chainId].address;
  try {
    const result: any = await readContract({
      address: address as any,
      abi: EngineABI as typeof EngineABI,
      functionName: "getCollateralDeposited",
      args: [vaultId],
      account: userAddress as any,
    });
    return formatEther(result);
  } catch (error) {
    return null;
  }
}

export interface Position {
  chainId: number;
  amountCollateral: string;
  amountTCUSD: string;
  heathFactor: string;
}

async function getAllPositionsInformation(allChainId: number[], owner: string) {
  try {
    const allPositionInfo: Position[] = [];

    for (const chainId of allChainId) {
      const address = engineContract[chainId].address;
      const positionsId = (await readContract({
        address: address as any,
        abi: EngineABI as typeof EngineABI,
        functionName: "getAllPositionExists",
        args: [owner],
        chainId,
      })) as number[];

      for (const positionId of positionsId) {
        const result = (await readContract({
          address: address as any,
          abi: EngineABI as typeof EngineABI,
          functionName: "getUniquePosition",
          args: [positionId],
          chainId,
        })) as any;

        allPositionInfo.push({
          chainId,
          amountCollateral: formatEther(result[2]),
          amountTCUSD: formatEther(result[3]),
          heathFactor: formatEther(result[4]),
        });
      }
    }

    return allPositionInfo;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// write
async function depositCollateral(
  chainId: number,
  vaultId: number,
  amount: number
) {
  const address = engineContract[chainId].address;
  try {
    const { hash } = await writeContract({
      address: address as any,
      chainId,
      abi: EngineABI,
      functionName: "depositCollateral",
      args: [vaultId, parseEther(String(amount))],
    });
    return hash;
  } catch (error) {
    return null;
  }
}

async function createPosition(
  chainId: number,
  vaultId: number,
  userAddress: string,
  amountCollateral: number,
  amountTcUSD: number
) {
  const address = engineContract[chainId].address;
  try {
    const { hash } = await writeContract({
      address: address as any,
      abi: EngineABI,
      functionName: "createPosition",
      args: [
        vaultId,
        parseEther(String(amountCollateral)),
        parseEther(String(amountTcUSD)),
      ],
      account: userAddress as any,
    });
    return hash;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function cancelPosition() {}

export {
  getCurrentVaultId,
  getVaultAddress,
  getVaultBalance,
  getTotalValueInUSD,
  depositCollateral,
  getUserBalanceInVault,
  createPosition,
  getAllPositionsInformation,
};
