import { useCallback, useEffect, useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import { abi } from "../abi/lotteryABI";

const Timer = ({
  lastTimeStamp,
  lotteryState,
  playerCount,
  isTimerZero,
  setIsTimerZero,
  isTimerActive,
  setIsTimerActive,
}: {
  lastTimeStamp: number;
  lotteryState: number;
  refetchLotteryState: any;
  playerCount: number;
  refetchPlayerCount: any;
  isTimerZero: boolean;
  setIsTimerZero: React.Dispatch<React.SetStateAction<boolean>>;
  isTimerActive: boolean;
  setIsTimerActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { isConnected } = useAccount();
  const [time, setTime] = useState({ hour: 0, minute: 0, second: 0 });
  const [displayItem, setDisplayItem] = useState<
    "timer" | "noPlayerDisplay" | "choosingWinnerDisplay" | "none"
  >("none");

  const { data: interval } = useContractRead({
    address: `0x${process.env.REACT_APP_LOTTERY_CONTRACT}`,
    abi: abi,
    functionName: "getInterval",
  });

  const updateTime = useCallback((timeLeft: number) => {
    setTime({
      hour: Math.floor(timeLeft / (60 * 60)),
      minute: Math.floor((timeLeft % (60 * 60)) / 60),
      second: Math.floor(timeLeft % 60),
    });
  }, []);

  /**
   * @dev Shows the timer if wallet is connected
   */
  useEffect(() => {
    if (isConnected) {
      setDisplayItem("timer");
    }
  }, [isConnected, setDisplayItem]);

  /**
   * @dev Shows the choosingWinner message once timer reaches zero,
   *
   */
  useEffect(() => {
    let intervalId: NodeJS.Timer;
    if (isTimerZero) {
      setDisplayItem("choosingWinnerDisplay");

      setTimeout(() => {
        if (playerCount == 0) {
          setDisplayItem("noPlayerDisplay");
        }

        intervalId = setInterval(() => {
          if (lotteryState == 0) {
            setDisplayItem("timer");
            clearInterval(intervalId);
          }
        }, 5000);
      }, 5000);
    }
    return () => clearInterval(intervalId);
  }, [setDisplayItem, isTimerZero, playerCount]);

  useEffect(() => {
    if (lotteryState == 0) {
      setIsTimerActive(true);
    } else {
      setIsTimerActive(false);
    }
  }, [lotteryState]);

  useEffect(() => {
    setIsTimerZero(time.hour === 0 && time.minute === 0 && time.second <= 1);
    if (isTimerZero) {
      setIsTimerActive(false);
      setTimeout(() => {
        if (lotteryState == 0) {
          setIsTimerActive(true);
          setIsTimerZero(false);
        }
      }, 5000);
    }
  }, [time, isTimerZero]);

  /**
   * @notice This is responsible for decreasing the timer every second
   */
  useEffect(() => {
    console.log(lastTimeStamp)
    console.log(isTimerActive)
    if (lastTimeStamp && isTimerActive) {
      const intervalId = setInterval(() => {
        const currentTime = Date.now() / 1000;
        let timeLeft = lastTimeStamp - currentTime;
        if (timeLeft <= 0) {
          while (timeLeft <= 0) {
            timeLeft += Number(interval) as number;
          }
        }
        console.log(timeLeft)
        updateTime(timeLeft);
      }, 1 * 1000);
      return () => clearInterval(intervalId);
    }
  }, [lastTimeStamp, updateTime]);

  switch (displayItem) {
    case "choosingWinnerDisplay":
      return (
        <p className="text-3xl">
          Lottery Closed! We will initiate picking winner any moment now
        </p>
      );
    case "noPlayerDisplay":
      return <p className="text-3xl">There are no players 😢</p>;
    case "timer":
      return (
        <div className="p-6 bg-white rounded-xl shadow-lg">
          <p className="text-7xl font-bold text-gray-800">
            {time.hour < 10 ? `0${time.hour}` : time.hour}:
            {time.minute < 10 ? `0${time.minute}` : time.minute}:
            {time.second < 10 ? `0${time.second}` : time.second}
          </p>
        </div>
      );
    default:
      return <></>;
  }

  // if (displayItem == "none") {
  //   return <></>;
  // }

  // if (!isConnected) return <></>;
  // if (isTimerZero)
  //   return (
  //     <p className="text-3xl">
  //       Lottery Closed! We will initiate picking winner any moment now
  //     </p>
  //   );

  // if (isTimerActive)
  //   return (
  //     <div className="p-6 bg-white rounded-xl shadow-lg">
  //       <p className="text-7xl font-bold text-gray-800">
  //         {time.hour < 10 ? `0${time.hour}` : time.hour}:
  //         {time.minute < 10 ? `0${time.minute}` : time.minute}:
  //         {time.second < 10 ? `0${time.second}` : time.second}
  //       </p>
  //     </div>
  //   );

  // return <></>;
};

export default Timer;
