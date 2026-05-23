import React from "react";
import { motion } from "motion/react";
import { imgAbout } from "../constants/data";

interface AboutProps {
  isAdminMode: boolean;
  aboutTitleL1: string;
  setAboutTitleL1: (v: string) => void;
  aboutTitleGold: string;
  setAboutTitleGold: (v: string) => void;
  aboutDesc: string;
  setAboutDesc: (v: string) => void;
  aboutBullets: string[];
  setAboutBullets: (v: string[]) => void;
  triggerSavedToast: () => void;
  setIsAdminMode: (v: boolean) => void;
}

export default function About({
  isAdminMode,
  aboutTitleL1,
  setAboutTitleL1,
  aboutTitleGold,
  setAboutTitleGold,
  aboutDesc,
  setAboutDesc,
  aboutBullets,
  setAboutBullets,
  triggerSavedToast,
  setIsAdminMode,
}: AboutProps) {
  return (
    <section id="about" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 overflow-hidden shadow-[30px_30px_0px_0px_rgba(15,23,42,1)] border border-navy-dark">
              <img
                src={imgAbout}
                alt="Workplace"
                className="w-full h-auto hover:scale-105 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -top-12 -left-12 z-20 bg-gold text-navy-dark p-10 shadow-2xl">
              <span className="block text-5xl font-black tracking-tighter font-display">15+</span>
              <span className="mono-label text-navy-dark/70">Expert Years</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {isAdminMode ? (
              <div className="bg-slate-50 border border-slate-300 p-6 rounded-sm space-y-4 w-full shadow-lg relative">
                <span className="text-[10px] font-mono tracking-widest uppercase text-navy-dark block font-black">✍️ แก้ไขหน้ารายละเอียดเกี่ยวกับเรา (ABOUT SECTION)</span>
                <div className="space-y-1">
                  <label className="text-[8px] font-mono uppercase text-slate-500 block font-bold">หัวเรื่องหลัก</label>
                  <input
                    type="text"
                    value={aboutTitleL1}
                    onChange={(e) => setAboutTitleL1(e.target.value)}
                    className="w-full bg-white border border-slate-300 text-navy-dark rounded p-1.5 focus:border-gold text-xs font-sans"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] font-mono uppercase text-slate-500 block font-bold">คำลงท้ายสีทอง</label>
                  <input
                    type="text"
                    value={aboutTitleGold}
                    onChange={(e) => setAboutTitleGold(e.target.value)}
                    className="w-full bg-white border border-slate-300 text-gold rounded p-1.5 focus:border-gold text-xs font-bold font-sans"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] font-mono uppercase text-slate-500 block font-bold">ย่อหน้าคำจำกัดความ / ความเป็นมา</label>
                  <textarea
                    value={aboutDesc}
                    onChange={(e) => setAboutDesc(e.target.value)}
                    rows={4}
                    className="w-full bg-white border border-slate-300 text-slate-600 rounded p-1.5 focus:border-gold text-xs font-sans leading-relaxed"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] font-mono uppercase text-slate-500 block font-bold">หัวข้อสัญลักษณ์ 3 ข้อ (หนึ่งข้อต่อหนึ่งบรรทัด)</label>
                  <textarea
                    value={aboutBullets.join("\n")}
                    onChange={(e) => setAboutBullets(e.target.value.split("\n"))}
                    rows={3}
                    className="w-full bg-white border border-slate-300 text-slate-600 rounded p-1.5 focus:border-gold text-xs font-mono whitespace-pre"
                  />
                </div>
                <div className="pt-2 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      triggerSavedToast();
                    }}
                    className="w-full bg-navy-dark hover:bg-navy-light text-white py-2.5 rounded-sm text-[10px] font-mono font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow"
                  >
                    <span>💾 ยืนยันการบันทึกข้อความส่วนนี้</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdminMode(false);
                      triggerSavedToast();
                    }}
                    className="w-full bg-gold hover:bg-amber-400 text-navy-dark py-2 rounded-sm text-[9px] font-mono tracking-wider uppercase transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>✔️ ยืนยันข้อมูลทั้งหมด &amp; ออกจากโหมดแก้ไข</span>
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <span className="label-small uppercase">About Us</span>
                  <h2 className="text-4xl md:text-5xl tracking-tighter uppercase leading-[0.9] font-tech text-navy-dark">
                    {aboutTitleL1} <br /><span className="text-gold">{aboutTitleGold}</span>
                  </h2>
                </div>
                <p className="text-lg text-slate-500 font-light leading-relaxed font-sans">
                  {aboutDesc}
                </p>
                <div className="grid grid-cols-1 gap-6">
                  {aboutBullets.map((item, idx) => {
                    if (!item.trim()) return null;
                    return (
                      <div key={idx} className="flex items-center gap-4 pb-4 border-b border-slate-100 group">
                        <div className="w-8 h-8 bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:border-gold transition-colors">
                          <div className="w-1.5 h-1.5 bg-gold"></div>
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-navy-dark font-tech">{item}</span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
