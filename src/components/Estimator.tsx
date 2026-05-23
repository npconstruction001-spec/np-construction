import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Calculator, 
  Sliders, 
  Award, 
  Clock, 
  Users, 
  CheckCircle2,
  Cpu,
  Boxes,
  Activity
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

  const renderLiveBlueprint = () => {
    const isPremium = calcQuality === "premium";
    const smartLabel = calcSmartSystems ? "ACTIVE [YES]" : "INACTIVE";
    const energyLoad = Math.round(calcArea * 0.14 * (isPremium ? 1.25 : 1.0));
    
    // Custom styles for flowing dots along lines
    const flowStyle = {
      animation: "flow-dash 1.4s linear infinite"
    };

    return (
      <div className="w-full bg-navy-light/40 border border-white/10 p-3.5 rounded-sm font-mono text-[9px] relative overflow-hidden space-y-3.5 shadow-inner">
        {/* Infinite CSS Keyframe actions */}
        <style>{`
          @keyframes flow-dash {
            to {
              stroke-dashoffset: -20;
            }
          }
          @keyframes radar-pulse {
            0% { r: 2px; opacity: 0.8; }
            100% { r: 9px; opacity: 0; }
          }
        `}</style>

        {/* Dynamic Matrix-like backdrop Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(197,160,89,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(197,160,89,0.012)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none"></div>

        {/* Telemetry control header */}
        <div className="flex justify-between items-center text-slate-400 border-b border-white/5 pb-1.5 relative z-10">
          <span className="text-gold/95 animate-pulse font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block"></span>
            {calcType === "electrical" ? "SYSTEM_SLD_SCHEMATIC" : "STRUCTURAL_3D_BIM"}
          </span>
          <span className="text-[8px] opacity-80">SCALE: 1:{(calcArea < 500 ? 50 : 250).toLocaleString()} &bull; SYS: OK</span>
        </div>

        {/* Live Vector Blueprint Representation */}
        <div className="h-32 w-full flex items-center justify-center bg-black/25 border border-white/5 relative z-10 rounded overflow-hidden">
          {calcType === "electrical" ? (
            /* ELECTRICS & MECHANICAL SUBSTATION SCHEMATIC */
            <svg className="w-full h-full p-2" viewBox="0 0 300 100" fill="none" stroke="currentColor">
              {/* Busbar Line */}
              <line x1="10" y1="50" x2="290" y2="50" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <line x1="10" y1="50" x2="290" y2="50" stroke="#C5A059" strokeWidth="1.5" strokeDasharray="6, 4" style={flowStyle} />

              {/* Feed station - Transformer Coil */}
              <rect x="25" y="25" width="45" height="50" rx="1.5" fill="#0A0F1D" stroke="#C5A059" strokeWidth="1.2" />
              <text x="47.5" y="44" fill="#C5A059" textAnchor="middle" fontSize="6" fontWeight="bold">22 KV</text>
              <text x="47.5" y="60" fill="rgba(255,255,255,0.6)" textAnchor="middle" fontSize="5.5">PRIMARY</text>

              {/* Induction loops visual overlay */}
              <circle cx="47.5" cy="50" r="10" stroke="#C5A059" strokeWidth="1" strokeDasharray="2, 3" />

              {/* Main Distribution Panel (MDB) */}
              <rect x="125" y="25" width="50" height="50" rx="1.5" fill="#0A0F1D" stroke="#C5A059" strokeWidth="1.2" />
              <text x="150" y="44" fill="#C5A059" textAnchor="middle" fontSize="6.5" fontWeight="bold">MDB PANEL</text>
              <text x="150" y="60" fill="rgba(255,255,255,0.7)" textAnchor="middle" fontSize="5.5">{energyLoad} KVA LOAD</text>

              {/* Electrical Flow Conduit Loop lines */}
              <path d="M 150 25 L 150 14 L 235 14 L 235 45" stroke="#C5A059" strokeWidth="1" strokeDasharray="5, 3" style={flowStyle} />

              {/* Load distribution terminal box */}
              <rect x="215" y="45" width="40" height="20" rx="1" fill="#0A0F1D" stroke={isPremium ? "#10B981" : "#C5A059"} strokeWidth="1.2" />
              <text x="235" y="57" fill="#FFFFFF" textAnchor="middle" fontSize="5.5">FEEDER_A</text>

              <circle cx="275" cy="50" r="3" fill="#C5A059" />
              <circle cx="275" cy="50" r="8" stroke="#C5A059" strokeWidth="1.2" style={{ animation: "radar-pulse 1.8s infinite" }} />
            </svg>
          ) : calcType === "factory" ? (
            /* INDUSTRIAL STRUCTURAL FACTORY PORTAL BLUEPRINT */
            <svg className="w-full h-full p-2" viewBox="0 0 300 100" fill="none" stroke="currentColor">
              {/* Foundation Horizon Line */}
              <line x1="10" y1="85" x2="290" y2="85" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              
              {/* Concrete Pad foundation floor */}
              <rect x="25" y="80" width="250" height="5" fill="rgba(197,160,89,0.12)" stroke="#C5A059" strokeWidth="1" />
              
              {/* Steel Truss Column Supports */}
              <line x1="35" y1="80" x2="35" y2="30" stroke="#C5A059" strokeWidth="1.2" />
              <line x1="115" y1="80" x2="115" y2="30" stroke="#C5A059" strokeWidth="1.2" />
              <line x1="195" y1="80" x2="195" y2="30" stroke="#C5A059" strokeWidth="1.2" />
              <line x1="265" y1="80" x2="265" y2="30" stroke="#C5A059" strokeWidth="1.2" />

              {/* Footing Reinforcement Grids representing heavy columns */}
              <rect x="30" y="85" width="10" height="10" stroke="rgba(197,160,89,0.6)" strokeWidth="0.8" strokeDasharray="2, 2" />
              <rect x="110" y="85" width="10" height="10" stroke="rgba(197,160,89,0.6)" strokeWidth="0.8" strokeDasharray="2, 2" />
              <rect x="190" y="85" width="10" height="10" stroke="rgba(197,160,89,0.6)" strokeWidth="0.8" strokeDasharray="2, 2" />
              <rect x="260" y="85" width="10" height="10" stroke="rgba(197,160,89,0.6)" strokeWidth="0.8" strokeDasharray="2, 2" />

              {/* Sloped Multi-Spaced Metal Sheet Rafter Header */}
              <polyline points="35,30 75,15 115,30 155,15 195,30 230,15 265,30" stroke="#C5A059" strokeWidth="1.5" />
              <polyline points="35,25 75,10 115,25 155,10 195,25 230,10 265,25" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />

              {/* Bracing wires and tie-rods */}
              <line x1="35" y1="30" x2="115" y2="80" stroke="rgba(197,160,89,0.25)" strokeWidth="0.8" strokeDasharray="3, 3" />
              <line x1="115" y1="30" x2="35" y2="80" stroke="rgba(197,160,89,0.25)" strokeWidth="0.8" strokeDasharray="3, 3" />
              <line x1="195" y1="30" x2="265" y2="80" stroke="rgba(197,160,89,0.25)" strokeWidth="0.8" strokeDasharray="3, 3" />
              <line x1="265" y1="30" x2="195" y2="80" stroke="rgba(197,160,89,0.25)" strokeWidth="0.8" strokeDasharray="3, 3" />

              {/* Smart system overlay icon indicator */}
              {calcSmartSystems && (
                <>
                  <rect x="40" y="2" width="220" height="5" fill="rgba(16,185,129,0.1)" stroke="#10B981" strokeWidth="0.8" />
                  <text x="150" y="6" fill="#10B981" textAnchor="middle" fontSize="4.5" fontWeight="black" letterSpacing="0.5">ECO-SOLAR INFRASTRUCTURE ENABLED</text>
                </>
              )}

              <text x="150" y="48" fill="rgba(255,255,255,0.5)" textAnchor="middle" fontSize="5.5">PORTAL FRAME CONSTRAINTS</text>
              <text x="150" y="62" fill="#C5A059" textAnchor="middle" fontSize="6.5" fontWeight="bold">RC PILE FOUNDATIONS SECTOR</text>
            </svg>
          ) : calcType === "office" ? (
            /* HIGH RISE COMMERCIAL MULTI-TIER LAYOUT FRAME */
            <svg className="w-full h-full p-2" viewBox="0 0 300 100" fill="none" stroke="currentColor">
              {/* Ground level */}
              <line x1="10" y1="90" x2="290" y2="90" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              
              {/* Outer structural envelope */}
              <rect x="90" y="10" width="120" height="80" stroke="#C5A059" strokeWidth="1.5" fill="rgba(10,15,29,0.5)" />
              
              {/* Vertical core pillars */}
              <line x1="120" y1="10" x2="120" y2="90" stroke="#C5A059" strokeWidth="1" strokeDasharray="1, 2" />
              <line x1="150" y1="10" x2="150" y2="90" stroke="#C5A059" strokeWidth="1.2" strokeDasharray="2, 2" />
              <line x1="180" y1="10" x2="180" y2="90" stroke="#C5A059" strokeWidth="1" strokeDasharray="1, 2" />

              {/* Horizontal floors elevations */}
              <line x1="90" y1="26" x2="210" y2="26" stroke="#C5A059" strokeWidth="0.8" />
              <line x1="90" y1="42" x2="210" y2="42" stroke="#C5A059" strokeWidth="0.8" />
              <line x1="90" y1="58" x2="210" y2="58" stroke="#C5A059" strokeWidth="0.8" />
              <line x1="90" y1="74" x2="210" y2="74" stroke="#C5A059" strokeWidth="0.8" />

              {/* Intelligent airflow system conduits */}
              {calcSmartSystems && (
                <path d="M 85 90 L 85 16 L 215 16 L 215 90" stroke="#10B981" strokeWidth="1" strokeDasharray="6, 4" style={flowStyle} />
              )}

              {/* Geometric side wires linking structure */}
              <line x1="40" y1="90" x2="90" y2="74" stroke="rgba(197,160,89,0.3)" strokeWidth="0.8" strokeDasharray="2, 3" />
              <line x1="260" y1="90" x2="210" y2="74" stroke="rgba(197,160,89,0.3)" strokeWidth="0.8" strokeDasharray="2, 3" />

              <text x="45" y="45" fill="rgba(255,255,255,0.5)" textAnchor="left" fontSize="5.5">OFFICE_ELEV</text>
              <text x="45" y="55" fill="#C5A059" textAnchor="left" fontSize="6.5" fontWeight="bold">STRUCTURAL</text>
              <text x="255" y="45" fill="rgba(255,255,255,0.5)" textAnchor="right" fontSize="5.5">SMART_HVAC</text>
              <text x="255" y="55" fill={calcSmartSystems ? "#10B981" : "#C5A059"} textAnchor="right" fontSize="6" fontWeight="bold">
                {calcSmartSystems ? "STABLE_OK" : "STANDBY"}
              </text>
            </svg>
          ) : (
            /* COMMERCIAL INTERIOR PLAN & PARTITIONS BLUEPRINT */
            <svg className="w-full h-full p-2" viewBox="0 0 300 100" fill="none" stroke="currentColor">
              {/* Main property perimeter wall */}
              <rect x="25" y="10" width="250" height="80" stroke="#C5A059" strokeWidth="1.5" fill="rgba(10,15,29,0.4)" />
              
              {/* Inner building segment dividers */}
              <line x1="105" y1="10" x2="105" y2="65" stroke="#C5A059" strokeWidth="1.2" />
              <line x1="175" y1="35" x2="175" y2="90" stroke="#C5A059" strokeWidth="1.2" />
              <line x1="105" y1="65" x2="145" y2="65" stroke="#C5A059" strokeWidth="1.2" />

              {/* Dynamic decorative light grid mapping layout */}
              <circle cx="140" cy="38" r="14" stroke="rgba(197,160,89,0.3)" strokeWidth="1" strokeDasharray="6, 3" />
              
              {/* Socket terminal markers */}
              <circle cx="55" cy="30" r="2.5" fill="#C5A059" />
              <circle cx="140" cy="38" r="2.5" fill="#C5A059" />
              <circle cx="225" cy="50" r="2.5" fill="#C5A059" />
              <circle cx="225" cy="74" r="2.5" fill="#C5A059" />

              {/* Cable conduit paths representation */}
              <path d="M 55 30 L 105 30 L 140 38 L 175 50 L 225 50 L 225 74" stroke="rgba(197,160,89,0.45)" strokeWidth="1" strokeDasharray="5, 4" style={flowStyle} />

              <text x="55" y="21" fill="rgba(255,255,255,0.45)" textAnchor="middle" fontSize="5.5">ZONE_1</text>
              <text x="140" y="21" fill="rgba(255,255,255,0.45)" textAnchor="middle" fontSize="5.5">CEILING DOME</text>
              <text x="225" y="41" fill="rgba(255,255,255,0.45)" textAnchor="middle" fontSize="5.5">ZONE_2</text>

              <text x="150" y="82" fill="#C5A059" textAnchor="middle" fontSize="6" fontWeight="bold">INTERIOR LAYOUT ELECTRICAL WIRING OUTLINE</text>
            </svg>
          )}
        </div>

        {/* Telemetry output box readings */}
        <div className="grid grid-cols-3 gap-2 text-slate-400 text-[8px] bg-black/15 p-2 border border-white/5 rounded relative z-10">
          <div>
            <span className="text-slate-500 block uppercase tracking-wider">EST. VOLTAGE</span>
            <span className="text-white font-semibold font-mono">
              {calcType === "electrical" ? "22 kV Bus-Drop" : "380 Volts (3-Phase)"}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block uppercase tracking-wider font-mono">CU CONDUCTOR</span>
            <span className="text-white font-semibold font-mono">
              {isPremium ? "XLPE Heavy Insulated" : "Standard PVC Flame-Ret."}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block uppercase tracking-wider font-mono">SMART CONTROLS</span>
            <span className={calcSmartSystems ? "text-emerald-400 font-bold font-mono" : "text-slate-400 font-mono"}>
              {smartLabel}
            </span>
          </div>
        </div>
      </div>
    );
  };

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
            <p className="text-slate-500 font-light text-sm max-w-2xl leading-relaxed font-sans">
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
                    key="standard"
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
                    key="premium"
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
                  <span className="text-[11px] font-bold text-slate-700 select-none font-medium text-slate-800">
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
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold font-mono flex items-center gap-1.5 font-black">
                  <Award size={12} className="text-gold animate-bounce" /> RESULT: แผนวิศวกรรมเฉพาะแบบจำลอง
                </span>
                <span className="text-[10px] bg-gold/10 text-gold border border-gold/30 px-2.5 py-0.5 font-mono rounded font-bold animate-pulse">
                  STATION ACTIVE
                </span>
              </div>

              <div className="py-1">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">
                  ช่วงประเมินราคาวัสดุร่วมค่าแรงคร่าวๆ:
                </p>
                <div className="relative h-18 flex items-baseline">
                  {calcIsUpdating ? (
                    <div className="text-gold/60 text-xs italic animate-pulse py-4 font-mono">
                      กำลังคำนวณราคาจำลอง...
                    </div>
                  ) : (
                    <motion.div 
                      key={`${calcType}-${calcArea}-${calcQuality}-${calcSmartSystems}`}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-0"
                    >
                      <span className="text-2xl md:text-3xl font-black text-gold font-display tracking-tight leading-none block">
                        {`${minVal.toLocaleString()} - ${maxVal.toLocaleString()}`}
                      </span>
                      <span className="text-[9.5px] text-slate-400 font-medium tracking-normal block leading-normal pt-1.5">
                        บาท (THB) *ราคารองรับมาตรฐานวิชาชีพวิศวกรควบคุม
                      </span>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Live Interactive Blueprint Terminal Schema widget */}
              {renderLiveBlueprint()}

              {/* Operational stats */}
              <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 flex items-center gap-1 font-mono">
                    <Clock size={11} className="text-gold" /> ระยะเวลาก่อสร้างโดยประมาณ
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
                    {Math.max(4, Math.round(5 + (calcArea * 0.005)))} คนสแตนด์บายในงาน
                  </span>
                </div>
              </div>

              {/* Milestones dynamic checker status */}
              <div className="space-y-2 border-t border-white/5 pt-4">
                <span className="text-[9px] text-slate-400 uppercase tracking-widest font-mono block">ลำดับกระบวนการมาตรฐาน NP Conduction:</span>
                <div className="space-y-1.5 text-[9.5px]">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 size={11} className="flex-shrink-0" />
                    <span>วิเคราะห์สเปซขึ้นโครงสร้าง / ร่างแบบ 3D BIM AutoCAD</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 size={11} className="flex-shrink-0" />
                    <span>วางรากฐานโครงสร้างเหล็กกล้าและคอนกรีตทนแรงดัดสูง (RC)</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 size={11} className="text-gold flex-shrink-0 animate-pulse" />
                    <span>{calcType === "electrical" ? "ตรวจสอบตู้ควบคุมไฟหลัก MDB และสายดินเฟส" : "ก่อสร้าง ดำเนินประปาโยธา และระบบส่องสว่าง"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <div className="w-3.5 h-3.5 rounded-full border border-white/20 flex items-center justify-center text-[7.5px] flex-shrink-0 font-bold font-mono">4</div>
                    <span>ผ่านการตรวจมาตรฐานสิ่งแวดล้อมและใบส่งงานวิชาชีพวิศวกร</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 relative z-10 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={handleSendToContact}
                className="w-full bg-gold hover:bg-gold-hover text-navy-dark py-3.5 text-[10px] font-mono font-black uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-1.5 rounded-sm cursor-pointer shadow-lg hover:shadow-gold/15"
              >
                🚀 ส่งใบจำลองนี้เพื่อปรึกษาวิศวกรผู้เชี่ยวชาญทันที
              </button>
              <p className="text-[7.5px] text-slate-400 text-center font-sans tracking-tight leading-relaxed">
                *ผลประเมินคร่าวๆ นำเสนอเพื่อเป็นแนวทางการวางแผน โดยสัญญางบและการวางกรอบเวลาสมบูรณ์จะอ้างอิงหลังจากวิศวกรประเมินและสำรวจไซต์งานจริงเรียบร้อยแล้วค่ะ
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
