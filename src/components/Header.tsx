import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, Lock, Menu, X, ArrowUpRight, PhoneCall } from "lucide-react";
import { NAV_LINKS } from "../constants/data";
import CompanyLogo from "./CompanyLogo";

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
          scrolled 
            ? "bg-white shadow-[0_4px_30px_rgba(0,0,0,0.04)] border-b border-slate-100 py-3 text-slate-900" 
            : "bg-slate-950/40 backdrop-blur-xs border-b border-white/5 py-4 text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center">
          
          {/* Logo Brand mimicking AESCON premium corporate signature with pristine circular logo seal */}
          <div 
            onClick={onSecretClick}
            className="flex items-center gap-3 cursor-pointer group select-none"
            title="NP CONDUCTION"
          >
            {/* Real corporate constructor circular seal logo */}
            <CompanyLogo className="w-11 h-11 transition-transform group-hover:scale-105 duration-300" lightMode={scrolled} />
            
            <div className="flex flex-col text-left">
              <span className={`text-base font-black tracking-tight leading-none font-sans uppercase ${
                scrolled ? "text-slate-900" : "text-white"
              }`}>
                NP CONDUCTION
              </span>
              <span className="text-[8px] font-mono tracking-widest uppercase text-red-500 font-extrabold mt-1">
                Engineering &amp; Construction
              </span>
            </div>
          </div>

          {/* Navigation links - AESCON style centered horizontally */}
          <nav className="hidden lg:flex gap-8 font-sans text-xs font-bold uppercase tracking-wider">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`relative py-1 transition-colors duration-200 cursor-pointer ${
                  scrolled 
                    ? "text-slate-650 text-slate-600 hover:text-red-600" 
                    : "text-slate-300 hover:text-white"
                } group`}
              >
                {link.name}
                {/* Thin underline transition effect */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Consultation and admin mode flags right adjusted */}
          <div className="hidden lg:flex items-center gap-4">
            
            {/* Quick logout & admin buttons */}
            {isLoggedIn && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleLogout}
                  className="px-2.5 py-1.5 text-[8px] font-mono font-bold uppercase tracking-widest text-red-500 bg-red-50 border border-red-200 hover:bg-red-650 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
                  title="ออกจากระบบ"
                >
                  LOGOUT
                </button>
                <button
                  onClick={handleToggleAdminMode}
                  className={`px-3 py-1.5 text-[8px] font-mono font-bold uppercase tracking-widest rounded-sm transition-all flex items-center gap-1.5 border cursor-pointer ${
                    isAdminMode
                      ? "bg-red-600 text-white border-red-600 shadow"
                      : scrolled 
                        ? "bg-slate-100 text-slate-700 border-slate-200 hover:bg-red-600 hover:text-white hover:border-red-600"
                        : "bg-white/5 text-slate-300 border-white/10 hover:bg-red-600 hover:text-white hover:border-red-600"
                  }`}
                >
                  <ShieldCheck size={11} className={isAdminMode ? "text-white animate-pulse" : "text-red-500"} />
                  {isAdminMode ? "EDIT ACTIVE" : "OPEN EDITOR"}
                </button>
              </div>
            )}

            <a
              href="#contact"
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 text-xs font-bold uppercase tracking-widest flex items-center gap-2 rounded-sm shadow-md shadow-red-900/10 cursor-pointer transition-all hover:translate-y-[-1px]"
            >
              <span>ติดต่อสอบถามโครงการ</span>
              <ArrowUpRight size={13} />
            </a>
          </div>

          {/* Small Device controls */}
          <button
            className={`lg:hidden cursor-pointer ${scrolled ? "text-slate-900" : "text-white"}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Responsive drawer overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 right-0 w-full sm:w-80 z-40 bg-slate-950 text-white pt-28 px-10 flex flex-col justify-between pb-10 shadow-2xl"
          >
            <div className="space-y-8 text-left">
              <span className="text-[10px] tracking-[0.25em] text-red-500 block font-black uppercase font-mono">NAVIGATION CODES</span>
              
              <div className="flex flex-col space-y-5 text-lg font-bold font-sans">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-slate-200 hover:text-red-500 pb-3 border-b border-white/5 text-sm uppercase tracking-wide flex justify-between items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight size={14} className="text-slate-500" />
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {isLoggedIn && (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full py-3 text-[10px] font-mono font-bold uppercase tracking-widest text-red-500 bg-red-950/30 border border-red-900/50 cursor-pointer"
                  >
                    ออกจากระบบ (LOGOUT ADMIN)
                  </button>
                  <button
                    onClick={() => {
                      handleToggleAdminMode();
                      setIsMenuOpen(false);
                    }}
                    className={`w-full py-3.5 text-xs font-mono font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 border cursor-pointer ${
                      isAdminMode
                        ? "bg-red-600 text-white border-red-600"
                        : "bg-white/5 text-slate-300 border-white/10"
                    }`}
                  >
                    <ShieldCheck size={14} className="text-red-500" />
                    {isAdminMode ? "ปิดโหมดผู้ดูแล" : "เปิดโหมดผู้ดูแล"}
                  </button>
                </div>
              )}

              <a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="w-full bg-red-600 hover:bg-red-700 text-center text-white py-4 text-xs font-bold uppercase tracking-widest block"
              >
                ขอประเมินราคาฟรี 👷
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
