import Tippy from "@tippyjs/react";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { MdMoreHoriz } from "react-icons/md";
import { Section } from "types/Sections";
import { getSectionHeading } from "utils";

const DISPLAY_COUNT = 4;

type WorkExperience = {
  id: number;
  logo: string;
  name: string;
  period: { start: string; end: string };
  position: string;
  location: string;
  summary: string;
  keyFocus: string[];
};

const workExperiences: WorkExperience[] = [
  {
    id: 1,
    logo: "/images/work-experience/nutanix.png",
    name: "Nutanix Technologies Pvt. Ltd.",
    period: { start: "Jan 22", end: "Present" },
    position: "Full-Stack Developer (Contract)",
    location: "Bangalore, Karnataka, India (Hybrid)",
    summary: "",
    keyFocus: ["React", "NodeJs", "GraphQL (Apollo)", "JAVA Sprint Boot", "Building Reusable Components", "Building Features and Cosuming APIs",],
  },
  {
    id: 2,
    logo: "/images/work-experience/celebal.png",
    name: "Celebal Technologies Pvt. Ltd.",
    period: { start: "Jan 2021", end: "Dec 2021" },
    position: "Associate Full-Stack Developer",
    location: "Jaipur, Rajasthan, India (Hybrid)",
    summary:
      "As part of the Web Development team, i used to create Full stack application using MERN stack with Typescript and develop business applications for MS Teams. I used to mentor interns and create a learning regime for them to follow. used to conduct interview for React interns.",
    keyFocus: ["React", "JS & TS", "NodeJs", "Mentoring", "MS Teams UI Library"],
  },
  {
    id: 3,
    logo: "/images/work-experience/sfity.png",
    name: "SFITY INDIA LLP",
    period: { start: "Dec 2020", end: "Jan 2021" },
    position: "ReactJS Developer (Intern)",
    location: "Jaipur, Rajasthan, India (Remote)",
    summary:
      "As part of the development team, i was charged with developing the web pages based on the provided UI designs and incorporate animations, also design some views based on the client requirements",
    keyFocus: [
      "React",
      "NextJS",
      "JavaScript",
      "HTML & CSS",
      "AOS Library",
    ],
  },
  {
    id: 4,
    logo: "/images/work-experience/innofarms.png",
    name: "Innofarms, SNL Innovations Pvt. Ltd.",
    period: { start: "May 2020", end: "July 2020" },
    position: "Front-End Developer & UI Designer (Intern)",
    location: "Jaipur, Rajasthan, India (Remote)",
    summary:
      "At Innofarms, I worked on the UI/UX of the hybrid application that we were developing for their machine, using the UI/UX implemented the application using angular and used Cordova to create a hybrid Mobile application.",
    keyFocus: [
      "Angular",
      "Javascript",
      "HTML & CSS",
      "Cordova",
      "Adobe XD",
    ],
  },
];

type Props = {
  data: WorkExperience;
  isFirst: boolean;
  isLast: boolean;
};

const WorkExperience: React.FC<Props> = ({ data, isFirst, isLast }) => (
  <div className="flex group">
    <div className={clsx("ml-1 w-1 flex-shrink-0 bg-neutral-500/25", { "rounded-t": isFirst, "rounded-b": isLast })} />

    <div className="-ml-2 mt-8 flex-shrink-0 relative w-3 h-3 rounded-full shadow-lg bg-teal-500/80 dark:bg-white/80 group-hover:w-6 transition-[width]" />

    <div className="mt-5 ml-8 grid gap-2 pb-2">
      <div className="relative w-[100px] h-[40px]">
        <Image src={data.logo} fill style={{ objectFit: "contain" }} alt={data.name} />
      </div>

      <div>
        <h3>
          <span className="text-base font-bold">{data.name}</span>{" "}
          <span className="text-xs">
            ({data.period.start} - {data.period.end})
          </span>
        </h3>
        <h4>{data.position}</h4>
      </div>

      <h5 className="my-1 flex gap-2 items-center text-xs">
        <FaLocationArrow />
        <span>{data.location}</span>
      </h5>

      <p className="prose prose-sm prose-neutral dark:prose-invert">{data.summary}</p>

      <p className="text-xs leading-relaxed prose-sm prose-neutral dark:prose-invert">
        <strong>Key Focus:</strong> {data.keyFocus.join(", ")}
      </p>
    </div>
  </div>
);

const WorkExperienceTimeline = () => {
  const [showMore, setShowMore] = useState(workExperiences.length > DISPLAY_COUNT ? false : true);

  return (
    <div id={Section.WorkExperience}>
      {getSectionHeading(Section.WorkExperience)}

      <div className="flex flex-col">
        {workExperiences
          .filter((_, index) => (showMore ? true : index < DISPLAY_COUNT))
          .map((data, index) => (
            <WorkExperience key={data.id} data={data} isFirst={index === 0} isLast={index === 2} />
          ))}
      </div>

      {!showMore && (
        <Tippy content={`Show ${workExperiences.length - DISPLAY_COUNT} More`} placement="right">
          <div className="inline-block ml-8 p-2 cursor-pointer" onClick={() => setShowMore(true)}>
            <MdMoreHoriz size="24" />
          </div>
        </Tippy>
      )}
    </div>
  );
};

export default WorkExperienceTimeline;
