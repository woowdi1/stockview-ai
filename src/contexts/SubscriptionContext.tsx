import { createContext, useContext, useState, ReactNode } from "react";

export type SubscriptionStatus = "demo" | "pro_active" | "pro_cancelled" | "pro_expired";

export interface SubscriptionState {
  status: SubscriptionStatus;
  paidUntil: Date | null;
  telegramId: string;
  username: string;
}

interface SubscriptionContextType {
  subscription: SubscriptionState;
  isPro: boolean;
  activate: () => void;
  cancel: () => void;
  expire: () => void;
  reset: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | null>(null);

export const useSubscription = () => {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) throw new Error("useSubscription must be used within SubscriptionProvider");
  return ctx;
};

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const [subscription, setSubscription] = useState<SubscriptionState>({
    status: "demo",
    paidUntil: null,
    telegramId: "123456789",
    username: "demo_user",
  });

  const isPro = subscription.status === "pro_active" || subscription.status === "pro_cancelled";

  const activate = () =>
    setSubscription((s) => ({
      ...s,
      status: "pro_active",
      paidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    }));

  const cancel = () =>
    setSubscription((s) => ({ ...s, status: "pro_cancelled" }));

  const expire = () =>
    setSubscription((s) => ({ ...s, status: "pro_expired", paidUntil: null }));

  const reset = () =>
    setSubscription((s) => ({ ...s, status: "demo", paidUntil: null }));

  return (
    <SubscriptionContext.Provider value={{ subscription, isPro, activate, cancel, expire, reset }}>
      {children}
    </SubscriptionContext.Provider>
  );
};
