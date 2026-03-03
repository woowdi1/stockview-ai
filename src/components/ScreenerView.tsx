import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import TickerCard from "@/components/TickerCard";
import { mockTickers } from "@/data/tickers";

const SECTORS = ["All", "Technology", "Healthcare", "Finance", "Consumer"];

const ScreenerView = () => {
  const [search, setSearch] = useState("");
  const [sector, setSector] = useState("All");

  const filtered = mockTickers
    .filter((t) => {
      const matchSearch =
        !search ||
        t.symbol.toLowerCase().includes(search.toLowerCase()) ||
        t.name.toLowerCase().includes(search.toLowerCase());
      const matchSector = sector === "All" || t.sector === sector;
      return matchSearch && matchSector;
    })
    .sort((a, b) => b.score - a.score);

  return (
    <div className="flex-1 flex flex-col">
      <div className="px-4 pt-3 pb-2 space-y-2.5">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search ticker..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-8 pl-8 pr-3 rounded-lg bg-secondary text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <button className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
          {SECTORS.map((s) => (
            <button
              key={s}
              onClick={() => setSector(s)}
              className={`px-2.5 py-1 rounded-full text-[10px] font-medium whitespace-nowrap transition-colors ${
                sector === s
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-1.5 flex items-center justify-between">
        <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
          {filtered.length} tickers · sorted by score
        </span>
        <button className="flex items-center gap-0.5 text-[10px] text-muted-foreground hover:text-foreground transition-colors">
          <span className="font-mono">Score</span>
          <ChevronDown className="w-3 h-3" />
        </button>
      </div>

      <div className="flex-1 px-4 pb-6 space-y-2.5 overflow-y-auto">
        {filtered.map((ticker, i) => (
          <TickerCard key={ticker.symbol} ticker={ticker} index={i} />
        ))}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-muted-foreground text-sm"
          >
            No tickers found
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ScreenerView;
