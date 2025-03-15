import { Suspense } from "react"
import Loading from "./loading"

// Import each section component directly
import AboutMe from "@/components/sections/about-me"
import AboutRotW from "@/components/sections/about-rotw"
import Contact from "@/components/sections/contact"
// Import the redesigned components
import EducationRedesigned from "@/components/sections/education-redesigned"
import Footer from "@/components/sections/footer"
import Header from "@/components/sections/header"
import Languages from "@/components/sections/languages"
import Music from "@/components/sections/music"
import Projects from "@/components/sections/projects"
import Resume from "@/components/sections/resume"
import Skills from "@/components/sections/skills"
import WorkExperienceRedesigned from "@/components/sections/work-experience-redesigned"



export default async function Home() {

  return (
    <div className="w-full px-4 sm:w-5/6 mx-auto md:container grid gap-16 md:gap-24 relative z-10 pt-16 pb-24">
      <Suspense fallback={<Loading />}>
        <div className="animate-fade-in">
          <Header />
        </div>

        <div className="animate-fade-in [animation-delay:200ms]">
          <AboutMe />
        </div>

        <div className="animate-fade-in [animation-delay:300ms]">
          <WorkExperienceRedesigned />
        </div>

        <div className="animate-fade-in [animation-delay:400ms]">
          <EducationRedesigned />
        </div>

        <div className="animate-fade-in [animation-delay:500ms]">
          <Skills />
        </div>

        <div className="animate-fade-in [animation-delay:600ms]">
          <Projects />
        </div>

        {/* <Blog articles={articles} /> */}

        <div className="animate-fade-in [animation-delay:700ms]">
          <Languages />
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* <Achievements /> */}
          {/* <Certifications /> */}
          {/* <Philantrophy /> */}
        </div>

        {/* <Photography instagramMedia={instagramMedia} /> */}

        <div className="animate-fade-in [animation-delay:800ms]">
          <Music />
        </div>

        {/* <Designs dribbbleShots={dribbbleShots} /> */}

        <div className="animate-fade-in [animation-delay:900ms]">
          <Resume />
        </div>

        <div className="animate-fade-in [animation-delay:1000ms]">
          <Contact />
        </div>

        <div className="animate-fade-in [animation-delay:1100ms]">
          <AboutRotW />
        </div>

        <div className="animate-fade-in [animation-delay:1200ms]">
          <Footer />
        </div>
      </Suspense>
    </div>
  )
}

