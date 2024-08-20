import {
  LITChain,
  LITCosmosChain,
  LITEVMChain,
  LITSVMChain,
} from '@lit-protocol/types';

/**
 * Lit Protocol Network Public Key
 */
export const NETWORK_PUB_KEY: string =
  '9971e835a1fe1a4d78e381eebbe0ddc84fde5119169db816900de796d10187f3c53d65c1202ac083d099a517f34a9b62';

// you can either pass a "chain" param to lit functions, which it uses to tell which network your sig came from.
// or, you can pass a authSig that has and of these keys in it to tell which network your sig came from.
export const LIT_AUTH_SIG_CHAIN_KEYS: string[] = [
  'ethereum',
  'solana',
  'cosmos',
  'kyve',
];

export const AUTH_SIGNATURE_BODY =
  'I am creating an account to use Lit Protocol at {{timestamp}}';

const oldChronicleChain = {
  contractAddress: null,
  chainId: 175177,
  name: 'Chronicle - Lit Protocol Testnet',
  symbol: 'tstLIT',
  decimals: 18,
  rpcUrls: [
    'https://lit-protocol.calderachain.xyz/replica-http',
    'https://chain-rpc.litprotocol.com/http',
  ],
  blockExplorerUrls: ['https://chain.litprotocol.com/'],
  type: null,
  vmType: 'EVM',
};

const yellowstoneChain = {
  contractAddress: null,
  chainId: 175188,
  name: 'Chronicle Yellowstone - Lit Protocol Testnet',
  symbol: 'tstLPX',
  decimals: 18,
  rpcUrls: ['https://yellowstone-rpc.litprotocol.com/'],
  blockExplorerUrls: ['https://yellowstone-explorer.litprotocol.com/'],
  type: null,
  vmType: 'EVM',
};

/**
 * EVM Chains supported by the LIT protocol.  Each chain includes an optional pre-deployed token contract that you may use for minting LITs.  These are ERC1155 contracts that let you mint any quantity of a given token.  Use the chain name as a key in this object.
 * @constant
 * @type { LITEVMChain }
 * @default
 */
