import { useCallback, useEffect, useRef, useState } from "react";
import JobCard, { Job } from "./JobCard";

type Props = {
  initialJobs: Job[];
  initialMeta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
};

const JobList = ({ initialJobs, initialMeta }: Props) => {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [meta, setMeta] = useState<{
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }>(initialMeta);

  const observerRef = useRef<HTMLDivElement>(null);

  // Callback function for intersection observer
  const handleObserver = useCallback<IntersectionObserverCallback>(
    async (entries) => {
      const [target] = entries;
      if (target.isIntersecting && meta.currentPage < meta.totalPages) {
        const res = await fetch(`/api/jobs?page=${meta.currentPage + 1}`);
        const body = await res.json();

        setJobs((prev) => prev.concat(body.data));
        setMeta(body.meta);
      }
    },
    [meta.currentPage, meta.totalPages, setJobs, setMeta]
  );

  // Setup intersection observer
  useEffect(() => {
    const el = observerRef.current!;
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0,
    });

    observer.observe(el);

    return () => observer.disconnect();
  }, [handleObserver]);

  return (
    <>
      {jobs.map((job) => (
        <JobCard key={job.url} {...job} />
      ))}
      <div id="observer" ref={observerRef}></div>
    </>
  );
};

export default JobList;
