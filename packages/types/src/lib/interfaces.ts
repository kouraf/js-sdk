import { Provider } from '@ethersproject/abstract-provider';
// @ts-ignore
import * as JSZip from 'jszip/dist/jszip.js';

import { ILitNodeClient } from './ILitNodeClient';
import {
  AcceptedFileType,
  AccessControlConditions,
  Chain,
  EvmContractConditions,
  IRelayAuthStatus,
  JsonRequest,
  LIT_NETWORKS_KEYS,
  LitContractContext,
  LitContractResolverContext,
  SolRpcConditions,
  SymmetricKey,
  UnifiedAccessControlConditions,
} from './types';
import { ISessionCapabilityObject, LitResourceAbilityRequest } from './models';

/** ---------- Access Control Conditions Interfaces ---------- */

export interface ABIParams {
  name: string;
  type: string;
}

export interface AccsOperatorParams {
  operator: string;
}

/** ---------- Auth Sig ---------- */

export interface AuthSig {
  sig: any;
  derivedVia: string;
  signedMessage: string;
  address: string;
  algo?: string;
}

export type CosmosWalletType = 'keplr' | 'leap';

export interface AuthCallbackParams {
  // The chain you want to use.  Find the supported list of chains here: https://developer.litprotocol.com/docs/supportedChains
  chain: Chain;

  // The statement that describes what the user is signing. If the auth callback
  // is for signing a SIWE message, you MUST add this statement to the end of the SIWE
  // statement.
  statement?: string;

  // The blockhash that the nodes return during the handshake
  nonce: string;

  // Optional and only used with EVM chains.  A list of resources to be passed to Sign In with Ethereum.  These resources will be part of the Sign in with Ethereum signed message presented to the user.
  resources?: string[];

  // Optional and only used with EVM chains right now.  Set to true by default.  Whether or not to ask Metamask or the user's wallet to switch chains before signing.  This may be desired if you're going to have the user send a txn on that chain.  On the other hand, if all you care about is the user's wallet signature, then you probably don't want to make them switch chains for no reason.  Pass false here to disable this chain switching behavior.
  switchChain?: boolean;

  // --- Following for Session Auth ---
  expiration?: string;

  uri?: string;

  // Cosmos wallet type, to support mutliple popular cosmos wallets
  // Keplr & Cypher -> window.keplr
  // Leap -> window.leap
  cosmosWalletType?: CosmosWalletType;

  /**
   * Optional project ID for WalletConnect V2. Only required if one is using checkAndSignAuthMessage and wants to display WalletConnect as an option.
   */
  walletConnectProjectId?: string;

  resourceAbilityRequests?: LitResourceAbilityRequest[];

  litActionCode?: string;
  ipfsId?: string;
  jsParams?: any;
}

/** ---------- Web3 ---------- */
export interface IProvider {
  provider: any;
  account: string;
}

/** ---------- Crypto ---------- */
export interface EncryptedZip {
  symmetricKey: SymmetricKey;
  encryptedZip: Blob;
}

export interface DecryptZipFileWithMetadata {
  decryptedFile: Uint8Array;
  metadata: MetadataForFile;
}

export interface MetadataForFile {
  name: string | any;
  type: string | any;
  size: string | number | any;
  accessControlConditions: any[] | any;
  evmContractConditions: any[] | any;
  solRpcConditions: any[] | any;
  unifiedAccessControlConditions: any[] | any;
  chain: string;
  dataToEncryptHash: string;
}

export interface EncryptedFile {
  encryptedFile: Blob;
  symmetricKey: SymmetricKey;
}

export interface DecryptFileProps {
  file: AcceptedFileType;
  symmetricKey: SymmetricKey;
}

export interface VerifyJWTProps {
  publicKey: string;
  // A JWT signed by the LIT network using the BLS12-381 algorithm
  jwt: string;
}

export interface IJWT<T> {
  verified: boolean;
  header: JWTHeader;
  payload: T;
  signature: Uint8Array;
}

export interface JWTHeader {
  alg: string;
  typ: string;
}

export interface SigningAccessControlConditionJWTPayload
  extends MultipleAccessControlConditions {
  iss: string;
  sub: string;
  chain?: string;
  iat: number;
  exp: number;
}

export interface HumanizedAccsProps {
  // The array of access control conditions that you want to humanize
  accessControlConditions?: AccessControlConditions;

  // The array of evm contract conditions that you want to humanize
  evmContractConditions?: EvmContractConditions;

  // The array of Solana RPC conditions that you want to humanize
  solRpcConditions?: SolRpcConditions;

  // The array of unified access control conditions that you want to humanize
  unifiedAccessControlConditions?: UnifiedAccessControlConditions;
  tokenList?: (any | string)[];
  myWalletAddress?: string;
}

/** ---------- Key Value Type ---------- */
export type KV = Record<string, any>;

/** ---------- Lit Node Client ---------- */
export interface LitNodeClientConfig {
  litNetwork: LIT_NETWORKS_KEYS;
  alertWhenUnauthorized?: boolean;
  minNodeCount?: number;
  debug?: boolean;
  bootstrapUrls?: string[];
  connectTimeout?: number;
  checkNodeAttestation?: boolean;
  contractContext?: LitContractContext | LitContractResolverContext;
  storageProvider?: StorageProvider;
  retryTolerance?: RetryTolerance;
  defaultAuthCallback?: (authSigParams: AuthCallbackParams) => Promise<AuthSig>;
  rpcUrl?: string | null;
}

export type CustomNetwork = Pick<
  LitNodeClientConfig,
  'litNetwork' | 'bootstrapUrls' | 'contractContext' | 'checkNodeAttestation'
> &
  Partial<Pick<LitNodeClientConfig, 'minNodeCount'>>;

/**
 * Override for LocalStorage and SessionStorage
 * if running in NodeJs and this is implicitly
 * binded globally
 */
export interface StorageProvider {
  provider: Storage;
}

export interface Signature {
  r: string;
  s: string;
  v: number;
}

export interface ClaimKeyResponse {
  signatures: Signature[];
  claimedKeyId: string;
  pubkey: string;
  mintTx: string;
}

/**
 * Struct in rust
 * -----
 pub struct JsonExecutionRequest {
    pub code: Option<String>,
    pub ipfs_id: Option<String>,
    pub auth_sig: AuthSigItem,
    pub js_params: Option<serde_json::Value>,
}
 */
