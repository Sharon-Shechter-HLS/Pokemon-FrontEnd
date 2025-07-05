import { Progress } from "@/components/ui/progress";



function getCurrentHPClass(CurrentHP: number, HP: number) {
  const percentage = (CurrentHP / HP) * 100;
  if (percentage > 80) return "bg-[var(--color-success-green)]";
  if (percentage > 30) return "bg-[var(--color-warning-yellow)]";
  return "bg-[var(--color-error-red)]";
}

export const progressBarRow = ({
  HP,
  CurrentHP,
  pokemonName,
  speed,
  disabled = false,
}: {
  HP: number;
  CurrentHP: number;
  pokemonName: string;
  speed: number;
  disabled?: boolean;
}) => {
  const percentage = (CurrentHP / HP) * 100;

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
      {/* Pokémon Name */}
      <h2 className="text-2xl font-semibold mb-4">{pokemonName}</h2>

      {/* Progress Bar */}
      <Progress
        value={percentage}
        max={100}
        className="w-full"
        indicatorClassName={getCurrentHPClass(CurrentHP, HP)}
      />

      {/* Additional Info */}
      <div className="flex justify-between items-center mt-2 text-sm">
        <span className="font-light">
          Speed: <span className="font-semibold">{speed}</span>
        </span>
        <span className="font-light">
          {CurrentHP}/{HP}
        </span>
      </div>
    </div>
  );
};

export default progressBarRow;