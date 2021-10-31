import * as React from "react";
import { WorkExpData } from "../../utils/Constants";
import styles from "./WorkExperience.module.scss";

const WorkExperience = () => {
  console.log("WorkExpData - ", WorkExpData);
  return (
    <div className={styles.workExperience}>
      <h2>My Work Experience.</h2>
      <div className={styles.timelineContainer}>
        <div
          className={styles.timelineBar}
          data-aos="zoom-in-down"
          data-aos-delay="100"
          data-aos-duration="300"
        ></div>
        <div className={styles.timelineItems}>
          {WorkExpData.map((workItem, i) => (
            <div
              className={styles.timelineItem}
              data-aos="zoom-in"
              data-aos-delay="100"
              data-aos-duration="300"
              key={i}
            >
              <strong>{workItem.title}</strong>
              <p>{workItem.shortDescription}</p>
              <div className={styles.timelineTtemDetails}>
                <span>
                  <i>{workItem.timePeriod}</i>
                </span>
                <span>
                  <i>{workItem.location}</i>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkExperience;
