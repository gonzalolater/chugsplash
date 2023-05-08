import { HardhatRuntimeEnvironment, HardhatUserConfig } from 'hardhat/types'
import { task } from 'hardhat/config'
import * as dotenv from 'dotenv'

// Hardhat plugins
import '@nomiclabs/hardhat-ethers'
import '@openzeppelin/hardhat-upgrades'

import { initializeAndVerifyChugSplash } from './src/languages/solidity/predeploys'

// Load environment variables from .env
dotenv.config()

const accounts = process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.15',
    settings: {
      outputSelection: {
        '*': {
          '*': ['storageLayout'],
        },
      },
      optimizer: {
        enabled: true,
        runs: 200,
      },
      metadata: {
        bytecodeHash: 'none',
      },
    },
  },
  networks: {
    goerli: {
      chainId: 5,
      url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts,
    },
    ethereum: {
      chainId: 1,
      url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts,
    },
    'optimism-goerli': {
      chainId: 420,
      url: `https://opt-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts,
    },
    optimism: {
      chainId: 10,
      url: `https://opt-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts,
    },
    arbitrum: {
      chainId: 42161,
      url: 'https://arb1.arbitrum.io/rpc',
      accounts,
    },
    'arbitrum-goerli': {
      chainId: 421613,
      url: `https://arb-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts,
    },
    polygonMumbai: {
      chainId: 80001,
      url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts,
    },
  },
}

task('deploy-system')
  .setDescription('Deploys the ChugSplash contracts to the specified network')
  .addParam('systemConfig', 'Path to a ChugSplash system config file')
  .setAction(
    async (
      args: {
        systemConfig: string
      },
      hre: HardhatRuntimeEnvironment
    ) => {
      await initializeAndVerifyChugSplash(
        args.systemConfig,
        hre.ethers.provider
      )
    }
  )

export default config