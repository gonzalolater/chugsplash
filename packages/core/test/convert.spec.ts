import { exec } from 'child_process'

import { expect } from 'chai'
import { ethers } from 'ethers'
import { SPHINX_NETWORKS } from '@sphinx-labs/contracts'

import {
  convertEthersTransactionReceipt,
  convertEthersTransactionResponse,
  isSphinxTransactionReceipt,
  isSphinxTransactionResponse,
} from '../src/artifacts'
import {
  SphinxJsonRpcProvider,
  execAsync,
  fetchURLForNetwork,
  fetchNameForNetwork,
  isLiveNetworkRpcApiKeyDefined,
  isSupportedChainId,
  sleep,
} from '../src'

// We filter out app chains because we expect the mainnet test to cover them adequately
const fetchNonRollupStackChains = () => {
  return SPHINX_NETWORKS.filter((network) => network.rollupStack === undefined)
}

describe('Convert EthersJS Objects', () => {
  const anvilPrivateKey =
    '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'

  const anvilProvider = new SphinxJsonRpcProvider(`http://127.0.0.1:8545`)
  const anvilWallet = new ethers.Wallet(anvilPrivateKey, anvilProvider)

  const transactionHashes = {
    1: '0x7ff885b233dd35da5eda641e3228bdb6e30d9d2a0bf8979d3cbe527e517f99fa',
    10: '0x16bbe6fe0c7ddbf92ca0a98a9b8aa52503666ae5b847fc9be0f8d05ee3f0795f',
    42161: '0xac2c0f69c8e882f7f6ab45c71e150efb46d038b50d3a8f316e83b5cf6d394879',
    137: '0xe8a455893b39bb1db9eb21274a24f1161fed882f1788c24a3ab3531ce07371cf',
    56: '0x2540096529b01ade6f2686c41fd97ffe1599e478ae98917145e8981de8a77bdd',
    100: '0x847846d806451537786949a6ddc74fb5e8ca6dc9f1cb35cd3500f3dc2ee63b39',
    59144: '0x62953054264b3465b0f67151368359ec3f0a9065b2702586f31750cc60fcf722',
    1101: '0x62d0fd6f8d38ea5e850635873263a54d869ca3391ce20d3ed526f9ea729a458c',
    43114: '0x18402da5d6d48f674cee71516dd061ae59257d04a8bbaabb4f3e25a4bda2e334',
    250: '0x89e07b9ce87827d92764be14db8e66fa8e1904b5578e4a6cb652cd66ad290b5e',
    8453: '0xa47ae2b699dbbac29c12da663627fc1363f7a0d146348078ca2795bc967f4f65',
    11155111:
      '0xc73344d91058d9f68821d29927fbf8a4aa6e6c4a8a94052eafb420238ccba02f',
    11155420:
      '0x6162109ca1437ec839f093fd2660eb875fcc97253bebd38ed337c7f1bf948537',
    421614:
      '0x012e2232816e5dcea285a6a357bb3f9f49e117b0966344ea0eff4a0875246efe',
    80001: '0x0a8af66052dac81560e05391bb06a4f1064dcc51d2e6e903a0055f348dfaed7a',
    97: '0x3bc5c7f3d0d7ebf44f0ef679c9637f5a0cf25d24c9e4385569784ea3b46bc1da',
    10200: '0x1d37b9dba8689bc21e336075bccee374ea63f7dfa049c0bef63db652ff987558',
    59140: '0x5b6a11f5e71b0f15f68cacac1549555b94fad8ab943af7aff19a5002c3cbbd4e',
    1442: '0x7638ac5fae244583323c39aacf9b563524152098b9212ab2d95d8adc8db2660f',
    43113: '0xb33c1cf0f2be7d8bd20fe2e84048bad007297906702ad6d03a80951998031d00',
    4002: '0x1d00ccc39d112a875d6686da751cb3c4413da19294b667d23a40fd9177590867',
    84532: '0x21575957621a07d8bb03a7036157a7068665964c0096ced36a9958eca14ca533',
    42220: '0x48dbdee17d1cc7d167e3e63dd48acf14cc162273ed1b388f65793753dbf48744',
    44787: '0x8c6a10b380519465fc74e0f323bb1adcdb4b8d92863e045acfc417cffb0b8529',
    1285: '0x46e81d6c12805d8034863149f59c414dc22dfa509732503d3c12bfc0086cf266',
    1284: '0x29896389a74a3e2beb81b5c3ce2ba1af4cedd1245b23e19a390571a59cd0349f',
    1287: '0x27ac5d909252aee207a387774be90eda60927d6258e362011be4b795f19dfc02',
    122: '0xf03ae18d04abcc8f2fd0259704bfe919c194f1d39e9ff53efdc7d179c789284c',
    9001: '0x7b2a711b40503d26813532e80cf66db81ca6b22148d9857cf276f514052614a6',
    9000: '0x2c2dee1b3fd4ec4917d6d7e92c99bc3dc09aaed0b611a165fa94fd522c243c14',
    2222: '0xa141b7450032c794aa3d82a9f33e607d3d4f0d2da7112cd909a876d7f827a489',
    2221: '0x178c0c2bff2f5cffa0bb592102d364ca822047580f95f44dfedd49dd6f840d46',
    66: '0xf8611d9eccf87c6c42210debc1dda312b581df0338e53cd18c3accb93aac3fcb',
    534352:
      '0xe559cd3f406619335cd1f50a5ad8cab16b59f5e252823039e299a7f7f4547a18',
    534351:
      '0x0f5e4aeae66a13cde040d9c4603c5e57be8731907755bfcee519b9eb3716158d',
    30: '0x48e3c765b4d066c06e92706d5b91f8daa7f8182a58cba52d8a52bdb5a43fc5dd',
    31: '0xdb0400ba3f56f653cab12b521d2bf0a61098865c7aeecd39d42711514feaacfa',
  }

  before(async () => {
    // Start an Anvil node.
    exec(`anvil --silent &`)
    await sleep(1000)

    // Check that an RPC endpoint API key exists for every network.
    const missingApiKey: Array<string> = []
    for (const chainIdStr of Object.keys(transactionHashes)) {
      const chainId = BigInt(chainIdStr)
      if (!isSupportedChainId(chainId)) {
        throw new Error(`Unsupported chain ID: ${chainId}`)
      }

      if (!isLiveNetworkRpcApiKeyDefined(BigInt(chainId))) {
        missingApiKey.push(fetchNameForNetwork(BigInt(chainId)))
      }
    }

    if (missingApiKey.length > 0) {
      throw new Error(`Missing API key for:\n` + missingApiKey.join('\n'))
    }
  })

  after(async () => {
    // Kill the Anvil node
    await execAsync(`kill $(lsof -t -i:8545)`)
  })

  it('contains a hash for each live supported network', () => {
    expect(Object.values(transactionHashes).length).equals(
      Object.values(fetchNonRollupStackChains()).length
    )
  })

  describe('succeeds on anvil', () => {
    it('convertEthersTransactionReceipt', async () => {
      const provider = new SphinxJsonRpcProvider(`http://127.0.0.1:8545`)
      const wallet = new ethers.Wallet(anvilPrivateKey, provider)
      const receipt = await (
        await wallet.sendTransaction({
          to: ethers.ZeroAddress,
          data: '0x11111111',
        })
      ).wait()

      // Narrow the TypeScript type.
      if (!receipt) {
        throw new Error(`No EthersJS receipt found for transaction hash.`)
      }

      const converted = convertEthersTransactionReceipt(receipt)
      expect(isSphinxTransactionReceipt(converted)).equals(true)
    })

    it('convertEthersTransactionResponse', async () => {
      const receipt = await (
        await anvilWallet.sendTransaction({
          to: ethers.ZeroAddress,
          data: '0x11111111',
        })
      ).wait()

      // Narrow the TypeScript type.
      if (!receipt) {
        throw new Error(`No EthersJS receipt found for transaction hash.`)
      }

      // Get the transaction response. We fetch this from the receipt so that the `blockNumber` and
      // `blockHash` fields are populated in the response.
      const response = await anvilProvider.getTransaction(receipt.hash)

      const converted = convertEthersTransactionResponse(response, '31337')
      expect(isSphinxTransactionResponse(converted)).equals(true)
    })
  })

  describe('succeeds on live networks', () => {
    before(function () {
      // Skip the tests if the environment variable `CIRCLE_BRANCH` is defined and does not equal
      // 'develop', which enforces that these tests only run in CI when the source branch is
      // 'develop'. These tests will also run on local machines because the `CIRCLE_BRANCH`
      // environment variable isn't defined.
      const CIRCLE_BRANCH = process.env.CIRCLE_BRANCH
      if (typeof CIRCLE_BRANCH === 'string' && CIRCLE_BRANCH !== 'develop') {
        console.log('Skipping tests since this is not the develop branch')
        this.skip()
      }
    })

    for (const [chainIdStr, hash] of Object.entries(transactionHashes)) {
      const networkName = fetchNameForNetwork(BigInt(chainIdStr))

      it(`convertEthersTransactionReceipt on ${networkName}`, async () => {
        const chainId = BigInt(chainIdStr)

        // Narrow the TypeScript type.
        if (!isSupportedChainId(chainId)) {
          throw new Error(`Invalid chain ID.`)
        }

        const rpcUrl = fetchURLForNetwork(chainId)
        const provider = new SphinxJsonRpcProvider(rpcUrl)

        let timeoutId: NodeJS.Timeout

        // Create a promise that resolves after 30 seconds.
        const timeoutPromise = new Promise((resolve, reject) => {
          timeoutId = setTimeout(
            () =>
              reject(
                new Error(
                  `Timeout after 30 seconds for ${networkName}. Consider replacing this API key.`
                )
              ),
            30000
          )
        })

        // Use Promise.race to return the result of the first promise that resolves. We do this
        // because flaky RPC URLs can cause the entire test suite to hang indefinitely.
        const result = await Promise.race([
          provider.getTransactionReceipt(hash),
          timeoutPromise,
        ])

        // Assert the type of the receipt.
        const receipt = result as ethers.TransactionReceipt | undefined

        // Narrow the TypeScript type.
        if (!receipt) {
          throw new Error(
            `No EthersJS receipt found for transaction hash on ${networkName}.`
          )
        }

        const converted = convertEthersTransactionReceipt(receipt)
        expect(isSphinxTransactionReceipt(converted)).equals(true)

        clearTimeout(timeoutId!)
      })
    }

    for (const [chainIdStr, hash] of Object.entries(transactionHashes)) {
      const networkName = fetchNameForNetwork(BigInt(chainIdStr))

      it(`convertEthersTransactionResponse on ${networkName}`, async () => {
        const chainId = BigInt(chainIdStr)

        // Narrow the TypeScript type.
        if (!isSupportedChainId(chainId)) {
          throw new Error(`Invalid chain ID.`)
        }

        const rpcUrl = fetchURLForNetwork(chainId)
        const provider = new SphinxJsonRpcProvider(rpcUrl)

        let timeoutId: NodeJS.Timeout

        // Create a promise that resolves after 30 seconds.
        const timeoutPromise = new Promise((resolve, reject) => {
          timeoutId = setTimeout(
            () =>
              reject(
                new Error(
                  `Timeout after 30 seconds for ${networkName}. Consider replacing this API key.`
                )
              ),
            30000
          )
        })

        // Use Promise.race to return the result of the first promise that resolves. We do this
        // because flaky RPC URLs can cause the entire test suite to hang indefinitely.
        const result = await Promise.race([
          provider.getTransaction(hash),
          timeoutPromise,
        ])

        // Assert the type of the response.
        const response = result as ethers.TransactionResponse | undefined

        // Narrow the TypeScript type.
        if (!response) {
          throw new Error(
            `No EthersJS response found for transaction hash on ${networkName}.`
          )
        }

        const converted = convertEthersTransactionResponse(response, chainIdStr)
        expect(isSphinxTransactionResponse(converted)).equals(true)

        clearTimeout(timeoutId!)
      })
    }
  })
})