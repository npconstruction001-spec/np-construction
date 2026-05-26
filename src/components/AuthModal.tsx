import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShieldCheck, Lock, Sparkles } from "lucide-react";

interface AuthModalProps {
  showAuthModal: boolean;
  setShowAuthModal: (v: boolean) => void;
  authEmail: string;
  setAuthEmail: (v: string) => void;
  authPassword: string;
  setAuthPassword: (v: string) => void;
  authError: string | null;
  setAuthError: (v: string | null) => void;
  authSuccess: boolean;
  setAuthSuccess: (v: boolean) => void;
  handleAuthSubmit: (e: React.FormEvent) => void;
  setIsLoggedIn: (v: boolean) => void;
  setIsAdminMode: (v: boolean) => void;
}

export default function AuthModal({
  showAuthModal,
  setShowAuthModal,
  authEmail,
  setAuthEmail,
  authPassword,
  setAuthPassword,
  authError,
  setAuthError,
  authSuccess,
  setAuthSuccess,
  handleAuthSubmit,
  setIsLoggedIn,
  setIsAdminMode,
}: AuthModalProps) {
  return (
    <AnimatePresence>
      {showAuthModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-lg p-6 font-sans"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="w-full max-w-md bg-navy-dark text-white border-2 border-gold/40 p-8 shadow-[0_30px_60px_rgba(0,0,0,0.8)] rounded-sm relative"
          >
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-1 cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center space-y-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
                {authSuccess ? (
                  <ShieldCheck size={32} className="animate-bounce text-emerald-400" />
                ) : (
                  <Lock size={32} className="animate-pulse" />
                )}
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gold font-tech">
                  Admin Security Gateway
                </h3>
                <p className="text-[11px] uppercase tracking-wider text-slate-400 mt-1 font-mono">
                  Authorized Access Control
                </p>
              </div>
              <div className="w-12 h-0.5 bg-gold/50"></div>
              <p className="text-xs text-slate-300 font-light leading-relaxed max-w-sm">
                ระบบจำกัดสิทธิ์ความปลอดภัยสูงสุดเฉพาะบุคคลที่ใช้บัญชีอีเมล <b className="text-gold font-mono text-xs">npconstruction001@gmail.com</b> เท่านั้นในการแก้ไขเนื้อหาพอร์ตโฟลิโอและวิดีโอ
              </p>
            </div>

            {authSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="text-emerald-400 font-bold text-sm tracking-wide flex items-center justify-center gap-2">
                  <Sparkles size={16} className="text-gold animate-spin" />
                  ยืนยันตัวตนสำเร็จ! กำลังเข้าสู่โหมดแก้ไข...
                </div>
                <p className="text-[10px] text-slate-400 leading-normal">
                  ยินดีต้อนรับคุณแอดมิน NP Conduction เข้าสู่โปรแกรมบริหารรายละเอียดหลักของบริษัท
                </p>
              </div>
            ) : (
              <form onSubmit={handleAuthSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block font-mono">
                    ระบุอีเมลผู้ดูแลระบบ (ADMIN EMAIL)
                  </label>
                  <input
                    type="email"
                    required
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="ระบุอีเมลผู้ดูแลระบบ"
                    className="w-full bg-navy-light/60 border border-white/10 p-4.5 rounded-sm outline-none focus:border-gold transition-colors text-xs font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block font-mono">
                      รหัสผ่านเข้าถึงด่วน (ACCESS CODE)
                    </label>
                  </div>
                  <input
                    type="password"
                    required
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="กรอกรหัสผ่านเพื่อยืนยัน"
                    className="w-full bg-navy-light/60 border border-white/10 p-4.5 rounded-sm outline-none focus:border-gold transition-colors text-xs font-mono"
                  />
                </div>

                {authError && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-[11px] bg-red-950/40 border border-red-900/30 p-3 rounded-sm leading-relaxed"
                  >
                    {authError}
                  </motion.div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-gold hover:bg-gold-hover text-navy-dark py-4 uppercase font-bold tracking-widest text-xs rounded-sm transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer font-sans"
                  >
                    <ShieldCheck size={14} /> ตรวจสอบสิทธิ์และเปิดใช้งานเครื่องมือ
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
