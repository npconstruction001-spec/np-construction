import React from "react";
import { NAV_LINKS } from "../constants/data";
import CompanyLogo from "./CompanyLogo";

interface FooterProps {
  onSecretClick?: () => void;
}

export default function Footer({ onSecretClick }: FooterProps) {
  return (
    <footer className="bg-slate-950 text-white pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Design Vector lines */}
      <div className="absolute right-0 bottom-0 w-64 h-64 bg-red-950/10 rounded-full blur-3xl pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 font-sans">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <CompanyLogo className="w-11 h-11" lightMode={false} />
              <div className="flex flex-col text-left">
                <span className="text-xl font-bold tracking-tight leading-none uppercase text-white">
                  NP CONDUCTION
                </span>
                <span className="text-[8px] font-mono tracking-widest uppercase text-red-500 font-extrabold mt-1">
                  Limited Partnership
                </span>
              </div>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed font-light text-xs font-sans">
              มุ่งมั่นสร้างสรรค์งานวิศวกรรมที่มีความแม่นยำและปลอดภัยสูงสุด 
              ตามประมวลกฎหมายควบคุมสากล เพื่อเป็นรากฐานที่แข็งแกร่งให้กับการเติบโตของธุรกิจทั่วไปทั้งภาครัฐและเอกชน
            </p>
          </div>
          
          <div>
            <h4 className="text-[10px] font-mono tracking-widest text-red-500 font-extrabold mb-6 uppercase">Navigation</h4>
            <ul className="space-y-3 text-[11px] font-bold uppercase tracking-widest text-slate-450 text-slate-400 font-mono">
              {NAV_LINKS.map(link => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-white hover:text-red-500 transition-colors">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-mono tracking-widest text-red-500 font-extrabold mb-6 uppercase">Capabilities</h4>
            <ul className="space-y-3 text-[11px] font-bold uppercase tracking-widest text-slate-400 font-mono">
              <li><a href="#services" className="hover:text-red-500 transition-colors">Civil Construction</a></li>
              <li><a href="#services" className="hover:text-red-500 transition-colors">Electrical Systems</a></li>
              <li><a href="#services" className="hover:text-red-500 transition-colors">Mechanical Piping</a></li>
              <li><a href="#services" className="hover:text-red-500 transition-colors">Project Management</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p 
            onClick={onSecretClick}
            className="text-[9px] uppercase font-bold tracking-[0.2em] text-slate-500 cursor-pointer select-none active:text-red-500 transition-colors duration-150"
            title="NP Security System"
          >
            © {new Date().getFullYear()} NP Conduction Limited Partnership. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-[9px] uppercase font-bold tracking-[0.2em] text-slate-500 font-mono">
            <a href="#" className="hover:text-white transition-colors">Privacy Statement</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Operations</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
