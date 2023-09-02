import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  sepolia,
  arbitrumGoerli,
  optimismGoerli,
  polygonMumbai,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const { chains, publicClient } = configureChains(
  [sepolia, arbitrumGoerli, optimismGoerli, polygonMumbai],
  [
    alchemyProvider({ apiKey: import.meta.env.ETH_SEPOLIA_RPC_URL as string }),
    alchemyProvider({ apiKey: import.meta.env.ARB_GOERLI_RPC_URL as string }),
    alchemyProvider({ apiKey: import.meta.env.OP_GOERLI_RPC_URL as string }),
    alchemyProvider({ apiKey: import.meta.env.MATIC_MUMBAI_RPC_URL as string }),
  ]
);

const config = createConfig({
  connectors: [
    new InjectedConnector({
      chains,
    }),
    new MetaMaskConnector({ chains }),
  ],
  autoConnect: true,
  publicClient,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <WagmiConfig config={config}>
    <App />
  </WagmiConfig>
);
