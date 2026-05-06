import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { inr, type Product } from "@/lib/products";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { add } = useCart();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div className="glass border-gradient relative overflow-hidden rounded-2xl shadow-elevated transition-all duration-500 hover:-translate-y-1 hover:shadow-glow">
        <Link to="/product/$id" params={{ id: product.id }} className="block">
          <div className="relative aspect-square overflow-hidden bg-surface-2">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-3 py-1 text-xs font-semibold text-white shadow-glow">
              {product.discount}% OFF
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
        </Link>

        <div className="space-y-3 p-5">
          <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{product.category}</div>
          <Link to="/product/$id" params={{ id: product.id }}>
            <h3 className="line-clamp-1 font-display text-lg font-semibold text-foreground transition-colors hover:text-primary">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 transition-all duration-300 ${
                  i < Math.round(product.rating) ? "fill-primary text-primary" : "text-muted-foreground/40"
                }`}
                style={{ transitionDelay: `${i * 60}ms` }}
              />
            ))}
            <span className="ml-1 text-xs text-muted-foreground">({product.reviews})</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-bold text-foreground">{inr(product.price)}</span>
            <span className="text-sm text-muted-foreground line-through">{inr(product.original)}</span>
          </div>
          <button
            onClick={() => { add(product); toast.success("Added to cart!", { description: product.name }); }}
            className="btn-shimmer relative flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-primary py-2.5 font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <ShoppingCart className="h-4 w-4" /> Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}
