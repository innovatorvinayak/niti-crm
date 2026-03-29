"use client";

import Link from "next/link";
import { ArrowRight, LayoutDashboard, Zap, ShieldCheck, Moon, Sun } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function LandingPage() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") {
      return "dark";
    }
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const isDark = theme === "dark";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-hidden font-sans selection:bg-primary selection:text-white">

      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-xl texture-matte">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className={`flex items-center h-11 w-[176px] overflow-hidden rounded-md border ${isDark ? "border-zinc-700" : "border-zinc-300"}`}>
            <Image src="/logo_wordmark.jpg" alt="NitiCRMs" width={176} height={44} className="h-full w-full object-cover object-center" priority />
          </Link>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
            <Link href="/features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
            <Link href="/manifesto" className="hover:text-primary transition-colors">Manifesto</Link>
          </nav>
          <div className="flex gap-4 items-center">
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
              className={`h-10 w-10 rounded-full border flex items-center justify-center transition-colors ${isDark ? "border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800" : "border-zinc-300 bg-zinc-100 text-zinc-700 hover:bg-zinc-200"}`}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link href="/login" className="text-sm font-medium hover:text-foreground text-muted-foreground transition-colors">Log In</Link>
            <Link href="/signup" className="px-5 py-2.5 texture-paper bg-primary text-primary-foreground text-sm font-semibold rounded-full hover:bg-primary/90 transition-all shadow-[0_0_20px_-5px_rgba(234,179,8,0.5)]">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center items-center text-center px-4 pt-40 pb-20 relative texture-matte">

        {/* Ambient Glows */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 max-w-5xl mx-auto flex flex-col items-center"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted border border-border text-xs font-medium text-primary mb-8 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            The Future of Relationship Management
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
            Chaos replaced with <br />
            <span className="text-gradient-gold">Absolute Clarity.</span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed font-light">
            NitiCRMs is the decision layer for your business. We stripped away the bloat and added intelligence, giving you a CRM that actually works for you.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-5 w-full justify-center">
            <Link href="/signup" className="px-5 py-3 md:px-8 md:py-4 texture-paper bg-primary text-primary-foreground text-lg font-semibold rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 group">
              Start For Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-8 py-4 bg-card border border-border text-foreground text-lg font-medium rounded-full hover:bg-muted transition-all flex items-center gap-2 shadow-sm">
              <LayoutDashboard className="w-5 h-5 text-muted-foreground" />
              View Interactive Demo
            </button>
          </motion.div>
        </motion.div>

        {/* Hero Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 100, rotateX: 20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.5, type: "spring" }}
          className="mt-24 relative w-full max-w-6xl perspective-1000 px-4"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent rounded-3xl blur-2xl -z-10" />
          <div className="relative bg-background border border-border rounded-2xl shadow-2xl overflow-hidden ring-1 ring-border texture-matte">
            {/* Fake Browser Header */}
            <div className="h-12 bg-muted border-b border-border flex items-center px-4 gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-zinc-300 border border-zinc-400" />
                <div className="w-3 h-3 rounded-full bg-zinc-300 border border-zinc-400" />
                <div className="w-3 h-3 rounded-full bg-zinc-300 border border-zinc-400" />
              </div>
              <div className="mx-auto bg-background px-4 py-1 rounded-md text-xs text-muted-foreground font-mono shadow-sm">
                app.niticrms.com/dashboard
              </div>
            </div>

            {/* Dashboard Screenshot Mockup Content */}
            <div className="p-8 grid grid-cols-12 gap-6 bg-background min-h-[600px] texture-matte">
              {/* Sidebar */}
              <div className="col-span-2 hidden md:block space-y-4">
                <div className="h-8 w-8 texture-paper rounded-lg mb-8 opacity-80 bg-primary"></div>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-10 w-full rounded-lg bg-muted" />
                  ))}
                </div>
              </div>

              {/* Main Content */}
              <div className="col-span-12 md:col-span-10 space-y-6">
                <div className="flex justify-between items-end">
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-muted rounded" />
                    <div className="h-8 w-64 bg-muted-foreground/20 rounded" />
                  </div>
                  <div className="h-10 w-10 rounded-full bg-muted" />
                </div>

                <div className="grid grid-cols-3 gap-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-32 rounded-xl bg-card border border-border p-4 relative overflow-hidden group shadow-sm">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-6 h-64">
                  <div className="rounded-xl bg-card border border-border shadow-sm" />
                  <div className="rounded-xl bg-card border border-border shadow-sm" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Value Props */}
      <section className="py-32 relative bg-background texture-matte">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Designed for <span className="text-primary italic font-serif">Focus.</span>
            </h2>
            <p className="text-muted-foreground text-lg">Most CRMs are data dumps. NitiCRMs is an action engine. It tells you exactly what to do next to close the deal.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Intelligent Workflows", desc: "Automate repetitive tasks with simple if-this-then-that logic built specifically for high-velocity sales teams.", icon: Zap },
              { title: "Pipeline Visibility", desc: "See every deal stage instantly. Drag, drop, and close more deals faster with our fluid Kanban interface.", icon: LayoutDashboard },
              { title: "Bank-Grade Security", desc: "Your data is encrypted and secure. We take privacy seriously with SOC2 compliant infrastructure.", icon: ShieldCheck },
            ].map((feature, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                key={i}
                className="p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all group hover:-translate-y-1 texture-matte shadow-sm"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-primary">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-background text-center texture-matte">
        <div className="flex items-center justify-center gap-2 mb-8 opacity-70">
          <div className={`h-10 w-[158px] overflow-hidden rounded-md border ${isDark ? "border-zinc-700" : "border-zinc-300"}`}>
            <Image src="/logo_wordmark.jpg" alt="NitiCRMs" width={158} height={40} className="h-full w-full object-cover object-center" />
          </div>
        </div>
        <div className="flex justify-center gap-8 text-sm text-muted-foreground mb-8">
          <Link href="#" className="hover:text-foreground transition-colors">Twitter</Link>
          <Link href="#" className="hover:text-foreground transition-colors">LinkedIn</Link>
          <Link href="#" className="hover:text-foreground transition-colors">GitHub</Link>
        </div>
        <p className="text-muted-foreground text-sm">&copy; {new Date().getFullYear()} NitiCRMs Inc. Crafted with precision.</p>
      </footer>
    </div>
  );
}
