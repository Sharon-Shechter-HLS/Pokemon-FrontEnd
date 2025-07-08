import type { Pokemon } from "@/typs/Pokemon";
import VsBackground from "@/assets/VSBackground.svg";

type VSComponentProps = {
  userPokemon: Pokemon;
  opponentPokemon: Pokemon;
  
};

export default function VSComponent({
  userPokemon,
  opponentPokemon,
}: VSComponentProps) {
  return (
    <div
      className="w-full h-screen flex bg-cover bg-center relative"
      style={{ backgroundImage: `url(${VsBackground})` }}
    >
      <div className="w-1/2 h-full flex items-center justify-center relative">
        <img
          src={userPokemon.image.thumbnail}
          alt={userPokemon.name.english}
          className="absolute object-contain"
          style={{
            width: "40%", 
            height: "auto",
            top: "35%",
            left: "50%",
            transform: "translate(-50%, -50%)", 

          }}
        />
      </div>

      <div className="w-1/2 h-full flex items-center justify-center relative">
        <img
          src={opponentPokemon.image.thumbnail}
          alt={opponentPokemon.name.english}
          className="absolute object-contain"
          style={{
            width: "40%", 
            height: "auto",
            top: "65%", 
            left: "50%", 
            transform: "translate(-50%, -50%)", 
          }}
        />
      </div>
    </div>
  );
}