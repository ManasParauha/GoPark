// components/CtaAndFooter.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function CtaAndFooter() {
  return (
    <>
      {/* ——— Call‑to‑Action ——— */}
      <section className="bg-primary/5 py-16 text-center">
        <motion.h2
          className="text-3xl font-bold md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Ready to <span className="text-primary">get started</span>?
        </motion.h2>

        <motion.div
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
        >
          <Link href="/Registration">
            <Button size="lg">Register as Host</Button>
          </Link>
          <Link href="/Registration">
            <Button size="lg" variant="outline">
              Register as Parker
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* ——— Footer ——— */}
      <footer className="bg-muted py-10 text-sm">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 sm:flex-row sm:justify-between">
          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            <FooterLink href="/Login">Login</FooterLink>
            <FooterLink href="/Registration">Registration</FooterLink>
            
          </nav>

          {/* Tech note + icons */}
          <p className="text-muted-foreground flex items-center gap-2">
            Built with Next.js &amp; MongoDB
            <Link
              href="https://github.com/ManasParauha/GoPark"
              aria-label="GitHub repository"
              className="hover:text-primary"
            >
              <Github className="h-4 w-4" />
            </Link>
            
          </p>
        </div>
      </footer>
    </>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="transition-colors hover:text-primary"
    >
      {children}
    </Link>
  );
}
