import { useState } from "react"
import { Filter } from "@/components/filter/filter"

function App() {
  const [type, setType] = useState<string | undefined>()

  const pokemonTypes = ["Fire", "Water", "Grass", "Electric", ]

  return (
    <div className="flex h-screen items-center justify-center gap-4 bg-[#f5f7fa]">
      <Filter
        value={type}
        onChange={setType}
        placeholder="Filter type"
        options={pokemonTypes}
      />
    </div>
  )
}

export default App
