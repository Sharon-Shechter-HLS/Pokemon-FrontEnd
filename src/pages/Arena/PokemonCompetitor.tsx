import progressBarRow from "@/components/progressBar/progressBarRow";

type PokemonCompetitorProps = {
  image: string; 
  HP: number; 
  CurrentHP: number; 
  pokemonName: string; 
  speed: number; 
  disabled?: boolean; 
};

export default function PokemonCompetitor({
  image = "",
  HP = 0,
  CurrentHP = 0,
  pokemonName = "",
  speed = 0,
}: PokemonCompetitorProps) {
  return (
    <div className="relative flex flex-col items-center gap-4">
      {/* Pokémon Image */}
      <img
        src={image}
        alt={pokemonName}
        className="absolute w-40 h-40 object-contain"
        style={{
          top: "-180px", 
          right: "-110px", 
        }}
      />

      {/* Progress Bar */}
      {progressBarRow({
        HP,
        CurrentHP,
        pokemonName,
        speed,
        disabled: false,
      })}
    </div>
  );
}