import { Form, Input, Space, Button, FormInstance, message } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useAccount, useNetwork } from "wagmi";
import { useParams } from "react-router-dom";
import { fetchTokenBalance } from "../../../services/contracts/interactTokenContract";
import { getVaultAddress } from "../../../services/contracts/interactEngineContract";
import { chainLinkPriceFeed } from "../../../services/contracts/contractList";
import { getLatestAnswer } from "../../../services/contracts/interactPriceFeedContract";

export interface StepProps {
  current: number;
  setCurrent: (value: number) => void;
}

const Step1: React.FC<StepProps> = ({ current, setCurrent }) => {
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const collateralList = useSelector(
    (state: RootState) => state.collateralSlice
  );
  const { chain } = useNetwork();
  const { vaultId, chainName } = useParams();
  const { address } = useAccount();
  const [userBalance, setUserBalance] = useState<number>(0);
  const [receive, setReceive] = useState<number>(0);

  let vaultInformation: any;
  if (vaultId && chainName) {
    vaultInformation = collateralList[chainName].vaults[Number(vaultId)];
  }

  const getUserInfor = async () => {
    try {
      if (chain) {
        const vaultAddress = await getVaultAddress(
          chain.id as number,
          Number(vaultId)
        );
        const result = await fetchTokenBalance(
          chain?.id,
          vaultAddress as string,
          address as any
        );
        let exchangeRate;
        if (vaultInformation.vaultSymbol == "WETH") {
          exchangeRate = await getLatestAnswer(chainLinkPriceFeed.ETHUSD);
        } else {
          exchangeRate = await getLatestAnswer(chainLinkPriceFeed.BTCUSD);
        }
        setExchangeRate(parseFloat(exchangeRate as string));
        setUserBalance(parseFloat(result));
      }
    } catch (error) {
      console.log(error);
      message.error("Fetch Failed!");
    }
  };

  useEffect(() => {
    if (Object.keys(collateralList).length != 0) {
      getUserInfor();
    }
  }, []);

  const handleDeposit = (e: any) => {
    const amount = e.target.value;
    const receive = amount * exchangeRate;
    setReceive(receive);
  };

  return (
    <>
      <form className="px-8 pt-6">
        <div className="mb-4">
          <label className="flex justify-between text-gray-700 text-sm font-bold mb-2 text-left">
            Enter your amount:
            <span>
              Your balance: {userBalance.toLocaleString()}{" "}
              {vaultInformation?.vaultSymbol}
            </span>
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder={`${vaultInformation?.vaultSymbol}`}
            onChange={handleDeposit}
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            You can borrow: {receive.toLocaleString()} tcUSD
          </label>
          <button className="button-main" type="submit">
            Deposit
          </button>
        </div>

        {/* Next Button */}
        <div className="flex justify-end items-center mt-2 gap-2">
          <span>Already deposited?</span>
          <button
            className="button-secondary underline"
            onClick={() => setCurrent(current + 1)}
          >
            Next
          </button>
        </div>
      </form>
    </>
  );
};

export default Step1;
