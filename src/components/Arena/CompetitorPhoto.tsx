import { cn } from "../../lib/utils";

type CompetitorImageProps = {
  imageUrl: string;
  alt?: string;
  size?: number | string; 
  className?: string;
};

const CompetitorPhoto = ({
  imageUrl,
  alt = "Competitor Image",
  size = 200,
  className = "",
}: CompetitorImageProps) => {
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