import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers, formatEther } from 'ethers';
import { NetworkService } from 'src/network/network.service';
import * as EngineABI from '../abi/EngineABI.json';

@Injectable()
export class EtherService {
  private readonly wallet: ethers.Wallet;

  constructor(
    private readonly networkService: NetworkService,
    private readonly config: ConfigService,
  ) {
    const privateKey = this.config.get<string>('PRIVATE_KEY');
    if (!privateKey) {
      throw new Error('PRIVATE_KEY not found in configuration.');
    }
    this.wallet = new ethers.Wallet(privateKey);
  }

  async getCollateralList(network: string): Promise<number> {
    try {
      const networkConfig = this.networkService.getNetworkConfig(network);
      const provider = new ethers.JsonRpcProvider(networkConfig.providerUrl);
      const contract = new ethers.Contract(
        networkConfig.engineContractAddress,
        EngineABI,
        provider,
      );
      const result = await contract.getCurrentVaultId();
      console.log(Number(result));
      return Number(result);
    } catch (error) {
      console.log(error);
    }
  }
}
