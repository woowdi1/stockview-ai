import { motion } from "framer-motion";
import { Lock, Crown, ArrowRight } from "lucide-react";

interface PremiumGateProps {
  feature: string;
  onUpgrade: () => void;
}

const PremiumGate = ({ feature, onUpgrade }: PremiumGateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-xl p-5 flex flex-col items-center text-center"
    >
      <div className="w-10 h-10 rounded-full bg-amber-500/15 flex items-center justify-center mb-3">
        <Lock className="w-5 h-5 text-amber-500" />
      </div>
      <p className="text-xs font-semibold text-foreground mb-1">Функция Pro</p>
      <p className="text-[10px] text-muted-foreground mb-4 max-w-[200px] leading-relaxed">
        {feature} доступна только в Pro-версии
      </p>
      <button
        onClick={onUpgrade}
        className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[11px] font-semibold shadow-md"
      >
        <Crown className="w-3.5 h-3.5" />
        Разблокировать
        <ArrowRight className="w-3 h-3" />
      </button>
    </motion.div>
  );
};

export default PremiumGate;
