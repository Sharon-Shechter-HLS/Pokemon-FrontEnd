import { useMemo } from "react";
import { Filter } from "../ui/filter";
import type { Pokemon } from "../../typs/Pokemon";
import { PokemonLogo } from "../PokemonLogo/PokemonLogo";
import DescriptionTooltip from "../ToolTip/ToolTip";
import { useBattleContext } from "./BattleContext";

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
    className={`font-mulish font-bold text-3xl tracking-wide text-gray-900 ${className}`}
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
  hasSwitch,
  selectedPokemonName,
}: ArenaHeaderProps & { hasSwitch: boolean; selectedPokemonName?: string }) => {
  const { battleData } = useBattleContext();

  const handleFilterChange = (value: string | null) => {
    if (hasSwitch || !value) return;

    const selectedPokemon = filterOptions.find(
      (pokemon) => pokemon.id === Number(value)
    );
    if (selectedPokemon) {
      onPokemonChange(selectedPokemon);
    }
  };

  const filterOptionsFormatted = useMemo(
    () => [
      {
        label: (
          <div className="text-gray-600 text-sm font-medium px-4 py-2 bg-primary-50 pointer-events-none">
            Pokémon’s can be switched <span className="font-bold">once</span> in battle.
          </div>
        ),
        value: "info-row", 
      },
      ...filterOptions
        .filter((pokemon) => pokemon._id !== battleData.user._id) 
        .map((pokemon) => ({
          label: (
            <div className="flex items-center justify-between w-full min-w-[256px] px-4 py-2">
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
        })),
    ],
    [filterOptions, battleData.user._id]
  );

  return (
    <div className={`arena-header mt-4 text-center ${className}`}>
      <Headline className="mb-2">{headline}</Headline>
      <p className="text-lg text-gray-600">{description}</p>

      <div className="flex items-center px-4">
        {hasSwitch ? (
          <DescriptionTooltip content="You have already switched a Pokémon in this battle.">
            <div className="mr-4 mb-3 relative">
              <Filter
                options={filterOptionsFormatted}
                value={null}
                onChange={() => {}}
                label={selectedPokemonName || filterTitle}
                className="opacity-50 cursor-not-allowed"
                disabled
              />
            </div>
          </DescriptionTooltip>
        ) : (
          <div className="mr-4 mb-3">
            <Filter
              options={filterOptionsFormatted}
              value={null}
              onChange={(value) => {
                if (value !== "info-row") {
                  handleFilterChange(value);
                }
              }}
              label={filterTitle}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ArenaHeader;