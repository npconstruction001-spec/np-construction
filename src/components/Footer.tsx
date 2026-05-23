import React from "react";
import { NAV_LINKS } from "../constants/data";

interface FooterProps {
  onSecretClick?: () => void;
}

export default function Footer({ onSecretClick }: FooterProps) {
  return (
    <footer className="bg-white text-navy-dark pt-32 pb-10 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex flex-col">
              <span className="text-3xl font-black tracking-tighter leading-none font-tech">
                NP CONDUCTION
              </span>
              <span className="label-small mt-1 text-slate-400 font-mono text-[9px] uppercase tracking-widest font-bold">
                Limited Partnership
              </span>
            </div>
            <p className="text-slate-500 max-w-sm leading-relaxed font-light font-sans text-sm">
              มุ่งมั่นสร้างสรรค์งานวิศวกรรมที่มีความแม่นยำและปลอดภัยสูงสุด 
              เพื่อเป็นรากฐานที่แข็งแกร่งให้กับการเติบโตของธุรกิจคุณในระยะยาว
            </p>
          </div>
          
          <div>
            <h4 className="label-small text-gold mb-10 font-tech">Navigation</h4>
            <ul className="space-y-4 text-xs font-black uppercase tracking-widest text-slate-500">
              {NAV_LINKS.map(link => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-gold transition-colors">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="label-small text-gold mb-10 font-tech">Capabilities</h4>
            <ul className="space-y-4 text-xs font-black uppercase tracking-widest text-slate-500">
              <li><a href="#services" className="hover:text-gold transition-colors">Civil Construction</a></li>
              <li><a href="#services" className="hover:text-gold transition-colors">Electrical Systems</a></li>
              <li><a href="#services" className="hover:text-gold transition-colors">Mechanical Piping</a></li>
              <li><a href="#services" className="hover:text-gold transition-colors">Project Management</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-10 flex flex-col md:flex-row justify-between items-center gap-10">
          <p 
            onClick={onSecretClick}
            className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400 cursor-pointer select-none active:text-gold transition-colors duration-150"
            title="NP Security System"
          >
            © {new Date().getFullYear()} NP Conduction Limited Partnership.
          </p>
          <div className="flex gap-10 text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400">
            <a href="#" className="hover:text-gold transition-colors">Privacy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
