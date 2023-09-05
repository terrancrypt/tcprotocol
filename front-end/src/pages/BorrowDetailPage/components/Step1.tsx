import { Form, Input, Space, Button, FormInstance } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useAccount, useNetwork } from "wagmi";
import { useParams } from "react-router-dom";
import { fetchTokenBalance } from "../../../services/contracts/interactTokenContract";
import { getVaultAddress } from "../../../services/contracts/interactEngineContract";

export interface StepProps {
  current: number;
  setCurrent: (value: number) => void;
}

const Step1: React.FC<StepProps> = ({ current, setCurrent }) => {
  const [form] = Form.useForm();

  const collateralList = useSelector(
    (state: RootState) => state.collateralSlice
  );
  const { chain } = useNetwork();
  const { vaultId } = useParams();
  const { address } = useAccount();
  const [userBalance, setUserBalance] = useState<number>(0);

  let vaultInformation;
  let tyGia;
  if (Object.keys(collateralList).length != 0 && chain) {
    vaultInformation = collateralList[chain.name].vaults[Number(vaultId)];
    console.log("Vault Balance: ", parseInt(vaultInformation.balance));
    console.log(
      "Vault Value: ",
      parseFloat(vaultInformation?.valueInUSD.replace(/,/g, ""))
    );
    tyGia =
      parseFloat(vaultInformation?.valueInUSD.replace(/,/g, "")) /
      parseInt(vaultInformation.balance);
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
        setUserBalance(parseFloat(result));
      }
    } catch (error) {}
  };

  useEffect(() => {
    getUserInfor();
  }, []);
  return (
    // <Form form={form} name="validateOnly" layout="vertical" autoComplete="off">
    //   <Form.Item name="name" label="Name" rules={[{ required: true }]}>
    //     <Input />
    //   </Form.Item>
    //   <Form.Item name="age" label="Age" rules={[{ required: true }]}>
    //     <Input />
    //   </Form.Item>
    //   <Form.Item>
    //     <Space>
    //       <SubmitButton form={form} />
    //       <Button htmlType="reset">Reset</Button>
    //     </Space>
    //   </Form.Item>
    // </Form>

    <>
      <div className="leading-none space-y-4">
        <p>
          Tổng số lượng {vaultInformation?.vaultSymbol} user có thể deposit:{" "}
          {userBalance}
        </p>
        <p>Tỷ giá: {tyGia?.toLocaleString()}</p>
      </div>
    </>
  );
};

const SubmitButton = ({ form }: { form: FormInstance }) => {
  const [submittable, setSubmittable] = React.useState(false);

  // Watch all values
  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      Submit
    </Button>
  );
};

export default Step1;
