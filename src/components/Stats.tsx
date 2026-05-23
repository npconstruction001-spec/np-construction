import React from "react";
import { motion } from "motion/react";
import { ShieldCheck, HardHat, Smile, Award } from "lucide-react";

export default function Stats() {
  const stats = [
    { value: "40+", label: "Completed Projects", desc: "โครงการที่ส่งมอบสำเร็จรวดเร็ว", icon: <Award className="text-red-500" size={24} /> },
    { value: "50+", label: "Experienced Staffs", desc: "ทีมวิศวกรสถาปัตยกรรมระดับประเทศ", icon: <HardHat className="text-red-500" size={24} /> },
    { value: "100%", label: "Clients Satisfaction", desc: "ความคุ้มค่าและความพอใจสูงสุด", icon: <Smile className="text-red-500" size={24} /> },
    { value: "0%", label: "Accident Rate", desc: "อัตราการเกิดอุบัติเหตุหน้างานเป็นศูนย์", icon: <ShieldCheck className="text-red-500" size={24} /> },
  ];

  return (
    <section className="py-24 bg-slate-950 border-b border-white/5 relative overflow-hidden">
      {/* Dynamic line vector */}
      <div className="absolute inset-0 bg-radial-gradient from-red-950/20 via-transparent to-transparent opacity-50 pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/5 border border-white/5 p-8 text-center flex flex-col items-center justify-between hover:border-red-500/35 transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-red-955/20 bg-red-900/20 flex items-center justify-center mb-4 border border-red-800/10 group-hover:bg-red-650 group-hover:bg-red-600 group-hover:text-white transition-all">
                {stat.icon}
              </div>
              <div className="space-y-1">
                <span className="block text-4xl font-black tracking-tight text-white font-sans">
                  {stat.value}
                </span>
                <span className="block text-xs font-bold text-slate-300 font-sans tracking-wide uppercase uppercase">
                  {stat.label}
                </span>
                <span className="block text-[10px] text-slate-500 font-sans">
                  {stat.desc}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
