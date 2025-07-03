import Headline from "./Headline"; // Import your existing Headline component
import Input from "../../components/Input /Input"; // Import your existing Input component
import Filter from "../../components/filter/filter"; 

type FilterBarProps = {
  title: React.ReactNode; // Add title for the toolbar
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortOption: string | undefined;
  onSortChange: (option: string | undefined) => void;
  className?: string;
};

export default function FilterBar({
  title,
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
  className = "",
}: FilterBarProps) {
  return (
    <div className={`w-full mb-4 ${className}`}>
      {/* Headline */}
      <Headline className="text-2xl mb-4">{title}</Headline>

      {/* Toolbar */}
      <div className="flex items-center justify-between bg-transparent rounded-md">
        {/* Search Input */}
        <Input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search Pokémon"
          className="w-max" // Adjust width and spacing
        />

        {/* Filter Dropdown */}
        <Filter
          value={sortOption}
          onChange={onSortChange}
          options={[
            { label: "ID", value: "id" },
            { label: "Name", value: "name" },
            { label: "HP", value: "hp" },
            { label: "Attack", value: "attack" },
          ]}
          getKey={(value) => value}
          placeholder="Sort by"
        />
      </div>
    </div>
  );
}
