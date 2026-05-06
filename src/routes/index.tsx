import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Truck, BadgeCheck, Lock, Cpu, Plug, Wrench, Droplets, Home as HomeIcon, Factory, ArrowUpRight } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/")({ component: HomePage });

const SLIDES = [
  { tag: "Mega Sale", title: "Up to 70% OFF on Electronics", sub: "Cameras, adapters, chargers and more — premium gear at unbeatable prices.", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80" },
  { tag: "Built to Last", title: "Quality Hardware Delivered Fast", sub: "Trusted tools and supplies for every project, shipped across Tamil Nadu.", img: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=1600&q=80" },
  { tag: "Industrial Grade", title: "Motor Pumps & Industrial Goods — Best Prices", sub: "Direct from manufacturer. Lower prices. Real performance.", img: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1600&q=80" },
];

const CATS = [
  { name: "Electronics", icon: Cpu },
  { name: "Electricals", icon: Plug },
  { name: "Hardware", icon: Wrench },
  { name: "Motor Pump & Submersible", icon: Droplets },
  { name: "Home Application", icon: HomeIcon },
  { name: "Industrial Goods", icon: Factory },
];

function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((p) => (p + 1) % SLIDES.length), 5500); return () => clearInterval(t); }, []);
  const s = SLIDES[i];
  return (
    <section className="relative mx-auto mt-3 max-w-7xl px-4">
      <div className="bg-hero relative h-[78vh] min-h-[520px] overflow-hidden rounded-3xl border border-border shadow-elevated">
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.1, ease: [0.22,1,0.36,1] }} className="absolute inset-0">
            <img src={s.img} alt="" className="h-full w-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 flex h-full items-center px-6 sm:px-12 md:px-20">
          <AnimatePresence mode="wait">
            <motion.div key={i} className="max-w-2xl">
              <motion.span initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
                className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" /> {s.tag}
              </motion.span>
              <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.7 }}
                className="mt-5 font-display text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
                {s.title.split(" ").map((w, k) => (
                  <span key={k} className={k % 3 === 1 ? "text-gradient" : ""}>{w} </span>
                ))}
              </motion.h1>
              <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.35 }}
                className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">{s.sub}</motion.p>
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8 flex gap-3">
                <Link to="/products" className="btn-shimmer flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 font-semibold text-primary-foreground shadow-glow animate-pulse-glow">
                  Shop Now <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/about" className="glass flex items-center gap-2 rounded-full px-6 py-3 font-medium hover:border-primary">
                  Our Story <ArrowUpRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button onClick={() => setI((p) => (p - 1 + SLIDES.length) % SLIDES.length)}
          className="glass absolute left-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full hover:border-primary"><ChevronLeft className="h-5 w-5" /></button>
        <button onClick={() => setI((p) => (p + 1) % SLIDES.length)}
          className="glass absolute right-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full hover:border-primary"><ChevronRight className="h-5 w-5" /></button>

        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {SLIDES.map((_, k) => (
            <button key={k} onClick={() => setI(k)} className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-gradient-primary" : "w-2 bg-muted-foreground/40"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="mx-auto mt-24 max-w-7xl px-4">
      <Reveal>
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-primary">Browse</div>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Shop by Category</h2>
          </div>
          <Link to="/products" className="hidden items-center gap-1 text-sm text-muted-foreground hover:text-foreground sm:flex">View all <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </Reveal>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {CATS.map((c, i) => (
          <Reveal key={c.name} delay={i * 0.05}>
            <Link to="/products" search={{ category: c.name } as never}
              className="group relative block overflow-hidden rounded-2xl glass border-gradient p-5 transition-all hover:-translate-y-1 hover:shadow-glow">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary/20 text-primary transition-all group-hover:bg-gradient-primary group-hover:text-primary-foreground group-hover:shadow-glow">
                <c.icon className="h-5 w-5" />
              </div>
              <div className="mt-4 font-display font-semibold leading-tight">{c.name}</div>
              <ArrowUpRight className="absolute right-4 top-4 h-4 w-4 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Countdown() {
  const [t, setT] = useState({ h: 23, m: 59, s: 59 });
  useEffect(() => {
    const end = Date.now() + 24 * 3600 * 1000;
    const i = setInterval(() => {
      const d = Math.max(0, end - Date.now());
      setT({ h: Math.floor(d / 3600000) % 24, m: Math.floor(d / 60000) % 60, s: Math.floor(d / 1000) % 60 });
    }, 1000);
    return () => clearInterval(i);
  }, []);
  const cell = (n: number, l: string) => (
    <div className="glass flex min-w-16 flex-col items-center rounded-xl px-3 py-2 shadow-glow">
      <span className="font-display text-2xl font-bold text-gradient">{String(n).padStart(2, "0")}</span>
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{l}</span>
    </div>
  );
  return <div className="flex gap-2">{cell(t.h, "Hrs")}{cell(t.m, "Min")}{cell(t.s, "Sec")}</div>;
}

function HomePage() {
  const featured = PRODUCTS.slice(0, 4);
  const deals = PRODUCTS.slice(4, 8);
  const why = [
    { icon: ShieldCheck, t: "High Quality", d: "Direct from manufacturer." },
    { icon: Truck, t: "Fast Delivery", d: "Across Tamil Nadu." },
    { icon: BadgeCheck, t: "Best Warranty", d: "Genuine brand support." },
    { icon: Lock, t: "Secure Payment", d: "Protected checkout." },
  ];
  return (
    <div className="pb-10">
      <Hero />
      <Categories />

      <section className="mx-auto mt-24 max-w-7xl px-4">
        <Reveal>
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-primary">Hand-picked</div>
              <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Featured Products</h2>
            </div>
            <Link to="/products" className="hidden items-center gap-1 text-sm text-muted-foreground hover:text-foreground sm:flex">All products <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-7xl px-4">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-primary">Limited Time</div>
              <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Today's Deals</h2>
            </div>
            <Countdown />
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {deals.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-7xl px-4">
        <Reveal>
          <div className="glass-strong grid grid-cols-2 gap-6 rounded-3xl p-8 md:grid-cols-4 md:p-10">
            {why.map((w, i) => (
              <motion.div key={w.t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-primary/15 text-primary shadow-glow">
                  <w.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-display font-semibold">{w.t}</div>
                  <div className="text-sm text-muted-foreground">{w.d}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mx-auto mt-24 max-w-7xl px-4">
        <Reveal>
          <div className="glass-strong relative overflow-hidden rounded-3xl p-10 md:p-14">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
            <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h3 className="font-display text-2xl font-bold sm:text-3xl">Stay in the loop</h3>
                <p className="mt-2 text-muted-foreground">Subscribe for new launches, deals and industrial-grade tips.</p>
              </div>
              <form onSubmit={(e) => e.preventDefault()} className="flex w-full flex-col gap-2 sm:flex-row md:w-auto">
                <input type="email" required placeholder="you@example.com" className="ring-glow w-full rounded-full border border-border bg-input/60 px-5 py-3 text-sm sm:w-72" />
                <button className="btn-shimmer flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow">
                  Subscribe <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
