import React from 'react';

const FaucetPage: React.FC = () => {
  return (
    <div className="justify-center container mx-auto">
      {/* title & description */}
      <div className="text-center mb-12 px-20">
        <h1 className="text-gray-200 text-5xl font-bold">FAUCET</h1>
      </div>


      <div className="rounded-lg flex space-x-4">
        {/* information board */}
        <div className="px-6 py-4 shadow-md flex-1 bg-white/70 rounded-lg">
          <div className="flex items-center justify-between text-gray-700">
            <div className="text-lg font-bold">Information</div>
            <div className="flex items-center space-x-2">
              <div className="text-sm text-gray-500">Current Network:</div>
              <div className="text-sm font-bold text-gray-700">Sepolia</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-sm text-gray-500">
              With testnet Faucet you can get free assets to test the TC Protocol. Make sure to switch your wallet provider to the SEPOLIA testnet network, select desired asset, and click ‘Faucet’ to get tokens transferred to your wallet.
            </div>
            <br/>
            <div className="text-sm text-gray-500">
              You need Sepolia ETH to pay transaction fees in the protocol. Pick up at Sepolia Faucet.
            </div>
          </div>
        </div>



        <div className="shadow-md flex-1 bg-white/60 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 text-center">
            <thead className="bg-white/70">
              <tr>
                <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Token Name
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Balance
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Faucet
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    Token 1
                  </div>
                  <div className="text-sm text-gray-500">
                    <a href="https://etherscan.io/token/token1" className="text-cyan-800 hover:underline">Etherscan</a>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">100 TOK</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="px-4 py-2 button-main rounded-md">Faucet</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    Token 2
                  </div>
                  <div className="text-sm text-gray-500">
                    <a href="https://etherscan.io/token/token1" className="text-cyan-800 hover:underline">Etherscan</a>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">100 TOK</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="px-4 py-2 button-main rounded-md">Faucet</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    Token 3
                  </div>
                  <div className="text-sm text-gray-500">
                    <a href="https://etherscan.io/token/token1" className="text-cyan-800 hover:underline">Etherscan</a>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">100 TOK</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="px-4 py-2 button-main rounded-md">Faucet</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FaucetPage;