export const LIT_CHAINS: LITChain<LITEVMChain> = {
  ethereum: {
    contractAddress: '0xA54F7579fFb3F98bd8649fF02813F575f9b3d353',
    chainId: 1,
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
    type: 'ERC1155',
    rpcUrls: [
      'https://eth-mainnet.alchemyapi.io/v2/EuGnkVlzVoEkzdg0lpCarhm8YHOxWVxE',
    ],
    blockExplorerUrls: ['https://etherscan.io'],
    vmType: 'EVM',
  },
  polygon: {
    contractAddress: '0x7C7757a9675f06F3BE4618bB68732c4aB25D2e88',
    chainId: 137,
    name: 'Polygon',
    symbol: 'MATIC',
    decimals: 18,
    rpcUrls: ['https://polygon-rpc.com'],
    blockExplorerUrls: ['https://explorer.matic.network'],
    type: 'ERC1155',
    vmType: 'EVM',
  },
  fantom: {
    contractAddress: '0x5bD3Fe8Ab542f0AaBF7552FAAf376Fd8Aa9b3869',
    chainId: 250,
    name: 'Fantom',
    symbol: 'FTM',
    decimals: 18,
    rpcUrls: ['https://rpcapi.fantom.network'],
    blockExplorerUrls: ['https://ftmscan.com'],
    type: 'ERC1155',
    vmType: 'EVM',
  },
  xdai: {
    contractAddress: '0xDFc2Fd83dFfD0Dafb216F412aB3B18f2777406aF',
    chainId: 100,
    name: 'xDai',
    symbol: 'xDai',
    decimals: 18,
    rpcUrls: ['https://rpc.gnosischain.com'],
    blockExplorerUrls: [' https://blockscout.com/xdai/mainnet'],
    type: 'ERC1155',
    vmType: 'EVM',
  },
  bsc: {
    contractAddress: '0xc716950e5DEae248160109F562e1C9bF8E0CA25B',
    chainId: 56,
    name: 'Binance Smart Chain',
    symbol: 'BNB',
    decimals: 18,
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    blockExplorerUrls: [' https://bscscan.com/'],
    type: 'ERC1155',
    vmType: 'EVM',
  },
  arbitrum: {
    contractAddress: '0xc716950e5DEae248160109F562e1C9bF8E0CA25B',
    chainId: 42161,
    name: 'Arbitrum',
    symbol: 'AETH',
    decimals: 18,
    type: 'ERC1155',
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    blockExplorerUrls: ['https://arbiscan.io/'],
    vmType: 'EVM',
  },
  avalanche: {
    contractAddress: '0xBB118507E802D17ECDD4343797066dDc13Cde7C6',
    chainId: 43114,
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18,
    type: 'ERC1155',
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://snowtrace.io/'],
    vmType: 'EVM',
  },
  fuji: {
    contractAddress: '0xc716950e5DEae248160109F562e1C9bF8E0CA25B',
    chainId: 43113,
    name: 'Avalanche FUJI Testnet',
    symbol: 'AVAX',
    decimals: 18,
    type: 'ERC1155',
    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://testnet.snowtrace.io/'],
    vmType: 'EVM',
  },
  harmony: {
    contractAddress: '0xBB118507E802D17ECDD4343797066dDc13Cde7C6',
    chainId: 1666600000,
    name: 'Harmony',
    symbol: 'ONE',
    decimals: 18,
    type: 'ERC1155',
    rpcUrls: ['https://api.harmony.one'],
    blockExplorerUrls: ['https://explorer.harmony.one/'],
    vmType: 'EVM',
  },
  mumbai: {
    contractAddress: '0xc716950e5DEae248160109F562e1C9bF8E0CA25B',
    chainId: 80001,
    name: 'Mumbai',
    symbol: 'MATIC',
    decimals: 18,
    rpcUrls: [
      'https://rpc-mumbai.maticvigil.com/v1/96bf5fa6e03d272fbd09de48d03927b95633726c',
    ],
    blockExplorerUrls: ['https://mumbai.polygonscan.com'],
    type: 'ERC1155',
    vmType: 'EVM',
  },
  goerli: {
    contractAddress: '0xc716950e5DEae248160109F562e1C9bF8E0CA25B',
    chainId: 5,
    name: 'Goerli',
    symbol: 'ETH',
    decimals: 18,
    rpcUrls: ['https://goerli.infura.io/v3/96dffb3d8c084dec952c61bd6230af34'],
    blockExplorerUrls: ['https://goerli.etherscan.io'],
    type: 'ERC1155',
    vmType: 'EVM',
  },
  cronos: {
    contractAddress: '0xc716950e5DEae248160109F562e1C9bF8E0CA25B',
    chainId: 25,
    name: 'Cronos',
    symbol: 'CRO',
    decimals: 18,
    rpcUrls: ['https://evm-cronos.org'],
    blockExplorerUrls: ['https://cronos.org/explorer/'],
    type: 'ERC1155',
    vmType: 'EVM',
  },
  optimism: {
    contractAddress: '0xbF68B4c9aCbed79278465007f20a08Fa045281E0',
    chainId: 10,
    name: 'Optimism',
    symbol: 'ETH',
    decimals: 18,
    rpcUrls: ['https://mainnet.optimism.io'],
    blockExplorerUrls: ['https://optimistic.etherscan.io'],
    type: 'ERC1155',
    vmType: 'EVM',
  },
  celo: {
    contractAddress: '0xBB118507E802D17ECDD4343797066dDc13Cde7C6',
    chainId: 42220,
    name: 'Celo',
    symbol: 'CELO',
    decimals: 18,
    rpcUrls: ['https://forno.celo.org'],
    blockExplorerUrls: ['https://explorer.celo.org'],
    type: 'ERC1155',
    vmType: 'EVM',
  },
  aurora: {
    contractAddress: null,
    chainId: 1313161554,
    name: 'Aurora',
    symbol: 'ETH',
    decimals: 18,
    rpcUrls: ['https://mainnet.aurora.dev'],
    blockExplorerUrls: ['https://aurorascan.dev'],
    type: null,
    vmType: 'EVM',
  },
  eluvio: {
    contractAddress: null,
    chainId: 955305,
    name: 'Eluvio',
    symbol: 'ELV',
    decimals: 18,
    rpcUrls: ['https://host-76-74-28-226.contentfabric.io/eth'],
    blockExplorerUrls: ['https://explorer.eluv.io'],
    type: null,
    vmType: 'EVM',
  },
  alfajores: {
    contractAddress: null,
    chainId: 44787,
    name: 'Alfajores',
    symbol: 'CELO',
    decimals: 18,
    rpcUrls: ['https://alfajores-forno.celo-testnet.org'],
    blockExplorerUrls: ['https://alfajores-blockscout.celo-testnet.org'],
    type: null,
    vmType: 'EVM',
  },
  xdc: {
    contractAddress: null,
    chainId: 50,
    name: 'XDC Blockchain',
    symbol: 'XDC',
    decimals: 18,
    rpcUrls: ['https://rpc.xinfin.network'],
    blockExplorerUrls: ['https://explorer.xinfin.network'],
    type: null,
    vmType: 'EVM',
  },
  evmos: {
    contractAddress: null,
    chainId: 9001,
    name: 'EVMOS',
    symbol: 'EVMOS',
    decimals: 18,
    rpcUrls: ['https://eth.bd.evmos.org:8545'],
    blockExplorerUrls: ['https://evm.evmos.org'],
    type: null,
    vmType: 'EVM',
  },
  evmosTestnet: {
    contractAddress: null,
    chainId: 9000,
    name: 'EVMOS Testnet',
    symbol: 'EVMOS',
    decimals: 18,
    rpcUrls: ['https://eth.bd.evmos.dev:8545'],
    blockExplorerUrls: ['https://evm.evmos.dev'],
    type: null,
    vmType: 'EVM',
  },
  bscTestnet: {
    contractAddress: null,
    chainId: 97,
    name: 'BSC Testnet',
    symbol: 'BNB',
    decimals: 18,
    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
    blockExplorerUrls: ['https://testnet.bscscan.com/'],
    type: null,
    vmType: 'EVM',
  },
  baseGoerli: {
    contractAddress: null,
    chainId: 84531,
    name: 'Base Goerli',
    symbol: 'ETH',
    decimals: 18,
    rpcUrls: ['https://goerli.base.org'],
    blockExplorerUrls: ['https://goerli.basescan.org'],
    type: null,
    vmType: 'EVM',
  },
  baseSepolia: {
    contractAddress: null,
    chainId: 84532,
    name: 'Base Sepolia',
    symbol: 'ETH',
    decimals: 18,
    rpcUrls: ['https://sepolia.base.org'],
    blockExplorerUrls: ['https://sepolia.basescan.org'],
    type: null,
    vmType: 'EVM',
  },
  moonbeam: {
    contractAddress: null,
    chainId: 1284,
    name: 'Moonbeam',
    symbol: 'GLMR',
    decimals: 18,
    rpcUrls: ['https://rpc.api.moonbeam.network'],
    blockExplorerUrls: ['https://moonscan.io'],
    type: null,
    vmType: 'EVM',
  },
  moonriver: {
    contractAddress: null,
    chainId: 1285,
    name: 'Moonriver',
    symbol: 'MOVR',
    decimals: 18,
    rpcUrls: ['https://rpc.api.moonriver.moonbeam.network'],
    blockExplorerUrls: ['https://moonriver.moonscan.io'],
    type: null,
    vmType: 'EVM',
  },
  moonbaseAlpha: {
    contractAddress: null,
    chainId: 1287,
    name: 'Moonbase Alpha',
    symbol: 'DEV',
    decimals: 18,
    rpcUrls: ['https://rpc.api.moonbase.moonbeam.network'],
    blockExplorerUrls: ['https://moonbase.moonscan.io/'],
    type: null,
    vmType: 'EVM',
  },
  filecoin: {
    contractAddress: null,
    chainId: 314,
    name: 'Filecoin',
    symbol: 'FIL',
    decimals: 18,
    rpcUrls: ['https://api.node.glif.io/rpc/v1'],
    blockExplorerUrls: ['https://filfox.info/'],
    type: null,
    vmType: 'EVM',
  },
  hyperspace: {
    contractAddress: null,
    chainId: 3141,
    name: 'Filecoin Hyperspace testnet',
    symbol: 'tFIL',
    decimals: 18,
    rpcUrls: ['https://api.hyperspace.node.glif.io/rpc/v1'],
    blockExplorerUrls: ['https://hyperspace.filscan.io/'],
    type: null,
    vmType: 'EVM',
  },
  sepolia: {
    contractAddress: null,
    chainId: 11155111,
    name: 'Sepolia Testnet',
    symbol: 'ETH',
    decimals: 18,
    rpcUrls: ['https://ethereum-sepolia-rpc.publicnode.com'],
    blockExplorerUrls: ['https://sepolia.etherscan.io/'],
    type: null,
    vmType: 'EVM',
  },
  scrollAlphaTestnet: {
    contractAddress: null,
    chainId: 534353,
    name: 'Scroll Alpha Testnet',
    symbol: 'ETH',
    decimals: 18,
    rpcUrls: ['https://alpha-rpc.scroll.io/l2'],
    blockExplorerUrls: ['https://blockscout.scroll.io/'],
    type: null,
    vmType: 'EVM',
  },
  scroll: {
    contractAddress: null,
    chainId: 534352,
    name: 'Scroll',
    symbol: 'ETH',
    decimals: 18,
    rpcUrls: ['https://rpc.scroll.io'],
    blockExplorerUrls: ['https://scrollscan.com/'],
    type: null,
    vmType: 'EVM',
  },
  zksync: {
    contractAddress: null,
    chainId: 324,
    name: 'zkSync Era Mainnet',
    symbol: 'ETH',
    decimals: 18,
    rpcUrls: ['https://mainnet.era.zksync.io'],
    blockExplorerUrls: ['https://explorer.zksync.io/'],
    type: null,
    vmType: 'EVM',
  },
  base: {
    contractAddress: null,
    chainId: 8453,
    name: 'Base Mainnet',
    symbol: 'ETH',
    decimals: 18,
    rpcUrls: ['https://mainnet.base.org'],
    blockExplorerUrls: ['https://basescan.org'],
    type: null,
    vmType: 'EVM',
  },
  lukso: {
    contractAddress: null,
    chainId: 42,
    name: 'Lukso',
    symbol: 'ETH',
    decimals: 18,
    rpcUrls: ['https://rpc.lukso.gateway.fm'],
    blockExplorerUrls: ['https://explorer.execution.mainnet.lukso.network/'],
    type: null,
    vmType: 'EVM',
  },
  luksoTestnet: {
    contractAddress: null,
    chainId: 4201,
    name: 'Lukso Testnet',
    symbol: 'ETH',
    decimals: 18,
    rpcUrls: ['https://rpc.testnet.lukso.network'],
    blockExplorerUrls: ['https://explorer.execution.testnet.lukso.network'],
    type: null,
    vmType: 'EVM',
  },
  zora: {
    contractAddress: null,
    chainId: 7777777,
    name: '	Zora',
    symbol: 'ETH',
    decimals: 18,
    rpcUrls: ['https://rpc.zora.energy/'],
    blockExplorerUrls: ['https://explorer.zora.energy'],
    type: null,
    vmType: 'EVM',
  },
  zoraGoerli: {
    contractAddress: null,
    chainId: 999,
    name: 'Zora Goerli',
    symbol: 'ETH',
    decimals: 18,
    rpcUrls: ['https://testnet.rpc.zora.energy'],
    blockExplorerUrls: ['https://testnet.explorer.zora.energy'],
    type: null,
    vmType: 'EVM',
  },
  zksyncTestnet: {
    contractAddress: null,
    chainId: 280,
    name: 'zkSync Era Testnet',
    symbol: 'ETH',
    decimals: 18,
    rpcUrls: ['https://testnet.era.zksync.dev'],
    blockExplorerUrls: ['https://goerli.explorer.zksync.io/'],
    type: null,
    vmType: 'EVM',
  },
  lineaGoerli: {
    contractAddress: null,
    chainId: 59140,
    name: 'Linea Testnet',
    symbol: 'ETH',
    decimals: 18,
    rpcUrls: ['https://rpc.goerli.linea.build'],
    blockExplorerUrls: ['https://explorer.goerli.linea.build'],
    type: null,
    vmType: 'EVM',
  },

  /**
   * Chainlist entry for the Chronicle Testnet.
   * https://chainlist.org/chain/175177
   */
  chronicleTestnet: oldChronicleChain,

  /**
   * Use this for `>= DatilTest` network.
   * Chainlist entry for the Chronicle Yellowstone Testnet.
   * https://chainlist.org/chain/175188
   */
  yellowstone: yellowstoneChain,

  lit: oldChronicleChain,

  chiado: {
    contractAddress: null,
    chainId: 10200,
    name: 'Chiado',
    symbol: 'XDAI',
    decimals: 18,
    rpcUrls: ['https://rpc.chiadochain.net'],
    blockExplorerUrls: ['https://blockscout.chiadochain.net'],
    type: null,
    vmType: 'EVM',
  },
  zkEvm: {
    contractAddress: null,
    chainId: 1101,
    name: 'zkEvm',
    symbol: 'ETH',
    decimals: 18,
    rpcUrls: ['https://zkevm-rpc.com'],
    blockExplorerUrls: ['https://zkevm.polygonscan.com/'],
    type: null,
    vmType: 'EVM',
  },
  mantleTestnet: {
    contractAddress: null,
    chainId: 5001,
    name: 'Mantle Testnet',
    symbol: 'MNT',
    decimals: 18,
    rpcUrls: ['https://rpc.testnet.mantle.xyz'],
    blockExplorerUrls: ['https://explorer.testnet.mantle.xyz/'],
    type: null,
    vmType: 'EVM',
  },
  mantle: {
    contractAddress: null,
    chainId: 5000,
    name: 'Mantle',
    symbol: 'MNT',
    decimals: 18,
    rpcUrls: ['https://rpc.mantle.xyz'],
    blockExplorerUrls: ['http://explorer.mantle.xyz/'],
    type: null,
    vmType: 'EVM',
  },
  klaytn: {
    contractAddress: null,
    chainId: 8217,
    name: 'Klaytn',
    symbol: 'KLAY',
    decimals: 18,
    rpcUrls: ['https://klaytn.blockpi.network/v1/rpc/public'],
    blockExplorerUrls: ['https://www.klaytnfinder.io/'],
    type: null,
    vmType: 'EVM',
  },
  publicGoodsNetwork: {
    contractAddress: null,
    chainId: 424,
    name: 'Public Goods Network',
    symbol: 'ETH',
    decimals: 18,
    rpcUrls: ['https://rpc.publicgoods.network'],
    blockExplorerUrls: ['https://explorer.publicgoods.network/'],
    type: null,
    vmType: 'EVM',
  },
  optimismGoerli: {
    contractAddress: null,
    chainId: 420,
    name: 'Optimism Goerli',
    symbol: 'ETH',
    decimals: 18,
    rpcUrls: ['https://optimism-goerli.publicnode.com'],
    blockExplorerUrls: ['https://goerli-optimism.etherscan.io/'],
    type: null,
    vmType: 'EVM',
  },
  waevEclipseTestnet: {
    contractAddress: null,
    chainId: 91006,
    name: 'Waev Eclipse Testnet',
    symbol: 'ecWAEV',
    decimals: 18,
    rpcUrls: ['https://api.evm.waev.eclipsenetwork.xyz'],
    blockExplorerUrls: ['http://waev.explorer.modular.cloud/'],
    type: null,
    vmType: 'EVM',
  },
  waevEclipseDevnet: {
    contractAddress: null,
    chainId: 91006,
    name: 'Waev Eclipse Devnet',
    symbol: 'ecWAEV',
    decimals: 18,
    rpcUrls: ['https://api.evm.waev.dev.eclipsenetwork.xyz'],
    blockExplorerUrls: ['http://waev.explorer.modular.cloud/'],
    type: null,
    vmType: 'EVM',
  },
  verifyTestnet: {
    contractAddress: null,
    chainId: 1833,
    name: 'Verify Testnet',
    symbol: 'MATIC',
    decimals: 18,
    rpcUrls: ['https://rpc.verify-testnet.gelato.digital'],
    blockExplorerUrls: ['https://verify-testnet.blockscout.com/'],
    type: null,
    vmType: 'EVM',
  },
};

