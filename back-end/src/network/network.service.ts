import { Injectable } from '@nestjs/common';
import { NetworkConfig } from './network.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NetworkService {
  constructor(private config: ConfigService) {}
  private networks: Record<string, NetworkConfig> = {
    ethereumSepolia: {
      name: 'ethereumSepolia',
      providerUrl: this.config.get<string>('ETH_SEPOLIA_RPC'),
      engineContractAddress: this.config.get<string>('SEPOLIA_ENGINE_CONTRACT'),
    },
    polygonMumbai: {
      name: 'polygonMumbai',
      providerUrl: this.config.get<string>('POLYGON_MUMBAI_RPC_URL'),
      engineContractAddress: this.config.get<string>('SEPOLIA_ENGINE_CONTRACT'),
    },
    optimismGoerli: {
      name: 'optimismGoerli',
      providerUrl: this.config.get<string>('OPTIMISM_GOERLI_RPC_URL'),
      engineContractAddress: this.config.get<string>('SEPOLIA_ENGINE_CONTRACT'),
    },
    arbitrumGoerli: {
      name: 'arbitrumGoerli',
      providerUrl: this.config.get<string>('ARBITRUM_GOERLI_RPC_URL'),
      engineContractAddress: this.config.get<string>('SEPOLIA_ENGINE_CONTRACT'),
    },
  };

  getNetworkConfig(network: string): NetworkConfig {
    const config = this.networks[network];
    if (!config) {
      throw new Error(`Network '${network}' not found.`);
    }
    return config;
  }
}
