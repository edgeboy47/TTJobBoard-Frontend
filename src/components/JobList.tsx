import { useState } from "react";
import JobCard, { Job } from "./JobCard";

type Props = {
  initialJobs: Job[];
};
const JobList = ({ initialJobs }: Props) => {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);

  return (
    <div>
      {jobs.map((job) => (
        <JobCard key={job.url} {...job} />
      ))}
    </div>
  );
};

export default JobList;