/**
 * @deprecated Will be removed in version 7.x. - This is using the OLD chornicle testnet. `LIT_CHAINS['chronicleTestnet']` instead, or use `LIT_CHAINS['yellowstone']` for the new Chronicle Yellowstone Testnet (Jul 2024). (Updated to use `yellowstone` chain instead 22 July 2024)
 */
export const LIT_CHAIN_RPC_URL = LIT_CHAINS['chronicleTestnet'].rpcUrls[0];

/**
 * Object containing information to submit to Metamask
 */
export const METAMASK_CHAIN_INFO = {
  /**
   * Information about the "chronicle" chain.
   */
  chronicle: {
    chainId: LIT_CHAINS['chronicleTestnet'].chainId,
    chainName: LIT_CHAINS['chronicleTestnet'].name,
    nativeCurrency: {
      name: LIT_CHAINS['chronicleTestnet'].symbol,
      symbol: LIT_CHAINS['chronicleTestnet'].symbol,
      decimals: LIT_CHAINS['chronicleTestnet'].decimals,
    },
    rpcUrls: LIT_CHAINS['chronicleTestnet'].rpcUrls,
    blockExplorerUrls: LIT_CHAINS['chronicleTestnet'].blockExplorerUrls,
    iconUrls: ['future'],
  },

  /**
   * Information about the "chronicleYellowstone" chain.
   */
  yellowstone: {
    chainId: LIT_CHAINS['yellowstone'].chainId,
    chainName: LIT_CHAINS['yellowstone'].name,
    nativeCurrency: {
      name: LIT_CHAINS['yellowstone'].symbol,
      symbol: LIT_CHAINS['yellowstone'].symbol,
      decimals: LIT_CHAINS['yellowstone'].decimals,
    },
    rpcUrls: LIT_CHAINS['yellowstone'].rpcUrls,
    blockExplorerUrls: LIT_CHAINS['yellowstone'].blockExplorerUrls,
    iconUrls: ['future'],
  },
};
/**
 * @deprecated Will be removed - Use METAMASK_CHAIN_INFO instead
 * Alias for {@link METAMASK_CHAIN_INFO}. Added for backwards compatibility.
 * See {@link METAMASK_CHAIN_INFO}
 */
