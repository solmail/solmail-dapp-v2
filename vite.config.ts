import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import fs from "fs";
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      tsconfigPaths(),
      tanstackRouter(),
      react(),
      ...(mode === "analyze"
        ? [
            visualizer({
              filename: "bundle-report.html",
              open: true,
              gzipSize: true,
              brotliSize: true,
            }),
          ]
        : []),
      nodePolyfills({
        exclude: ["fs"],
        globals: {
          Buffer: true,
          global: true,
          process: true,
        },
        protocolImports: true,
      }),

      //

      {
        name: "generate-build-info",
        closeBundle() {
          const outDir = path.resolve(__dirname, "dist");
          if (!fs.existsSync(outDir)) {
            fs.mkdirSync(outDir, { recursive: true });
          }

          const buildInfo = {
            mode,
            timestamp: new Date().toISOString(),
          };

          fs.writeFileSync(
            path.join(outDir, "build-info.json"),
            JSON.stringify(buildInfo, null, 2)
          );

          console.log("✅ build-info.json generated in dist/");
        },
      },
    ],
    server: {
      port: 3030,
      host: true,
    },
    define: {
      global: "window",
    },
    optimizeDeps: {
      exclude: ["@graphql-typed-document-node/core"],
    },
    build: {
      rollupOptions: {
        treeshake: true,
      },
    },
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "src/components"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@layouts": path.resolve(__dirname, "src/layouts"),
        "@const": path.resolve(__dirname, "src/const"),
        "@screens": path.resolve(__dirname, "src/screens"),
        "@state": path.resolve(__dirname, "src/state"),
        "@hooks": path.resolve(__dirname, "src/hooks"),
        "@theme": path.resolve(__dirname, "src/theme/"),
        "@integrations": path.resolve(__dirname, "src/integrations/"),
      },
    },
  };
});
