import { cn } from "../../lib/utils";

type ChampionProps = {
  imageUrl: string;
  alt?: string;
  size?: number | string; // e.g., 200 or "200px"
  className?: string;
};

const CompetitorPhoto = ({
  imageUrl,
  alt = "Champion Pokémon",
  size = 200,
  className = "",
}: ChampionProps) => {
  const sizeClass = `w-[${typeof size === "number" ? size + "px" : size}] h-[${
    typeof size === "number" ? size + "px" : size
  }]`;
  return (
    <div
      className={cn("flex justify-center items-center", sizeClass, className)}
    >
      <img
        src={imageUrl}
        alt={alt}
        className="w-full h-full object-contain"
        draggable={false}
      />
    </div>
  );
};

export default CompetitorPhoto;