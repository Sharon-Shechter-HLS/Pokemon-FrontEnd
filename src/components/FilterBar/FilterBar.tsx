import * as React from "react";
import { InputSearch } from "../input/InputSearch";
import { Filter } from "../ui/filter";

type HeadlineProps = {
  children: React.ReactNode;
  className?: string;
};

const Headline = ({ children, className = "" }: HeadlineProps) => (
  <h1
    className={`font-mulish font-medium leading-[34px] tracking-[0px] text-gray-900 ${className}`}
  >
    {children}
  </h1>
);

type FilterToolbarProps = {
  title: React.ReactNode;
  searchValue: string;
  onSearchChange: (value: string) => void;
  filterOptions: Array<{ label: string; value: string }>; 
  filterValue: string | null;
  onFilterChange: (value: string | null) => void;
  filterLabel?: string;
  className?: string;
};

export const FilterBar = ({
  title,
  searchValue,
  onSearchChange,
  filterOptions, 
  filterValue,
  onFilterChange,
  filterLabel = "Filter",
  className = "",
}: FilterToolbarProps) => (
  <div className={`w-full mb-4 ${className}`}>
    <Headline className="text-2xl mb-4">{title}</Headline>
    <div className="flex items-center justify-between bg-transparent rounded-md">
      <InputSearch
        placeholder="Search Pokemon"
        value={searchValue}
        onChange={onSearchChange}
        size="md"
      />
      <Filter
        options={filterOptions} 
        value={filterValue}
        onChange={onFilterChange}
        label={filterLabel}
      />
    </div>
  </div>
);

export default FilterBar;