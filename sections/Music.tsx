import Button from "components/Button";
import Image from "next/image";
import { FaSpotify } from "react-icons/fa";
import { Section } from "types/Sections";
import { getSectionHeading, openURLInNewTab } from "utils";

const Music = () => (
  <div id={Section.Music}>
    {getSectionHeading(Section.Music)}

    <div className="grid md:grid-cols-3 gap-12">
      <div className="max-w-full prose prose-sm md:prose-base prose-neutral dark:prose-invert">
        <p>
          If you&apos;ve read about my profile so far and you found it interesting, studies show that knowing what type
          of music a person listens to would say a lot about them. A fare warning my playlist is as diverse as it can be.
        </p>

        <p>
          Also, I&apos;ve been known for my good taste in music and I&apos;ve always wanted to share the latest and
          greatest hits through an easy medium, so here&apos;s a Spotify Playlist I&apos;ve created:
          A dynamic playlist of what&apos;s on my daily roster of music.
        </p>

        <p className="font-bold">You can also scan the spotify code for <br/> the playlist using the spotify app!</p>

        <div
          className="flex flex-col gap-2 w-[210px] h-[260px] relative"
          >
          <Image src="/images/music/spotify.png" fill style={{objectFit: "cover", margin: 0}} alt="spotify scan code" />
        </div>

        <Button
          icon={FaSpotify}
          className="mt-8 text-sm"
          onClick={() => openURLInNewTab("https://open.spotify.com/playlist/60PFTTXPaygaH9H2QitCbv")}
        >
          Listen to My Playlist on Spotify
        </Button>
      </div>

      <iframe
        src="https://open.spotify.com/embed/playlist/60PFTTXPaygaH9H2QitCbv"
        width="100%"
        height="675"
        allow="encrypted-media"
        className="md:block rounded col-span-2"
      />
    </div>
  </div>
);

export default Music;
