import { readContract, writeContract } from "@wagmi/core";
import { engineContract } from "./contractList";
import EngineABI from "../abis/EngineABI.json";
import { formatEther, parseEther } from "ethers";

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

export {
  getCurrentVaultId,
  getVaultAddress,
  getVaultBalance,
  getTotalValueInUSD,
  depositCollateral,
};
