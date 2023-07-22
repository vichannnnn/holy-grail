import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

export default ({ mode }) => {
  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        '@api/auth': path.resolve(__dirname, 'src/api/auth/index.ts'),
        '@api/actions': path.resolve(__dirname, 'src/api/actions/index.ts'),
        '@api/library': path.resolve(__dirname, 'src/api/library/index.ts'),
        '@apiClient': path.resolve(__dirname, 'src/api/apiClient.ts'),
        '@components': path.resolve(__dirname, 'src/components/index.ts'),
        '@features': path.resolve(__dirname, 'src/features/index.ts'),
        '@providers': path.resolve(__dirname, 'src/providers/index.ts'),
        '@utils': path.resolve(__dirname, 'src/utils/index.ts'),
      },
    },
  });
};
