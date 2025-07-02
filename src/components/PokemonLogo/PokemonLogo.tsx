import * as React from "react";

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
    style={{ width: size, height: size }}
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
      <svg
        width={size * 0.75}
        height={size * 0.75}
        viewBox="0 0 48 48"
        fill="none"
        {...props}
        aria-label="Pokémon Logo"
      >
        <circle
          cx="24"
          cy="24"
          r="22"
          stroke="#2A75BB"
          strokeWidth="4"
          fill="#FFCB05"
        />
        <circle
          cx="24"
          cy="24"
          r="10"
          stroke="#2A75BB"
          strokeWidth="4"
          fill="#fff"
        />
        <circle cx="24" cy="24" r="5" fill="#2A75BB" />
      </svg>
    )}
  </div>
);

export default PokemonLogo;