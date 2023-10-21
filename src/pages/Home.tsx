import { useContractRead } from "wagmi";
import LotteryCard from "../components/LotteryCard.component";
import Navbar from "../components/Navbar.component";
import Timer from "../components/Timer.component";
import { abi } from "../abi/lotteryABI";
import { useState } from "react";

const Home = () => {
  const [isTimerZero, setIsTimerZero] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const { data: lastTimeStamp } = useContractRead({
    address: `0x${process.env.REACT_APP_LOTTERY_CONTRACT}`,
    abi: abi,
    functionName: "getLastTimeStamp",
  });
  const { data: lotteryState, refetch: refetchLotteryState } = useContractRead({
    address: `0x${process.env.REACT_APP_LOTTERY_CONTRACT}`,
    abi: abi,
    functionName: "getLotteryState",
  });

  const { data: playerCount, refetch: refetchPlayerCount } = useContractRead({
    address: `0x${process.env.REACT_APP_LOTTERY_CONTRACT}`,
    abi: abi,
    functionName: "getNumberOfPlayers",
  });
  return (
    <div className="mx-2">
      <Navbar />
      <div className="flex justify-center">
        <Timer
          lastTimeStamp={Number(lastTimeStamp)}
          lotteryState={Number(lotteryState)}
          playerCount={Number(playerCount)}
          refetchLotteryState={refetchLotteryState}
          refetchPlayerCount={refetchPlayerCount}
          isTimerZero={isTimerZero}
          setIsTimerZero={setIsTimerZero}
          isTimerActive={isTimerActive}
          setIsTimerActive={setIsTimerActive}
        />
      </div>
      <div className="mt-64 flex justify-center items-center">
        <LotteryCard
          lotteryState={Number(lotteryState)}
          playerCount={Number(playerCount)}
          refetchLotteryState={refetchLotteryState}
          refetchPlayerCount={refetchPlayerCount}
          isTimerZero={isTimerZero}
        />
      </div>
    </div>
  );
};

export default Home;
