import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/seperator";
import { Button } from "../ui/button";
import Champion from "../Arena/CompetitorPhoto";
import { Pokador } from "../../assets/CatchButton";
import ClearIcon from "@mui/icons-material/Clear";

type EndOfFightModalProps = {
  winner: string;
  winnerImageUrl: string;
  onPlayAgain: () => void;
  onReturnToMenu: () => void;
  title?: string;
  description?: {
    title: string;
    attributes: { label: string; value: string }[];
  };
};

export const EndOfFightModal = ({
  winnerImageUrl,
  onPlayAgain,
  onReturnToMenu,
  title,
  description,
}: EndOfFightModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <Card className="w-[502px] h-wrap p-6 relative">
        <button
          onClick={onReturnToMenu}
          className="absolute top-4 right-4 ml-auto"
        >
          <ClearIcon className="cursor-pointer" />
        </button>
        <CardHeader>
          <CardTitle className="text-xl mb-4 gap-2 items-center flex flex-row">
            {title || "Fight Over!"} <Pokador size={23} />
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="mb-6">
            <Champion
              imageUrl={winnerImageUrl}
              size={180}
              className="mx-auto"
            />
          </div>
          {description && description.attributes.length > 0 && (
            <div className="flex flex-col space-x-5 mb-4 w-full bg-system-background p-4">
              <CardTitle className="text-lg mb-4">
                {description.title}
              </CardTitle>
              <div className="flex flex-row space-x-5 mb-4">
                {description.attributes.map((attr) => (
                  <div className="flex flex-col space-y-2" key={attr.label}>
                    <span className="font-normal text-gray-400 mr-1 text-xs">
                      {attr.label}
                    </span>
                    <span>{attr.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <Separator className="mt-2 w-full" />
          <div className="flex gap-4 mt-5">
            <Button onClick={onPlayAgain} className="px-6 py-2">
              {description && title?.toLowerCase().includes("caught")
                ? "Continue Battle"
                : "Switch Pokemon"}
            </Button>
            <Button
              variant="secondary"
              onClick={onReturnToMenu}
              className="px-6 py-2"
            >
              End Match
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EndOfFightModal;