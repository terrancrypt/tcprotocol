import { readContract } from "@wagmi/core";
import ChainLinkPriceFeedABI from "../abis/ChainLinkPriceFeedABI.json";
import { formatUnits } from "ethers";

const getLatestAnswer = async (address: string): Promise<string | null> => {
  try {
    const result: any = await readContract({
      address: address as any,
      abi: ChainLinkPriceFeedABI,
      functionName: "latestAnswer",
      chainId: 11155111,
    });
    return formatUnits(result, 8);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { getLatestAnswer };
