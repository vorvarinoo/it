import includeHtml from "vite-plugin-include-html";
import { defineConfig } from "vite";
import { resolve } from "path";
import vitePluginSVGToFont from "@sumsolution/vite-plugin-svg-to-font";

export default defineConfig({
  plugins: [
    includeHtml(),
    {
      name: "reload-html",
      configureServer(server) {
        const { ws, watcher } = server;
        watcher.on("change", (file) => {
          if (file.endsWith(".html")) {
            ws.send({
              type: "full-reload",
            });
          }
        });
      },
    },
    vitePluginSVGToFont({
      svgPath: resolve(__dirname, "./src/icons"),
    }),
  ],
});
