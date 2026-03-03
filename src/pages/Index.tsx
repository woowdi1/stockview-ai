import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AppHeader from "@/components/AppHeader";
import HomeView from "@/components/HomeView";
import ScreenerView from "@/components/ScreenerView";
import TickerDetail from "@/components/TickerDetail";
import { Ticker } from "@/data/tickers";

type View = "home" | "screener" | "detail";

const Index = () => {
  const [view, setView] = useState<View>("home");
  const [selectedTicker, setSelectedTicker] = useState<Ticker | null>(null);

  const handleSelectTicker = (ticker: Ticker) => {
    setSelectedTicker(ticker);
    setView("detail");
  };

  const handleBack = () => {
    if (view === "detail") setView("screener");
    else setView("home");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      <AppHeader />

      <AnimatePresence mode="wait">
        {view === "home" && (
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
        )}
        {view === "screener" && (
          <motion.div
            key="screener"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col"
          >
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={handleBack}
              className="flex items-center gap-1 px-4 pt-2 text-xs text-muted-foreground hover:text-foreground transition-colors self-start"
            >
              <span className="text-sm">←</span>
              <span>Назад</span>
            </motion.button>
            <ScreenerView onSelectTicker={handleSelectTicker} />
          </motion.div>
        )}
        {view === "detail" && selectedTicker && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col"
          >
            <TickerDetail ticker={selectedTicker} onBack={handleBack} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
