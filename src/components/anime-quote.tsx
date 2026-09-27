import { useState } from "react"
import { quotes } from "@/data/quotes"
import { cn } from "@/lib/utils"

// A new shuffled order of all the quotes (Fisher–Yates)
function shuffled() {
  const order = quotes.map((_, i) => i)
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  return order
}

// A big anime quote for the footer. Each visit shuffles the quotes; clicking steps through
// them, so every quote shows once before any repeats.
export default function AnimeQuote() {
  const [order] = useState(shuffled)
  const [step, setStep] = useState(0)
  const quote = quotes[order[step % order.length]]

  return (
    <figure className="relative">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 -left-2 font-serif text-[9rem] leading-none text-surface-2 select-none sm:-top-14 sm:-left-6 sm:text-[12rem]"
      >
        &rdquo;
      </span>
      <blockquote className="relative">
        <button
          type="button"
          onClick={() => setStep((n) => n + 1)}
          title="Another one"
          className={cn(
            "text-left leading-tight font-semibold tracking-tight text-fg italic transition-colors hover:text-gold",
            // Long quotes get a smaller size so they don't swallow the footer
            quote.text.length > 80 ? "text-2xl sm:text-4xl" : "text-3xl sm:text-5xl"
          )}
        >
          &ldquo;{quote.text}&rdquo;
        </button>
      </blockquote>
      <figcaption className="mt-8 text-right font-mono text-sm text-muted">
        — {quote.character}
        <span className="text-faint">, {quote.series}</span>
      </figcaption>
    </figure>
  )
}
