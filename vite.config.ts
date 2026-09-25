import path from "node:path"
import fs from "node:fs"
import { defineConfig, type Plugin } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// In production Vercel serves api/*.ts as functions. This runs the same handlers in
// `vite dev`, with just enough of the VercelResponse API (status/json) for them.
function vercelApiInDev(): Plugin {
  return {
    name: "vercel-api-in-dev",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const { pathname } = new URL(req.url ?? "/", "http://localhost")
        const match = /^\/api\/([\w-]+)$/.exec(pathname)
        const file = match && path.resolve(import.meta.dirname, "api", `${match[1]}.ts`)
        if (!file || !fs.existsSync(file)) return next()

        try {
          const { default: handler } = await server.ssrLoadModule(file)
          const response = Object.assign(res, {
            status(code: number) {
              res.statusCode = code
              return response
            },
            json(body: unknown) {
              res.setHeader("Content-Type", "application/json")
              res.end(JSON.stringify(body))
              return response
            },
          })
          await handler(req, response)
        } catch (error) {
          next(error)
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), vercelApiInDev()],
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "src") },
  },
})
