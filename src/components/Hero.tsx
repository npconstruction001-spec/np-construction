import React from "react";
import { motion } from "motion/react";
import { imgBannerLeft, imgBannerRight } from "../constants/data";

interface HeroProps {
  isAdminMode: boolean;
  heroTitleL1: string;
  setHeroTitleL1: (v: string) => void;
  heroTitleL2: string;
  setHeroTitleL2: (v: string) => void;
  heroTitleGold: string;
  setHeroTitleGold: (v: string) => void;
  heroSubtitle: string;
  setHeroSubtitle: (v: string) => void;
  triggerSavedToast: () => void;
  setIsAdminMode: (v: boolean) => void;
}

export default function Hero({
  isAdminMode,
  heroTitleL1,
  setHeroTitleL1,
  heroTitleL2,
  setHeroTitleL2,
  heroTitleGold,
  setHeroTitleGold,
  heroSubtitle,
  setHeroSubtitle,
  triggerSavedToast,
  setIsAdminMode,
}: HeroProps) {
  return (
    <section id="home" className="relative h-screen grid grid-cols-12 overflow-hidden bg-navy-dark">
      <div className="col-span-12 lg:col-span-7 relative flex flex-col justify-center p-6 md:p-20 order-2 lg:order-1">
        <div className="absolute inset-0 z-0">
          <img
            src={imgBannerLeft}
            alt="Construction background"
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy-dark/40 to-transparent"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 space-y-8 w-full"
        >
          <div className="gold-line"></div>
          {isAdminMode ? (
            <div className="bg-navy-dark/95 border border-gold/40 p-6 rounded-sm space-y-4 max-w-lg shadow-2xl relative">
              <span className="text-[10px] font-mono tracking-widest uppercase text-gold block font-black">✍️ แก้ไขหัวข้อต้อนรับ (HERO SECTION)</span>
              <div className="space-y-1">
                <label className="text-[8px] font-mono uppercase text-slate-400 block font-bold">หัวเรื่อง บรรทัดแรก</label>
                <input
                  type="text"
                  value={heroTitleL1}
                  onChange={(e) => setHeroTitleL1(e.target.value)}
                  className="w-full bg-navy-light border border-white/20 text-white rounded p-1.5 focus:border-gold text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[8px] font-mono uppercase text-slate-400 block font-bold">หัวเรื่อง บรรทัดสอง</label>
                <input
                  type="text"
                  value={heroTitleL2}
                  onChange={(e) => setHeroTitleL2(e.target.value)}
                  className="w-full bg-navy-light border border-white/20 text-white rounded p-1.5 focus:border-gold text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[8px] font-mono uppercase text-slate-400 block font-bold">คำเน้นแบรนด์สีทอง (ทอง)</label>
                <input
                   type="text"
                   value={heroTitleGold}
                   onChange={(e) => setHeroTitleGold(e.target.value)}
                   className="w-full bg-navy-light border border-white/20 text-gold rounded p-1.5 focus:border-gold text-xs font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[8px] font-mono uppercase text-slate-400 block font-bold">คำอธิบายภาพรวมนโยบาย</label>
                <textarea
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  rows={3}
                  className="w-full bg-navy-light border border-white/20 text-slate-200 rounded p-1.5 focus:border-gold text-xs"
                />
              </div>
              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    triggerSavedToast();
                  }}
                  className="w-full bg-gold hover:bg-amber-400 text-navy-dark py-2.5 rounded-sm text-[10px] font-mono font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow"
                >
                  <span>💾 ยืนยันการบันทึกข้อความส่วนนี้</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAdminMode(false);
                    triggerSavedToast();
                  }}
                  className="w-full bg-white/10 hover:bg-white/15 text-white py-2 rounded-sm text-[9px] font-mono tracking-wider uppercase transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>✔️ ยืนยันข้อมูลทั้งหมด &amp; ออกจากโหมดแก้ไข</span>
                </button>
              </div>
              <p className="text-[8px] text-slate-400 font-mono">⚠️ ระบบได้รับการตั้งค่าเซฟแบบวินาทีต่อวินาทีลงในเบราว์เซอร์แล้วค่ะ</p>
            </div>
          ) : (
            <>
              <h1 className="text-6xl md:text-8xl text-white leading-[0.85] tracking-tighter font-display font-black">
                {heroTitleL1}<br />
                {heroTitleL2}<br />
                <span className="text-gold font-tech">{heroTitleGold}</span>
              </h1>
              <p className="text-xl text-slate-300 font-light leading-relaxed max-w-md">
                {heroSubtitle}
              </p>
            </>
          )}
          <div className="flex flex-col sm:flex-row gap-6 pt-4">
            <a href="#services" className="bg-gold text-navy-dark px-10 py-5 text-[10px] font-mono font-black uppercase tracking-[0.2em] hover:bg-gold-hover transition-all shadow-2xl text-center">
              Explore Services
            </a>
            <a href="#portfolio" className="border border-white/20 text-white px-10 py-5 text-[10px] font-mono font-black uppercase tracking-[0.2em] hover:bg-white/5 transition-all text-center">
              View Projects
            </a>
          </div>
        </motion.div>
      </div>

      <div className="col-span-12 lg:col-span-5 relative hidden lg:block order-1 lg:order-2">
        <img
          src={imgBannerRight}
          alt="Engineering detail"
          className="w-full h-full object-cover brightness-75 contrast-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-x-0 bottom-0 p-12">
           <div className="mono-label text-white/40 mb-2">Spec No.</div>
           <div className="text-gold font-mono text-xl">NP-C/2024-ENG</div>
        </div>
        <div className="absolute inset-0 border-l border-white/10"></div>
      </div>
    </section>
  );
}
