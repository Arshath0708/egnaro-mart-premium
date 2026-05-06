import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Menu, X, Zap } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CATEGORIES } from "@/lib/products";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const { count } = useCart();
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { setOpen(false); }, [path]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/products", search: { q } as never });
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-3"}`}>
      <div className={`mx-auto max-w-7xl px-4 transition-all duration-500`}>
        <div className={`glass-strong flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-500 ${scrolled ? "shadow-elevated" : ""}`}>
          <Link to="/" className="flex items-center gap-2.5">
            <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary shadow-glow">
              <Zap className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <div className="font-display text-xl font-bold tracking-tight">
              <span className="text-foreground">EGNARO</span>
              <span className="ml-1 text-gradient">MART</span>
            </div>
          </Link>

          <form onSubmit={submit} className="ml-4 hidden flex-1 items-center md:flex">
            <div className="relative w-full max-w-xl">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search electronics, hardware, motor pumps…"
                className="ring-glow w-full rounded-full border border-border bg-input/60 py-2.5 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-primary"
              />
            </div>
          </form>

          <nav className="ml-auto hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <Link
                key={n.to} to={n.to}
                className="group relative rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
                <span className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-gradient-primary transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <Link to="/cart" className="relative ml-2 grid h-10 w-10 place-items-center rounded-xl border border-border bg-surface-2/50 text-foreground transition-all hover:border-primary hover:shadow-glow">
            <ShoppingBag className="h-4.5 w-4.5" />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0, y: -6 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0 }}
                  className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-gradient-primary px-1 text-[10px] font-bold text-primary-foreground shadow-glow"
                >{count}</motion.span>
              )}
            </AnimatePresence>
          </Link>

          <button onClick={() => setOpen(true)} className="ml-1 grid h-10 w-10 place-items-center rounded-xl border border-border bg-surface-2/50 lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </div>

        <div className="scrollbar-hide mt-2 hidden gap-1 overflow-x-auto px-2 md:flex">
          {CATEGORIES.map((c) => (
            <Link key={c} to="/products" search={{ category: c } as never}
              className="group relative whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">
              {c}
              <span className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-gradient-primary transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm lg:hidden">
            <motion.aside
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 24, stiffness: 220 }}
              className="glass-strong absolute right-0 top-0 h-full w-[82%] max-w-sm border-l border-border p-6"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-bold">Menu</span>
                <button onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-lg border border-border"><X className="h-4 w-4" /></button>
              </div>
              <nav className="mt-8 flex flex-col gap-1">
                {NAV.map((n, i) => (
                  <motion.div key={n.to} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.05 }}>
                    <Link to={n.to} className="block rounded-xl px-4 py-3 text-base font-medium text-foreground hover:bg-surface-2">{n.label}</Link>
                  </motion.div>
                ))}
                <div className="my-4 h-px bg-border" />
                {CATEGORIES.map((c, i) => (
                  <motion.div key={c} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.04 }}>
                    <Link to="/products" search={{ category: c } as never} className="block rounded-xl px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground">{c}</Link>
                  </motion.div>
                ))}
              </nav>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
