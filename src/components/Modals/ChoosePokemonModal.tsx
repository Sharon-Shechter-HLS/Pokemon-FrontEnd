import { useState } from "react";
import type { Pokemon } from "../../typs/Pokemon";
import PokemonLogo from "../PokemonLogo/PokemonLogo";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { FaTimes } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Separator } from "../ui/seperator";
import { useMyPokemons } from "../../hooks/useMyPokemons";

type ChoosePokemonModalProps = {
  onSelect: (pokemon: Pokemon) => void;
  onClose: () => void;
};

const ChoosePokemonModal = ({ onSelect, onClose }: ChoosePokemonModalProps) => {
  const { pokemons, isLoading } = useMyPokemons({
    isMyPokemons: true, 
  });
  const [selected, setSelected] = useState<Pokemon | null>(null);

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <Card className="bg-white rounded-lg shadow-lg p-8 min-w-[350px] max-w-[90vw] relative">
        <button onClick={onClose} className="absolute top-4 right-4">
          <FaTimes
            size={24}
            className="cursor-pointer text-gray-500 hover:text-gray-800 transition-colors"
          />
        </button>
        <CardHeader>
          <CardTitle>Choose Your Pokémon</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-15 items-center">
            {Array.from({ length: Math.ceil(pokemons.length / 3) }).map(
              (_, rowIdx) => (
                <div
                  key={rowIdx}
                  className="flex flex-row gap-12 w-full justify-center"
                >
                  {pokemons
                    .slice(rowIdx * 3, rowIdx * 3 + 3)
                    .map((pokemon, colIdx) => {
                      const isMiddle = colIdx === 1;
                      const isEvenRow = rowIdx % 2 === 0;
                      const translateY = isMiddle
                        ? isEvenRow
                          ? "translate-y-1"
                          : "-translate-y-1"
                        : "";
                      const isSelected = selected?.id === pokemon.id;
                      return (
                        <button
                          key={pokemon.id}
                          onClick={() => setSelected(pokemon)}
                          type="button"
                          className={`flex flex-row items-center rounded-full justify-center hover:border-blue-600 transition-transform border-2 ${translateY} ${
                            isSelected ? "border-blue-600" : "border-transparent"
                          }`}
                          style={{ padding: 0 }}
                        >
                          <PokemonLogo
                            name={
                              typeof pokemon.name === "string"
                                ? pokemon.name
                                : pokemon.name.english
                            }
                            imgSrc={
                              typeof pokemon.image === "string"
                                ? pokemon.image
                                : pokemon.image?.hires ||
                                  pokemon.image?.thumbnail ||
                                  pokemon.image?.sprite ||
                                  ""
                            }
                            size={86}
                          />
                        </button>
                      );
                    })}
                </div>
              )
            )}
          </div>
        </CardContent>
        <Separator />
        <CardFooter className="flex justify-center">
          <Button
            className="w-26 h-10"
            onClick={() => {
              if (selected) {
                onSelect(selected);
              }
            }}
            disabled={!selected}
          >
            Start Battle
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChoosePokemonModal;