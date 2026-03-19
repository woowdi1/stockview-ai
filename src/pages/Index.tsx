import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AppHeader from "@/components/AppHeader";
import HomeView from "@/components/HomeView";
import ScreenerView from "@/components/ScreenerView";
import TickerDetail from "@/components/TickerDetail";
import PaywallView from "@/components/PaywallView";
import StatusView from "@/components/StatusView";
import BotPreview from "@/components/BotPreview";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { Ticker } from "@/data/tickers";

type View = "home" | "screener" | "detail" | "paywall" | "status" | "bot";

const Index = () => {
  const [view, setView] = useState<View>("home");
  const [prevView, setPrevView] = useState<View>("home");
  const [selectedTicker, setSelectedTicker] = useState<Ticker | null>(null);
  const { activate } = useSubscription();

  const navigate = (to: View) => {
    setPrevView(view);
    setView(to);
  };

  const handleSelectTicker = (ticker: Ticker) => {
    setSelectedTicker(ticker);
    navigate("detail");
  };

  const handleBack = () => {
    if (view === "detail") navigate("screener");
    else if (view === "paywall") navigate(prevView === "detail" ? "detail" : prevView === "status" ? "status" : "home");
    else navigate("home");
  };

  const handlePaywallSuccess = () => {
    navigate("home");
  };

  const handleOpenMiniApp = (mode: "demo" | "premium") => {
    if (mode === "premium") activate();
    navigate("home");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      {view !== "bot" && (
        <AppHeader
          onStatus={() => navigate("status")}
          onPaywall={() => navigate("paywall")}
          onBotPreview={() => navigate("bot")}
        />
      )}

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
            <HomeView
              onLaunchScreener={() => navigate("screener")}
              onPaywall={() => navigate("paywall")}
            />
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
              onClick={() => navigate("home")}
              className="flex items-center gap-1 px-4 pt-2 text-xs text-muted-foreground hover:text-foreground transition-colors self-start"
            >
              <span className="text-sm">←</span>
              <span>Назад</span>
            </motion.button>
            <ScreenerView
              onSelectTicker={handleSelectTicker}
              onPaywall={() => navigate("paywall")}
            />
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
            <TickerDetail
              ticker={selectedTicker}
              onBack={() => navigate("screener")}
              onPaywall={() => navigate("paywall")}
            />
          </motion.div>
        )}
        {view === "paywall" && (
          <motion.div
            key="paywall"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col"
          >
            <PaywallView onBack={handleBack} onSuccess={handlePaywallSuccess} />
          </motion.div>
        )}
        {view === "status" && (
          <motion.div
            key="status"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col"
          >
            <StatusView
              onBack={() => navigate("home")}
              onPaywall={() => navigate("paywall")}
            />
          </motion.div>
        )}
        {view === "bot" && (
          <motion.div
            key="bot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col"
          >
            <BotPreview
              onBack={() => navigate("home")}
              onOpenMiniApp={handleOpenMiniApp}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
