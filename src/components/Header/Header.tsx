import { useNavigate } from "react-router-dom"
import Button from "../Button/button"

export default function Header() {
  const navigate = useNavigate() 

  return (
    <header className="w-full px-8 py-4 bg-white flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-4">
        <img src="/Logo.png" alt="Pokemon Logo" className="h-[40px]" />

        <div className="flex gap-2 ml-4">
          <Button variant="primary" size="md" onClick={() => navigate("/allpokemon")}>
            All Pokemons
          </Button>
          <Button variant="secondary" size="md" onClick={() => navigate("/mypokemon")}>
            My Pokemons
          </Button>
        </div>
      </div>

      <Button size="lg" onClick={() => alert("Start a Fight clicked!")}>
        { /* Will route to the fight */}
        Start a Fight
      </Button>
    </header>
  )
}
