import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderMenu from "./NavMenu";
import { Button } from "../ui/button";
import ChoosePokemonModal from "../Modals/ChoosePokemonModal";
import PokemonLogoSrc from "../../assets/headerLogo.svg";

type HeaderMenuItem = {
  name: string | React.ReactNode;
  href: string;
  isActive?: boolean;
};

type HeaderProps = {
  items: HeaderMenuItem[];
};

type HeaderLogoProps = {
  src: string;
  alt: string;
  className?: string;
};

export function Header({ items }: HeaderProps) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const HeaderLogo = ({
    src,
    alt,
    className = "h-14 w-37 object-contain",
  }: HeaderLogoProps) => (
    <div className="flex items-center">
      <img src={src} alt={alt} className={className} />
    </div>
  );

  return (
    <>
      <header className="w-full flex items-center justify-between px-6 bg-white border-b h-20">
        <div className="flex items-center gap-6 flex-shrink-0">
          <HeaderLogo src={PokemonLogoSrc} alt="Pokédex Logo" />
          <HeaderMenu items={items} />
        </div>
        <Button size={"lg"} onClick={() => setShowModal(true)}>
          Start a Fight
        </Button>
      </header>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <ChoosePokemonModal
            onSelect={async (pokemon) => {
              setShowModal(false);
              navigate(`/arena?userId=${pokemon.id}`);
            }}
            onClose={() => setShowModal(false)}
          />
        </div>
      )}
    </>
  );
}

export default Header;