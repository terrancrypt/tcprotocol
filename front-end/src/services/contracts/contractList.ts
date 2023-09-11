interface Contract {
  [chainId: number]: {
    address: string;
  };
}

const engineContract: Contract = {
  // ETH Sepolia
  11155111: {
    address: "0x11946A8ab0FC26d3975519Fd031D1440E6088B58",
  },
  // Polygon Mumbai
  80001: {
    address: "0x633B8017071aD4B339aC2F70656f79B3901e4a68",
  },
  // Optimism Goerli
  420: {
    address: "0xB2A4C3078779617ee7D55D08A220af6179979B3c",
  },
};

const mockWETHContract: Contract = {
  // ETH Sepolia
  11155111: {
    address: "0x61FaCFDCD0804cA6847E7D7a5A0C2E00307a84Cd",
  },
  // Polygon Mumbai
  80001: {
    address: "0xd3F5be5594799caD9D1b7104Be7ea03d4E827E7E",
  },
  // Optimism Goerli
  420: {
    address: "0x1051004BFA253d34dA2D4A26e9a5945EE9976323",
  },
};

const mockWBTCContract: Contract = {
  // ETH Sepolia
  11155111: {
    address: "0x069F34476ba3f540f4979303904957294caAae47",
  },
  // Polygon Mumbai
  80001: {
    address: "0x56C751Cdd1D892deDbB5849FBbaA30A6ED13A49D",
  },
  // Optimism Goerli
  420: {
    address: "0x1251a23e4e397ED4381E98Adacab56BBfD1B5740",
  },
};

const chainLinkPriceFeed = {
  ETHUSD: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
  BTCUSD: "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43",
};

const tcUSDContract: Contract = {
  // ETH Sepolia
  11155111: {
    address: "0xd3B4E71399d221943a3AAf9843B256929054bba8",
  },
  // Polygon Mumbai
  80001: {
    address: "0x7F94fd44eF712B72572F06a18F752558985D4E40",
  },
  // Optimism Goerli
  420: {
    address: "0x963d43376950e9D5f3A279F00141f611830A4e6a",
  },
};

export {
  engineContract,
  mockWETHContract,
  mockWBTCContract,
  chainLinkPriceFeed,
  tcUSDContract,
};
