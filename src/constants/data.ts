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
    title: "งานโครงการภาครัฐและงานโครงสร้างพื้นฐาน",
    description: "บริการรับเหมาก่อสร้าง จัดซื้อจัดจ้าง และดำเนินการตามมาตรฐานข้อกำหนดของหน่วยงานราชการอย่างถูกต้อง โปร่งใส ตรวจสอบได้ทุกขั้นตอน",
    icon: Building2,
    details: ["ประมูลประกวดงวดงานราชการ", "ก่อสร้างโครงสร้างพื้นฐานแกร่ง", "การจัดซื้อจัดจ้างโปร่งใสสากล"]
  },
  {
    title: "งานรับเหมาก่อสร้างทั่วไปและสถาปัตยกรรม",
    description: "รับสร้างอาคารพาณิชย์, สำนักงาน, คลังสินค้า, โรงงานอุตสาหกรรม และบ้านพักอาศัย ตั้งแต่โครงสร้างฐานรากจนถึงงานสถาปัตยกรรม",
    icon: Building2,
    details: ["อาคารสำนักงานและคลังสินค้า", "โรงงานและบ้านพักอาศัย", "สถาปัตยกรรมสเปซพรีเมียม"]
  },
  {
    title: "งานระบบวิศวกรรมครบวงจร",
    description: "ออกแบบและติดตั้งระบบไฟฟ้ากำลัง, ระบบประปา, ระบบสุขาภิบาล, และระบบปรับอากาศ (HVAC) สำหรับอาคารขนาดใหญ่และโรงงาน",
    icon: Wrench,
    details: ["ระบบไฟฟ้ากำลังและควบคุม MDB", "ระบบปรับอากาศ (HVAC)", "ระบบประปาและสุขาภิบาลยั่งยืน"]
  },
  {
    title: "งานปรับปรุง ซ่อมแซม และรีโนเวท",
    description: "งานปรับปรุงโครงสร้างอาคารเก่าให้มีความแข็งแรงปลอดภัย และงานบำรุงรักษาระบบวิศวกรรมตามรอบระยะเวลา",
    icon: Cpu,
    details: ["เสริมความแข็งแกร่งโครงสร้างเก่า", "รีโนเวทอาคารให้ใช้งานทันสมัย", "บำรุงรักษาระบบตามรอบวิศวกรรม"]
  }
];

export const PORTFOLIO: Project[] = [
  {
    title: "โครงการปรับปรุงอาคารอเนกประสงค์ส่วนราชการ",
    category: "งานโครงการภาครัฐ/ราชการ",
    image: imgTescoLotus,
    fallback: imgTescoLotus,
    details: "งานก่อสร้างปรับปรุงห้องประชุมสัมมนาและงานระบบส่องสว่างประหยัดพลังงาน ส่วนจัดหาอุปกรณ์ตามความปลอดภัยและมาตรฐานกระทรวงแรงงานอย่างระมัดระวัง สูงสุดในระยะการทดสอบระบบ",
    location: "ทั่วประเทศไทย",
    duration: "65 วัน",
    year: "พ.ศ. 2568",
    scope: ["งานบูรณาสปริงเกอร์ดับเพลิงสากล", "งานเดินท่อและระบบแสงสว่างแบบประหยัดไฟ LED", "งานจัดหาจัดซื้อโปร่งใสงวดหน่วยรัฐ"],
    gallery: [
      imgTescoLotus,
      imgBannerLeft,
      imgAbout
    ]
  },
  {
    title: "ร้านคาเฟ่อเมซอน สาขา หทัยราษฎร์ 46 (โครงการหทัยพฤกษ์ marketplace)",
    category: "งานอาคารและโครงสร้างเอกชน",
    image: imgCafeAmazon,
    fallback: imgCafeAmazon,
    details: "งานก่อสร้างอาคารเหล็กสำเร็จรูปหลังคาสูงโปร่งตามเอกลักษณ์แบรนด์ คาเฟ่ อเมซอน ตั้งแต่หล่อปูนฐานรากเสาเข็มลึก เชื่อมโครงสร้างเหล็ก งานป้ายและไฟสปอตไลท์ส่องแต่งโดยรอบ ตลอดจนวางระบบจ่ายไฟและท่อน้ำบริสุทธิ์สำหรับงานเครื่องชงกาแฟ",
    location: "หทัยราษฎร์ 46 กรุงเทพมหานคร",
    duration: "45 วัน",
    year: "พ.ศ. 2567",
    scope: ["งานบูรณาเสาเข็มและโครงสร้างตึกเหล็ก", "งานระบบสุขาภิบาลน้ำดื่มประปาประสิทธิภาพสูง", "งานวิศวกรรมไฟฟ้าแรงดันต่ำและติดตั้งโคมประดับตกแต่ง"],
    gallery: [
      imgCafeAmazon,
      imgBannerRight,
      imgPowerPlant
    ]
  },
  {
    title: "ตึกอาคารสำนักงานประหยัดพลังงาน",
    category: "งานอาคารและโครงสร้างเอกชน",
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
    title: "โครงการปรับปรุงระบบไฟฟ้าโรงไฟฟ้าสากล",
    category: "งานระบบวิศวกรรมและไฟฟ้า",
    image: imgPowerPlant,
    fallback: imgPowerPlant,
    details: "บำรุงรักษาและติดตั้งชุดสถานีย่อยแรงดันสูง 22kV ติดตั้งตู้สวิตชิ่งพาวเวอร์วงจรหลัก (MDB Panels) บัสบาร์ ตลอดจนถาดรองรับสายไฟกันอัคคีภัย เพื่อป้อนพลังงานส่งต่อไปยังสายกำลังไฟกำลังสูงได้เสถียรภาพไร้รอยต่อ",
    location: "อำเภอเมือง จังหวัดระยอง",
    duration: "120 วัน",
    year: "พ.ศ. 2566",
    scope: ["งานลากสายเคเบิลระบบกำลังไฟแรงดัน 22kV ใต้ดิน", "งานบำรุงเปลี่ยนตู้แผงสเกล MDB ขนาด 2.5 MVA", "งานบูรณาห้องควบคุมกระแสแรงและคอนโซลหน้าสัมผัสดิจิทัล"],
    gallery: [
      imgPowerPlant,
      imgBannerLeft,
      imgAirAndElec
    ]
  }
];
