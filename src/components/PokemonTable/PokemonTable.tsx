import DataTable from "@/components/Table/Table"
import DescriptionTooltip from "@/components/ToolTip/ToolTip"
import pokadexIcon from "@/assets/pokadex.png"
import type { Pokemon } from "@/typs/Pokemon"

type PokemonTableProps = {
  pokemons: Pokemon[]
  onRowClick?: (pokemon: Pokemon) => void
}

export default function PokemonTable({ pokemons, onRowClick }: PokemonTableProps) {
  const columns = [
    {
      header: "Pokémon Name",
      width: "w-[300px]",
      className: "flex items-center gap-3",
      render: (pokemon: Pokemon) => (
        <>
          <div className="w-[54px] h-[54px] rounded-full bg-primary-50 flex items-center justify-center">
            <img
              src={pokemon.image.thumbnail}
              alt={pokemon.name.english}
              className="w-[32px] h-[32px] object-contain"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base font-medium">{pokemon.name.english}</span>
            {pokemon.isMyPokemon && (
              <img
                src={pokadexIcon}
                alt="Pokédex Icon"
                width={24}
                height={24}
                className="object-contain"
              />
            )}
          </div>
        </>
      ),
    },
    {
      header: "ID",
      width: "w-[100px]",
      render: (pokemon: Pokemon) => `#${pokemon.id.toString().padStart(3, "0")}`,
    },
    {
      header: "Description",
      width: "w-[450px]",
      render: (pokemon: Pokemon) => (
        <DescriptionTooltip content={pokemon.description}>
          <p className="text-sm text-muted-foreground truncate max-w-[420px] cursor-help">
            {pokemon.description}
          </p>
        </DescriptionTooltip>
      ),
    },
    {
      header: "Power level",
      width: "w-[120px]",
      render: (pokemon: Pokemon) => `Power level ${pokemon.base.Attack}`,
    },
    {
      header: "HP level",
      width: "w-[120px]",
      render: (pokemon: Pokemon) => `${pokemon.base.HP} HP`,
    },
  ]

  return (
    <DataTable
      data={pokemons}
      columns={columns}
      onRowClick={onRowClick}
      rowKey={(pokemon) => pokemon.id}
      rowsPerPageOptions={[5, 10, 20]}
      enablePagination={true}
    />
  )
}