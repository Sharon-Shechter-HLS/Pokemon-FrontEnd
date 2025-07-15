import type { Pokemon } from "../typs/Pokemon";

export function canCatchPokemon(turn: "user" | "opponent", opponentLife: number, opponent: Pokemon): boolean {
  return turn === "user" && opponentLife > 0 && opponentLife < opponent.base.HP * 0.8;
}