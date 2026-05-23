import React, { useState, useEffect } from "react";
import { 
  Video, 
  Play, 
  Edit3, 
  Sparkles, 
  Link, 
  UploadCloud, 
  CheckCircle2, 
  RotateCcw 
} from "lucide-react";
import { VideoItem } from "../types";
import { 
  saveVideoToIndexedDB, 
  getVideoFromIndexedDB, 
  removeVideoFromIndexedDB 
} from "../utils/db";

interface VideoSectionProps {
  isAdminMode: boolean;
  setIsAdminMode: (v: boolean) => void;
  videoPlaylists: VideoItem[];
  setVideoPlaylists: (v: VideoItem[]) => void;
  triggerSavedToast: () => void;
}

export default function VideoSection({
  isAdminMode,
  setIsAdminMode,
  videoPlaylists,
  setVideoPlaylists,
  triggerSavedToast,
}: VideoSectionProps) {
  const [activeVideoIdx, setActiveVideoIdx] = useState<number>(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [tempVideoObjectUrl, setTempVideoObjectUrl] = useState<string | null>(null);

  // Draft states matching full form fields
  const [draftVideoTitle, setDraftVideoTitle] = useState<string>("");
  const [draftVideoSubtitle, setDraftVideoSubtitle] = useState<string>("");
  const [draftVideoUrl, setDraftVideoUrl] = useState<string>("");
  const [draftVideoFileUrl, setDraftVideoFileUrl] = useState<string | null>(null);
  const [draftVideoFileBlob, setDraftVideoFileBlob] = useState<Blob | null>(null);
  const [videoApplyStatus, setVideoApplyStatus] = useState<"idle" | "pending" | "success">("idle");
  const [confirmResetVideo, setConfirmResetVideo] = useState<boolean>(false);

  // Synchronize drafts when current video item or mode selection changes
  useEffect(() => {
    const current = videoPlaylists[activeVideoIdx];
    if (current) {
      setDraftVideoTitle(current.title);
      setDraftVideoSubtitle(current.subtitle);
      setDraftVideoUrl(current.videoUrl.startsWith("localdb://") ? "" : current.videoUrl);
      setDraftVideoFileUrl(null);
      setDraftVideoFileBlob(null);
    }
  }, [activeVideoIdx, videoPlaylists]);

  // Load and decode IndexedDB binary blobs for real local uploads
  useEffect(() => {
    let active = true;
    const current = videoPlaylists[activeVideoIdx];
    if (current && current.videoUrl.startsWith("localdb://")) {
      const key = current.videoUrl.replace("localdb://", "");
      getVideoFromIndexedDB(key).then((blob) => {
        if (blob && active) {
          // Release previous object URLs from memory
          if (tempVideoObjectUrl) {
            URL.revokeObjectURL(tempVideoObjectUrl);
          }
          const localUrl = URL.createObjectURL(blob);
          setTempVideoObjectUrl(localUrl);
        }
      });
    } else {
      if (tempVideoObjectUrl) {
        URL.revokeObjectURL(tempVideoObjectUrl);
        setTempVideoObjectUrl(null);
      }
    }
    return () => {
      active = false;
    };
  }, [activeVideoIdx, videoPlaylists]);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      if (tempVideoObjectUrl) {
        URL.revokeObjectURL(tempVideoObjectUrl);
      }
    };
  }, [tempVideoObjectUrl]);

  const activeVideo = videoPlaylists[activeVideoIdx] || { title: "", subtitle: "", videoUrl: "" };
  const effectiveVideoUrl = tempVideoObjectUrl || activeVideo.videoUrl;

  const handleApplyVideoConfig = () => {
    setVideoApplyStatus("pending");
    setTimeout(async () => {
      let targetVideoUrl = draftVideoUrl;
      const key = `video_file_${activeVideoIdx}`;

      if (draftVideoFileBlob) {
        // Save binary content to IndexedDB for REAL persistence across page loads and compilations
        await saveVideoToIndexedDB(key, draftVideoFileBlob);
        targetVideoUrl = `localdb://${key}`;
      } else if (!draftVideoUrl) {
        // If no URL is provided and no local file has been selected, fallback
        targetVideoUrl = activeVideo.videoUrl;
      } else {
        // If a direct URL text is entered, remove any residual local database file for this slot
        await removeVideoFromIndexedDB(key);
      }

      const updated = [...videoPlaylists];
      updated[activeVideoIdx] = {
        title: draftVideoTitle,
        subtitle: draftVideoSubtitle,
        videoUrl: targetVideoUrl
      };
      setVideoPlaylists(updated);
      localStorage.setItem("np_video_playlist_v3", JSON.stringify(updated));
      setIsVideoPlaying(true); // Auto-play the newly updated track
      setVideoApplyStatus("success");
      triggerSavedToast();
      setTimeout(() => setVideoApplyStatus("idle"), 2500);
    }, 600);
  };

  const handleResetVideoToCorporate = () => {
    const defaultVideos = [
      {
        title: "THE ENGINEERING JOURNEY",
        subtitle: "Corporate Video Showcase",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-construction-worker-at-a-site-working-with-concrete-41584-large.mp4"
      },
      {
        title: "งานติดตั้งและเดินระบบไฟฟ้าตู้ควบคุม MDB",
        subtitle: "MDB Substation Showcase Video",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-welder-working-on-a-pipeline-42614-large.mp4"
      }
    ];
    if (tempVideoObjectUrl) {
      URL.revokeObjectURL(tempVideoObjectUrl);
      setTempVideoObjectUrl(null);
    }
    setVideoPlaylists(defaultVideos);
    localStorage.setItem("np_video_playlist_v3", JSON.stringify(defaultVideos));
    setActiveVideoIdx(0);
    setIsVideoPlaying(false);
    setConfirmResetVideo(false);
    triggerSavedToast();
  };

  return (
    <div className="mt-32">
      <div className="flex items-center gap-4 mb-12">
        <div className="h-px flex-1 bg-slate-200"></div>
        <span className="label-small font-tech text-gold tracking-widest flex items-center gap-2">
          <Video size={14} /> Video Showcase
        </span>
        <div className="h-px flex-1 bg-slate-200"></div>
      </div>
      
      <div className={isAdminMode ? "flex flex-col gap-6 max-w-4xl mx-auto" : "grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"}>
        {/* Video Player Display */}
        <div className={`${isAdminMode ? "w-full" : "col-span-1 lg:col-span-2"} aspect-video bg-navy-dark relative overflow-hidden border border-navy-dark shadow-2xl group rounded-sm`}>
          {isVideoPlaying ? (
            <video 
              src={effectiveVideoUrl} 
              controls 
              autoPlay 
              className="w-full h-full object-cover z-10 relative"
              onError={() => {
                console.error("Video load error");
                setIsVideoPlaying(false);
              }}
            />
          ) : (
            <div 
              onClick={() => setIsVideoPlaying(true)}
              className="absolute inset-0 cursor-pointer z-10 flex flex-col justify-between p-10 h-full"
            >
              {/* Decorative top row */}
              <div className="flex justify-between items-start">
                <span className="mono-label text-gold font-mono bg-navy-dark/70 px-3 py-1.5 border border-gold/20 rounded-sm font-tech">
                  {activeVideo.subtitle || "DEFAULT Corporate Video"}
                </span>
                <span className="text-[10px] text-white/50 bg-navy-dark/60 border border-white/10 px-2 py-1 rounded">
                  Click to Play 🎬
                </span>
              </div>

              {/* Play Button - Centered */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-24 h-24 rounded-full border border-gold flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-[0_0_50px_rgba(197,160,89,0.4)] bg-navy-dark/60 backdrop-blur-sm group-hover:bg-gold group-hover:border-navy-dark">
                  <Play size={32} className="text-gold group-hover:text-navy-dark ml-1.5 fill-current" />
                </div>
              </div>

              {/* Bottom Info details */}
              <div className="z-10 bg-gradient-to-t from-navy-dark/90 to-transparent p-4 -mx-10 -mb-10 pt-16">
                <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase font-tech">
                  {activeVideo.title || "THE ENGINEERING JOURNEY"}
                </h3>
                <p className="text-xs text-slate-300 mt-1 font-sans">คลิกเพื่อรับชมวิดีโอแนะนำ หจก. เอ็นพี คอนดักชั่น</p>
              </div>

              <div className="absolute inset-0 bg-navy-dark/30 z-0 animate-fade"></div>
            </div>
          )}
          {/* Realtime ambient background */}
          <video 
            src={effectiveVideoUrl} 
            muted 
            loop 
            className="absolute inset-0 w-full h-full object-cover opacity-20 blur-sm scale-110" 
          />
        </div>

        {/* Video Info Display or Admin Editor Sidebar */}
        <div className={`bg-slate-50 border border-slate-200 p-8 rounded-sm ${isAdminMode ? "w-full" : "flex flex-col justify-between"}`}>
          {!isAdminMode ? (
            <div className="space-y-6 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <span className="text-[10px] font-mono select-none px-2.5 py-1 text-slate-500 bg-slate-200/60 uppercase font-black rounded-sm border border-slate-300/50 inline-block font-tech">
                  Corporate Media
                </span>
                <h4 className="text-xl font-black text-navy-dark leading-snug tracking-tight font-tech uppercase">
                  {activeVideo.title || "THE ENGINEERING JOURNEY"}
                </h4>
                <p className="text-sm text-slate-500 font-light leading-relaxed font-sans">
                  รับชมวิดีโอพรีเซนเทชั่นและบันทึกภาพถ่ายจากการทำงานจริง ณ ทิวทัศน์สถานที่ติดตั้งของแต่ละโครงการ 
                  สะท้อนฝีมือความประณีตและการคุมเข้มความปลอดภัยทางวิศวกรรม
                </p>
                
                {/* Selector Tab Pills */}
                {videoPlaylists.length > 1 && (
                  <div className="pt-2 flex flex-col gap-1.5">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block font-sans">วิดีโอเพลย์ลิสต์ ({videoPlaylists.length})</span>
                    <div className="flex flex-wrap gap-2">
                      {videoPlaylists.map((vItem, vIdx) => (
                        <button
                          key={vIdx}
                          onClick={() => {
                            setActiveVideoIdx(vIdx);
                            setIsVideoPlaying(false);
                          }}
                          className={`px-3 py-1.5 text-[10px] font-sans font-bold border rounded transition-all cursor-pointer ${
                            activeVideoIdx === vIdx
                              ? "bg-navy-dark border-navy-dark text-white shadow-sm"
                              : "bg-white border-slate-300 text-slate-600 hover:border-navy-dark"
                          }`}
                        >
                          📼 ตอนที่ {vIdx + 1}: {vItem.title.substring(0, 15)}...
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="border-t border-slate-200 pt-6 space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block font-sans">เปิดโหมดผู้ดูแลเพื่อแก้ไข</span>
                <button
                  onClick={() => {
                    setIsAdminMode(true);
                  }}
                  className="w-full bg-navy-dark hover:bg-gold text-white hover:text-navy-dark py-3.5 text-xs font-bold uppercase tracking-widest rounded-sm transition-all flex items-center justify-center gap-2 border border-navy-dark hover:border-gold cursor-pointer"
                >
                  <Edit3 size={14} />
                  แก้ไขวิดีโอนี้ 🎥
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <span className="text-xs font-bold text-gold font-mono bg-navy-dark px-3 py-1.5 border border-gold/30 rounded-sm flex items-center gap-1.5 w-fit font-tech">
                  <Sparkles size={12} /> แก้ไขข้อมูลวิดีโอพรีเซนเทชั่น (สไลด์ #{activeVideoIdx + 1})
                </span>

                {/* Playlist Slidselector within Editor */}
                <div className="flex gap-2 py-1">
                  {videoPlaylists.map((_, pIdx) => (
                    <button
                      key={pIdx}
                      type="button"
                      onClick={() => setActiveVideoIdx(pIdx)}
                      className={`px-3 py-1 font-mono text-[10px] tracking-wider rounded border cursor-pointer ${
                        activeVideoIdx === pIdx 
                          ? "bg-gold border-gold text-navy-dark font-bold" 
                          : "bg-slate-200 border-slate-300 text-slate-600"
                      }`}
                    >
                      SLOT {pIdx + 1}
                    </button>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="flex flex-col gap-1 font-sans">
                    <label className="text-[10px] uppercase font-bold text-slate-500">หัวข้อวิดีโอ (Title)</label>
                    <input
                      type="text"
                      value={draftVideoTitle}
                      onChange={(e) => setDraftVideoTitle(e.target.value)}
                      className="bg-white border border-slate-300 focus:border-gold p-2.5 text-sm outline-none w-full text-navy-dark placeholder-slate-400 rounded-sm font-sans"
                      placeholder="เช่น THE ENGINEERING JOURNEY"
                    />
                  </div>

                  <div className="flex flex-col gap-1 font-sans">
                    <label className="text-[10px] uppercase font-bold text-slate-500">ประเภท/คำอธิบายภาพสั้น (Subtitle)</label>
                    <input
                      type="text"
                      value={draftVideoSubtitle}
                      onChange={(e) => setDraftVideoSubtitle(e.target.value)}
                      className="bg-white border border-slate-300 focus:border-gold p-2.5 text-sm outline-none w-full text-navy-dark placeholder-slate-400 rounded-sm font-sans"
                      placeholder="เช่น Corporate Showcase Video"
                    />
                  </div>

                  {/* Link input */}
                  <div className="flex flex-col gap-1 font-sans">
                    <label className="text-[10px] uppercase font-bold text-slate-500 flex justify-between items-center">
                      <span>ลิงก์วิดีโอภายนอก (.mp4)</span>
                      <Link size={10} className="text-slate-400" />
                    </label>
                    <input
                      type="text"
                      value={draftVideoUrl}
                      onChange={(e) => {
                        setDraftVideoFileUrl(null); // Overwrite local file selection
                        setDraftVideoFileBlob(null);
                        setDraftVideoUrl(e.target.value);
                      }}
                      className="bg-white border border-slate-300 focus:border-gold p-2.5 text-sm outline-none w-full text-navy-dark placeholder-slate-400 rounded-sm font-mono text-xs"
                      placeholder="เช่น https://assets.mixkit.co/... .mp4"
                    />
                  </div>
                </div>

                {/* File Upload Selector */}
                <div className="bg-slate-200/50 p-4 border border-slate-300/40 rounded-sm space-y-2">
                  <label className="text-[10px] uppercase font-bold text-slate-500 block font-sans">
                    หรือเลือกไฟล์วิดีโอจากเครื่องมือถือ/คอมฯ ของคุณ:
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer bg-navy-dark text-white hover:bg-gold hover:text-navy-dark font-mono text-[10px] font-black uppercase tracking-wider py-2.5 px-4 rounded-sm transition-all flex items-center justify-center gap-2 border border-navy-dark shadow">
                      <UploadCloud size={14} /> เลือกวิดีโอ 📂
                      <input
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = URL.createObjectURL(file);
                            setDraftVideoFileUrl(url);
                            setDraftVideoFileBlob(file);
                            setDraftVideoUrl(""); // clear URL text when using a local file
                          }
                        }}
                      />
                    </label>
                    {draftVideoFileUrl ? (
                      <span className="text-[9px] text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded font-sans">โหลดไฟล์พร้อมยืนยันแล้ว</span>
                    ) : null}
                  </div>
                  <p className="text-[9px] text-slate-400 font-sans tracking-tight">
                    แนะนำให้อัปโหลดวิดีโอสั้น หรือไฟล์ที่มีขนาดไม่เกิน 20-30MB เพื่อประสิทธิภาพสูงสุด
                  </p>

                  {/* Explicit Video Confirm/Apply Button */}
                  <div className="pt-2 border-t border-slate-300/40 mt-3">
                    <button
                      type="button"
                      onClick={handleApplyVideoConfig}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-[11px] font-bold uppercase tracking-wider py-3 px-4 rounded-sm transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                    >
                      {videoApplyStatus === "pending" ? (
                        <span className="animate-pulse">กำลังสลับสายไฟสัญญาณวิดีโอ... ⚡</span>
                      ) : videoApplyStatus === "success" ? (
                        <span className="flex items-center gap-1.5 text-white font-sans">
                          <CheckCircle2 size={13} className="animate-bounce" /> ยืนยันใส่วิดีโอสำเร็จเรียบร้อย! 🎬
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 font-sans">
                          <CheckCircle2 size={13} /> ยืนยันเพื่อบันทึกและใส่วิดีโอใหม่นี้ 📝
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 border-t border-slate-200 pt-4">
                {confirmResetVideo ? (
                  <div className="flex items-center justify-between gap-1.5 border border-red-200 bg-red-50 p-1.5 rounded-sm">
                    <span className="text-[10px] text-red-600 font-bold px-1 font-sans">ยืนยันรีเซ็ตค่าหลักของบริษัท?</span>
                    <div className="flex gap-1.5">
                      <button
                        onClick={handleResetVideoToCorporate}
                        className="bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold px-2 py-1 rounded transition-all cursor-pointer font-sans"
                      >
                        ยืนยัน
                      </button>
                      <button
                        onClick={() => setConfirmResetVideo(false)}
                        className="bg-slate-200 hover:bg-slate-300 text-slate-600 text-[10px] font-bold px-2 py-1 rounded transition-all cursor-pointer font-sans"
                      >
                        ยกเลิก
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmResetVideo(true)}
                    className="w-full bg-white hover:bg-slate-100 text-slate-600 border border-slate-300 text-[10px] font-bold uppercase tracking-wider py-2.5 rounded-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer font-sans font-tech"
                  >
                    <RotateCcw size={12} /> ปรับวิดีโอกลับเป็นของบริษัทหลัก 🔄
                  </button>
                )}
                
                <button
                  onClick={() => setIsAdminMode(false)}
                  className="w-full bg-gold hover:bg-gold-hover text-navy-dark text-[10px] font-bold uppercase tracking-wider py-2.5 rounded-sm transition-all flex items-center justify-center gap-1.5 shadow-md border border-gold cursor-pointer font-sans font-tech"
                >
                  <CheckCircle2 size={12} /> ยืนยันปิดหน้าต่างแก้ไขทั้งหมด
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
