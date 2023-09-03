import React from "react";
import { useAccount, useConnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const Connect: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const shortenAddress = (address: string | undefined | null) => {
    const maxLength = 10;
    if (address != undefined) {
      const start = address.substring(0, maxLength / 2);
      const end = address.substring(address.length - maxLength / 2);
      address = `${start}...${end}`;
      return address;
    }
  };

  if (isConnected)
    return (
      <div className="button-main">
        {shortenAddress(ensName) ?? shortenAddress(address)}
      </div>
    );
  return (
    <button className="button-main" onClick={() => connect()}>
      Connect Wallet
    </button>
  );
};

export default Connect;
