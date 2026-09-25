import path from "node:path"
import fs from "node:fs"
import { defineConfig, loadEnv, type Plugin } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// In production Vercel serves api/*.ts as functions. This runs the same handlers in
// `vite dev`, with just enough of the VercelResponse API (status/json) for them.
function vercelApiInDev(): Plugin {
  return {
    name: "vercel-api-in-dev",
    apply: "serve",
    configureServer(server) {
      // Vercel gives functions every env var; mirror that locally by loading .env (all keys,
      // not just VITE_ ones) into process.env, without overriding what's already set
      const env = loadEnv(server.config.mode, import.meta.dirname, "")
      for (const [key, value] of Object.entries(env)) process.env[key] ??= value

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

// Draft posts (frontmatter `draft: true`) are shown in `vite dev` only. The runtime filter in
// src/data/writing.ts hides them, and this keeps their text out of production bundles too.
function stripDraftPostsInBuild(): Plugin {
  return {
    name: "strip-draft-posts-in-build",
    apply: "build",
    enforce: "pre",
    load(id) {
      const [file, query] = id.split("?")
      if (query !== "raw" || !/[\\/]content[\\/]writing[\\/][^\\/]+\.md$/.test(file)) return
      const source = fs.readFileSync(file, "utf8")
      if (!/^draft:\s*true\s*$/m.test(source.split(/\r?\n---/)[0])) return
      const stub = "---\ntitle: draft\ndate: 1970-01-01\nsummary: draft\ndraft: true\n---\n"
      return `export default ${JSON.stringify(stub)}`
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), vercelApiInDev(), stripDraftPostsInBuild()],
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "src") },
  },
})
