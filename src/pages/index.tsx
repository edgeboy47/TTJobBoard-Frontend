import type { NextPage } from "next";
import { isLocalURL } from "next/dist/shared/lib/router/router";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import type { Job } from "../components/JobCard";

const Home: NextPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(process.env.NEXT_PUBLIC_API_URL!, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        }
      })
      .then((json) => {
        setJobs(json);
        setIsLoading(false);
      });
    // .catch((e) => setError(e));
  }, []);

  return (
    <div>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>Error: {error}</h1>}
      {jobs.length > 0 && (
        <div>
          {jobs.map((job) => (
            <JobCard key={job.url} {...job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