export interface BaseJsonExecutionRequest {
  // // the authSig to use to authorize the user with the nodes
  // authSig?: AuthSig;

  // An object that contains params to expose to the Lit Action.  These will be injected to the JS runtime before your code runs, so you can use any of these as normal variables in your Lit Action.
  jsParams?: any;

  // JS code to run on the nodes
  code?: string;

  // The IPFS ID of some JS code to run on the nodes
  ipfsId?: string;

  // // the session signatures to use to authorize the user with the nodes
  // sessionSigs?: any;

  // whether to run this on a single node or many
  targetNodeRange?: number;

  // auth methods to resolve
  authMethods?: AuthMethod[];
}

export interface WithAuthSig extends BaseJsonExecutionRequest {
  authSig: AuthSig;
  sessionSigs?: any;
}

export interface WithSessionSigs extends BaseJsonExecutionRequest {
  sessionSigs: any;
  authSig?: AuthSig;
}

export type JsonExecutionRequest = WithAuthSig | WithSessionSigs;

export interface BaseJsonPkpSignRequest {
  toSign: ArrayLike<number>;
  pubKey: string;
}

export interface WithAuthMethodSigning extends BaseJsonPkpSignRequest {
  // auth methods to resolve
  authMethods: AuthMethod[];
  sessionSigs?: any;
  authSig?: AuthSig;
}
export interface WithSessionSigsSigning extends BaseJsonPkpSignRequest {
  sessionSigs: any;
  authSig?: AuthSig;
  authMethods?: AuthMethod[];
}

export interface WithAuthSigSigning extends BaseJsonPkpSignRequest {
  authSig: AuthSig;
  sessionSigs?: any;
  authMethods?: AuthMethod[];
}

export type JsonPkpSignRequest =
  | WithSessionSigsSigning
  | WithAuthSigSigning
  | WithAuthMethodSigning;

/**
 * Struct in rust
 * -----
pub struct JsonSignChainDataRequest {
    pub call_requests: Vec<web3::types::CallRequest>,
    pub chain: Chain,
    pub iat: u64,
    pub exp: u64,
}
*/
export interface JsonSignChainDataRequest {
  callRequests: CallRequest[];
  chain: Chain;
  iat: number;
  exp: number;
}

/**
 * Struct in rust
 * -----
 pub struct JsonSigningResourceId {
    pub base_url: String,
    pub path: String,
    pub org_id: String,
    pub role: String,
    pub extra_data: String,
}
*/
export interface JsonSigningResourceId {
  baseUrl: string;
  path: string;
  orgId: string;
  role: string;
  extraData: string;
}

export interface MultipleAccessControlConditions {
  // The access control conditions that the user must meet to obtain this signed token.  This could be posession of an NFT, for example.  You must pass either accessControlConditions or evmContractConditions or solRpcConditions or unifiedAccessControlConditions.
  accessControlConditions?: AccessControlConditions;

  // EVM Smart Contract access control conditions that the user must meet to obtain this signed token.  This could be posession of an NFT, for example.  This is different than accessControlConditions because accessControlConditions only supports a limited number of contract calls.  evmContractConditions supports any contract call.  You must pass either accessControlConditions or evmContractConditions or solRpcConditions or unifiedAccessControlConditions.
  evmContractConditions?: EvmContractConditions;

  // Solana RPC call conditions that the user must meet to obtain this signed token.  This could be posession of an NFT, for example.
  solRpcConditions?: SolRpcConditions;

  // An array of unified access control conditions.  You may use AccessControlCondition, EVMContractCondition, or SolRpcCondition objects in this array, but make sure you add a conditionType for each one.  You must pass either accessControlConditions or evmContractConditions or solRpcConditions or unifiedAccessControlConditions.
  unifiedAccessControlConditions?: UnifiedAccessControlConditions;
}

export interface JsonAccsRequest {
  // The access control conditions that the user must meet to obtain this signed token.  This could be posession of an NFT, for example.  You must pass either accessControlConditions or evmContractConditions or solRpcConditions or unifiedAccessControlConditions.
  accessControlConditions?: AccessControlConditions;

  // EVM Smart Contract access control conditions that the user must meet to obtain this signed token.  This could be posession of an NFT, for example.  This is different than accessControlConditions because accessControlConditions only supports a limited number of contract calls.  evmContractConditions supports any contract call.  You must pass either accessControlConditions or evmContractConditions or solRpcConditions or unifiedAccessControlConditions.
  evmContractConditions?: EvmContractConditions;

  // Solana RPC call conditions that the user must meet to obtain this signed token.  This could be posession of an NFT, for example.
  solRpcConditions?: SolRpcConditions;

  // An array of unified access control conditions.  You may use AccessControlCondition, EVMContractCondition, or SolRpcCondition objects in this array, but make sure you add a conditionType for each one.  You must pass either accessControlConditions or evmContractConditions or solRpcConditions or unifiedAccessControlConditions.
  unifiedAccessControlConditions?: UnifiedAccessControlConditions;

  // The chain name of the chain that you are querying.  See ALL_LIT_CHAINS for currently supported chains.
  chain?: string;

  // The resourceId representing something on the web via a URL
  resourceId?: JsonSigningResourceId;

  // The authentication signature that proves that the user owns the crypto wallet address that meets the access control conditions
  authSig?: AuthSig;

  sessionSigs?: SessionSig;
}

/**
 * Struct in rust
 * -----
pub struct JsonSigningRetrieveRequest {
    pub access_control_conditions: Option<Vec<AccessControlConditionItem>>,
    pub evm_contract_conditions: Option<Vec<EVMContractConditionItem>>,
    pub sol_rpc_conditions: Option<Vec<SolRpcConditionItem>>,
    pub unified_access_control_conditions: Option<Vec<UnifiedAccessControlConditionItem>>,
    pub chain: Option<String>,
    pub resource_id: JsonSigningResourceId,
    pub auth_sig: AuthSigItem,
    pub iat: u64,
    pub exp: u64,
}
*/
export interface JsonSigningRetrieveRequest extends JsonAccsRequest {
  iat?: number;
  exp?: number;
  sessionSigs?: any;
}

export interface GetSignedTokenRequest
  extends SigningAccessControlConditionRequest {
  sessionSigs?: SessionSigsMap;
}

