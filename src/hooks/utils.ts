import {
  BASE_DAMAGE_MULTIPLIER,
  RANDOM_DAMAGE_MULTIPLIER,
  MIN_DAMAGE,
  DAMAGE_CHANCE_THRESHOLD,
  DAMAGE_CALCULATION_DELAY,
} from "../constants/lifeCalculateDamage";

export function canCatchPokemon(
  turn: "user" | "opponent",
  catchAttempts: number
): boolean {
  return (
    turn === "user" && 
    catchAttempts < 3 
  );
}

export function attemptCatch(
  catchAttempts: number,
): { success: boolean; updatedAttempts: number } {
  const success = Math.random() < 0.1; 
  const updatedAttempts = catchAttempts + 1;

  return { success, updatedAttempts };
}

export function updateLifeAfterDamage(power: number, currentLife: number): number {
  const newLife = currentLife - power;
  return Math.max(newLife, 0); 
}

export function calculateNewLifeBar(
  power: number,
  currentLife: number,
  maxLife: number
): number {
  const baseDamage = (power / 100) * (maxLife * BASE_DAMAGE_MULTIPLIER);
  const randomFactor = Math.random() * (maxLife * RANDOM_DAMAGE_MULTIPLIER);
  const damage = Math.max(MIN_DAMAGE, Math.round(baseDamage + randomFactor));
  const newLife = Math.max(0, currentLife - damage);
  return Math.floor(newLife);
}

export function calculateLife(
  power: number,
  currentLife: number,
  maxLife: number
): Promise<number> {
  return new Promise((resolve) => {
    const randomChance = Math.random();
    const damageApplied = randomChance > DAMAGE_CHANCE_THRESHOLD;

    setTimeout(() => {
      if (damageApplied) {
        const newLife = calculateNewLifeBar(power, currentLife, maxLife);
        resolve(newLife);
      } else {
        resolve(currentLife); 
      }
    }, DAMAGE_CALCULATION_DELAY);
  });
}