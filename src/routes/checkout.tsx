import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Truck, QrCode, CreditCard, ArrowRight, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { inr } from "@/lib/products";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({ component: CheckoutPage });

type Pay = "cod" | "upi" | "ccavenue";

function CheckoutPage() {
  const { items, subtotal, shipping, gst, total, clear } = useCart();
  const navigate = useNavigate();
  const [pay, setPay] = useState<Pay>("cod");
  const [form, setForm] = useState({
    name: "", phone: "", email: "", address: "", city: "", state: "Tamil Nadu", pincode: "", gst: "", notes: "",
  });

  if (items.length === 0) {
    return (
      <div className="mx-auto mt-16 max-w-xl px-4 text-center">
        <div className="glass-strong rounded-3xl p-12">
          <h1 className="font-display text-2xl font-bold">Your cart is empty</h1>
          <Link to="/products" className="mt-6 inline-flex rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow">Shop now</Link>
        </div>
      </div>
    );
  }

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email || !form.address || !form.city || !form.pincode) {
      toast.error("Please fill all required fields"); return;
    }
    const order = { name: form.name, total, items: items.length };
    try { sessionStorage.setItem("egnaro_last_order", JSON.stringify(order)); } catch {}
    clear();
    navigate({ to: "/order-success" });
  };

  const upiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=egnaromart@okaxis%26pn=EgnaroMart%26am=${total}`;
  const waUrl = `https://wa.me/919442581506?text=Hi%20I%20paid%20for%20my%20order.%20Name:%20${encodeURIComponent(form.name || "[name]")}%20Total:%20₹${total}`;

  const Field = ({ label, k, type = "text", required = false, area = false }: { label: string; k: keyof typeof form; type?: string; required?: boolean; area?: boolean }) => (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted-foreground">{label}{required && <span className="text-primary"> *</span>}</span>
      {area ? (
        <textarea value={form[k]} onChange={(e) => set(k, e.target.value)} rows={3}
          className="ring-glow w-full rounded-xl border border-border bg-input/60 px-4 py-3 text-sm focus:border-primary" />
      ) : (
        <input type={type} required={required} value={form[k]} onChange={(e) => set(k, e.target.value)}
          className="ring-glow w-full rounded-xl border border-border bg-input/60 px-4 py-3 text-sm focus:border-primary" />
      )}
    </label>
  );

  return (
    <div className="mx-auto mt-8 max-w-7xl px-4 pb-10">
      <h1 className="mb-8 font-display text-3xl font-bold sm:text-4xl">Checkout</h1>

      <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <section className="glass-strong rounded-2xl p-6">
            <div className="flex items-center gap-3"><Step n={1} /> <h2 className="font-display text-lg font-semibold">Shipping Details</h2></div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Full Name" k="name" required />
              <Field label="Phone" k="phone" type="tel" required />
              <Field label="Email" k="email" type="email" required />
              <Field label="Pincode" k="pincode" required />
              <div className="sm:col-span-2"><Field label="Street Address" k="address" required /></div>
              <Field label="City" k="city" required />
              <Field label="State" k="state" />
              <div className="sm:col-span-2"><Field label="GST No (optional)" k="gst" /></div>
              <div className="sm:col-span-2"><Field label="Order Notes (optional)" k="notes" area /></div>
            </div>
          </section>

          <section className="glass-strong rounded-2xl p-6">
            <div className="flex items-center gap-3"><Step n={2} /> <h2 className="font-display text-lg font-semibold">Payment Method</h2></div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <PayCard active={pay === "cod"} onClick={() => setPay("cod")} icon={Truck} title="Cash on Delivery"
                desc="Pay when your order arrives. Available across Tamil Nadu." />
              <PayCard active={pay === "upi"} onClick={() => setPay("upi")} icon={QrCode} title="UPI"
                desc="Scan QR & pay instantly. Confirm via WhatsApp." />
              <PayCard active={pay === "ccavenue"} onClick={() => setPay("ccavenue")} icon={CreditCard} title="CCAvenue"
                desc="Pay via Credit Card, Debit Card or Net Banking through CCAvenue Secure Gateway." />
            </div>

            {pay === "upi" && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="glass mt-5 grid gap-5 rounded-2xl p-5 sm:grid-cols-[200px_1fr] sm:items-center">
                <img src={upiUrl} alt="UPI QR" className="h-[200px] w-[200px] rounded-xl bg-white p-2" />
                <div>
                  <div className="text-sm text-muted-foreground">UPI ID</div>
                  <div className="font-display text-xl font-bold text-gradient">egnaromart@okaxis</div>
                  <div className="mt-2 text-sm text-muted-foreground">Amount: <span className="font-semibold text-foreground">{inr(total)}</span></div>
                  <a href={waUrl} target="_blank" rel="noreferrer"
                    className="btn-shimmer mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-glow">
                    <MessageCircle className="h-4 w-4" /> Confirm on WhatsApp
                  </a>
                </div>
              </motion.div>
            )}
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4"><Step n={3} /> <h2 className="font-display text-lg font-semibold">Place Order</h2></div>
            <button type="submit" className="btn-shimmer flex w-full items-center justify-center gap-2 rounded-full bg-gradient-primary py-4 font-semibold text-primary-foreground shadow-glow animate-pulse-glow">
              Place Order <ArrowRight className="h-4 w-4" />
            </button>
          </section>
        </div>

        <aside className="glass-strong h-fit rounded-2xl p-6 lg:sticky lg:top-28">
          <h2 className="font-display text-lg font-semibold">Summary</h2>
          <div className="mt-4 space-y-2.5 text-sm">
            {items.map((it) => (
              <div key={it.product.id} className="flex justify-between gap-2">
                <span className="line-clamp-1 text-muted-foreground">{it.product.name} × {it.qty}</span>
                <span className="font-medium">{inr(it.product.price * it.qty)}</span>
              </div>
            ))}
            <div className="my-3 h-px bg-border" />
            <Row k="Subtotal" v={inr(subtotal)} />
            <Row k="Shipping" v={shipping === 0 ? <span className="text-success">FREE</span> : inr(shipping)} />
            <Row k="GST 18%" v={inr(gst)} />
            <div className="my-3 h-px bg-border" />
            <div className="flex justify-between">
              <span className="font-display font-semibold">Grand Total</span>
              <span className="font-display text-xl font-bold text-gradient">{inr(total)}</span>
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
}

function Step({ n }: { n: number }) {
  return <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-primary text-xs font-bold text-primary-foreground shadow-glow">{n}</div>;
}
function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return <div className="flex justify-between text-muted-foreground"><span>{k}</span><span className="font-medium text-foreground">{v}</span></div>;
}
function PayCard({ active, onClick, icon: Icon, title, desc }: any) {
  return (
    <button type="button" onClick={onClick}
      className={`glass relative flex flex-col items-start gap-2 rounded-2xl p-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-glow ${active ? "border-primary shadow-glow" : ""}`}>
      <div className={`grid h-10 w-10 place-items-center rounded-xl transition-all ${active ? "bg-gradient-primary text-primary-foreground shadow-glow" : "bg-surface-2 text-primary"}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="font-display font-semibold">{title}</div>
      <div className="text-xs text-muted-foreground">{desc}</div>
      <span className={`absolute right-4 top-4 h-3 w-3 rounded-full border-2 ${active ? "border-primary bg-gradient-primary" : "border-border"}`} />
    </button>
  );
}
