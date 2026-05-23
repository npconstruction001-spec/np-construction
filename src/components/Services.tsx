import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  ChevronRight, 
  Building2, 
  Zap, 
  Wrench, 
  Cpu, 
  ShieldCheck, 
  Flame, 
  Droplet,
  Edit2,
  Trash,
  Plus,
  RefreshCw,
  CheckCircle2
} from "lucide-react";
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

const ICONS_MAP: Record<string, any> = {
  building: Building2,
  zap: Zap,
  wrench: Wrench,
  cpu: Cpu,
  shield: ShieldCheck,
  flame: Flame,
  droplet: Droplet
};

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

  const [activeTab, setActiveTab] = useState<number>(0);

  const handleUpdateServiceField = (index: number, key: keyof Service, value: any) => {
    const updated = [...servicesData];
    updated[index] = {
      ...updated[index],
      [key]: value
    };
    setServicesData(updated);
    localStorage.setItem("np_services_data_v4", JSON.stringify(updated));
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
    localStorage.setItem("np_services_data_v4", JSON.stringify(updated));
  };

  const handleAddNewService = () => {
    const newItem: Service = {
      title: "งานสาขาวิศวกรรมใหม่ (NEW ENGINEERING SERVICE)",
      description: "คำอธิบายรายละเอียดประเภทของงานก่อสร้างใหม่เพื่อรองรับการเจริญเติบโตรัฐ-เอกชน",
      details: [
        "คุมหน้างานโดยสถาปนิกวิชาเอก",
        "ใช้วัสดุก่อสร้างเกรดพรีเมียม",
        "รับประกันคุณภาพตามสัญญาตกลง"
      ],
      icon: "building"
    };
    const updated = [...servicesData, newItem];
    setServicesData(updated);
    localStorage.setItem("np_services_data_v4", JSON.stringify(updated));
    setActiveTab(updated.length - 1);
    triggerSavedToast();
  };

  const handleDeleteService = (index: number) => {
    if (window.confirm("คุณต้องการลบบริการหลักนี้ออกอย่างถาวรใช่หรือไม่คะ?")) {
      const updated = servicesData.filter((_, idx) => idx !== index);
      setServicesData(updated);
      localStorage.setItem("np_services_data_v4", JSON.stringify(updated));
      setActiveTab(0);
      triggerSavedToast();
    }
  };

  const handleResetToDefaultServices = () => {
    if (window.confirm("คุณต้องการกู้คืนข้อมูลประเภทงานบริการเริ่มต้นประวัติบริษัทกลับมาหรือไม่คะ?")) {
      const defaultServices: Service[] = [
        {
          title: "งานรับเหมาก่อสร้างและสถาปัตยกรรมโยธา",
          description: "รับเหมาก่อสร้างโรงงาน โกดังเก็บสินค้า คลังสินค้าขนาดใหญ่ สำนักงาน และอาคารสิ่งปลูกสร้างทดแทนทั่วไป",
          details: [
            "งานฐานราก เสาเข็ม โครงสร้างเหล็กและคอนกรีตเสริมเหล็กที่แข็งแรง",
            "งานตกแต่งสถาปัตยกรรมภายในและภายนอกครบชุด",
            "ควบคุมและวางแผนโดยสถาปนิกและวิศวกรวิชาชีพควบคุม"
          ],
          icon: "building"
        },
        {
          title: "งานวางระบบวิศวกรรมไฟฟ้าและเครื่องกล (MEP & MDB)",
          description: "ติดตั้งตู้ไฟฟ้าควบคุม MDB หม้อแปลงแรงดัน เดินสายไฟฟ้ารอบโรงงาน และเครื่องจักรขนาดใหญ่ในเขตนิคม",
          details: [
            "งานวางระบบไฟฟ้าหลักและตู้ควบคุมจ่ายแรงดันประสิทธิภาพแรงสูง",
            "งานระบบประปาน้ำดี น้ำเสีย สุขาภิบาล และเครื่องสูบจ่ายลมอาคาร",
            "งานบำรุงรักษาและตรวจทดสอบตู้ระบบไฟฟ้าความปลอดภัยสูง"
          ],
          icon: "zap"
        },
        {
          title: "งานติดตั้งระบบป้องกันอัคคีภัยและการดับเพลิง",
          description: "วางท่อดับเพลิง ติดตั้งสปริงเกลอร์ตรวจจับควันไฟ ถังแรงดัน และสัญญาณร้องเตือนกรณีฉุกเฉิน",
          details: [
            "ติดตั้งระบบ Fire Alarm, Smoke Detector, Heat Detector ได้มาตรฐานสากล",
            "งานวางท่อดับเพลิงและหัวฉีดน้ำสปริงเกลอร์อัตโนมัติประจำล็อค",
            "ระบบตรวจวัดความต้านทานแรงดันและการซึมท่อส่งแรงดันระดับสากล"
          ],
          icon: "flame"
        },
        {
          title: "งานบำรุงรักษาอาคารและโครงสร้างโรงงานครบวงจร",
          description: "สำรวจรอยแตกร้าว ปรึกษาหน้างาน วางระบบกันซึม ซ่อมแซมอพาร์ตเมนต์ และติดตั้งวัสดุกระหม่อมปลอดภัย",
          details: [
            "งานซ่อมบำรุงเปลี่ยนหลังคา Metal Sheet ป้องกันน้ำฝนซึมเข้าพื้นที่",
            "งานเคลือบผิวลานจัดเก็บพลาสติกอีพ็อกซี่และเคลือบเงาคอนกรีต",
            "ตรวจเช็คสภาพโครงสร้างทั่วไปประจำนิคมด้วยกล้องวัดความร้อน"
          ],
          icon: "wrench"
        }
      ];
      setServicesData(defaultServices);
      localStorage.setItem("np_services_data_v4", JSON.stringify(defaultServices));
      setActiveTab(0);
      triggerSavedToast();
    }
  };

  return (
    <section id="services" className="py-24 md:py-32 bg-white relative overflow-hidden font-sans border-b border-slate-250">
      
      {/* Visual background lines */}
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-red-50/35 rounded-full blur-3xl pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 animate-fade-in animate-duration-500">
        
        {/* AESCON Layout Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-slate-100 pb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="h-px w-8 bg-red-650 inline-block bg-red-600"></span>
              <span className="text-[10px] font-mono tracking-[0.25em] text-red-600 font-extrabold uppercase">OUR BUSINESS OPERATIONS</span>
            </div>
            {isAdminMode ? (
              <div className="space-y-2 max-w-xl">
                <span className="text-[9px] font-mono text-slate-400 block font-bold">หัวข้อสตรีมบริการหลัก</span>
                <input
                  type="text"
                  value={servicesSectionTitle}
                  onChange={(e) => {
                    setServicesSectionTitle(e.target.value);
                    localStorage.setItem("np_services_section_title_v4", e.target.value);
                  }}
                  className="bg-white border border-slate-300 rounded p-2 text-slate-900 text-lg font-bold w-full"
                />
                <input
                  type="text"
                  value={servicesSectionGold}
                  onChange={(e) => {
                    setServicesSectionGold(e.target.value);
                    localStorage.setItem("np_services_section_gold_v4", e.target.value);
                  }}
                  className="bg-white border border-slate-300 text-red-600 text-lg font-bold p-2 w-full mt-1"
                />
              </div>
            ) : (
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight uppercase">
                {servicesSectionTitle} <br />
                <span className="text-red-600">{servicesSectionGold}</span>
              </h2>
            )}
          </div>
          
          <div className="max-w-md">
            {isAdminMode ? (
              <div className="space-y-1">
                <span className="text-[8px] font-mono text-slate-400 block font-bold">คำอธิบายหน้าหมวดรวม</span>
                <textarea
                  value={servicesSectionDesc}
                  onChange={(e) => {
                    setServicesSectionDesc(e.target.value);
                    localStorage.setItem("np_services_section_desc_v4", e.target.value);
                  }}
                  rows={2}
                  className="w-full bg-white border border-slate-300 text-slate-600 p-2 text-xs"
                />
              </div>
            ) : (
              <p className="text-xs md:text-sm text-slate-500 font-sans leading-relaxed">
                {servicesSectionDesc}
              </p>
            )}
          </div>
        </div>

        {/* 100% AESCON - Interactive Services Columns list and details card grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
          
          {/* LEFT: Category Selectors List of services */}
          <div className="lg:col-span-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2.5">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">
                เลือกแถมรายการธุรกิจหลักเพื่อดูรายละเอียด:
              </span>

              <div className="flex flex-col gap-2">
                {servicesData.map((svc, sIdx) => {
                  const Icon = ICONS_MAP[svc.icon as any] || Building2;
                  const isActive = activeTab === sIdx;
                  return (
                    <button
                      key={sIdx}
                      type="button"
                      onClick={() => setActiveTab(sIdx)}
                      className={`w-full text-left p-4 md:p-5 rounded-none border transition-all flex items-start justify-between gap-4 cursor-pointer relative group ${
                        isActive
                          ? "bg-slate-905 bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-900/15"
                          : "bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-350 hover:bg-slate-100/70"
                      }`}
                    >
                      {/* Left color bar of lists mimicking AESCON buttons */}
                      {isActive && (
                        <div className="absolute left-0 inset-y-0 w-1.5 bg-red-600" />
                      )}

                      <div className="flex items-start gap-4">
                        <div className={`p-2.5 rounded-sm flex items-center justify-center transition-colors ${
                          isActive ? "bg-red-650 bg-red-600 text-white" : "bg-white text-slate-700 border border-slate-200"
                        }`}>
                          <Icon size={16} />
                        </div>
                        <div>
                          <span className={`text-[9px] uppercase font-mono font-bold tracking-wide block ${isActive ? "text-red-400" : "text-slate-400"}`}>
                            DIVISION 0{sIdx + 1}
                          </span>
                          <span className="text-sm font-extrabold block leading-snug tracking-tight mt-0.5 font-sans">
                            {svc.title}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center self-center">
                        <ChevronRight size={16} className={`transition-transform duration-300 ${
                          isActive ? "text-red-500 translate-x-1" : "text-slate-400 group-hover:translate-x-1"
                        }`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick admin controls to add more items */}
            {isAdminMode ? (
              <div className="flex gap-2.5 pt-4 border-t border-slate-200/80 mt-4">
                <button
                  type="button"
                  onClick={handleAddNewService}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-3 uppercase tracking-wider transition-all flex items-center justify-center gap-2 rounded-sm"
                >
                  <Plus size={14} /> เพิ่มบริการใหม่
                </button>
                <button
                  type="button"
                  onClick={handleResetToDefaultServices}
                  className="bg-white hover:bg-slate-100 text-slate-500 border border-slate-300 px-3.5 py-3 text-xs transition-colors"
                  title="กู้คืนชุดดั้งเดิม"
                >
                  <RefreshCw size={14} />
                </button>
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-none border-dashed mt-4">
                <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                  👷 <strong>ต้องการรายละเอียดเชิงลึก?</strong> ท่านสามารถส่งข้อความสอบถามราคาประเมินและขอเข้าสำรวจหน้างานจริงกับทีมนายช่างหลักของ หจก. เอ็นพี คอนดักชั่น ได้ทันทีที่แบบฟอร์มด้านล่างสุดค่ะ
                </p>
              </div>
            )}
          </div>

          {/* RIGHT: Detailed Card display matching active selected item (100% AESCON details showcase format) */}
          <div className="lg:col-span-7">
            {servicesData[activeTab] ? (
              <div className="bg-slate-900 text-white border border-slate-800 p-8 md:p-11 rounded-none shadow-2xl flex flex-col justify-between h-full relative overflow-hidden group">
                
                {/* Embedded dynamic geometric pattern (Behind text card) */}
                <div className="absolute right-0 bottom-0 w-80 h-80 bg-red-900/10 rounded-full translate-x-20 translate-y-20 pointer-events-none group-hover:bg-red-800/15 transition-all duration-500"></div>
                <div className="absolute top-0 right-0 w-16 h-1 bg-red-650 bg-red-600" />

                <div className="space-y-8 relative z-10">
                  {/* Category Title HUD details */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-5">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono tracking-widest text-red-500 font-black block uppercase">
                        OPERATIONAL CAPABILITIES / DIVISION 0{activeTab + 1}
                      </span>
                      <h3 className="text-xl md:text-2xl font-black tracking-tight uppercase font-sans text-white">
                        {servicesData[activeTab].title}
                      </h3>
                    </div>
                    {isAdminMode && (
                      <button
                        onClick={() => handleDeleteService(activeTab)}
                        className="bg-red-950 hover:bg-red-650 text-red-500 hover:text-white p-2 rounded-sm border border-red-900/50 transition-colors"
                        title="ลบประเภทบริการนี้ออก"
                      >
                        <Trash size={14} />
                      </button>
                    )}
                  </div>

                  {/* Operational description paragraph */}
                  <p className="text-sm text-slate-300 font-sans leading-relaxed">
                    {servicesData[activeTab].description}
                  </p>

                  {/* Bullet specifics items list */}
                  <div className="space-y-4 pt-2">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-slate-500 block">
                      ตัวอย่างหน้างานเชิงลึกและเทคโนโลยีบริหารโครงการ:
                    </span>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {servicesData[activeTab].details.map((dt, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 size={14} className="text-red-500 flex-shrink-0 mt-0.5 animate-pulse" />
                          <span className="text-xs text-slate-200 leading-snug font-sans">
                            {dt}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Live edit fields appearing INLINE above the display card if in Admin mode */}
                {isAdminMode && (
                  <div className="bg-slate-950 p-6 border border-red-550/30 rounded-sm space-y-4 mt-8 relative z-20 text-left">
                    <span className="text-[10px] text-red-400 font-bold block uppercase tracking-wider">🛠️ แก้ไขข้อมูลบริการย่อยใบนี้</span>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="text-[8px] text-slate-400 block mb-1">ชื่อสตรีมบริการ</label>
                        <input
                          type="text"
                          value={servicesData[activeTab].title}
                          onChange={(e) => handleUpdateServiceField(activeTab, "title", e.target.value)}
                          className="w-full bg-slate-800 border border-slate-700 text-white p-2 text-xs outline-none focus:border-red-500 font-sans font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-[8px] text-slate-400 block mb-1">คำบรรยายหลัก (Service Description)</label>
                        <textarea
                          value={servicesData[activeTab].description}
                          onChange={(e) => handleUpdateServiceField(activeTab, "description", e.target.value)}
                          rows={2}
                          className="w-full bg-slate-800 border border-slate-700 text-slate-200 p-2 text-xs outline-none focus:border-red-500 font-sans leading-relaxed"
                        />
                      </div>

                      <div>
                        <label className="text-[8px] text-slate-400 block mb-1">เลือกประเภทสัญลักษณ์ไอคอน (Icon Key)</label>
                        <select
                          value={servicesData[activeTab].icon || "building"}
                          onChange={(e) => handleUpdateServiceField(activeTab, "icon", e.target.value)}
                          className="bg-slate-800 text-white text-xs p-1.5 border border-slate-700 font-mono"
                        >
                          <option value="building">Building (อาคารเดิม)</option>
                          <option value="zap">Zap (ไฟฟ้า)</option>
                          <option value="flame">Flame (ดับเพลิง/ไฟ)</option>
                          <option value="wrench">Wrench (ซ่อมแซม/เครื่องมือ)</option>
                          <option value="droplet">Droplet (น้ำประปา)</option>
                        </select>
                      </div>

                      <div className="space-y-2 pt-1.5">
                        <label className="text-[8px] text-slate-400 block font-bold uppercase tracking-wider">มาตรการย่อย 3 หัวข้อ (Bulleted detail items):</label>
                        {servicesData[activeTab].details.map((sub, sIdx) => (
                          <input
                            key={sIdx}
                            type="text"
                            value={sub}
                            onChange={(e) => handleUpdateDetailField(activeTab, sIdx, e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 text-slate-200 p-1.5 text-xs outline-none focus:border-red-500 font-sans"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          triggerSavedToast();
                        }}
                        className="w-full bg-red-650 bg-red-650 bg-red-600 hover:bg-red-700 text-white font-sans py-2 text-xs font-bold uppercase tracking-widest transition-all"
                      >
                        ✓ บันทึกการเปลี่ยนแปลงของการ์ดใบนี้
                      </button>
                    </div>
                  </div>
                )}

                {/* Subfooter action button to trigger contact anchor link */}
                <div className="pt-10 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-12 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 flex-shrink-0" />
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-extrabold">EPC CERTIFIED DIVISION</span>
                  </div>
                  <a
                    href="#contact"
                    className="text-xs text-white hover:text-red-500 font-extrabold flex items-center gap-1.5 underline underline-offset-4 transition-colors font-sans uppercase tracking-wider"
                  >
                    ปรึกษาและขอรายละเอียดทันที <ChevronRight size={12} className="text-red-500" />
                  </a>
                </div>

              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 p-12 text-center rounded-sm h-full flex flex-col justify-center items-center">
                <p className="text-slate-500 font-sans">ไม่พบประเภทงานก่อสร้างที่มีการเรียกใช้อยู่ดั้งเดิมค่ะ</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
