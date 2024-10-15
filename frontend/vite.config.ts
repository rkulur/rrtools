import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    define: {
      "process.env.VITE_APP_TOOLS_API": JSON.stringify(
        process.env.VITE_APP_TOOLS_API,
      ),
    },
  };
});
