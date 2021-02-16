import { IUbirchVerificationEnvConfig } from '../src/models';

export default {
  verify_api_url: {
    dev: 'https://verify.dev.ubirch.com',
    demo: 'https://verify.demo.ubirch.com',
    prod: 'https://verify.prod.ubirch.com',
  },
  console_verify_url: {
    dev: 'https://console.dev.ubirch.com',
    demo: 'https://console.demo.ubirch.com',
    prod: 'https://console.prod.ubirch.com'
  },
  verify_api_path: '/api/upp/verify/record?response_form=anchors_with_path&blockchain_info=ext',
  console_verify_path: '/verification',
} as IUbirchVerificationEnvConfig;
