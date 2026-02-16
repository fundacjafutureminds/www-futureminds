"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { NAV_ITEMS } from "@/lib/constants";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-30 hidden h-fit w-[350px] shrink-0 self-start lg:flex lg:flex-col">
      {/* Logo z animacja fadeInDown */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Spacer gorny (zgodnie z Elementor) */}
        <div className="h-[95px]" />
        <Link href="/" className="ml-10 block">
          <Image
            src="/images/FMF-white.png"
            alt="Future Minds Foundation"
            width={180}
            height={57}
            className="h-auto w-[180px]"
          />
        </Link>
      </motion.div>

      {/* Spacer miedzy logo a linkami */}
      <div className="h-[95px]" />

      {/* Linki nawigacyjne z animacja fadeInLeft i stagger delay */}
      {NAV_ITEMS.map((item, index) => (
        <motion.div
          key={item.label}
          className="ml-5 mt-[2px] mb-[-3px] flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
        >
          {/* Trojkat desaturowany (szary, nie zielony) */}
          <Image
            src="/images/Green-Triangle.png"
            alt=""
            width={12}
            height={12}
            className="-mt-1 self-center brightness-[0.42] saturate-0"
            aria-hidden="true"
          />
          <Link
            href={item.href}
            className="ml-5 text-[20px] font-light leading-[1em] tracking-[1.1px] text-[#EAEAEA] transition-colors hover:text-fm-green"
          >
            {item.label}
          </Link>
        </motion.div>
      ))}

      {/* Spacer przed dekoracyjnym trojkatem */}
      <div className="h-[70px]" />

      {/* Dekoracyjny trojkat konturowy (NAV-03) */}
      <div className="ml-10">
        <Image
          src="/images/Obszar-roboczy-2-kopia-2.png"
          alt=""
          width={140}
          height={140}
          className="h-auto w-[40%]"
          aria-hidden="true"
        />
      </div>

      {/* Spacer koncowy (duzy spacer z Elementora) */}
      <div className="h-[501px]" />
    </nav>
  );
}
