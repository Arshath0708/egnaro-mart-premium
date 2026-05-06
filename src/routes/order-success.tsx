import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import { inr } from "@/lib/products";

export const Route = createFileRoute("/order-success")({ component: SuccessPage });

function SuccessPage() {
  const [order, setOrder] = useState<{ name: string; total: number; items: number } | null>(null);
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("egnaro_last_order");
      if (raw) setOrder(JSON.parse(raw));
    } catch {}
  }, []);

  return (
    <div className="mx-auto mt-12 max-w-2xl px-4 pb-16 text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 14 }}
        className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-emerald-500/30 to-teal-500/20 shadow-glow">
        <svg viewBox="0 0 52 52" className="h-12 w-12">
          <circle cx="26" cy="26" r="24" fill="none" stroke="oklch(0.78 0.16 152)" strokeWidth="2" opacity="0.4" />
          <path className="draw-check" d="M14 27l8 8 16-18" fill="none" stroke="oklch(0.78 0.16 152)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>

      <h1 className="mt-8 font-display text-4xl font-bold sm:text-5xl text-gradient">Order Placed Successfully!</h1>
      <p className="mt-4 text-muted-foreground">Thank you {order?.name || "valued customer"}, your order has been received.</p>

      <div className="glass-strong mt-8 rounded-2xl p-6 text-left">
        <h2 className="font-display text-lg font-semibold">Order Summary</h2>
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Customer</span><span className="font-medium">{order?.name || "—"}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Items</span><span className="font-medium">{order?.items ?? "—"}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Total</span><span className="font-display text-lg font-bold text-gradient">{order ? inr(order.total) : "—"}</span></div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link to="/" className="btn-shimmer flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-6 py-3 font-semibold text-primary-foreground shadow-glow">
          Continue Shopping <ArrowRight className="h-4 w-4" />
        </Link>
        <a href="https://wa.me/919442581506?text=Hi%20I%20just%20placed%20an%20order%20on%20Egnaro%20Mart" target="_blank" rel="noreferrer"
          className="glass flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold hover:border-primary">
          <MessageCircle className="h-4 w-4 text-emerald-400" /> Contact on WhatsApp
        </a>
      </div>
    </div>
  );
}
