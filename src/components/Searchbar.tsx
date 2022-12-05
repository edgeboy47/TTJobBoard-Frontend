import { useState } from "react";
import { SearchOptions } from "./AppState";

type SearchProps = {
  searchOptions: SearchOptions;
  setSearchOptions: React.Dispatch<React.SetStateAction<SearchOptions>>;
};

// Component that allows user to update the state used for search
const SearchBar = ({ searchOptions, setSearchOptions }: SearchProps) => {
  const { title, company } = searchOptions;
  return (
    <div className="my-6">
      <label htmlFor="title">Title</label>
      <input
        className="mx-3 px-2 py-1 rounded outline-none shadow"
        type="text"
        name="title"
        id="title"
        placeholder="Title"
        value={title ?? ""}
        onChange={(e) =>
          setSearchOptions((prevOptions) => ({
            ...prevOptions,
            title: e.target.value,
          }))
        }
      />
      <label htmlFor="company">Company</label>
      <input
        className="mx-3 px-2 py-1 rounded outline-none shadow"
        type="text"
        name="company"
        id="company"
        placeholder="Company"
        value={company ?? ""}
        onChange={(e) =>
          setSearchOptions((prevOptions) => ({
            ...prevOptions,
            company: e.target.value,
          }))
        }
      />
    </div>
  );
};

export default SearchBar;
