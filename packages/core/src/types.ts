import { ProposalRequest } from './actions/types'

export type StoreCanonicalConfig = (
  apiKey: string,
  orgId: string,
  configData: Array<string>
) => Promise<string>

export type RelayProposal = (proposalRequest: ProposalRequest) => Promise<void>

export type SystemContractInfo = {
  initCodeWithArgs: string
  expectedAddress: string
}
