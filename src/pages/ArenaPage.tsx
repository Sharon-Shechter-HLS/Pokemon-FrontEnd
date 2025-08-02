import { useEffect, useState } from "react";
import Arena from "../components/Arena/Arena";
import VSComponent from "../components/PreFight/VScomponent";

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
        <div className="w-[100%] px-4 pb-10">
          <Arena battleData={battleData} />
        </div>
      )}
    </div>
  );
};

export default ArenaPage;