import { IUbirchVerificationEnvConfig } from '../src/models';

export default {
  verify_api_url: 'https://verify.prod.ubirch.com/api/upp/verify/anchor?blockchain_info=ext',
  console_verify_url: 'https://console.prod.ubirch.com/verification',
  assets_url_prefix: 'https://console.prod.ubirch.com/libs/verification/'
} as IUbirchVerificationEnvConfig;
