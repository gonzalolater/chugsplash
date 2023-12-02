import {
  concat,
  dataSlice,
  ethers,
  getAddress,
  getCreate2Address,
  keccak256,
} from 'ethers'

import { ActionInput, ContractKind, ContractKindEnum } from './types'
import { prettyFunctionCall } from '../utils'

export const toContractKindEnum = (kind: ContractKind): ContractKindEnum => {
  switch (kind) {
    case 'oz-transparent':
      return ContractKindEnum.OZ_TRANSPARENT
    case 'oz-ownable-uups':
      return ContractKindEnum.OZ_OWNABLE_UUPS
    case 'oz-access-control-uups':
      return ContractKindEnum.OZ_ACCESS_CONTROL_UUPS
    case 'external-transparent':
      return ContractKindEnum.EXTERNAL_DEFAULT
    case 'immutable':
      return ContractKindEnum.IMMUTABLE
    case 'proxy':
      return ContractKindEnum.INTERNAL_DEFAULT
    default:
      throw new Error(`Invalid contract kind: ${kind}`)
  }
}

export const getReadableActions = (actionInputs: ActionInput[]) => {
  return actionInputs.map((action) => {
    const { referenceName, functionName, variables, address } =
      action.decodedAction
    const actionStr = prettyFunctionCall(
      referenceName,
      address,
      functionName,
      variables,
      5,
      3
    )
    return {
      reason: actionStr,
      actionIndex: action.index,
    }
  })
}

/**
 * Returns the Create3 address of a target contract deployed by Sphinx. There is a one-to-one mapping
 * between a Create3 address and the input parameters to this function. Note that the contract may
 * not yet be deployed at this address since it's calculated via Create3.
 */
export const getTargetAddress = (
  managerAddress: string,
  referenceName: string,
  userSalt: string
): string => {
  const targetSalt = getCreate3Salt(referenceName, userSalt)

  return getCreate3Address(managerAddress, targetSalt)
}

export const getCreate3Address = (deployer: string, salt: string): string => {
  // Hard-coded bytecode of the proxy used by Create3 to deploy the contract. See the `CREATE3.sol`
  // library for details.
  const proxyBytecode = '0x67363d3d37363d34f03d5260086018f3'

  const proxyAddress = getCreate2Address(
    deployer,
    salt,
    keccak256(proxyBytecode)
  )

  const addressHash = keccak256(concat(['0xd694', proxyAddress, '0x01']))

  // Return the last 20 bytes of the address hash
  const last20Bytes = dataSlice(addressHash, 12)

  // Return the checksum address
  return getAddress(last20Bytes)
}

export const getCreate3Salt = (
  referenceName: string,
  userSalt: string
): string => {
  return ethers.keccak256(
    ethers.AbiCoder.defaultAbiCoder().encode(
      ['string', 'bytes32'],
      [referenceName, userSalt]
    )
  )
}
