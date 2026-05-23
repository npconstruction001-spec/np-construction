import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Hammer, CheckCircle2 } from "lucide-react";

export default function Timeline() {
  const [activeStageStep, setActiveStageStep] = useState<number>(0);

  const stages = [
    { step: "01", name: "วิเคราะห์ & สรรหา", icon: "🔍", desc: "CAD/BIM Level Planning" },
    { step: "02", name: "งานดิน & ฐานราก", icon: "🏗️", desc: "Rigid Soil Footing" },
    { step: "03", name: "งานโครงสร้างเสาคาน", icon: "🧱", desc: "Heavy Steel Framing" },
    { step: "04", name: "งานระบายน้ำ & ระบบไฟ", icon: "⚡", desc: "Utility Station MDB" },
    { step: "05", name: "ตรวจสอบปิดงาน QA", icon: "🏆", desc: "Expert Engineering Signoff" }
  ];

  return (
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
            {stages.map((stage, idx) => (
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
                    <span className="text-[10px] font-mono bg-navy-dark text-gold px-3 py-1 rounded-sm uppercase tracking-widest font-bold w-fit inline-block font-tech">
                      Step 1 Detail: การวางแผนระดับสากล
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-navy-dark font-sans">ออกแบบโครงสร้างสถาปัตยกรรมด้วยระบบ BIM และ CAD 3 มิติ</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-light font-sans">
                    ทีมงานวิศวกรของ เอ็นพี คอนดักชั่น เริ่มต้นวิเคราะห์เค้าโครงที่ดิน สภาพใต้ชั้นดิน และทำแบบจำลอง 3 มิติเชิงประจักษ์ (BIM) เพื่อลดความผิดพลาดในการติดตั้งระบบปรับอากาศ ไฟฟ้าสุขาภิบาลล่วงหน้า ปิดช่องโหว่งบประมาณบานปลาย 100%
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-slate-200/60 bg-white p-3.5 space-y-1 rounded-sm">
                      <span className="text-[9px] font-bold text-navy-dark uppercase tracking-wider block font-sans">ซอฟต์แวร์สนับสนุน</span>
                      <span className="text-xs font-mono text-slate-500 font-bold">AutoCAD, Revit, SolidWorks</span>
                    </div>
                    <div className="border border-slate-200/60 bg-white p-3.5 space-y-1 rounded-sm">
                      <span className="text-[9px] font-bold text-navy-dark uppercase tracking-wider block font-sans">การวิเคราะห์วิศวกรรม</span>
                      <span className="text-xs font-mono text-slate-500 font-bold">ตรวจสอบเสถียรภาพแรงสถิตยศาสตร์</span>
                    </div>
                  </div>
                </>
              )}

              {activeStageStep === 1 && (
                <>
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono bg-navy-dark text-gold px-3 py-1 rounded-sm uppercase tracking-widest font-bold w-fit inline-block font-tech">
                      Step 2 Detail: งานรากฐานอันทรหด
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-navy-dark font-sans">ตอกเสาเข็มลึกสู้ชั้นดินแกร่ง และวิเคราะห์งานหล่อฐานคานคอดิน</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-light font-sans">
                    งานรากฐานเปรียบเสมือนหัวใจของ หจก. เอ็นพี คอนดักชั่น เราคัดเลือกเสาเข็มมาตรฐานมอก. ป้อนการเจาะด้วยรถตอกแรงอัดสูง พร้อมทดสอบกำลังรับน้ำหนักเสาเข็มสะสม (Pile Load Test) เพื่อรองรับแรงดันสะสมสูงสุดในกลุ่มโรงงานคลังสินค้าหลักสิบตันต่อขอบเขตแผงแกรนิต
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-slate-200/60 bg-white p-3.5 space-y-1 rounded-sm">
                      <span className="text-[9px] font-bold text-navy-dark uppercase tracking-wider block font-sans">คุณภาพวัสดุเหล็ก&คอนกรีต</span>
                      <span className="text-xs font-mono text-slate-500 font-bold">คอนกรีตมาตรฐาน 240-400 ksc cylinder</span>
                    </div>
                    <div className="border border-slate-200/60 bg-white p-3.5 space-y-1 rounded-sm">
                      <span className="text-[9px] font-bold text-navy-dark uppercase tracking-wider block font-sans">การตรวจสอบหน้างาน</span>
                      <span className="text-xs font-mono text-slate-500 font-bold">ประเมินแรงทรุดตัว (Static Load Test Verified)</span>
                    </div>
                  </div>
                </>
              )}

              {activeStageStep === 2 && (
                <>
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono bg-navy-dark text-gold px-3 py-1 rounded-sm uppercase tracking-widest font-bold w-fit inline-block font-tech">
                      Step 3 Detail: ความแข็งแกร่งเชิงโครงสร้าง
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-navy-dark font-sans">ขึ้นโครงเสาเหล็กถัก แผงเมทัลชีท และผนังคอนกรีตแกร่งล้อมรอบ</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-light font-sans">
                    โครงสร้างหลักพาดช่วงกว้างด้วยคานทรัส (Steel Truss) และระบบผนังแข็งแกรงป้องกันไฟช็อตและอัคคีภัย การเชื่อมต่อชิ้นส่วนโครงสร้างเหล็กใช้หัวตอกเชื่อมมาตรฐานอุตสาหกรรมชุบกันสนิมพิเศษ (Hot-Dip Galvanized) เพื่อยืดอายุงานไม่ต่ำกว่า 40 ปี
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-slate-200/60 bg-white p-3.5 space-y-1 rounded-sm">
                      <span className="text-[9px] font-bold text-navy-dark uppercase tracking-wider block font-sans">มาตรการรักษาความปลอดภัย</span>
                      <span className="text-xs font-mono text-slate-500 font-bold">ระบบนั่งร้านหนา 3 สตรีม พร้อมสายรัดเซฟตี้</span>
                    </div>
                    <div className="border border-slate-200/60 bg-white p-3.5 space-y-1 rounded-sm">
                      <span className="text-[9px] font-bold text-navy-dark uppercase tracking-wider block font-sans">การตรวจสอบทางช่าง</span>
                      <span className="text-xs font-mono text-slate-500 font-bold">X-Ray รอยเชื่อมต่อ (Non-Destructive Testing)</span>
                    </div>
                  </div>
                </>
              )}

              {activeStageStep === 3 && (
                <>
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono bg-navy-dark text-gold px-3 py-1 rounded-sm uppercase tracking-widest font-bold w-fit inline-block font-tech">
                      Step 4 Detail: ชีพจรหลักของระบบอาคาร
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-navy-dark font-sans">เดินสถานีจ่ายไฟ ตู้ MDB เดินท่อระบายสุขาภิบาล & ท่อบำบัด</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-light font-sans">
                    เราคือผู้จัดเตรียมและฝังเดินท่อทองแดงคุณภาพนำเข้า ระบบปรับอากาศขนาดใหญ่ (MDB System) ควบคุมความปลอดภัยผ่านการปรับระดับวงจรกระแสสลับ มีระบบสลับสับไฟอัจฉริยะหากสภาวะพายุกระทบ หรือสลับแหล่งพลังงาน Solar Rooftop เพื่อลดต้นทุนไฟฟ้า
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-slate-200/60 bg-white p-3.5 space-y-1 rounded-sm">
                      <span className="text-[9px] font-bold text-navy-dark uppercase tracking-wider block font-sans">มาตรฐานระบบไฟฟ้า</span>
                      <span className="text-xs font-mono text-slate-500 font-bold">สอดรับมาตรฐาน วสท. & กฟภ. / MEA</span>
                    </div>
                    <div className="border border-slate-200/60 bg-white p-3.5 space-y-1 rounded-sm">
                      <span className="text-[9px] font-bold text-navy-dark uppercase tracking-wider block font-sans">อุปกรณ์จำเพาะ</span>
                      <span className="text-xs font-mono text-slate-500 font-bold">ตู้คอนโทรล IP54 กันฝุ่นน้ำสถิติสูง</span>
                    </div>
                  </div>
                </>
              )}

              {activeStageStep === 4 && (
                <>
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono bg-navy-dark text-gold px-3 py-1 rounded-sm uppercase tracking-widest font-bold w-fit inline-block font-tech">
                      Step 5 Detail: ความยอดเยี่ยมอย่างแท้จริง
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-navy-dark font-sans">ส่งมอบใบประกันคุณภาพวิศวกรวิชาชีพ ตรวจสอบอาคารครบมิติ</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-light font-sans">
                    ทุกตารางเซนติเมตรของโครงการรับเหมาภายใต้ หจก. เอ็นพี คอนดักชั่น จะได้รับการลงนามกำกับตรวจสอบโดยสามัญวิศวกรผู้ถือใบอนุญาตควบคุมอาคารระดับสูง รับระเบียบใบอนุญาตเปิดใช้อาคาร (อ.6) ส่งมอบคู่มือบำรุงรักษาและการดูแลหลังรับประกันสุดประทับใจ
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-slate-200/60 bg-white p-3.5 space-y-1 rounded-sm">
                      <span className="text-[9px] font-bold text-navy-dark uppercase tracking-wider block font-sans">การลงนามรับรองวิชาชีพ</span>
                      <span className="text-xs font-mono text-slate-500 font-bold">ใบอนุญาตประกอบวิชาชีพวิศวกรรมควบคุม (กว.)</span>
                    </div>
                    <div className="border border-slate-200/60 bg-white p-3.5 space-y-1 rounded-sm">
                      <span className="text-[9px] font-bold text-navy-dark uppercase tracking-wider block font-sans">ผลรับประกันรวมโครงสร้าง</span>
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
                  <p className="text-[10px] text-slate-300 font-sans tracking-normal leading-normal font-light">
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
  );
}
