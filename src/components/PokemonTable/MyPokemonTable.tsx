<<<<<<< HEAD:src/components/PokemonTable/MyPokemonTable.tsx
import { useMyPokemons } from "@/hooks/useMyPokemons"
=======
import { useState } from "react"
import DescriptionTooltip from "@/components/ToolTip/ToolTip"
>>>>>>> c1e8e4c67083bb5541b02e04874fa8ab791166c7:src/components/PokemonTable/PokemonTable.tsx
import DataTable from "@/components/Table/Table"
import type { Pokemon } from "@/typs/Pokemon"
<<<<<<< HEAD:src/components/PokemonTable/MyPokemonTable.tsx
import type { Column } from "@/typs/Column"
import pokadexIcon from "@/assets/pokadex.png"
=======
>>>>>>> c1e8e4c67083bb5541b02e04874fa8ab791166c7:src/components/PokemonTable/PokemonTable.tsx

type Props = {
  pokemons: Pokemon[]
  onRowClick?: (pokemon: Pokemon) => void
}

export default function MyPokemonTable({ pokemons, onRowClick }: Props) {
  const { myPokemonIds } = useMyPokemons()

  // Filter only "my" Pokémon
  const myPokemons = pokemons.filter((p) => myPokemonIds.includes(p.id))

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
          <div className="flex items-center gap-2">
            <span className="text-base font-medium">{p.name.english}</span>
            <img
              src={pokadexIcon}
              alt="Pokédex Icon"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
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
        <DescriptionTooltip content={p.description}>
          <p className="text-sm text-muted-foreground truncate max-w-[420px] cursor-help">
            {p.description}
          </p>
        </DescriptionTooltip>
      ),
    },
    {
      header: "Power level",
      width: "w-[120px]",
<<<<<<< HEAD:src/components/PokemonTable/MyPokemonTable.tsx
      render: (p) => "Power level " + p.base.Attack,
=======
      render: (p) =>
        `${p.base.Attack + p.base["Sp. Attack"] + p.base.Speed}`,
>>>>>>> c1e8e4c67083bb5541b02e04874fa8ab791166c7:src/components/PokemonTable/PokemonTable.tsx
    },
    {
      header: "HP level",
      width: "w-[120px]",
      render: (p) => `${p.base.HP} HP`,
    },
  ]

  return (
    <DataTable
      data={myPokemons}
      columns={columns}
      onRowClick={onRowClick}
      rowKey={(p) => p.id}
      rowsPerPageOptions={[5, 10, 20]}
    />
  )
}
