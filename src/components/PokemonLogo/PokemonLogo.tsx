import * as React from "react";
import { PokemonLogoSVG } from "../../assets/PokemonLogoSVG";

export type PokemonLogoProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  imgSrc?: string;
};

export const PokemonLogo = ({
  size = 48,
  imgSrc,
  ...props
}: PokemonLogoProps) => (
  <div
    className="flex items-center justify-center rounded-full bg-primary-50"
    style={{ width: size +15, height: size + 15 }}
  >
    {imgSrc ? (
      <img
        src={imgSrc}
        width={size}
        height={size}
        alt="Pokémon Logo"
        className="object-contain"
      />
    ) : (
      <PokemonLogoSVG width={size * 0.78} height={size * 0.75} {...props} />
    )}
  </div>
);

export default PokemonLogo;