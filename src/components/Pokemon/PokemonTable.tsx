import type { Pokemon } from "@/typs/Pokemon"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type PokemonTableProps = {
  pokemons: Pokemon[]
  currentPage: number
  rowsPerPage: number
  totalItems: number
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rows: number) => void
  onRowClick?: (pokemon: Pokemon) => void 
}


export function PokemonTable({
  pokemons,
  currentPage,
  rowsPerPage,
  totalItems,
  onPageChange,
  onRowsPerPageChange,
  onRowClick
}: PokemonTableProps) {
  const totalPages = Math.ceil(totalItems / rowsPerPage)
  const from = (currentPage - 1) * rowsPerPage + 1
  const to = Math.min(currentPage * rowsPerPage, totalItems)

  return (
    <div className="w-full max-w-[1376px] border rounded-[8px] overflow-hidden bg-white">
      <div className="overflow-x-auto h-full">
        <Table className="min-w-full">
          <TableCaption>Pokémon list</TableCaption>

          <TableHeader>
            <TableRow className="h-[72px] border-b bg-[#EBEFF6]">
              <TableHead className="w-[300px] px-6 py-4">Pokémon Name</TableHead>
              <TableHead className="w-[100px] px-4 py-4">ID</TableHead>
              <TableHead className="w-[450px] px-4 py-4">Description</TableHead>
              <TableHead className="w-[120px] px-4 py-4">Power level</TableHead>
              <TableHead className="w-[120px] px-4 py-4">HP level</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {pokemons.map((p) => (
              <TableRow
                key={p.id}
                onClick={() => onRowClick?.(p)} // <- trigger the callback if provided
                className="h-[72px] border-b bg-white cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <TableCell className="w-[300px] px-6 py-4 flex items-center gap-3">
                  <div className="w-[54px] h-[54px] rounded-full bg-[#EBEFF6] flex items-center justify-center">
                    <img
                      src={p.image.thumbnail}
                      alt={p.name.english}
                      className="w-[32px] h-[32px] object-contain"
                    />
                  </div>
                  <span className="text-base font-medium">{p.name.english}</span>
                </TableCell>

                <TableCell className="w-[100px] px-4 py-4">
                  #{p.id.toString().padStart(3, "0")}
                </TableCell>

                <TableCell className="w-[450px] px-4 py-4">
                  <p className="text-sm text-muted-foreground truncate max-w-[420px]">
                    {p.description}
                  </p>
                </TableCell>

                <TableCell className="w-[120px] px-4 py-4">
                  {p.base.Attack + p.base["Sp. Attack"] + p.base.Speed}
                </TableCell>

                <TableCell className="w-[120px] px-4 py-4">
                  {p.base.HP} HP
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow className="border-t">
              <TableCell colSpan={5}>
                <div className="flex justify-between items-center text-sm text-muted-foreground px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span>Rows per page:</span>
                    <select
                      value={rowsPerPage}
                      onChange={(e) => {
                        onRowsPerPageChange(Number(e.target.value))
                        onPageChange(1)
                      }}
                      className="border rounded px-2 py-1 bg-white text-black"
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-4">
                    <span>{`${from}–${to} of ${totalItems} items`}</span>
                    <button
                      onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                      disabled={currentPage === 1}
                      className="disabled:opacity-50"
                    >
                      ←
                    </button>
                    <button
                      onClick={() =>
                        onPageChange(Math.min(currentPage + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="disabled:opacity-50"
                    >
                      →
                    </button>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  )
}
