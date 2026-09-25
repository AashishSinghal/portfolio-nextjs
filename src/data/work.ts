export type Job = {
  company: string
  role: string
  start: string
  end: string
  url?: string
  // Keep to the 2–3 strongest, measurable points
  highlights: string[]
}

export const work: Job[] = [
  {
    company: "100ms",
    role: "Senior Software Engineer",
    start: "2026",
    end: "Now",
    url: "https://www.100ms.live/",
    highlights: [
      "Shipped an AI call-quality review platform from zero in Go and React: evaluation lists, a searchable transcript viewer, scorecards and a human-in-the-loop review flow.",
      "Ran a production backfill on GKE over 106K+ historical call recordings, delivering 92K+ AI evaluations at 98% completion.",
      "Replaced rule-based compliance detection with LLM transcript analysis, with evals in Langfuse to measure prompt stability before shipping.",
    ],
  },
  {
    company: "Empirical.run",
    role: "Software Engineer",
    start: "2025",
    end: "2026",
    url: "https://empirical.run/",
    highlights: [
      "Built multi-model LLM infrastructure (Claude, GPT-5, Gemini) for autonomous software-testing agents, across 200+ PRs.",
      "Architected a Cloudflare Durable Objects agent worker with WebSocket streaming, queuing and SQL state.",
      "Delivered the Linear and GitHub integrations, auth (magic links, TOTP) and the test-triage dashboard.",
    ],
  },
  {
    company: "Nutanix",
    role: "Member of Technical Staff 2",
    start: "2022",
    end: "2025",
    url: "https://www.nutanix.com/",
    highlights: [
      "Put OS version deployment behind feature flags for a phased rollout, cutting deployment failures by 40%, and designed the feature-flag portal.",
      "Migrated the frontend to an in-house UI library, cutting UI bug reports by 30%.",
    ],
  },
  {
    company: "Celebal Technologies",
    role: "Full-Stack Development Intern",
    start: "2021",
    end: "2021",
    url: "https://celebaltech.com/",
    highlights: [
      "Built order-management and HR portals with a 50% performance improvement, and mentored interns on React and TypeScript.",
    ],
  },
]
