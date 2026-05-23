import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, Lock, Menu, X } from "lucide-react";
import { NAV_LINKS } from "../constants/data";

interface HeaderProps {
  isLoggedIn: boolean;
  isAdminMode: boolean;
  scrolled: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: (v: boolean) => void;
  handleLogout: () => void;
  handleToggleAdminMode: () => void;
  onSecretClick?: () => void;
}

export default function Header({
  isLoggedIn,
  isAdminMode,
  scrolled,
  isMenuOpen,
  setIsMenuOpen,
  handleLogout,
  handleToggleAdminMode,
  onSecretClick,
}: HeaderProps) {
  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-navy-dark shadow-2xl py-2" : "bg-navy-dark/95 py-4"
        } border-b border-gold/20`}
      >
        <div className="max-w-7xl mx-auto px-10 flex justify-between items-center">
          <div 
            onClick={onSecretClick}
            className="flex flex-col cursor-pointer group select-none"
            title="NP Conduction"
          >
            <span className="text-2xl font-black tracking-tighter text-gold leading-none font-tech group-hover:text-amber-300 transition-colors duration-200">
              NP CONDUCTION
            </span>
            <span className="mono-label mt-1 group-hover:text-white transition-colors duration-200">
              Limited Partnership
            </span>
          </div>

          <nav className="hidden md:flex gap-10 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-gold transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn && (
              <>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 text-[9px] font-black uppercase tracking-widest text-red-400 bg-red-950/20 border border-red-900/40 rounded-sm hover:bg-red-600 hover:text-white transition-all font-mono cursor-pointer"
                  title="ออกจากระบบผู้ดูแลระบบเพื่อความปลอดภัย"
                >
                  ออกจากระบบ (Logout)
                </button>
                <button
                  onClick={handleToggleAdminMode}
                  className={`px-4.5 py-2.5 text-xs font-bold uppercase tracking-widest rounded-sm transition-all flex items-center gap-2 border cursor-pointer ${
                    isAdminMode
                      ? "bg-gold text-navy-dark border-gold shadow-lg"
                      : "bg-navy-dark/40 text-slate-300 border-white/20 hover:bg-gold hover:text-navy-dark hover:border-gold"
                  }`}
                >
                  <ShieldCheck size={13} className="text-emerald-400" />
                  {isAdminMode ? "ปิดโหมดแก้ไข" : "ปุ่มเปิดโหมดแก้ไขรูป/วิดีโอ 📷"}
                </button>
              </>
            )}
            <a
              href="#contact"
              className="bg-gold text-navy-dark px-6 py-2.5 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-gold-hover transition-all shadow-lg font-mono"
            >
              Request Quote
            </a>
          </div>

          <button
            className="md:hidden text-white cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-navy-dark md:hidden pt-24 px-6"
          >
            <div className="flex flex-col space-y-6 text-xl">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-slate-300 border-b border-white/10 pb-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col gap-4 pt-4">
                {isLoggedIn && (
                  <>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="px-3 py-3 w-full text-[11px] font-black uppercase tracking-widest text-red-500 bg-red-950/20 border border-red-900/40 rounded-sm font-mono cursor-pointer"
                    >
                      ออกจากระบบ (Logout)
                    </button>
                    <button
                      onClick={() => {
                        handleToggleAdminMode();
                        setIsMenuOpen(false);
                      }}
                      className={`w-full py-4 text-xs font-mono font-bold uppercase tracking-widest rounded-sm transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                        isAdminMode
                          ? "bg-gold text-navy-dark border-gold"
                          : "bg-navy-dark/40 text-slate-300 border-white/20"
                      }`}
                    >
                      <ShieldCheck size={14} className="text-emerald-400" />
                      {isAdminMode ? "ปิดโหมดแก้ไข" : "ปุ่มเปิดโหมดแก้ไขรูป/วิดีโอ 📷"}
                    </button>
                  </>
                )}
                <a
                  href="#contact"
                  className="bg-gold text-navy-dark py-4 rounded-sm font-bold text-center text-sm uppercase tracking-wider"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ขอใบเสนอราคา
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
