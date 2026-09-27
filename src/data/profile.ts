export const profile = {
  name: "Aashish Singhal",
  role: "Senior full-stack engineer",
  location: "Bangalore, India",
  // One or two sentences: who you are and what you build
  intro:
    "I build AI-powered products end to end, from Go services and data pipelines to React interfaces. I like data-dense product surfaces, and taking features from zero to production.",
  // Shown with a teal dot under the name; set to "" to hide it
  availability: "Open to roles and freelance work",
  email: "aashish451singhal@gmail.com",
  links: {
    github: "https://github.com/AashishSinghal",
    linkedin: "https://www.linkedin.com/in/iamaashish5/",
    twitter: "https://twitter.com/BarbarianO_o",
    instagram: "https://www.instagram.com/i.am.as.is/",
    resume: "/resume.pdf",
    repository: "https://github.com/AashishSinghal/portfolio-nextjs",
    arcade: "https://arcade.aashishsinghal.com",
  },
}

// GitHub account behind the contributions graph (api/github.ts has its own copy; keep them in sync)
export const githubUser = "AashishSinghal"

// Ways to reach me, in display order (the Connect section and the hero)
export const socials = [
  { key: "email", label: "Email", handle: profile.email, href: `mailto:${profile.email}` },
  { key: "github", label: "GitHub", handle: "@AashishSinghal", href: profile.links.github },
  { key: "linkedin", label: "LinkedIn", handle: "in/iamaashish5", href: profile.links.linkedin },
  { key: "x", label: "X", handle: "@BarbarianO_o", href: profile.links.twitter },
  { key: "instagram", label: "Instagram", handle: "@i.am.as.is", href: profile.links.instagram },
] as const

export type Social = (typeof socials)[number]

export const skillGroups = ["Languages", "Frontend", "Backend", "Data", "AI", "Infra"] as const
export type SkillGroup = (typeof skillGroups)[number]

// From the resume's Technical Skills, plus tech named in its experience section and in the
// projects (src/data/projects.ts). Icons are matched by name in components/brand-icon.tsx.
export const skills: Array<{ name: string; group: SkillGroup }> = [
  { name: "TypeScript", group: "Languages" },
  { name: "JavaScript", group: "Languages" },
  { name: "Go", group: "Languages" },
  { name: "Python", group: "Languages" },
  { name: "SQL", group: "Languages" },
  { name: "HTML", group: "Languages" },
  { name: "CSS", group: "Languages" },
  { name: "Solidity", group: "Languages" },
  { name: "React", group: "Frontend" },
  { name: "Next.js", group: "Frontend" },
  { name: "Tailwind CSS", group: "Frontend" },
  { name: "Redux", group: "Frontend" },
  { name: "Vite", group: "Frontend" },
  { name: "Electron", group: "Frontend" },
  { name: "Material UI", group: "Frontend" },
  { name: "TensorFlow.js", group: "Frontend" },
  { name: "Node.js", group: "Backend" },
  { name: "NestJS", group: "Backend" },
  { name: "GraphQL", group: "Backend" },
  { name: "gRPC", group: "Backend" },
  { name: "Protobuf", group: "Backend" },
  { name: "REST APIs", group: "Backend" },
  { name: "WebSockets", group: "Backend" },
  { name: "Socket.IO", group: "Backend" },
  { name: "Temporal", group: "Backend" },
  { name: "PostgreSQL", group: "Data" },
  { name: "MongoDB", group: "Data" },
  { name: "ClickHouse", group: "Data" },
  { name: "Redis", group: "Data" },
  { name: "DynamoDB", group: "Data" },
  { name: "Firebase", group: "Data" },
  { name: "Sanity", group: "Data" },
  { name: "Claude", group: "AI" },
  { name: "GPT", group: "AI" },
  { name: "Gemini", group: "AI" },
  { name: "LLM evaluations", group: "AI" },
  { name: "Prompt engineering", group: "AI" },
  { name: "Langfuse", group: "AI" },
  { name: "Whisper", group: "AI" },
  { name: "Deepgram", group: "AI" },
  { name: "Kubernetes (GKE)", group: "Infra" },
  { name: "Docker", group: "Infra" },
  { name: "GCP", group: "Infra" },
  { name: "AWS", group: "Infra" },
  { name: "AWS CDK", group: "Infra" },
  { name: "Cloudflare Workers", group: "Infra" },
  { name: "Durable Objects", group: "Infra" },
  { name: "GitHub Actions", group: "Infra" },
  { name: "Grafana", group: "Infra" },
]
