import type { Pokemon } from "./pokemonType"

type Props = {
  pokemons: Pokemon[]
  totalItems: number
  currentPage: number
  rowsPerPage: number
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rows: number) => void
}

export function PokemonTable({
  pokemons,
  totalItems,
  currentPage,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: Props) {
  const totalPages = Math.ceil(totalItems / rowsPerPage)
  const from = (currentPage - 1) * rowsPerPage + 1
  const to = Math.min(currentPage * rowsPerPage, totalItems)

  return (
    <table className="w-full text-left border rounded-lg">
      {/* Header */}
      <thead className="bg-[#EBEFF6]/60 text-sm text-left">
        <tr>
          <th className="w-[408px] h-[72px] pl-[16px] pr-[40px] pt-[16px] pb-[16px]">Pokemon name</th>
          <th className="w-[170px] h-[72px] pr-[40px] pt-[16px] pb-[16px]">ID</th>
          <th className="w-[544px] h-[72px] pr-[40px] pt-[16px] pb-[16px]">Description</th>
          <th className="w-[127px] h-[72px] pr-[16px] pt-[16px] pb-[16px]">Power level</th>
          <th className="w-[127px] h-[72px] pr-[16px] pt-[16px] pb-[16px]">HP level</th>
        </tr>
      </thead>

      {/* Body */}
      <tbody>
        {pokemons.map((p) => (
          <tr key={p.id} className="border-t">
            <td className="w-[408px] h-[72px] flex items-center gap-[16px] px-[16px] pr-[40px] py-[16px]">
              <div className="w-[54px] h-[54px] rounded-full bg-[#c9d6ed] flex items-center justify-center">
                <img src={p.image.thumbnail} alt={p.name.english} className="w-[54px] h-[54px] object-contain" />
              </div>
              <span className="text-base font-medium">{p.name.english}</span>
            </td>
            <td className="w-[170px] h-[72px] px-[16px] pr-[40px] py-[16px]">
              #{p.id.toString().padStart(3, "0")}
            </td>
            <td className="w-[544px] h-[72px] px-[16px] pr-[40px] py-[16px]">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {p.description}
              </p>
            </td>
            <td className="w-[127px] h-[72px] px-[16px] pr-[16px] py-[16px]">
              {p.base.Attack + p.base["Sp. Attack"] + p.base.Speed}
            </td>
            <td className="w-[127px] h-[72px] px-[16px] pr-[16px] py-[16px]">
              {p.base.HP} HP
            </td>
          </tr>
        ))}
      </tbody>

      {/* Footer Pagination Row */}
      <tfoot>
        <tr className="border-t bg-white">
          <td colSpan={5} className="px-4 py-3">
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span>Rows per page:</span>
                <select
                  value={rowsPerPage}
                  onChange={(e) => {
                    onRowsPerPageChange(Number(e.target.value))
                    onPageChange(1) // Reset to page 1 when rows change
                  }}
                  className="border rounded px-2 py-1 bg-white text-black"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                </select>
              </div>

              <div className="flex items-center gap-4">
                <span>{from}–{to} of {totalItems} items</span>
                <button
                  onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  className="disabled:opacity-50"
                >
                  ←
                </button>
                <button
                  onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="disabled:opacity-50"
                >
                  →
                </button>
              </div>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  )
}
