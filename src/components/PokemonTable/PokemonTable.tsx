import { DataTable } from "@/components/Table/DataTable"
import DescriptionTooltip from "@/components/ToolTip/ToolTip"
import pokadexIcon from "@/assets/pokadex.png"
import PokemonLogo from "@/components/PokemonLogo/PokemonLogo"
import type { Pokemon } from "@/typs/Pokemon"

type PokemonTableProps = {
  pokemons: Pokemon[]
  page: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  loading?: boolean
  onRowClick?: (pokemon: Pokemon) => void // Add this prop
}

export default function PokemonTable({
  pokemons,
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  loading = false,
}: PokemonTableProps) {
  const columns = [
    {
      header: "Pokémon Name",
      width: "w-[300px]",
      className: "flex items-center gap-3",
      render: (pokemon: Pokemon) => (
        <>
          <PokemonLogo size={54} imgSrc={pokemon.image.thumbnail} />
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
      width: "w-30% max-w-[520px]",
      render: (pokemon: Pokemon) => (
        <DescriptionTooltip content={pokemon.description}>
          <p className="text-sm truncate max-w-[520px] cursor-help">
            {pokemon.description}
          </p>
        </DescriptionTooltip>
      ),
    },
    {
      header: "Power Level",
      width: "w-30% max-w-[200px]",
      render: (pokemon: Pokemon) => `Power level ${pokemon.base.Attack}`,
    },
    {
      header: "HP Level",
      width: "w-[120px]",
      render: (pokemon: Pokemon) => `${pokemon.base.HP} HP`,
    },
  ]

  return (
    <DataTable
      columns={columns}
      rows={pokemons}
      page={page}
      pageSize={pageSize}
      total={total}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      rowsPerPageOptions={[5, 10, 20, 30]}
      loading={loading}
    />
  )
}