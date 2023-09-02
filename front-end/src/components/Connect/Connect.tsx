import React from "react";
import { useAccount, useConnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const Connect: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  if (isConnected) return <div>Connected to {ensName ?? address}</div>;
  return <button onClick={() => connect()}>Connect Wallet</button>;
};

export default Connect;
