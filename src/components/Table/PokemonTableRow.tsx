import { useState } from "react";
import { type Pokemon } from "../../typs/Pokemon";
import { TableCell, TableRow } from "../ui/table";
import { PokemonLogo } from "../PokemonLogo/PokemonLogo";
import PokemonInfoModal from "../Modals/InfoModal";
import { Pokador } from "../../assets/CatchButton";
import DescriptionTooltip from "../ToolTip/ToolTip";
import { formatPokemonId } from "../../utils/TableRowUtils"; 


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
        <TableCell className="px-4 text-left text-lg flex items-center justify-begin gap-4">
          <PokemonLogo imgSrc={pokemon.image?.hires || ""} />
          {pokemon.name.english}
          {pokemon.isMyPokemon && (
            <span className="flex-shrink-0 flex-grow-0 min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px] flex items-center">
              <Pokador size={20} />
            </span>
          )}
        </TableCell>
        <TableCell className="px-4 text-left">
          {formatPokemonId(pokemon.id)} 
        </TableCell>
        <TableCell className="px-4 max-w-[544px] truncate whitespace-nowrap overflow-hidden text-left">
          <DescriptionTooltip content={pokemon.description || ""}>
            <span>{pokemon.description}</span>
          </DescriptionTooltip>
        </TableCell>
        <TableCell className="px-4 text-left">
          Power level {pokemon.base?.Attack ?? ""}
        </TableCell>
        <TableCell className="px-4 text-left">
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