export const metamaskChainInfo = METAMASK_CHAIN_INFO;

/**
 * Constants representing the available LIT RPC endpoints.
 */
export const LIT_RPC = {
  /**
   * Local Anvil RPC endpoint.
   */
  LOCAL_ANVIL: 'http://127.0.0.1:8545',

  /**
   * Chronicle RPC endpoint - Used for Cayenne, Manzano, Habanero
   */
  CHRONICLE: 'https://chain-rpc.litprotocol.com/http',

  /**
   * Chronicle Yellowstone RPC endpoint - used for >= Datil-test
   * More info: https://app.conduit.xyz/published/view/chronicle-yellowstone-testnet-9qgmzfcohk
   */
  CHRONICLE_YELLOWSTONE: 'https://yellowstone-rpc.litprotocol.com',
} as const;

export const LIT_EVM_CHAINS = LIT_CHAINS;

/**
 * Represents the Lit Network constants.
 */
export const LIT_NETWORK = {
  Cayenne: 'cayenne',
  Manzano: 'manzano',
  Habanero: 'habanero',
  DatilDev: 'datil-dev',
  DatilTest: 'datil-test',
  Datil: 'datil',
  Custom: 'custom',
} as const;
/**
 * @deprecated Will be removed. - Use LIT_NETWORK instead
 * Alias for LIT_NETWORK. Added for backwards compatibility.
 * See {@link LIT_NETWORK}
 */
