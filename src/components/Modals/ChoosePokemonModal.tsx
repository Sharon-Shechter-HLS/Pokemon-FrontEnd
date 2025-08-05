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
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { useBattleContext } from "../Arena/BattleContext"; 

type ChoosePokemonModalProps = {
  onClose: () => void;
  onChoose?: (pokemon: Pokemon) => void;
};

const ChoosePokemonModal = ({ onClose, onChoose }: ChoosePokemonModalProps) => {
  const { pokemons, isLoading } = useMyPokemons({ isMyPokemons: true });
  const { lostPokemonId } = useBattleContext(); 
  const [selected, setSelected] = useState<Pokemon | null>(null);

  const handleConfirmSelection = () => {
    if (!selected) return;
    onChoose?.(selected);
    onClose();
  };

  if (isLoading)
    return (
      <div className="p-8 flex justify-center items-center">
        <LoadingSpinner className="text-blue-600 w-10 h-10" />
      </div>
    );

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
          <div className="flex flex-col gap-15 items-center overflow-y-auto max-h-[400px]">
            {Array.from({ length: Math.ceil(pokemons.length / 3) }).map(
              (_, rowIdx) => (
                <div
                  key={rowIdx}
                  className="flex flex-row gap-12 w-full justify-center"
                >
                  {pokemons
                    .slice(rowIdx * 3, rowIdx * 3 + 3)
                    .map((pokemon) => {
                      const isSelected = selected?._id === pokemon._id;
                      const isDisabled = pokemon._id === lostPokemonId; 
                      return (
                        <button
                          key={pokemon._id}
                          onClick={() => !isDisabled && setSelected(pokemon)}
                          type="button"
                          className={`flex flex-row items-center rounded-full justify-center hover:border-blue-600 transition-transform border-2 ${
                            isSelected ? "border-blue-600" : "border-transparent"
                          } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                          style={{ padding: 0 }}
                          disabled={isDisabled} 
                        >
                          <PokemonLogo
                            name={pokemon.name.english}
                            imgSrc={pokemon.image?.hires || ""}
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
            onClick={handleConfirmSelection}
            disabled={!selected}
          >
            Confirm Selection
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChoosePokemonModal;