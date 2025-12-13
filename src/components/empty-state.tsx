import Image from "next/image";

interface Props {
  title: string;
  description: string;
}

export const EmptyState = ({ title, description }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src="./empty-state.svg"
        alt="Empty"
        width={180}
        height={180}
        className="opacity-40"
      />
      <div className="flex flex-col gap-y-6 max-w-md mx-auto text-center m-5">
        <h6 className="text-lg font-medium">{title}</h6>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
