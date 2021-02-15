import { IUbirchVerificationEnvConfig } from '../src/models';

export default {
  verify_api_url: 'https://verify.dev.ubirch.com/api/upp/verify/record?response_form=anchors_with_path&blockchain_info=ext',
  console_verify_url: 'https://console.dev.ubirch.com/verification',
  assets_url_prefix: '/blockchain-assets/'
} as IUbirchVerificationEnvConfig;
