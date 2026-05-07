import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Truck, QrCode, CreditCard, ArrowRight, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { inr } from "@/lib/products";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({ component: CheckoutPage });

type Pay = "cod" | "upi" | "ccavenue";

type FormState = {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  gst: string;
  notes: string;
};

// ✅ MOVED OUTSIDE — fixes typing/focus loss issue
function Field({
  label,
  fieldKey,
  value,
  onChange,
  type = "text",
  required = false,
  area = false,
}: {
  label: string;
  fieldKey: keyof FormState;
  value: string;
  onChange: (k: keyof FormState, v: string) => void;
  type?: string;
  required?: boolean;
  area?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {label}
        {required && <span className="text-primary"> *</span>}
      </span>
      {area ? (
        <textarea
          value={value}
          onChange={(e) => onChange(fieldKey, e.target.value)}
          rows={3}
          className="ring-glow w-full rounded-xl border border-border bg-input/60 px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
        />
      ) : (
        <input
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(fieldKey, e.target.value)}
          className="ring-glow w-full rounded-xl border border-border bg-input/60 px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
        />
      )}
    </label>
  );
}

function CheckoutPage() {
  const { items, subtotal, shipping, gst, total, clear } = useCart();
  const navigate = useNavigate();
  const [pay, setPay] = useState<Pay>("cod");
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "Tamil Nadu",
    pincode: "",
    gst: "",
    notes: "",
  });

  if (items.length === 0) {
    return (
      <div className="mx-auto mt-16 max-w-xl px-4 text-center">
        <div className="glass-strong rounded-3xl p-12">
          <h1 className="font-display text-2xl font-bold">Your cart is empty</h1>
          <Link
            to="/products"
            className="mt-6 inline-flex rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow"
          >
            Shop now
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (k: keyof FormState, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.phone ||
      !form.email ||
      !form.address ||
      !form.city ||
      !form.pincode
    ) {
      toast.error("Please fill all required fields");
      return;
    }
    const order = { name: form.name, total, items: items.length };
    try {
      sessionStorage.setItem("egnaro_last_order", JSON.stringify(order));
    } catch {}
    clear();
    navigate({ to: "/order-success" });
  };

  // ✅ FIXED — UPI data properly encoded so QR renders correctly
  const upiData = encodeURIComponent(
    `upi://pay?pa=egnaromart@okaxis&pn=EgnaroMart&am=${total}&cu=INR`
  );
  const upiQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=samsonelectronics50@oksbi&pn=EgnaroMart&am=${upiData}`;

  const waUrl = `https://wa.me/919442581506?text=Hi%20I%20paid%20for%20my%20order.%20Name:%20${encodeURIComponent(
    form.name || "[name]"
  )}%20Total:%20%E2%82%B9${total}`;

  return (
    <div className="mx-auto mt-8 max-w-7xl px-4 pb-16">
      <h1 className="mb-8 font-display text-3xl font-bold sm:text-4xl">
        Checkout
      </h1>

      <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[1fr_380px]">
        {/* LEFT COLUMN */}
        <div className="space-y-6">

          {/* STEP 1 — SHIPPING */}
          <section className="glass-strong rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <Step n={1} />
              <h2 className="font-display text-lg font-semibold">Shipping Details</h2>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Full Name" fieldKey="name" value={form.name} onChange={handleChange} required />
              <Field label="Phone" fieldKey="phone" value={form.phone} onChange={handleChange} type="tel" required />
              <Field label="Email" fieldKey="email" value={form.email} onChange={handleChange} type="email" required />
              <Field label="Pincode" fieldKey="pincode" value={form.pincode} onChange={handleChange} required />
              <div className="sm:col-span-2">
                <Field label="Street Address" fieldKey="address" value={form.address} onChange={handleChange} required />
              </div>
              <Field label="City" fieldKey="city" value={form.city} onChange={handleChange} required />
              <Field label="State" fieldKey="state" value={form.state} onChange={handleChange} />
              <div className="sm:col-span-2">
                <Field label="GST No (optional)" fieldKey="gst" value={form.gst} onChange={handleChange} />
              </div>
              <div className="sm:col-span-2">
                <Field label="Order Notes (optional)" fieldKey="notes" value={form.notes} onChange={handleChange} area />
              </div>
            </div>
          </section>

          {/* STEP 2 — PAYMENT */}
          <section className="glass-strong rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <Step n={2} />
              <h2 className="font-display text-lg font-semibold">Payment Method</h2>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <PayCard
                active={pay === "cod"}
                onClick={() => setPay("cod")}
                icon={Truck}
                title="Cash on Delivery"
                desc="Pay when your order arrives. Available across Tamil Nadu."
              />
              <PayCard
                active={pay === "upi"}
                onClick={() => setPay("upi")}
                icon={QrCode}
                title="UPI Payment"
                desc="Scan QR & pay instantly via GPay, PhonePe or any UPI app."
              />
              <PayCard
                active={pay === "ccavenue"}
                onClick={() => setPay("ccavenue")}
                icon={CreditCard}
                title="CCAvenue"
                desc="Pay via Credit Card, Debit Card or Net Banking through CCAvenue Secure Gateway."
              />
            </div>

            {/* UPI QR SECTION */}
            {pay === "upi" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="glass mt-5 rounded-2xl p-6"
              >
                <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                  <div className="flex flex-col items-center gap-3">
                    <div className="rounded-2xl bg-white p-3 shadow-glow">
                      <img
                        src={upiQrUrl}
                        alt="UPI QR Code"
                        width={200}
                        height={200}
                        className="h-[200px] w-[200px] rounded-xl"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=egnaromart@okaxis";
                        }}
                      />
                    </div>
                    <p className="text-center text-xs text-muted-foreground">
                      Scan with any UPI app
                    </p>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">UPI ID</p>
                      <p className="font-display text-lg font-bold text-gradient">egnaromart@okaxis</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">Amount to Pay</p>
                      <p className="font-display text-2xl font-bold">{inr(total)}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      After paying, click the button below to send your payment screenshot on WhatsApp for confirmation.
                    </p>
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-shimmer inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-glow"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Send Payment Screenshot
                    </a>
                  </div>
                </div>
              </motion.div>
            )}

            {/* CCAVENUE INFO */}
            {pay === "ccavenue" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="glass mt-5 rounded-2xl p-5"
              >
                <p className="text-sm text-muted-foreground">
                  You will be redirected to the CCAvenue secure payment gateway after placing your order. Supports Visa, Mastercard, Net Banking, and UPI.
                </p>
              </motion.div>
            )}
          </section>

          {/* STEP 3 — PLACE ORDER */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <Step n={3} />
              <h2 className="font-display text-lg font-semibold">Place Order</h2>
            </div>
            <button
              type="submit"
              className="btn-shimmer flex w-full items-center justify-center gap-2 rounded-full bg-gradient-primary py-4 font-semibold text-primary-foreground shadow-glow"
            >
              Place Order <ArrowRight className="h-4 w-4" />
            </button>
          </section>
        </div>

        {/* RIGHT — ORDER SUMMARY */}
        <aside className="glass-strong h-fit rounded-2xl p-6 lg:sticky lg:top-28">
          <h2 className="font-display text-lg font-semibold">Order Summary</h2>
          <div className="mt-4 space-y-2.5 text-sm">
            {items.map((it) => (
              <div key={it.product.id} className="flex justify-between gap-2">
                <span className="line-clamp-1 text-muted-foreground">
                  {it.product.name} × {it.qty}
                </span>
                <span className="font-medium">{inr(it.product.price * it.qty)}</span>
              </div>
            ))}
            <div className="my-3 h-px bg-border" />
            <Row k="Subtotal" v={inr(subtotal)} />
            <Row
              k="Shipping"
              v={
                shipping === 0 ? (
                  <span className="font-semibold text-emerald-400">FREE</span>
                ) : (
                  inr(shipping)
                )
              }
            />
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
  return (
    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-primary text-xs font-bold text-primary-foreground shadow-glow">
      {n}
    </div>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex justify-between text-muted-foreground">
      <span>{k}</span>
      <span className="font-medium text-foreground">{v}</span>
    </div>
  );
}

function PayCard({
  active,
  onClick,
  icon: Icon,
  title,
  desc,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ElementType;
  title: string;
  desc: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`glass relative flex flex-col items-start gap-2 rounded-2xl p-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-glow ${
        active ? "border border-primary shadow-glow" : "border border-border"
      }`}
    >
      <div
        className={`grid h-10 w-10 place-items-center rounded-xl transition-all ${
          active
            ? "bg-gradient-primary text-primary-foreground shadow-glow"
            : "bg-surface-2 text-primary"
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="font-display font-semibold">{title}</div>
      <div className="text-xs text-muted-foreground">{desc}</div>
      <span
        className={`absolute right-4 top-4 h-3 w-3 rounded-full border-2 transition-all ${
          active ? "border-primary bg-primary" : "border-border"
        }`}
      />
    </button>
  );
}