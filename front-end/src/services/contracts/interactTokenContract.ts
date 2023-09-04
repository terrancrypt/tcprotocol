import { readContract } from "@wagmi/core";
import MockTokenABI from "../abis/MockTokenABI.json";

// read
async function getTokenSymbol(
  chainId: number,
  address: string
): Promise<string | null> {
  try {
    const result = await readContract({
      address: address as any,
      abi: MockTokenABI,
      chainId,
      functionName: "symbol",
    });
    return String(result);
  } catch (error) {
    return null;
  }
}

// write
export { getTokenSymbol };
