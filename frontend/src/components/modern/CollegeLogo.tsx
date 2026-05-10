import rvceLogo from "@/assets/rvce-logo.png";
import { cn } from "@/lib/utils";

export function CollegeLogo({
  className,
  imageClassName,
}: {
  className?: string;
  imageClassName?: string;
}) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <img
        src={rvceLogo}
        alt="RV College of Engineering"
        className={cn("h-auto w-44 object-contain", imageClassName)}
      />
    </div>
  );
}
