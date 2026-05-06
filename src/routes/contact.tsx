import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/contact")({ component: ContactPage });

function ContactPage() {
  const [sent, setSent] = useState(false);
  const cards = [
    { i: Phone, t: "Phone", v: "+91 9442581506" },
    { i: MapPin, t: "Address", v: "No:2A Venkatesh, Sarkarsamakulam, Kovilpalayam, Tamil Nadu 641107" },
    { i: Mail, t: "Email", v: "egnaromart@gmail.com" },
    { i: Clock, t: "Hours", v: "Mon–Fri 10:00–18:00" },
  ];

  return (
    <div className="mx-auto mt-8 max-w-7xl px-4 pb-10">
      <Reveal>
        <div className="text-xs uppercase tracking-[0.2em] text-primary">Get in touch</div>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Contact <span className="text-gradient">Us</span></h1>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c, i) => (
          <Reveal key={c.t} delay={i * 0.05}>
            <div className="glass border-gradient h-full rounded-2xl p-5 transition-all hover:-translate-y-1 hover:shadow-glow">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary/15 text-primary shadow-glow"><c.i className="h-5 w-5" /></div>
              <div className="mt-4 font-display font-semibold">{c.t}</div>
              <div className="mt-1 text-sm text-muted-foreground">{c.v}</div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Reveal>
          <div className="glass-strong rounded-3xl p-8">
            <h2 className="font-display text-2xl font-bold">Send a message</h2>
            <p className="mt-2 text-sm text-muted-foreground">We'll get back to you within 24 hours.</p>
            {sent ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="mt-6 flex items-center gap-3 rounded-2xl bg-emerald-500/10 p-5 text-emerald-300">
                <CheckCircle2 className="h-6 w-6" />
                <div>
                  <div className="font-semibold">Message sent!</div>
                  <div className="text-sm opacity-80">We'll get back to you within 24 hours.</div>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-6 space-y-4">
                {["Name", "Email", "Phone"].map((l) => (
                  <input key={l} required={l !== "Phone"} placeholder={l} type={l === "Email" ? "email" : "text"}
                    className="ring-glow w-full rounded-xl border border-border bg-input/60 px-4 py-3 text-sm focus:border-primary" />
                ))}
                <textarea required rows={5} placeholder="Message"
                  className="ring-glow w-full rounded-xl border border-border bg-input/60 px-4 py-3 text-sm focus:border-primary" />
                <button className="btn-shimmer flex w-full items-center justify-center gap-2 rounded-full bg-gradient-primary py-3.5 font-semibold text-primary-foreground shadow-glow">
                  <Send className="h-4 w-4" /> Send Message
                </button>
              </form>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass-strong h-full overflow-hidden rounded-3xl">
            <iframe
              title="Egnaro Mart location"
              src="https://maps.google.com/maps?q=Kovilpalayam,%20Tamil%20Nadu%20641107&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="h-full min-h-80 w-full grayscale-[0.4] contrast-125"
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
