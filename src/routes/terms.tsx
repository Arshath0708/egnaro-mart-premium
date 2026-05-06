import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/terms")({ component: TermsPage });

const SECTIONS = [
  { t: "1. Introduction", b: "By accessing egnaromart.com you agree to be bound by these terms and conditions and our privacy policy." },
  { t: "2. Changes to Agreement", b: "We may modify these terms at any time by posting updates on our website. Continued use of our website following any changes means you accept the updated terms." },
  { t: "3. Payment, Cancellation and Refund Policy", b: "In case of any payment failure, email us at infoegnaromart@gmail.com. Payments can be made in INR via Net Banking, Visa Card, Master Card, or UPI." },
  { t: "3.1 Billing", b: "All payment transactions are processed through secure payment gateway providers. We do not store card information on our servers. After successful payment, an official receipt is provided via email." },
  { t: "4. Merchant Policy", b: "Merchants who attempt to conduct business with clients directly outside of Egnaro Mart will be immediately removed and held responsible for resulting losses." },
];

function TermsPage() {
  return (
    <div className="mx-auto mt-8 max-w-4xl px-4 pb-10">
      <Reveal>
        <div className="text-xs uppercase tracking-[0.2em] text-primary">Legal</div>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Terms & Conditions — <span className="text-gradient">Egnaro Mart</span></h1>
        <p className="mt-4 text-muted-foreground">Welcome to Egnaro Mart. The terms below outline the legal rights of Egnaro Mart and our users, explain the rights you give to us when using our services, and describe the rules everyone needs to follow for payment and refunds. Please read carefully.</p>
      </Reveal>
      <div className="mt-10 space-y-4">
        {SECTIONS.map((s, i) => (
          <Reveal key={s.t} delay={i * 0.05}>
            <div className="glass rounded-2xl p-6">
              <h2 className="font-display text-lg font-semibold text-foreground">{s.t}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.b}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
