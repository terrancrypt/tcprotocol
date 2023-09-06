import * as EngineABI from "../abis/EngineABI.json";
import * as MockTokenABI from "../abis/MockTokenABI.json";
import * as ChainLinkPriceFeedABI from "../abis/ChainLinkPriceFeedABI.json";

interface Contract {
  [chainId: number]: {
    address: string;
    abi: any;
  };
}

const engineContract: Contract = {
  // ETH Sepolia
  11155111: {
    address: "0x11946A8ab0FC26d3975519Fd031D1440E6088B58",
    abi: EngineABI,
  },
  // Polygon Mumbai
  80001: {
    address: "0x633B8017071aD4B339aC2F70656f79B3901e4a68",
    abi: EngineABI,
  },
  // Optimism Goerli
  420: {
    address: "0xB2A4C3078779617ee7D55D08A220af6179979B3c",
    abi: EngineABI,
  },
};

const mockWETHContract: Contract = {
  // ETH Sepolia
  11155111: {
    address: "0x61FaCFDCD0804cA6847E7D7a5A0C2E00307a84Cd",
    abi: MockTokenABI,
  },
  // Polygon Mumbai
  80001: {
    address: "0xd3F5be5594799caD9D1b7104Be7ea03d4E827E7E",
    abi: MockTokenABI,
  },
  // Optimism Goerli
  420: {
    address: "0x1051004BFA253d34dA2D4A26e9a5945EE9976323",
    abi: MockTokenABI,
  },
};

const mockWBTCContract: Contract = {
  // ETH Sepolia
  11155111: {
    address: "0x069F34476ba3f540f4979303904957294caAae47",
    abi: MockTokenABI,
  },
  // Polygon Mumbai
  80001: {
    address: "0x56C751Cdd1D892deDbB5849FBbaA30A6ED13A49D",
    abi: MockTokenABI,
  },
  // Optimism Goerli
  420: {
    address: "0x1251a23e4e397ED4381E98Adacab56BBfD1B5740",
    abi: MockTokenABI,
  },
};

const chainLinkPriceFeed = {
  ETHUSD: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
  BTCUSD: "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43",
};

export {
  engineContract,
  mockWETHContract,
  mockWBTCContract,
  chainLinkPriceFeed,
};
