import DataTable from "@/components/Table/Table"
import type { Column } from "@/typs/Column"
import type { Pokemon } from "@/typs/Pokemon"


type Props = {
  pokemons: Pokemon[]
  onRowClick?: (pokemon: Pokemon) => void
}

export default function PokemonTable({ pokemons, onRowClick }: Props) {
  const columns: Column<Pokemon>[] = [
    {
      header: "Pokémon Name",
      width: "w-[300px]",
      className: "flex items-center gap-3",
      render: (p) => (
        <>
          <div className="w-[54px] h-[54px] rounded-full bg-[#EBEFF6] flex items-center justify-center">
            <img
              src={p.image.thumbnail}
              alt={p.name.english}
              className="w-[32px] h-[32px] object-contain"
            />
          </div>
          <span className="text-base font-medium">{p.name.english}</span>
        </>
      ),
    },
    {
      header: "ID",
      width: "w-[100px]",
      render: (p) => `#${p.id.toString().padStart(3, "0")}`,
    },
    {
      header: "Description",
      width: "w-[450px]",
      render: (p) => (
        <p className="text-sm text-muted-foreground truncate max-w-[420px]">
          {p.description}
        </p>
      ),
    },
    {
      header: "Power level",
      width: "w-[120px]",
      render: (p) => p.base.Attack + p.base["Sp. Attack"] + p.base.Speed,
    },
    {
      header: "HP level",
      width: "w-[120px]",
      render: (p) => `${p.base.HP} HP`,
    },
  ]

  return (
    <DataTable
      data={pokemons}
      columns={columns}
      onRowClick={onRowClick}
      rowKey={(p) => p.id}
      rowsPerPageOptions={[5, 10, 20]}      />
  )
}
