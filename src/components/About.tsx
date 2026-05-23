import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldCheck, 
  Target, 
  Compass, 
  CheckCircle2, 
  Upload, 
  Edit3, 
  Sparkles,
  Award,
  BookOpen,
  Eye,
  Settings
} from "lucide-react";
import { imgAbout } from "../constants/data";

interface AboutProps {
  isAdminMode: boolean;
  aboutTitleL1: string;
  setAboutTitleL1: (v: string) => void;
  aboutTitleGold: string;
  setAboutTitleGold: (v: string) => void;
  aboutDesc: string;
  setAboutDesc: (v: string) => void;
  aboutBullets: string[];
  setAboutBullets: (v: string[]) => void;
  triggerSavedToast: () => void;
  setIsAdminMode: (v: boolean) => void;
}

export default function About({
  isAdminMode,
  aboutTitleL1,
  setAboutTitleL1,
  aboutTitleGold,
  setAboutTitleGold,
  aboutDesc,
  setAboutDesc,
  aboutBullets,
  setAboutBullets,
  triggerSavedToast,
  setIsAdminMode,
}: AboutProps) {
  // Tabs for AESCON layout
  const [activeTab, setActiveTab] = useState<"vision" | "mission" | "safety">("vision");

  // Load custom about image from local storage
  const [aboutImage, setAboutImage] = useState<string>(() => {
    return localStorage.getItem("np_img_about_v4") || imgAbout;
  });

  // Load vision, mission, and safety texts with fallback to existing text data
  const [visionText, setVisionText] = useState<string>(() => {
    return localStorage.getItem("np_about_vision_v4") || "สร้างสรรค์อนาคตการก่อสร้างที่มั่นคง ด้วยการมองการณ์ไกล ใส่ใจความปลอดภัย และรับผิดชอบในทุกผลงานเพื่อมอบความสำเร็จสูงสุดให้กับลูกค้าและคู่ค้า";
  });

  const [missionText, setMissionText] = useState<string>(() => {
    return localStorage.getItem("np_about_mission_v4") || "ส่งมอบงานวิศวกรรมสีกรวยก่อสร้างที่เปี่ยมด้วยคุณภาพ คุมงบประมาณอย่างถูกต้องตรงตามกำหนดเวลา พัฒนาความเชี่ยวชาญ คัดเลือกเครื่องกรองวัสดุประสิทธิภาพสูงสุด ดำเนินสัญญาก่อสร้างอย่างซื่อตรงและโปร่งใส เพื่อประโยชน์สูงสุดของทั้งหน่วยงานราชการและภาคเอกชนทั่วไป";
  });

  const [safetyText, setSafetyText] = useState<string>(() => {
    return localStorage.getItem("np_about_safety_v4") || "คำนึงถึงสุขอนามัย ความปลอดภัยสูงสุด (Safety First) และสิ่งแวดล้อมใกล้เคียงในเขตก่อสร้าง ดำเนินมาตรการควบคุมมลภาวะ การสวมใส่อุปกรณ์ป้องกันอย่างครบถ้วนเข้มงวด 100% ตรวจวัดระบบโครงสร้างก่อนปฏิบัติงานในทุกขั้นตอน เพื่อสวัสดิภาพของผู้ปฏิบัติงานและชุมชนโดยรอบ";
  });

  // Draft config states for admin editing
  const [draftVision, setDraftVision] = useState<string>("");
  const [draftMission, setDraftMission] = useState<string>("");
  const [draftSafety, setDraftSafety] = useState<string>("");
  const [draftImageUrl, setDraftImageUrl] = useState<string>("");
  const [draftUploadStatus, setDraftUploadStatus] = useState<"idle" | "uploading" | "success">("idle");

  useEffect(() => {
    setDraftVision(visionText);
    setDraftMission(missionText);
    setDraftSafety(safetyText);
    setDraftImageUrl(aboutImage);
  }, [visionText, missionText, safetyText, aboutImage]);

  const handleApplyAboutEdits = () => {
    setVisionText(draftVision);
    localStorage.setItem("np_about_vision_v4", draftVision);

    setMissionText(draftMission);
    localStorage.setItem("np_about_mission_v4", draftMission);

    setSafetyText(draftSafety);
    localStorage.setItem("np_about_safety_v4", draftSafety);

    setAboutImage(draftImageUrl);
    localStorage.setItem("np_img_about_v4", draftImageUrl);

    triggerSavedToast();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDraftUploadStatus("uploading");
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setDraftImageUrl(base64);
        setDraftUploadStatus("success");
        setTimeout(() => setDraftUploadStatus("idle"), 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="about" className="py-24 md:py-32 bg-slate-50 relative overflow-hidden font-sans border-b border-slate-200">
      
      {/* Decorative Subtle Grid Backdrop */}
      <div className="absolute inset-0 z-0 opacity-25 pointer-events-none bg-[radial-gradient(#e2e8f0_1px,transparent_1.5px)] [background-size:24px_24px]"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 animate-fade-in">
        
        {/* AESCON Styled Subheader */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="h-px w-8 bg-red-650 inline-block bg-red-600"></span>
              <span className="text-[10px] font-mono tracking-[0.25em] text-red-600 font-extrabold uppercase">ABOUT COMPANY</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight uppercase font-sans">
              {aboutTitleL1} <br />
              <span className="text-red-600">{aboutTitleGold}</span>
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-sans leading-relaxed max-w-lg">
            เราคือพันธมิตรที่ได้รับความไว้วางใจในการออกแบบ ก่อสร้างอาคาร วางรากฐานวิศวกรรม และขับไล่กังวลของเจ้าหน้าประสานงานโครงการทั้งฝ่ายราชการและเอกชนสากล
          </p>
        </div>

        {/* Two Column Layout: Slide Image & Corporate Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT Column - Grand image with certificate overlay */}
          <div className="lg:col-span-6 relative">
            <div className="relative overflow-hidden rounded-sm border border-slate-200 shadow-xl group">
              <img
                src={aboutImage}
                alt="AESCON inspired corporate site"
                className="w-full h-auto object-cover max-h-[520px] hover:scale-105 transition-all duration-750"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
            </div>

            {/* Float ISO / Trust badge resembling AESCON corporate stamps */}
            <div className="absolute -bottom-8 -right-4 md:-right-6 bg-red-600 text-white p-6 md:p-8 rounded-sm shadow-2xl space-y-2 max-w-56 border border-red-500 flex flex-col justify-center animate-bounce-slow">
              <Award size={32} className="text-white animate-pulse" />
              <div className="space-y-0.5">
                <span className="block text-xl font-mono font-black tracking-tight">100% SECURE</span>
                <span className="text-[8px] font-mono text-white/85 tracking-widest block uppercase font-bold">SAFETY STANDARDS</span>
              </div>
              <span className="text-[9px] text-white/70 block leading-tight font-sans">
                ดำเนินงานสอดคล้องตามหลักควบคุมวิศวกรรมประมวลสากล
              </span>
            </div>

            {/* Quick Admin tool inside the image area if logged in */}
            {isAdminMode && (
              <div className="absolute top-4 left-4 z-20 bg-slate-900/95 border border-red-500/40 p-4 rounded-sm shadow-2xl max-w-sm space-y-3 font-sans">
                <span className="text-[10px] text-red-500 font-black block uppercase tracking-wider flex items-center gap-1">
                  <Settings size={12} className="animate-spin" /> ตั้งค่ารูปเกี่ยวกับเรา
                </span>
                
                <div className="space-y-2">
                  <div className="space-y-1">
                    <label className="text-[8px] text-slate-400 block font-bold">ที่อยูู่ลิงก์รูป (Image URL)</label>
                    <input
                      type="text"
                      value={draftImageUrl}
                      onChange={(e) => setDraftImageUrl(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 text-white p-1 text-[10px] outline-none rounded-none"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[8px] text-slate-500">หรืออัปโหลดรูปตรง:</span>
                    <label className="bg-red-600 text-white hover:bg-red-700 px-2 py-1 text-[8px] font-bold uppercase cursor-pointer flex items-center gap-1 select-none">
                      <Upload size={10} /> เลือกไฟล์
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>

                  {draftUploadStatus === "success" && (
                    <span className="text-[8px] text-emerald-400 block font-sans">ดึงไฟล์เรียบร้อย!</span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT Column - Interactive Core Vision Tabs (100% AESCON Structure) */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Short Introduction Area */}
            <div className="bg-white border border-slate-200 p-8 rounded-sm shadow-sm space-y-4">
              <span className="text-[9px] font-mono font-black text-red-500 tracking-widest block uppercase">EXECUTIVE MESSAGE</span>
              <p className="text-sm text-slate-600 font-sans leading-relaxed leading-slate">
                {aboutDesc}
              </p>
            </div>

            {/* AESCON Layout - Interactive Tabs representing our Sustainable Vision */}
            <div className="space-y-4">
              
              {/* Tab Bar Layout with Red Active line indicators */}
              <div className="flex border-b border-slate-200 pb-0.5">
                {[
                  { id: "vision", label: "วิสัยทัศน์ (Vision)", icon: <Compass size={14} /> },
                  { id: "mission", label: "พันธกิจ (Mission)", icon: <Target size={14} /> },
                  { id: "safety", label: "ความปลอดภัย (Safety & Standards)", icon: <ShieldCheck size={14} /> }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-xs font-bold font-sans transition-all border-b-2 cursor-pointer ${
                      activeTab === tab.id
                        ? "border-red-600 text-red-600 font-extrabold bg-red-50/20"
                        : "border-transparent text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {tab.icon}
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.label.split(" (")[0]}</span>
                  </button>
                ))}
              </div>

              {/* Tab Display Panel */}
              <div className="bg-white border border-slate-200 p-8 rounded-sm shadow-sm relative min-h-[160px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-4 bg-red-600" />
                      <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest">
                        Core Pillars / {activeTab} statement
                      </span>
                    </div>

                    <p className="text-xs md:text-sm text-slate-600 font-sans leading-relaxed">
                      {activeTab === "vision" && visionText}
                      {activeTab === "mission" && missionText}
                      {activeTab === "safety" && safetyText}
                    </p>

                    <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-red-500 font-extrabold pt-2">
                      <CheckCircle2 size={12} className="text-red-500" /> มุ่งเน้นมาตรฐานและความพึงพอใจสูงสุด
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

            {/* Quick Core Strengths Column */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {aboutBullets.map((bullet, bIdx) => {
                if (!bullet.trim()) return null;
                return (
                  <div 
                    key={bIdx} 
                    className="bg-white border border-slate-150 p-4.5 rounded-sm flex items-start gap-3 hover:border-red-500/50 transition-colors shadow-xs"
                  >
                    <span className="w-5 h-5 rounded-full bg-red-50 border border-red-250 flex items-center justify-center text-[10px] font-black text-red-600 flex-shrink-0">
                      ✓
                    </span>
                    <span className="text-xs font-bold text-slate-700 font-sans leading-tight">
                      {bullet}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Admin Inputs Panel inside the Text container for synchronicity */}
            {isAdminMode && (
              <div className="bg-slate-900/95 border-2 border-dashed border-red-500/40 p-6 rounded-sm text-white space-y-4 font-sans">
                <span className="text-xs font-bold text-red-400 flex items-center gap-1.5 uppercase">
                  <Edit3 size={14} className="text-red-500" /> จัดการข้อความกลยุทธ์แบรนด์
                </span>

                <div className="space-y-3 text-left">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-slate-400">หัวข้อหลัก</label>
                    <input
                      type="text"
                      value={aboutTitleL1}
                      onChange={(e) => setAboutTitleL1(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 text-white p-2 text-xs outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-slate-400">คำลงท้ายเน้นสีแดง</label>
                    <input
                      type="text"
                      value={aboutTitleGold}
                      onChange={(e) => setAboutTitleGold(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 text-white p-2 text-xs outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-slate-400">ข้อความวิสัยทัศน์ (Vision Text)</label>
                    <textarea
                      value={draftVision}
                      onChange={(e) => setDraftVision(e.target.value)}
                      rows={2}
                      className="w-full bg-slate-800 border border-slate-700 text-slate-200 p-2 text-xs outline-none leading-relaxed"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-slate-400">ข้อความพันธกิจ (Mission Text)</label>
                    <textarea
                      value={draftMission}
                      onChange={(e) => setDraftMission(e.target.value)}
                      rows={2}
                      className="w-full bg-slate-800 border border-slate-700 text-slate-200 p-2 text-xs outline-none leading-relaxed"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-slate-400">มาตรการด้านความปลอดภัย (Safety Text)</label>
                    <textarea
                      value={draftSafety}
                      onChange={(e) => setDraftSafety(e.target.value)}
                      rows={2}
                      className="w-full bg-slate-800 border border-slate-700 text-slate-200 p-2 text-xs outline-none leading-relaxed"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-slate-400">จุดเด่น 4 ข้อ (กด Enter เพื่อขึ้นบรรทัดใหม่)</label>
                    <textarea
                      value={aboutBullets.join("\n")}
                      onChange={(e) => setAboutBullets(e.target.value.split("\n"))}
                      rows={3}
                      className="w-full bg-slate-800 border border-slate-700 text-slate-200 p-2 text-xs outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={handleApplyAboutEdits}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    บันทึกข้อความทั้งหมด
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAdminMode(false)}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 text-xs font-bold uppercase tracking-widest"
                  >
                    ปิดการตั้งค่า
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
