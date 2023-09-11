import { writeContract } from "@wagmi/core";
import * as TcUsdABI from "../abis/TcUSDABI.json";
import { tcUSDContract } from "./contractList";
import { parseEther } from "viem";

const approveTcUSD = async (
  chainId: number,
  spender: string,
  amount: number,
  userAccount: string
) => {
  const address = tcUSDContract[chainId].address;
  try {
    const { hash } = await writeContract({
      address: address as any,
      abi: TcUsdABI,
      functionName: "aprrove",
      args: [spender, parseEther(String(amount))],
      chainId,
      account: userAccount as any,
    });
    return hash;
  } catch (error) {
    return null;
  }
};

export { approveTcUSD };
