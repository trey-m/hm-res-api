// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // You can specify the reporter here
    reporters: ['default', 'verbose'], // or use 'dot', 'json', etc.
  },
});
