import { ElementType, ReactNode } from "react";

interface GradientCardProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  glow?: boolean;
}

/**
 * GradientCard
 * A lightweight wrapper adding a multi-color gradient ring, subtle glass background,
 * and optional hover glow. Designed for marketing / landing sections.
 */
function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function GradientCard({
  children,
  className,
  as: Tag = "div",
  glow = true,
}: GradientCardProps) {
  return (
    <Tag
      className={cx(
        "relative gradient-ring rounded-xl p-[1px]",
        glow && "hover-glow",
        className || ""
      )}
    >
      <div className="rounded-[inherit] h-full w-full glass-panel px-6 py-5">
        {children}
      </div>
    </Tag>
  );
}

export default GradientCard;
