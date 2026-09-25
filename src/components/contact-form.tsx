import { useState, type FormEvent } from "react"
import { profile } from "@/data/profile"

type Status = "idle" | "sending" | "sent" | "error"

const fieldClass =
  "w-full rounded-lg border border-line bg-surface px-4 py-3 text-fg placeholder:text-faint transition-colors focus:border-teal focus:outline-none"

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle")

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    setStatus("sending")
    try {
      // Formspark forwards submissions to my inbox
      const response = await fetch(`https://submit-form.com/${profile.formsparkId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      })
      if (!response.ok) throw new Error(`Formspark responded ${response.status}`)
      form.reset()
      setStatus("sent")
    } catch (error) {
      console.error("Error sending message:", error)
      setStatus("error")
    }
  }

  if (status === "sent") {
    return (
      <p role="status" className="rounded-lg border border-teal/40 bg-teal-soft px-4 py-3 text-fg">
        Thanks, your message is on its way. I&apos;ll get back to you soon.
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm text-muted">
          Name
          <input name="name" required autoComplete="name" className={fieldClass} />
        </label>
        <label className="grid gap-2 text-sm text-muted">
          Email
          <input name="email" type="email" required autoComplete="email" className={fieldClass} />
        </label>
      </div>
      <label className="grid gap-2 text-sm text-muted">
        Message
        <textarea name="message" required minLength={10} rows={5} className={fieldClass} />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-lg bg-gold px-5 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-gold/90 disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        {status === "error" && (
          <p role="alert" className="text-sm text-red-400">
            That didn&apos;t go through. Try again, or message me on{" "}
            <a href={profile.links.linkedin} className="link">
              LinkedIn
            </a>
            .
          </p>
        )}
      </div>
    </form>
  )
}
