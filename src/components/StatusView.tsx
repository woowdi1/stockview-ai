import { motion } from "framer-motion";
import { ArrowLeft, Crown, User, Calendar, RefreshCw, AlertTriangle } from "lucide-react";
import { useSubscription, SubscriptionStatus } from "@/contexts/SubscriptionContext";

interface StatusViewProps {
  onBack: () => void;
  onPaywall: () => void;
}

const statusConfig: Record<SubscriptionStatus, { label: string; color: string; bg: string }> = {
  demo: { label: "Демо", color: "text-muted-foreground", bg: "bg-secondary" },
  pro_active: { label: "Pro Active", color: "text-gain", bg: "bg-gain/10" },
  pro_cancelled: { label: "Pro (отменён)", color: "text-warning", bg: "bg-amber-500/10" },
  pro_expired: { label: "Истёк", color: "text-loss", bg: "bg-loss/10" },
};

const StatusView = ({ onBack, onPaywall }: StatusViewProps) => {
  const { subscription, isPro, cancel, expire, reset, activate } = useSubscription();
  const config = statusConfig[subscription.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="flex-1 flex flex-col px-4 pb-6 overflow-y-auto"
    >
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="flex items-center gap-1 pt-3 pb-1 text-xs text-muted-foreground hover:text-foreground transition-colors self-start"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Назад</span>
      </motion.button>

      {/* Profile card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-xl p-5 mt-4 flex flex-col items-center"
      >
        <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center mb-3 border border-primary/10">
          {isPro ? (
            <Crown className="w-6 h-6 text-amber-500" />
          ) : (
            <User className="w-6 h-6 text-primary" />
          )}
        </div>
        <span className="font-mono font-bold text-sm text-foreground">
          @{subscription.username}
        </span>
        <span className="text-[10px] text-muted-foreground font-mono mt-0.5">
          ID: {subscription.telegramId}
        </span>

        <div className={`mt-3 px-3 py-1 rounded-full ${config.bg}`}>
          <span className={`text-[11px] font-semibold font-mono ${config.color}`}>
            {config.label}
          </span>
        </div>
      </motion.div>

      {/* Subscription details */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-xl p-4 mt-3 space-y-3"
      >
        <h3 className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
          Детали подписки
        </h3>

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Статус</span>
          <span className={`text-xs font-semibold ${config.color}`}>{config.label}</span>
        </div>

        {subscription.paidUntil && (
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Активна до
            </span>
            <span className="text-xs font-mono text-foreground">
              {subscription.paidUntil.toLocaleDateString("ru-RU")}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Тариф</span>
          <span className="text-xs font-mono text-foreground">
            {isPro ? "Pro · 299 ₽/мес" : "Бесплатный"}
          </span>
        </div>
      </motion.div>

      {/* Demo Actions - simulate lifecycle */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-xl p-4 mt-3"
      >
        <h3 className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" /> Демо-управление (для тестирования)
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={activate}
            className="py-2 rounded-lg bg-gain/10 text-gain text-[11px] font-semibold hover:bg-gain/20 transition-colors"
          >
            Активировать Pro
          </button>
          <button
            onClick={cancel}
            className="py-2 rounded-lg bg-amber-500/10 text-amber-500 text-[11px] font-semibold hover:bg-amber-500/20 transition-colors"
          >
            Отменить подписку
          </button>
          <button
            onClick={expire}
            className="py-2 rounded-lg bg-loss/10 text-loss text-[11px] font-semibold hover:bg-loss/20 transition-colors"
          >
            Истечь подписку
          </button>
          <button
            onClick={reset}
            className="py-2 rounded-lg bg-secondary text-muted-foreground text-[11px] font-semibold hover:text-foreground transition-colors"
          >
            Сбросить в демо
          </button>
        </div>
      </motion.div>

      {/* Upgrade / Reactivate CTA */}
      {!isPro && (
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          whileTap={{ scale: 0.97 }}
          onClick={onPaywall}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm flex items-center justify-center gap-2 mt-4 shadow-lg"
        >
          <Crown className="w-4 h-4" />
          {subscription.status === "pro_expired" ? "Реактивировать Pro" : "Перейти на Pro"}
        </motion.button>
      )}
    </motion.div>
  );
};

export default StatusView;
