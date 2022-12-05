import { useRef, useCallback, useEffect, useState } from "react";
import { ApiResponse } from "../pages";
import JobList from "./JobList";
import SearchBar from "./Searchbar";

export type SearchOptions = {
  title?: string;
  company?: string;
};

// Component to manage state of the app
const AppState = ({ data: initialJobs, meta: initialMeta }: ApiResponse) => {
  const [jobs, setJobs] = useState<ApiResponse["data"]>(initialJobs);
  const [meta, setMeta] = useState<ApiResponse["meta"]>(initialMeta);
  const [searchOptions, setSearchOptions] = useState<SearchOptions>({});

  // Ref for intersection observer div
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
    <div className="max-w-5xl mx-auto my-0">
      <SearchBar
        searchOptions={searchOptions}
        setSearchOptions={setSearchOptions}
      />
      {jobs.length > 0 && <JobList jobs={jobs} />}
      {jobs.length > 0 && <div id="observer" ref={observerRef}></div>}
    </div>
  );
};

export default AppState;
