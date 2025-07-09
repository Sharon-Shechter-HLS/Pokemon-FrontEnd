import { useState } from "react";
import { Filter } from "../ui/filter";
import type { Pokemon } from "../../typs/Pokemon";
import { PokemonLogo } from "../PokemonLogo/PokemonLogo";


type ArenaHeaderProps = {
  headline: string;
  description: string;
  className?: string;
  filterTitle: string;
  filterOptions: Pokemon[];
  onPokemonChange: (pokemon: Pokemon) => void;
};

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

export const ArenaHeader = ({
  headline,
  description,
  className = "",
  filterTitle,
  filterOptions,
  onPokemonChange,
}: ArenaHeaderProps) => {
  const [hasChanged, setHasChanged] = useState(false);

  const handleFilterChange = (value: string | null) => {
    if (hasChanged || !value) return;

    const selectedPokemon = filterOptions.find(
      (pokemon) => pokemon.id === Number(value)
    );
    if (selectedPokemon) {
      onPokemonChange(selectedPokemon);
      setHasChanged(true);
    }
  };

  const filterOptionsFormatted = filterOptions.map((pokemon) => ({
    label: (
      <div className="flex items-center justify-between w-full min-w-[256px]">
        <div className="flex items-center gap-3">
          <PokemonLogo size={36} imgSrc={pokemon.image?.thumbnail} />
          <div className="flex flex-col">
            <span className="font-medium text-base leading-tight">
              {typeof pokemon.name === "string"
                ? pokemon.name
                : pokemon.name.english}
            </span>
            <span className="text-xs text-blue-700">
              Speed: {pokemon.base?.Speed ?? 0}
            </span>
          </div>
        </div>
        <span className="font-semibold text-base">
          Pwr. {pokemon.base?.Attack ?? 0}
        </span>
      </div>
    ),
    value: pokemon.id.toString(),
  }));

  return (
    <div className={`arena-header mt-8 ${className}`}>
      <Headline className="text-5xl font-bold mb-4">{headline}</Headline>
      <p className="text-xl text-gray-600">{description}</p>

      <div className="flex items-start">
        <div className={hasChanged ? "opacity-50 pointer-events-none" : ""}>
          <Filter
            options={filterOptionsFormatted}
            value={null}
            onChange={handleFilterChange}
            label={filterTitle}
          />
        </div>
      </div>
    </div>
  );
};

export default ArenaHeader;