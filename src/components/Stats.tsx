import React from "react";
import { motion } from "motion/react";

export default function Stats() {
  const stats = [
    { value: "40+", label: "Completed Projects" },
    { value: "50+", label: "Experienced Staffs" },
    { value: "100%", label: "Clients Satifsaction" },
    { value: "0", label: "Accident Rate" },
  ];

  return (
    <section className="py-20 bg-navy-dark border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="space-y-2"
            >
              <span className="block text-4xl md:text-5xl font-black tracking-tight text-white font-tech">
                {stat.value}
              </span>
              <span className="mono-label text-slate-400">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
