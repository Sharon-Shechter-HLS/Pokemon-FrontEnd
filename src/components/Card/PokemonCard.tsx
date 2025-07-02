import {
  Card as ShadCard,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import type { Pokemon } from "@/typs/Pokemon";

type CardProps = {
  pokemon?: Pokemon; 
  variant: "info" | "regular";
  header?: React.ReactNode; 
  content?: React.ReactNode; 
  footer?: React.ReactNode; 
};

export default function PokemonCard({
  pokemon,
  variant,
  header,
  content,
  footer,
}: CardProps) {
  if (variant === "info" && pokemon) {
    const { id, name, description, image, profile } = pokemon;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center ">
        <ShadCard className="w-110 h-110 flex flex-col items-center justify-center rounded-[4px]">
          {/* Header */}
          <CardHeader
            className="w-120 h-130 px-10 gap-2"
          >
            <div className="flex justify-between items-start flex-col-reverse">
              <h2 className="text-lg">{name.english}</h2>
              <span className="text-sm text-gray-500">#{id}</span>
            </div>
          </CardHeader>

          {/* Image */}
          <img
            src={image?.hires || image?.thumbnail || ""}
            alt={name.english}
            className="w-30 h-30 object-cover mx-auto my-4 rounded-lg"
          />

          {/* Info Box */}
          <CardContent
            className="w-[95%] bg-gray-200 p-3 "
          >
            <p className="text-sm text-gray-700">{description}</p>
            <hr className="my-2 border-gray-300 p-2" />
            <ul className="text-sm text-gray-600 flex flex-row justify-center ">
              {[
                
                { label: "Height", value: profile?.height || "Unknown" },
                { label: "Weight", value: profile?.weight || "Unknown" },
                {
                  label: "Abilities",
                  value: profile?.ability
                    ? profile.ability.map((ability) => ability[0]).join(", ")
                    : "None",
                },
            
                { label: "Type", value: pokemon.type },
              ].map((item, index) => (
                <li key={index} className="flex flex-col items-center gap-1">
                  <p>{item.label}</p> <span className="">{item.value}</span> 
                </li>
              ))}
            </ul>
          </CardContent>
        </ShadCard>
      </div>
    );
  }

  // Regular Card
  return (
    <div className="fixed inset-0 bg-neutral-300 flex items-center justify-center z-50">
      <ShadCard className="w-[502px] h-[497px] rounded-[4px] bg-white shadow-lg">
        {header && <CardHeader>{header}</CardHeader>}
        {content && <CardContent>{content}</CardContent>}
        {footer && <CardFooter className="justify-center gap-4">{footer}</CardFooter>}
      </ShadCard>
    </div>
  );
}
