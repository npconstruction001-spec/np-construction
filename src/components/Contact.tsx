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
          <div className="lg:col-span-2 bg-navy-dark text-white p-12">
            <h2 className="text-3xl mb-8 font-title font-tech">ข้อมูลติดต่อ</h2>
            <p className="text-slate-400 mb-12 font-sans font-light">
              ยินดีให้คำปรึกษาและเสนอราคาสำหรับทุกโครงการก่อสร้างและงานระบบวิศวกรรม
            </p>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-navy-light flex items-center justify-center text-gold">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="block font-bold text-gold text-xs uppercase mb-1 font-tech">Office Address</span>
                  <p className="text-sm font-sans">ทั่วราชอาณาจักรไทย</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-navy-light flex items-center justify-center text-gold">
                  <Phone size={20} />
                </div>
                <div>
                  <span className="block font-bold text-gold text-xs uppercase mb-1 font-tech">Phone Number</span>
                  <p className="text-sm font-sans">0934788375</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-navy-light flex items-center justify-center text-gold">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="block font-bold text-gold text-xs uppercase mb-1 font-tech">Email Address</span>
                  <p className="text-sm font-sans">noon0925135779@gamil.com</p>
                </div>
              </div>
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
