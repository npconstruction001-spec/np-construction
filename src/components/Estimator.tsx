import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Calculator, 
  Sliders, 
  Award, 
  Clock, 
  Users, 
  CheckCircle2 
} from "lucide-react";

export default function Estimator() {
  const [calcType, setCalcType] = useState<"factory" | "store" | "office" | "electrical">("factory");
  const [calcArea, setCalcArea] = useState<number>(300);
  const [calcQuality, setCalcQuality] = useState<"standard" | "premium">("standard");
  const [calcSmartSystems, setCalcSmartSystems] = useState<boolean>(false);
  const [calcIsUpdating, setCalcIsUpdating] = useState<boolean>(false);

  const calculateBudget = () => {
    const base = calcType === "factory" ? 13500 : calcType === "store" ? 18500 : calcType === "office" ? 15500 : 22000;
    const qualityMult = calcQuality === "premium" ? 1.3 : 1.0;
    const extra = calcSmartSystems ? (calcArea * 350) + 120000 : 0;
    const total = Math.round((calcArea * base * qualityMult) + extra);
    const minVal = Math.round(total * 0.9);
    const maxVal = Math.round(total * 1.15);
    return { minVal, maxVal };
  };

  const handleSendToContact = () => {
    const msgInput = document.querySelector("#contact-details") as HTMLTextAreaElement;
    if (msgInput) {
      const { minVal, maxVal } = calculateBudget();
      
      msgInput.value = `สนใจร่วมงาน / ประเมินราคาจริงสำหรับโครงการ:\n- โครงการ: ${
        calcType === "factory" 
          ? "โรงงาน / คลังสินค้า" 
          : calcType === "store" 
            ? "ร้านค้าเชิงพาณิชย์" 
            : calcType === "office" 
              ? "อาคารสำนักงานอเนกประสงค์" 
              : "ระบบไฟฟ้า&เครื่องกลวิศวกรรม"
      }\n- ขนาดพื้นที่เป้าหมาย: ${calcArea} ตารางเมตร\n- วัสดุก่อสร้างเกรด: ${
        calcQuality === "premium" ? "เกรดพรีเมียม" : "เกรดโครงสร้างมาตรฐาน"
      }\n- ระบบควบคุมอัจฉริยะ: ${calcSmartSystems ? "ต้องการติดตั้ง" : "ไม่ต้องการ"}\n- ประเมินราคาจำลองเบื้องต้น: ${minVal.toLocaleString()} - ${maxVal.toLocaleString()} บาท`;
      
      // Dispatch input event to update React state if any
      const event = new Event('input', { bubbles: true });
      msgInput.dispatchEvent(event);
    }
    const contactSec = document.getElementById("contact");
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: "smooth" });
    }
  };

  const { minVal, maxVal } = calculateBudget();

  return (
    <section className="py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="editorial-grid gap-12 mb-16">
          <div className="col-span-12 lg:col-span-7 space-y-4">
            <span className="label-small font-tech text-gold tracking-widest flex items-center gap-2">
              <Calculator size={14} /> NP Simulator & Cost Estimator
            </span>
            <h2 className="text-3xl md:text-5xl tracking-tighter uppercase leading-[0.9] text-navy-dark font-tech">
              วิเคราะห์งบประมาณ <br />
              <span className="text-gold">และแผนวิศวกรรมเฉพาะทาง</span>
            </h2>
            <p className="text-slate-500 font-light text-sm max-w-2xl leading-relaxed">
              เลือกความต้องการเพื่อคำนวณราคาประเมินค่าแรงพร้อมระยะเวลาดำเนินงานเบื้องต้นโดยอัตโนมัติ มอบความแม่นยำด้านงบประมาณสำหรับธุรกิจคุณเพื่อเตรียมงานร่วมกับวิศวกรผู้เชี่ยวชาญ
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left Column Controls */}
          <div className="lg:col-span-7 p-10 space-y-8 border-b lg:border-b-0 lg:border-r border-slate-200 bg-white">
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-mono flex items-center gap-1.5">
                <Sliders size={12} className="text-gold" /> Step 1: เลือกประเภทอาคาร / บริการที่ต้องการ
              </span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {[
                  { id: "factory", name: "โรงงาน / คลังสินค้า", basePrice: 13500, detail: "งานโครงสร้างเหล็ก&คอนกรีตฐานแกร่ง" },
                  { id: "store", name: "ร้านค้าเชิงพาณิชย์", basePrice: 18500, detail: "งานสเปซดีไซน์และระบบอินทีเรีย" },
                  { id: "office", name: "ตึกอาคารสำนักงาน", basePrice: 15500, detail: "งานอาคารประหยัดพลังงานอเนกประสงค์" },
                  { id: "electrical", name: "ระบบไฟฟ้า&เครื่องกล", basePrice: 22000, detail: "งานติดตั้งสเตชั่นและโรงไฟฟ้าย่อย" }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setCalcType(item.id as any);
                      setCalcIsUpdating(true);
                      setTimeout(() => setCalcIsUpdating(false), 400);
                    }}
                    className={`p-4 text-left border rounded-sm transition-all relative flex flex-col justify-between h-28 cursor-pointer ${
                      calcType === item.id 
                        ? "border-gold bg-navy-dark text-white shadow-lg" 
                        : "border-slate-200 hover:border-gold hover:bg-slate-50 text-navy-dark"
                    }`}
                  >
                    <span className={`text-[11px] font-bold ${calcType === item.id ? "text-gold" : "text-navy-dark"}`}>
                      {item.name}
                    </span>
                    <div className="space-y-1">
                      <span className="block text-[8px] text-slate-400 font-sans tracking-tight leading-normal font-medium">
                        {item.detail}
                      </span>
                      <span className="block text-[9px] font-mono font-bold text-gold/90 mt-1">
                        ~{item.basePrice.toLocaleString()} บ./ตร.ม.
                      </span>
                    </div>
                    {calcType === item.id && (
                      <span className="absolute top-2 right-2 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-mono flex items-center gap-1.5">
                  <Sliders size={12} className="text-gold" /> Step 2: ปรับขนาดพื้นที่โครงการ (ตารางเมตร)
                </span>
                <span className="font-mono text-sm font-black text-navy-dark px-3 py-1 bg-slate-100 rounded">
                  {calcArea.toLocaleString()} ตร.ม.
                </span>
              </div>
              
              <div className="space-y-2">
                <input
                  type="range"
                  min="20"
                  max="4000"
                  step="20"
                  value={calcArea}
                  onChange={(e) => {
                    setCalcArea(parseInt(e.target.value));
                  }}
                  className="w-full accent-gold h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[9px] font-mono text-slate-400">
                  <span>20 ตร.ม. (ขนาดเล็กร้านค้า)</span>
                  <span>1,000 ตร.ม.</span>
                  <span>2,500 ตร.ม.</span>
                  <span>4,000 ตร.ม. (พื้นที่โรงงานอุตสาหกรรมขนาดใหญ่)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-mono flex items-center gap-1.5">
                  <Sliders size={12} className="text-gold" /> Step 3: เกรดวัสดุวิศวกรรม
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCalcQuality("standard")}
                    className={`p-3 text-center border text-[11px] font-bold rounded-sm transition-all cursor-pointer ${
                      calcQuality === "standard" 
                        ? "bg-navy-dark text-white border-gold shadow" 
                        : "bg-white text-slate-600 border-slate-200 hover:border-gold"
                    }`}
                  >
                    Standard Grade
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalcQuality("premium")}
                    className={`p-3 text-center border text-[11px] font-bold rounded-sm transition-all cursor-pointer ${
                      calcQuality === "premium" 
                        ? "bg-navy-dark text-white border-gold shadow" 
                        : "bg-white text-slate-600 border-slate-200 hover:border-gold"
                    }`}
                  >
                    Premium [ +30% ]
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-mono block">
                  Step 4: ออปชั่นเสริมงานระบบ
                </span>
                <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-sm hover:bg-slate-50 cursor-pointer h-11 transition-all">
                  <input
                    type="checkbox"
                    checked={calcSmartSystems}
                    onChange={(e) => setCalcSmartSystems(e.target.checked)}
                    className="rounded accent-gold w-4 h-4 cursor-pointer"
                  />
                  <span className="text-[11px] font-bold text-slate-705 select-none font-medium">
                    ติดตั้งระบบควบคุมอัจฉริยะ (Eco-Solar / Smart HVAC)
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column Dynamic Live Displays */}
          <div className="lg:col-span-5 p-10 bg-gradient-to-br from-navy-dark to-[#0B0F19] text-white flex flex-col justify-between space-y-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(197,160,89,0.1),transparent_70%)] pointer-events-none"></div>
            
            <div className="space-y-6 relative z-10">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold font-mono flex items-center gap-1.5">
                  <Award size={12} className="text-gold" /> Result: ประมาณงบเพื่อจับคู่ทางวิศวกรรม
                </span>
                <span className="text-[10px] bg-gold/10 text-gold border border-gold/30 px-2 py-0.5 font-mono rounded">
                  Live Estimate
                </span>
              </div>

              <div className="py-2">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">
                  ช่วงประมาณการงบประมาณรวมเบื้องต้น:
                </p>
                <div className="relative h-20 flex items-baseline">
                  {calcIsUpdating ? (
                    <div className="text-gold/60 text-xs italic animate-pulse py-4 font-mono">
                      กำลังประมวลสัญญาณจำลองราคา...
                    </div>
                  ) : (
                    <motion.div 
                      key={`${calcType}-${calcArea}-${calcQuality}-${calcSmartSystems}`}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-1"
                    >
                      <span className="text-3xl md:text-3.5xl font-black text-gold font-display tracking-tight">
                        {`${minVal.toLocaleString()} - ${maxVal.toLocaleString()}`}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold tracking-normal block leading-normal mt-1">
                        บาท (THB) *ราคารวมอุปกรณ์และแรงงานที่มีวิศวกรวิชาชีพควบคุมทุกขั้นตอน
                      </span>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Operational stats */}
              <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 flex items-center gap-1 font-mono">
                    <Clock size={11} className="text-gold" /> ระยะเวลาก่อสร้างหลักโดยประเมิน
                  </span>
                  <span className="text-sm font-black text-white block">
                    ประมาณ {Math.max(30, Math.round(45 + (calcArea * 0.08) * (calcQuality === "premium" ? 1.15 : 0.95)))} วัน
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 flex items-center gap-1 font-mono">
                    <Users size={11} className="text-gold" /> บุคลากร/วิศวกรขั้นต่ำ
                  </span>
                  <span className="text-sm font-black text-white block text-slate-200">
                    {Math.max(4, Math.round(5 + (calcArea * 0.005)))} คนสแตนด์บายประจําจุด
                  </span>
                </div>
              </div>

              {/* Milestones dynamic checker status */}
              <div className="space-y-2 border-t border-white/5 pt-6">
                <span className="text-[9px] text-slate-400 uppercase tracking-widest font-mono block">แผนและหลักประกันความปลอดภัยในพื้นที่:</span>
                <div className="space-y-2 text-[10px]">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 size={12} className="flex-shrink-0" />
                    <span>ออกแบบโครงสร้าง / ขึ้นผัง 3D (CAD/BIM Level)</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 size={12} className="flex-shrink-0" />
                    <span>โครงสร้างฐานรากเสาคานมั่นคงคัดส่วนผสมคอนกรีตคุณภาพสูง</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 size={12} className="text-gold flex-shrink-0 animate-pulse" />
                    <span>{calcType === "electrical" ? "ตรวจสอบและวางตู้เดินไฟหลัก MDB ไซต์งาน" : "งานก่อสร้างโครงสร้าง และระบบวิศวกรรมโยธาและงานสถาปัตย์"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <div className="w-3 h-3 rounded-full border border-white/20 flex items-center justify-center text-[8px] flex-shrink-0 font-bold">4</div>
                    <span>ส่งใบประเมินมาตรฐานวิชาชีพวิศวกรส่งมอบโครงสร้าง QA</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 relative z-10 flex flex-col gap-3">
              <button
                type="button"
                onClick={handleSendToContact}
                className="w-full bg-gold hover:bg-gold-hover text-navy-dark py-4 text-[10px] font-mono font-black uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2 rounded-sm cursor-pointer shadow-lg hover:shadow-gold/10"
              >
                🚀 ส่งผลจำลองนี้ไปยังช่องติดต่อเพื่อปรึกษาวิศวกรทันที
              </button>
              <p className="text-[8px] text-slate-400 text-center font-sans tracking-tight leading-relaxed">
                *ผลคำนวณเบื้องต้นเพื่ออำนวยความสะดวกในการวางแผน งบและเวลาจริงขึ้นอยู่กับตารางงานและการเข้าสำรวจสภาพหน้างานจริงค่ะ
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
