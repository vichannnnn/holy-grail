import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

export default ({ mode }) => {
  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        '@api/auth': path.resolve(__dirname, 'src/api/utils/auth/index.ts'),
        '@api/actions': path.resolve(__dirname, 'src/api/utils/actions/index.ts'),
        '@api/library': path.resolve(__dirname, 'src/api/utils/library/index.ts'),
        '@apiClient': path.resolve(__dirname, 'src/api/apiClient.ts'),
      },
    },
  });
};
