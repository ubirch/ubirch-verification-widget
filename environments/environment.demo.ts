import { IUbirchVerificationEnvConfig } from '../src/models';

export default {
  verify_api_url: 'https://verify.demo.ubirch.com/api/upp/verify/anchor?blockchain_info=ext',
  console_verify_url: 'https://console.demo.ubirch.com/verification',
  assets_url_prefix: '/blockchain-assets/'
} as IUbirchVerificationEnvConfig;
