import React, { useState, useEffect } from "react";
import { StepProps } from "./Step1";
import { Form, Input, InputNumber, Spin, message } from "antd";
import { useSelector } from "react-redux";
import { useAccount, useNetwork } from "wagmi";
import { waitForTransaction } from "@wagmi/core";
import { RootState } from "../../../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import {
  chainLinkPriceFeed,
  engineContract,
} from "../../../services/contracts/contractList";
import { getLatestAnswer } from "../../../services/contracts/interactPriceFeedContract";
import {
  createPosition,
  getUserBalanceInVault,
  getVaultAddress,
} from "../../../services/contracts/interactEngineContract";

const Step2: React.FC<StepProps> = ({ current, setCurrent }) => {
  // Antd
  const [messageApi, contextHolder] = message.useMessage();

  // React Router
  const { vaultId, chainName } = useParams();
  const navigate = useNavigate();

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
  const [txLoading, setTxLoading] = useState<boolean>(false);

  let vaultInformation: any;
  if (vaultId && chainName) {
    vaultInformation = collateralList[chainName].vaults[Number(vaultId)];
  }

  const getUserInfor = async () => {
    try {
      if (chain) {
        const result = await getUserBalanceInVault(
          chain?.id,
          Number(vaultId),
          address as any
        );
        let exchangeRate;
        if (vaultInformation.vaultSymbol == "WETH") {
          exchangeRate = await getLatestAnswer(chainLinkPriceFeed.ETHUSD);
        } else {
          exchangeRate = await getLatestAnswer(chainLinkPriceFeed.BTCUSD);
        }
        setExchangeRate(parseFloat(exchangeRate as string));
        setUserBalance(parseFloat(result ? result : ""));
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
    const amountCollateral = Number(values.amountCollateral);
    const amountTcUSD = Number(values.amountTcUSD);
    if (amountCollateral > userBalance)
      message.error("Your balance is not enough!");
    if (amountTcUSD > receive)
      message.error("Cannot borrow more than the allowed amount!");
    try {
      setTxLoading(true);
      messageApi.open({
        type: "loading",
        content: "Transaction in progress...",
        duration: 0,
      });
      const hash = await createPosition(
        vaultInformation.chainId,
        Number(vaultId),
        address as any,
        amountCollateral,
        amountTcUSD
      );
      if (hash) {
        const wait = await waitForTransaction({
          chainId: vaultInformation.chainId,
          hash,
        });
        if (wait) {
          message.success("Position created!").then(() => messageApi.destroy());
          navigate("/dashboard");
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
            style={{ width: 600, marginTop: 20 }}
          >
            <label className="flex justify-between text-gray-700 text-sm font-bold mb-2 text-left">
              Enter your {vaultInformation?.vaultSymbol} amount:
              <span>
                Your total deposited: {userBalance.toLocaleString()}{" "}
                {vaultInformation?.vaultSymbol}
              </span>
            </label>
            <Form.Item
              noStyle
              name="amountCollateral"
              rules={[{ required: true, message: "Invalid balance!" }]}
            >
              <Input
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder={`${vaultInformation?.vaultSymbol}`}
                onChange={calculate}
              />
            </Form.Item>

            <label className="flex justify-between text-gray-700 text-sm font-bold mb-2 text-left mt-4">
              Enter your tcUSD want to borrow:
              <span>Can borrow: {receive.toLocaleString()} tcUSD</span>
            </label>

            <Form.Item
              noStyle
              name="amountTcUSD"
              rules={[{ required: true, message: "Invalid balance!" }]}
            >
              <Input
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="tcUSD"
              />
            </Form.Item>

            <Form.Item>
              <div className="flex items-center justify-end mt-4">
                <button className="button-main" type="submit">
                  Borrow
                </button>
              </div>
            </Form.Item>
          </Form>
        </div>

        {/* Next Button */}
        <div className="flex justify-center items-center mt-2 gap-2 pr-8">
          <span>Zero deposit?</span>
          <button
            className="button-secondary underline"
            onClick={() => setCurrent(current - 1)}
          >
            Previous
          </button>
        </div>
      </Spin>
    </>
  );
};

export default Step2;
