import { motion } from "framer-motion";
import { Crown, Check, Zap, ArrowLeft, Shield, BarChart3, Star, Infinity } from "lucide-react";
import { useSubscription } from "@/contexts/SubscriptionContext";

interface PaywallViewProps {
  onBack: () => void;
  onSuccess: () => void;
}

const features = [
  { icon: BarChart3, text: "Все метрики без ограничений" },
  { icon: Infinity, text: "Неограниченный скрининг тикеров" },
  { icon: Star, text: "Детальный анализ каждой акции" },
  { icon: Shield, text: "Приоритетная поддержка" },
];

const plans = [
  {
    id: "monthly",
    label: "Месяц",
    price: "299 ₽",
    period: "/мес",
    popular: false,
  },
  {
    id: "yearly",
    label: "Год",
    price: "2 399 ₽",
    period: "/год",
    popular: true,
    badge: "−33%",
  },
];

const PaywallView = ({ onBack, onSuccess }: PaywallViewProps) => {
  const { activate } = useSubscription();

  const handlePurchase = () => {
    // Demo: simulate Tribute checkout → success
    activate();
    onSuccess();
  };

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

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col items-center mt-4 mb-6"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-4 shadow-lg">
          <Crown className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Invest.View Pro</h2>
        <p className="text-xs text-muted-foreground mt-1.5 text-center max-w-[240px] leading-relaxed">
          Разблокируйте полный доступ к профессиональному анализу акций
        </p>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-xl p-4 mb-5 space-y-3"
      >
        {features.map(({ icon: Icon, text }, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-amber-500/15 flex items-center justify-center shrink-0">
              <Icon className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <span className="text-xs text-foreground font-medium">{text}</span>
            <Check className="w-3.5 h-3.5 text-gain ml-auto shrink-0" />
          </div>
        ))}
      </motion.div>

      {/* Plans */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 gap-2.5 mb-5"
      >
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative glass rounded-xl p-3.5 text-center cursor-pointer transition-all ${
              plan.popular
                ? "ring-2 ring-amber-500/50 bg-amber-500/5"
                : "hover:bg-secondary/50"
            }`}
          >
            {plan.badge && (
              <span className="absolute -top-2 right-2 text-[9px] font-bold bg-amber-500 text-white px-1.5 py-0.5 rounded-full">
                {plan.badge}
              </span>
            )}
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
              {plan.label}
            </p>
            <p className="font-mono font-bold text-lg text-foreground">{plan.price}</p>
            <p className="text-[10px] text-muted-foreground">{plan.period}</p>
          </div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.button
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        whileTap={{ scale: 0.97 }}
        onClick={handlePurchase}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg active:brightness-90 transition-all"
      >
        <Zap className="w-4 h-4" />
        Оформить подписку
      </motion.button>

      <p className="text-center text-[9px] text-muted-foreground mt-3 font-mono">
        Оплата через Tribute · Отмена в любой момент
      </p>
    </motion.div>
  );
};

export default PaywallView;