export interface SigningAccessControlConditionRequest {
  // The access control conditions that the user must meet to obtain this signed token.  This could be posession of an NFT, for example.  You must pass either accessControlConditions or evmContractConditions or solRpcConditions or unifiedAccessControlConditions.
  accessControlConditions?: AccessControlConditions;

  // EVM Smart Contract access control conditions that the user must meet to obtain this signed token.  This could be posession of an NFT, for example.  This is different than accessControlConditions because accessControlConditions only supports a limited number of contract calls.  evmContractConditions supports any contract call.  You must pass either accessControlConditions or evmContractConditions or solRpcConditions or unifiedAccessControlConditions.
  evmContractConditions?: EvmContractConditions;

  // Solana RPC call conditions that the user must meet to obtain this signed token.  This could be posession of an NFT, for example.
  solRpcConditions?: SolRpcConditions;

  // An array of unified access control conditions.  You may use AccessControlCondition, EVMContractCondition, or SolRpcCondition objects in this array, but make sure you add a conditionType for each one.  You must pass either accessControlConditions or evmContractConditions or solRpcConditions or unifiedAccessControlConditions.
  unifiedAccessControlConditions?: UnifiedAccessControlConditions;

  // The chain name of the chain that you are querying.  See ALL_LIT_CHAINS for currently supported chains.
  chain?: string;

  // The authentication signature that proves that the user owns the crypto wallet address that meets the access control conditions
  authSig?: SessionSig;

  iat?: number;
  exp?: number;
}

/**
 * Struct in rust
 * -----
pub struct JsonSigningStoreRequest {
    pub key: String,
    pub val: String,
    pub chain: Option<String>,
    pub permanant: Option<usize>,
    pub auth_sig: AuthSigItem,
}
 */
export interface JsonSigningStoreRequest {
  key: string;
  val: string;
  chain?: string;
  permanant?: 0 | 1;
  permanent?: 0 | 1;
  authSig?: AuthSig;
  sessionSigs?: object;
}

/**
 * Struct in rust
 * -----
 pub struct JsonEncryptionRetrieveRequest {
    pub access_control_conditions: Option<Vec<AccessControlConditionItem>>,
    pub evm_contract_conditions: Option<Vec<EVMContractConditionItem>>,
    pub sol_rpc_conditions: Option<Vec<SolRpcConditionItem>>,
    pub unified_access_control_conditions: Option<Vec<UnifiedAccessControlConditionItem>>,
    pub chain: Option<String>,
    pub to_decrypt: String,
    pub auth_sig: AuthSigItem,
}
 */
export interface JsonEncryptionRetrieveRequest extends JsonAccsRequest {
  // The ciphertext that you wish to decrypt encoded as a hex string
  toDecrypt: string;
}

export type ExecuteJsProps = JsonExecutionRequest & {
  // A boolean that defines if debug info will be returned or not.
  debug?: boolean;
};

export interface EncryptRequestBase {
  accessControlConditions?: AccessControlConditions;
  evmContractConditions?: EvmContractConditions;
  solRpcConditions?: SolRpcConditions;
  unifiedAccessControlConditions?: UnifiedAccessControlConditions;

  chain: Chain;

  authSig?: AuthSig;
  sessionSigs?: SessionSigsMap;
}

export interface EncryptRequest extends EncryptRequestBase {
  // The data that you wish to encrypt as a Uint8Array
  dataToEncrypt: Uint8Array;
}

export interface EncryptResponse {
  // The base64-encoded ciphertext
  ciphertext: string;
  // The hash of the data that was encrypted
  dataToEncryptHash: string;
}

export interface EncryptStringRequest extends EncryptRequestBase {
  // String that you wish to encrypt
  dataToEncrypt: string;
}

export interface EncryptZipRequest extends EncryptRequestBase {
  zip: JSZip;
}

export interface EncryptFileRequest extends EncryptRequestBase {
  file: AcceptedFileType;
}

export interface DecryptRequest extends EncryptRequestBase {
  // The base64-encoded ciphertext
  ciphertext: string;
  // The hash of the data that was encrypted
  dataToEncryptHash: string;
}

export interface DecryptResponse {
  // The decrypted data as a Uint8Array
  decryptedData: Uint8Array;
}

export interface GetSigningShareForDecryptionRequest extends JsonAccsRequest {
  dataToEncryptHash: string;
}

export interface SignConditionECDSA {
  accessControlConditions: any;
  evmContractConditions: undefined;
  solRpcConditions: undefined;
  auth_sig: AuthSig;
  chain: Chain;
  iat: number;
  exp: number;
}

/**
 *
 * An object containing the resulting signatures.  Each signature comes with the public key and the data signed.
 *
 */
export interface ExecuteJsResponse {
  success?: boolean;
  signatures:
    | {
        sig: {
          r: string;
          s: string;
          recid: number;
          signature: string; // 0x...
          publicKey: string; // pkp public key
          dataSigned: string;
        };
      }
    | any;
  decryptions: any[];
  response: string;
  logs: string;
  claims?: Record<string, { signatures: Signature[]; derivedKeyId: string }>;
  debug?: {
    allNodeResponses: NodeResponse[];
    allNodeLogs: NodeLog[];
    rawNodeHTTPResponses: any;
  };
}

export interface LitNodePromise {}

export interface SendNodeCommand {
  url: string;
  data: any;
  requestId: string;
}

export interface NodeShare {
  claimData: any;
  shareIndex: any;
  unsignedJwt: any;
  signedData: any;
  decryptedData: any;
  response: any;
  logs: any;
  success?: any;
}

export interface PKPSignShare {
  success: boolean;
  signedData: any;
  signatureShare: any;
}

export interface NodeBlsSigningShare {
  shareIndex: any;
  unsignedJwt?: any;
  signatureShare: BlsSignatureShare;
  response?: any;
  logs?: any;
}

export interface BlsSignatureShare {
  ProofOfPossession: string;
}

export interface SuccessNodePromises<T> {
  success: boolean;
  values: T[];
}

export interface RejectedNodePromises {
  success: boolean;
  error: NodeErrorV1;
}

export interface NodePromiseResponse {
  status?: string;
  value?: any;
  reason?: any;
}

export interface NodeErrorV1 {
  errorKind: string;
  status: number;
  details: string[];
  message?: string;
  errorCode?: string;
}

