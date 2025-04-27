import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import Components from 'unplugin-vue-components/vite';
import { BootstrapVueNextResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig(({ mode }) => {
  return {
    server: {
      host: 'localhost',
      port: 3000, // Cố định port để dễ kiểm tra
    },
    plugins: [
      vue(),
      // Components({
      //   // resolvers: [BootstrapVueNextResolver()],
      //   sourceMap: true,
      // }),
    ],
    build: {
      sourcemap: 'inline', // Bật source maps cho build
    },
    esbuild: {
      sourcemap: 'inline', // Đảm bảo source maps trong dev
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    css: {
      devSourcemap: true, // CSS source maps trong dev
    },
    define: {
      __VUE_PROD_DEVTOOLS__: 'true', // Hỗ trợ Vue DevTools
    },
  };
});