import React, { createContext, useContext, useState } from "react";

type ContextRouteType = {
  pokemonId: string | null;
  setPokemonId: (id: string | null) => void;
};

const ContextRoute = createContext<ContextRouteType | undefined>(undefined);

export const ContextRouteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pokemonId, setPokemonId] = useState<string | null>(null);

  return (
    <ContextRoute.Provider value={{ pokemonId, setPokemonId }}>
      {children}
    </ContextRoute.Provider>
  );
};

export const useContextRoute = (): ContextRouteType => {
  const context = useContext(ContextRoute);
  if (!context) {
    throw new Error("useContextRoute must be used within a ContextRouteProvider");
  }
  return context;
};