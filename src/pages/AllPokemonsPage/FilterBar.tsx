import Input from "../../components/Input /Input";
import Filter from "../../components/filter/filter";

type FilterBarProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortOption: string | undefined;
  onSortChange: (option: string | undefined) => void;
  className?: string;
};

export default function FilterBar({
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-row justify-between items-center p-2 ">
    
        <Input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search Pokémon"
        />
    

    
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
  );
}
