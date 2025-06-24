import { useEffect, useState } from "react"
import type { Pokemon } from "./pokemonType"
import pokemonsData from "@/data/pokemons.json"

export function PokemonTable() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])

  useEffect(() => {
    setPokemons(pokemonsData)
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Pokémons</h1>
      <table className="w-full text-left border rounded-lg">
       <thead className="bg-[#d3dceb] text-sm text-left">
            <tr>
                <th className="w-[408px] h-[72px] pl-[16px] pr-[40px] pt-[16px] pb-[16px]">
                Pokemon name
                </th>
                <th className="w-[170px] h-[72px] pr-[40px] pt-[16px] pb-[16px]">
                ID
                </th>
                <th className="w-[544px] h-[72px] pr-[40px] pt-[16px] pb-[16px]">
                Description
                </th>
                <th className="w-[127px] h-[72px] pr-[16px] pt-[16px] pb-[16px]">
                Power level
                </th>
                <th className="w-[127px] h-[72px] pr-[16px] pt-[16px] pb-[16px]">
                HP level
                </th>
            </tr>
            </thead>
        <tbody>
          {pokemons.map((p) => (
            <tr key={p.id} className="border-t">
            {/* NAME */}
            <td className="w-[408px] h-[72px] flex items-center gap-[16px] px-[16px] pr-[40px] py-[16px]">
                <div className="w-[54px] h-[54px] rounded-full bg-[#c9d6ed] flex items-center justify-center">
                <img src={p.image.thumbnail} alt={p.name.english} className="w-[54px] h-[54px] object-contain" />
                </div>
                <span className="text-base font-medium">{p.name.english}</span>
            </td>

            {/* ID */}
            <td className="w-[170px] h-[72px] px-[16px] pr-[40px] py-[16px]">
                #{p.id.toString().padStart(3, "0")}
            </td>

            {/* DESCRIPTION */}
            <td className="w-[544px] h-[72px] px-[16px] pr-[40px] py-[16px]">
                <p className="text-sm text-muted-foreground line-clamp-2">
                {p.description}
                </p>
            </td>

            {/* POWER */}
            <td className="w-[127px] h-[72px] px-[16px] pr-[16px] py-[16px]">
                {p.base.Attack + p.base["Sp. Attack"] + p.base.Speed}
            </td>

            {/* HP */}
            <td className="w-[127px] h-[72px] px-[16px] pr-[16px] py-[16px]">
                {p.base.HP}
            </td>
            </tr>

          ))}
        </tbody>
      </table>
    </div>
  )
}
