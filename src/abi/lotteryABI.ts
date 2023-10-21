export const abi = [
  {
    inputs: [
      { internalType: "uint256", name: "entryFee", type: "uint256" },
      { internalType: "uint256", name: "interval", type: "uint256" },
      { internalType: "address", name: "vrfCoordinator", type: "address" },
      { internalType: "bytes32", name: "gasLane", type: "bytes32" },
      { internalType: "uint64", name: "subscriptionId", type: "uint64" },
      { internalType: "uint32", name: "callbackGasLimit", type: "uint32" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "Lottery__LotteryClosed", type: "error" },
  { inputs: [], name: "Lottery__PleaseSendMoreEth", type: "error" },
  { inputs: [], name: "Lottery__TransferCashToWinnerFailed", type: "error" },
  {
    inputs: [
      { internalType: "uint256", name: "currentBalance", type: "uint256" },
      { internalType: "uint256", name: "numberOfPlayers", type: "uint256" },
      { internalType: "uint256", name: "lotteryState", type: "uint256" },
    ],
    name: "Lottery__UpkeepNotNeeded",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "have", type: "address" },
      { internalType: "address", name: "want", type: "address" },
    ],
    name: "OnlyCoordinatorCanFulfill",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "player",
        type: "address",
      },
    ],
    name: "EnteredLottery",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "winner",
        type: "address",
      },
    ],
    name: "PickedWinner",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
    ],
    name: "RequestedLotteryWinner",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "time", type: "uint256" },
    ],
    name: "UpkeepChecked",
    type: "event",
  },
  {
    inputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    name: "checkUpkeep",
    outputs: [
      { internalType: "bool", name: "upkeepNeeded", type: "bool" },
      { internalType: "bytes", name: "", type: "bytes" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "enterLottery",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getEntryFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getInterval",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLastTimeStamp",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLotteryState",
    outputs: [
      { internalType: "enum Lottery.LotteryState", name: "", type: "uint8" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumberOfPlayers",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPastLotteries",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "timeStamp", type: "uint256" },
          { internalType: "address", name: "winner", type: "address" },
          { internalType: "uint256", name: "winningAmount", type: "uint256" },
        ],
        internalType: "struct Lottery.LotteryRecord[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "indexOfPlayer", type: "uint256" },
    ],
    name: "getPlayerAddressFromIndex",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRecentWinner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    name: "performUpkeep",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "requestId", type: "uint256" },
      { internalType: "uint256[]", name: "randomWords", type: "uint256[]" },
    ],
    name: "rawFulfillRandomWords",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
