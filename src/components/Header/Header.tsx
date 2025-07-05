import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "../Button/button";
import Logo from "../../assets/headerLogo.svg";
import ChoosePokemonModal from "../Modals/ChoosePokemonModal";

export default function Header() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); 

  return (
    <header className="w-full px-8 py-4 bg-white flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-4">
        <img src={Logo} alt="Pokemon Logo" className="h-[40px]" />

        <div className="flex gap-2 ml-4">
          <Button variant="primary" size="md" onClick={() => navigate("/allpokemon")}>
            All Pokemons
          </Button>
          <Button variant="secondary" size="md" onClick={() => navigate("/mypokemon")}>
            My Pokemons
          </Button>
        </div>
      </div>

      {/* Start Fight Button */}
      <Button size="lg" onClick={() => setIsModalOpen(true)}>
        Start a Fight
      </Button>

      {/* Choose Pokemon Modal */}
      {isModalOpen && (
        <ChoosePokemonModal
          onSelect={(pokemon) => {
            console.log("Selected Pokémon:", pokemon);
            setIsModalOpen(false); // Close modal after selecting a Pokémon
          }}
          onClose={() => setIsModalOpen(false)} // Close modal when "X" is clicked
        />
      )}
    </header>
  );
}
