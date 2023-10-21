import {
  mainnet,
  sepolia,
  useAccount,
  useBalance,
  useConnect,
  useDisconnect,
  useEnsName,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { truncateEthAddress } from "../util/address.util";
import { goerli, polygon, polygonMumbai } from "wagmi/chains";
import { useState } from "react";
import { LiaEthereum } from "react-icons/lia";

const Navbar = () => {
  const chains = [sepolia, mainnet, polygon, polygonMumbai, goerli];
  const [currentChain] = useState(chains[0]);
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({
    connector: new InjectedConnector({ chains }),
    chainId: currentChain.id,
  });

  const { disconnect } = useDisconnect();

  const { data } = useBalance({
    address,
    onError(error) {
      console.log("Error", error);
    },
  });

  return (
    <div className="flex justify-between items-center mb-12 mx-4">
      <h1 className="text-3xl p-4">Lottery</h1>
      <div className="flex items-center text-xl space-x-2">
        <div className="flex text-2xl items-center border-2 border-black px-4 py-2 justify-between">
          {<LiaEthereum />}
          {currentChain.name}
        </div>
        {isConnected ? (
          <>
            <p className="border-black text-2xl border-2 p-2">
              {Number(data?.formatted).toFixed(4) ?? 0} {data?.symbol}
            </p>
            <div className="px-4 py-2 rounded-full">
              {ensName ?? truncateEthAddress(address)}
            </div>
            <p className="text-red-500" onClick={() => disconnect()}>
              Disconnect
            </p>
          </>
        ) : (
          <button
            onClick={() => connect()}
            className="px-4 py-2 bg-blue-500 text-white rounded-full"
          >
            Connect Wallet
          </button>
        )}{" "}
      </div>
    </div>
  );
};

export default Navbar;
