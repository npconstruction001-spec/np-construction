import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Briefcase, 
  X, 
  UploadCloud, 
  CheckCircle2, 
  Plus,
  RotateCcw
} from "lucide-react";
import { Project } from "../types";
import { PORTFOLIO } from "../constants/data";

interface PortfolioProps {
  isAdminMode: boolean;
  portfolio: Project[];
  setPortfolio: (v: Project[]) => void;
  triggerSavedToast: () => void;
}

export default function Portfolio({
  isAdminMode,
  portfolio,
  setPortfolio,
  triggerSavedToast,
}: PortfolioProps) {
  const [selectedProjectIdx, setSelectedProjectIdx] = useState<number | null>(null);
  const [activeGalleryIdx, setActiveGalleryIdx] = useState<number>(0);
  const [confirmDeleteIdx, setConfirmDeleteIdx] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("ทั้งหมด");

  const categories = [
    "ทั้งหมด",
    "งานโครงการภาครัฐ/ราชการ",
    "งานอาคารและโครงสร้างเอกชน",
    "งานระบบวิศวกรรมและไฟฟ้า"
  ];

  const filteredPortfolio = activeFilter === "ทั้งหมด"
    ? portfolio
    : portfolio.filter((item) => item.category === activeFilter);

  const handleOpenProject = (idx: number) => {
    setSelectedProjectIdx(idx);
    setActiveGalleryIdx(0);
  };

  const handleDeleteProject = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    const filtered = portfolio.filter((_, i) => i !== idx);
    setPortfolio(filtered);
    localStorage.setItem("np_portfolio_data", JSON.stringify(filtered));
    setConfirmDeleteIdx(null);
    if (selectedProjectIdx === idx) {
      setSelectedProjectIdx(null);
    }
    triggerSavedToast();
  };

  const handleAddProject = () => {
    const newProj: Project = {
      title: "โครงการติดตั้งระบบหม้อแปลงไฟฟ้าใหม่ " + (portfolio.length + 1),
      category: activeFilter !== "ทั้งหมด" ? activeFilter : "งานระบบวิศวกรรมและไฟฟ้า",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600",
      fallback: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600",
      details: "รายละเอียดโครงการและงานวิศวกรรมเฉพาะตัวแบบยั่งยืน...",
      location: "กรุงเทพมหานคร",
      duration: "60 วัน",
      year: "พ.ศ. 2569",
      scope: ["งานติดตั้งระบบไฟฟ้าส่องสว่าง", "งานเดินระบบกำลังไฟหลัก"],
      gallery: [
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600"
      ]
    };
    const updated = [...portfolio, newProj];
    setPortfolio(updated);
    localStorage.setItem("np_portfolio_data", JSON.stringify(updated));
    triggerSavedToast();
  };

  const handleUpdateField = (projIdx: number, field: keyof Project, val: any) => {
    const updated = [...portfolio];
    updated[projIdx] = {
      ...updated[projIdx],
      [field]: val
    };
    setPortfolio(updated);
    localStorage.setItem("np_portfolio_data", JSON.stringify(updated));
  };

  return (
    <section id="portfolio" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="editorial-grid gap-12 mb-12">
          <div className="col-span-12 lg:col-span-6 space-y-4">
            <span className="label-small text-gold uppercase tracking-widest font-mono flex items-center gap-2">
              <Briefcase size={14} /> LIVE CONSTRUCTION PORTAL
            </span>
            <h2 className="text-3xl md:text-5xl tracking-tighter uppercase font-tech text-navy-dark">
              แฟ้มสะสมผลงาน <br />
              <span className="text-gold">โครงการที่ส่งมอบแล้วเสร็จ</span>
            </h2>
            <p className="text-slate-500 font-light text-sm max-w-lg leading-relaxed">
              ภาพบันทึกความคืบหน้าเชิงวิศวกรรมจริงจากฐานข้อมูลระบบ เอ็นพี คอนดักชั่น เพื่อตรวจทานขอบเขตงานระบบโยธา โครงสร้างเมทัลชีท และเดินสายไฟแรงสูงตู้นิรภัยรวม
            </p>
          </div>
        </div>

        {/* Category Filters Grid */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-slate-100 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-3 text-xs font-bold rounded-sm transition-all tracking-wide ${
                activeFilter === cat
                  ? "bg-navy-dark text-white shadow-md shadow-navy-dark/15 font-semibold"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-navy-dark cursor-pointer font-medium"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredPortfolio.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-slate-200 rounded-sm bg-slate-50">
            <p className="text-slate-400 text-sm font-sans">ไม่พบรายการผลงานในหมวดหมู่นี้</p>
            {isAdminMode && (
              <button
                type="button"
                onClick={handleAddProject}
                className="mt-4 bg-navy-dark text-white px-5 py-2.5 text-xs font-bold rounded-sm hover:bg-navy-light transition-all cursor-pointer"
              >
                เพิ่มโครงการในหมวดหมู่นี้ +
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredPortfolio.map((proj, idx) => {
              // Map back to original index in portfolio array to keep editing and deleting consistent
              const targetIdx = portfolio.findIndex((p) => p.title === proj.title);
              const originalIdx = targetIdx !== -1 ? targetIdx : idx;

              return (
                <div
                  key={idx}
                  onClick={() => handleOpenProject(originalIdx)}
                  className="group aspect-square bg-[#050C18] relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-white/5 rounded-sm"
                >
                  <img
                    src={proj.image || proj.fallback}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/30 to-transparent z-10 transition-opacity group-hover:opacity-90"></div>
                  
                  {/* Interactive Hint Badge */}
                  <div className="absolute top-4 left-4 z-20 bg-gold/90 text-navy-dark text-[9px] font-mono font-black uppercase tracking-widest px-2.5 py-1.5 rounded-sm opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-300 flex items-center gap-1">
                    <span>🔍 ดูรายละเอียด & รูปงาน</span>
                  </div>

                  <div className="relative z-20 p-6 flex flex-col justify-end h-full">
                    <span className="text-[10px] text-gold font-mono uppercase tracking-widest">{proj.category}</span>
                    <h3 className="text-sm font-bold text-white uppercase mt-1 leading-tight line-clamp-2">{proj.title}</h3>
                  </div>

                  {/* Admin actions inside the project card */}
                  {isAdminMode && (
                    <div className="absolute top-4 right-4 z-30" onClick={(e) => e.stopPropagation()}>
                      {confirmDeleteIdx === originalIdx ? (
                        <div className="bg-red-605 text-white p-2 rounded-sm text-[10px] font-bold flex flex-col gap-1 shadow-lg bg-red-600">
                          <span>ลบรายการนี้?</span>
                          <div className="flex gap-1">
                            <button
                              onClick={(e) => handleDeleteProject(e, originalIdx)}
                              className="bg-white text-red-650 px-1.5 py-0.5 rounded-sm font-bold cursor-pointer text-red-600"
                            >
                              ลบ
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setConfirmDeleteIdx(null);
                              }}
                              className="bg-red-800 text-white px-1.5 py-0.5 rounded-sm cursor-pointer"
                            >
                              ยกเลิก
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setConfirmDeleteIdx(originalIdx);
                          }}
                          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full cursor-pointer transition-colors shadow-sm flex items-center justify-center"
                          title="ลบผลงานนี้"
                        >
                          ❌
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Dynamic Interactive Project Detail Modal */}
        <AnimatePresence>
          {selectedProjectIdx !== null && portfolio[selectedProjectIdx] && (() => {
            const proj = portfolio[selectedProjectIdx];
            const galleryList = proj.gallery || [proj.image || proj.fallback];
            const activeImage = galleryList[activeGalleryIdx] || proj.image || proj.fallback;

            return (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-8 font-sans overflow-y-auto"
                onClick={() => setSelectedProjectIdx(null)}
              >
                <motion.div
                  initial={{ scale: 0.95, y: 30 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 30 }}
                  className="w-full max-w-5xl bg-navy-dark text-white border border-gold/30 shadow-[0_30px_60px_rgba(0,0,0,0.9)] rounded-sm overflow-hidden flex flex-col relative my-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Top Header Controls */}
                  <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedProjectIdx(null)}
                      className="bg-navy-light/80 hover:bg-gold hover:text-navy-dark text-white p-2.5 rounded-sm transition-all shadow-md cursor-pointer border border-white/10"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Modal Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-y-auto max-h-[90vh]">
                    {/* Left Side: Images & Gallery (7 Cols) */}
                    <div className="lg:col-span-7 bg-[#050C18] p-6 flex flex-col gap-4 border-r border-white/5">
                      {/* Active Large Image Display */}
                      <div className="aspect-[4/3] md:aspect-video w-full overflow-hidden border border-white/10 relative rounded-sm bg-black flex items-center justify-center">
                        <img
                          src={activeImage}
                          alt={proj.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex justify-between items-end">
                          <span className="text-[10px] text-gold font-mono tracking-widest bg-navy-dark/80 px-2 py-1 rounded border border-gold/10 uppercase">
                            รูปประกอบที่ {activeGalleryIdx + 1} / {galleryList.length}
                          </span>
                        </div>
                      </div>

                      {/* Gallery Thumbnail Strip */}
                      <div className="space-y-2 mt-2">
                        <span className="text-[9px] font-mono tracking-wider text-slate-400 block uppercase">
                          🖼️ อัลบั้มภาพระบบงาน / Job-Site Actions ({galleryList.length})
                        </span>
                        <div className="flex flex-wrap gap-2.5">
                          {galleryList.map((gImg: string, gIdx: number) => (
                            <div
                              key={gIdx}
                              onClick={() => setActiveGalleryIdx(gIdx)}
                              className={`relative w-16 h-12 bg-black overflow-hidden rounded-sm border cursor-pointer transition-all ${
                                activeGalleryIdx === gIdx
                                  ? "border-gold scale-105 shadow-md shadow-gold/15"
                                  : "border-white/10 opacity-70 hover:opacity-100"
                              }`}
                            >
                              <img
                                src={gImg}
                                alt="thumbnail"
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                              {isAdminMode && galleryList.length > 1 && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const updatedGallery = galleryList.filter((_, idxFilter) => idxFilter !== gIdx);
                                    handleUpdateField(selectedProjectIdx, "gallery", updatedGallery);
                                    if (gIdx === 0 && updatedGallery[0]) {
                                      handleUpdateField(selectedProjectIdx, "image", updatedGallery[0]);
                                    }
                                    setActiveGalleryIdx(0);
                                    triggerSavedToast();
                                  }}
                                  className="absolute top-0.5 right-0.5 bg-red-600 hover:bg-red-700 text-white text-[8px] p-0.5 rounded shadow cursor-pointer flex items-center justify-center"
                                  title="ลบรูปภาพนี้"
                                >
                                  🗑️
                                </button>
                              )}
                            </div>
                          ))}

                          {/* Upload New Photo to Gallery (Admin Mode) */}
                          {isAdminMode && (
                            <label className="w-16 h-12 flex flex-col items-center justify-center border border-dashed border-gold/40 hover:border-gold rounded-sm bg-gold/5 hover:bg-gold/10 cursor-pointer transition-all text-gold">
                              <UploadCloud size={14} />
                              <span className="text-[7px] font-mono text-center font-bold mt-1 uppercase">ADD PHOTO</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (event) => {
                                      const result = event.target?.result as string;
                                      if (result) {
                                        const updatedGallery = [...galleryList, result];
                                        handleUpdateField(selectedProjectIdx, "gallery", updatedGallery);
                                        setActiveGalleryIdx(updatedGallery.length - 1);
                                        triggerSavedToast();
                                      }
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                            </label>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right Side: Details Sheet & Info (5 Cols) */}
                    <div className="lg:col-span-5 p-8 flex flex-col justify-between bg-navy-dark h-full">
                      <div className="space-y-6">
                        {/* Category Badge & Code */}
                        <div className="flex justify-between items-center border-b border-white/10 pb-4">
                          <div>
                            {isAdminMode ? (
                              <input
                                type="text"
                                value={proj.category}
                                onChange={(e) => {
                                  handleUpdateField(selectedProjectIdx, "category", e.target.value);
                                }}
                                className="bg-navy-light text-gold text-xs font-mono font-bold uppercase tracking-wider px-2 py-1.5 border border-white/10 rounded w-full border-solid"
                              />
                            ) : (
                              <span className="text-xs text-gold font-mono font-bold uppercase tracking-wider">
                                {proj.category}
                              </span>
                            )}
                          </div>
                          <span className="text-[9px] font-mono font-black text-white/40 font-tech">NP-PROJECT #{selectedProjectIdx + 1}</span>
                        </div>

                        {/* Project Main Title */}
                        <div>
                          {isAdminMode ? (
                            <input
                              type="text"
                              value={proj.title}
                              onChange={(e) => {
                                handleUpdateField(selectedProjectIdx, "title", e.target.value);
                              }}
                              className="bg-navy-light text-white text-md font-bold border border-white/10 rounded w-full p-2 font-sans"
                            />
                          ) : (
                            <h3 className="text-xl md:text-2xl font-bold font-sans tracking-tight text-white leading-normal">
                              {proj.title}
                            </h3>
                          )}
                        </div>

                        {/* Tech Spec Sheet Grid */}
                        <div className="grid grid-cols-2 gap-4 bg-navy-light/40 p-4 border border-white/5 rounded">
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold">📍 สถานที่</span>
                            {isAdminMode ? (
                              <input
                                type="text"
                                value={proj.location || ""}
                                onChange={(e) => {
                                  handleUpdateField(selectedProjectIdx, "location", e.target.value);
                                }}
                                className="bg-navy-light text-white text-xs border border-white/10 rounded w-full mt-1 p-1"
                              />
                            ) : (
                              <span className="text-xs font-medium text-slate-200 mt-0.5 block">{proj.location || "-"}</span>
                            )}
                          </div>
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold">⏱️ ระยะเวลาก่อสร้าง</span>
                            {isAdminMode ? (
                              <input
                                type="text"
                                value={proj.duration || ""}
                                onChange={(e) => {
                                  handleUpdateField(selectedProjectIdx, "duration", e.target.value);
                                }}
                                className="bg-navy-light text-white text-xs border border-white/10 rounded w-full mt-1 p-1"
                              />
                            ) : (
                              <span className="text-xs font-medium text-slate-200 mt-0.5 block">{proj.duration || "-"}</span>
                            )}
                          </div>
                          <div className="col-span-2 border-t border-white/5 pt-3">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold">📅 ปีที่แล้วเสร็จ</span>
                            {isAdminMode ? (
                              <input
                                type="text"
                                value={proj.year || ""}
                                onChange={(e) => {
                                  handleUpdateField(selectedProjectIdx, "year", e.target.value);
                                }}
                                className="bg-navy-light text-white text-xs border border-white/10 rounded w-full mt-1 p-1"
                              />
                            ) : (
                              <span className="text-xs font-medium text-gold mt-0.5 block">{proj.year || "-"}</span>
                            )}
                          </div>
                        </div>

                        {/* Details Paragraph */}
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-gold block font-bold">📄 รายละเอียดโครงการ</span>
                          {isAdminMode ? (
                            <textarea
                              value={proj.details || ""}
                              onChange={(e) => {
                                handleUpdateField(selectedProjectIdx, "details", e.target.value);
                              }}
                              rows={4}
                              className="bg-navy-light text-slate-200 text-xs border border-white/10 rounded w-full p-2 font-sans focus:border-gold outline-none"
                            />
                          ) : (
                            <p className="text-xs text-slate-300 font-light leading-relaxed font-sans">
                              {proj.details || "ไม่มีข้อมูลรายละเอียดในสัญญางานนี้..."}
                            </p>
                          )}
                        </div>

                        {/* List of Scopes checklist */}
                        <div className="space-y-2.5">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-gold block font-bold">🔧 งานระบบที่ดำเนินการหลัก</span>
                          {isAdminMode ? (
                            <div className="space-y-1">
                              <textarea
                                value={(proj.scope || []).join("\n")}
                                placeholder="ใส่ขอบเขตงานบรรทัดละรายการ"
                                onChange={(e) => {
                                  const lines = e.target.value.split("\n");
                                  handleUpdateField(selectedProjectIdx, "scope", lines);
                                }}
                                rows={3}
                                className="bg-navy-light text-slate-200 text-xs border border-white/10 rounded w-full p-2 font-sans focus:border-gold outline-none whitespace-pre"
                              />
                              <span className="text-[8px] text-slate-400 font-mono block">เคล็ดลับ: เครื่องหมายจุดขึ้นบรรทัดใหม่ คือการสร้าง Bullet point 📝</span>
                            </div>
                          ) : (
                            <div className="flex flex-col gap-2">
                              {(proj.scope || ["งานร้อยสายและเชื่อมระบบหลัก"]).map((sc: string, scI: number) => (
                                <div key={scI} className="flex gap-2.5 items-start">
                                  <CheckCircle2 size={13} className="text-gold shrink-0 mt-0.5" />
                                  <span className="text-[11px] font-sans text-slate-200 font-light leading-snug">{sc}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Footer action button inside Modal */}
                      <div className="border-t border-white/10 pt-6 mt-8 flex justify-end gap-2">
                        {isAdminMode && (
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedProjectIdx(null);
                            }}
                            className="bg-gold hover:bg-amber-400 text-navy-dark px-6 py-2.5 text-[10px] font-mono font-black uppercase tracking-widest rounded transition-all cursor-pointer"
                          >
                            บันทึก &amp; ปิด 💾
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setSelectedProjectIdx(null)}
                          className="bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 text-[10px] font-mono font-black uppercase tracking-widest rounded transition-all cursor-pointer"
                        >
                          ปิดหน้าต่าง ✖
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })()}
        </AnimatePresence>

        {isAdminMode && (
          <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              type="button"
              onClick={handleAddProject}
              className="bg-navy-dark text-white hover:bg-gold hover:text-navy-dark border border-gold/40 hover:border-gold px-8 py-4.5 text-xs font-bold uppercase tracking-widest rounded transition-all flex items-center gap-2 shadow-2xl cursor-pointer"
            >
              <Plus size={16} /> ADD NEW PROJECT (เพิ่มโครงการใหม่)
            </button>
            <button
              type="button"
              onClick={() => {
                if (window.confirm("คุณต้องการคืนค่าผลงานทั้งหมดกลับเป็นค่าเริ่มต้นหรือไม่? ข้อมูลแก้ไขก่อนหน้าจะถูกเลือกทดแทนใหม่ทั้งหมดค่ะ")) {
                  setPortfolio(PORTFOLIO);
                  localStorage.setItem("np_portfolio_data", JSON.stringify(PORTFOLIO));
                  setActiveFilter("ทั้งหมด");
                  triggerSavedToast();
                }
              }}
              className="bg-red-900/10 border border-red-500/25 hover:bg-red-950 hover:border-red-500 text-red-500 hover:text-white px-8 py-4.5 text-xs font-bold uppercase tracking-widest rounded transition-all flex items-center gap-2 shadow-2xl cursor-pointer border-solid"
              title="กู้คืนข้อมูลหน้าผลงานเริ่มต้นจากไฟล์ระบบเพื่อแก้ปัญหางานหาย"
            >
              <RotateCcw size={16} /> RESTORE DEFAULTS (กู้คืนผลงานดั้งเดิม)
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
