import { 
  Building2, 
  Zap, 
  Wrench, 
  Cpu 
} from "lucide-react";
import { Service, Project } from "../types";

import imgTescoLotus from "../assets/images/regenerated_image_1779243353442.jpg";
import imgCafeAmazon from "../assets/images/regenerated_image_1779243348101.jpg";
import imgAirAndElec from "../assets/images/regenerated_image_1779243350161.jpg";
import imgPowerPlant from "../assets/images/regenerated_image_1779243351642.jpg";
import imgBannerLeft from "../assets/images/banner_left_engineers_uniform_1779252458151.png";
import imgBannerRight from "../assets/images/banner_right_workers_uniform_1779252795939.png";
import imgAbout from "../assets/images/regenerated_image_1779258325604.png";

export {
  imgTescoLotus,
  imgCafeAmazon,
  imgAirAndElec,
  imgPowerPlant,
  imgBannerLeft,
  imgBannerRight,
  imgAbout
};

export const NAV_LINKS = [
  { name: "หน้าแรก", href: "#home" },
  { name: "เกี่ยวกับเรา", href: "#about" },
  { name: "บริการของเรา", href: "#services" },
  { name: "ผลงานโครงการ", href: "#portfolio" },
  { name: "ติดต่อเรา", href: "#contact" },
];

export const SERVICES: Service[] = [
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

export const PORTFOLIO: Project[] = [
  {
    title: "เทสโก้ โลตัส (สาขาลพบุรี)",
    category: "งาน Facade",
    image: imgTescoLotus,
    fallback: imgTescoLotus,
    details: "โครงการปรับปรุงและติดตั้งระบบปรับอากาศอาคารขนาดใหญ่ (HVAC) ระบบท่อระบายลม งานสปริงเกลอร์ป้องกันอัคคีภัย และนำแผงวงจรสวิตช์จ่ายกำลังไฟฟ้า MDB เข้าประจำจุดตามมาตรฐานความปลอดภัยระดับสากล",
    location: "จังหวัดลพบุรี",
    duration: "65 วัน",
    year: "พ.ศ. 2566",
    scope: ["งานติดตั้งระบบไฟฟ้าส่องสว่างและกำลัง", "งานเดินระบบท่อปรับอากาศแยกส่วน (HVAC Split Systems)", "งานตกแต่งสถาปัตยกรรมภายใน (Interior Architecture Fit-out)"],
    gallery: [
      imgTescoLotus,
      imgBannerLeft,
      imgAbout
    ]
  },
  {
    title: "ร้านคาเฟ่อเมซอน สาขา หทัยราษฎร์ 46 (โครงการหทัยพฤกษ์ marketplace)",
    category: "งานรับเหมาสร้างร้านค้าเชิงพาณิชย์ (Commercial Store Construction)",
    image: imgCafeAmazon,
    fallback: imgCafeAmazon,
    details: "งานก่อสร้างอาคารเหล็กสำเร็จรูปหลังคาสูงโปร่งตามเอกลักษณ์แบรนด์ คาเฟ่ อเมซอน ตั้งแต่หล่อปูนฐานรากเสาเข็มลึก เชื่อมโครงสร้างเหล็ก งานป้ายและไฟสปอตไลท์ส่องแต่งโดยรอบ ตลอดจนวางระบบจ่ายไฟและท่อน้ำบริสุทธิ์สำหรับงานเครื่องชงกาแฟ",
    location: "หทัยราษฎร์ 46 กรุงเทพมหานคร",
    duration: "45 วัน",
    year: "พ.ศ. 2567",
    scope: ["งานบูรณาการเสาเข็มและโครงสร้างตึกเหล็ก", "งานระบบสุขาภิบาลน้ำดื่มประปาประสิทธิภาพสูง", "งานวิศวกรรมไฟฟ้าแรงดันต่ำและติดตั้งโคมประดับตกแต่ง"],
    gallery: [
      imgCafeAmazon,
      imgBannerRight,
      imgPowerPlant
    ]
  },
  {
    title: "ตึกอาคารสำนักงานประหยัดพลังงาน",
    category: "งานระบบปรับอากาศและไฟฟ้า",
    image: imgAirAndElec,
    fallback: imgAirAndElec,
    details: "ออกแบบและเปลี่ยนระบบชิลเลอร์ทำความเย็นและสารแปรผันอัจฉริยะ (Variable Speed Condenser Unit) ในตึกออฟฟิศขนาด 5 ชั้น พร้อมเชื่อมต่อระบบตรวจสแกนปริมาณผู้ใช้อาคารแผงอุณหภูมิเพื่อประหยัดเชื้อเพลิงได้มากกว่า 30%",
    location: "เขตจตุจักร กรุงเทพมหานคร",
    duration: "90 วัน",
    year: "พ.ศ. 2565",
    scope: ["งานติดตั้งระบบควบคุม Variable Frequency Drive", "งานเดินวางช่องทางดักท์กระจายลมอัจฉริยะ", "งานเชื่อมต่อเครือข่ายเซ็นเซอร์ประหยัดพลังงาน IoT"],
    gallery: [
      imgAirAndElec,
      imgTescoLotus,
      imgAbout
    ]
  },
  {
    title: "โครงการปรับปรุงระบบไฟฟ้าโรงไฟฟ้า",
    category: "งานระบบวิศวกรรมไฟฟ้า",
    image: imgPowerPlant,
    fallback: imgPowerPlant,
    details: "บำรุงรักษาและติดตั้งชุดสถานีย่อยแรงดันสูง 22kV ติดตั้งตู้สวิตชิ่งพาวเวอร์วงจรหลัก (MDB Panels) บัสบาร์ ตลอดจนถาดรองรับสายไฟกันอัคคีภัย เพื่อป้อนพลังงานส่งต่อไปยังสายกำลังไฟกำลังสูงได้เสถียรภาพไร้รอยต่อ",
    location: "อำเภอเมือง จังหวัดระยอง",
    duration: "120 วัน",
    year: "พ.ศ. 2566",
    scope: ["งานลากสายเคเบิลระบบกำลังไฟแรงดัน 22kV ใใต้ดิน", "งานบำรุงเปลี่ยนตู้แผงสเกล MDB ขนาด 2.5 MVA", "งานบูรณาห้องควบคุมกระแสแรงและคอนโซลหน้าสัมผัสดิจิทัล"],
    gallery: [
      imgPowerPlant,
      imgBannerLeft,
      imgAirAndElec
    ]
  }
];
