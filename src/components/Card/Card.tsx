import {
  Card as ShadCard,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

type GenericCardProps = {
  header: React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
};

export default function Card({ header, content, footer }: GenericCardProps) {
  return (
    <ShadCard >
      <CardHeader>{header}</CardHeader>

      <CardContent>{content}</CardContent>

      {footer && (
        <>
          <div className="w-full border-t my-2" /> 
          <CardFooter className="justify-center gap-4">{footer}</CardFooter>
        </>
      )}
    </ShadCard>
  );
}
