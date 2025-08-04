import { useState } from "react";
import { type Pokemon } from "../../typs/Pokemon";
import { TableCell, TableRow } from "../ui/table";
import { PokemonLogo } from "../PokemonLogo/PokemonLogo";
import PokemonInfoModal from "../Modals/InfoModal";
import { Pokador } from "../../assets/PokadorIcon";
import DescriptionTooltip from "../ToolTip/ToolTip";
import { formatPokemonId } from "./utils";


type PokemonTableRowProps = {
  pokemon: Pokemon;
};

export function PokemonTableRow({ pokemon }: PokemonTableRowProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow
        className="bg-neutrals-white cursor-pointer"
        key={pokemon.id}
        onClick={() => setOpen(true)}
      >
        <TableCell className="px-4 text-left text-lg flex items-center justify-begin gap-4" style={{ width: "200px" }}>
          <PokemonLogo imgSrc={pokemon.image?.hires || ""} />
          <div className="flex items-center gap-2">
            <span>{pokemon.name.english}</span>
            {pokemon.isMyPokemon && (
              <span
                className="flex-shrink-0 flex-grow-0 w-5 h-5 flex items-center justify-center"
              >
                <Pokador size={20} />
              </span>
            )}
          </div>
        </TableCell>
        <TableCell className="px-4 text-left" style={{ width: "100px" }}>
          {formatPokemonId(pokemon.id)} 
        </TableCell>
        <TableCell className="px-4 max-w-[544px] truncate whitespace-nowrap overflow-hidden text-left">
          <DescriptionTooltip content={pokemon.description || ""}>
            <span>{pokemon.description}</span>
          </DescriptionTooltip>
        </TableCell>
        <TableCell className="px-4 text-left" style={{ width: "150px" }}>
          Level {pokemon.base?.Attack ?? ""}
        </TableCell>
        <TableCell className="px-4 text-left" style={{ width: "150px" }}>
          {pokemon.base?.HP ?? ""} HP
        </TableCell>
      </TableRow>
      <PokemonInfoModal
        open={open}
        onClose={() => setOpen(false)}
        pokemon={pokemon}
      />
    </>
  );
}