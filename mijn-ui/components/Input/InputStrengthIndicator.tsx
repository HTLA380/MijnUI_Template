import { cn } from "@/utils";

type StrengthIndicatorProps = React.ComponentProps<"div"> & {
  strength?: number;
  levels?: number;
};

const InputStrengthIndicator = ({
  strength = 0,
  levels = 4,
  className,
  ...props
}: StrengthIndicatorProps) => {
  const getColor = (index: number) => {
    if (strength >= index + 1) {
      if (strength === 1) return "bg-danger";
      if (strength === 2) return "bg-warning";
      if (strength >= 3) return "bg-success";
    }
    return "bg-muted";
  };

  return (
    <div
      className={cn(
        "flex h-1 w-full min-w-40 max-w-xs items-center gap-1",
        className,
      )}
      {...props}
    >
      {Array.from({ length: levels }, (_, index) => (
        <div
          key={index}
          className={cn("size-full rounded-full", getColor(index))}
        />
      ))}
    </div>
  );
};

export { InputStrengthIndicator };
