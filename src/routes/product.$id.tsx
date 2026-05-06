import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Truck, Minus, Plus, ShoppingCart, Zap } from "lucide-react";
import { PRODUCTS, inr } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$id")({
  component: ProductDetail,
  loader: ({ params }) => {
    const p = PRODUCTS.find((x) => x.id === params.id);
    if (!p) throw notFound();
    return p;
  },
  notFoundComponent: () => (
    <div className="mx-auto mt-20 max-w-xl px-4 text-center">
      <h1 className="font-display text-4xl font-bold">Product not found</h1>
      <Link to="/products" className="mt-6 inline-flex rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow">Browse products</Link>
    </div>
  ),
});

function ProductDetail() {
  const product = Route.useLoaderData();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"desc" | "spec" | "rev">("desc");
  const [activeImg, setActiveImg] = useState(0);
  const { add } = useCart();
  const navigate = useNavigate();

  const imgs = [product.image, product.image + "?a", product.image + "?b"];
  const savings = product.original - product.price;

  return (
    <div className="mx-auto mt-8 max-w-7xl px-4 pb-10">
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link><span>/</span>
        <Link to="/products" className="hover:text-foreground">Products</Link><span>/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="glass overflow-hidden rounded-3xl border border-border shadow-elevated">
            <motion.img key={activeImg} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
              src={imgs[activeImg]} alt={product.name}
              className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-110" />
          </div>
          <div className="mt-4 flex gap-3">
            {imgs.map((src, i) => (
              <button key={i} onClick={() => setActiveImg(i)}
                className={`overflow-hidden rounded-xl border-2 transition-all ${activeImg === i ? "border-primary shadow-glow" : "border-border opacity-70"}`}>
                <img src={src} alt="" className="h-20 w-20 object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-primary">{product.category}</div>
          <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 + i * 0.06 }}>
                <Star className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-primary text-primary" : "text-muted-foreground/40"}`} />
              </motion.span>
            ))}
            <span className="text-sm text-muted-foreground">{product.rating} · {product.reviews} reviews</span>
          </div>

          <div className="mt-6 flex flex-wrap items-baseline gap-3">
            <span className="font-display text-4xl font-bold text-gradient">{inr(product.price)}</span>
            <span className="text-lg text-muted-foreground line-through">{inr(product.original)}</span>
            <span className="rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-3 py-1 text-xs font-semibold text-white shadow-glow">Save {inr(savings)} ({product.discount}% OFF)</span>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Truck className="h-4 w-4 text-primary" /> Free delivery on orders above ₹999
          </div>

          <div className="mt-7 flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Quantity</span>
            <div className="glass flex items-center rounded-full">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-10 w-10 place-items-center rounded-full hover:text-primary"><Minus className="h-4 w-4" /></button>
              <span className="w-10 text-center font-semibold">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="grid h-10 w-10 place-items-center rounded-full hover:text-primary"><Plus className="h-4 w-4" /></button>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => { add(product, qty); toast.success("Added to cart!", { description: product.name }); }}
              className="btn-shimmer flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-glow">
              <ShoppingCart className="h-4 w-4" /> Add to Cart
            </button>
            <button onClick={() => { add(product, qty); navigate({ to: "/checkout" }); }}
              className="glass flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold hover:border-primary">
              <Zap className="h-4 w-4 text-primary" /> Buy Now
            </button>
          </div>

          <div className="mt-10">
            <div className="flex gap-1 border-b border-border">
              {([["desc","Description"],["spec","Specifications"],["rev","Reviews"]] as const).map(([k, l]) => (
                <button key={k} onClick={() => setTab(k)} className="relative px-5 py-3 text-sm font-medium transition-colors">
                  <span className={tab === k ? "text-foreground" : "text-muted-foreground"}>{l}</span>
                  {tab === k && <motion.span layoutId="tab-underline" className="absolute inset-x-0 -bottom-px h-0.5 bg-gradient-primary" />}
                </button>
              ))}
            </div>
            <div className="pt-5 text-sm text-muted-foreground">
              {tab === "desc" && <p className="leading-relaxed">{product.description}</p>}
              {tab === "spec" && (
                <div className="grid gap-2 sm:grid-cols-2">
                  {Object.entries(product.specs).map(([k, v]) => (
                    <div key={k} className="glass flex justify-between rounded-lg px-4 py-2.5">
                      <span className="text-muted-foreground">{k}</span><span className="font-medium text-foreground">{v}</span>
                    </div>
                  ))}
                </div>
              )}
              {tab === "rev" && <p>Loved by {product.reviews}+ verified customers. Average rating {product.rating}/5.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
