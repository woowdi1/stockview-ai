import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Send,
  Bot,
  Crown,
  Zap,
  BarChart3,
  User,
  ExternalLink,
  CheckCheck,
} from "lucide-react";

interface BotPreviewProps {
  onBack: () => void;
  onOpenMiniApp: (mode: "demo" | "premium") => void;
}

type InlineButton = {
  text: string;
  icon?: React.ReactNode;
  action: string;
  url?: boolean;
};

type Message = {
  id: number;
  from: "bot" | "user";
  text: string;
  time: string;
  buttons?: InlineButton[][];
  typing?: boolean;
};

const BOT_NAME = "Invest.View Bot";
const BOT_USERNAME = "@investview_bot";

const now = () => {
  const d = new Date();
  return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
};

const WELCOME_MESSAGE: Message = {
  id: 1,
  from: "bot",
  text: "👋 Привет! Я — Invest.View Bot.\n\nАнализирую фондовый рынок по 5 метрикам и выдаю единый Score каждой акции.\n\nВыберите действие:",
  time: now(),
  buttons: [
    [
      { text: "🚀 Попробовать демо", icon: undefined, action: "demo" },
      { text: "⭐ Купить Pro", icon: undefined, action: "buy_pro" },
    ],
    [
      { text: "📊 Мой статус", icon: undefined, action: "status" },
    ],
  ],
};

const BotPreview = ({ onBack, onOpenMiniApp }: BotPreviewProps) => {
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(2);

  const handleStart = () => {
    setStarted(true);
    setMessages([WELCOME_MESSAGE]);
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const addBotMessage = (text: string, buttons?: InlineButton[][], delay = 800) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: nextId.current++, from: "bot", text, time: now(), buttons },
      ]);
    }, delay);
  };

  const addUserAction = (label: string) => {
    setMessages((prev) => [
      ...prev,
      { id: nextId.current++, from: "user", text: label, time: now() },
    ]);
  };

  const handleButton = (action: string, label: string) => {
    addUserAction(label);

    switch (action) {
      case "demo":
        addBotMessage(
          "🔍 Отлично! Открываю демо-версию скриннера.\n\nВ демо-режиме доступно:\n• 3 тикера из полного списка\n• 2 из 5 метрик анализа\n• Базовый график цены\n\nДля полного доступа — оформите Pro ⭐",
          [
            [{ text: "📱 Открыть Mini App", action: "open_demo", url: true }],
            [{ text: "⭐ Хочу Pro", action: "buy_pro" }, { text: "🔙 Назад", action: "start" }],
          ]
        );
        break;

      case "buy_pro":
        addBotMessage(
          "⭐ Invest.View Pro — полный доступ\n\n✅ Все тикеры без ограничений\n✅ 5 детальных метрик\n✅ Расширенный анализ\n✅ Приоритетная поддержка\n\n💰 Тарифы:\n• Месяц: 299 ₽/мес\n• Год: 2 399 ₽/год (−33%)\n\nОплата через Tribute — безопасно и удобно.",
          [
            [{ text: "💳 Оформить за 299 ₽/мес", action: "pay_monthly" }],
            [{ text: "💳 Оформить за 2 399 ₽/год", action: "pay_yearly" }],
            [{ text: "🔙 Назад", action: "start" }],
          ]
        );
        break;

      case "status":
        addBotMessage(
          "📊 Ваш статус:\n\n👤 Пользователь: @demo_user\n🆔 ID: 123456789\n📋 Тариф: Бесплатный (Демо)\n\n⏰ Лимиты:\n• Тикеров: 3 / ∞\n• Метрик: 2 / 5\n\nХотите разблокировать все возможности?",
          [
            [{ text: "⭐ Перейти на Pro", action: "buy_pro" }],
            [{ text: "📱 Открыть приложение", action: "open_demo", url: true }],
            [{ text: "🔙 Назад", action: "start" }],
          ]
        );
        break;

      case "pay_monthly":
      case "pay_yearly":
        const plan = action === "pay_monthly" ? "299 ₽/мес" : "2 399 ₽/год";
        addBotMessage(
          `💳 Переход к оплате...\n\nТариф: Pro (${plan})\nСистема: Tribute\n\n⏳ После успешной оплаты ваш статус обновится автоматически.`,
          [
            [{ text: "✅ Симулировать оплату", action: "payment_success" }],
            [{ text: "❌ Отмена", action: "buy_pro" }],
          ],
          600
        );
        break;

      case "payment_success":
        addBotMessage(
          "🎉 Оплата прошла успешно!\n\n✅ Ваш статус: Pro Active\n📅 Активна до: " +
            new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("ru-RU") +
            "\n\nТеперь вам доступны все функции Invest.View. Приятного пользования! 🚀",
          [
            [{ text: "📱 Открыть Mini App (Pro)", action: "open_premium", url: true }],
            [{ text: "📊 Мой статус", action: "status_pro" }],
          ],
          1000
        );
        break;

      case "status_pro":
        addBotMessage(
          "📊 Ваш статус:\n\n👤 Пользователь: @demo_user\n🆔 ID: 123456789\n📋 Тариф: ⭐ Pro Active\n📅 Активна до: " +
            new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("ru-RU") +
            "\n\n✅ Все функции разблокированы",
          [
            [{ text: "📱 Открыть приложение", action: "open_premium", url: true }],
            [{ text: "❌ Отменить подписку", action: "cancel_sub" }],
            [{ text: "🔙 Назад", action: "start" }],
          ]
        );
        break;

      case "cancel_sub":
        addBotMessage(
          "⚠️ Вы уверены, что хотите отменить подписку?\n\nДоступ сохранится до конца оплаченного периода. После этого аккаунт вернётся в демо-режим.",
          [
            [{ text: "✅ Да, отменить", action: "confirm_cancel" }],
            [{ text: "🔙 Нет, оставить", action: "status_pro" }],
          ]
        );
        break;

      case "confirm_cancel":
        addBotMessage(
          "📋 Подписка отменена.\n\nВаш Pro-доступ сохраняется до " +
            new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("ru-RU") +
            ".\n\nВы всегда можете реактивировать подписку.",
          [
            [{ text: "🔄 Реактивировать", action: "buy_pro" }],
            [{ text: "📱 Открыть приложение", action: "open_premium", url: true }],
          ]
        );
        break;

      case "open_demo":
        onOpenMiniApp("demo");
        break;

      case "open_premium":
        onOpenMiniApp("premium");
        break;

      case "start":
        addBotMessage(
          WELCOME_MESSAGE.text,
          WELCOME_MESSAGE.buttons
        );
        break;

      default:
        break;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="flex-1 flex flex-col overflow-hidden"
    >
      {/* Telegram-style header */}
      <div className="bg-[hsl(210,50%,40%)] px-3 py-2.5 flex items-center gap-3">
        <button onClick={onBack} className="text-white/80 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="w-9 h-9 rounded-full bg-[hsl(210,50%,50%)] flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-white">{BOT_NAME}</p>
          <p className="text-[10px] text-white/60">bot · last seen recently</p>
        </div>
      </div>

      {!started ? (
        /* Pre-start welcome screen */
        <div
          className="flex-1 flex flex-col items-center justify-center px-6"
          style={{ background: "hsl(210, 15%, 92%)" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 rounded-full bg-[hsl(210,50%,50%)] flex items-center justify-center mb-4 shadow-lg">
              <Bot className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">{BOT_NAME}</h2>
            <p className="text-xs text-gray-500 font-mono mt-0.5">{BOT_USERNAME}</p>
            <p className="text-sm text-gray-600 mt-4 leading-relaxed max-w-[260px]">
              AI-скриннер фондового рынка. Анализирую акции по 5 метрикам и выдаю единый Score.
            </p>
            <div className="flex flex-wrap justify-center gap-1.5 mt-4">
              {["📊 Скрининг акций", "⭐ Pro-аналитика", "📱 Mini App"].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2.5 py-1 rounded-full bg-white text-gray-600 shadow-sm border border-gray-100"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-[10px] text-gray-400 mt-5 font-mono">
              12.4K подписчиков · бот
            </p>
          </motion.div>
        </div>
      ) : (
        /* Chat area */
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-3 py-3 space-y-2"
          style={{ background: "hsl(210, 15%, 92%)" }}
        >
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} onButton={handleButton} />
          ))}

          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-end gap-1.5"
              >
                <div className="w-7 h-7 rounded-full bg-[hsl(210,50%,50%)] flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="bg-white rounded-2xl rounded-bl-md px-4 py-2.5 shadow-sm">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-gray-400"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Bottom bar: START button or input */}
      {!started ? (
        <div className="bg-white border-t border-gray-200 px-4 py-3">
          <button
            onClick={handleStart}
            className="w-full py-3 rounded-xl bg-[hsl(210,50%,45%)] text-white font-semibold text-sm active:brightness-90 transition-all shadow-md"
          >
            СТАРТ
          </button>
        </div>
      ) : (
        <div className="bg-white border-t border-gray-200 px-3 py-2 flex items-center gap-2">
          <input
            type="text"
            placeholder="Сообщение..."
            disabled
            className="flex-1 h-9 px-3 rounded-full bg-gray-100 text-sm text-gray-500 placeholder:text-gray-400"
          />
          <button disabled className="w-9 h-9 rounded-full bg-[hsl(210,50%,45%)] flex items-center justify-center opacity-40">
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      )}
    </motion.div>
  );
};

