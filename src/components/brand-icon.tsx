import {
  siClaude,
  siClickhouse,
  siCloudflare,
  siCloudflareworkers,
  siCss,
  siDeepgram,
  siDocker,
  siElectron,
  siFirebase,
  siGithub,
  siGithubactions,
  siGmail,
  siGo,
  siGooglecloud,
  siGooglegemini,
  siGrafana,
  siGraphql,
  siHtml5,
  siInstagram,
  siJavascript,
  siKubernetes,
  siMongodb,
  siMui,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siRedux,
  siSanity,
  siSocketdotio,
  siSolidity,
  siTailwindcss,
  siTemporal,
  siTensorflow,
  siTypescript,
  siVite,
  siX,
  type SimpleIcon,
} from "simple-icons"
import { cn } from "@/lib/utils"

// Brand marks from simple-icons, keyed by skill name or social key. Names without a mark
// (simple-icons dropped some brands, e.g. AWS and LinkedIn) fall back to short initials.
const icons: Record<string, SimpleIcon> = {
  TypeScript: siTypescript,
  Go: siGo,
  Python: siPython,
  React: siReact,
  "Next.js": siNextdotjs,
  "Node.js": siNodedotjs,
  GraphQL: siGraphql,
  Temporal: siTemporal,
  PostgreSQL: siPostgresql,
  ClickHouse: siClickhouse,
  Redis: siRedis,
  "Kubernetes (GKE)": siKubernetes,
  JavaScript: siJavascript,
  HTML: siHtml5,
  CSS: siCss,
  Solidity: siSolidity,
  "Tailwind CSS": siTailwindcss,
  Redux: siRedux,
  Vite: siVite,
  Electron: siElectron,
  "Material UI": siMui,
  "TensorFlow.js": siTensorflow,
  NestJS: siNestjs,
  "Socket.IO": siSocketdotio,
  MongoDB: siMongodb,
  Firebase: siFirebase,
  Sanity: siSanity,
  Claude: siClaude,
  Gemini: siGooglegemini,
  Deepgram: siDeepgram,
  Docker: siDocker,
  "Durable Objects": siCloudflare,
  "GitHub Actions": siGithubactions,
  Grafana: siGrafana,
  GCP: siGooglecloud,
  "Cloudflare Workers": siCloudflareworkers,
  email: siGmail,
  github: siGithub,
  x: siX,
  instagram: siInstagram,
}

const fallback: Record<string, string> = {
  gRPC: "g",
  AWS: "aws",
  SQL: "sql",
  Protobuf: "pb",
  "REST APIs": "api",
  WebSockets: "ws",
  DynamoDB: "db",
  GPT: "gpt",
  "LLM evaluations": "ev",
  "Prompt engineering": "pr",
  Langfuse: "lf",
  Whisper: "wh",
  "AWS CDK": "cdk",
  linkedin: "in",
  resume: "cv",
}

export default function BrandIcon({ name, className }: { name: string; className?: string }) {
  const icon = icons[name]
  if (icon) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("size-4 fill-current", className)}>
        <path d={icon.path} />
      </svg>
    )
  }
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-4 place-content-center rounded-[3px] border border-current font-mono text-[8px] leading-none font-semibold",
        className
      )}
    >
      {fallback[name] ?? name.slice(0, 2)}
    </span>
  )
}
