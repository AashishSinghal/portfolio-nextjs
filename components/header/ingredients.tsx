"use client"

import { useEffect, useState } from "react"

// A simpler implementation of the typewriter effect
const Ingredients = () => {
  const [text, setText] = useState("")
  const fullText = `const aashish: Array<Ingredient> = [
  Designer, Developer, Photographer-ish, Writer,
  Sugar, Spice, ...everythingNice,
];`

  useEffect(() => {
    let i = 0
    const typing = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.substring(0, i + 1))
        i++
      } else {
        clearInterval(typing)
      }
    }, 40)

    return () => clearInterval(typing)
  }, [fullText])

  // Apply syntax highlighting manually
  const highlightedText = text
    .replace(/const /g, '<span class="text-blue-500">const </span>')
    .replace(/: Array</g, ": Array&lt;")
    .replace(/Ingredient>/g, '<span class="text-green-500">Ingredient</span>&gt;')
    .replace(/= /g, '<span class="text-blue-500">= </span>')
    .replace(
      /Designer|Developer|Photographer-ish|Writer|Sugar|Spice|\.\.\.everythingNice/g,
      (match) => `<span class="text-red-500">${match}</span>`,
    )

  return (
    <code className="h-[115px] text-center leading-loose block">
      <pre dangerouslySetInnerHTML={{ __html: highlightedText }} />
    </code>
  )
}

export default Ingredients

