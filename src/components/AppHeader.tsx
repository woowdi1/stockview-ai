import { motion } from "framer-motion";
import { Activity, TrendingUp, Crown, User, Bot } from "lucide-react";
import { useSubscription } from "@/contexts/SubscriptionContext";

interface AppHeaderProps {
  onStatus?: () => void;
  onPaywall?: () => void;
  onBotPreview?: () => void;
}

const AppHeader = ({ onStatus, onPaywall, onBotPreview }: AppHeaderProps) => {
  const { isPro } = useSubscription();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 glass px-4 py-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-foreground">
              Invest.View
            </h1>
            <p className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase">
              Скриннер
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {/* Bot preview button */}
          <button
            onClick={onBotPreview}
            className="flex items-center gap-1 px-2 py-1 rounded-full bg-secondary hover:bg-accent transition-colors"
            title="Превью бота"
          >
            <Bot className="w-3 h-3 text-muted-foreground" />
          </button>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10">
            <Activity className="w-3 h-3 text-primary animate-pulse-glow" />
            <span className="text-[10px] font-mono font-medium text-primary">LIVE</span>
          </div>

          {isPro ? (
            <button
              onClick={onStatus}
              className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/15"
            >
              <Crown className="w-3 h-3 text-amber-500" />
              <span className="text-[10px] font-mono font-medium text-amber-500">PRO</span>
            </button>
          ) : (
            <button
              onClick={onPaywall}
              className="flex items-center gap-1 px-2 py-1 rounded-full bg-secondary hover:bg-accent transition-colors"
            >
              <User className="w-3 h-3 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default AppHeader;
