import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import logo from "@/assets/logo.jpeg";

export function Footer() {
  return (
    <footer className="relative mt-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="glass-strong rounded-3xl p-8 md:p-12">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <img
  src={logo}
  alt="Egnaro Mart"
  className="h-14 w-auto object-contain"
/>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                At Egnaro Mart, we bring quality electronics, hardware and industrial products directly to your doorstep at the best prices.
              </p>
              
            </div>

            <div>
              <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-foreground">Quick Links</h4>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                <li><Link to="/" className="hover:text-foreground">Home</Link></li>
                <li><Link to="/products" className="hover:text-foreground">Products</Link></li>
                <li><Link to="/about" className="hover:text-foreground">About Us</Link></li>
                <li><Link to="/terms" className="hover:text-foreground">Terms & Conditions</Link></li>
                <li><Link to="/refund-policy" className="hover:text-foreground">Return & Refund Policy</Link></li>
                <li><Link to="/contact" className="hover:text-foreground">Contact Us</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-foreground">Account</h4>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                <li><Link to="/cart" className="hover:text-foreground">My Cart</Link></li>
                <li><Link to="/checkout" className="hover:text-foreground">Checkout</Link></li>
                <li><Link to="/contact" className="hover:text-foreground">Track Order</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-foreground">Contact</h4>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 text-primary" /> +91 9442581506</li>
                <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 text-primary" /> egnaromart@gmail.com</li>
                <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-primary" /> No:2A Venkatesh, Sarkarsamakulam, Kovilpalayam, Tamil Nadu 641107</li>
                <li className="flex items-start gap-2"><Clock className="mt-0.5 h-4 w-4 text-primary" /> Mon–Fri 10:00–18:00</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 grid gap-4 rounded-2xl border border-border bg-surface-2/40 p-5 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <div className="font-display text-base font-semibold">Subscribe to our newsletter</div>
              <div className="text-xs text-muted-foreground">Best deals, new launches & offers — straight to your inbox.</div>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input type="email" required placeholder="you@example.com"
                className="ring-glow w-full rounded-full border border-border bg-input/60 px-4 py-2.5 text-sm sm:w-72" />
              <button className="btn-shimmer flex items-center gap-1.5 rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow">
                Subscribe <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
            <div>© 2026 Egnaro Mart. All Rights Reserved.</div>
            
          </div>
        </div>
      </div>
    </footer>
  );
}
