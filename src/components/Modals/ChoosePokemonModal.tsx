import axios from "axios";
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
import {UserId} from "../../consts"; 

type ChoosePokemonModalProps = {
  onClose: () => void;
};

const ChoosePokemonModal = ({ onClose }: ChoosePokemonModalProps) => {
  const { pokemons, isLoading } = useMyPokemons({ isMyPokemons: true });
  const [selected, setSelected] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);

  const startGame = async () => {
    if (!selected) return;

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/arena/startGame", {
        userId: UserId,
        pokemonId: selected._id, 
      });

      const battleData = response.data;
      window.location.href = `/arena?pokemonId=${selected._id}&battleId=${battleData._id}`;
    } catch (error) {
      console.error("Failed to start the game:", error);
    } finally {
      setLoading(false);
    }
  };

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
                    .map((pokemon) => {
                      const isSelected = selected?._id === pokemon._id;
                      return (
                        <button
                          key={pokemon._id}
                          onClick={() => setSelected(pokemon)}
                          type="button"
                          className={`flex flex-row items-center rounded-full justify-center hover:border-blue-600 transition-transform border-2 ${
                            isSelected ? "border-blue-600" : "border-transparent"
                          }`}
                          style={{ padding: 0 }}
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
            onClick={startGame}
            disabled={!selected || loading}
          >
            {loading ? "Starting..." : "Start Battle"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChoosePokemonModal;