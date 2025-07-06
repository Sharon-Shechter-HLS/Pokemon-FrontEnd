
type ArenaHeaderProps = {
  headline: string;
  description: string;
  className?: string;
};

export const ArenaHeader = ({
  headline,
  description,
  className = "",
}: ArenaHeaderProps) => {
  return (
    <div className={`arena-header mt-8 ${className}`}>
      <h1 className="font-mulish font-medium leading-[34px] tracking-[0px] text-gray-900 text-5xl mb-4">
        {headline}
      </h1>
      <p className="text-xl text-gray-600">{description}</p>
    </div>
  );
};

export default ArenaHeader;