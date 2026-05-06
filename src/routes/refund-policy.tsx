import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/refund-policy")({ component: RefundPage });

const ITEMS = [
  { i: "✕", t: "1. Cancellation", b: "Orders can be cancelled within a specific timeframe after placement. Contact us immediately at egnaromart@gmail.com." },
  { i: "🔄", t: "2. Return", b: "Products may be returned within the specified return window. Items must be unused and in original condition." },
  { i: "💰", t: "3. Refund", b: "Refunds are issued in the original form of payment within 5–7 business days." },
  { i: "⚠️", t: "4. Exceptions", b: "Certain product categories may have specific terms differing from the general policy." },
  { i: "📋", t: "5. Process", b: "Contact egnaromart@gmail.com or call (+91) 9442581506 with your order details." },
  { i: "⚖️", t: "6. Legal", b: "All policies comply with applicable Indian consumer protection laws." },
];

function RefundPage() {
  return (
    <div className="mx-auto mt-8 max-w-5xl px-4 pb-10">
      <Reveal>
        <div className="text-xs uppercase tracking-[0.2em] text-primary">Customer Care</div>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Return & <span className="text-gradient">Refund Policy</span></h1>
      </Reveal>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {ITEMS.map((s, i) => (
          <Reveal key={s.t} delay={i * 0.05}>
            <div className="glass border-gradient flex h-full gap-4 rounded-2xl p-6">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-primary/15 text-2xl shadow-glow">{s.i}</div>
              <div>
                <h2 className="font-display text-lg font-semibold">{s.t}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.b}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
