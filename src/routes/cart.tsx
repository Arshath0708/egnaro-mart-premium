import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { inr } from "@/lib/products";

export const Route = createFileRoute("/cart")({ component: CartPage });

function CartPage() {
  const { items, setQty, remove, subtotal, shipping, gst, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto mt-16 max-w-xl px-4 text-center">
        <div className="glass-strong rounded-3xl p-12">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-primary/15 text-primary"><ShoppingBag className="h-7 w-7" /></div>
          <h1 className="mt-6 font-display text-2xl font-bold">Your cart is empty</h1>
          <p className="mt-2 text-sm text-muted-foreground">Discover premium electronics, hardware and industrial goods.</p>
          <Link to="/products" className="btn-shimmer mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow">
            Start Shopping <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-8 max-w-7xl px-4 pb-10">
      <h1 className="mb-8 font-display text-3xl font-bold sm:text-4xl">Your Cart</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-3">
          {items.map((it, i) => (
            <motion.div key={it.product.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="glass flex items-center gap-4 rounded-2xl p-4">
              <Link to="/product/$id" params={{ id: it.product.id }} className="overflow-hidden rounded-xl">
                <img src={it.product.image} alt="" className="h-20 w-20 object-cover transition-transform hover:scale-110 sm:h-24 sm:w-24" />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{it.product.category}</div>
                <Link to="/product/$id" params={{ id: it.product.id }} className="line-clamp-1 font-display font-semibold hover:text-primary">{it.product.name}</Link>
                <div className="mt-1 font-display text-lg font-bold text-gradient">{inr(it.product.price)}</div>
              </div>
              <div className="glass flex items-center rounded-full">
                <button onClick={() => setQty(it.product.id, it.qty - 1)} className="grid h-9 w-9 place-items-center"><Minus className="h-3.5 w-3.5" /></button>
                <span className="w-8 text-center text-sm font-semibold">{it.qty}</span>
                <button onClick={() => setQty(it.product.id, it.qty + 1)} className="grid h-9 w-9 place-items-center"><Plus className="h-3.5 w-3.5" /></button>
              </div>
              <button onClick={() => remove(it.product.id)} className="grid h-10 w-10 place-items-center rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
            </motion.div>
          ))}
        </div>

        <aside className="glass-strong h-fit rounded-2xl p-6 lg:sticky lg:top-28">
          <h2 className="font-display text-lg font-semibold">Order Summary</h2>
          <div className="mt-5 space-y-3 text-sm">
            <Row k="Subtotal" v={inr(subtotal)} />
            <Row k="Shipping" v={shipping === 0 ? <span className="text-success">FREE</span> : inr(shipping)} />
            <Row k="GST 18%" v={inr(gst)} />
            <div className="my-3 h-px bg-border" />
            <div className="flex justify-between">
              <span className="font-display text-base font-semibold">Grand Total</span>
              <span className="font-display text-xl font-bold text-gradient">{inr(total)}</span>
            </div>
          </div>
          <Link to="/checkout" className="btn-shimmer group mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-primary py-3.5 font-semibold text-primary-foreground shadow-glow">
            Proceed to Checkout <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          {subtotal < 999 && <p className="mt-3 text-center text-xs text-muted-foreground">Add {inr(999 - subtotal)} more for FREE shipping.</p>}
        </aside>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return <div className="flex justify-between text-muted-foreground"><span>{k}</span><span className="font-medium text-foreground">{v}</span></div>;
}
