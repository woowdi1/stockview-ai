import { cn } from "@/lib/utils";

interface MetricBarProps {
  label: string;
  value: number;
}

const getBarColor = (value: number) => {
  if (value >= 80) return "bg-gain";
  if (value >= 60) return "bg-warning";
  return "bg-loss";
};

const MetricBar = ({ label, value }: MetricBarProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-muted-foreground w-20 shrink-0 uppercase tracking-wider">
        {label}
      </span>
      <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-700", getBarColor(value))}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-[10px] font-mono text-muted-foreground w-7 text-right">
        {value}
      </span>
    </div>
  );
};

export default MetricBar;
