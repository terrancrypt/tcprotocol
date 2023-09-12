import { writeContract } from "@wagmi/core";
import TcUsdABI from "../abis/TcUSDABI.json";
import { engineContract, tcUSDContract } from "./contractList";
import { parseEther } from "viem";

const approveTcUSD = async (
  chainId: number,
  amount: number,
  userAccount: string
) => {
  const address = tcUSDContract[chainId].address;
  const engineAddress = engineContract[chainId].address;
  try {
    const { hash } = await writeContract({
      address: address as any,
      abi: TcUsdABI,
      functionName: "approve",
      args: [engineAddress, parseEther(String(amount))],
      chainId,
      account: userAccount as any,
    });
    return hash;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { approveTcUSD };
