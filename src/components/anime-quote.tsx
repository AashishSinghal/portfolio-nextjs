import { useState } from "react"
import { quotes } from "@/data/quotes"

const randomIndex = () => Math.floor(Math.random() * quotes.length)

// A big anime quote for the footer: random on each visit, click it for another
export default function AnimeQuote() {
  const [index, setIndex] = useState(randomIndex)
  const quote = quotes[index]

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
          onClick={() =>
            setIndex(
              (i) => (i + 1 + Math.floor(Math.random() * (quotes.length - 1))) % quotes.length
            )
          }
          title="Another one"
          className="text-left text-3xl leading-tight font-semibold tracking-tight text-fg italic transition-colors hover:text-gold sm:text-5xl"
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
