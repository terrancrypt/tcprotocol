import { readContract } from "@wagmi/core";
import { engineContract } from "./contractList";
import EngineABI from "../abis/EngineABI.json";
import { formatUnits } from "ethers";
import { formatEther } from "ethers";

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

// write

export { getCurrentVaultId, getVaultAddress, getVaultBalance };
