export type SupportedNetwork = {
  name: string
  chainId: bigint
  rpcUrl: () => string
  etherscan: {
    apiURL: string
    browserURL: string
    envKey: string
  }
  currency: string
  dripSize: string
  requiredEnvVariables: Array<string>
  networkType: NetworkType
}

export type SupportedLocalNetwork = {
  name: string
  chainId: bigint
  networkType: NetworkType
}

export const SPHINX_LOCAL_NETWORKS: Array<SupportedLocalNetwork> = [
  {
    name: 'anvil',
    chainId: BigInt(31337),
    networkType: 'Local',
  },
]

type NetworkType = 'Testnet' | 'Mainnet' | 'Local'

export const SPHINX_NETWORKS: Array<SupportedNetwork> = [
  {
    name: 'ethereum',
    chainId: BigInt(1),
    rpcUrl: () =>
      `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
    etherscan: {
      apiURL: 'https://api.etherscan.io/api',
      browserURL: 'https://etherscan.io',
      envKey: 'ETH_ETHERSCAN_API_KEY',
    },
    currency: 'ETH',
    dripSize: '0.15',
    requiredEnvVariables: ['ALCHEMY_API_KEY'],
    networkType: 'Mainnet',
  },
  {
    name: 'sepolia',
    chainId: BigInt(11155111),
    rpcUrl: () =>
      `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
    etherscan: {
      apiURL: 'https://api-sepolia.etherscan.io/api',
      browserURL: 'https://sepolia.etherscan.io',
      envKey: 'ETH_ETHERSCAN_API_KEY',
    },
    currency: 'ETH',
    dripSize: '0.15',
    requiredEnvVariables: ['ALCHEMY_API_KEY'],
    networkType: 'Testnet',
  },
  {
    name: 'optimism',
    chainId: BigInt(10),
    rpcUrl: () =>
      `https://opt-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
    etherscan: {
      apiURL: 'https://api-optimistic.etherscan.io/api',
      browserURL: 'https://optimistic.etherscan.io/',
      envKey: 'OPT_ETHERSCAN_API_KEY',
    },
    currency: 'ETH',
    dripSize: '0.025',
    requiredEnvVariables: ['ALCHEMY_API_KEY'],
    networkType: 'Mainnet',
  },
  {
    name: 'optimism_sepolia',
    chainId: BigInt(11155420),
    rpcUrl: () =>
      `https://opt-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
    etherscan: {
      apiURL: 'https://api-sepolia-optimism.etherscan.io/api',
      browserURL: 'https://sepolia-optimism.etherscan.io/',
      envKey: 'OPT_ETHERSCAN_API_KEY',
    },
    currency: 'ETH',
    dripSize: '0.15',
    requiredEnvVariables: ['ALCHEMY_API_KEY'],
    networkType: 'Testnet',
  },
  {
    name: 'arbitrum',
    chainId: BigInt(42161),
    rpcUrl: () =>
      `https://arb-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
    etherscan: {
      apiURL: 'https://api.arbiscan.io/api',
      browserURL: 'https://arbiscan.io/',
      envKey: 'ARB_ETHERSCAN_API_KEY',
    },
    currency: 'ETH',
    dripSize: '0.025',
    requiredEnvVariables: ['ALCHEMY_API_KEY'],
    networkType: 'Mainnet',
  },
  {
    name: 'arbitrum_sepolia',
    chainId: BigInt(421614),
    rpcUrl: () =>
      `https://arb-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
    etherscan: {
      apiURL: 'https://api-sepolia.arbiscan.io/api',
      browserURL: 'https://sepolia.arbiscan.io/',
      envKey: 'ARB_ETHERSCAN_API_KEY',
    },
    currency: 'ETH',
    dripSize: '0.15',
    requiredEnvVariables: ['ALCHEMY_API_KEY'],
    networkType: 'Testnet',
  },
  {
    name: 'polygon',
    chainId: BigInt(137),
    rpcUrl: () =>
      `https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
    etherscan: {
      apiURL: 'https://api.polygonscan.com/api',
      browserURL: 'https://polygonscan.com',
      envKey: 'POLYGON_ETHERSCAN_API_KEY',
    },
    currency: 'MATIC',
    dripSize: '1',
    requiredEnvVariables: ['ALCHEMY_API_KEY'],
    networkType: 'Mainnet',
  },
  {
    name: 'polygon_mumbai',
    chainId: BigInt(80001),
    rpcUrl: () =>
      `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
    etherscan: {
      apiURL: 'https://api-testnet.polygonscan.com/api',
      browserURL: 'https://mumbai.polygonscan.com/',
      envKey: 'POLYGON_ETHERSCAN_API_KEY',
    },
    currency: 'MATIC',
    dripSize: '0.15',
    requiredEnvVariables: ['ALCHEMY_API_KEY'],
    networkType: 'Testnet',
  },
  {
    name: 'bnb',
    chainId: BigInt(56),
    rpcUrl: () => process.env.BNB_MAINNET_URL!,
    etherscan: {
      apiURL: 'https://api.bscscan.com/api',
      browserURL: 'https://bscscan.com',
      envKey: 'BNB_ETHERSCAN_API_KEY',
    },
    currency: 'BNB',
    dripSize: '0.05',
    requiredEnvVariables: ['BNB_MAINNET_URL'],
    networkType: 'Mainnet',
  },
  {
    name: 'bnb_testnet',
    chainId: BigInt(97),
    rpcUrl: () => process.env.BNB_TESTNET_URL!,
    etherscan: {
      apiURL: 'https://api-testnet.bscscan.com/api',
      browserURL: 'https://testnet.bscscan.com',
      envKey: 'BNB_ETHERSCAN_API_KEY',
    },
    currency: 'BNB',
    dripSize: '0.15',
    requiredEnvVariables: ['BNB_TESTNET_URL'],
    networkType: 'Testnet',
  },
  {
    name: 'gnosis',
    chainId: BigInt(100),
    rpcUrl: () => process.env.GNOSIS_MAINNET_URL!,
    etherscan: {
      apiURL: 'https://api.gnosisscan.io/api',
      browserURL: 'https://gnosisscan.io',
      envKey: 'GNOSIS_MAINNET_ETHERSCAN_API_KEY',
    },
    currency: 'xDAI',
    dripSize: '1',
    requiredEnvVariables: ['GNOSIS_MAINNET_URL'],
    networkType: 'Mainnet',
  },
  {
    name: 'gnosis_chiado',
    chainId: BigInt(10200),
    rpcUrl: () => process.env.CHIADO_RPC_URL!,
    etherscan: {
      apiURL: 'https://gnosis-chiado.blockscout.com/api',
      browserURL: 'https://gnosis-chiado.blockscout.com',
      envKey: 'GNOSIS_CHIADO_ETHERSCAN_API_KEY',
    },
    currency: 'xDAI',
    dripSize: '0.15',
    requiredEnvVariables: ['CHIADO_RPC_URL'],
    networkType: 'Testnet',
  },
  {
    name: 'linea',
    chainId: BigInt(59144),
    rpcUrl: () =>
      `https://linea-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
    etherscan: {
      apiURL: 'https://api.lineascan.build/api',
      browserURL: 'https://lineascan.build',
      envKey: 'LINEA_ETHERSCAN_API_KEY',
    },
    currency: 'ETH',
    dripSize: '0.025',
    requiredEnvVariables: ['INFURA_API_KEY'],
    networkType: 'Mainnet',
  },
  {
    name: 'linea_goerli',
    chainId: BigInt(59140),
    rpcUrl: () =>
      `https://linea-goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
    etherscan: {
      apiURL: 'https://api-goerli.lineascan.build/api',
      browserURL: 'https://goerli.lineascan.build',
      envKey: 'LINEA_ETHERSCAN_API_KEY',
    },
    currency: 'ETH',
    dripSize: '0.15',
    requiredEnvVariables: ['INFURA_API_KEY'],
    networkType: 'Testnet',
  },
  {
    name: 'polygon_zkevm',
    chainId: BigInt(1101),
    rpcUrl: () => process.env.POLYGON_ZKEVM_MAINNET_URL!,
    etherscan: {
      apiURL: 'https://api.lineascan.build/api',
      browserURL: 'https://lineascan.build',
      envKey: 'POLYGON_ZKEVM_ETHERSCAN_API_KEY',
    },
    currency: 'ETH',
    dripSize: '0.025',
    requiredEnvVariables: ['POLYGON_ZKEVM_MAINNET_URL'],
    networkType: 'Mainnet',
  },
  {
    name: 'polygon_zkevm_goerli',
    chainId: BigInt(1442),
    rpcUrl: () => process.env.POLYGON_ZKEVM_TESTNET_URL!,
    etherscan: {
      apiURL: 'https://api-testnet-zkevm.polygonscan.com/api',
      browserURL: 'https://testnet-zkevm.polygonscan.com',
      envKey: 'POLYGON_ZKEVM_ETHERSCAN_API_KEY',
    },
    currency: 'ETH',
    dripSize: '0.15',
    requiredEnvVariables: ['POLYGON_ZKEVM_TESTNET_URL'],
    networkType: 'Testnet',
  },
  {
    name: 'avalanche',
    chainId: BigInt(43114),
    rpcUrl: () =>
      `https://avalanche-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
    etherscan: {
      apiURL: 'https://api.snowtrace.io/api',
      browserURL: 'https://snowtrace.io/',
      envKey: 'AVAX_ETHERSCAN_API_KEY',
    },
    currency: 'AVAX',
    dripSize: '1',
    requiredEnvVariables: ['INFURA_API_KEY'],
    networkType: 'Mainnet',
  },
  {
    name: 'avalanche_fuji',
    chainId: BigInt(43113),
    rpcUrl: () =>
      `https://avalanche-fuji.infura.io/v3/${process.env.INFURA_API_KEY}`,
    etherscan: {
      apiURL: 'https://api-testnet.snowtrace.io/api',
      browserURL: 'https://testnet.snowtrace.io/',
      envKey: 'AVAX_ETHERSCAN_API_KEY',
    },
    currency: 'AVAX',
    dripSize: '1',
    requiredEnvVariables: ['INFURA_API_KEY'],
    networkType: 'Testnet',
  },
  {
    name: 'fantom',
    chainId: BigInt(250),
    rpcUrl: () => process.env.FANTOM_MAINNET_RPC_URL!,
    etherscan: {
      apiURL: 'https://api.ftmscan.com/api',
      browserURL: 'https://ftmscan.com',
      envKey: 'FANTOM_ETHERSCAN_API_KEY',
    },
    currency: 'FTM',
    dripSize: '1',
    requiredEnvVariables: ['FANTOM_MAINNET_RPC_URL'],
    networkType: 'Mainnet',
  },
  {
    name: 'fantom_testnet',
    chainId: BigInt(4002),
    rpcUrl: () => process.env.FANTOM_TESTNET_RPC_URL!,
    etherscan: {
      apiURL: 'https://api-testnet.ftmscan.com/api',
      browserURL: 'https://testnet.ftmscan.com',
      envKey: 'FANTOM_ETHERSCAN_API_KEY',
    },
    currency: 'FTM',
    dripSize: '1',
    requiredEnvVariables: ['FANTOM_TESTNET_RPC_URL'],
    networkType: 'Testnet',
  },
  {
    name: 'base',
    chainId: BigInt(8453),
    rpcUrl: () =>
      `https://base-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
    etherscan: {
      apiURL: 'https://api.basescan.org/api',
      browserURL: 'https://basescan.org/',
      envKey: 'BASE_ETHERSCAN_API_KEY',
    },
    currency: 'ETH',
    dripSize: '0.025',
    requiredEnvVariables: ['ALCHEMY_API_KEY'],
    networkType: 'Mainnet',
  },
  {
    name: 'base_sepolia',
    chainId: BigInt(84532),
    rpcUrl: () =>
      `https://base-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
    etherscan: {
      apiURL: 'https://base-sepolia.blockscout.com/api',
      browserURL: 'https://base-sepolia.blockscout.com/',
      envKey: 'BASE_ETHERSCAN_API_KEY',
    },
    currency: 'ETH',
    dripSize: '0.15',
    requiredEnvVariables: ['ALCHEMY_API_KEY'],
    networkType: 'Testnet',
  },
  // {
  //   name: 'celo',
  //   chainId: BigInt(42220),
  //   rpcUrl: () =>
  //     `https://celo-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
  //   etherscan: {
  //     apiURL: 'https://api.celoscan.io/api',
  //     browserURL: 'https://celoscan.io/',
  //     envKey: 'CELO_ETHERSCAN_API_KEY',
  //   },
  //   currency: 'CELO',
  //   dripSize: '1',
  //   requiredEnvVariables: ['INFURA_API_KEY'],
  // },
  // {
  //   name: 'celo_alfajores',
  //   chainId: BigInt(44787),
  //   rpcUrl: () =>
  //     `https://celo-alfajores.infura.io/v3/${process.env.INFURA_API_KEY}`,
  //   etherscan: {
  //     apiURL: 'https://api-alfajores.celoscan.io/api',
  //     browserURL: 'https://alfajores.celoscan.io/',
  //     envKey: 'CELO_ETHERSCAN_API_KEY',
  //   },
  //   currency: 'CELO',
  //   dripSize: '0.15',
  //   requiredEnvVariables: ['INFURA_API_KEY'],
  // },
  // {
  //   name: 'moonriver',
  //   chainId: BigInt(1285),
  //   rpcUrl: () => process.env.MOONRIVER_RPC_URL!,
  //   etherscan: {
  //     apiURL: 'https://api-moonriver.moonscan.io/api',
  //     browserURL: 'https://moonriver.moonscan.io',
  //     envKey: 'MOON_ETHERSCAN_API_KEY',
  //   },
  //   currency: 'MOVR',
  //   dripSize: '0.15',
  //   requiredEnvVariables: ['MOONRIVER_RPC_URL'],
  // },
  // {
  //   name: 'moonbeam',
  //   chainId: BigInt(1284),
  //   rpcUrl: () => process.env.MOONBEAM_RPC_URL!,
  //   etherscan: {
  //     apiURL: 'https://api-moonriver.moonscan.io/api',
  //     browserURL: 'https://moonriver.moonscan.io',
  //     envKey: 'MOON_ETHERSCAN_API_KEY',
  //   },
  //   currency: 'GLMR',
  //   dripSize: '1',
  //   requiredEnvVariables: ['MOONBEAM_RPC_URL'],
  // },
  // {
  //   name: 'moonbase_alpha',
  //   chainId: BigInt(1284),
  //   rpcUrl: () => process.env.MOONBASE_ALPHA_RPC_URL!,
  //   etherscan: {
  //     apiURL: 'https://api-moonriver.moonscan.io/api',
  //     browserURL: 'https://moonriver.moonscan.io',
  //     envKey: 'MOON_ETHERSCAN_API_KEY',
  //   },
  //   currency: 'DEV',
  //   dripSize: '0.15',
  //   requiredEnvVariables: ['MOONBASE_ALPHA_RPC_URL'],
  // },
  // {
  //   name: 'fuse',
  //   chainId: BigInt(122),
  //   rpcUrl: () => process.env.FUSE_RPC_URL!,
  //   etherscan: {
  //     apiURL: 'https://explorer.fuse.io/api',
  //     browserURL: 'https://explorer.fuse.io',
  //     envKey: 'FUSE_ETHERSCAN_API_KEY',
  //   },
  //   currency: 'FUSE',
  //   dripSize: '1',
  //   requiredEnvVariables: ['FUSE_RPC_URL'],
  // },
  // {
  //   name: 'fuse_sparknet',
  //   chainId: BigInt(123),
  //   rpcUrl: () => process.env.FUSE_SPARKNET_RPC_URL!,
  //   etherscan: {
  //     apiURL: 'https://explorer.fusespark.io/api',
  //     browserURL: 'https://explorer.fusespark.io',
  //     envKey: 'FUSE_ETHERSCAN_API_KEY',
  //   },
  //   currency: 'FUSE',
  //   dripSize: '1',
  //   requiredEnvVariables: ['FUSE_SPARKNET_RPC_URL'],
  // },
  // {
  //   name: 'evmos',
  //   chainId: BigInt(9001),
  //   rpcUrl: () => process.env.EVMOS_RPC_URL!,
  //   etherscan: {
  //     // Need to support sourcify
  //     apiURL: '',
  //     browserURL: '',
  //     envKey: '',
  //   },
  //   currency: 'EVMOS',
  //   dripSize: '1',
  //   requiredEnvVariables: ['EVMOS_RPC_URL'],
  // },
  // {
  //   name: 'evmos_testnet',
  //   chainId: BigInt(9000),
  //   rpcUrl: () => process.env.EVMOS_TESTNET_RPC_URL!,
  //   etherscan: {
  //     // Need to support sourcify
  //     apiURL: '',
  //     browserURL: '',
  //     envKey: '',
  //   },
  //   currency: 'EVMOS',
  //   dripSize: '1',
  //   requiredEnvVariables: ['EVMOS_TESTNET_RPC_URL'],
  // },
  // {
  //   name: 'kava',
  //   chainId: BigInt(2222),
  //   rpcUrl: () => process.env.KAVA_RPC_URL!,
  //   etherscan: {
  //     apiURL: 'https://kavascan.com/api',
  //     browserURL: 'https://kavascan.com',
  //     envKey: 'KAVA_ETHERSCAN_API_KEY',
  //   },
  //   currency: 'KAVA',
  //   dripSize: '1',
  //   requiredEnvVariables: ['EVMOS_KAVA_RPC_URL'],
  // },
  // {
  //   name: 'kava_testnet',
  //   chainId: BigInt(2221),
  //   rpcUrl: () => process.env.KAVA_TESTNET_RPC_URL!,
  //   etherscan: {
  //     apiURL: 'https://testnet.kavascan.com/api',
  //     browserURL: 'https://testnet.kavascan.com',
  //     envKey: 'KAVA_ETHERSCAN_API_KEY',
  //   },
  //   currency: 'KAVA',
  //   dripSize: '1',
  //   requiredEnvVariables: ['KAVA_TESTNET_RPC_URL'],
  // },
  // {
  //   name: 'oktc',
  //   chainId: BigInt(66),
  //   rpcUrl: () => process.env.OKTC_RPC_URL!,
  //   etherscan: {
  //     apiURL:
  //       'https://www.oklink.com/api/explorer/v1/contract/verify/async/api',
  //     browserURL: 'https://www.okx.com/explorer/oktc/',
  //     envKey: 'OKTC_ETHERSCAN_API_KEY',
  //   },
  //   currency: 'OKT',
  //   dripSize: '0.15',
  //   requiredEnvVariables: ['OKTC_RPC_URL'],
  // },
  // {
  //   name: 'rootstock',
  //   chainId: BigInt(30),
  //   rpcUrl: () => process.env.ROOTSTOCK_RPC_URL!,
  //   etherscan: {
  //     // Need to support sourcify
  //     apiURL: '',
  //     browserURL: '',
  //     envKey: '',
  //   },
  //   currency: 'RBTC',
  //   dripSize: '0.0001',
  //   requiredEnvVariables: ['ROOTSTOCK_RPC_URL'],
  // },
  // {
  //   name: 'rootstock_testnet',
  //   chainId: BigInt(31),
  //   rpcUrl: () => process.env.ROOTSTOCK_TESTNET_RPC_URL!,
  //   etherscan: {
  //     // Need to support sourcify
  //     apiURL: '',
  //     browserURL: '',
  //     envKey: '',
  //   },
  //   currency: 'RBTC',
  //   dripSize: '0.0001',
  //   requiredEnvVariables: ['ROOTSTOCK_TESTNET_RPC_URL'],
  // },
]
