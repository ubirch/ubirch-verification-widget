export type UbirchHashAlgorithm = 'sha256' | 'sha512';

export enum EInfo {
  PROCESSING_VERIFICATION_CALL = 1,
  VERIFICATION_SUCCESSFUL = 2
}

export enum EError {
  NO_ERROR = 0,
  CERTIFICATE_DATA_MISSING = 1,
  CERTIFICATE_ID_CANNOT_BE_FOUND = 2,
  VERIFICATION_FAILED_EMPTY_RESPONSE = 3,
  VERIFICATION_FAILED_MISSING_SEAL_IN_RESPONSE = 4,
  VERIFICATION_FAILED = 5,
  UNKNOWN_ERROR = 99
}

export enum ELanguages {
  de = 'de',
  en = 'en'
}

export enum EStages {
  local = 'local',
  dev = 'dev',
  demo = 'demo',
  prod = 'prod',
}

export interface IUbirchVerificationConfig {
  algorithm: UbirchHashAlgorithm;
  elementSelector: string;
  stage?: EStages;
  language?: ELanguages;
  HIGHLIGHT_PAGE_AFTER_VERIFICATION?: boolean;
  OPEN_CONSOLE_IN_SAME_TARGET?: boolean;
  NO_LINK_TO_CONSOLE?: boolean;
}

export interface IUbirchFormVerificationConfig extends IUbirchVerificationConfig {
  formIds: string[];
  paramsFormIdsMapping?: string[];
  CHECK_FORM_FILLED?: boolean;
}

export interface IUbirchVerificationResponse {
  anchors: {
    upper_blockchains: IUbirchVerificationAnchor[]
  };
  prev: any; // @todo define type
  upp: string;
}

export interface IUbirchVerificationAnchor {
  label: string;
  properties: any;
}

export interface IUbirchVerificationAnchorProperties {
  blockchain: string;
  created: string;
  hash: string;
  message: string;
  network_info: string;
  network_type: string;
  prev_hash: string;
  public_chaing: string;
  status: string;
  timestamp: string;
  txid: string;
}

export interface IUbirchVerificationEnvConfig {
  verify_api_url: IUbirchStagesURLs;
  verify_api_path: string;
  console_verify_url: IUbirchStagesURLs;
  console_verify_path: string;
}

export interface IUbirchStagesURLs {
  local?: string,
  dev?: string,
  demo?: string,
  prod?: string,
}

export interface IUbirchFormError {
  msg: string;
  missingIds: string[];
}

export interface IUbirchAnchorObject {
  href: any;
  target: string;
  title: string;
  icon: string;
}

export interface IUbirchBlockchain {
  nodeIcon: string;
  explorerUrl: IUbirchBlockhainTransidCheckUrl;
}

export interface IUbirchBlockhainTransidCheckUrl {
  bdr?: IUbirchBlockchainNet;
  testnet?: IUbirchBlockchainNet;
  mainnet?: IUbirchBlockchainNet;
}

export interface IUbirchBlockchainNet {
  url: string;
}
