import { motion } from "framer-motion";
import {
  TrendingUp,
  BarChart3,
  Zap,
  ArrowRight,
  Star,
  Shield,
  Activity,
} from "lucide-react";
import { mockTickers } from "@/data/tickers";
import ScoreBadge from "./ScoreBadge";

interface HomeViewProps {
  onLaunchScreener: () => void;
}

const topTickers = mockTickers.sort((a, b) => b.score - a.score).slice(0, 3);

const HomeView = ({ onLaunchScreener }: HomeViewProps) => {
  return (
    <div className="flex-1 flex flex-col px-4 pb-6 overflow-y-auto">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-6 mb-5 text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto mb-4 border border-primary/10">
          <TrendingUp className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          Invest.View
        </h2>
        <p className="text-xs text-muted-foreground mt-1.5 max-w-[260px] mx-auto leading-relaxed">
          AI-скриннер фондового рынка. Анализируем акции по 5 метрикам и выдаём единый score.
        </p>
      </motion.div>

      {/* Launch Screener Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        whileTap={{ scale: 0.97 }}
        onClick={onLaunchScreener}
        className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 mb-6 shadow-lg active:brightness-90 transition-all"
      >
        <Zap className="w-4 h-4" />
        Запустить скриннер
        <ArrowRight className="w-4 h-4" />
      </motion.button>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="grid grid-cols-3 gap-2 mb-6"
      >
        {[
          { icon: BarChart3, label: "5 метрик", sub: "анализа" },
          { icon: Shield, label: "Score", sub: "A+ — C" },
          { icon: Activity, label: "Live", sub: "данные" },
        ].map(({ icon: Icon, label, sub }, i) => (
          <div
            key={i}
            className="glass rounded-xl p-3 flex flex-col items-center gap-1.5 text-center"
          >
            <Icon className="w-4 h-4 text-primary" />
            <span className="text-[11px] font-semibold text-foreground">{label}</span>
            <span className="text-[9px] text-muted-foreground">{sub}</span>
          </div>
        ))}
      </motion.div>

      {/* Top Tickers Preview */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider flex items-center gap-1">
            <Star className="w-3 h-3" /> Топ по score
          </span>
        </div>
        <div className="space-y-2">
          {topTickers.map((ticker, i) => {
            const isPositive = ticker.change >= 0;
            return (
              <motion.div
                key={ticker.symbol}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                onClick={onLaunchScreener}
                className="glass rounded-xl p-3 flex items-center gap-3 cursor-pointer active:scale-[0.98] transition-transform"
              >
                <ScoreBadge score={ticker.score} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-xs text-foreground">
                      {ticker.symbol}
                    </span>
                    <span className="text-[9px] text-muted-foreground truncate">
                      {ticker.name}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-mono font-bold text-xs text-foreground">
                    ${ticker.price.toLocaleString()}
                  </p>
                  <span
                    className={`font-mono text-[10px] font-medium ${
                      isPositive ? "text-gain" : "text-loss"
                    }`}
                  >
                    {isPositive ? "+" : ""}
                    {ticker.changePercent.toFixed(2)}%
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Footer hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-center text-[9px] text-muted-foreground mt-6 font-mono"
      >
        Данные обновляются в реальном времени
      </motion.p>
    </div>
  );
};

export default HomeView;
