import React from "react";
import { motion, AnimatePresence } from "motion/react";

interface ToastProps {
  showSavedToast: boolean;
}

export default function Toast({ showSavedToast }: ToastProps) {
  return (
    <AnimatePresence>
      {showSavedToast && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] bg-emerald-950/95 text-emerald-300 border border-emerald-500/30 px-6 py-4 rounded-sm shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex items-center gap-3 backdrop-blur-md"
        >
          <div className="w-5 h-5 rounded-full bg-emerald-500 text-navy-dark flex items-center justify-center font-bold text-xs shrink-0">
            ✓
          </div>
          <div className="text-left font-sans">
            <span className="block text-xs font-sans font-black tracking-wider uppercase text-white leading-none">บันทึกข้อมูลสำเร็จ!</span>
            <span className="text-[10px] font-mono text-emerald-400 mt-1 block">รายละเอียดได้รับการจัดเก็บเข้าระบบเรียบร้อยแล้วค่ะ 💾</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
