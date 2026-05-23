import React, { useState, useEffect, useRef } from "react";
import { 
  Video, 
  Play, 
  Pause,
  Edit3, 
  Sparkles, 
  Link, 
  UploadCloud, 
  CheckCircle2, 
  RotateCcw,
  Eye,
  Volume2,
  VolumeX,
  Tv
} from "lucide-react";
import { VideoItem } from "../types";
import { 
  saveVideoToIndexedDB, 
  getVideoFromIndexedDB, 
  removeVideoFromIndexedDB 
} from "../utils/db";

interface VideoSectionProps {
  isLoggedIn: boolean;
  isAdminMode: boolean;
  setIsAdminMode: (v: boolean) => void;
  videoPlaylists: VideoItem[];
  setVideoPlaylists: (v: VideoItem[]) => void;
  triggerSavedToast: () => void;
}

export default function VideoSection({
  isLoggedIn,
  isAdminMode,
  setIsAdminMode,
  videoPlaylists,
  setVideoPlaylists,
  triggerSavedToast,
}: VideoSectionProps) {
  const [activeVideoIdx, setActiveVideoIdx] = useState<number>(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [tempVideoObjectUrl, setTempVideoObjectUrl] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Observer State to show user that the portal is actively tracking their gaze
  const [isInViewport, setIsInViewport] = useState<boolean>(false);

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Detect and extract Google Drive file preview URL if applicable
  const getGoogleDriveEmbedUrl = (url: string): string | null => {
    if (!url) return null;
    const match = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
    return null;
  };

  const gDriveEmbedUrl = getGoogleDriveEmbedUrl(effectiveVideoUrl);

  // Intersection Observer Autoplay logic
  useEffect(() => {
    if (!videoRef.current || gDriveEmbedUrl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
        if (videoRef.current) {
          if (entry.isIntersecting) {
            // Under normal browser rules, autoplay with sound is blocked. Muting is required.
            videoRef.current.play()
              .then(() => {
                setIsVideoPlaying(true);
              })
              .catch((err) => {
                console.log("Auto-playing interrupted or blocked: ", err);
                setIsVideoPlaying(false);
              });
          } else {
            videoRef.current.pause();
            setIsVideoPlaying(false);
          }
        }
      },
      {
        threshold: 0.25, // Play when at least 25% of the frame is visible
        rootMargin: "0px 0px -50px 0px"
      }
    );

    observer.observe(videoRef.current);

    return () => {
      observer.disconnect();
    };
  }, [effectiveVideoUrl, gDriveEmbedUrl]);

  // Manual Toggle Play/Pause
  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (isVideoPlaying) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    } else {
      videoRef.current.play()
        .then(() => setIsVideoPlaying(true))
        .catch((err) => console.log(err));
    }
  };

  // Manual Toggle Sound Mute
  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMute = !isMuted;
    videoRef.current.muted = nextMute;
    setIsMuted(nextMute);
  };

  const handleApplyVideoConfig = () => {
    setVideoApplyStatus("pending");
    setTimeout(async () => {
      let targetVideoUrl = draftVideoUrl;
      const key = `video_file_${activeVideoIdx}`;

      if (draftVideoFileBlob) {
        await saveVideoToIndexedDB(key, draftVideoFileBlob);
        targetVideoUrl = `localdb://${key}`;
      } else if (!draftVideoUrl) {
        targetVideoUrl = activeVideo.videoUrl;
      } else {
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
      setIsVideoPlaying(true); 
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
    <div className="mt-8 mb-4 font-sans" id="cinematic" ref={containerRef}>
      {/* Decorative Branding Line */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px flex-1 bg-slate-200"></div>
        <span className="label-small font-sans text-gold tracking-widest flex items-center gap-2 text-xs font-bold uppercase">
          <Tv size={14} className="text-gold" /> CINEMATIC LIVE CONDUCTION
        </span>
        <div className="h-px flex-1 bg-slate-200"></div>
      </div>
      
      {/* Redesigned Minimal & Premium Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* BIG AUTOMATIC CINEMA screen */}
        <div 
          className="lg:col-span-8 bg-black relative overflow-hidden border border-slate-900 shadow-2xl rounded-sm group flex flex-col justify-between"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          id="autoplaying-player-card"
        >
          {/* Top Info HUD Bar overlay */}
          <div className="absolute top-0 inset-x-0 bg-gradient-to-b from-black/85 via-black/50 to-transparent p-6 z-20 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className={`w-2.5 h-2.5 rounded-full ${isVideoPlaying ? "bg-emerald-500 animate-ping" : "bg-gold"} flex-shrink-0`}></span>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-mono text-gold font-bold block">
                  {activeVideo.subtitle || "LIVE SITE FOOTAGE"}
                </span>
                <h3 className="text-sm font-bold text-white tracking-tight -mt-0.5 line-clamp-1 uppercase">
                  {activeVideo.title}
                </h3>
              </div>
            </div>

            {/* Live Autoplay status badge */}
            <div className="flex items-center gap-2">
              <span className="text-[9px] bg-navy-dark/95 text-slate-300 px-3 py-1.5 rounded-full border border-white/10 font-mono font-bold flex items-center gap-1.5 tracking-tight shadow-md">
                <Eye size={10} className="text-gold animate-pulse" />
                {isInViewport ? (
                  <span className="text-emerald-400">กำลังเล่นอัตโนมัติ (AUTOPLAYING)</span>
                ) : (
                  <span>รอคุณมองเพื่อเล่น (STANDBY)</span>
                )}
              </span>
            </div>
          </div>

          {/* Interactive Core Video Tag */}
          <div className="relative w-full h-full min-h-[340px] md:min-h-[480px] flex items-center justify-center bg-slate-950">
            {gDriveEmbedUrl ? (
              <iframe 
                src={gDriveEmbedUrl}
                className="absolute inset-0 w-full h-full z-10 border-0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Google Drive Video Player"
              />
            ) : (
              <video 
                ref={videoRef}
                src={effectiveVideoUrl} 
                className="absolute inset-0 w-full h-full object-cover z-10"
                loop
                muted={isMuted}
                playsInline
                onClick={handleTogglePlay}
                onError={() => {
                  console.error("Video failed to play automatically");
                }}
              />
            )}

            {/* Glowing Backdrop Canvas Ambient blur (behind the clean panel) */}
            {!gDriveEmbedUrl && (
              <video 
                src={effectiveVideoUrl} 
                muted 
                loop 
                className="absolute inset-0 w-full h-full object-cover opacity-15 blur-2xl scale-125 pointer-events-none" 
              />
            )}

            {/* Centered Controls Overlay appearing on hover or when paused */}
            <div 
              onClick={handleTogglePlay}
              className={`absolute inset-0 z-20 bg-black/35 cursor-pointer flex items-center justify-center transition-opacity duration-300 ${
                !isVideoPlaying || isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex flex-col items-center gap-3">
                <button
                  type="button"
                  className="w-16 h-16 rounded-full bg-gold hover:bg-white text-navy-dark flex items-center justify-center transition-all shadow-xl hover:scale-110 active:scale-95 cursor-pointer"
                >
                  {isVideoPlaying ? (
                    <Pause size={24} className="fill-current text-navy-dark ml-0" />
                  ) : (
                    <Play size={24} className="fill-current text-navy-dark ml-1" />
                  )}
                </button>
                <span className="text-[10px] text-white/90 bg-navy-dark/80 px-3 py-1 rounded font-sans tracking-wide border border-white/10 shadow">
                  {isVideoPlaying ? "กดเพื่อค้างวีดีโอไว้ (Pause Video)" : "กดเพื่อเล่นต่ออีกครั้ง (Play Video)"}
                </span>
              </div>
            </div>

            {/* Quick action controls at the bottom-right for manual toggling */}
            {!gDriveEmbedUrl && (
              <div className="absolute bottom-6 right-6 z-35 flex items-center gap-2">
                <button
                  onClick={handleToggleMute}
                  className="bg-navy-dark/95 hover:bg-gold hover:text-navy-dark text-slate-300 p-2.5 rounded-sm border border-white/10 shadow-lg transition-all flex items-center justify-center cursor-pointer"
                  title={isMuted ? "เปิดเสียง" : "ปิดเสียง"}
                >
                  {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} className="animate-bounce" />}
                </button>
              </div>
            )}
          </div>

          {/* Foot Info Label Panel */}
          <div className="bg-navy-dark p-6 z-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="text-xs text-slate-400 font-sans leading-relaxed max-w-lg">
              🎥 <strong className="text-slate-200">วีดีโอนี้จะหยุดทำงานโดยอัตโนมัติเมื่อเลื่อนผ่าน</strong> เพื่อลดการใช้งานอินเทอร์เน็ตของเครื่อง และจะกลับมาโหลดภาพเคลื่อนไหวสดทันทีเมื่อท่านเลื่อนหน้าจอกลับเข้ามาชม
            </p>
            {isLoggedIn && !isAdminMode && (
              <button
                type="button"
                onClick={() => setIsAdminMode(true)}
                className="bg-navy-light text-gold hover:bg-gold hover:text-navy-dark px-4 py-2 border border-gold/30 rounded-sm text-xs font-bold transition-all flex items-center gap-1.5 self-stretch md:self-auto justify-center cursor-pointer"
              >
                <Edit3 size={13} />
                จัดการไฟล์วิดีโอ ⚙️
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Selector Options Bar & Mini Showcase */}
        <div className={`lg:col-span-4 flex flex-col justify-between ${isAdminMode ? "border-2 border-dashed border-gold p-6 bg-slate-50" : "bg-slate-50 border border-slate-250 p-6"} rounded-sm`}>
          
          {/* Normal Mode List Selectors */}
          {!isAdminMode ? (
            <div className="h-full flex flex-col justify-between">
              <div className="space-y-6">
                <span className="text-[10px] font-mono select-none px-2.5 py-1 text-slate-500 bg-slate-200 uppercase font-black rounded-sm border border-slate-300 inline-block">
                  CINEMATIC STREAM ({videoPlaylists.length})
                </span>
                
                <div>
                  <h4 className="text-lg font-black text-navy-dark leading-snug tracking-tight font-sans uppercase">
                    โครงการและระบบปฏิบัติงานจริง
                  </h4>
                  <p className="text-xs text-slate-500 mt-2 font-sans font-light leading-relaxed">
                    วิดีโอถูกปรับระบบให้เล่นโดยอัตโนมัติแบบไร้เสียง (Muted Autoplay) ตามนโยบายความสะดวกของเบราว์เซอร์สากล ท่านสามารถคลิกเพื่อเลือกวิดีโอชิ้นอื่นๆ ที่ต้องการรับชมได้ทันทีด้านล่างนี้
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block font-sans">
                    เลือกรายการวิดีโอหลัก (คลิกเพื่อเปลี่ยน):
                  </span>
                  
                  <div className="flex flex-col gap-2">
                    {videoPlaylists.map((vItem, vIdx) => (
                      <button
                        key={vIdx}
                        onClick={() => {
                          setActiveVideoIdx(vIdx);
                          if (videoRef.current) {
                            videoRef.current.currentTime = 0;
                          }
                        }}
                        className={`w-full text-left p-3.5 border rounded-sm transition-all flex items-start gap-3 cursor-pointer ${
                          activeVideoIdx === vIdx
                            ? "bg-navy-dark border-navy-dark text-white shadow-md shadow-navy-dark/15"
                            : "bg-white border-slate-200 text-slate-600 hover:border-navy-dark hover:bg-slate-50"
                        }`}
                      >
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          activeVideoIdx === vIdx ? "bg-gold text-navy-dark" : "bg-slate-100 text-slate-500"
                        }`}>
                          {vIdx + 1}
                        </span>
                        <div className="flex-1">
                          <span className={`text-[9px] uppercase font-bold block ${activeVideoIdx === vIdx ? "text-gold" : "text-slate-400"}`}>
                            {vItem.subtitle}
                          </span>
                          <span className="text-xs font-bold block leading-snug mt-0.5 line-clamp-1">
                            {vItem.title}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {isLoggedIn && (
                <div className="border-t border-slate-200 pt-6 mt-6">
                  <button
                    onClick={() => setIsAdminMode(true)}
                    className="w-full bg-navy-dark hover:bg-gold text-white hover:text-navy-dark py-3.5 text-xs font-bold uppercase tracking-widest rounded-sm transition-all flex items-center justify-center gap-2 border border-navy-dark hover:border-gold cursor-pointer"
                  >
                    <Edit3 size={14} />
                    สลับโหมดดึงวิดีโอขึ้นใหม่ 🎥
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Admin Mode forms for editing and customizing videos */
            <div className="space-y-4 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <span className="text-xs font-bold text-gold font-sans bg-navy-dark px-3 py-1.5 border border-gold/30 rounded-sm flex items-center gap-1.5 w-fit">
                  <Sparkles size={12} /> ปรับวิดีโอระบบ Autoplay (สไลด์ #{activeVideoIdx + 1})
                </span>

                {/* Slots selectors inside the control column */}
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
                        setDraftVideoFileUrl(null); 
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
                    หรืออัปโหลดจากเครื่องของคุณ:
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer bg-navy-dark text-white hover:bg-gold hover:text-navy-dark font-sans text-[10px] font-black uppercase tracking-wider py-2 px-3 rounded-sm transition-all flex items-center justify-center gap-2 border border-navy-dark shadow">
                      <UploadCloud size={14} /> เลือกไฟล์วิดีโอ 📂
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
                            setDraftVideoUrl(""); 
                          }
                        }}
                      />
                    </label>
                    {draftVideoFileUrl && (
                      <span className="text-[8px] text-emerald-600 bg-emerald-50 border border-emerald-200 px-1 py-0.5 rounded font-sans">ยืนยันแล้ว</span>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-300/40 mt-3">
                    <button
                      type="button"
                      onClick={handleApplyVideoConfig}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-[10px] font-bold uppercase tracking-wider py-2.5 px-4 rounded-sm transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                    >
                      {videoApplyStatus === "pending" ? (
                        <span className="animate-pulse">กำลังบันทึกวิดีโอ... ⚡</span>
                      ) : videoApplyStatus === "success" ? (
                        <span className="flex items-center gap-1 text-white font-sans">
                          <CheckCircle2 size={12} className="animate-bounce" /> ดึงไฟล์วิดีโอลงระบบสำเร็จ! 🎬
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 font-sans">
                          <CheckCircle2 size={12} /> บันทึกและดึงไฟล์เข้ารถไฟแอป 📝
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Action columns inside drawer bar */}
              <div className="flex flex-col gap-2 border-t border-slate-200 pt-4">
                {confirmResetVideo ? (
                  <div className="flex items-center justify-between gap-1 border border-red-200 bg-red-50 p-1.5 rounded-sm">
                    <span className="text-[9px] text-red-600 font-bold font-sans">ถอดข้อมูลกู้คืนของบริษัท?</span>
                    <div className="flex gap-1.5">
                      <button
                        onClick={handleResetVideoToCorporate}
                        className="bg-red-600 hover:bg-red-700 text-white text-[9px] font-bold px-2 py-1 rounded transition-all cursor-pointer font-sans"
                      >
                        ถอดด่วน
                      </button>
                      <button
                        onClick={() => setConfirmResetVideo(false)}
                        className="bg-slate-200 hover:bg-slate-300 text-slate-600 text-[9px] font-bold px-2 py-1 rounded transition-all cursor-pointer font-sans"
                      >
                        เลิก
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmResetVideo(true)}
                    className="w-full bg-white hover:bg-slate-100 text-slate-600 border border-slate-300 text-[9px] font-bold uppercase tracking-wider py-2 rounded-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer font-sans"
                  >
                    <RotateCcw size={12} /> ถอนการจำลองเป็นโรงงานดั้งเดิม 🔄
                  </button>
                )}
                
                <button
                  onClick={() => setIsAdminMode(false)}
                  className="w-full bg-gold hover:bg-gold-hover text-navy-dark text-[10px] font-bold uppercase tracking-wider py-2 rounded-sm transition-all flex items-center justify-center gap-1.5 shadow-md border border-gold cursor-pointer font-sans"
                >
                  <CheckCircle2 size={12} /> ยืนยันเรียบร้อยและปิดหน้าตั้งค่า
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
