import { motion } from "framer-motion";
import { Activity, BarChart3, Shield, TrendingUp, Zap } from "lucide-react";

const metrics = [
  { icon: TrendingUp, label: "Profitability", delay: 0 },
  { icon: BarChart3, label: "Growth", delay: 0.3 },
  { icon: Shield, label: "Value", delay: 0.6 },
  { icon: Activity, label: "Momentum", delay: 0.9 },
  { icon: Zap, label: "Stability", delay: 1.2 },
];

const ScanningAnimation = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
      {/* Pulsing radar circle */}
      <div className="relative w-28 h-28 mb-8">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border border-primary/30"
            initial={{ scale: 0.5, opacity: 0.8 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeOut",
            }}
          />
        ))}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-12 h-12 rounded-2xl bg-primary/15 border border-primary/20 flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Activity className="w-6 h-6 text-primary" />
          </motion.div>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-sm font-semibold text-foreground mb-1"
      >
        Анализируем рынок
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-[11px] text-muted-foreground mb-8 font-mono"
      >
        Сканирование 500+ тикеров...
      </motion.p>

      {/* Metric checklist */}
      <div className="w-full max-w-[220px] space-y-3">
        {metrics.map(({ icon: Icon, label, delay }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.2, duration: 0.4 }}
            className="flex items-center gap-3"
          >
            <motion.div
              className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center shrink-0"
              animate={{
                backgroundColor: [
                  "hsl(var(--secondary))",
                  "hsl(var(--gain) / 0.15)",
                ],
              }}
              transition={{ delay: delay + 0.8, duration: 0.4 }}
            >
              <Icon className="w-3.5 h-3.5 text-muted-foreground" />
            </motion.div>
            <div className="flex-1">
              <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ delay: delay + 0.4, duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
            <span className="text-[10px] text-muted-foreground font-mono w-16 shrink-0">
              {label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ScanningAnimation;
