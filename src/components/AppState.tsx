import { useRef, useCallback, useEffect, useState } from "react";
import { ApiResponse, SearchOptions } from "../utils/types";
import { useDebounce } from "../utils/hooks";
import JobList from "./JobList";
import SearchBar from "./Searchbar";

// Component to manage state of the app
const AppState = () => {
  const [jobs, setJobs] = useState<ApiResponse["data"]>([]);
  const [meta, setMeta] = useState<ApiResponse["meta"]>({});
  const [searchOptions, setSearchOptions] = useState<SearchOptions>({});

  // Debounce the user input for search, to reduce api calls
  const debouncedSearchOptions = useDebounce<SearchOptions>(searchOptions);

  // TODO: move data fetching logic to SWR
  // Data fetching logic
  const fetchJobs = useCallback(
    async ({ page, title, company }: SearchOptions & { page?: number }) => {
      const params = new URLSearchParams();
      let url: string;

      if (title) params.append("title", title);
      if (page) params.append("page", page.toString());
      if (company) params.append("company", company);

      // TODO: check if object is empty or deep equal to {}
      if (params.toString()) url = `/api/jobs?${params.toString()}`;
      else url = "/api/jobs";

      const body = await fetch(url);

      const json = await body.json();

      // If scrolling to another page, concat the data instead of replacing it
      if (page) {
        setJobs((prev) => prev.concat(json.data.data));
      } else {
        setJobs(json.data.data);
      }
      setMeta(json.data.meta);
    },
    [setJobs, setMeta],
  );

  // Ref for intersection observer div
  const observerRef = useRef<HTMLDivElement>(null);

  // Callback function for intersection observer
  const handleObserver = useCallback<IntersectionObserverCallback>(
    async (entries) => {
      const [target] = entries;
      if (
        target.isIntersecting &&
        meta.currentPage &&
        meta.totalPages &&
        meta.currentPage < meta.totalPages
      ) {
        // TODO: move data fetching to SWR
        // const res = await fetch(`/api/jobs?page=${meta.currentPage + 1}`);
        // const body = await res.json();

        // setJobs((prev) => prev.concat(body.data));
        // setMeta(body.meta);
        await fetchJobs({
          ...debouncedSearchOptions,
          page: meta.currentPage + 1,
        });
      }
    },
    [debouncedSearchOptions, fetchJobs, meta?.currentPage, meta?.totalPages],
  );

  // Setup intersection observer
  useEffect(() => {
    const el = observerRef.current;
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0,
    });

    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, [handleObserver]);

  // Handle search logic whenever searchOptions changes
  useEffect(() => {
    fetchJobs({ ...debouncedSearchOptions });
  }, [debouncedSearchOptions, fetchJobs]);

  return (
    <div className="max-w-5xl mx-auto my-0">
      <SearchBar
        searchOptions={searchOptions}
        setSearchOptions={setSearchOptions}
      />
      {jobs && jobs.length > 0 && <JobList jobs={jobs} />}
      {jobs && jobs.length > 0 && <div id="observer" ref={observerRef}></div>}
      {!jobs && <h3>No Jobs Found</h3>}
    </div>
  );
};

export default AppState;
