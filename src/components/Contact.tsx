import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Contact() {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("ได้รับข้อมูลความต้องการและงบประมาณเรียบร้อยแล้วค่ะ! ทีมงานสำนักงานวิศวกรรม เอ็นพี จะติดต่อกลับโดยเร็วที่สุด ⏱️");
  };

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white shadow-2xl rounded-sm overflow-hidden grid grid-cols-1 lg:grid-cols-5">
          <div className="lg:col-span-2 bg-navy-dark text-white p-10 flex flex-col justify-between space-y-8">
            <div>
              <h2 className="text-3xl mb-4 font-title font-tech uppercase tracking-tight text-white">ข้อมูลการติดต่อ</h2>
              <div className="w-12 h-1 bg-gold mb-6"></div>
              <p className="text-slate-400 text-xs mb-8 font-sans font-light leading-relaxed">
                หจก. เอ็นพี คอนดักชั่น ยินดีให้บริการประเมินราคางานและประสานงานวิศวกรรมสากลทั้งภาครัฐและเอกชน ทั่วประเทศไทย
              </p>
              
              <div className="space-y-6">
                {/* Headquarters */}
                <div className="flex items-start gap-3 border-b border-white/5 pb-4">
                  <div className="w-8 h-8 rounded-full bg-navy-light flex items-center justify-center text-gold flex-shrink-0 mt-0.5">
                    <MapPin size={15} />
                  </div>
                  <div className="text-xs">
                    <span className="block font-bold text-gold uppercase tracking-wider mb-1 font-tech">หจก. เอ็นพี คอนดักชั่น (สำนักงานใหญ่)</span>
                    <p className="font-sans leading-relaxed text-slate-300">
                      เลขที่ 59 หมู่ที่ 3 ตำบลชำยาง อำเภอสีชมพู จังหวัดขอนแก่น 40220
                    </p>
                    <p className="font-mono text-slate-400 mt-1">
                      เลขประจำตัวผู้เสียภาษี: 0403568001698
                    </p>
                  </div>
                </div>

                {/* Branch 1 */}
                <div className="flex items-start gap-3 border-b border-white/5 pb-4">
                  <div className="w-8 h-8 rounded-full bg-navy-light flex items-center justify-center text-gold flex-shrink-0 mt-0.5">
                    <MapPin size={15} />
                  </div>
                  <div className="text-xs">
                    <span className="block font-bold text-gold uppercase tracking-wider mb-1 font-tech">หจก. เอ็นพี คอนดักชั่น (สาขาที่ 1)</span>
                    <p className="font-sans leading-relaxed text-slate-300">
                      เลขที่ 588/2 ถนนหทัยราษฎร์ แขวงสามวาตะวันตก เขตคลองสามวา กรุงเทพมหานคร 10510
                    </p>
                  </div>
                </div>

                {/* Hotline Phones */}
                <div className="flex items-start gap-3 border-b border-white/5 pb-4">
                  <div className="w-8 h-8 rounded-full bg-navy-light flex items-center justify-center text-gold flex-shrink-0 mt-0.5">
                    <Phone size={15} />
                  </div>
                  <div className="text-xs">
                    <span className="block font-bold text-gold uppercase tracking-wider mb-1 font-tech">ช่องทางติดต่อสายด่วน</span>
                    <p className="font-sans text-slate-300 hover:text-gold transition-colors">
                      <a href="tel:093-478-8375" className="font-semibold block font-mono">📞 093-478-8375</a>
                      <a href="tel:097-987-9201" className="font-semibold block font-mono mt-0.5">📞 097-987-9201</a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-navy-light flex items-center justify-center text-gold flex-shrink-0 mt-0.5">
                    <Mail size={15} />
                  </div>
                  <div className="text-xs">
                    <span className="block font-bold text-gold uppercase tracking-wider mb-1 font-tech">อีเมลประสานงานกลาง</span>
                    <p className="font-sans text-slate-300 block font-mono hover:text-gold">
                      <a href="mailto:noon0925135779@gmail.com">noon0925135779@gmail.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/5 pt-6 text-[10px] text-slate-500 font-mono flex flex-col gap-1">
              <span>NP CONDUCTION CO., LTD. PARTNERSHIP</span>
              <span>2026 OVERHAUL SPECIFICATION SYSTEM</span>
            </div>
          </div>

          <div className="lg:col-span-3 p-12">
            <h2 className="text-3xl mb-8 font-title text-navy-dark font-tech">ส่งข้อความถึงเรา</h2>
            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2 font-sans">
                <label className="text-xs font-bold uppercase text-slate-500">ชื่อ-นามสกุล</label>
                <input type="text" required className="bg-slate-55 border border-slate-200 p-4 outline-none focus:border-gold transition-colors bg-slate-50 rounded-sm" placeholder="ระบุชื่อของคุณ" />
              </div>
              <div className="flex flex-col gap-2 font-sans">
                <label className="text-xs font-bold uppercase text-slate-500">เบอร์โทรศัพท์</label>
                <input type="tel" required className="bg-slate-55 border border-slate-200 p-4 outline-none focus:border-gold transition-colors bg-slate-50 rounded-sm" placeholder="08xxxxxxx" />
              </div>
              <div className="md:col-span-2 flex flex-col gap-2 font-sans">
                <label className="text-xs font-bold uppercase text-slate-500">อีเมล</label>
                <input type="email" required className="bg-slate-55 border border-slate-200 p-4 outline-none focus:border-gold transition-colors bg-slate-50 rounded-sm" placeholder="example@email.com" />
              </div>
              <div className="md:col-span-2 flex flex-col gap-2 font-sans">
                <label className="text-xs font-bold uppercase text-slate-500">ประเภทงาน / รายละเอียดเบื้องต้น</label>
                <textarea rows={4} id="contact-details" className="bg-slate-55 border border-slate-250 p-4 outline-none focus:border-gold transition-colors bg-slate-50 rounded-sm font-sans" placeholder="รายละเอียดโครงการ..."></textarea>
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="w-full bg-navy-dark text-white py-5 font-bold uppercase tracking-widest hover:bg-gold hover:text-navy-dark transition-all shadow-xl cursor-pointer rounded-sm font-tech">
                  ส่งข้อมูลเพื่อขอใบเสนอราคา
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
