import { useEffect, useState } from "react";
import Arena from "../components/Arena/Arena";
import VSComponent from "../components/PreFight/VScomponent";
import { BattleProvider } from "../components/Arena/BattleContext";

interface ArenaPageProps {
  battleData: any;
}

const ArenaPage = ({ battleData }: ArenaPageProps) => {
  const [showVS, setShowVS] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVS(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="arena-page px-5">
      {showVS ? (
        <VSComponent
          userPokemon={battleData.user}
          opponentPokemon={battleData.opponent}
        />
      ) : (
        <BattleProvider initialBattleData={battleData}>
          <div className="w-[100%] px-4 pb-10">
            <Arena />
          </div>
        </BattleProvider>
      )}
    </div>
  );
};

export default ArenaPage;