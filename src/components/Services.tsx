import React from "react";
import { motion } from "motion/react";
import { ChevronRight, Building2, Zap, Wrench, Cpu } from "lucide-react";
import { Service } from "../types";

interface ServicesProps {
  isAdminMode: boolean;
  servicesSectionTitle: string;
  setServicesSectionTitle: (v: string) => void;
  servicesSectionGold: string;
  setServicesSectionGold: (v: string) => void;
  servicesSectionDesc: string;
  setServicesSectionDesc: (v: string) => void;
  servicesData: Service[];
  setServicesData: (v: Service[]) => void;
  triggerSavedToast: () => void;
  setIsAdminMode: (v: boolean) => void;
}

const ICONS_LIST = [Building2, Zap, Wrench, Cpu];

export default function Services({
  isAdminMode,
  servicesSectionTitle,
  setServicesSectionTitle,
  servicesSectionGold,
  setServicesSectionGold,
  servicesSectionDesc,
  setServicesSectionDesc,
  servicesData,
  setServicesData,
  triggerSavedToast,
  setIsAdminMode,
}: ServicesProps) {

  const handleUpdateServiceField = (index: number, key: keyof Service, value: any) => {
    const updated = [...servicesData];
    updated[index] = {
      ...updated[index],
      [key]: value
    };
    setServicesData(updated);
  };

  const handleUpdateDetailField = (serviceIndex: number, detailIndex: number, value: string) => {
    const updated = [...servicesData];
    const details = [...updated[serviceIndex].details];
    details[detailIndex] = value;
    updated[serviceIndex] = {
      ...updated[serviceIndex],
      details
    };
    setServicesData(updated);
  };

  return (
    <section id="services" className="py-32 bg-paper border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-12 gap-12 mb-20">
          <div className="col-span-12 lg:col-span-6 space-y-4">
            <span className="label-small text-gold uppercase tracking-widest font-mono">What We Do</span>
            {isAdminMode ? (
              <div className="space-y-2 bg-white/90 p-4 border border-slate-200 rounded-sm shadow">
                <span className="text-[9px] font-mono text-slate-500 uppercase font-black block">หัวข้อหลัก</span>
                <input
                  type="text"
                  value={servicesSectionTitle}
                  onChange={(e) => setServicesSectionTitle(e.target.value)}
                  className="bg-white border border-slate-300 rounded p-1.5 text-navy-dark text-sm font-sans tracking-tight leading-none font-bold w-full"
                />
                <label className="text-[8px] font-mono uppercase text-slate-500 block font-bold mt-1">คำเชื่อมสีทอง</label>
                <input
                  type="text"
                  value={servicesSectionGold}
                  onChange={(e) => setServicesSectionGold(e.target.value)}
                  className="bg-white border border-slate-300 text-gold text-sm font-sans tracking-tight p-1.5 w-full font-bold"
                />
              </div>
            ) : (
              <h2 className="text-4xl md:text-6xl tracking-tighter uppercase leading-[0.9] text-navy-dark font-tech">
                {servicesSectionTitle} <br /><span className="text-gold">{servicesSectionGold}</span>
              </h2>
            )}
          </div>
          <div className="col-span-12 lg:col-span-6 flex items-end">
            {isAdminMode ? (
              <div className="w-full space-y-1 bg-white/90 p-4 border border-slate-200 rounded-sm shadow">
                <span className="text-[9px] font-mono text-slate-500 uppercase font-black block">คำบรรยายหัวข้อคุณความถนัด</span>
                <textarea
                  value={servicesSectionDesc}
                  onChange={(e) => setServicesSectionDesc(e.target.value)}
                  rows={3}
                  className="w-full bg-white border border-slate-200 rounded p-1.5 text-xs text-slate-600 leading-relaxed font-sans"
                />
              </div>
            ) : (
              <p className="text-slate-500 font-light text-lg font-sans">
                {servicesSectionDesc}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-slate-200">
          {servicesData.map((service, idx) => {
            const Icon = ICONS_LIST[idx % ICONS_LIST.length] || Building2;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="p-12 bg-white border-r border-b border-slate-200 flex flex-col justify-between h-[520px] transition-all duration-300 hover:bg-navy-dark hover:border-navy-dark group relative overflow-hidden"
              >
                {/* Background decorative token */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full translate-x-10 -translate-y-10 group-hover:bg-white/5 transition-colors pointer-events-none"></div>

                <div className="space-y-8 relative z-10">
                  <div className="w-16 h-16 bg-slate-50 border border-slate-200 flex items-center justify-center text-navy-dark group-hover:bg-gold group-hover:border-gold group-hover:text-navy-dark transition-all duration-300">
                    <Icon size={24} />
                  </div>
                </div>

                {isAdminMode ? (
                  <div className="space-y-3 bg-slate-50 border border-slate-200 p-4 rounded-sm text-xs text-navy-dark mt-4 relative z-10">
                    <label className="text-[8px] font-mono uppercase text-slate-500 block font-bold">ชื่อผลิตภัณฑ์งานบริการ</label>
                    <input
                      type="text"
                      value={service.title}
                      onChange={(e) => handleUpdateServiceField(idx, "title", e.target.value)}
                      className="bg-white border rounded p-1 text-slate-850 w-full text-xs font-sans font-bold text-navy-dark"
                    />
                    <label className="text-[8px] font-mono uppercase text-slate-500 block font-bold">คำจำกัดความสั้น</label>
                    <textarea
                      value={service.description}
                      onChange={(e) => handleUpdateServiceField(idx, "description", e.target.value)}
                      rows={2}
                      className="bg-white border rounded p-1 text-slate-700 w-full text-[11px] font-sans"
                    />
                    <label className="text-[8px] font-mono uppercase text-slate-500 block font-bold">รายละเอียดย่อย (3 ข้อ)</label>
                    <div className="space-y-1">
                      {service.details.map((detail, dIdx) => (
                        <input
                          key={dIdx}
                          type="text"
                          value={detail}
                          onChange={(e) => handleUpdateDetailField(idx, dIdx, e.target.value)}
                          className="bg-white border rounded p-1 text-slate-700 w-full text-[10px] font-sans"
                        />
                      ))}
                    </div>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          triggerSavedToast();
                        }}
                        className="w-full bg-gold hover:bg-amber-400 text-navy-dark py-1.5 rounded-sm text-[9px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1 shadow"
                      >
                        <span>💾 บันทึกการ์ดใบนี้</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-6 text-navy-dark group-hover:text-gold transition-colors font-tech leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-500 group-hover:text-slate-400 mb-8 leading-relaxed font-sans font-medium">
                      {service.description}
                    </p>
                    <ul className="space-y-3">
                      {service.details.map((detail: string, dIdx: number) => {
                        if (!detail.trim()) return null;
                        return (
                          <li key={dIdx} className="text-[10px] uppercase font-bold tracking-widest text-slate-400 group-hover:text-slate-500 flex items-center gap-2">
                            <ChevronRight size={10} className="text-gold" />
                            {detail}
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>

        {isAdminMode && (
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              type="button"
              onClick={() => {
                triggerSavedToast();
              }}
              className="bg-navy-dark hover:bg-navy-light text-white px-8 py-3.5 text-[10px] font-mono font-black uppercase tracking-widest rounded transition-all cursor-pointer border border-gold/20 flex items-center gap-2"
            >
              <span>💾 บันทึกข้อมูลงานบริการหลักทั้งหมด</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAdminMode(false);
                triggerSavedToast();
              }}
              className="bg-gold hover:bg-amber-400 text-navy-dark px-8 py-3.5 text-[10px] font-mono font-black uppercase tracking-widest rounded transition-all cursor-pointer flex items-center gap-2"
            >
              <span>✔️ ยืนยันข้อความ &amp; ปิดโหมดผู้ดูแล</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
