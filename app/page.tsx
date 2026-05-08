"use client";
import { Suspense } from "react";
import AppState from "../src/components/AppState";

const Home = () => {
  return (
    <Suspense>
      <AppState />
    </Suspense>
  );
};

export default Home;
