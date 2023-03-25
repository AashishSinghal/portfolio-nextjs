import { css } from "@emotion/css";
import clsx from "clsx";
import Image from "next/image";

const photos: string[] = [
  "/images/photo-wall/photo-wall-01.jpg",
  "/images/photo-wall/photo-wall-02.jpg",
  "/images/photo-wall/photo-wall-03.jpg",
  "/images/photo-wall/photo-wall-04.jpg",
  "/images/photo-wall/photo-wall-05.jpg",
];

type Props = {
  size?: number;
};

const PhotoWall: React.FC<Props> = ({ size = 512 }) => {
  return (
    <div className="flex gap-1" style={{ width: size, height: size }}>
      {photos.map((photo, index) => (
        <div
          key={photo}
          style={{ animationDelay: `${index * 0.5 + 0.5}s` }}
          className={clsx(
            "relative transition-[width]",
            "animate__animated animate__fadeInDown",
            css`
              width: ${size / 4}px;
              height: ${size}px;
              &:hover {
                width: ${size / 2}px;
              }
            `
          )}
        >
          <Image
            priority
            src={photo}
            fill
            style={{ objectFit: "cover" }}
            className={clsx({ "rounded-l": index === 0, "rounded-r": index === photos.length - 1 })}
            alt="Aashish Singhal"
          />
        </div>
      ))}
    </div>
  );
};

export default PhotoWall;
