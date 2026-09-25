"use client"

import Button from "@/components/button"
import Input from "@/components/input"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { FaPaperPlane } from "react-icons/fa"
import { Section } from "@/types/sections"
import { getSectionHeading } from "@/lib/utils/heading"

const FORMSPARK_FORM_ID = "Nvmai2DF"

type FormData = {
  name: string
  email: string
  message: string
}

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const [isSubmitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const onSubmit = handleSubmit(async (data) => {
    setSubmitting(true)
    setSubmitError(false)
    try {
      // Formspark forwards submissions to my inbox
      const response = await fetch(`https://submit-form.com/${FORMSPARK_FORM_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error(`Formspark responded ${response.status}`)
      setSubmitted(true)
    } catch (error) {
      console.error("Error sending message:", error)
      setSubmitError(true)
    } finally {
      setSubmitting(false)
    }
  })

  if (isSubmitted) {
    return (
      <div id={Section.Contact} className="lg:w-1/2">
        {getSectionHeading(Section.Contact)}

        <p className="text-lg leading-loose">
          Thank you for your message.
          <br />
          I&apos;ll get back to you as soon as possible.
        </p>
      </div>
    )
  }

  return (
    <div id={Section.Contact} className="lg:w-1/2">
      {getSectionHeading(Section.Contact)}

      <form onSubmit={onSubmit} className="grid gap-8">
        <Input
          type="text"
          label="Full Name"
          className="md:w-3/4"
          hasError={!!errors.name}
          placeholder="Regina Phalange"
          description={errors.name?.message || "The one where you tell me your name"}
          {...register("name", { required: { value: true, message: "This is a required field" } })}
        />

        <Input
          type="email"
          className="md:w-3/4"
          label="Email Address"
          hasError={!!errors.email}
          placeholder="regina@centralperk.com"
          description={
            errors.email?.message || "The one where you tell me how I can contact you back"
          }
          {...register("email", {
            required: { value: true, message: "This is a required field" },
            pattern: { value: /^\S+@\S+\.\S+$/, message: "Please enter a valid email address" },
          })}
        />

        <Input
          type="textarea"
          label="Message"
          hasError={!!errors.message}
          placeholder="Type your message here"
          description={
            errors.message?.message || "The one where you tell me what I can do to help you"
          }
          {...register("message", {
            required: { value: true, message: "This is a required field" },
            minLength: { value: 10, message: "Your message must be at least 10 characters long" },
          })}
        />
      </form>

      <Button icon={FaPaperPlane} className="mt-8" onClick={onSubmit} disabled={submitting}>
        {submitting ? "Sending..." : "Send Message"}
      </Button>

      {submitError && (
        <p role="alert" className="mt-4 text-rose-600 dark:text-rose-400">
          That didn&apos;t go through. Please try again, or reach me on LinkedIn.
        </p>
      )}
    </div>
  )
}

export default Contact