export const LitNetwork = LIT_NETWORK;
/**
 * The type representing the keys of the LIT_NETWORK object.
 */
export type LIT_NETWORK_TYPES = keyof typeof LIT_NETWORK;
/**
 * The type representing the values of the LIT_NETWORK object.
 * This should replicate LIT_NETWORKS_KEYS in types package
 */
export type LIT_NETWORK_VALUES = (typeof LIT_NETWORK)[keyof typeof LIT_NETWORK];

/**
 * RPC URL by Network
 *
 * A mapping of network names to their corresponding RPC URLs.
 */
export const RPC_URL_BY_NETWORK: { [key in LIT_NETWORK_VALUES]: string } = {
  cayenne: LIT_RPC.CHRONICLE,
  manzano: LIT_RPC.CHRONICLE,
  habanero: LIT_RPC.CHRONICLE,
  'datil-dev': LIT_RPC.CHRONICLE_YELLOWSTONE,
  'datil-test': LIT_RPC.CHRONICLE_YELLOWSTONE,
  datil: LIT_RPC.CHRONICLE_YELLOWSTONE,
  custom: LIT_RPC.LOCAL_ANVIL,
};

/**
 * Mapping of network names to their corresponding relayer URLs.
 */
export const RELAYER_URL_BY_NETWORK: {
  [key in LIT_NETWORK_VALUES]: string;
} = {
  cayenne: 'https://relayer-server-staging-cayenne.getlit.dev',
  manzano: 'https://manzano-relayer.getlit.dev',
  habanero: 'https://habanero-relayer.getlit.dev',
  'datil-dev': 'https://datil-dev-relayer.getlit.dev',
  'datil-test': 'https://datil-test-relayer.getlit.dev',
  datil: 'https://datil-relayer.getlit.dev',
  custom: 'http://localhost:3000',
};

/**
 * Mapping of network values to corresponding Metamask chain info.
 */
export const METAMASK_CHAIN_INFO_BY_NETWORK: Record<
  LIT_NETWORK_VALUES,
  typeof metamaskChainInfo.chronicle | typeof metamaskChainInfo.yellowstone
> = {
  cayenne: metamaskChainInfo.chronicle,
  manzano: metamaskChainInfo.chronicle,
  habanero: metamaskChainInfo.chronicle,
  'datil-dev': metamaskChainInfo.yellowstone,
  'datil-test': metamaskChainInfo.yellowstone,
  datil: metamaskChainInfo.yellowstone,
  custom: metamaskChainInfo.yellowstone,
};

export const HTTP = 'http://';
export const HTTPS = 'https://';

/**
 * Mapping of network values to corresponding http protocol.
 */
export const HTTP_BY_NETWORK: Record<
  LIT_NETWORK_VALUES,
  typeof HTTP | typeof HTTPS
> = {
  cayenne: HTTPS,
  manzano: HTTPS,
  habanero: HTTPS,
  'datil-dev': HTTPS,
  'datil-test': HTTPS,
  datil: HTTPS,
  custom: HTTP, // default, can be changed by config
};

/**
 * Mapping of network values to their corresponding centralisation status.
 */
export const CENTRALISATION_BY_NETWORK: Record<
  LIT_NETWORK_VALUES,
  'centralised' | 'decentralised' | 'unknown'
> = {
  cayenne: 'centralised',
  manzano: 'decentralised',
  habanero: 'decentralised',
  'datil-dev': 'centralised',
  'datil-test': 'decentralised',
  datil: 'decentralised',
  custom: 'unknown',
} as const;

/**
 * Solana Chains supported by the LIT protocol.  Use the chain name as a key in this object.
 * @constant
 * @type { LITSVMChain }
 * @default
 */
export const LIT_SVM_CHAINS: LITChain<LITSVMChain> = {
  solana: {
    name: 'Solana',
    symbol: 'SOL',
    decimals: 9,
    rpcUrls: ['https://api.mainnet-beta.solana.com'],
    blockExplorerUrls: ['https://explorer.solana.com/'],
    vmType: 'SVM',
  },
  solanaDevnet: {
    name: 'Solana Devnet',
    symbol: 'SOL',
    decimals: 9,
    rpcUrls: ['https://api.devnet.solana.com'],
    blockExplorerUrls: ['https://explorer.solana.com/'],
    vmType: 'SVM',
  },
  solanaTestnet: {
    name: 'Solana Testnet',
    symbol: 'SOL',
    decimals: 9,
    rpcUrls: ['https://api.testnet.solana.com'],
    blockExplorerUrls: ['https://explorer.solana.com/'],
    vmType: 'SVM',
  },
};

