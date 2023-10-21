import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import {
  mainnet,
  configureChains,
  createConfig,
  WagmiConfig,
  sepolia,
} from "wagmi";
import { polygon, polygonMumbai, goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { InjectedConnector } from "wagmi/connectors/injected";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, sepolia, polygon, polygonMumbai, goerli],
  [
    alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_API_KEY! }),
    publicProvider(),
  ],
  { retryCount: 5 }
);

const config = createConfig({
  autoConnect: true,
  connectors: [
    new InjectedConnector({ chains, options: { shimDisconnect: false } }),
  ],
  publicClient,
  webSocketPublicClient,
  logger: {
    warn: (message) => console.warn(message),
  },
});

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
  ]);

  return (
    <WagmiConfig config={config}>
      <RouterProvider router={router} />
    </WagmiConfig>
  );
}

export default App;
