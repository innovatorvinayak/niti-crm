"use client";

import Link from "next/link";
import { ArrowRight, LayoutDashboard, Zap, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

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
  return (
    <div className="flex flex-col min-h-screen bg-black text-white overflow-hidden font-sans selection:bg-primary selection:text-black">

      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl texture-matte">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Image src="/logo_full.jpg" alt="NitiCRMs" width={180} height={50} className="object-contain rounded-lg invert mix-blend-screen" />
          <nav className="hidden md:flex gap-8 text-sm font-medium text-zinc-400">
            <Link href="/features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
            <Link href="/manifesto" className="hover:text-primary transition-colors">Manifesto</Link>
          </nav>
          <div className="flex gap-4 items-center">
            <Link href="/login" className="text-sm font-medium hover:text-white text-zinc-400 transition-colors">Log In</Link>
            <Link href="/dashboard" className="px-5 py-2.5 texture-paper text-black text-sm font-semibold rounded-full hover:bg-white transition-all shadow-[0_0_20px_-5px_rgba(245,245,220,0.5)]">
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
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-accent mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            The Future of Relationship Management
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
            Chaos replaced with <br />
            <span className="text-gradient-gold">Absolute Clarity.</span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-12 leading-relaxed font-light">
            NitiCRMs is the decision layer for your business. We stripped away the bloat and added intelligence, giving you a CRM that actually works for you.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-5 w-full justify-center">
            <Link href="/dashboard" className="px-5 py-3 md:px-8 md:py-4 texture-paper text-black text-lg font-semibold rounded-full hover:bg-white transition-all shadow-lg shadow-primary/20 flex items-center gap-2 group">
              Start For Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-8 py-4 bg-white/5 border border-white/10 text-white text-lg font-medium rounded-full hover:bg-white/10 transition-all flex items-center gap-2">
              <LayoutDashboard className="w-5 h-5 text-zinc-400" />
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
          <div className="relative bg-[#050505] border border-white/10 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-white/5 texture-matte">
            {/* Fake Browser Header */}
            <div className="h-12 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#1a1a1a] border border-white/10" />
                <div className="w-3 h-3 rounded-full bg-[#1a1a1a] border border-white/10" />
                <div className="w-3 h-3 rounded-full bg-[#1a1a1a] border border-white/10" />
              </div>
              <div className="mx-auto bg-black/50 px-4 py-1 rounded-md text-xs text-zinc-600 font-mono">
                app.niticrms.com/dashboard
              </div>
            </div>

            {/* Dashboard Screenshot Mockup Content */}
            <div className="p-8 grid grid-cols-12 gap-6 bg-[#0a0a0a] min-h-[600px] texture-matte">
              {/* Sidebar */}
              <div className="col-span-2 hidden md:block space-y-4">
                <div className="h-8 w-8 texture-paper rounded-lg mb-8 opacity-80"></div>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-10 w-full rounded-lg bg-white/5" />
                  ))}
                </div>
              </div>

              {/* Main Content */}
              <div className="col-span-12 md:col-span-10 space-y-6">
                <div className="flex justify-between items-end">
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-white/10 rounded" />
                    <div className="h-8 w-64 bg-white/20 rounded" />
                  </div>
                  <div className="h-10 w-10 rounded-full bg-white/10" />
                </div>

                <div className="grid grid-cols-3 gap-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-32 rounded-xl bg-white/5 border border-white/5 p-4 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-6 h-64">
                  <div className="rounded-xl bg-white/5 border border-white/5" />
                  <div className="rounded-xl bg-white/5 border border-white/5" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Value Props */}
      <section className="py-32 relative bg-[#050505] texture-matte">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Designed for <span className="text-primary italic font-serif">Focus.</span>
            </h2>
            <p className="text-zinc-400 text-lg">Most CRMs are data dumps. NitiCRMs is an action engine. It tells you exactly what to do next to close the deal.</p>
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
                className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-primary/30 transition-all group hover:-translate-y-1 texture-matte"
              >
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-black transition-colors">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-zinc-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-black text-center texture-matte">
        <div className="flex items-center justify-center gap-2 mb-8 opacity-50">
          <Image src="/logo_full.jpg" alt="NitiCRMs" width={130} height={40} className="object-contain invert mix-blend-screen" />
        </div>
        <div className="flex justify-center gap-8 text-sm text-zinc-500 mb-8">
          <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
          <Link href="#" className="hover:text-white transition-colors">LinkedIn</Link>
          <Link href="#" className="hover:text-white transition-colors">GitHub</Link>
        </div>
        <p className="text-zinc-600 text-sm">&copy; {new Date().getFullYear()} NitiCRMs Inc. Crafted with precision.</p>
      </footer>
    </div>
  );
}
