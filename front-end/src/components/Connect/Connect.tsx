import { Tooltip } from "antd";
import React from "react";
import { useAccount, useConnect, useDisconnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const Connect: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

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
      <div className="button-main cursor-pointer" onClick={() => disconnect()}>
        <Tooltip title="Disconnect">
          <span> {shortenAddress(ensName) ?? shortenAddress(address)}</span>
        </Tooltip>
      </div>
    );
  return (
    <button className="button-main" onClick={() => connect()}>
      Connect Wallet
    </button>
  );
};

export default Connect;
