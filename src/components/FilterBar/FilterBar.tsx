import * as React from "react";
import { InputSearch } from "../input/InputSearch";
import { Filter } from "../ui/filter";
import Headline from "../HeadLine/HeadLine";

type FilterToolbarProps = {
  title: React.ReactNode;
  searchValue: string;
  onSearchChange: (value: string) => void;
  filterValue: string | null;
  onFilterChange: (value: string | null) => void;
  className?: string;
};

export const PageToolbar = ({
  title,
  searchValue,
  onSearchChange,
  filterValue,
  onFilterChange,
}: FilterToolbarProps) => {
  const filterLabel = "Sort By";
  const filterOptions = [
    { label: "Name (A-Z)", value: "name-asc" },
    { label: "Name (Z-A)", value: "name-desc" },
    { label: "Power (High-Low)", value: "power-desc" },
    { label: "Power (Low-High)", value: "power-asc" },
    { label: "HP (High-Low)", value: "hp-desc" },
    { label: "HP (Low-High)", value: "hp-asc" },
  ];

  return (
    <div className="w-full mb-4 ">
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
};

export default PageToolbar;