/**
 * Cosmos Chains supported by the LIT protocol.  Use the chain name as a key in this object.
 * @constant
 * @type { LITCosmosChain }
 * @default
 */
export const LIT_COSMOS_CHAINS: LITChain<LITCosmosChain> = {
  cosmos: {
    name: 'Cosmos',
    symbol: 'ATOM',
    decimals: 6,
    chainId: 'cosmoshub-4',
    rpcUrls: ['https://lcd-cosmoshub.keplr.app'],
    blockExplorerUrls: ['https://atomscan.com/'],
    vmType: 'CVM',
  },
  kyve: {
    name: 'Kyve',
    symbol: 'KYVE',
    decimals: 6,
    chainId: 'korellia',
    rpcUrls: ['https://api.korellia.kyve.network'],
    blockExplorerUrls: ['https://explorer.kyve.network/'],
    vmType: 'CVM',
  },
  evmosCosmos: {
    name: 'EVMOS Cosmos',
    symbol: 'EVMOS',
    decimals: 18,
    chainId: 'evmos_9001-2',
    rpcUrls: ['https://rest.bd.evmos.org:1317'],
    blockExplorerUrls: ['https://evmos.bigdipper.live'],
    vmType: 'CVM',
  },
  evmosCosmosTestnet: {
    name: 'Evmos Cosmos Testnet',
    symbol: 'EVMOS',
    decimals: 18,
    chainId: 'evmos_9000-4',
    rpcUrls: ['https://rest.bd.evmos.dev:1317'],
    blockExplorerUrls: ['https://testnet.bigdipper.live'],
    vmType: 'CVM',
  },
  cheqdMainnet: {
    name: 'Cheqd Mainnet',
    symbol: 'CHEQ',
    decimals: 9,
    chainId: 'cheqd-mainnet-1',
    rpcUrls: ['https://api.cheqd.net'],
    blockExplorerUrls: ['https://explorer.cheqd.io'],
    vmType: 'CVM',
  },
  cheqdTestnet: {
    name: 'Cheqd Testnet',
    symbol: 'CHEQ',
    decimals: 9,
    chainId: 'cheqd-testnet-6',
    rpcUrls: ['https://api.cheqd.network'],
    blockExplorerUrls: ['https://testnet-explorer.cheqd.io'],
    vmType: 'CVM',
  },
  juno: {
    name: 'Juno',
    symbol: 'JUNO',
    decimals: 6,
    chainId: 'juno-1',
    rpcUrls: ['https://rest.cosmos.directory/juno'],
    blockExplorerUrls: ['https://www.mintscan.io/juno'],
    vmType: 'CVM',
  },
};

/**
 * All Chains supported by the LIT protocol.  Use the chain name as a key in this object.
 * @type { LITChain<LITEVMChain | LITSVMChain | LITCosmosChain> }
 */
export const ALL_LIT_CHAINS: LITChain<
  LITEVMChain | LITSVMChain | LITCosmosChain
> = {
  ...LIT_CHAINS,
  ...LIT_SVM_CHAINS,
  ...LIT_COSMOS_CHAINS,
};

/**
 * Local storage key constants
 */
export const LOCAL_STORAGE_KEYS = {
  AUTH_COSMOS_SIGNATURE: 'lit-auth-cosmos-signature',
  AUTH_SIGNATURE: 'lit-auth-signature',
  AUTH_SOL_SIGNATURE: 'lit-auth-sol-signature',
  WEB3_PROVIDER: 'lit-web3-provider',
  KEY_PAIR: 'lit-comms-keypair',
  SESSION_KEY: 'lit-session-key',
  WALLET_SIGNATURE: 'lit-wallet-sig',
};

/**
 * Symmetric key algorithm parameters
 */
export const SYMM_KEY_ALGO_PARAMS = {
  name: 'AES-CBC',
  length: 256,
};

/**
 * Default node URL for Cayenne network
 */
export const CAYENNE_URL = 'https://cayenne.litgateway.com';

/**
 * Default node URLs for each LIT network
 * Note: Dynamic networks such as Habanero have no default node URLS; they are always
 * loaded from the chain during initialization
 */
export const LIT_NETWORKS: { [key in LIT_NETWORK_VALUES]: string[] } = {
  cayenne: [],
  manzano: [],
  'datil-dev': [],
  'datil-test': [],
  datil: [],
  habanero: [],
  custom: [],
};

// ========== Lit Sessions ==========
export const LIT_SESSION_KEY_URI = 'lit:session:';

// ========== Lit Auth Methods ==========

export const AUTH_METHOD_TYPE_IDS = {
  WEBAUTHN: 3,
  DISCORD: 4,
  GOOGLE: 5,
  GOOGLE_JWT: 6,
};

// ========== PKP Client ==========
export const PKP_CLIENT_SUPPORTED_CHAINS = ['eth', 'cosmos'];

// ========== RLI Delegation ==========
export const SIWE_DELEGATION_URI = 'lit:capability:delegation';

/**
 * @deprecated Will be removed in version 7.x. - Use RELAYER_URL_BY_NETWORK.Cayenne instead
 */
export const RELAY_URL_CAYENNE =
  'https://relayer-server-staging-cayenne.getlit.dev';

/**
 * @deprecated Will be removed in version 7.x. - Use RELAYER_URL_BY_NETWORK.Habanero instead
 */
export const RELAY_URL_HABANERO = 'https://habanero-relayer.getlit.dev';

