import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Quote } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/about")({ component: AboutPage });

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = Date.now(); const dur = 1600;
    const id = setInterval(() => {
      const p = Math.min(1, (Date.now() - start) / dur);
      setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
      if (p === 1) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [inView, to]);
  return <span ref={ref}>{n.toLocaleString("en-IN")}{suffix}</span>;
}

function AboutPage() {
  const stats = [
    { n: 25, s: "+", l: "Years Experience" },
    { n: 3000, s: "+", l: "Happy Customers" },
    { n: 500, s: "+", l: "Products" },
    { n: 100, s: "%", l: "Quality Assured" },
  ];
  const reviews = [
    { name: "Mr. Prem Kumar", text: "I recently had a fantastic shopping experience with Egnaro. Their platform stands out in terms of user-friendliness, product variety, and exceptional customer service. The payment process was smooth and secure." },
    { name: "Mr. Raghual", text: "I appreciate their commitment to secure transactions. The payment process was smooth and secure, giving me confidence in the safety of my personal information." },
    { name: "Mr. Suresh", text: "I recently had the pleasure of shopping at Egnaro and I am thrilled with the exceptional service and quality products. As a DIY enthusiast, finding a reliable hardware store is crucial, and Egnaro exceeded my expectations in every way." },
  ];

  return (
    <div className="pb-10">
      <section className="mx-auto mt-3 max-w-7xl px-4">
        <div className="bg-hero relative overflow-hidden rounded-3xl border border-border px-6 py-20 text-center shadow-elevated md:py-28">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="text-xs uppercase tracking-[0.3em] text-primary">Our Story</div>
            <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              About <span className="text-gradient">Egnaro Mart</span>
            </h1>
            <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-primary shadow-glow" />
            <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">Direct from manufacturer. Built for households and businesses across Tamil Nadu.</p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-7xl px-4">
        <Reveal>
          <div className="glass-strong grid grid-cols-2 gap-6 rounded-3xl p-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.l} className="text-center">
                <div className="font-display text-4xl font-bold text-gradient sm:text-5xl"><CountUp to={s.n} suffix={s.s} /></div>
                <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mx-auto mt-20 max-w-4xl px-4">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.2em] text-primary">Our Story</div>
          <p className="mt-4 font-display text-2xl leading-relaxed text-foreground/90 sm:text-3xl">
            We have been running a company called <span className="text-gradient">Ansel Power System</span> for over 25 years. We opened Egnaro Mart as a sister company to carry all products directly from manufacturer to consumer at the lowest possible price. Through this website you can buy electronics, electricals, hardware, and industrial goods — all best quality.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto mt-16 max-w-4xl px-4">
        <Reveal>
          <div className="glass-strong rounded-3xl p-8 text-center md:p-12">
            <div className="text-xs uppercase tracking-[0.2em] text-primary">Mission</div>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Think. <span className="text-gradient">Buy.</span> Save.</h2>
            <p className="mt-4 text-muted-foreground">Our mission is to make quality products accessible to every household and business across Tamil Nadu.</p>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4">
        <Reveal>
          <div className="mb-8 text-center">
            <div className="text-xs uppercase tracking-[0.2em] text-primary">Voices</div>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">What customers say</h2>
          </div>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.08}>
              <div className="glass border-gradient relative h-full rounded-2xl p-6 shadow-elevated">
                <Quote className="absolute right-5 top-5 h-8 w-8 text-primary/20" />
                <p className="text-sm leading-relaxed text-foreground/80">"{r.text}"</p>
                <div className="mt-5 border-t border-border pt-4 font-display font-semibold text-gradient">{r.name}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