const MessageBubble = ({
  message,
  onButton,
}: {
  message: Message;
  onButton: (action: string, label: string) => void;
}) => {
  const isBot = message.from === "bot";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25 }}
      className={`flex items-end gap-1.5 ${isBot ? "" : "justify-end"}`}
    >
      {isBot && (
        <div className="w-7 h-7 rounded-full bg-[hsl(210,50%,50%)] flex items-center justify-center shrink-0">
          <Bot className="w-3.5 h-3.5 text-white" />
        </div>
      )}
      <div className={`max-w-[85%] ${isBot ? "" : "order-first"}`}>
        <div
          className={`rounded-2xl px-3.5 py-2.5 shadow-sm ${
            isBot
              ? "bg-white rounded-bl-md"
              : "bg-[hsl(210,50%,45%)] text-white rounded-br-md"
          }`}
        >
          <p className="text-[13px] leading-relaxed whitespace-pre-line">
            {message.text}
          </p>
          <p
            className={`text-[10px] mt-1 text-right flex items-center justify-end gap-1 ${
              isBot ? "text-gray-400" : "text-white/60"
            }`}
          >
            {message.time}
            {!isBot && <CheckCheck className="w-3 h-3" />}
          </p>
        </div>

        {/* Inline keyboard buttons */}
        {message.buttons && (
          <div className="mt-1 space-y-1">
            {message.buttons.map((row, ri) => (
              <div key={ri} className="flex gap-1">
                {row.map((btn) => (
                  <button
                    key={btn.action}
                    onClick={() => onButton(btn.action, btn.text)}
                    className="flex-1 py-2 px-2 rounded-lg bg-white border border-gray-200 text-[12px] font-medium text-[hsl(210,50%,45%)] hover:bg-gray-50 active:bg-gray-100 transition-colors flex items-center justify-center gap-1 shadow-sm"
                  >
                    {btn.text}
                    {btn.url && <ExternalLink className="w-3 h-3 opacity-50" />}
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BotPreview;
