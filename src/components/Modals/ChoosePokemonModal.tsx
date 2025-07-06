import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
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
import { Button } from "@/components/Button/button"; // Import Button component
import { Separator } from "../ui/separator";

type ChoosePokemonModalProps = {
  onClose: () => void; // Callback to close the modal
};

const ChoosePokemonModal = ({ onClose }: ChoosePokemonModalProps) => {
  // Fetch only "My Pokémon" for selection
  const { pokemons: myPokemons, isLoading: isMyPokemonsLoading } = useMyPokemons(undefined, undefined, true); 
  // Fetch a random Pokémon for the opponent
  const { randomPokemon, isLoading: isRandomPokemonLoading } = useMyPokemons(undefined, undefined, false, true); 

  const [selected, setSelected] = useState<Pokemon | null>(null);
  const navigate = useNavigate(); // Initialize navigation

  if (isMyPokemonsLoading || isRandomPokemonLoading) return null;

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
            {Array.from({ length: Math.ceil(myPokemons.length / 3) }).map(
              (_, rowIdx) => (
                <div
                  key={rowIdx}
                  className="flex flex-row gap-6 w-full justify-center"
                >
                  {myPokemons
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
            variant="primary"
            size="sm"
            onClick={() => {
              if (selected && randomPokemon) {
                navigate("/arena", {
                  state: { userPokemon: selected, opponentPokemon: randomPokemon },
                }); // Navigate to Arena page with props
                onClose(); // Close the modal
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