// V3 - Cayenne
// {
//   errorKind: 'Unexpected',
//   errorCode: 'NodeUnknownError',
//   status: 400,
//   message: 'Unknown error occured',
//   correlationId: 'lit_ef00fbaebb614',
//   details: [
//     'unexpected error: ECDSA signing failed: unexpected error: unexpected error: Message length to be signed is not 32 bytes.  Please hash it before sending it to the node to sign.  You can use SHA256 or Keccak256 for example'
//   ]
// }
export interface NodeErrorV3 {
  errorKind: string;
  errorCode: string;
  status: number;
  message: string;
  correlationId: string;
  details: string[];
}

/**
 *
 * @deprecated - This is the old error object.  It will be removed in the future. Use NodeClientErrorV1 instead.
 *
 */
export interface NodeClientErrorV0 {
  errorCode?: string;
  message: string;
  error: any;
  name?: string;
}

export interface NodeClientErrorV1 {
  message: string;
  errorKind: string;
  errorCode: string;
  details?: string[];
  status?: number;
  requestId?: string;
}

export interface SigShare {
  sigType: any;
  signatureShare: any;
  shareIndex: any;
  bigr?: string;
  bigR?: string;
  publicKey: any;
  dataSigned: any;
  siweMessage?: string;
  sigName?: string;
}

export interface SignedData {
  signedData: any;
}

export interface DecryptedData {
  decryptedData: any;
}

export interface NodeResponse {
  response: any;
}

export interface NodeLog {
  logs: any;
}

export interface CallRequest {
  // to - The address of the contract that will be queried
  to: string;

  // The address calling the function.
  from?: string;

  // Hex encoded data to send to the contract.
  data: string;
}

export interface SignedChainDataToken {
  // The call requests to make.  The responses will be signed and returned.
  callRequests: CallRequest[];

  // The chain name of the chain that this contract is deployed on.  See LIT_CHAINS for currently supported chains.
  chain: Chain;
}

export interface NodeCommandResponse {
  url: string;
  data: JsonRequest;
}

export interface NodeCommandServerKeysResponse {
  serverPublicKey: string;
  subnetPublicKey: string;
  networkPublicKey: string;
  networkPublicKeySet: string;
  hdRootPubkeys: string[];
  attestation?: NodeAttestation;
  latestBlockhash?: string;
}

export interface FormattedMultipleAccs {
  error: boolean;
  formattedAccessControlConditions: any;
  formattedEVMContractConditions: any;
  formattedSolRpcConditions: any;
  formattedUnifiedAccessControlConditions: any;
}

export interface SignWithECDSA {
  // TODO: The message to be signed - note this message is not currently converted to a digest!!!!!
  message: string;

  // The chain name of the chain that this contract is deployed on.  See LIT_CHAINS for currently supported chains.
  chain: Chain;

  iat: number;
  exp: number;
}

export interface CombinedECDSASignature {
  r: string;
  s: string;
  recid: number;
}
export interface ValidateAndSignECDSA {
  accessControlConditions: AccessControlConditions;
  chain: Chain;
  auth_sig: AuthSig;
}

export interface HandshakeWithNode {
  url: string;
  challenge: string;
}

export interface NodeAttestation {
  type: string;
  noonce: string;
  data: {
    INSTANCE_ID: string;
    RELEASE_ID: string;
    UNIX_TIME: string;
  };
  signatures: string[];
  report: string;
}

export interface JsonHandshakeResponse {
  serverPubKey: string;
  subnetPubKey: string;
  networkPubKey: string;
  networkPubKeySet: string;
  hdRootPubkeys: string[];
  latestBlockhash?: string;
}

export interface EncryptToIpfsProps {
  // The authSig of the user.  Returned via the checkAndSignAuthMessage function
  authSig?: AuthSig;

  // the session signatures to use to authorize the user with the nodes
  sessionSigs?: any;

  // The access control conditions that the user must meet to obtain this signed token.  This could be posession of an NFT, for example.  You must pass either accessControlConditions or evmContractConditions or solRpcConditions or unifiedAccessControlConditions.
  accessControlConditions?: AccessControlConditions;

  // EVM Smart Contract access control conditions that the user must meet to obtain this signed token.  This could be posession of an NFT, for example.  This is different than accessControlConditions because accessControlConditions only supports a limited number of contract calls.  evmContractConditions supports any contract call.  You must pass either accessControlConditions or evmContractConditions or solRpcConditions or unifiedAccessControlConditions.
  evmContractConditions?: EvmContractConditions;

  // Solana RPC call conditions that the user must meet to obtain this signed token.  This could be posession of an NFT, for example.
  solRpcConditions?: SolRpcConditions;

  // An array of unified access control conditions.  You may use AccessControlCondition, EVMContractCondition, or SolRpcCondition objects in this array, but make sure you add a conditionType for each one.  You must pass either accessControlConditions or evmContractConditions or solRpcConditions or unifiedAccessControlConditions.
  unifiedAccessControlConditions?: UnifiedAccessControlConditions;

  // The chain name of the chain that this contract is deployed on.  See LIT_CHAINS for currently supported chains.
  chain: Chain;

  // The string you wish to encrypt
  string?: string;

  // The file you wish to encrypt
  file?: AcceptedFileType;

  // An instance of LitNodeClient that is already connected
  litNodeClient: ILitNodeClient;

  // Your Infura Project Id
  infuraId: string;

  // Your Infura API Key Secret
  infuraSecretKey: string;
}

export type EncryptToIpfsDataType = 'string' | 'file';

export interface EncryptToIpfsPayload {
  // The access control conditions that the user must meet to obtain this signed token.  This could be posession of an NFT, for example.  You must pass either accessControlConditions or evmContractConditions or solRpcConditions or unifiedAccessControlConditions.
  accessControlConditions?: AccessControlConditions;

  // EVM Smart Contract access control conditions that the user must meet to obtain this signed token.  This could be posession of an NFT, for example.  This is different than accessControlConditions because accessControlConditions only supports a limited number of contract calls.  evmContractConditions supports any contract call.  You must pass either accessControlConditions or evmContractConditions or solRpcConditions or unifiedAccessControlConditions.
  evmContractConditions?: EvmContractConditions;

  // Solana RPC call conditions that the user must meet to obtain this signed token.  This could be posession of an NFT, for example.
  solRpcConditions?: SolRpcConditions;

  // An array of unified access control conditions.  You may use AccessControlCondition, EVMContractCondition, or SolRpcCondition objects in this array, but make sure you add a conditionType for each one.  You must pass either accessControlConditions or evmContractConditions or solRpcConditions or unifiedAccessControlConditions.
  unifiedAccessControlConditions?: UnifiedAccessControlConditions;

  // The chain name of the chain that this contract is deployed on.  See LIT_CHAINS for currently supported chains.
  chain: Chain;

  ciphertext: string;
  dataToEncryptHash: string;
  dataType: EncryptToIpfsDataType;
}

export interface DecryptFromIpfsProps {
  // The authSig of the user.  Returned via the checkAndSignAuthMessage function
  authSig?: AuthSig;

  // the session signatures to use to authorize the user with the nodes
  sessionSigs?: any;

  // The ipfsCid/ipfsHash of the encrypted string & metadata stored on IPFS
  ipfsCid: string;

  // An instance of LitNodeClient that is already connected
  litNodeClient: ILitNodeClient;
}

export interface EncryptFileAndZipWithMetadataProps {
  // The authSig of the user.  Returned via the checkAndSignAuthMessage function
  authSig?: AuthSig;

  // the session signatures to use to authorize the user with the nodes
  sessionSigs?: any;

  // The access control conditions that the user must meet to obtain this signed token.  This could be posession of an NFT, for example.  You must pass either accessControlConditions or evmContractConditions or solRpcConditions or unifiedAccessControlConditions.
  accessControlConditions?: AccessControlConditions;

  // EVM Smart Contract access control conditions that the user must meet to obtain this signed token.  This could be posession of an NFT, for example.  This is different than accessControlConditions because accessControlConditions only supports a limited number of contract calls.  evmContractConditions supports any contract call.  You must pass either accessControlConditions or evmContractConditions or solRpcConditions or unifiedAccessControlConditions.
  evmContractConditions?: EvmContractConditions;

  // Solana RPC call conditions that the user must meet to obtain this signed token.  This could be posession of an NFT, for example.
  solRpcConditions?: SolRpcConditions;

  // An array of unified access control conditions.  You may use AccessControlCondition, EVMContractCondition, or SolRpcCondition objects in this array, but make sure you add a conditionType for each one.  You must pass either accessControlConditions or evmContractConditions or solRpcConditions or unifiedAccessControlConditions.
  unifiedAccessControlConditions?: UnifiedAccessControlConditions;

  // The chain name of the chain that this contract is deployed on.  See LIT_CHAINS for currently supported chains.
  chain: string;

  // The file you wish to encrypt
  file: File;

  // An instance of LitNodeClient that is already connected
  litNodeClient: ILitNodeClient;

  // An optional readme text that will be inserted into readme.txt in the final zip file.  This is useful in case someone comes across this zip file and wants to know how to decrypt it.  This file could contain instructions and a URL to use to decrypt the file.
  readme: string;
}

export interface DecryptZipFileWithMetadataProps {
  // The authSig of the user.  Returned via the checkAndSignAuthMessage function
  authSig?: AuthSig;

  // the session signatures to use to authorize the user with the nodes
  sessionSigs?: any;

  // The zip file blob with metadata inside it and the encrypted asset
  file: File | Blob;

  // An instance of LitNodeClient that is already connected
  litNodeClient: ILitNodeClient;
}

/**
 * Struct in rust
 * -----
 pub struct SessionKeySignedMessage {
    pub session_key: String,
    pub resources: Vec<String>,
    pub capabilities: Vec<String>,
    pub issued_at: String,
    pub expiration: String,
    pub node_address: String,
}
 */
export interface SessionKeySignedMessage {
  sessionKey: string;
  resources?: any[];
  capabilities: string[];
  issuedAt: string;
  expiration: string;
  nodeAddress: string;
}

export interface SessionSigsProp {
  expiration?: any;
  chain: Chain;
  resources: any[];
  sessionCapabilities?: any;
  switchChain?: boolean;
  litNodeClient: ILitNodeClient;
}

export interface SessionKeyPair {
  publicKey: string;
  secretKey: string;
}

/** ========== Session ========== */

// pub struct AuthMethod {
//     pub auth_method_type: u32,
//     pub access_token: String,
// }
export interface AuthMethod {
  authMethodType: number;
  accessToken: string;
}

// pub struct JsonSignSessionKeyRequest {
//     pub session_key: String,
//     pub auth_methods: Vec<AuthMethod>,
//     pub pkp_public_key: String,
//     pub auth_sig: Option<AuthSigItem>,
//     pub siwe_message: String,
// }
export interface SignSessionKeyProp {
  // The serialized session key pair to sign. If not provided, a session key pair will be fetched from localStorge or generated.
  sessionKey?: SessionKeyPair;

  // The statement text to place at the end of the SIWE statement field.
  statement?: string;

  // The auth methods to use to sign the session key
  authMethods: AuthMethod[];

  // The public key of the PKP
  pkpPublicKey?: string;

  // The auth sig of the user.  Returned via the checkAndSignAuthMessage function
  authSig?: AuthSig;

  // The siwe message
  // siweMessage: string;

  //   When this session signature will expire.  The user will have to reauthenticate after this time using whatever auth method you set up.  This means you will have to call this signSessionKey function again to get a new session signature.  This is a RFC3339 timestamp.  The default is 24 hours from now.
  expiration?: string;

  resources: any;

  chainId?: number;

  //domain param is required, when calling from environment that doesn't have the 'location' object. i.e. NodeJs server.
  domain?: string;

  resourceAbilityRequests?: LitResourceAbilityRequest[];

  // -- as part of auth unification
  sessionKeyUri?: string;

  litActionCode?: string;

  jsParams?: {
    [key: string]: any;
    publicKey: string;
    sigName: string;
  };
}

export interface SignSessionKeyResponse {
  pkpPublicKey: string;
  authSig: AuthSig;
}

export interface GetSignSessionKeySharesProp {
  body: SessionRequestBody;
}

export interface GetPkpSessionSigs extends GetSessionSigsProps {
  pkpPublicKey: string;
  authMethods: AuthMethod[];
  litActionCode?: string;
  jsParams?: {
    publicKey?: string;
    sigName?: string;
  };
}

export interface GetSessionSigsProps extends LitCustomAuth {
  pkpPublicKey?: string;

  // When this session signature will expire.  The user will have to reauthenticate after this time using whatever auth method you set up.  This means you will have to call this signSessionKey function again to get a new session signature.  This is a RFC3339 timestamp.  The default is 24 hours from now.
  expiration?: any;

