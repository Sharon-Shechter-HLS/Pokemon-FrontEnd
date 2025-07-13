import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../ui/card";
import { Separator } from "../ui/seperator";
import ClearIcon from "@mui/icons-material/Clear";
import { getPokemonAttributes } from "./utils";
import type { PokemonAttribute } from "./utils";
import { type Pokemon } from "../../typs/Pokemon";

type PokemonInfoModalProps = {
  open: boolean;
  onClose: () => void;
  pokemon: Pokemon; 
};

export function PokemonInfoModal({
  open,
  onClose,
  pokemon,
}: PokemonInfoModalProps) {
  if (!open) return null;

  const {
    id,
    name,
    image,
    description,
    profile,
    species,
  } = pokemon;

  const attributes: PokemonAttribute[] = getPokemonAttributes({
    height: profile?.height ?? "N/A", // Fallback to "N/A" if height is unavailable
    weight: profile?.weight ?? "N/A", // Fallback to "N/A" if weight is unavailable
    category: species ?? "Unknown", // Fallback to "Unknown" if species is unavailable
    abilities: profile?.ability?.map((a) => a[0]) || ["None"], // Fallback to "None" if abilities are unavailable
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <Card className="max-w-[502px] w-full rounded-md">
        <CardHeader className="flex flex-col items-start w-full">
          <div className="flex flex-row items-center w-full">
            <span className="text-xs text-gray-500">#{id ?? "?"}</span>
            <span className="flex-1" />
            <button onClick={onClose} className="ml-auto">
              <ClearIcon className="cursor-pointer" />
            </button>
          </div>
          <CardTitle className="text-2xl font-normal mb-2">
            {name?.english}
          </CardTitle>
        </CardHeader>
        <img
          src={image?.hires || "/pokemon-placeholder.png"}
          alt={name?.english ?? "?"}
          className="mb-1 w-[180px] h-[165px] mx-auto"
        />
        <CardContent>
          <CardDescription className="bg-neutral-100 p-4">
            <span className="mb-2">{description ?? "?"}</span>
            <Separator className="my-4" />
            <div className="flex flex-row space-x-5">
              {attributes.length > 0 ? (
                attributes.map((attr) => (
                  <div className="flex flex-col space-y-2" key={attr.label}>
                    <span className="font-normal text-gray-400 mr-1 text-xs">
                      {attr.label}
                    </span>
                    <span>{attr.value ?? "?"}</span>
                  </div>
                ))
              ) : (
                <span>?</span>
              )}
            </div>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}

export default PokemonInfoModal;