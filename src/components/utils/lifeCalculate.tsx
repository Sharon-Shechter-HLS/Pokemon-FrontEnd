export function updateLifeAfterDamage(power: number, currentLife: number): number {
  const newLife = currentLife - power;
  return Math.max(newLife, 0); // Ensure life doesn't go below 0
}

export function calculateNewLifeBar(
  power: number,
  currentLife: number,
  maxLife: number
): number {
  const baseDamage = (power / 100) * (maxLife * 0.25);
  const randomFactor = Math.random() * (maxLife * 0.05);
  const damage = Math.max(1, Math.round(baseDamage + randomFactor));
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
    const damageApplied = randomChance > 0.2; // 80% chance to apply damage

    setTimeout(() => {
      if (damageApplied) {
        const newLife = calculateNewLifeBar(power, currentLife, maxLife);
        resolve(newLife);
      } else {
        resolve(currentLife); // No damage applied
      }
    }, 200); // Simulate a delay of 200ms
  });
}