/**
 * @deprecated Will be removed in version 7.x. - Use RELAYER_URL_BY_NETWORK.Manzano instead
 */
export const RELAY_URL_MANZANO = 'https://manzano-relayer.getlit.dev';

/**
 * @deprecated Will be removed in version 7.x. - Use RELAYER_URL_BY_NETWORK.DatilDev instead
 */
export const RELAY_URL_DATIL_DEV = 'https://datil-dev-relayer.getlit.dev';

/**
 * @deprecated Will be removed in version 7.x. - Use RELAYER_URL_BY_NETWORK.DatilTest instead
 */
export const RELAY_URL_DATIL_TEST = 'https://datil-test-relayer.getlit.dev';

// ========== Lit Actions ==========
export const LIT_ACTION_IPFS_HASH =
  'QmUjX8MW6StQ7NKNdaS6g4RMkvN5hcgtKmEi8Mca6oX4t3';

// ========== Chains ==========
export const VMTYPE = {
  EVM: 'EVM',
  SVM: 'SVM',
  CVM: 'CVM',
} as const;
export type VMTYPE_TYPE = keyof typeof VMTYPE;
export type VMTYPE_VALUES = (typeof VMTYPE)[keyof typeof VMTYPE];

export const LIT_CURVE = {
  BLS: 'BLS',
  EcdsaK256: 'K256',
  EcdsaCaitSith: 'ECDSA_CAIT_SITH', // Legacy alias of K256
  EcdsaCAITSITHP256: 'EcdsaCaitSithP256',
} as const;
export type LIT_CURVE_TYPE = keyof typeof LIT_CURVE;
// This should replicate SigShare.sigType in types package
export type LIT_CURVE_VALUES = (typeof LIT_CURVE)[keyof typeof LIT_CURVE];

// ========== Either Types ==========
export const EITHER_TYPE = {
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
} as const;
export type EITHER_TYPE_TYPE = keyof typeof EITHER_TYPE;
export type EITHER_TYPE_VALUES = (typeof EITHER_TYPE)[keyof typeof EITHER_TYPE];

// ========== Supported PKP Auth Method Types ==========
export const AUTH_METHOD_TYPE = {
  EthWallet: 1,
  LitAction: 2,
  WebAuthn: 3,
  Discord: 4,
  Google: 5,
  GoogleJwt: 6,
  AppleJwt: 8,
  StytchOtp: 9,
  StytchEmailFactorOtp: 10,
  StytchSmsFactorOtp: 11,
  StytchWhatsAppFactorOtp: 12,
  StytchTotpFactorOtp: 13,
} as const;
export type AUTH_METHOD_TYPE_TYPE = keyof typeof AUTH_METHOD_TYPE;
export type AUTH_METHOD_TYPE_VALUES =
  (typeof AUTH_METHOD_TYPE)[keyof typeof AUTH_METHOD_TYPE];
/**
 * @deprecated Will be removed - Use AUTH_METHOD_TYPE instead
 * Alias for AUTH_METHOD_TYPE. Added for backwards compatibility.
 * See {@link AUTH_METHOD_TYPE}
 */
export const AuthMethodType = AUTH_METHOD_TYPE;

// ========== Supported PKP Auth Method Scopes ==========
export const AUTH_METHOD_SCOPE = {
  NoPermissions: 0,
  SignAnything: 1,
  PersonalSign: 2,
} as const;
export type AUTH_METHOD_SCOPE_TYPE = keyof typeof AUTH_METHOD_SCOPE;
export type AUTH_METHOD_SCOPE_VALUES =
  (typeof AUTH_METHOD_SCOPE)[keyof typeof AUTH_METHOD_SCOPE];

/**
 * @deprecated Will be removed - Use AUTH_METHOD_SCOPE instead
 * Alias for AUTH_METHOD_SCOPE. Added for backwards compatibility.
 * See {@link AUTH_METHOD_SCOPE}
 */
export const AuthMethodScope = AUTH_METHOD_SCOPE;

// ========== Supported Provider Types ==========
export const PROVIDER_TYPE = {
  Discord: 'discord',
  Google: 'google',
  EthWallet: 'ethwallet',
  WebAuthn: 'webauthn',
  Apple: 'apple',
  StytchOtp: 'stytchOtp',
  StytchEmailFactorOtp: 'stytchEmailFactorOtp',
  StytchSmsFactorOtp: 'stytchSmsFactorOtp',
  StytchWhatsAppFactorOtp: 'stytchWhatsAppFactorOtp',
  StytchTotpFactor: 'stytchTotpFactor',
} as const;
export type PROVIDER_TYPE_TYPE = keyof typeof PROVIDER_TYPE;
export type PROVIDER_TYPE_VALUES =
  (typeof PROVIDER_TYPE)[keyof typeof PROVIDER_TYPE];
/**
 * @deprecated Will be removed - Use PROVIDER_TYPE instead
 * Alias for PROVIDER_TYPE. Added for backwards compatibility.
 * See {@link PROVIDER_TYPE}
 */
export const ProviderType = PROVIDER_TYPE;

// ========== Supported Staking States ==========
export const STAKING_STATES = {
  Active: 0,
  NextValidatorSetLocked: 1,
  ReadyForNextEpoch: 2,
  Unlocked: 3,
  Paused: 4,
  Restore: 5,
} as const;
export type STAKING_STATES_TYPE = keyof typeof STAKING_STATES;
export type STAKING_STATES_VALUES =
  (typeof STAKING_STATES)[keyof typeof STAKING_STATES];
/**
 * @deprecated Will be removed - Use STAKING_STATES instead
 * Alias for STAKING_STATES. Added for backwards compatibility.
 * See {@link STAKING_STATES}
 */
