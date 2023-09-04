import {
  getCurrentVaultId,
  getVaultAddress,
  getVaultBalance,
} from "./contracts/interactEngineContract";
import { getTokenSymbol } from "./contracts/interactTokenContract";

export interface CollateralInfo {
  [chainName: string]: {
    vaults: {
      vaultSymbol: string;
      vaultId: number;
      balance: string;
    }[];
  };
}

export const getAllCollateralList = async (
  chains: any
): Promise<CollateralInfo | null> => {
  try {
    const collateralInfo: CollateralInfo = {};

    for (const chain of chains) {
      collateralInfo[chain.name] = { vaults: [] };

      const currentVaultId: number | null = await getCurrentVaultId(chain.id);

      if (currentVaultId !== null && currentVaultId !== 0) {
        for (let i = 0; i < currentVaultId; i++) {
          const result = await getVaultBalance(chain.id, i);
          const address = await getVaultAddress(chain.id, i);
          const symbol = await getTokenSymbol(chain.id, address as string);

          if (result && symbol) {
            const objectResult = {
              vaultSymbol: symbol,
              vaultId: i,
              balance: result,
            };
            collateralInfo[chain.name].vaults.push(objectResult);
          }
        }
      }
    }
    return collateralInfo;
  } catch (error) {
    return null;
  }
};
