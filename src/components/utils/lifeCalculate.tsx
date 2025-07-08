export function updateLifeAfterDamage(power: number, currentLife: number): number {
  const newLife = currentLife - power;
  return Math.max(newLife, 0); // Ensure life doesn't go below 0
}

export function calculateLife(power: number, currentLife: number): Promise<number> {
  return new Promise((resolve) => {
    const randomChance = Math.random();
    const damageApplied = randomChance > 0.2; // 80% chance to apply damage

    setTimeout(() => {
      if (damageApplied) {
        const newLife = updateLifeAfterDamage(power, currentLife);
        resolve(newLife);
      } else {
        resolve(currentLife); // No damage applied
      }
    }, 1000); // Simulate a delay of 1 second
  });
}