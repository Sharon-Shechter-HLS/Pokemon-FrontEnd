
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
  const success = Math.random() < 0.1; // 10% chance to catch
  const updatedAttempts = catchAttempts + 1;

  return { success, updatedAttempts };
}