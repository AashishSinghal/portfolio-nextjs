import type { Language } from "@/types/sections"

/**
 * Languages Data
 *
 * This file contains information about the languages known by the portfolio owner.
 *
 * MODIFICATIONS:
 * 1. Updated from the original languages.ts file
 * 2. Ensured compatibility with the Language type
 * 3. Added comments for better readability
 */

const languagesList: Language[] = [
  {
    id: 1,
    language: "Hindi",
    text: "हिन्दी मेरी मातृभाषा है।",
    translation: "Hindi is my native tongue.",
  },
  {
    id: 2,
    language: "English",
    text: "I'm pretty fluent in English.",
  },
  {
    id: 3,
    language: "Japanese",
    text: "Genzai Duolingo de nihongo o benkyō shite imasu.",
    translation: "I am currently learning Japanese on Duolingo.",
  },
]

export default languagesList