  //   The chain to use for the session signature.  This is the chain that will be used to sign the session key.  If you're using EVM then this probably doesn't matter at all.
  chain?: Chain;

  /**
   * An array of resource abilities that you want to request for this session. These will be signed with the session key.
   *
   * @example If you want to request the ability to decrypt an access control condition, then you would pass
   * [{ resource: new LitAccessControlConditionResource('someResource), ability: LitAbility.AccessControlConditionDecryption }]
   */
  resourceAbilityRequests: LitResourceAbilityRequest[];

  /**
   * The session capability object that you want to request for this session.
   * If you pass nothing, then this will default to a wildcard for each type of resource you're accessing.
   *
   * @example If you passed nothing, and you're requesting to perform a decryption operation for an access
   * control condition, then the session capability object will be a wildcard for the access control condition,
   * which grants this session signature the ability to decrypt this access control condition.
   */
  sessionCapabilityObject?: ISessionCapabilityObject;

  //   If you want to ask Metamask to try and switch the user's chain, you may pass true here.  This will only work if the user is using Metamask.  If the user is not using Metamask, then this will be ignored.
  switchChain?: boolean;

  //   This is a callback that will be called if the user needs to authenticate using a PKP.  For example, if the user has no wallet, but owns a Lit PKP though something like Google Oauth, then you can use this callback to prompt the user to authenticate with their PKP.  This callback should use the LitNodeClient.signSessionKey function to get a session signature for the user from their PKP.  If you don't pass this callback, then the user will be prompted to authenticate with their wallet, like metamask.
  authNeededCallback?: AuthCallback;

  // The serialized session key pair to sign. If not provided, a session key pair will be fetched from localStorge or generated.
  sessionKey?: any;

  // rateLimitAuthSig: AuthSig;

  // Used for delegation of Capacity Credit. This signature will be checked for proof of capacity credit.
  // on both manzano and habanero networks capacity credit proof is required.
  // see more here: https://developer.litprotocol.com/v3/sdk/capacity-credits
  capacityDelegationAuthSig?: AuthSig;

  /**
   * Not limited to capacityDelegationAuthSig, we want to be able to pass in any other authSigs for other purposes.
   */
  capabilityAuthSigs?: AuthSig[];
}

export type AuthCallback = (params: AuthCallbackParams) => Promise<AuthSig>;

/**
 * A map of node addresses to the session signature payload
 * for that node specifically.
 */
export type SessionSigsMap = Record<string, SessionSig>;

export interface SessionSig {
  sig: string;
  derivedVia: string;
  signedMessage: string;
  address: string;
  algo?: string;
}

export type SessionSigs = Record<string, SessionSig>;

export interface SessionRequestBody {
  sessionKey: string;
  authMethods: AuthMethod[];
  pkpPublicKey?: string;
  authSig?: AuthSig;
  siweMessage: string;
}

export interface GetWalletSigProps extends LitCustomAuth {
  authNeededCallback?: AuthCallback;
  chain: string;
  sessionCapabilityObject: ISessionCapabilityObject;
  switchChain?: boolean;
  expiration: string;
  sessionKeyUri: string;
  nonce: string;
  resourceAbilityRequests?: LitResourceAbilityRequest[];
}

export interface SessionSigningTemplate {
  sessionKey: string;
  resourceAbilityRequests: LitResourceAbilityRequest[];
  capabilities: any[];
  issuedAt: string;
  expiration: string;
  nodeAddress: string;
}

export interface WebAuthnAuthenticationVerificationParams {
  id: string;
  rawId: string;
  response: {
    authenticatorData: string;
    clientDataJSON: string;
    signature: string;
    userHandle: string;
  };
  type: string;
  clientExtensionResults: object;
  authenticatorAttachment: AuthenticatorAttachment;
}

export declare type AuthenticatorAttachment = 'cross-platform' | 'platform';

/**
 * ========== PKP ==========
 */
export interface LitClientSessionManager {
  getSessionKey: () => SessionKeyPair;
  isSessionKeyPair(obj: any): boolean;
  getExpiration: () => string;
  getWalletSig: (getWalletSigProps: GetWalletSigProps) => Promise<AuthSig>;
  // #authCallbackAndUpdateStorageItem: (params: {
  //   authCallbackParams: AuthCallbackParams;
  //   authCallback?: AuthCallback;
  // }) => Promise<AuthSig>;
  checkNeedToResignSessionKey: (params: {
    authSig: AuthSig;
    sessionKeyUri: any;
    resourceAbilityRequests: LitResourceAbilityRequest[];
  }) => Promise<boolean>;
  getSessionSigs: (params: GetSessionSigsProps) => Promise<SessionSigsMap>;
  signSessionKey: (
    params: SignSessionKeyProp
  ) => Promise<SignSessionKeyResponse>;
}

export interface AuthenticationProps {
  client: LitClientSessionManager;
  getSessionSigsProps: GetSessionSigsProps;
  authMethods: AuthMethod[];
}

export interface PKPBaseProp {
  pkpPubKey: string;
  rpc?: string;
  rpcs?: RPCUrls;
  controllerAuthSig?: AuthSig;
  // @deprecated
  controllerAuthMethods?: AuthMethod[];
  // @deprecated
  controllerSessionSigs?: SessionSigs;
  // @deprecated
  sessionSigsExpiration?: string;
  authContext?: AuthenticationProps;
  litNetwork?: any;
  debug?: boolean;
  bootstrapUrls?: string[];
  minNodeCount?: number;
  litActionCode?: string;
  litActionIPFS?: string;
  litActionJsParams?: any;
  provider?: Provider;
}

export interface RPCUrls {
  eth?: string;
  cosmos?: string;
  btc?: string;
}

export type PKPEthersWalletProp = PKPBaseProp;

export interface PKPCosmosWalletProp extends PKPBaseProp {
  addressPrefix: string | 'cosmos'; // bech32 address prefix (human readable part) (default: cosmos)
}

// note: Omit removes the 'addressPrefix' from PKPCosmosWalletProp
export interface PKPClientProp extends PKPBaseProp {
  cosmosAddressPrefix?: string | 'cosmos';
}

export interface PKPBaseDefaultParams {
  toSign: Uint8Array;
  publicKey: Uint8Array;
  sigName: string;
}

export interface PKPClientHelpers {
  handleRequest: (request: any) => Promise<any>;
  setRpc: (rpc: string) => void;
  getRpc: () => string;
}

