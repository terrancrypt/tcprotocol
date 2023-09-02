import React from "react";
import { sepolia, useNetwork, useSwitchNetwork } from "wagmi";
import { arbitrumGoerli, optimismGoerli, polygonMumbai } from "wagmi/chains";

const SwitchNetwork: React.FC = () => {
  const { chain } = useNetwork();
  const { error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();

  const chains = [sepolia, arbitrumGoerli, optimismGoerli, polygonMumbai];
  console.log(chains);

  return (
    <>
      {chain && <div>Connected to {chain.name}</div>}

      {chains.map((x) => (
        <button
          disabled={!switchNetwork || x.id === chain?.id}
          key={x.id}
          onClick={() => switchNetwork?.(x.id)}
        >
          {x.name}
          {isLoading && pendingChainId === x.id && " (switching)"}
        </button>
      ))}

      <div>{error && error.message}</div>
    </>
  );
};

export default SwitchNetwork;
