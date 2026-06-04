import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sporttv.app',
  appName: 'Sport TV',
  webDir: 'dist',
  android: {
    allowMixedContent: true,
    backgroundColor: '#0a0a0f',
  },
  ios: {
    contentInset: 'automatic',
    backgroundColor: '#0a0a0f',
  },
};

export default config;
