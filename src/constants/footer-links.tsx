import {
  FacebookIcon,
  InstagramIcon,
  PinterestIcon,
  TwitterIcon,
} from "@/features";
import { StaticImageData } from "next/image";
import { ReactNode } from "react";

interface LinkItem {
  name: string;
  href: string;
}

interface SocialMediaItem {
  icon: ReactNode;
  href: string;
}

interface PaymentIcon {
  src: StaticImageData;
  alt: string;
}

export const quickLinks: LinkItem[] = [
  { name: "Home", href: "#" },
  { name: "Shop", href: "#" },
  { name: "Product", href: "#" },
  { name: "Articles", href: "#" },
  { name: "Contact Us", href: "#" },
];

export const infoLinks: LinkItem[] = [
  { name: "Shipping Policy", href: "#" },
  { name: "Return & Refund", href: "#" },
  { name: "Support", href: "#" },
  { name: "FAQs", href: "#" },
];

export const socialMedia: SocialMediaItem[] = [
  { icon: <FacebookIcon />, href: "#" },
  { icon: <TwitterIcon />, href: "#" },
  { icon: <PinterestIcon />, href: "#" },
  { icon: <InstagramIcon />, href: "#" },
];

export const paymentIcons: PaymentIcon[] = [];