export const StakingStates = STAKING_STATES;

// ========== Relay Auth Status ==========
export const RELAY_AUTH_STATUS = {
  InProgress: 'InProgress',
  Succeeded: 'Succeeded',
  Failed: 'Failed',
} as const;
export type RELAY_AUTH_STATUS_TYPE = keyof typeof RELAY_AUTH_STATUS;
export type RELAY_AUTH_STATUS_VALUES =
  (typeof RELAY_AUTH_STATUS)[keyof typeof RELAY_AUTH_STATUS];
/**
 * @deprecated Will be removed - Use RELAY_AUTH_STATUS instead
 * Alias for RELAY_AUTH_STATUS. Added for backwards compatibility.
 * See {@link RELAY_AUTH_STATUS}
 */
export const RelayAuthStatus = RELAY_AUTH_STATUS;

/**
 * Prefixes used for identifying various LIT resources.
 *
 * @description These resource prefixes are also used as valid IRI schemes.
 */
export const LIT_RESOURCE_PREFIX = {
  AccessControlCondition: 'lit-accesscontrolcondition',
  PKP: 'lit-pkp',
  RLI: 'lit-ratelimitincrease',
  LitAction: 'lit-litaction',
} as const;
export type LIT_RESOURCE_PREFIX_TYPE = keyof typeof LIT_RESOURCE_PREFIX;
// This should mimic LitResourcePrefix in types package
export type LIT_RESOURCE_PREFIX_VALUES =
  (typeof LIT_RESOURCE_PREFIX)[keyof typeof LIT_RESOURCE_PREFIX];
/**
 * @deprecated Will be removed - Use LIT_RESOURCE_PREFIX instead
 * Alias for LIT_RESOURCE_PREFIX. Added for backwards compatibility.
 * See {@link LIT_RESOURCE_PREFIX}
 */
export const LitResourcePrefix = LIT_RESOURCE_PREFIX;

/**
 * User-facing abilities that can be granted to a session.
 */
export const LIT_ABILITY = {
  /**
   * This is the ability to process an encryption access control condition.
   * The resource will specify the corresponding hashed key value of the
   * access control condition.
   */
  AccessControlConditionDecryption: 'access-control-condition-decryption',

  /**
   * This is the ability to process a signing access control condition.
   * The resource will specify the corresponding hashed key value of the
   * access control condition.
   */
  AccessControlConditionSigning: 'access-control-condition-signing',

  /**
   * This is the ability to use a PKP for signing purposes. The resource will specify
   * the corresponding PKP token ID.
   */
  PKPSigning: 'pkp-signing',

  /**
   * This is the ability to use a Rate Limit Increase (Capacity Credits NFT) token during
   * authentication with the nodes. The resource will specify the corresponding
   * Capacity Credits NFT token ID.
   */
  RateLimitIncreaseAuth: 'rate-limit-increase-auth',

  /**
   * This is the ability to execute a Lit Action. The resource will specify the
   * corresponding Lit Action IPFS CID.
   */
  LitActionExecution: 'lit-action-execution',
} as const;
export type LIT_ABILITY_TYPE = keyof typeof LIT_ABILITY;
// This should replicate LitAbility in types package
export type LIT_ABILITY_VALUES = (typeof LIT_ABILITY)[keyof typeof LIT_ABILITY];
/**
 * @deprecated Will be removed - Use LIT_ABILITY instead
 * Alias for LIT_ABILITY. Added for backwards compatibility.
 * See {@link LIT_ABILITY}
 */
export const LitAbility = LIT_ABILITY;

/**
 * LIT specific abilities mapped into the Recap specific terminology
 * of an 'ability'.
 */
export const LIT_RECAP_ABILITY = {
  Decryption: 'Decryption',
  Signing: 'Signing',
  Auth: 'Auth',
  Execution: 'Execution',
} as const;
export type LIT_RECAP_ABILITY_TYPE = keyof typeof LIT_RECAP_ABILITY;
export type LIT_RECAP_ABILITY_VALUES =
  (typeof LIT_RECAP_ABILITY)[keyof typeof LIT_RECAP_ABILITY];
/**
 * @deprecated Will be removed - Use LIT_RECAP_ABILITY instead
 * Alias for LIT_RECAP_ABILITY. Added for backwards compatibility.
 * See {@link LIT_RECAP_ABILITY}
 */
export const LitRecapAbility = LIT_RECAP_ABILITY;

export const LIT_NAMESPACE = {
  Auth: 'Auth',
  Threshold: 'Threshold',
} as const;
export type LIT_NAMESPACE_TYPE = keyof typeof LIT_NAMESPACE;
export type LIT_NAMESPACE_VALUES =
  (typeof LIT_NAMESPACE)[keyof typeof LIT_NAMESPACE];
/**
 * @deprecated Will be removed - Use LIT_NAMESPACE instead
 * Alias for LIT_NAMESPACE. Added for backwards compatibility.
 * See {@link LIT_NAMESPACE}
 */
export const LitNamespace = LIT_NAMESPACE;

/**
 * SDK Logger levels
 */
export const LOG_LEVEL = {
  INFO: 0,
  DEBUG: 1,
  WARN: 2,
  ERROR: 3,
  FATAL: 4,
  TIMING_START: 5,
  TIMING_END: 6,
  OFF: -1,
} as const;
export type LOG_LEVEL_TYPE = keyof typeof LOG_LEVEL;
export type LOG_LEVEL_VALUES = (typeof LOG_LEVEL)[keyof typeof LOG_LEVEL];
/**
 * @deprecated Will be removed - Use LOG_LEVEL instead
 * Alias for LOG_LEVEL. Added for backwards compatibility.
 * See {@link LOG_LEVEL}
 */
export const LogLevel = LOG_LEVEL;
