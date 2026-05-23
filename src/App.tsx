import React, { useState, useEffect } from "react";
import { Link, Lock, Unlock, ShieldCheck } from "lucide-react";
import { Service, Project } from "./types";
import { 
  SERVICES, 
  PORTFOLIO, 
  NAV_LINKS 
} from "./constants/data";

// Component Imports
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import ServicesSection from "./components/Services";
import Stats from "./components/Stats";
import Estimator from "./components/Estimator";
import Timeline from "./components/Timeline";
import PortfolioSection from "./components/Portfolio";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import Toast from "./components/Toast";

export default function App() {
  // Global States
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(() => {
    return localStorage.getItem("np_admin_is_logged_in") === "true";
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("np_admin_is_logged_in") === "true";
  });

  // Security and Validation Modals State
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authEmail, setAuthEmail] = useState<string>("");
  const [authPassword, setAuthPassword] = useState<string>("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<boolean>(false);
  const [showSavedToast, setShowSavedToast] = useState<boolean>(false);

  // Editable Content States (Hero, About, Services)
  const [heroTitleL1, setHeroTitleL1] = useState<string>(() => {
    return localStorage.getItem("np_hero_title_l1_v4") || "Building Strong Foundations,";
  });
  const [heroTitleL2, setHeroTitleL2] = useState<string>(() => {
    return localStorage.getItem("np_hero_title_l2_v4") || "Conducting";
  });
  const [heroTitleGold, setHeroTitleGold] = useState<string>(() => {
    return localStorage.getItem("np_hero_title_gold_v4") || "Success";
  });
  const [heroSubtitle, setHeroSubtitle] = useState<string>(() => {
    return localStorage.getItem("np_hero_subtitle_v4") || "หจก. เอ็นพี คอนดักชั่น - รับเหมาก่อสร้างและงานระบบวิศวกรรมครบวงจร ทั่วประเทศไทย ด้วยประสบการณ์กว่า 10 ปี และทีมวิศวกรผู้เชี่ยวชาญ มุ่งมั่นส่งมอบงานคุณภาพตรงเวลา ได้มาตรฐานสากล";
  });

  const [aboutTitleL1, setAboutTitleL1] = useState<string>(() => {
    return localStorage.getItem("np_about_title_l1_v4") || "หจก. เอ็นพี คอนดักชั่น";
  });
  const [aboutTitleGold, setAboutTitleGold] = useState<string>(() => {
    return localStorage.getItem("np_about_title_gold_v4") || "วิสัยทัศน์ & จุดเด่นหลัก";
  });
  const [aboutDesc, setAboutDesc] = useState<string>(() => {
    return localStorage.getItem("np_about_desc_v4") || "วิสัยทัศน์ (Vision): สร้างสรรค์อนาคตการก่อสร้างที่มั่นคง ด้วยการมองการณ์ไกล ใส่ใจความปลอดภัย และรับผิดชอบในทุกผลงานเพื่อความพึงพอใจสูงสุดของลูกค้า\n\nเราคือผู้เชี่ยวชาญด้านงานรับเหมาก่อสร้างและงานระบบวิศวกรรมที่ได้รับความไว้วางใจจากทั้งหน่วยงานภาครัฐ (งานราชการ) และภาคเอกชนทั่วประเทศ พร้อมตอบสนองความต้องการของลูกค้าทุกประเภทอย่างมืออาชีพ";
  });
  const [aboutBullets, setAboutBullets] = useState<string[]>(() => {
    const raw = localStorage.getItem("np_about_bullets_v4");
    return raw ? JSON.parse(raw) : [
      "ประสบการณ์ยาวนานกว่า 10 ปี (บริหารงานสากล)",
      "ทีมวิศวกรผู้เชี่ยวชาญ คุมความถูกต้องและปลอดภัยสูงสุด",
      "พร้อมรับงานคุณภาพสว่างไสว ทั่วประเทศไทย",
      "มีมาตรฐานสากลตอบสนองลูกค้าทุกประเภท (ราชการ & เอกชน)"
    ];
  });

  const [servicesSectionTitle, setServicesSectionTitle] = useState<string>(() => {
    return localStorage.getItem("np_services_section_title_v4") || "บริการหลักผู้เชี่ยวชาญ";
  });
  const [servicesSectionGold, setServicesSectionGold] = useState<string>(() => {
    return localStorage.getItem("np_services_section_gold_v4") || "งานรับเหมา & วิศวกรรมระบบ";
  });
  const [servicesSectionDesc, setServicesSectionDesc] = useState<string>(() => {
    return localStorage.getItem("np_services_section_desc_v4") || "หจก. เอ็นพี คอนดักชั่น มุ่งเน้นความโปร่งใสเป็นทางนำ เดินงานสถาปัตยกรรมและระบบควบคุมอย่างคล่องตัว รวดเร็ว ถูกราคา ปลอดภัยสูงสุด คลุมหน้างานประมูลและงานก่อสร้างทั่วประเทศไทย";
  });

  // Dynamic Lists Data (Services, Portfolio, Videos)
  const [servicesData, setServicesData] = useState<Service[]>(() => {
    const saved = localStorage.getItem("np_services_data_v4");
    return saved ? JSON.parse(saved) : SERVICES;
  });

  const [portfolio, setPortfolio] = useState<Project[]>(() => {
    const saved = localStorage.getItem("np_portfolio_data");
    return saved ? JSON.parse(saved) : PORTFOLIO;
  });

  // Track Window Scroll to dynamically style Header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Secret URL parameters check to easily toggle admin editor
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const secretAction = params.get("edit") || params.get("admin") || params.get("np_edit");
      if (secretAction === "true") {
        localStorage.setItem("np_admin_is_logged_in", "true");
        setIsLoggedIn(true);
        setIsAdminMode(true);
        triggerSavedToast();
      } else if (secretAction === "false") {
        localStorage.removeItem("np_admin_is_logged_in");
        localStorage.removeItem("np_admin_email");
        setIsLoggedIn(false);
        setIsAdminMode(false);
        triggerSavedToast();
      }
    }
  }, []);

  const [secretClickCount, setSecretClickCount] = useState<number>(0);
  const handleSecretClick = () => {
    setSecretClickCount((prev) => {
      const next = prev + 1;
      if (next >= 5) {
        setAuthError(null);
        setAuthEmail("");
        setAuthPassword("");
        setShowAuthModal(true);
        return 0;
      }
      return next;
    });
  };

  // Sync edits automatically as they are entered (Offline First Persistence)
  useEffect(() => {
    localStorage.setItem("np_hero_title_l1_v4", heroTitleL1);
    localStorage.setItem("np_hero_title_l2_v4", heroTitleL2);
    localStorage.setItem("np_hero_title_gold_v4", heroTitleGold);
    localStorage.setItem("np_hero_subtitle_v4", heroSubtitle);
  }, [heroTitleL1, heroTitleL2, heroTitleGold, heroSubtitle]);

  useEffect(() => {
    localStorage.setItem("np_about_title_l1_v4", aboutTitleL1);
    localStorage.setItem("np_about_title_gold_v4", aboutTitleGold);
    localStorage.setItem("np_about_desc_v4", aboutDesc);
    localStorage.setItem("np_about_bullets_v4", JSON.stringify(aboutBullets));
  }, [aboutTitleL1, aboutTitleGold, aboutDesc, aboutBullets]);

  useEffect(() => {
    localStorage.setItem("np_services_section_title_v4", servicesSectionTitle);
    localStorage.setItem("np_services_section_gold_v4", servicesSectionGold);
    localStorage.setItem("np_services_section_desc_v4", servicesSectionDesc);
  }, [servicesSectionTitle, servicesSectionGold, servicesSectionDesc]);

  useEffect(() => {
    localStorage.setItem("np_services_data_v4", JSON.stringify(servicesData));
  }, [servicesData]);

  // Utility to fire aesthetic green save indicators
  const triggerSavedToast = () => {
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  // Switch Admin Mode or trigger security dialog
  const handleToggleAdminMode = () => {
    if (isAdminMode) {
      setIsAdminMode(false);
      triggerSavedToast();
    } else {
      if (isLoggedIn) {
        setIsAdminMode(true);
        triggerSavedToast();
      } else {
        setAuthError(null);
        setAuthEmail("");
        setAuthPassword("");
        setShowAuthModal(true);
      }
    }
  };

  // Submit Admin gateway credentials
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    // Secure credentials matching original requirements
    if (authEmail === "npconstruction001@gmail.com" && authPassword === "np2026") {
      setAuthSuccess(true);
      setTimeout(() => {
        localStorage.setItem("np_admin_is_logged_in", "true");
        localStorage.setItem("np_admin_email", authEmail);
        setIsLoggedIn(true);
        setIsAdminMode(true);
        setShowAuthModal(false);
        setAuthSuccess(false);
        triggerSavedToast();
        const target = document.getElementById("portfolio");
        if (target) target.scrollIntoView({ behavior: "smooth" });
      }, 1000);
    } else {
      setAuthError("อีเมลผู้ดูแลระบบหรือรหัสผ่าน Access Code สำหรับบริษัทไม่ถูกต้อง ไม่สามารถเข้าสิทธิ์ด่วนได้ค่ะ 🔐");
    }
  };

  // Invalidate session
  const handleLogout = () => {
    localStorage.removeItem("np_admin_is_logged_in");
    localStorage.removeItem("np_admin_email");
    setIsLoggedIn(false);
    setIsAdminMode(false);
    triggerSavedToast();
  };

  return (
    <div className="min-h-screen bg-white text-[#0F172A] font-sans selection:bg-gold selection:text-navy-dark leading-normal antialiased">
      {/* Dynamic Header & Mobile Drawer Navigation */}
      <Header 
        isLoggedIn={isLoggedIn}
        isAdminMode={isAdminMode}
        scrolled={scrolled}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        handleLogout={handleLogout}
        handleToggleAdminMode={handleToggleAdminMode}
        onSecretClick={handleSecretClick}
      />

      <main>
        {/* Hero Landing */}
        <Hero 
          isAdminMode={isAdminMode}
          triggerSavedToast={triggerSavedToast}
          setIsAdminMode={setIsAdminMode}
        />

        {/* Corporate Profile Definition */}
        <About 
          isAdminMode={isAdminMode}
          aboutTitleL1={aboutTitleL1}
          setAboutTitleL1={setAboutTitleL1}
          aboutTitleGold={aboutTitleGold}
          setAboutTitleGold={setAboutTitleGold}
          aboutDesc={aboutDesc}
          setAboutDesc={setAboutDesc}
          aboutBullets={aboutBullets}
          setAboutBullets={setAboutBullets}
          triggerSavedToast={triggerSavedToast}
          setIsAdminMode={setIsAdminMode}
        />

        {/* Dynamic Services Matrix Grid */}
        <ServicesSection 
          isAdminMode={isAdminMode}
          servicesSectionTitle={servicesSectionTitle}
          setServicesSectionTitle={setServicesSectionTitle}
          servicesSectionGold={servicesSectionGold}
          setServicesSectionGold={setServicesSectionGold}
          servicesSectionDesc={servicesSectionDesc}
          setServicesSectionDesc={setServicesSectionDesc}
          servicesData={servicesData}
          setServicesData={setServicesData}
          triggerSavedToast={triggerSavedToast}
          setIsAdminMode={setIsAdminMode}
        />

        {/* Metric Milestones */}
        <Stats />

        {/* Interactive CAD/Spec Calculator */}
        <Estimator />

        {/* Step Timeline Workflow */}
        <Timeline />

        {/* Custom Portfolios and Uploads */}
        <PortfolioSection 
          isAdminMode={isAdminMode}
          portfolio={portfolio}
          setPortfolio={setPortfolio}
          triggerSavedToast={triggerSavedToast}
        />



        {/* Contact form and Simulator Integrations */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer onSecretClick={handleSecretClick} />

      {/* Security Gate authentication modal */}
      <AuthModal 
        showAuthModal={showAuthModal}
        setShowAuthModal={setShowAuthModal}
        authEmail={authEmail}
        setAuthEmail={setAuthEmail}
        authPassword={authPassword}
        setAuthPassword={setAuthPassword}
        authError={authError}
        setAuthError={setAuthError}
        authSuccess={authSuccess}
        setAuthSuccess={setAuthSuccess}
        handleAuthSubmit={handleAuthSubmit}
        setIsLoggedIn={setIsLoggedIn}
        setIsAdminMode={setIsAdminMode}
      />

      {/* Pop notifications */}
      <Toast showSavedToast={showSavedToast} />

      {/* Persistent Floating Admin Trigger Button */}
      {isLoggedIn && (
        <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-2.5">
          {isAdminMode && (
            <div className="bg-navy-dark text-white border border-gold/40 px-4 py-2 rounded-sm text-[10px] font-sans font-bold shadow-2xl flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>กำลังอยู่ในโหมดผู้ดูแล: กดเครื่องมือแก้ไขด้านล่างได้ทันทีค่ะ</span>
            </div>
          )}
          
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
              <ShieldCheck size={16} className="text-navy-dark" />
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
      )}
    </div>
  );
}
