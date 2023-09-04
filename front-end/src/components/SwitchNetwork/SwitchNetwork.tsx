import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import React from "react";
import { sepolia, useNetwork, useSwitchNetwork } from "wagmi";
import { optimismGoerli, polygonMumbai } from "wagmi/chains";
import { Tooltip } from "antd";

const SwitchNetwork: React.FC = () => {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const chains = [sepolia, optimismGoerli, polygonMumbai];

  return (
    <>
      {chain ? (
        <div className="flex justify-end">
          <Listbox>
            <div className="relative">
              <Tooltip title="Switch Network">
                <Listbox.Button className="cursor-pointer relative w-[150px] button-secondary shadow bg-blue-100 text-black">
                  <span className="block truncate">{chain?.name}</span>
                </Listbox.Button>
              </Tooltip>

              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {chains.map((item, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 px-4 ${
                          active
                            ? "bg-[#e6eff7] text-[#0f1841]"
                            : "text-gray-900"
                        }`
                      }
                      value={item}
                      onClick={() =>
                        switchNetwork ? switchNetwork(item.id) : undefined
                      }
                    >
                      <>
                        <span>{item.name}</span>
                      </>
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default SwitchNetwork;
