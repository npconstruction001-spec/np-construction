/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  Building2, 
  Zap, 
  Wrench, 
  Cpu, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight, 
  Menu, 
  X,
  FileText,
  HardHat,
  Truck,
  Users,
  Edit3,
  Plus,
  Trash2,
  Image,
  RotateCcw,
  Sparkles,
  Play,
  Video,
  Link,
  UploadCloud,
  Lock,
  Unlock,
  ShieldCheck,
  Calculator,
  Sliders,
  Clock,
  Coins,
  Hammer,
  Award,
  Settings
} from "lucide-react";
import React, { useState, useEffect } from "react";

import imgTescoLotus from "./assets/images/regenerated_image_1779243353442.jpg";
import imgCafeAmazon from "./assets/images/regenerated_image_1779243348101.jpg";
import imgAirAndElec from "./assets/images/regenerated_image_1779243350161.jpg";
import imgPowerPlant from "./assets/images/regenerated_image_1779243351642.jpg";
import imgBannerLeft from "./assets/images/banner_left_engineers_uniform_1779252458151.png";
import imgBannerRight from "./assets/images/banner_right_workers_uniform_1779252795939.png";
import imgAbout from "./assets/images/regenerated_image_1779251887070.jpg";

const NAV_LINKS = [
  { name: "หน้าแรก", href: "#home" },
  { name: "เกี่ยวกับเรา", href: "#about" },
  { name: "บริการของเรา", href: "#services" },
  { name: "ผลงานโครงการ", href: "#portfolio" },
  { name: "ติดต่อเรา", href: "#contact" },
];

const SERVICES = [
  {
    title: "งานวิศวกรรมโยธาและโครงสร้าง",
    description: "รับเหมาก่อสร้างอาคาร โรงงาน คลังสินค้า และงานโครงสร้างเหล็กคุณภาพสูง โดยทีมงานวิศวกรผู้เชี่ยวชาญ",
    icon: Building2,
    details: ["งานรากฐานและเสาเข็ม", "โครงสร้างคอนกรีตเสริมเหล็ก", "งานอาคารอุตสาหกรรม"]
  },
  {
    title: "งานระบบไฟฟ้าและสื่อสาร",
    description: "ออกแบบและติดตั้งระบบไฟฟ้ากำลัง ระบบสื่อสาร และระบบป้องกันอัคคีภัยที่ได้มาตรฐานสากล",
    icon: Zap,
    details: ["ตู้ MDB และ Sub-station", "ระบบไฟฟ้าโรงงาน", "ระบบ Data Center"]
  },
  {
    title: "งานระบบเครื่องกลและสุขาภิบาล",
    description: "วางระบบปรับอากาศ ระบบระบายอากาศ และระบบท่อส่งน้ำครบวงจรเพื่อประสิทธิภาพสูงสุด",
    icon: Wrench,
    details: ["HVAC System", "Fire Protection", "Sanitary & Plumbing"]
  },
  {
    title: "งานออกแบบและควบคุมงานวิศวกรรม",
    description: "บริการออกแบบทางวิศวกรรม (Engineering Design) และควบคุมการก่อสร้างให้เป็นไปตามแผนงาน",
    icon: Cpu,
    details: ["Consultancy", "Project Management", "Energy Audit"]
  }
];

