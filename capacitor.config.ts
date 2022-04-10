import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'CozProjectFrontend',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins:{
    LocalNotifications:{
      smallIcon:"",
      iconColor:"#488AFF",
      sound:""
    }
  }
};

export default config;
