import { Progress } from "../ui/ProgressBar";
import { getProgressBarClass } from "./utils";

export type ChampionPokemon = {
  name: string;
  speed: number;
};

export const CompetitorProgress = ({
  maxLife,
  currentLife,
  pokemon,
  disabled = false,
}: {
  maxLife: number;
  currentLife: number;
  pokemon: ChampionPokemon;
  disabled?: boolean;
}) => {
  return (
    <div
      className={`relative ${
        disabled
          ? "bg-extended-gradient-disabled opacity-80"
          : "bg-extended-gradient-default"
      } min-w-[286px] max-h-[108px] m-0 p-2 text-white rounded-sm`}
    >
      {disabled && (
        <div className="absolute inset-0 bg-gray-200 opacity-18 rounded-sm pointer-events-none z-10" />
      )}
      <h2 className="text-2xl font-semibold mb-4">{pokemon.name}</h2>
      <Progress
        value={currentLife}
        max={maxLife}
        className="w-full"
        indicatorClassName={getProgressBarClass(currentLife, maxLife)} 
      />
      <div className="flex justify-between items-center mt-2 text-sm">
        <span className="font-light">
          Speed: <span className="font-semibold">{pokemon.speed}</span>
        </span>
        <span className="font-light">
          {currentLife}/{maxLife} 
        </span>
      </div>
    </div>
  );
};

export default CompetitorProgress;