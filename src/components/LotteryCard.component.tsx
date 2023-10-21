import {
  sepolia,
  useAccount,
  useConnect,
  useContractRead,
  useContractWrite,
} from "wagmi";
import { abi } from "../abi/lotteryABI";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useEffect, useState } from "react";

const LotteryCard = ({
  lotteryState,
  refetchLotteryState,
  playerCount,
  refetchPlayerCount,
  isTimerZero,
}: {
  lotteryState: number;
  refetchLotteryState: any;
  playerCount: number;
  refetchPlayerCount: any;
  isTimerZero: boolean;
}) => {
  const chains = [sepolia];
  const { isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector({ chains }),
    chainId: chains[0].id,
  });
  const [displayItem, setDisplayItem] = useState<
    "choosingWinnerDisplay" | "enterLottery" | "connectWallet"
  >("connectWallet");

  const { write } = useContractWrite({
    address: `0x${process.env.REACT_APP_LOTTERY_CONTRACT}`,
    abi: abi,
    functionName: "enterLottery",
  });

  const { data: recentWinner, refetch: refetchRecentWinner } = useContractRead({
    address: `0x${process.env.REACT_APP_LOTTERY_CONTRACT}`,
    abi: abi,
    functionName: "getRecentWinner",
  });

  /**
   * @dev Shows the timer if wallet is connected
   */
  useEffect(() => {
    if (!isConnected) {
      setDisplayItem("connectWallet");
    }
  }, [isConnected, setDisplayItem]);

  useEffect(() => {
    if (isTimerZero && lotteryState != 0) {
      setDisplayItem("choosingWinnerDisplay");
    } else {
      setDisplayItem("enterLottery");
    }
  }, [isTimerZero, setDisplayItem]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetchPlayerCount();
      refetchLotteryState();
      refetchRecentWinner();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  });

  switch (displayItem) {
    case "choosingWinnerDisplay":
      return <p className="text-3xl">🤑We are currently choosing a winner🤑</p>;
    case "connectWallet":
      return (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-full"
          onClick={() => connect()}
        >
          Connect Wallet
        </button>
      );
    case "enterLottery":
      return (
        <div className=" flex flex-col items-center space-y-4 text-2xl">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-full"
            onClick={() => write({ value: BigInt(1000000000000000) })}
          >
            Enter Lottery
          </button>

          <p>Total Number of Entries: {playerCount?.toString()}</p>
          <p className="mt-6">🚀Last Winner is: {recentWinner?.toString()}</p>
        </div>
      );
    default:
      return <></>;
  }
};

export default LotteryCard;
