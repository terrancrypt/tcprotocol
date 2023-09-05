import { Tab } from "@headlessui/react";
import React from "react";
import { useSelector } from "react-redux";
import { sepolia } from "wagmi";
import { optimismGoerli, polygonMumbai } from "wagmi/chains";
import { RootState } from "../../../redux/store";
import { Spin } from "antd";
import { NavLink } from "react-router-dom";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const CollateralList: React.FC = () => {
  const chains = [sepolia, optimismGoerli, polygonMumbai];
  const collateralList = useSelector(
    (state: RootState) => state.collateralSlice
  );

  const renderList = () => {
    if (Object.keys(collateralList).length === 0) {
      return (
        <div className="flex justify-center pt-4">
          <Spin size="large" />
        </div>
      );
    }
    return (
      <Tab.Group>
        <div className="w-1/3">
          <Tab.List className="flex space-x-1 rounded-xl bg-[#0f1841] p-1">
            {chains.map((item) => (
              <Tab
                key={item.id}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-black",
                    selected
                      ? "bg-white shadow"
                      : "text-white hover:bg-white/[0.12] hover:text-white"
                  )
                }
              >
                {item.name}
              </Tab>
            ))}
          </Tab.List>
        </div>

        <Tab.Panels className="mt-2 w-full bg-black">
          {Object.entries(collateralList).map(([chainName, data]) => (
            <Tab.Panel key={chainName}>
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className=" text-gray-700  bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Collateral/Debt
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total Deposited
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total Value In USD
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Your balance
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {" "}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.vaults.map((vault) => (
                    <tr className="bg-white border-b">
                      <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {vault.vaultSymbol}/tcUSD
                      </th>
                      <td className="px-6 py-4">
                        {parseFloat(vault.balance).toFixed(3)}
                      </td>
                      <td className="px-6 py-4">...</td>
                      <td className="px-6 py-4">...</td>
                      <td className="px-6 py-4">
                        <NavLink to={`/borrow/${vault.vaultId}`}>
                          <button className="button-main">borrow</button>
                        </NavLink>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    );
  };

  return <>{renderList()}</>;
};

export default CollateralList;
