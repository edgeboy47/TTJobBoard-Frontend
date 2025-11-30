import React from 'react'
import { motion } from 'motion/react'
import { Job } from "../utils/types";
import JobCard from "./JobCard";

type Props = {
  jobs: Job[];
};

const JobList = ({ jobs }: Props) => {
  // TODO: add the staggerChildren prop when switching to regular pagination
  // it currently doesnt work with the infinite scroll
  const listItem = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  }

  return (
    <motion.div
    >
      {jobs.map((job) => {
        const key = `${job.url}-${job.title}`

        return (
          <motion.div
            key={key}
            variants={listItem}
            initial="hidden"
            animate="show"
          >

            <JobCard  {...job} />
          </motion.div>
        )
      })}
    </motion.div>
  );
};

export default JobList;
