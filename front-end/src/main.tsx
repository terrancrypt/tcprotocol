import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { sepolia, optimismGoerli, polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia, optimismGoerli, polygonMumbai],
  [
    alchemyProvider({ apiKey: "cs5861l2vJk5J5gmRJZgQm9gghoQ82mQ" }),
    alchemyProvider({ apiKey: "X5TDnhDZ4rXaZMJMggXrFQ-b5cySxi4O" }),
    alchemyProvider({ apiKey: "gQYPJIPlGv1ShmZmRgGaCVynF7hNuTCe" }),
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
  webSocketPublicClient,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <WagmiConfig config={config}>
      <App />
    </WagmiConfig>
  </Provider>
);
