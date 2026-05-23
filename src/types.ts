import { LucideIcon } from "lucide-react";

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  details: string[];
}

export interface Project {
  title: string;
  category: string;
  image: string;
  fallback: string;
  details?: string;
  location?: string;
  duration?: string;
  year?: string;
  scope?: string[];
  gallery?: string[];
}

export interface VideoItem {
  title: string;
  subtitle: string;
  videoUrl: string;
}