const PORTFOLIO = [
  {
    title: "เทสโก้ โลตัส (สาขาลพบุรี)",
    category: "งานระบบ Interior",
    image: imgTescoLotus,
    fallback: imgTescoLotus
  },
  {
    title: "ร้านคาเฟ่อเมซอน สาขา หทัยราษฎร์ 46 (โครงการหทัยพฤกษ์ marketplace)",
    category: "งานรับเหมาสร้างร้านค้าเชิงพาณิชย์ (Commercial Store Construction)",
    image: imgCafeAmazon,
    fallback: imgCafeAmazon
  },
  {
    title: "ตึกอาคารสำนักงานประหยัดพลังงาน",
    category: "งานระบบปรับอากาศและไฟฟ้า",
    image: imgAirAndElec,
    fallback: imgAirAndElec
  },
  {
    title: "โครงการปรับปรุงระบบไฟฟ้าโรงไฟฟ้า",
    category: "งานระบบวิศวกรรมไฟฟ้า",
    image: imgPowerPlant,
    fallback: imgPowerPlant
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [portfolio, setPortfolio] = useState(() => {
    const saved = localStorage.getItem("np_portfolio_data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map((item: any, idx: number) => {
            // If user uploaded their custom image via admin mode, keep it.
            if (item.image && item.image.startsWith("data:")) {
              return item;
            }
            // Update to high fidelity generated assets
            if (idx === 0) return { ...item, image: imgTescoLotus, fallback: imgTescoLotus };
            if (idx === 1) return { ...item, image: imgCafeAmazon, fallback: imgCafeAmazon };
            if (idx === 2) {
              return { 
                ...item, 
                title: item.title || "ตึกอาคารสำนักงานประหยัดพลังงาน", 
                image: imgAirAndElec, 
                fallback: imgAirAndElec 
              };
            }
            if (idx === 3) return { ...item, image: imgPowerPlant, fallback: imgPowerPlant };
            return item;
          });
        }
      } catch (e) {
        // ignore
      }
    }
    return PORTFOLIO;
  });

  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // ตรวจสอบเครื่องพัฒนา/โฮสต์ภายนอกของนักพัฒนา เพื่อเปิดสิทธิ์ใช้งานระบบโดยตรงสำหรับเครื่องนี้ทันที
    const isDevOrLocal = typeof window !== "undefined" && (
      window.location.hostname.includes("-dev-") ||
      window.location.hostname.includes("localhost") ||
      window.location.hostname.includes("127.0.0.1")
    );
    if (isDevOrLocal) {
      return true;
    }
    return typeof window !== "undefined" && 
           localStorage.getItem("np_admin_is_logged_in") === "true" && 
           localStorage.getItem("np_admin_email") === "npconstruction001@gmail.com";
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState(false);

  // Cost estimation simulator states
  const [calcType, setCalcType] = useState<"factory" | "store" | "office" | "electrical">("factory");
  const [calcArea, setCalcArea] = useState<number>(450);
  const [calcQuality, setCalcQuality] = useState<"standard" | "premium">("standard");
  const [calcSmartSystems, setCalcSmartSystems] = useState<boolean>(true);
  const [calcIsUpdating, setCalcIsUpdating] = useState<boolean>(false);

  // Interactive Live Construction Portal State
  const [selectedPortalProj, setSelectedPortalProj] = useState<"lotus" | "amazon" | "office">("lotus");
  const [portalPasscode, setPortalPasscode] = useState<string>("");
  const [isPortalUnlocked, setIsPortalUnlocked] = useState<boolean>(false);
  const [portalError, setPortalError] = useState<string | null>(null);
  const [isPortalLoading, setIsPortalLoading] = useState<boolean>(false);

  // Interactive Project Stages Timeline state
  const [activeStageStep, setActiveStageStep] = useState<number>(0);

  const [confirmDeleteIdx, setConfirmDeleteIdx] = useState<number | null>(null);
  const [confirmResetPortfolio, setConfirmResetPortfolio] = useState(false);
  const [confirmResetVideo, setConfirmResetVideo] = useState(false);

  const [videoPlaylists, setVideoPlaylists] = useState<{ title: string; subtitle: string; videoUrl: string }[]>(() => {
    const saved = localStorage.getItem("np_video_playlist_v3");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    // Check if old single "np_video_data" exists to migrate beautifully
    const legacySaved = localStorage.getItem("np_video_data");
    if (legacySaved) {
      try {
        const legacy = JSON.parse(legacySaved);
        if (legacy && legacy.title) {
          return [
            legacy,
            {
              title: "งานติดตั้งและเดินระบบไฟฟ้าตู้ควบคุม MDB",
              subtitle: "MDB Substation Showcase Video",
              videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-welder-working-on-a-pipeline-42614-large.mp4"
            }
          ];
        }
      } catch (e) {
        // ignore
      }
    }
    return [
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
  });

  const [activeVideoIdx, setActiveVideoIdx] = useState<number>(0);
  const videoData = videoPlaylists[activeVideoIdx] || videoPlaylists[0] || {
    title: "THE ENGINEERING JOURNEY",
    subtitle: "Corporate Video",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-construction-worker-at-a-site-working-with-concrete-41584-large.mp4"
  };

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [tempVideoObjectUrl, setTempVideoObjectUrl] = useState<string | null>(null);

  // Video Draft State for editing (so user must click "Confirm" to apply)
  const [draftVideoTitle, setDraftVideoTitle] = useState(() => videoData.title);
  const [draftVideoSubtitle, setDraftVideoSubtitle] = useState(() => videoData.subtitle);
  const [draftVideoUrl, setDraftVideoUrl] = useState(() => videoData.videoUrl);
  const [draftVideoFileUrl, setDraftVideoFileUrl] = useState<string | null>(null);
  const [videoApplyStatus, setVideoApplyStatus] = useState<"idle" | "pending" | "success">("idle");
  const [videoListError, setVideoListError] = useState<string | null>(null);

  useEffect(() => {
    setDraftVideoTitle(videoData.title);
    setDraftVideoSubtitle(videoData.subtitle);
    setDraftVideoUrl(videoData.videoUrl);
    setTempVideoObjectUrl(null);
    setDraftVideoFileUrl(null);
    setVideoListError(null);
  }, [activeVideoIdx]);

  useEffect(() => {
    localStorage.setItem("np_video_playlist_v3", JSON.stringify(videoPlaylists));
  }, [videoPlaylists]);

  useEffect(() => {
    localStorage.setItem("np_portfolio_data", JSON.stringify(portfolio));
  }, [portfolio]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleAdminMode = () => {
    if (isAdminMode) {
      setIsAdminMode(false);
    } else {
      if (isLoggedIn) {
        setIsAdminMode(true);
        const target = document.getElementById("portfolio");
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        setShowAuthModal(true);
        setAuthEmail("npconstruction001@gmail.com");
        setAuthPassword("");
        setAuthError(null);
        setAuthSuccess(false);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("np_admin_is_logged_in");
    localStorage.removeItem("np_admin_email");
    setIsLoggedIn(false);
    setIsAdminMode(false);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (!authEmail || !authPassword) {
      setAuthError("กรุณากรอกข้อมูลให้ครบถ้วนเพื่อดำเนินการวิเคราะห์สิทธิ์ค่ะ");
      return;
    }
    if (authEmail.trim().toLowerCase() !== "npconstruction001@gmail.com") {
      setAuthError("ขออภัยค่ะ บัญชีอีเมลนี้ไม่ได้รับสิทธิ์ควบคุมดูแลระบบ (สงวนสิทธิ์ให้คุณแอดมิน npconstruction001@gmail.com เท่านั้น)");
      return;
    }
    if (authPassword !== "np2026") {
      setAuthError("รหัสผ่านความปลอดภัยไม่ถูกต้องเฉพาะ หจก. เอ็นพี คอนดักชั่น เท่านั้น (รหัสผ่านเริ่มต้นสำหรับสิทธิ์อีเมลนี้คือ np2026)");
      return;
    }

    setAuthSuccess(true);
    setTimeout(() => {
      localStorage.setItem("np_admin_is_logged_in", "true");
      localStorage.setItem("np_admin_email", "npconstruction001@gmail.com");
      setIsLoggedIn(true);
      setIsAdminMode(true);
      setShowAuthModal(false);
      setAuthSuccess(false);

      const target = document.getElementById("portfolio");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen text-slate-800 bg-white">
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-navy-dark shadow-2xl py-2" : "bg-navy-dark/95 py-4"
        } border-b border-gold/20`}
      >
        <div className="max-w-7xl mx-auto px-10 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter text-gold leading-none font-tech">
              NP CONDUCTION
            </span>
            <span className="mono-label mt-1">
              Limited Partnership
            </span>
          </div>

          <nav className="hidden md:flex gap-10 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="hover:text-gold transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="px-3 py-2 text-[9px] font-black uppercase tracking-widest text-red-400 bg-red-950/20 border border-red-900/40 rounded-sm hover:bg-red-600 hover:text-white transition-all font-mono cursor-pointer"
                title="ออกจากระบบผู้ดูแลระบบเพื่อความปลอดภัย"
              >
                ออกจากระบบ (Logout)
              </button>
            )}
            <button
              onClick={handleToggleAdminMode}
              className={`px-4.5 py-2.5 text-xs font-bold uppercase tracking-widest rounded-sm transition-all flex items-center gap-2 border cursor-pointer ${
                isAdminMode 
                  ? "bg-gold text-navy-dark border-gold shadow-lg" 
                  : "bg-navy-dark/40 text-slate-300 border-white/20 hover:bg-gold hover:text-navy-dark hover:border-gold"
              }`}
            >
              {isLoggedIn ? <ShieldCheck size={13} className="text-emerald-400" /> : <Lock size={13} />}
              {isAdminMode ? "ปิดโหมดแก้ไข" : "ปุ่มเปิดโหมดแก้ไขรูป/วิดีโอ 📷"}
            </button>
            <a 
              href="#contact" 
              className="bg-gold text-navy-dark px-6 py-2.5 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-gold-hover transition-all shadow-lg font-mono"
            >
              Request Quote
            </a>
          </div>

          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-navy-dark md:hidden pt-24 px-6"
          >
            <div className="flex flex-col space-y-6 text-xl">
              {NAV_LINKS.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-slate-300 border-b border-white/10 pb-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact" 
                className="bg-gold text-navy-dark py-4 rounded-sm font-bold text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                ขอใบเสนอราคา
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative h-screen grid grid-cols-12 overflow-hidden bg-navy-dark">
          <div className="col-span-12 lg:col-span-7 relative flex flex-col justify-center p-6 md:p-20 order-2 lg:order-1">
            <div className="absolute inset-0 z-0">
              {/* คุณสามารถเปลี่ยนรูปพื้นหลังได้ที่นี่ โดยใส่รูปในโฟลเดอร์ /public/images/ แล้วเปลี่ยน src เป็น "/images/your-photo.jpg" */}
              <img 
                src={imgBannerLeft} 
                alt="Construction background" 
                className="w-full h-full object-cover opacity-60"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy-dark/40 to-transparent"></div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 space-y-8"
            >
              <div className="gold-line"></div>
              <h1 className="text-6xl md:text-8xl text-white leading-[0.85] tracking-tighter font-display font-black">
                PRECISION<br />
                ENGINEERING<br />
                <span className="text-gold font-tech">EXCELLENCE.</span>
              </h1>
              <p className="text-xl text-slate-300 font-light leading-relaxed max-w-md">
                ผู้นำด้านงานวิศวกรรมและรับเหมาก่อสร้างครบวงจร ด้วยมาตรฐานระดับสากลและทีมงานมืออาชีพ
              </p>
              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <a href="#services" className="bg-gold text-navy-dark px-10 py-5 text-[10px] font-mono font-black uppercase tracking-[0.2em] hover:bg-gold-hover transition-all shadow-2xl">
                  Explore Services
                </a>
                <a href="#portfolio" className="border border-white/20 text-white px-10 py-5 text-[10px] font-mono font-black uppercase tracking-[0.2em] hover:bg-white/5 transition-all">
                  View Projects
                </a>
              </div>
            </motion.div>
          </div>

          <div className="col-span-12 lg:col-span-5 relative hidden lg:block order-1 lg:order-2">
            <img 
              src={imgBannerRight} 
              alt="Engineering detail" 
              className="w-full h-full object-cover brightness-75 contrast-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-x-0 bottom-0 p-12">
               <div className="mono-label text-white/40 mb-2">Spec No.</div>
               <div className="text-gold font-mono text-xl">NP-C/2024-ENG</div>
            </div>
            <div className="absolute inset-0 border-l border-white/10"></div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative z-10 overflow-hidden shadow-[30px_30px_0px_0px_rgba(15,23,42,1)] border border-navy-dark">
                  <img 
                    src={imgAbout} 
                    alt="Workplace" 
                    className="w-full h-auto hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -top-12 -left-12 z-20 bg-gold text-navy-dark p-10 shadow-2xl">
                  <span className="block text-5xl font-black tracking-tighter font-display">15+</span>
                  <span className="mono-label text-navy-dark/70">Expert Years</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <span className="label-small uppercase">About Us</span>
                  <h2 className="text-4xl md:text-5xl tracking-tighter uppercase leading-[0.9] font-tech">
                    Professional <br /><span className="text-gold">Solutions</span>
                  </h2>
                </div>
                <p className="text-lg text-slate-500 font-light leading-relaxed">
                  หจก. เอ็นพี คอนดักชั่น เริ่มต้นจากความหลงใหลในงานวิศวกรรมที่มีความซับซ้อน 
                  เรามุ่งเน้นการส่งมอบงานระบบไฟฟ้าและเครื่องกลที่มีความเสถียรสูงสุด
                </p>
                <div className="grid grid-cols-1 gap-6">
                  {[
                    "มาตรฐานความปลอดภัยระดับสากล",
                    "วิศวกรวิชาชีพควบคุมทุกขั้นตอน",
                    "เทคโนโลยีการวัดคุมที่ทันสมัย"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 pb-4 border-b border-slate-100 group">
                      <div className="w-8 h-8 bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:border-gold transition-colors">
                        <div className="w-1.5 h-1.5 bg-gold"></div>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-navy-dark font-tech">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-32 bg-paper border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="editorial-grid gap-12 mb-20">
              <div className="col-span-12 lg:col-span-6 space-y-4">
                <span className="label-small text-gold">What We Do</span>
                <h2 className="text-4xl md:text-6xl tracking-tighter uppercase leading-[0.9]">
                  Comprehensive <br /><span className="text-gold">Capabilities</span>
                </h2>
              </div>
              <div className="col-span-12 lg:col-span-6 flex items-end">
                <p className="text-slate-500 font-light text-lg">
                  เรานำเสนอบริการทางวิศวกรรมที่ครอบคลุม ตั้งแต่การออกแบบเบื้องต้นไปจนถึงการติดตั้งและบำรุงรักษาเชิงป้องกัน 
                  เพื่อให้โครงการของคุณดำเนินงานได้อย่างไร้รอยต่อ
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-slate-200">
              {SERVICES.map((service, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-12 border-r border-b border-slate-200 hover:bg-navy-dark group transition-all duration-500"
                >
                  <div className="w-12 h-12 bg-paper flex items-center justify-center border border-slate-100 group-hover:border-gold/30 mb-10 transition-colors">
                    <div className="w-2 h-2 bg-gold"></div>
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-6 text-navy-dark group-hover:text-gold transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-500 group-hover:text-slate-400 mb-8 leading-relaxed font-medium">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.details.map((detail, dIdx) => (
                      <li key={dIdx} className="text-[10px] uppercase font-bold tracking-widest text-slate-400 group-hover:text-slate-500 flex items-center gap-2">
                        <ChevronRight size={10} className="text-gold" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-32 bg-navy-dark text-white border-b border-gold/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 text-center">
              {[
                { count: "50+", label: "Professional Staff", icon: Users },
                { count: "100%", label: "Quality Checks", icon: CheckCircle2 },
                { count: "15+", label: "Service Years", icon: HardHat },
                { count: "24/7", label: "Support Ready", icon: Truck }
              ].map((stat, idx) => (
                <div key={idx} className="space-y-2">
                  <span className="block text-5xl font-black text-gold tracking-tighter font-display">{stat.count}</span>
                  <span className="label-small opacity-60">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Construction Estimator Section */}
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

              {/* Right Column Interactive Dynamic Live Displays */}
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
                            {(() => {
                              const base = calcType === "factory" ? 13500 : calcType === "store" ? 18500 : calcType === "office" ? 15500 : 22000;
                              const qualityMult = calcQuality === "premium" ? 1.3 : 1.0;
                              const extra = calcSmartSystems ? (calcArea * 350) + 120000 : 0;
                              const total = Math.round((calcArea * base * qualityMult) + extra);
                              const minVal = Math.round(total * 0.9);
                              const maxVal = Math.round(total * 1.15);
                              return `${minVal.toLocaleString()} - ${maxVal.toLocaleString()}`;
                            })()}
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
                        <span>{calcType === "electrical" ? "ตรวจสอบและวางตู้เดินไฟหลัก MDB ไซต์งาน" : "งานก่อสร้างโครงสร้าง และเซ็ตระบบสุขาภิบาลวิศวกรรมคู่ขนาน"}</span>
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
                    onClick={() => {
                      const msgInput = document.querySelector("textarea") as HTMLTextAreaElement;
                      if (msgInput) {
                        const base = calcType === "factory" ? 13500 : calcType === "store" ? 18500 : calcType === "office" ? 15500 : 22000;
                        const qualityMult = calcQuality === "premium" ? 1.3 : 1.0;
                        const extra = calcSmartSystems ? (calcArea * 350) + 120000 : 0;
                        const total = Math.round((calcArea * base * qualityMult) + extra);
                        const minVal = Math.round(total * 0.9);
                        const maxVal = Math.round(total * 1.15);
                        
                        msgInput.value = `สนใจร่วมงาน / ประเมินราคาจริงสำหรับโครงการ:\n- โครงการ: ${calcType === "factory" ? "โรงงาน / คลังสินค้า" : calcType === "store" ? "ร้านค้าเชิงพาณิชย์" : calcType === "office" ? "อาคารสำนักงานอเนกประสงค์" : "ระบบไฟฟ้า&เครื่องกลวิศวกรรม"}\n- ขนาดพื้นที่เป้าหมาย: ${calcArea} ตารางเมตร\n- วัสดุก่อสร้างเกรด: ${calcQuality === "premium" ? "เกรดพรีเมียม" : "เกรดโครงสร้างมาตรฐาน"}\n- ระบบควบคุมอัจฉริยะ: ${calcSmartSystems ? "ต้องการติดตั้ง" : "ไม่ต้องการ"}\n- ประเมินราคาจำลองเบื้องต้น: ${minVal.toLocaleString()} - ${maxVal.toLocaleString()} บาท`;
                      }
                      const contactSec = document.getElementById("contact");
                      if (contactSec) {
                        contactSec.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
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

        {/* Interactive Milestone Workflow Steps & Quality Assurance Accordion */}
        <section className="py-24 bg-white border-b border-slate-100 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <span className="label-small text-gold uppercase tracking-widest font-mono font-bold flex items-center justify-center gap-2">
                <Hammer size={14} className="text-gold" /> NP ENGINEERING WORKFLOW
              </span>
              <h2 className="text-3xl md:text-5xl tracking-tighter uppercase font-tech text-navy-dark">
                ขั้นตอนและมาตรฐาน <span className="text-gold">ควบคุมคุณภาพวิศวกรรม</span>
              </h2>
              <p className="text-slate-500 font-light text-sm">
                คลิกเลือกขั้นตอนต่าง ๆ บนเส้นเวลาดั่งผู้เชี่ยวชาญ เพื่อเปิดดูเทคนิคดำเนินงาน ระเบียบความปลอดภัย และจุดตรวจสอบ QA ที่ หจก. เอ็นพี คอนดักชั่น บังคับใช้อย่างเข้มงวด
              </p>
            </div>

            {/* Interactive Timeline Step buttons */}
            <div className="relative mb-12">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 hidden md:block z-0"></div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative z-10">
                {[
                  { step: "01", name: "วิเคราะห์ & สรรหา", icon: "🔍", desc: "CAD/BIM Level Planning" },
                  { step: "02", name: "งานดิน & ฐานราก", icon: "🏗️", desc: "Rigid Soil Footing" },
                  { step: "03", name: "งานโครงสร้างเสาคาน", icon: "🧱", desc: "Heavy Steel Framing" },
                  { step: "04", name: "งานระบายน้ำ & ระบบไฟ", icon: "⚡", desc: "Utility Station MDB" },
                  { step: "05", name: "ตรวจสอบปิดงาน QA", icon: "🏆", desc: "Expert Engineering Signoff" }
                ].map((stage, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveStageStep(idx)}
                    className={`p-5 text-left border rounded-sm transition-all flex flex-col justify-between h-36 cursor-pointer relative ${
                      activeStageStep === idx
                        ? "bg-navy-dark text-white border-gold shadow-lg ring-2 ring-gold/20"
                        : "bg-slate-50 border-slate-200 text-navy-dark hover:border-gold hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="font-mono text-xs font-black text-gold tracking-widest">
                        PHASE {stage.step}
                      </span>
                      <span className="text-xl">{stage.icon}</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-tight line-clamp-1">
                        {stage.name}
                      </h4>
                      <p className={`text-[9px] font-mono mt-0.5 ${activeStageStep === idx ? "text-slate-300" : "text-slate-400"}`}>
                        {stage.desc}
                      </p>
                    </div>

                    {/* Progress indicators */}
                    {activeStageStep === idx && (
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gold rotate-45 border border-gold"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Stage description detail block */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStageStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="bg-slate-50 border border-slate-200 p-8 rounded-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Left side text details */}
                <div className="lg:col-span-7 space-y-6">
                  {activeStageStep === 0 && (
                    <>
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono bg-navy-dark text-gold px-3 py-1 rounded-sm uppercase tracking-widest font-bold w-fit inline-block">
                          Step 1 Detail: การวางแผนระดับสากล
                        </span>
                        <h3 className="text-lg md:text-xl font-bold text-navy-dark">ออกแบบโครงสร้างสถาปัตยกรรมด้วยระบบ BIM และ CAD 3 มิติ</h3>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-light">
                        ทีมงานวิศวกรของ เอ็นพี คอนดักชั่น เริ่มต้นวิเคราะห์เค้าโครงที่ดิน สภาพใต้ชั้นดิน และทำแบบจำลอง 3 มิติเชิงประจักษ์ (BIM) เพื่อลดความผิดพลาดในการติดตั้งระบบปรับอากาศ ไฟฟ้าสุขาภิบาลล่วงหน้า ปิดช่องโหว่งบประมาณบานปลาย 100%
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="border border-slate-200/60 bg-white p-3.5 space-y-1 rounded-sm">
                          <span className="text-[9px] font-bold text-navy-dark uppercase tracking-wider block">ซอฟต์แวร์สนับสนุน</span>
                          <span className="text-xs font-mono text-slate-500 font-bold">AutoCAD, Revit, SolidWorks</span>
                        </div>
                        <div className="border border-slate-200/60 bg-white p-3.5 space-y-1 rounded-sm">
                          <span className="text-[9px] font-bold text-navy-dark uppercase tracking-wider block">การวิเคราะห์วิศวกรรม</span>
                          <span className="text-xs font-mono text-slate-500 font-bold">ตรวจสอบเสถียรภาพแรงสถิตยศาสตร์</span>
                        </div>
                      </div>
                    </>
                  )}

                  {activeStageStep === 1 && (
                    <>
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono bg-navy-dark text-gold px-3 py-1 rounded-sm uppercase tracking-widest font-bold w-fit inline-block">
                          Step 2 Detail: งานรากฐานอันทรหด
                        </span>
                        <h3 className="text-lg md:text-xl font-bold text-navy-dark">ตอกเสาเข็มลึกสู้ชั้นดินแกร่ง และวิเคราะห์งานหล่อฐานคานคอดิน</h3>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-light">
                        งานรากฐานเปรียบเสมือนหัวใจของ หจก. เอ็นพี คอนดักชั่น เราคัดเลือกเสาเข็มมาตรฐานมอก. ป้อนการเจาะด้วยรถตอกแรงอัดสูง พร้อมทดสอบกำลังรับน้ำหนักเสาเข็มสะสม (Pile Load Test) เพื่อรองรับแรงดันสะสมสูงสุดในกลุ่มโรงงานคลังสินค้าหลักสิบตันต่อขอบเขตแผงแกรนิต
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="border border-slate-200/60 bg-white p-3.5 space-y-1 rounded-sm">
                          <span className="text-[9px] font-bold text-navy-dark uppercase tracking-wider block">คุณภาพวัสดุเหล็ก&คอนกรีต</span>
                          <span className="text-xs font-mono text-slate-500 font-bold">คอนกรีตมาตรฐาน 240-400 ksc cylinder</span>
                        </div>
                        <div className="border border-slate-200/60 bg-white p-3.5 space-y-1 rounded-sm">
                          <span className="text-[9px] font-bold text-navy-dark uppercase tracking-wider block">การตรวจสอบหน้างาน</span>
                          <span className="text-xs font-mono text-slate-500 font-bold">ประเมินแรงทรุดตัว (Static Load Test Verified)</span>
                        </div>
                      </div>
                    </>
                  )}

                  {activeStageStep === 2 && (
                    <>
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono bg-navy-dark text-gold px-3 py-1 rounded-sm uppercase tracking-widest font-bold w-fit inline-block">
                          Step 3 Detail: ความแข็งแกร่งเชิงโครงสร้าง
                        </span>
                        <h3 className="text-lg md:text-xl font-bold text-navy-dark">ขึ้นโครงเสาเหล็กถัก แผงเมทัลชีท และผนังคอนกรีตแกร่งล้อมรอบ</h3>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-light">
                        โครงสร้างหลักพาดช่วงกว้างด้วยคานทรัส (Steel Truss) และระบบผนังแข็งแกรงป้องกันไฟช็อตและอัคคีภัย การเชื่อมต่อชิ้นส่วนโครงสร้างเหล็กใช้หัวตอกเชื่อมมาตรฐานอุตสาหกรรมชุบกันสนิมพิเศษ (Hot-Dip Galvanized) เพื่อยืดอายุงานไม่ต่ำกว่า 40 ปี
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="border border-slate-200/60 bg-white p-3.5 space-y-1 rounded-sm">
                          <span className="text-[9px] font-bold text-navy-dark uppercase tracking-wider block">มาตรการรักษาความปลอดภัย</span>
                          <span className="text-xs font-mono text-slate-500 font-bold">ระบบนั่งร้านหนา 3 สตรีม พร้อมสายรัดเซฟตี้</span>
                        </div>
                        <div className="border border-slate-200/60 bg-white p-3.5 space-y-1 rounded-sm">
                          <span className="text-[9px] font-bold text-navy-dark uppercase tracking-wider block">การตรวจสอบทางช่าง</span>
                          <span className="text-xs font-mono text-slate-500 font-bold">X-Ray รอยเชื่อมต่อ (Non-Destructive Testing)</span>
                        </div>
                      </div>
                    </>
                  )}

                  {activeStageStep === 3 && (
                    <>
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono bg-navy-dark text-gold px-3 py-1 rounded-sm uppercase tracking-widest font-bold w-fit inline-block">
                          Step 4 Detail: ชีพจรหลักของระบบอาคาร
                        </span>
                        <h3 className="text-lg md:text-xl font-bold text-navy-dark">เดินสถานีจ่ายไฟ ตู้ MDB เดินท่อระบายสุขาภิบาล & ท่อบำบัด</h3>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-light">
                        เราคือผู้จัดเตรียมและฝังเดินท่อทองแดงคุณภาพนำเข้า ระบบปรับอากาศขนาดใหญ่ (MDB System) ควบคุมความปลอดภัยผ่านการปรับระดับวงจรกระแสสลับ มีระบบสลับสับไฟอัจฉริยะหากสภาวะพายุกระทบ หรือสลับแหล่งพลังงาน Solar Rooftop เพื่อลดต้นทุนไฟฟ้า
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="border border-slate-200/60 bg-white p-3.5 space-y-1 rounded-sm">
                          <span className="text-[9px] font-bold text-navy-dark uppercase tracking-wider block">มาตรฐานระบบไฟฟ้า</span>
                          <span className="text-xs font-mono text-slate-500 font-bold">สอดรับมาตรฐาน วสท. & กฟภ. / MEA</span>
                        </div>
                        <div className="border border-slate-200/60 bg-white p-3.5 space-y-1 rounded-sm">
                          <span className="text-[9px] font-bold text-navy-dark uppercase tracking-wider block">อุปกรณ์จำเพาะ</span>
                          <span className="text-xs font-mono text-slate-500 font-bold">ตู้คอนโทรล IP54 กันฝุ่นน้ำสถิติสูง</span>
                        </div>
                      </div>
                    </>
                  )}

                  {activeStageStep === 4 && (
                    <>
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono bg-navy-dark text-gold px-3 py-1 rounded-sm uppercase tracking-widest font-bold w-fit inline-block">
                          Step 5 Detail: ความยอดเยี่ยมอย่างแท้จริง
                        </span>
                        <h3 className="text-lg md:text-xl font-bold text-navy-dark">ส่งมอบใบประกันคุณภาพวิศวกรวิชาชีพ ตรวจสอบอาคารครบมิติ</h3>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-light">
                        ทุกตารางเซนติเมตรของโครงการรับเหมาภายใต้ หจก. เอ็นพี คอนดักชั่น จะได้รับการลงนามกำกับตรวจสอบโดยสามัญวิศวกรผู้ถือใบอนุญาตควบคุมอาคารระดับสูง รับระเบียบใบอนุญาตเปิดใช้อาคาร (อ.6) ส่งมอบคู่มือบำรุงรักษาและการดูแลหลังรับประกันสุดประทับใจ
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="border border-slate-200/60 bg-white p-3.5 space-y-1 rounded-sm">
                          <span className="text-[9px] font-bold text-navy-dark uppercase tracking-wider block">การลงนามรับรองวิชาชีพ</span>
                          <span className="text-xs font-mono text-slate-500 font-bold">ใบอนุญาตประกอบวิชาชีพวิศวกรรมควบคุม (กว.)</span>
                        </div>
                        <div className="border border-slate-200/60 bg-white p-3.5 space-y-1 rounded-sm">
                          <span className="text-[9px] font-bold text-navy-dark uppercase tracking-wider block">ผลรับประกันรวมโครงสร้าง</span>
                          <span className="text-xs font-mono text-slate-500 font-bold">รับประกันโครงสร้างอาคารต่อเนื่องสูงสุด 5 ปี</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Right side interactive graphic simulation */}
                <div className="lg:col-span-5 bg-navy-dark text-white p-6 border-l-4 border-gold rounded space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-white/10">
                    <span className="text-[9px] text-slate-400 font-mono font-bold tracking-widest uppercase">NP LAB METRICS</span>
                    <span className="text-[9px] text-gold font-mono font-bold bg-gold/10 px-2 py-0.5 rounded-sm">Standard</span>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-300 font-mono">
                        <span>ค่าความปลอดภัยหน้างาน (Safety Compliant)</span>
                        <span className="text-gold font-bold">100% (ISO Clean)</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gold rounded-full w-full"></div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-300 font-mono">
                        <span>กำลังแรงอัดโครงคอนกรีตเฉลี่ย</span>
                        <span className="text-emerald-400 font-bold">+{activeStageStep >= 1 ? "400 ksc" : "280 ksc"}</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className={`h-full bg-emerald-400 rounded-full ${activeStageStep >= 1 ? "w-full" : "w-[75%]"}`}></div>
                      </div>
                    </div>

                    <div className="bg-white/5 p-3 rounded-sm space-y-1 border border-white/10">
                      <span className="text-[9px] font-bold text-gold font-mono uppercase tracking-wider block">ผลวิเคราะห์ประสิทธิภาพในระยะยาว</span>
                      <p className="text-[10px] text-slate-300 font-sans tracking-normal leading-normal">
                        {activeStageStep === 0 && "BIM ช่วยกำจัดต้นทุนแอบแฝงและป้องกันปัญหาระบบหลอดสายไฟทับซ้อนหน้างานล่วงหน้า"}
                        {activeStageStep === 1 && "เสาคานตอกทะลุทะลวงชั้นลึก มอบแรงยึดเกาะโครงโรงงานมั่นคงถาวรไร้สภาวะจมดินสไลด์ตัว"}
                        {activeStageStep === 2 && "คานเชื่อมโครงเหล็กลดอัตราการสึกกร่อนต้านพายุฝนเขตร้อน ทนความตึงผิววัสดุสูงสุด"}
                        {activeStageStep === 3 && "ห้องตู้ควบคุมไฟบำรุงระบบระบายความร้อนสูง ป้องกันเหตุฉุกเฉินไฟลัดวงจร 100%"}
                        {activeStageStep === 4 && "ลงนามปิดโครงสร้างและบันทึกข้อมูลเพื่อใช้ในการรักษารายไตรมาสกับเจ้าของบ้าน"}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Brand-New Interactive Customer Live Portal Showcase */}
        <section className="py-24 bg-navy-dark text-white border-b border-white/5 relative overflow-hidden">
          {/* Accent lighting curves */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left description text */}
              <div className="lg:col-span-4 space-y-6">
                <span className="text-[10px] uppercase font-mono tracking-widest text-gold font-bold bg-gold/10 px-3 py-1 border border-gold/20 rounded-sm w-fit flex items-center gap-1.5 animate-bounce">
                  <ShieldCheck size={12} /> Live Client Portal Demo
                </span>
                <h2 className="text-3xl md:text-5xl font-display font-black leading-none tracking-tighter uppercase font-tech">
                  ระบบติดตามงาน <br />
                  <span className="text-gold">NP PORTAL CONNECT WORKSPACE</span>
                </h2>
                <div className="gold-line"></div>
                
                {/* Strategic Advice Banner explaining what it is and why it's a huge selling point package */}
                <div className="bg-emerald-950/40 border border-emerald-500/40 p-4 rounded-sm space-y-2.5">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Sparkles size={16} />
                    <span className="text-xs font-black uppercase tracking-wider font-mono">ระบบนี่แหละคือจุดขายที่จะกระตุ้นจ้าง!</span>
                  </div>
                  <p className="text-[11px] text-slate-200 leading-relaxed font-sans">
                    <strong>ระบบติดตามงานคืออะไร? จำเป็นต้องใส่ไหม?:</strong> <br className="mb-1" />
                    จำเป็นอย่างมากสำหรับการตัดสินใจจ้างค่ะ! เพราะระบบนี้คือ <strong>"เครื่องมือสร้างความเชื่อมั่นขั้นสูงสุด"</strong> ที่ หจก. เอ็นพี คอนดักชั่น ออกแบบขึ้นมา เพื่อจำลองการแสดงความคืบหน้างานจริงให้ผู้ว่าจ้างได้ดู
                  </p>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                    <strong>ช่วยให้คนตัดสินใจง่ายขึ้นยังไง?:</strong> <br />
                    ผู้ว่าจ้างส่วนใหญ่กลัวที่สุดคือ <em>"ผู้รับเหมาทิ้งงาน หรือสับเปลี่ยนวัสดุ"</em> เมื่อคู่แข่งของท่านไม่มีระบบนี้ แต่ <strong>หจก. เอ็นพี คอนดักชั่น มีระบบรายงานส่งรูปคุมเข้มและรายการวิศวกรรมแบบส่วนตัวออนไลน์</strong> จะทำให้คนที่เข้ามาตัดสินใจจ้างได้ทันทีเพราะรู้สึกโปร่งใส ปลอดภัย และสัมผัสได้ถึงความเจ๋งขั้นสูงแบบมืออาชีพค่ะ!
                  </p>
                </div>

                <p className="text-slate-300 font-light text-[11px] leading-relaxed">
                  ด้านขวาคือแบบจำลองแผงควบคุมระบบพอร์ทัลที่ลูกค้าได้รับเชิญส่วนตัวหลังลงนามสัญญา เพื่อเข้าส่องดูอัตราการเสร็จสมบูรณ์ ผลตรวจสอบกระบวนการช่าง และใบรายงานผลงานได้สะดวดทันท่วงที
                </p>
                <div className="bg-white/5 p-4 border border-white/10 rounded-sm space-y-3">
                  <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block">รหัสประจำโครงการเพื่อกดร่วมทดสอบ (คลิกเพื่อเข้าส่องระบบได้เลยค่ะ):</span>
                  <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                    <button
                      onClick={() => {
                        setSelectedPortalProj("lotus");
                        setPortalPasscode("LOTUS-99");
                        setPortalError(null);
                        setIsPortalUnlocked(true);
                      }}
                      className="bg-navy-light hover:bg-gold hover:text-navy-dark px-2.5 py-1.5 rounded border border-white/10 transition-colors uppercase font-bold text-gold cursor-pointer"
                      title="เข้าดูแบบความคืบหน้าของ เทสโก้ โลตัส ลพบุรี"
                    >
                      🏷️ โลตัส (LOTUS-99)
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPortalProj("amazon");
                        setPortalPasscode("AMAZON-46");
                        setPortalError(null);
                        setIsPortalUnlocked(true);
                      }}
                      className="bg-navy-light hover:bg-gold hover:text-navy-dark px-2.5 py-1.5 rounded border border-white/10 transition-colors uppercase font-bold text-gold cursor-pointer"
                      title="เข้าดูแบบความคืบหน้าของ ร้านคาเฟ่อเมซอน หทัยราษฎร์"
                    >
                      🏷️ คาเฟ่อเมซอน (AMAZON-46)
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPortalProj("office");
                        setPortalPasscode("OFFICE-2026");
                        setPortalError(null);
                        setIsPortalUnlocked(true);
                      }}
                      className="bg-navy-light hover:bg-gold hover:text-navy-dark px-2.5 py-1.5 rounded border border-white/10 transition-colors uppercase font-bold text-gold cursor-pointer"
                      title="เข้าดูแบบความคืบหน้าอาคารประหยัดพลังงาน"
                    >
                      🏷️ ตึกสำนักงาน (OFFICE-2026)
                    </button>
                  </div>
                </div>
              </div>

              {/* Right column Interactive Simulator Portal Panel */}
              <div className="lg:col-span-8 bg-[#0B0F19] border border-white/10 rounded-sm shadow-[0_25px_60px_rgba(0,0,0,0.6)] overflow-hidden">
                {/* Panel head windows window-style bar */}
                <div className="bg-navy-light border-b border-white/10 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                    <span className="text-[10px] text-slate-400 font-mono font-bold tracking-wider ml-2 uppercase">
                      SECURE CLIENT CONSOLE // VER 4.2
                    </span>
                  </div>
                  {isPortalUnlocked && (
                    <button
                      onClick={() => {
                        setIsPortalUnlocked(false);
                        setPortalPasscode("");
                      }}
                      className="text-[9px] uppercase font-mono font-bold text-red-400 bg-red-950/30 border border-red-900/40 px-3 py-1 rounded hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                    >
                      🔐 ปิดเครื่องมือติดตามงาน
                    </button>
                  )}
                </div>

                {/* Main Body of Console */}
                <div className="p-8">
                  {!isPortalUnlocked ? (
                    <div className="py-6 max-w-sm mx-auto text-center space-y-6">
                      <div className="w-14 h-14 bg-white/5 rounded-full border border-white/10 flex items-center justify-center text-gold mx-auto relative">
                        <Lock size={22} className="animate-pulse" />
                      </div>
                      <div className="space-y-1.5">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-gold font-tech">เข้าสู่เครือข่ายความคืบหน้า</h3>
                        <p className="text-[10px] text-slate-400 font-sans tracking-normal leading-normal">
                          กรอกรหัสพอร์ทัลเพื่อตรวจสอบความมั่นคงของโครงสร้าง คอนกรีต และหัวหน้าวิศกรผู้ควบคุมโครงการ เอ็นพี คอนดักชั่น
                        </p>
                      </div>

                      <div className="space-y-3 text-left">
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono uppercase tracking-widest text-slate-400">สลับโครงการที่คุณต้องการวิเคราะห์</label>
                          <select
                            value={selectedPortalProj}
                            onChange={(e) => {
                              setSelectedPortalProj(e.target.value as any);
                              setPortalPasscode("");
                              setPortalError(null);
                            }}
                            className="w-full bg-navy-light border border-white/15 p-3 rounded text-xs text-white outline-none focus:border-gold font-sans"
                          >
                            <option value="lotus">โครงการเทสโก้ โลตัส สาขาลพบุรี</option>
                            <option value="amazon">โครงการร้านคาเฟ่อเมซอน สาขาหทัยราษฎร์ 46</option>
                            <option value="office">โครงการตึกอาคารสำนักงานประหยัดพลังงาน</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono uppercase tracking-widest text-slate-400">ระบุรหัสประจำโครงการ (Client Project Passcode)</label>
                          <input
                            type="text"
                            value={portalPasscode}
                            onChange={(e) => {
                              setPortalPasscode(e.target.value);
                              setPortalError(null);
                            }}
                            placeholder="เช่น LOTUS-99 หรือ AMAZON-46"
                            className="w-full bg-navy-light border border-white/15 p-3 rounded text-xs text-white outline-none focus:border-gold font-mono uppercase"
                          />
                        </div>

                        {portalError && (
                          <p className="text-red-400 text-[10px] font-mono leading-normal bg-red-950/20 border border-red-900/30 p-2 text-center rounded">
                            {portalError}
                          </p>
                        )}

                        <button
                          onClick={() => {
                            setIsPortalLoading(true);
                            setPortalError(null);
                            setTimeout(() => {
                              setIsPortalLoading(false);
                              const cleaned = portalPasscode.trim().toUpperCase();
                              if (selectedPortalProj === "lotus" && (cleaned === "LOTUS-99" || cleaned === "LOTUS")) {
                                setIsPortalUnlocked(true);
                              } else if (selectedPortalProj === "amazon" && (cleaned === "AMAZON-46" || cleaned === "AMAZON")) {
                                setIsPortalUnlocked(true);
                              } else if (selectedPortalProj === "office" && (cleaned === "OFFICE-2026" || cleaned === "OFFICE")) {
                                setIsPortalUnlocked(true);
                              } else {
                                setPortalError("ขออภัยค่ะ รหัสโครงการที่ระบุไม่ถูกต้อง กรุณาเลือกรหัสจำลองแนะนำซ้ายมือ");
                              }
                            }, 600);
                          }}
                          className="w-full bg-gold hover:bg-gold-hover text-navy-dark py-3.5 text-xs uppercase font-bold tracking-widest transition-all rounded-sm flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                        >
                          {isPortalLoading ? (
                            <span className="font-mono animate-pulse">กำลังสื่อสารกับตู้หลัก... ⚡</span>
                          ) : (
                            <>
                              <Unlock size={12} /> ยืนยันเชื่อมพอร์ทัลลูกค้าปลอดภัย 🔐
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                      {/* Left: General Specs */}
                      <div className="space-y-5">
                        <div className="flex justify-between items-center border-b border-white/10 pb-3">
                          <div>
                            <span className="text-[10px] text-gold font-mono block">PROJECT IDENTIFIER</span>
                            <span className="text-sm font-bold block">
                              {selectedPortalProj === "lotus" && "เทสโก้ โลตัส (ลพบุรี)"}
                              {selectedPortalProj === "amazon" && "ร้านคาเฟ่อเมซอน หทัยราษฎร์ 46"}
                              {selectedPortalProj === "office" && "ตึกอาคารสำนักงานประหยัดพลังงาน"}
                            </span>
                          </div>
                          <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 font-mono rounded-sm">
                            ONLINE ACTIVE
                          </span>
                        </div>

                        {/* Interactive progress circle layout */}
                        <div className="flex items-center gap-4 bg-white/5 p-4 border border-white/10 rounded-sm">
                          <div className="relative w-16 h-16 flex items-center justify-center">
                            <svg className="w-16 h-16 transform -rotate-90">
                              <circle cx="32" cy="32" r="26" stroke="#1E293B" strokeWidth="4" fill="transparent" />
                              <circle 
                                cx="32" 
                                cy="32" 
                                r="26" 
                                stroke="#C5A059" 
                                strokeWidth="4" 
                                fill="transparent" 
                                strokeDasharray="163.36" 
                                strokeDashoffset={
                                  selectedPortalProj === "lotus" ? "9.8" : 
                                  selectedPortalProj === "amazon" ? "0" : "89.8"
                                } 
                                className="transition-all duration-1000"
                              />
                            </svg>
                            <span className="absolute text-xs leading-none font-black font-mono">
                              {selectedPortalProj === "lotus" && "94%"}
                              {selectedPortalProj === "amazon" && "100%"}
                              {selectedPortalProj === "office" && "45%"}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono block">สถานะโครงการสะสม</span>
                            <span className="text-xs font-bold text-white block">
                              {selectedPortalProj === "lotus" && "ขั้นตอนความปลอดภัยระบบไฟฟ้า (เก็บรายละเอียด QA)"}
                              {selectedPortalProj === "amazon" && "การก่อสร้างสมบูรณ์ (ส่งมอบเรียบร้อย 100%)"}
                              {selectedPortalProj === "office" && "ขึ้นโครงสร้างอาคาร & คอนกรีตขานรากคอดินเสร็จ"}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white/5 p-3.5 border border-white/5 rounded-sm">
                            <span className="text-[9px] text-slate-400 font-mono block uppercase">วิศวกรผู้ควบคุมโครงการ</span>
                            <span className="text-xs font-bold text-slate-200 block mt-1">คณะวิศวกรวิชาชีพ (หจก. เอ็นพี คอนดักชั่น)</span>
                          </div>
                          <div className="bg-white/5 p-3.5 border border-white/5 rounded-sm">
                            <span className="text-[9px] text-slate-400 font-mono block uppercase">ผลทดสอบโครงสร้าง</span>
                            <span className="text-xs font-bold text-emerald-400 block mt-1">✓ ยอดเยี่ยม (Certified)</span>
                          </div>
                        </div>

                        {/* Additional stats */}
                        <div className="space-y-1 bg-white/5 p-4 border border-white/5 rounded-sm">
                          <span className="text-[9px] text-slate-400 font-mono uppercase tracking-widest block">มาตรฐานทดสอบวัสดุกำลังแรงอัดโครงสร้าง</span>
                          <div className="flex justify-between text-xs items-center pt-1">
                            <span className="font-light text-slate-300">ความตระหนักด้านสิ่งแวดล้อม (Eco System)</span>
                            <span className="text-gold font-mono font-bold">Class-A Standard</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Live On-Site Activity Logs */}
                      <div className="space-y-4">
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono font-bold block flex items-center gap-1">
                          <Clock size={12} className="text-gold animate-spin" style={{ animationDuration: "12s" }} /> Live On-site Activity Log
                        </span>

                        <div className="space-y-3 bg-[#070A11] p-4.5 border border-white/10 rounded-sm font-mono text-[10px] max-h-56 overflow-y-auto space-y-4 text-slate-300">
                          {selectedPortalProj === "lotus" && (
                            <>
                              <div className="border-l-2 border-gold pl-3 py-0.5">
                                <span className="text-gold block">[2026-05-18 09:30]</span>
                                <p className="leading-tight text-white font-medium">ทำความสะอาดพื้นที่ MDB ในหอจ่ายกระแส และทดสอบสายดิน</p>
                              </div>
                              <div className="border-l-2 border-emerald-500 pl-3 py-0.5">
                                <span className="text-emerald-400 block">[2026-05-15 14:15]</span>
                                <p className="leading-tight text-white font-medium">เทคอนกรีตฐานลานจอดด้านลัพธ์ผ่านการเทสความหนืดระดับ 350 ksc</p>
                              </div>
                              <div className="border-l-2 border-slate-600 pl-3 py-0.5">
                                <span className="text-slate-500 block">[2026-05-10 11:00]</span>
                                <p className="leading-tight text-slate-400">โครงเหล็กบนแผงอะลูมิเนียมคอมโพสิตและป้ายหน้าตึกเสร็จสิ้น</p>
                              </div>
                            </>
                          )}

                          {selectedPortalProj === "amazon" && (
                            <>
                              <div className="border-l-2 border-emerald-500 pl-3 py-0.5">
                                <span className="text-emerald-400 block">[PROJECT COMPLETED]</span>
                                <p className="leading-tight text-white font-medium">หจก. เอ็นพี คอนดักชั่น ส่งมอบร้านค้าอเมซอนมาตรฐานระดับสากล</p>
                              </div>
                              <div className="border-l-2 border-emerald-500 pl-3 py-0.5">
                                <span className="text-emerald-400 block">[SYSTEM COMPLIANT]</span>
                                <p className="leading-tight text-slate-300">ระบายของเสีย ระบบบำบัดน้ำ น้ำทิ้ง และไฟซ่อนผ่านการอนุมัติ 100%</p>
                              </div>
                            </>
                          )}

                          {selectedPortalProj === "office" && (
                            <>
                              <div className="border-l-2 border-gold pl-3 py-0.5">
                                <span className="text-gold block">[2026-05-19 16:45]</span>
                                <p className="leading-tight text-white font-medium">เจาะเสาเข็มพังฐานตอก และส่งแท่งวัดระดับความหยุ่นเอียงสปีดสูงสุด</p>
                              </div>
                              <div className="border-l-2 border-white/20 pl-3 py-0.5">
                                <span className="text-slate-500 block">[2026-05-14 08:00]</span>
                                <p className="leading-tight text-slate-400">เริ่มต้นวิเคราะห์ขุดร่องหน้าแปลนฐานรากระบบสุขาภิบาลชั้นจอดรถ</p>
                              </div>
                            </>
                          )}
                        </div>

                        {/* Interactive contact shortcut */}
                        <div className="pt-2">
                          <a
                            href="#contact"
                            className="bg-navy-light hover:bg-gold hover:text-navy-dark border border-white/10 text-white font-mono text-[9px] font-black uppercase tracking-widest py-3 px-4 rounded-sm transition-all flex items-center justify-center gap-1.5"
                          >
                            📧 ส่งคำถามเฉพาะคิวงานนี้ให้กับศูนย์วิศวกรรม
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-10">
              <div className="space-y-2">
                <span className="label-small">Project Showcase</span>
                <h2 className="text-4xl md:text-6xl tracking-tighter uppercase leading-[0.9] font-tech text-navy-dark">
                  Delivered <br /><span className="text-gold">Milestones</span>
                </h2>
              </div>
              <div className="flex flex-col gap-4 max-w-md">
                <p className="text-slate-500 font-light text-lg">
                  การพิสูจน์คุณภาพคือผลงานของเรา คัดสรรโครงการที่มีความซับซ้อนและการบริหารจัดการที่เป็นเลิศ
                </p>
                {/* Admin Mode Toggle Buttons */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={handleToggleAdminMode}
                    className={`px-4 py-2.5 text-xs font-bold uppercase tracking-widest rounded-sm transition-all flex items-center gap-2 border cursor-pointer ${
                      isAdminMode 
                        ? "bg-gold text-navy-dark border-gold" 
                        : "bg-transparent text-slate-600 border-slate-300 hover:text-navy-dark hover:border-navy-dark"
                    }`}
                  >
                    <Settings size={12} /> {isAdminMode ? "ปิดเมนูแก้ไข 🛠️" : "เปิดโหมดผู้ดูแลระบบ 🛠️"}
                  </button>
                </div>
              </div>
            </div>

            {/* Portfolio Grid Starts Here */}
            {confirmResetPortfolio && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-sm flex items-center justify-between">
                <span className="text-sm text-red-700 font-medium font-sans">⚠️ คุณต้องการรีเซ็ตผลงานทั้งหมดกลับเป็นตัวอย่างเริ่มต้นใช่หรือไม่?</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setPortfolio(PORTFOLIO);
                      localStorage.setItem("np_portfolio_data", JSON.stringify(PORTFOLIO));
                      setConfirmResetPortfolio(false);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-sm cursor-pointer"
                  >
                    ใช่, รีเซ็ตทั้งหมด
                  </button>
                  <button
                    onClick={() => setConfirmResetPortfolio(false)}
                    className="bg-slate-200 hover:bg-slate-350 text-slate-700 text-xs font-bold px-4 py-2 rounded-sm cursor-pointer"
                  >
                    ยกเลิก
                  </button>
                </div>
              </div>
            )}

            {/* Grid of Portfolio projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {portfolio.map((proj, idx) => (
                <div key={idx} className="group relative bg-[#0B1528] overflow-hidden border border-slate-100 shadow-xl rounded-sm aspect-[4/3] flex flex-col justify-end">
                  <img
                    src={proj.image || proj.fallback}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/30 to-transparent z-10"></div>
                  
                  <div className="relative z-20 p-6 flex flex-col justify-end h-full">
                    <span className="text-[10px] text-gold font-mono uppercase tracking-widest">{proj.category}</span>
                    <h3 className="text-sm font-bold text-white uppercase mt-1 leading-tight line-clamp-2">{proj.title}</h3>
                  </div>

                  {/* Admin actions inside the project card */}
                  {isAdminMode && (
                    <div className="absolute top-4 right-4 z-30">
                      {confirmDeleteIdx === idx ? (
                        <div className="bg-red-600 text-white p-2 rounded-sm text-[10px] font-bold flex flex-col gap-1 shadow-lg">
                          <span>ลบรายการนี้?</span>
                          <div className="flex gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const filtered = portfolio.filter((_, i) => i !== idx);
                                setPortfolio(filtered);
                                setConfirmDeleteIdx(null);
                              }}
                              className="bg-white text-red-600 px-1.5 py-0.5 rounded-sm font-bold cursor-pointer"
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
                            setConfirmDeleteIdx(idx);
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
              ))}
            </div>

            {isAdminMode && (
              <div className="mt-12 flex justify-center">
                <button
                  type="button"
                  onClick={() => {
                    const newProj = {
                      title: "โครงการติดตั้งระบบหม้อแปลงไฟฟ้าใหม่ " + (portfolio.length + 1),
                      category: "ระบบไฟฟ้าและเครื่องกล",
                      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600",
                      fallback: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600"
                    };
                    setPortfolio([...portfolio, newProj]);
                  }}
                  className="bg-navy-dark text-white hover:bg-gold hover:text-navy-dark border border-gold/40 hover:border-gold px-8 py-4.5 text-xs font-bold uppercase tracking-widest rounded transition-all flex items-center gap-2 shadow-2xl cursor-pointer"
                >
                  <Plus size={16} /> ADD NEW PROJECT (เพิ่มโครงการใหม่)
                </button>
              </div>
            )}
            
            {/* Video Showcase Section */}
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
                      src={tempVideoObjectUrl || videoData.videoUrl} 
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
                        <span className="mono-label text-gold font-mono bg-navy-dark/70 px-3 py-1.5 border border-gold/20 rounded-sm">
                          {videoData.subtitle || "DEFAULT Corporate Video"}
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
                          {videoData.title || "THE ENGINEERING JOURNEY"}
                        </h3>
                        <p className="text-xs text-slate-300 mt-1">คลิกเพื่อรับชมวิดีโอแนะนำ หจก. เอ็นพี คอนดักชั่น</p>
                      </div>

                      <div className="absolute inset-0 bg-navy-dark/30 z-0"></div>
                    </div>
                  )}
                  {/* Realtime ambient background */}
                  <video 
                    src={tempVideoObjectUrl || videoData.videoUrl} 
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
                        <span className="text-[10px] font-mono select-none px-2.5 py-1 text-slate-500 bg-slate-200/60 uppercase font-black rounded-sm border border-slate-300/50 inline-block">
                          Corporate Media
                        </span>
                        <h4 className="text-xl font-black text-navy-dark leading-snug tracking-tight font-tech uppercase">
                          {videoData.title || "THE ENGINEERING JOURNEY"}
                        </h4>
                        <p className="text-sm text-slate-500 font-light leading-relaxed">
                          รับชมวิดีโอพรีเซนเทชั่นและบันทึกภาพถ่ายจากการทำงานจริง ณ ทิวทัศน์สถานที่ติดตั้งของแต่ละโครงการ 
                          สะท้อนฝีมือความประณีตและการคุมเข้มความปลอดภัยทางวิศวกรรม
                        </p>
                      </div>
                      
                      <div className="border-t border-slate-200 pt-6 space-y-3">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">เปิดโหมดผู้ดูแลเพื่อแก้ไข</span>
                        <button
                          onClick={() => {
                            setIsAdminMode(true);
                            window.scrollTo({ top: document.getElementById("portfolio")?.offsetTop || 1800, behavior: 'smooth' });
                          }}
                          className="w-full bg-navy-dark hover:bg-gold text-white hover:text-navy-dark py-3.5 text-xs font-bold uppercase tracking-widest rounded-sm transition-all flex items-center justify-center gap-2 border border-navy-dark hover:border-gold"
                        >
                          <Edit3 size={14} />
                          แก้ไขวิดีโอนี้ 🎥
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-5 flex flex-col justify-between h-full">
                      <div className="space-y-4">
                        <span className="text-xs font-bold text-gold font-mono bg-navy-dark px-3 py-1.5 border border-gold/30 rounded-sm flex items-center gap-1.5 w-fit">
                          <Sparkles size={12} /> แก้ไขข้อมูลวิดีโอพรีเซนเทชั่น
                        </span>

                        <div className="space-y-3">
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] uppercase font-bold text-slate-500">หัวข้อวิดีโอ (Title)</label>
                            <input
                              type="text"
                              value={draftVideoTitle}
                              onChange={(e) => setDraftVideoTitle(e.target.value)}
                              className="bg-white border border-slate-300 focus:border-gold p-2.5 text-sm outline-none w-full text-navy-dark placeholder-slate-400 rounded-sm"
                              placeholder="เช่น THE ENGINEERING JOURNEY"
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] uppercase font-bold text-slate-500">ประเภท/คำอธิบายภาพสั้น (Subtitle)</label>
                            <input
                              type="text"
                              value={draftVideoSubtitle}
                              onChange={(e) => setDraftVideoSubtitle(e.target.value)}
                              className="bg-white border border-slate-300 focus:border-gold p-2.5 text-sm outline-none w-full text-navy-dark placeholder-slate-400 rounded-sm"
                              placeholder="เช่น Corporate Showcase Video"
                            />
                          </div>

                          {/* Link input */}
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] uppercase font-bold text-slate-500 flex justify-between items-center">
                              <span>ลิงก์วิดีโอภายนอก (.mp4)</span>
                              <Link size={10} className="text-slate-400" />
                            </label>
                            <input
                              type="text"
                              value={draftVideoUrl || ""}
                              onChange={(e) => {
                                setDraftVideoFileUrl(null); // overwrite local upload
                                setDraftVideoUrl(e.target.value);
                              }}
                              className="bg-white border border-slate-300 focus:border-gold p-2.5 text-sm outline-none w-full text-navy-dark placeholder-slate-400 rounded-sm font-mono text-xs"
                              placeholder="เช่น https://assets.mixkit.co/... .mp4"
                            />
                          </div>
                        </div>

                        {/* File Upload Selector */}
                        <div className="bg-slate-200/50 p-4 border border-slate-300/40 rounded-sm space-y-2">
                          <label className="text-[10px] uppercase font-bold text-slate-500 block">
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
                                    setDraftVideoUrl(""); // clear URL text when using a local file
                                  }
                                }}
                              />
                            </label>
                            {draftVideoFileUrl ? (
                              <span className="text-[9px] text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded">โหลดไฟล์พร้อมยืนยันแล้ว</span>
                            ) : null}
                          </div>
                          <p className="text-[9px] text-slate-400 font-sans tracking-tight">
                            แนะนำให้อัปโหลดวิดีโอสั้น หรือไฟล์ที่มีขนาดไม่เกิน 20-30MB เพื่อประสิทธิภาพสูงสุด
                          </p>

                          {/* Explicit Video Confirm/Apply Button */}
                          <div className="pt-2 border-t border-slate-300/40 mt-3">
                            <button
                              type="button"
                              onClick={() => {
                                setVideoApplyStatus("pending");
                                setTimeout(() => {
                                  setTempVideoObjectUrl(draftVideoFileUrl);
                                  const updated = [...videoPlaylists];
                                  updated[activeVideoIdx] = {
                                    title: draftVideoTitle,
                                    subtitle: draftVideoSubtitle,
                                    videoUrl: draftVideoFileUrl || draftVideoUrl
                                  };
                                  setVideoPlaylists(updated);
                                  localStorage.setItem("np_video_playlist_v3", JSON.stringify(updated));
                                  setIsVideoPlaying(true); // auto play the updated video
                                  setVideoApplyStatus("success");
                                  setTimeout(() => setVideoApplyStatus("idle"), 2500);
                                }, 600);
                              }}
                              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-[11px] font-bold uppercase tracking-wider py-3 px-4 rounded-sm transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                            >
                              {videoApplyStatus === "pending" ? (
                                <span className="animate-pulse">กำลังสลับสายไฟสัญญาณวิดีโอ... ⚡</span>
                              ) : videoApplyStatus === "success" ? (
                                <span className="flex items-center gap-1.5 text-white">
                                  <CheckCircle2 size={13} className="animate-bounce" /> ยืนยันใส่วิดีโอสำเร็จเรียบร้อย! 🎬
                                </span>
                              ) : (
                                <>
                                  <CheckCircle2 size={13} /> ยืนยันเพื่อบันทึกและใส่วิดีโอใหม่นี้ 📝
                                </>
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
                                onClick={() => {
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
                                  setTempVideoObjectUrl(null);
                                  setVideoPlaylists(defaultVideos);
                                  localStorage.setItem("np_video_playlist_v3", JSON.stringify(defaultVideos));
                                  setActiveVideoIdx(0);
                                  setIsVideoPlaying(false);
                                  setConfirmResetVideo(false);
                                }}
                                className="bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold px-2 py-1 rounded transition-all cursor-pointer"
                              >
                                ยืนยัน
                              </button>
                              <button
                                onClick={() => setConfirmResetVideo(false)}
                                className="bg-slate-200 hover:bg-slate-300 text-slate-600 text-[10px] font-bold px-2 py-1 rounded transition-all cursor-pointer"
                              >
                                ยกเลิก
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmResetVideo(true)}
                            className="w-full bg-white hover:bg-slate-100 text-slate-600 border border-slate-300 text-[10px] font-bold uppercase tracking-wider py-2.5 rounded-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <RotateCcw size={12} /> ปรับวิดีโอกลับเป็นของบริษัทหลัก 🔄
                          </button>
                        )}
                        
                        <button
                          onClick={() => setIsAdminMode(false)}
                          className="w-full bg-gold hover:bg-gold-hover text-navy-dark text-[10px] font-bold uppercase tracking-wider py-2.5 rounded-sm transition-all flex items-center justify-center gap-1.5 shadow-md border border-gold cursor-pointer"
                        >
                          <CheckCircle2 size={12} /> ยืนยันปิดหน้าต่างแก้ไขทั้งหมด
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white shadow-2xl rounded-sm overflow-hidden grid grid-cols-1 lg:grid-cols-5">
              <div className="lg:col-span-2 bg-navy-dark text-white p-12">
                <h2 className="text-3xl mb-8 font-title">ข้อมูลติดต่อ</h2>
                <p className="text-slate-400 mb-12">
                  ยินดีให้คำปรึกษาและเสนอราคาสำหรับทุกโครงการก่อสร้างและงานระบบวิศวกรรม
                </p>
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-navy-light flex items-center justify-center text-gold">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <span className="block font-bold text-gold text-xs uppercase mb-1">Office Address</span>
                      <p className="text-sm">ทั่วราชอาณาจักรไทย</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-navy-light flex items-center justify-center text-gold">
                      <Phone size={20} />
                    </div>
                    <div>
                      <span className="block font-bold text-gold text-xs uppercase mb-1">Phone Number</span>
                      <p className="text-sm">0934788375</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-navy-light flex items-center justify-center text-gold">
                      <Mail size={20} />
                    </div>
                    <div>
                      <span className="block font-bold text-gold text-xs uppercase mb-1">Email Address</span>
                      <p className="text-sm">noon0925135779@gamil.com</p>
                    </div>
                  </div>
                </div>


              </div>

              <div className="lg:col-span-3 p-12">
                <h2 className="text-3xl mb-8 font-title text-navy-dark">ส่งข้อความถึงเรา</h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase text-slate-500">ชื่อ-นามสกุล</label>
                    <input type="text" className="bg-slate-50 border border-slate-200 p-4 outline-none focus:border-gold transition-colors" placeholder="ระบุชื่อของคุณ" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase text-slate-500">เบอร์โทรศัพท์</label>
                    <input type="tel" className="bg-slate-50 border border-slate-200 p-4 outline-none focus:border-gold transition-colors" placeholder="08xxxxxxx" />
                  </div>
                  <div className="md:col-span-2 flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase text-slate-500">อีเมล</label>
                    <input type="email" className="bg-slate-50 border border-slate-200 p-4 outline-none focus:border-gold transition-colors" placeholder="example@email.com" />
                  </div>
                  <div className="md:col-span-2 flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase text-slate-500">ประเภทงาน / รายละเอียดเบื้องต้น</label>
                    <textarea rows={4} className="bg-slate-50 border border-slate-200 p-4 outline-none focus:border-gold transition-colors" placeholder="รายละเอียดโครงการ..."></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <button className="w-full bg-navy-dark text-white py-5 font-bold uppercase tracking-widest hover:bg-gold hover:text-navy-dark transition-all shadow-xl">
                      ส่งข้อมูลเพื่อขอใบเสนอราคา
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white text-navy-dark pt-32 pb-10 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
            <div className="lg:col-span-2 space-y-8">
              <div className="flex flex-col">
                <span className="text-3xl font-black tracking-tighter leading-none">
                  NP CONDUCTION
                </span>
                <span className="label-small mt-1">
                  Limited Partnership
                </span>
              </div>
              <p className="text-slate-500 max-w-sm leading-relaxed font-light">
                มุ่งมั่นสร้างสรรค์งานวิศวกรรมที่มีความแม่นยำและปลอดภัยสูงสุด 
                เพื่อเป็นรากฐานที่แข็งแกร่งให้กับการเติบโตของธุรกิจคุณในระยะยาว
              </p>
            </div>
            
            <div>
              <h4 className="label-small text-gold mb-10">Navigation</h4>
              <ul className="space-y-4 text-xs font-black uppercase tracking-widest text-slate-500">
                {NAV_LINKS.map(link => (
                  <li key={link.name}>
                    <a href={link.href} className="hover:text-gold transition-colors">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="label-small text-gold mb-10">Capabilities</h4>
              <ul className="space-y-4 text-xs font-black uppercase tracking-widest text-slate-500">
                <li><a href="#services" className="hover:text-gold transition-colors">Civil Construction</a></li>
                <li><a href="#services" className="hover:text-gold transition-colors">Electrical Systems</a></li>
                <li><a href="#services" className="hover:text-gold transition-colors">Mechanical Piping</a></li>
                <li><a href="#services" className="hover:text-gold transition-colors">Project Management</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-10 flex flex-col md:flex-row justify-between items-center gap-10">
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400">
              © {new Date().getFullYear()} NP Conduction Limited Partnership.
            </p>
            <div className="flex gap-10 text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400">
              <a href="#" className="hover:text-gold transition-colors">Privacy</a>
              <a href="#" className="hover:text-gold transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Admin Authentication Modal Overlay */}
      <AnimatePresence>
        {showAuthModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-lg p-6 font-sans"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-md bg-navy-dark text-white border-2 border-gold/40 p-8 shadow-[0_30px_60px_rgba(0,0,0,0.8)] rounded-sm relative"
            >
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-1 cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center text-center space-y-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
                  {authSuccess ? (
                    <ShieldCheck size={32} className="animate-bounce text-emerald-400" />
                  ) : (
                    <Lock size={32} className="animate-pulse" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gold font-tech">
                    Admin Security Gateway
                  </h3>
                  <p className="text-[11px] uppercase tracking-wider text-slate-400 mt-1 font-mono">
                    Authorized Access Control
                  </p>
                </div>
                <div className="w-12 h-0.5 bg-gold/50"></div>
                <p className="text-xs text-slate-300 font-light leading-relaxed max-w-sm">
                  ระบบจำกัดสิทธิ์ความปลอดภัยสูงสุดเฉพาะบุคคลที่ใช้บัญชีอีเมล <b className="text-gold font-mono text-xs">npconstruction001@gmail.com</b> เท่านั้นในการแก้ไขเนื้อหาพอร์ตโฟลิโอและวิดีโอ
                </p>
              </div>

              {authSuccess ? (
                <div className="text-center py-6 space-y-4">
                  <div className="text-emerald-400 font-bold text-sm tracking-wide flex items-center justify-center gap-2">
                    <Sparkles size={16} className="animate-spin text-gold" />
                    ยืนยันตัวตนสำเร็จ! กำลังเข้าสู่โหมดแก้ไข...
                  </div>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    ยินดีต้อนรับคุณแอดมิน NP Conduction เข้าสู่โปรแกรมบริหารรายละเอียดหลักของบริษัท
                  </p>
                </div>
              ) : (
                <form onSubmit={handleAuthSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block font-mono">
                      ระบุอีเมลผู้ดูแลระบบ (ADMIN EMAIL)
                    </label>
                    <input
                      type="email"
                      required
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      placeholder="เช่น npconstruction001@gmail.com"
                      className="w-full bg-navy-light/60 border border-white/10 p-4.5 rounded-sm outline-none focus:border-gold transition-colors text-xs font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block font-mono">
                        รหัสผ่านเข้าถึงด่วน (ACCESS CODE)
                      </label>
                      <span className="text-[9px] text-gold/60 font-mono">รหัสเริ่มต้นคือ: np2026</span>
                    </div>
                    <input
                      type="password"
                      required
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      placeholder="กรอกรหัสผ่านเพื่อยืนยัน"
                      className="w-full bg-navy-light/60 border border-white/10 p-4.5 rounded-sm outline-none focus:border-gold transition-colors text-xs font-mono"
                    />
                  </div>

                  {authError && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-[11px] bg-red-950/40 border border-red-900/30 p-3 rounded-sm leading-relaxed"
                    >
                      {authError}
                    </motion.div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-gold hover:bg-gold-hover text-navy-dark py-4 uppercase font-bold tracking-widest text-xs rounded-sm transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer font-sans"
                    >
                      <ShieldCheck size={14} /> ตรวจสอบสิทธิ์และเปิดใช้งานเครื่องมือ
                    </button>
                  </div>

                  {/* Smart Auto Authentication Helper */}
                  <div className="border-t border-white/5 pt-4 flex flex-col gap-2">
                    <span className="text-[9px] text-slate-500 font-mono text-center">
                      — หรือใช้งานระบบ One-click Verification ด้านล่าง —
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthEmail("npconstruction001@gmail.com");
                        setAuthPassword("np2026");
                        setAuthError(null);
                        setAuthSuccess(true);
                        setTimeout(() => {
                          localStorage.setItem("np_admin_is_logged_in", "true");
                          localStorage.setItem("np_admin_email", "npconstruction001@gmail.com");
                          setIsLoggedIn(true);
                          setIsAdminMode(true);
                          setShowAuthModal(false);
                          setAuthSuccess(false);
                          const target = document.getElementById("portfolio");
                          if (target) target.scrollIntoView({ behavior: "smooth" });
                        }, 1000);
                      }}
                      className="w-full bg-emerald-950/40 hover:bg-emerald-900/40 text-emerald-400 border border-emerald-950/50 py-2.5 rounded-sm text-[10px] font-sans font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      ⚡ เข้าสู่ระบบอัตโนมัติด้วยบัญชีปัจจุบันของคุณ (npconstruction001@gmail.com)
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Floating Admin Trigger Button */}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-2.5">
        <AnimatePresence>
          {isAdminMode && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="bg-navy-dark text-white border border-gold/40 px-4 py-2 rounded-sm text-[10px] font-sans font-bold shadow-2xl flex items-center gap-2"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>กำลังอยู่ในโหมดผู้ดูแล: กดเครื่องมือแก้ไขด้านล่างได้ทันทีค่ะ</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button
          onClick={handleToggleAdminMode}
          className={`shadow-[0_20px_50px_rgba(0,0,0,0.3)] md:px-6 px-5 py-4.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-3 border cursor-pointer ${
            isAdminMode 
              ? "bg-gold text-navy-dark border-gold scale-105 active:scale-95 shadow-gold/20" 
              : "bg-navy-dark text-white border-gold/40 hover:bg-gold hover:text-navy-dark hover:border-gold hover:scale-105 active:scale-95"
          }`}
          title="สลับโหมดผู้ดูแลเพื่อแก้ไขรูปภาพและวิดีโอ"
        >
          {isAdminMode ? (
            <ShieldCheck size={16} className="text-navy-dark animate-pulse" />
          ) : isLoggedIn ? (
            <Unlock size={16} className="text-gold" />
          ) : (
            <Lock size={16} className="text-gold" />
          )}
          <span className="font-sans font-black tracking-normal">
            {isAdminMode ? "ปิดโหมดแก้ไข" : "สลับเปิดโหมดผู้ดูแลแก้ไขด่วน 📷"}
          </span>
        </button>
      </div>
    </div>
  );
}
