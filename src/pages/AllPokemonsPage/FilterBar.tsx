import Input from "../../components/Input /Input"
import Filter from "../../components/filter/filter"

type FilterBarProps = {
  searchQuery: string
  onSearchChange: (query: string) => void
  sortOption: string | undefined
  onSortChange: (option: string | undefined) => void
  className?: string
  marginRight?: string
}

export default function FilterBar({
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
  className = "flex items-center justify-start gap-8",
  marginRight = "mr-225",
}: FilterBarProps) {
  return (
<div className ={className}>
      <div className = {marginRight}>
        <Input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search Pokémon"
        />
      </div>

        <div>
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
  )
}