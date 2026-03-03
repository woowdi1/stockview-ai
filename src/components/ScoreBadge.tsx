import { cn } from "@/lib/utils";

interface ScoreBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
}

const getScoreColor = (score: number) => {
  if (score >= 85) return "text-gain bg-gain/10 border-gain/20";
  if (score >= 70) return "text-warning bg-warning/10 border-warning/20";
  return "text-loss bg-loss/10 border-loss/20";
};

const getScoreLabel = (score: number) => {
  if (score >= 90) return "A+";
  if (score >= 85) return "A";
  if (score >= 75) return "B+";
  if (score >= 70) return "B";
  return "C";
};

const ScoreBadge = ({ score, size = "md" }: ScoreBadgeProps) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-11 h-11 text-sm",
    lg: "w-14 h-14 text-base",
  };

  return (
    <div
      className={cn(
        "rounded-xl border font-mono font-bold flex flex-col items-center justify-center",
        getScoreColor(score),
        sizeClasses[size]
      )}
    >
      <span>{score}</span>
      {size !== "sm" && (
        <span className="text-[8px] opacity-70">{getScoreLabel(score)}</span>
      )}
    </div>
  );
};

export default ScoreBadge;
