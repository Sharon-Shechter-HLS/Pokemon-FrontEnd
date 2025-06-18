import { Button } from "@/components/button/button"
import { Input } from "@/components/ui/input"

function App() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col gap-4">
        <Input placeholder="Search…" />

        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>

        <Button variant="primary" disabled>
          Primary Disabled
        </Button>

        <Button variant="secondary">Secondary</Button>
        <Button variant="secondary" disabled>
          Secondary Disabled
        </Button>
      </div>
    </div>
  )
}

export default App
