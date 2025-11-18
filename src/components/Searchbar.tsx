import React from 'react'
import { SearchOptions } from "../utils/types";
import { Label } from './ui/label';
import { Input } from './ui/input';
import { SearchIcon } from 'lucide-react';

type SearchProps = {
  searchOptions: SearchOptions;
  setSearchOptions: React.Dispatch<React.SetStateAction<SearchOptions>>;
};

// Component that allows user to update the state used for search
const SearchBar = ({ searchOptions, setSearchOptions }: SearchProps) => {
  const { title, company } = searchOptions;
  return (
    <div className="bg-white rounded-md p-8 shadow-md my-6 flex flex-wrap flex-col md:flex-row gap-6">
      <div className='flex flex-col gap-3 flex-1'>
        <Label htmlFor="title">Title</Label>
        <Input
          icon={<SearchIcon size={16} className='opacity-50' />}
          className="py-2 rounded-md outline-none shadow"
          type="text"
          name="title"
          id="title"
          placeholder="Job Title"
          value={title ?? ""}
          onChange={(e) =>
            setSearchOptions((prevOptions) => ({
              ...prevOptions,
              title: e.target.value,
            }))
          }
        />
      </div>
      <div className='flex flex-col gap-3 flex-1'>
        <Label htmlFor="company">Company</Label>
        <Input
          icon={<SearchIcon size={16} className='opacity-50' />}
          className="py-1 rounded-md outline-none shadow"
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
    </div>
  );
};

export default SearchBar;
