import { HIGH_LIFE_THRESHOLD, MEDIUM_LIFE_THRESHOLD } from "../../constants/progressValues";

export function getProgressBarClass(currentLife: number, maxLife: number) {
  const lifePercentage = (currentLife / maxLife) * 100;
  if (lifePercentage > HIGH_LIFE_THRESHOLD) return "bg-[var(--color-success-green)]";
  if (lifePercentage > MEDIUM_LIFE_THRESHOLD) return "bg-[var(--color-warning-yellow)]";
  return "bg-[var(--color-error-red)]";
}