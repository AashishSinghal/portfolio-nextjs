import * as React from "react";
import styles from "./WorkExperience.module.scss";

const WorkExperience = () => {
  return (
    <div className={styles.workExperience}>
      <h2>My Work Experience.</h2>
      <div className={styles.timelineContainer}>
        <div className={styles.timelineBar} data-aos="zoom-in" data-aos-delay="100" data-aos-duration="300" ></div>
        <div className={styles.timelineItems}>
          <div className={styles.timelineItem} data-aos="zoom-in" data-aos-delay="100" data-aos-duration="300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quidem
            deleniti vitae, doloremque minus quia eum. Expedita, laborum sunt
            corrupti ex asperiores magnam animi quam.
          </div>
          <div className={styles.timelineItem} data-aos="zoom-in" data-aos-delay="100" data-aos-duration="300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quidem
            deleniti vitae, doloremque minus quia eum. Expedita, laborum sunt
            corrupti ex asperiores magnam animi quam.
          </div>
          <div className={styles.timelineItem} data-aos="zoom-in" data-aos-delay="100" data-aos-duration="300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quidem
            deleniti vitae, doloremque minus quia eum. Expedita, laborum sunt
            corrupti ex asperiores magnam animi quam.
          </div>
          <div className={styles.timelineItem} data-aos="zoom-in" data-aos-delay="100" data-aos-duration="300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quidem
            deleniti vitae, doloremque minus quia eum. Expedita, laborum sunt
            corrupti ex asperiores magnam animi quam.
          </div>
          <div className={styles.timelineItem} data-aos="zoom-in" data-aos-delay="100" data-aos-duration="300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quidem
            deleniti vitae, doloremque minus quia eum. Expedita, laborum sunt
            corrupti ex asperiores magnam animi quam.
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkExperience;
