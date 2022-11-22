import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.todoapp.vueapp',
  appName: 'To Do App',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    "CapacitorHttp": {
      "enabled": true
    }
  }
};

export default config;