/**
 * ========== LitAuthClient ==========
 */
export interface LitAuthClientOptions {
  /**
   * Endpoint to interact with a blockchain network. Defaults to the Lit Chronicle.
   */
  rpcUrl?: string;
  /**
   * Options for Lit's relay server
   */
  litRelayConfig?: LitRelayConfig;
  /**
   * Pass in a custom relay server
   */
  customRelay?: IRelay;
  /**
   * Lit Node Client
   */
  litNodeClient?: any;

  /**
   * If enable will turn on logging
   */
  debug?: boolean;

  litOtpConfig?: OtpProviderOptions;
}

export interface OtpSessionResult {
  /**
   * Status message of the request
   */
  message?: string;
  /**
   * jwt from successful otp check
   */
  token_jwt?: string;
  /**
   * status of the otp check
   */
  status?: string;
}

export interface LoginUrlParams {
  /**
   * Auth method name
   */
  provider: string | null;
  /**
   * Access token
   */
  accessToken: string | null;
  /**
   * ID token
   */
  idToken: string | null;
  /**
   * OAuth state param
   */
  state: string | null;
  /**
   * Error codes from Lit's login server
   */
  error: string | null;
}

export interface IRelay {
  /**
   * Mint a new PKP for the given auth method
   *
   * @param {string} body - Body of the request
   *
   * @returns {Promise<IRelayMintResponse>} Response from the relay server
   */
  mintPKP(body: string): Promise<IRelayMintResponse>;
  /**
   * Poll the relay server for status of minting request
   *
   * @param {string} requestId - Request ID to poll, likely the minting transaction hash
   *
   * @returns {Promise<IRelayPollStatusResponse>} Response from the relay server
   */
  pollRequestUntilTerminalState(
    requestId: string
  ): Promise<IRelayPollStatusResponse>;
  /**
   * Fetch PKPs associated with the given auth method
   *
   * @param {string} body - Body of the request
   *
   * @returns {Promise<IRelayFetchResponse>} Response from the relay server
   */
  fetchPKPs(body: string): Promise<IRelayFetchResponse>;
  /**
   * Generate options for registering a new credential to pass to the authenticator
   *
   * @param {string} [username] - Optional username to associate with the credential
   *
   * @returns {Promise<any>} Registration options for the browser to pass to the authenticator
   */
  generateRegistrationOptions(username?: string): Promise<any>;
}

export interface LitRelayConfig {
  /**
   * Lit's relay server URL
   */
  relayUrl?: string;
  /**
   * API key for Lit's relay server
   */
  relayApiKey?: string;
}

export interface MintRequestBody {
  keyType?: number;
  permittedAuthMethodTypes?: number[];
  permittedAuthMethodIds?: string[];
  permittedAuthMethodPubkeys?: string[];
  permittedAuthMethodScopes?: any[][]; // ethers.BigNumber;
  addPkpEthAddressAsPermittedAddress?: boolean;
  sendPkpToItself?: boolean;
}

export interface IRelayRequestData {
  /**
   * Type of auth method
   */
  authMethodType: number;
  /**
   * ID of auth method
   */
  authMethodId: string;
  /**
   * Public key associated with the auth method (used only in WebAuthn)
   */
  authMethodPubKey?: string;
}

export interface IRelayMintResponse {
  /**
   * Transaction hash of PKP being minted
   */
  requestId?: string;
  /**
   * Error from relay server
   */
  error?: string;
}

export interface IRelayFetchResponse {
  /**
   * Fetched PKPs
   */
  pkps?: IRelayPKP[];
  /**
   * Error from relay server
   */
  error?: string;
}

export interface IRelayPollingEvent {
  /**
   * Polling count
   */
  pollCount: number;
  /**
   * Transaction hash of PKP being minted
   */
  requestId: string;
}

export interface IRelayPollStatusResponse {
  /**
   * Polling status
   */
  status?: IRelayAuthStatus;
  /**
   * Token ID of PKP being minted
   */
  pkpTokenId?: string;
  /**
   * Eth address of new PKP
   */
  pkpEthAddress?: string;
  /**
   * Public key of new PKP
   */
  pkpPublicKey?: string;
  /**
   * Polling error
   */
  error?: string;
}

export interface IRelayPKP {
  /**
   * PKP token ID
   */
  tokenId: string;
  /**
   * PKP public key
   */
  publicKey: string;
  /**
   * PKP Eth address
   */
  ethAddress: string;
}

export interface BaseProviderOptions {
  /**
   * Endpoint to interact with a blockchain network. Defaults to the Lit Chronicle.
   */
  rpcUrl: string;
  /**
   * Relay server to use
   */
  relay: IRelay;
  /**
   * Lit Node Client to use
   */
  litNodeClient: any;
}

export interface OAuthProviderOptions {
  /**
   * The redirect URI that Lit's login server should send the user back to
   */
  redirectUri?: string;
  /**
   * OAuth client ID
   */
  clientId?: string;
}

export interface EthWalletProviderOptions {
  /**
   * The domain from which the signing request is made
   */
  domain?: string;
  /**
   * The origin from which the signing request is made
   */
  origin?: string;
}

export interface WebAuthnProviderOptions {
  /**
   * Name of relying party. Defaults to "lit"
   */
  rpName?: string;
}

export interface SignInWithOTPParams {
  /**
   * otp transport (email or phone #)
   * used as the user ID for the auth method
   */
  userId: string;

  /**
   * tracking for the session
   */
  requestId?: string;

  /**
   * Allows for specifying custom sender information
   * Note: for most users the `from_name` is the configurable option and `from` should not be populated
   */
  emailCustomizationOptions: OtpEmailCustomizationOptions;

  customName?: string;
}

export interface OtpProviderOptions {
  baseUrl?: string;
  port?: string;
  startRoute?: string;
  checkRoute?: string;
}

export interface OtpEmailCustomizationOptions {
  from?: string;
  fromName: string;
}

export interface SignInWithStytchOTPParams {
  // JWT from an authenticated session
  // see stych docs for more info: https://stytch.com/docs/api/session-get
  accessToken?: string;
  // username or phone number where OTP was delivered
  userId: string;
}

export interface StytchOtpProviderOptions {
  /*
    Stytch application identifier
  */
  appId: string;
  /*
   Stytch user identifier for a project
  */
  userId?: string;
}

export type StytchToken = Record<string, any>;

