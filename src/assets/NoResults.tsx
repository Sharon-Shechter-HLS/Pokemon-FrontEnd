import NoFoundIcon from "./noFoundIcon.svg";

export const NoResults = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 bg-white">
      <img
        src={NoFoundIcon}
        alt="No Results Found"
        className="w-24 h-24 mb-4"
      />
      <p className="text-lg text-gray-600">{message}</p>
    </div>
  );
};