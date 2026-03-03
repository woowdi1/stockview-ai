import { motion } from "framer-motion";
import { Ticker } from "@/data/tickers";
import ScoreBadge from "./ScoreBadge";
import MetricBar from "./MetricBar";
import { TrendingUp, TrendingDown } from "lucide-react";

interface TickerCardProps {
  ticker: Ticker;
  index: number;
  onSelect?: (ticker: Ticker) => void;
}

const TickerCard = ({ ticker, index, onSelect }: TickerCardProps) => {
  const isPositive = ticker.change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      onClick={() => onSelect?.(ticker)}
      className="glass rounded-xl p-3.5 space-y-3 cursor-pointer active:scale-[0.98] transition-transform"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <ScoreBadge score={ticker.score} />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-bold text-sm text-foreground">{ticker.symbol}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">{ticker.sector}</span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">{ticker.name}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-mono font-bold text-sm text-foreground">${ticker.price.toLocaleString()}</p>
          <div className={`flex items-center justify-end gap-0.5 ${isPositive ? "text-gain" : "text-loss"}`}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span className="font-mono text-[11px] font-medium">
              {isPositive ? "+" : ""}{ticker.changePercent.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-4 text-[10px] text-muted-foreground font-mono">
        <span>Cap: {ticker.marketCap}</span>
        <span>P/E: {ticker.pe ?? "—"}</span>
        <span>Vol: {ticker.volume}</span>
      </div>

      <div className="space-y-1.5">
        <MetricBar label="Profit" value={ticker.metrics.profitability} />
        <MetricBar label="Growth" value={ticker.metrics.growth} />
        <MetricBar label="Value" value={ticker.metrics.value} />
        <MetricBar label="Moment" value={ticker.metrics.momentum} />
        <MetricBar label="Stable" value={ticker.metrics.stability} />
      </div>
    </motion.div>
  );
};

export default TickerCard;