export interface BaseProviderSessionSigsParams {
  /**
   * Public key of PKP to auth with
   */
  pkpPublicKey: string;
  /**
   * Auth method verifying ownership of PKP
   */
  authMethod: AuthMethod;
  /**
   * Params for getSessionSigs function
   */
  sessionSigsParams: GetSessionSigsProps;
  /**
   * Lit Node Client to use. If not provided, will use an existing Lit Node Client or create a new one
   */
  litNodeClient?: any;

  resourceAbilityRequests?: LitResourceAbilityRequest[];
}

export interface LoginUrlParams {
  /**
   * Auth method name
   */
  provider: string | null;
  /**
   * Access token
   */
  accessToken: string | null;
  /**
   * ID token
   */
  idToken: string | null;
  /**
   * OAuth state param
   */
  state: string | null;
  /**
   * Error codes from Lit's login server
   */
  error: string | null;
}

export interface BaseAuthenticateOptions {}

export interface EthWalletAuthenticateOptions extends BaseAuthenticateOptions {
  /**
   * Ethereum wallet address
   */
  address?: string;
  /**
   * Function to sign message
   *
   * @param {string} message - Message to sign
   *
   * @returns {Promise<string>} - Raw signature of message
   */
  signMessage?: (message: string) => Promise<string>;
  /**
   * Name of chain to use for signature
   */
  chain?: string;
  /**
   * When the auth signature expires
   */
  expiration?: string;
}

export interface OtpAuthenticateOptions extends BaseAuthenticateOptions {
  /**
   * User provided authentication code
   */
  code: string;
}

export interface StytchOtpAuthenticateOptions extends BaseAuthenticateOptions {
  /*
   * JWT from an authenticated session
   * see stych docs for more info: https://stytch.com/docs/api/session-get
   */
  accessToken: string;
  /*
   Stytch user identifier for a project
  */
  userId?: string;
}

/**
 * Configuration for retry operations
 */
export interface RetryTolerance {
  /**
   * An amount of time to wait for canceling the operating (in milliseconds)
   */
  timeout?: number;

  /**
   * How long to wait between retries (in milliseconds)
   */
  interval?: number;

  /**
   * How many times to retry the operation
   */
  maxRetryCount?: number;
}

export interface BaseMintCapacityContext {
  daysUntilUTCMidnightExpiration: number;
}

export interface MintCapacityCreditsPerDay extends BaseMintCapacityContext {
  requestsPerDay?: number;
}
export interface MintCapacityCreditsPerSecond extends BaseMintCapacityContext {
  requestsPerSecond?: number;
}
export interface MintCapacityCreditsPerKilosecond
  extends BaseMintCapacityContext {
  requestsPerKilosecond?: number;
}
export interface MintCapacityCreditsContext
  extends MintCapacityCreditsPerDay,
    MintCapacityCreditsPerSecond,
    MintCapacityCreditsPerKilosecond {}
export interface MintCapacityCreditsRes {
  rliTxHash: string;
  capacityTokenId: any;
  capacityTokenIdStr: string;
}
export interface JsExecutionRequestBody {
  authSig?: AuthSig;
  code?: string;
  ipfsId?: string;
  authMethods?: AuthMethod[];
  jsParams?: any;
}

// pub struct JsonSignSessionKeyRequestV1 {
//   pub session_key: String,
//   pub auth_methods: Vec<AuthMethod>,
//   pub pkp_public_key: Option<String>,
//   pub auth_sig: Option<AuthSigItem>, // For backwards compatibility
//   pub siwe_message: String,
//   pub curve_type: CurveType,
//   pub code: Option<String>,
//   pub lit_action_ipfs_id: Option<String>,
//   pub js_params: Option<Value>,
//   #[serde(default = "default_epoch")]
//   pub epoch: u64,
// }
export interface JsonSignSessionKeyRequestV1 {
  sessionKey: string;
  authMethods: AuthMethod[];
  pkpPublicKey?: string;
  authSig?: AuthSig;
  siweMessage: string;
  curveType: 'BLS' | 'ECDSA';
  code?: string;
  litActionIpfsId?: string;
  jsParams?: any;
  epoch?: number;
}
export interface BlsResponseData {
  result: boolean;
  signatureShare: {
    ProofOfPossession: string;
  };
  shareIndex: number;
  curveType: string;
  siweMessage: string;
  dataSigned: string;
  blsRootPubkey: string;
}
export interface CapacityCreditsReq {
  dAppOwnerWallet: SignerLike;
  capacityTokenId?: string;
  delegateeAddresses?: string[];
  uses?: string;
  domain?: string;
  expiration?: string;
  statement?: string;
}
export interface CapacityCreditsRes {
  capacityDelegationAuthSig: AuthSig;
}

/**
 * Signer that has the ability to sign messages
 * eg. ethers.Wallet or ethers.Signer
 *
 * for context: This is a common interface so can keep this package clean without
 * importing external libraries directly
 */
export interface SignerLike {
  signMessage: (message: string | any) => Promise<string>;
  getAddress: () => Promise<string>;
}

export interface EthersJsonRpcProviderLike {
  [key: string]: any;
  detectNetwork: () => Promise<any>;
  getSigner: (addressOrIndex?: string | number) => SignerLike;
  getUncheckedSigner: (addressOrIndex?: string | number) => any;
  listAccounts: () => Promise<string[]>;
  send: (method: string, params: any[]) => Promise<any>;
  prepareRequest(method: string, params: any[]): any;
  perform(request: any): Promise<any>;
}

export interface CapacityDelegationRequest {
  nft_id?: string[]; // Optional array of strings
  delegate_to?: string[]; // Optional array of modified address strings
  uses: string; // Always present, default to '1' if undefined
}

export interface BaseSiweMessage {
  walletAddress: string;
  nonce: string;

  // -- filled in by default
  expiration?: string;
  resources?: LitResourceAbilityRequest[];
  uri?: string; // This is important in authNeededCallback params eg. (lit:session:xxx)
  domain?: string;
  statement?: string;
  version?: string;
  chainId?: number;
  litNodeClient?: any;
}

export interface CapacityDelegationFields extends BaseSiweMessage {
  litNodeClient: any;
  capacityTokenId?: string;
  delegateeAddresses?: string[];
  uses?: string;
}

export interface LitCustomAuth {
  litActionCode?: string;
  ipfsId?: string;
  jsParams?: {
    publicKey?: string;
    sigName?: string;
  };
}
