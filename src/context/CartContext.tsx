import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Product } from "@/lib/products";

export type CartItem = { product: Product; qty: number };

type CartCtx = {
  items: CartItem[];
  add: (p: Product, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  shipping: number;
  gst: number;
  total: number;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("egnaro_cart") : null;
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem("egnaro_cart", JSON.stringify(items)); } catch {}
  }, [items]);

  const add: CartCtx["add"] = (p, qty = 1) => {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.product.id === p.id);
      if (i >= 0) {
        const next = [...prev]; next[i] = { ...next[i], qty: next[i].qty + qty }; return next;
      }
      return [...prev, { product: p, qty }];
    });
  };
  const remove: CartCtx["remove"] = (id) => setItems((p) => p.filter((x) => x.product.id !== id));
  const setQty: CartCtx["setQty"] = (id, qty) =>
    setItems((p) => p.map((x) => (x.product.id === id ? { ...x, qty: Math.max(1, qty) } : x)));
  const clear = () => setItems([]);

  const count = items.reduce((s, x) => s + x.qty, 0);
  const subtotal = items.reduce((s, x) => s + x.product.price * x.qty, 0);
  const shipping = subtotal === 0 ? 0 : subtotal >= 999 ? 0 : 40;
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + gst;

  return (
    <Ctx.Provider value={{ items, add, remove, setQty, clear, count, subtotal, shipping, gst, total }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
}
