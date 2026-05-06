import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { Search, Star } from "lucide-react";
import { CATEGORIES, PRODUCTS, inr } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

const searchSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
});

export const Route = createFileRoute("/products")({
  component: ProductsPage,
  validateSearch: searchSchema,
});

function ProductsPage() {
  const search = Route.useSearch();
  const [q, setQ] = useState(search.q ?? "");
  const [cats, setCats] = useState<string[]>(search.category ? [search.category] : []);
  const [maxPrice, setMaxPrice] = useState(15000);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("relevance");

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) =>
      (q ? p.name.toLowerCase().includes(q.toLowerCase()) || p.category.toLowerCase().includes(q.toLowerCase()) : true) &&
      (cats.length ? cats.includes(p.category) || cats.includes("Motor Pump & Submersible") && p.category === "Motor Pump" : true) &&
      p.price <= maxPrice &&
      p.rating >= minRating
    );
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "discount") list = [...list].sort((a, b) => b.discount - a.discount);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [q, cats, maxPrice, minRating, sort]);

  const toggleCat = (c: string) => setCats((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]));

  return (
    <div className="mx-auto mt-8 max-w-7xl px-4">
      <div className="mb-8">
        <div className="text-xs uppercase tracking-[0.2em] text-primary">Catalog</div>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">All Products</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="glass h-fit rounded-2xl p-5 lg:sticky lg:top-28">
          <div className="font-display text-sm font-semibold uppercase tracking-widest">Filters</div>

          <div className="mt-5">
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Category</div>
            <div className="space-y-2">
              {CATEGORIES.map((c) => (
                <label key={c} className="flex cursor-pointer items-center gap-3 text-sm">
                  <span className={`grid h-5 w-5 place-items-center rounded-md border transition-all ${cats.includes(c) ? "border-primary bg-gradient-primary shadow-glow" : "border-border bg-surface-2"}`}>
                    {cats.includes(c) && <span className="h-2 w-2 rounded-sm bg-primary-foreground" />}
                  </span>
                  <input type="checkbox" className="hidden" checked={cats.includes(c)} onChange={() => toggleCat(c)} />
                  <span className="text-foreground/90">{c}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Max Price</div>
            <input type="range" min={0} max={15000} step={100} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="h-1.5 w-full appearance-none rounded-full bg-gradient-to-r from-primary to-accent" />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground"><span>₹0</span><span className="text-foreground font-medium">{inr(maxPrice)}</span></div>
          </div>

          <div className="mt-6">
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Min Rating</div>
            <div className="flex gap-1">
              {[0,1,2,3,4].map((r) => (
                <button key={r} onClick={() => setMinRating(r)} className={`flex items-center gap-0.5 rounded-lg border px-2 py-1 text-xs ${minRating === r ? "border-primary text-primary" : "border-border text-muted-foreground"}`}>
                  {r}<Star className="h-3 w-3 fill-current" />+
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div>
          <div className="glass mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4">
            <div className="relative flex-1 min-w-60">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products…"
                className="ring-glow w-full rounded-full border border-border bg-input/60 py-2 pl-10 pr-4 text-sm" />
            </div>
            <div className="text-sm text-muted-foreground">{filtered.length} results</div>
            <select value={sort} onChange={(e) => setSort(e.target.value)}
              className="ring-glow rounded-full border border-border bg-input/60 px-4 py-2 text-sm">
              <option value="relevance">Sort: Relevance</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="discount">Biggest Discount</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="glass rounded-2xl p-10 text-center text-muted-foreground">No products match your filters.</div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
