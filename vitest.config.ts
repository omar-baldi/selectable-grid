/// <reference types="vitest" />

import path from "path";
import { defineConfig, mergeConfig } from "vite";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "happy-dom",
      alias: { "@": path.resolve(__dirname, "src") },
    },
  })
);
