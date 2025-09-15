import { defineConfig, loadEnv } from "vite";
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
      {
        name: "service-worker-registration",
        configureServer() {
          const src = path.resolve("src/firebase-messaging-sw.js");
          const dest = path.resolve("public/firebase-messaging-sw.js");

          const env = loadEnv(mode, process.cwd(), "VITE_");
          let content = fs.readFileSync(src, "utf-8");

          const envMap = {
            VITE_SOLMAIL_API_KEY: env.VITE_SOLMAIL_API_KEY,
            VITE_SOLMAIL_AUTH_DOMAIN: env.VITE_SOLMAIL_AUTH_DOMAIN,
            VITE_SOLMAIL_PROJECT_ID: env.VITE_SOLMAIL_PROJECT_ID,
            VITE_SOLMAIL_STORAGE_BUCKET: env.VITE_SOLMAIL_STORAGE_BUCKET,
            VITE_SOLMAIL_MESSAGING_SENDER_ID:
              env.VITE_SOLMAIL_MESSAGING_SENDER_ID,
            VITE_SOLMAIL_APP_ID: env.VITE_SOLMAIL_APP_ID,
            VITE_SOLMAIL_MEASUREMENT_ID: env.VITE_SOLMAIL_MEASUREMENT_ID,
          };

          for (const [key, value] of Object.entries(envMap)) {
            content = content.replaceAll(key, value || "");
          }

          fs.writeFileSync(dest, content);
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
