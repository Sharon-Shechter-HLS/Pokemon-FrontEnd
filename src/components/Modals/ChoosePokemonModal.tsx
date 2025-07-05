import { useState } from "react";
import { useMyPokemons } from "../../hooks/useMyPokemons";
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
import { Button } from "@/components/Button/button";
import { Separator } from "../ui/separator";

type ChoosePokemonModalProps = {
  onSelect: (pokemon: Pokemon) => void;
  onClose: () => void;
};

const ChoosePokemonModal = ({ onSelect, onClose }: ChoosePokemonModalProps) => {
  const { pokemons, isLoading } = useMyPokemons(undefined, undefined, true);
  const [selected, setSelected] = useState<Pokemon | null>(null);

  if (isLoading) return 

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <Card className="max-w-[502px] w-full rounded-md">
        {/* Header */}
        <CardHeader className="flex flex-col items-start w-full">
          <div className="flex flex-row items-center w-full">
            <CardTitle className="text-2xl font-normal mb-2">
              Choose Your Pokémon
            </CardTitle>
            <span className="flex-1" />
            <button onClick={onClose} className="ml-auto">
              <FaTimes
                size={24}
                className="cursor-pointer text-gray-500 hover:text-gray-800 transition-colors"
              />
            </button>
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent>
          <div className="overflow-y-auto max-h-[300px] flex flex-col gap-6 items-center">
            {Array.from({ length: Math.ceil(pokemons.length / 3) }).map(
              (_, rowIdx) => (
                <div
                  key={rowIdx}
                  className="flex flex-row gap-6 w-full justify-center"
                >
                  {pokemons
                    .slice(rowIdx * 3, rowIdx * 3 + 3)
                    .map((pokemon) => {
                      const isSelected = selected?.id === pokemon.id;
                      return (
                        <button
                          key={pokemon.id}
                          onClick={() => setSelected(pokemon)}
                          type="button"
                          className={`flex items-center justify-center rounded-full hover:border-blue-600 transition-transform border-2 ${
                            isSelected
                              ? "border-blue-600"
                              : "border-transparent"
                          }`}
                        >
                          <PokemonLogo
                            imgSrc={
                              pokemon.image?.hires ||
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

        {/* Separator */}
        <Separator className="my-4" />

        {/* Footer */}
        <CardFooter className="flex justify-center">
          <Button
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
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