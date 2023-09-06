import { Form, Input, Spin, message } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useAccount, useNetwork } from "wagmi";
import { waitForTransaction } from "@wagmi/core";
import { useParams } from "react-router-dom";
import {
  approveEngineContract,
  fetchTokenBalance,
} from "../../../services/contracts/interactTokenContract";
import {
  depositCollateral,
  getVaultAddress,
} from "../../../services/contracts/interactEngineContract";
import {
  chainLinkPriceFeed,
  engineContract,
} from "../../../services/contracts/contractList";
import { getLatestAnswer } from "../../../services/contracts/interactPriceFeedContract";

export interface StepProps {
  current: number;
  setCurrent: (value: number) => void;
}

const Step1: React.FC<StepProps> = ({ current, setCurrent }) => {
  // Antd
  const [messageApi, contextHolder] = message.useMessage();

  // React Router
  const { vaultId, chainName } = useParams();

  // Redux
  const collateralList = useSelector(
    (state: RootState) => state.collateralSlice
  );

  // Wagmi
  const { chain } = useNetwork();
  const { address } = useAccount();

  // Local Component State
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [userBalance, setUserBalance] = useState<number>(0);
  const [receive, setReceive] = useState<number>(0);
  const [vaultAddress, setVaultAddress] = useState<string>("");
  const [txLoading, setTxLoading] = useState<boolean>(false);

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
        setVaultAddress(vaultAddress ? vaultAddress : "");
      }
    } catch (error) {
      console.log(error);
      message.error("Fetch Failed!");
    }
  };

  const calculate = (e: any) => {
    const amount = e.target.value;
    const receive = (((amount * exchangeRate) / 2) * 45) / 100;
    setReceive(receive);
  };

  // Form handle
  const onFinish = async (values: any) => {
    const amount = Number(values.amount);
    if (amount > userBalance) message.error("Your balance is not enough!");
    const { address: spender } = engineContract[vaultInformation.chainId];

    try {
      setTxLoading(true);
      messageApi.open({
        type: "loading",
        content: "Transaction in progress...",
        duration: 0,
      });
      // Aprrove
      const hash = await approveEngineContract(
        vaultInformation.chainId,
        vaultAddress,
        address as any,
        amount,
        spender
      );
      if (hash) {
        const wait = await waitForTransaction({
          chainId: vaultInformation.chainId,
          hash,
        });
        if (wait) {
          message.success("Approve success!");
          // Deposit
          const result = await depositCollateral(
            vaultInformation.chainId,
            Number(vaultId),
            amount
          );
          if (result) {
            const waitSecond = await waitForTransaction({
              chainId: vaultInformation.chainId,
              hash: result,
            });
            if (waitSecond) {
              message
                .success("Collateral deposited!")
                .then(() => messageApi.destroy());
              setCurrent(current + 1);
            }
          }
        }
      }
    } catch (error) {
      message.error("Transaction failed!");
    } finally {
      setTxLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error(errorInfo.errorFields[0].errors);
  };

  useEffect(() => {
    if (Object.keys(collateralList).length != 0) {
      getUserInfor();
    }
  }, []);

  return (
    <>
      {contextHolder}
      <Spin spinning={txLoading}>
        <div className="flex items-center justify-center w-full">
          <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{ width: 500, marginTop: 20 }}
          >
            <label className="flex justify-between text-gray-700 text-sm font-bold mb-2 text-left">
              Enter your amount:
              <span>
                Your balance: {userBalance.toLocaleString()}{" "}
                {vaultInformation?.vaultSymbol}
              </span>
            </label>
            <Form.Item
              noStyle
              name="amount"
              rules={[{ required: true, message: "Invalid balance!" }]}
            >
              <Input
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder={`${vaultInformation?.vaultSymbol}`}
                onChange={calculate}
              />
            </Form.Item>

            <Form.Item>
              <div className="flex items-center justify-between mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  You can borrow: {receive.toLocaleString()} tcUSD
                </label>
                <button className="button-main" type="submit">
                  Deposit
                </button>
              </div>
            </Form.Item>
          </Form>
        </div>

        {/* Next Button */}
        <div className="flex justify-center items-center mt-2 gap-2 pr-8">
          <span>Already deposited?</span>
          <button
            className="button-secondary underline"
            onClick={() => setCurrent(current + 1)}
          >
            Next
          </button>
        </div>
      </Spin>
    </>
  );
};

export default Step1;
