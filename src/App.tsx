import { useState } from "react"
import { Filter } from "@/components/filter/filter"

function App() {
  const [filter, setFilter] = useState<string | undefined>()

  return (
    <div className="flex h-screen items-center justify-center gap-4 bg-[#f5f7fa]">
      <Filter value={filter} onChange={setFilter} onClear={() => setFilter(undefined)} />
    </div>
  )
}

export default App
