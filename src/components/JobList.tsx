import { Job } from "../utils/types";
import JobCard from "./JobCard";

type Props = {
  jobs: Job[];
};

const JobList = ({ jobs }: Props) => {
  return (
    <>
      {jobs.map((job) => (
        <JobCard key={job.url} {...job} />
      ))}
    </>
  );
};

export default JobList;
