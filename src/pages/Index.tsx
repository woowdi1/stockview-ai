import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AppHeader from "@/components/AppHeader";
import HomeView from "@/components/HomeView";
import ScreenerView from "@/components/ScreenerView";
import { ArrowLeft } from "lucide-react";

const Index = () => {
  const [view, setView] = useState<"home" | "screener">("home");

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      <AppHeader />

      {view === "screener" && (
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setView("home")}
          className="flex items-center gap-1 px-4 pt-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Назад</span>
        </motion.button>
      )}

      <AnimatePresence mode="wait">
        {view === "home" ? (
          <motion.div
            key="home"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col"
          >
            <HomeView onLaunchScreener={() => setView("screener")} />
          </motion.div>
        ) : (
          <motion.div
            key="screener"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col"
          >
            <ScreenerView />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
