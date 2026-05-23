import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Upload, 
  Edit3, 
  Sparkles, 
  Check, 
  RotateCcw, 
  Layers,
  FileImage,
  Image as ImageIcon
} from "lucide-react";
import { 
  imgBannerLeft, 
  imgBannerRight, 
  imgPowerPlant, 
  imgTescoLotus,
  imgLotusConstruction
} from "../constants/data";

interface SlideData {
  title: string;
  subtitle: string;
  image: string;
  badge: string;
}

interface HeroProps {
  isAdminMode: boolean;
  triggerSavedToast: () => void;
  setIsAdminMode: (v: boolean) => void;
}

export default function Hero({
  isAdminMode,
  triggerSavedToast,
  setIsAdminMode,
}: HeroProps) {
  // Initialize slider state from localStorage
  const [slides, setSlides] = useState<SlideData[]>(() => {
    const saved = localStorage.getItem("np_hero_slides_v5");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing saved slides", e);
      }
    }
    return [
      {
        title: "BUILDING STRONG FOUNDATIONS WITH QUALITY",
        subtitle: "หจก. เอ็นพี คอนดักชั่น - รับเหมาก่อสร้างและงานระบบวิศวกรรมครบวงจร มุ่งมั่นส่งมอบผลงานคุณภาพสูงและได้มาตรฐานวิศวกรรมควบคุมในทุกมิติ",
        image: imgBannerLeft,
        badge: "EPC & COMPLETE CONSTRUCTION"
      },
      {
        title: "CIVIL & INDUSTRIAL STRUCTURAL DESIGN",
        subtitle: "รับสร้างโรงงานอุตสาหกรรม คลังสินค้า ตึกพาณิชย์ และสำนักงานส่วนบุคคล ตั้งแต่เสาเข็มฐานรากจนถึงงานตกแต่งสถาปัตยกรรมระดับพรีเมียม",
        image: imgBannerRight,
        badge: "INDUSTRIAL & BUILDINGS"
      },
      {
        title: "PRECISE POWER & MEP ENGINEERING SYSTEM",
        subtitle: "ดูแลจัดการ วางผัง และควบคุมระบบไฟฟ้ากำลัง MDB หม้อแปลงแรงดันสูง ระบบปรับอากาศ และเชื่อมโยงท่อน้ำประปาครบสูตรอัจฉริยะ",
        image: imgLotusConstruction,
        badge: "MEP & ELECTRICAL UTILITY"
      }
    ];
  });

  const [currentSlideIdx, setCurrentSlideIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [editingSlideIdx, setEditingSlideIdx] = useState<number>(0);

  // Draft fields for Admin Mode edits to prevent input-lag matching the full form fields
  const [draftTitle, setDraftTitle] = useState<string>("");
  const [draftSubtitle, setDraftSubtitle] = useState<string>("");
  const [draftBadge, setDraftBadge] = useState<string>("");
  const [draftImageUrl, setDraftImageUrl] = useState<string>("");
  const [draftUploadStatus, setDraftUploadStatus] = useState<"idle" | "uploading" | "success">("idle");

  const slideTimerId = useRef<NodeJS.Timeout | null>(null);

  // Auto-play interval cycles
  useEffect(() => {
    if (!isPlaying || isAdminMode) {
      if (slideTimerId.current) clearInterval(slideTimerId.current);
      return;
    }

    slideTimerId.current = setInterval(() => {
      setCurrentSlideIdx((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => {
      if (slideTimerId.current) clearInterval(slideTimerId.current);
    };
  }, [isPlaying, slides.length, isAdminMode]);

  // Synchronize draft fields whenever our active edit selection shifts.
  useEffect(() => {
    const selected = slides[editingSlideIdx];
    if (selected) {
      setDraftTitle(selected.title);
      setDraftSubtitle(selected.subtitle);
      setDraftBadge(selected.badge);
      setDraftImageUrl(selected.image);
    }
  }, [editingSlideIdx, slides]);

  const handleNextSlide = () => {
    setCurrentSlideIdx((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlideIdx((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleApplySlideEdits = () => {
    const updated = [...slides];
    updated[editingSlideIdx] = {
      title: draftTitle,
      subtitle: draftSubtitle,
      image: draftImageUrl,
      badge: draftBadge
    };
    setSlides(updated);
    localStorage.setItem("np_hero_slides_v5", JSON.stringify(updated));
    triggerSavedToast();
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleResetSlides = () => {
    if (window.confirm("คุณต้องการกู้คืนภาพสไลด์และข้อความดั้งเดิมทั้งหมดกลับคืนหรือไม่คะ?")) {
      const defaultSlides = [
        {
          title: "BUILDING STRONG FOUNDATIONS WITH QUALITY",
          subtitle: "หจก. เอ็นพี คอนดักชั่น - รับเหมาก่อสร้างและงานระบบวิศวกรรมครบวงจร มุ่งมั่นส่งมอบผลงานคุณภาพสูงและได้มาตรฐานวิศวกรรมควบคุมในทุกมิติ",
          image: imgBannerLeft,
          badge: "EPC & COMPLETE CONSTRUCTION"
        },
        {
          title: "CIVIL & INDUSTRIAL STRUCTURAL DESIGN",
          subtitle: "รับสร้างโรงงานอุตสาหกรรม คลังสินค้า ตึกพาณิชย์ และสำนักงานส่วนบุคคล ตั้งแต่เสาเข็มฐานรากจนถึงงานตกแต่งสถาปัตยกรรมระดับพรีเมียม",
          image: imgBannerRight,
          badge: "INDUSTRIAL & BUILDINGS"
        },
        {
          title: "PRECISE POWER & MEP ENGINEERING SYSTEM",
          subtitle: "ดูแลจัดการ วางผัง และควบคุมระบบไฟฟ้ากำลัง MDB หม้อแปลงแรงดันสูง ระบบปรับอากาศ และเชื่อมโยงท่อน้ำประปาครบสูตรอัจฉริยะ",
          image: imgLotusConstruction,
          badge: "MEP & ELECTRICAL UTILITY"
        }
      ];
      setSlides(defaultSlides);
      localStorage.setItem("np_hero_slides_v5", JSON.stringify(defaultSlides));
      setCurrentSlideIdx(0);
      setEditingSlideIdx(0);
      triggerSavedToast();
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[92vh] md:h-screen w-full overflow-hidden bg-slate-950 text-white flex items-center font-sans select-none"
    >
      {/* Background Slideshow Component */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlideIdx}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={slides[currentSlideIdx]?.image}
              alt="AESCON inspired banner"
              className="w-full h-full object-cover brightness-[0.35] contrast-105"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>

        {/* Super Premium AESCON Mesh Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/60 to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 to-transparent"></div>
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950/20 to-transparent"></div>
      </div>

      {/* Hero content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20 md:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main textual animation area */}
          <div className="lg:col-span-8 space-y-8 text-left">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlideIdx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {/* Badge Category with crimson highlights mimicking AESCON taglines */}
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-red-600"></div>
                  <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-red-500 font-extrabold bg-red-950/40 border border-red-800/40 px-3 py-1 bg-opacity-30 rounded-sm">
                    {slides[currentSlideIdx]?.badge}
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl font-black font-sans leading-[1.1] tracking-tight uppercase text-white">
                  {slides[currentSlideIdx]?.title.split(" ").map((word, wIdx) => {
                    const highlight = ["QUALITY", "FOUNDATIONS", "DESIGN", "SYSTEM", "ENGINEERING"].includes(word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""));
                    return (
                      <span key={wIdx} className={highlight ? "text-red-500 font-extrabold mr-3 mr-xs:mr-1 block md:inline" : "mr-3 mr-xs:mr-1"}>
                        {word}
                      </span>
                    );
                  })}
                </h1>

                <p className="text-sm md:text-base text-slate-300 font-normal leading-relaxed max-w-2xl font-sans">
                  {slides[currentSlideIdx]?.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Quick action buttons aligned horizontally */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <a 
                href="#services" 
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all shadow-xl shadow-red-900/20 text-center flex items-center justify-center gap-2 rounded-sm"
              >
                บริการของเรา (Our Services)
              </a>
              <a 
                href="#portfolio" 
                className="border border-white/20 text-white bg-white/5 hover:bg-white/10 hover:border-white/50 px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all text-center rounded-sm"
              >
                รวมโครงการหลัก (Our Projects)
              </a>
            </div>

            {/* Bottom HUD Carousel Navigation Controls */}
            <div className="flex items-center gap-4 pt-8 border-t border-white/5 max-w-xl">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handlePrevSlide}
                  className="w-10 h-10 border border-white/10 hover:border-white/40 bg-slate-900/60 hover:bg-red-600 text-white transition-all flex items-center justify-center rounded-full cursor-pointer"
                  title="ภาพก่อนหน้า"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={handleNextSlide}
                  className="w-10 h-10 border border-white/10 hover:border-white/40 bg-slate-900/60 hover:bg-red-600 text-white transition-all flex items-center justify-center rounded-full cursor-pointer"
                  title="ภาพถัดไป"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Slide Counter Dots and Numbers */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-red-500">
                  0{currentSlideIdx + 1}
                </span>
                <div className="flex gap-1.5">
                  {slides.map((_, sIdx) => (
                    <button
                      key={sIdx}
                      type="button"
                      onClick={() => setCurrentSlideIdx(sIdx)}
                      className={`h-1.5 transition-all rounded-full ${
                        currentSlideIdx === sIdx ? "w-8 bg-red-600" : "w-2 bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-mono text-slate-500">
                  0{slides.length}
                </span>
              </div>
            </div>

          </div>

          {/* Right side interactive content - Admin Panel for live adjustments */}
          <div className="lg:col-span-4 lg:block lg:self-end lg:mb-8">
            {isAdminMode ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-900/95 border-2 border-dashed border-red-500/40 p-6 rounded-sm shadow-2xl space-y-4"
              >
                <div className="flex items-center justify-between border-b border-white/15 pb-3">
                  <span className="text-xs font-sans font-bold text-red-400 flex items-center gap-1.5 uppercase">
                    <Sparkles size={14} className="text-red-500 animate-pulse" /> Live Hero Slideshow Config
                  </span>
                  <button
                    type="button"
                    onClick={handleResetSlides}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                    title="กู้คืนชุดเริ่มต้น"
                  >
                    <RotateCcw size={14} />
                  </button>
                </div>

                {/* Slector slots */}
                <div className="flex gap-2.5">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setEditingSlideIdx(idx)}
                      className={`px-3 py-1.5 font-mono text-[10px] font-black tracking-widest rounded transition-all cursor-pointer ${
                        editingSlideIdx === idx 
                          ? "bg-red-600 text-white font-extrabold shadow" 
                          : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                      }`}
                    >
                      SLIDE {idx + 1}
                    </button>
                  ))}
                </div>

                {/* Live Form Fields */}
                <div className="space-y-3 font-sans">
                  <div>
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">หน้าหลักประเภทแถบสไลด์ (Badge)</label>
                    <input
                      type="text"
                      value={draftBadge}
                      onChange={(e) => setDraftBadge(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 focus:border-red-500 p-2 text-xs text-white outline-none rounded-none"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">หัวเรื่องหลัก (Slide Title)</label>
                    <textarea
                      value={draftTitle}
                      onChange={(e) => setDraftTitle(e.target.value)}
                      rows={2}
                      className="w-full bg-slate-800 border border-slate-700 focus:border-red-500 p-2 text-xs text-white outline-none rounded-none font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">คำอธิบายภาพรวม (Subtitle Explanation)</label>
                    <textarea
                      value={draftSubtitle}
                      onChange={(e) => setDraftSubtitle(e.target.value)}
                      rows={3}
                      className="w-full bg-slate-800 border border-slate-700 focus:border-red-500 p-2 text-xs text-slate-300 outline-none rounded-none leading-relaxed"
                    />
                  </div>

                  {/* Image swap area */}
                  <div className="bg-slate-950 p-3.5 border border-slate-800 space-y-3">
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase block">📸 จัดการรูปพื้นหลังสไลด์ที่ #{editingSlideIdx + 1}</span>
                    
                    <div>
                      <label className="text-[8px] text-slate-500 block mb-1">1. วางที่อยู่ลิงก์รูปตรงๆ (Image URL Path)</label>
                      <input
                        type="text"
                        value={draftImageUrl}
                        onChange={(e) => setDraftImageUrl(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 focus:border-red-500 p-1.5 text-[10px] text-white outline-none rounded-none font-mono"
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>

                    <div className="border-t border-slate-800/80 pt-2 flex items-center justify-between">
                      <span className="text-[8px] text-slate-500">2. หรืออัปโหลดรูปตรงจากเครื่องท่าน:</span>
                      <label className="bg-slate-800 hover:bg-red-600 hover:text-white px-3 py-1.5 text-[8px] font-bold uppercase tracking-widest text-slate-300 cursor-pointer flex items-center gap-1.5 shadow transition-all">
                        <Upload size={10} /> อัปโหลดไฟล์รูป
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageFileChange}
                        />
                      </label>
                    </div>

                    {draftUploadStatus === "success" && (
                      <p className="text-[8px] text-emerald-400 font-sans tracking-tight">อ่านข้อมูลรูปสำเร็จ เรียบร้อย!</p>
                    )}
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={handleApplySlideEdits}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 text-[10px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                  >
                    <Check size={12} /> ยืนยกเลิก/เซฟสไลด์นี้
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAdminMode(false)}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 text-[9px] font-bold uppercase tracking-widest"
                  >
                    ปิดตั้งค่า
                  </button>
                </div>
              </motion.div>
            ) : (
              // Beautiful minimal trust statistics overview mimicking AESCON right margins
              <div className="bg-slate-950/45 backdrop-blur-sm border border-white/5 py-5 px-7 rounded-sm space-y-4 text-left hidden lg:block lg:translate-y-4 shadow-xl">
                <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-red-500 font-black block">CORPORATE REPUTATION</span>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <span className="text-3xl font-black text-white font-sans block">10+</span>
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider block mt-1">ปีที่ให้คำมั่นสัญญา</span>
                  </div>
                  <div>
                    <span className="text-3xl font-black text-white font-sans block">100%</span>
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider block mt-1">ส่งมอบงานทันกำหนด</span>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4">
                  <span className="text-[9px] text-slate-400 leading-relaxed block font-sans">
                    ทุกโครงการก่อสร้างของ เอ็นพี คอนดักชั่น ได้รับการควบคุม ตรวจวัดคุณภาพ และวางแผนโดยทีมวิศวกรผู้เชี่ยวชาญ คุมหน้างานอย่างมืออาชีพ
                  </span>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
