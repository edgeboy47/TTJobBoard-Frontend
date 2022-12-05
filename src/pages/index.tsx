import type { GetServerSideProps, NextPage } from "next";
import AppState from "../components/AppState";
import type { Job } from "../components/JobCard";

export type ApiResponse = {
  data: Job[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
};

const Home: NextPage<ApiResponse> = (initialData) => {
  return <AppState {...initialData} />;
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
