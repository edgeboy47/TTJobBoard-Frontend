import type { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import type { Job } from "../components/JobCard";
import JobList from "../components/JobList";

type ApiResponse = {
  data: Job[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
};

const Home: NextPage<ApiResponse> = ({ data }) => {
  // TODO: add pagination/infinite scroll
  return (
    <div className="max-w-5xl mx-auto my-0">
      {data.length > 0 && <JobList initialJobs={data} />}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<ApiResponse> = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL!, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });

  const json = await response.json();

  return {
    props: {
      data: json.data,
      meta: json.meta,
    },
  };
};

export default Home;
