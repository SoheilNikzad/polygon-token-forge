
import React from "react";
import { Button } from "@/components/ui/button";
import { Linkedin, Github, MessageCircle, Instagram, Facebook, Link } from "lucide-react";

interface SocialLinkProps {
  icon: React.ReactNode;
  label: string;
  persianLabel: string;
  href: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ icon, label, persianLabel, href }) => {
  return (
    <Button 
      variant="outline" 
      className="flex justify-center items-center gap-2" 
      onClick={() => window.open(href, "_blank")}
    >
      {icon}
      <span className="flex flex-col items-center">
        <span>{label}</span>
        <span className="text-xs">{persianLabel}</span>
      </span>
    </Button>
  );
};

const SocialLinks: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <SocialLink 
        icon={<Linkedin className="h-5 w-5" />} 
        label="LinkedIn"
        persianLabel="لینکدین" 
        href="https://www.linkedin.com/in/soheilnikzad/" 
      />
      
      <SocialLink 
        icon={<Github className="h-5 w-5" />} 
        label="GitHub"
        persianLabel="گیت‌هاب" 
        href="https://github.com/SoheilNikzad" 
      />
      
      <SocialLink 
        icon={<MessageCircle className="h-5 w-5" />} 
        label="Telegram"
        persianLabel="تلگرام" 
        href="https://t.me/SoheilNikzad" 
      />
      
      <SocialLink 
        icon={<Instagram className="h-5 w-5" />} 
        label="Instagram"
        persianLabel="اینستاگرام" 
        href="https://www.instagram.com/amuzanjirbaaf/" 
      />
      
      <SocialLink 
        icon={<Facebook className="h-5 w-5" />} 
        label="Facebook"
        persianLabel="فیسبوک" 
        href="https://www.facebook.com/mirsoheilnikzad/" 
      />
      
      <Button 
        className="bg-polygon hover:bg-polygon-dark text-white col-span-2 flex justify-center items-center gap-2" 
        onClick={() => window.location.href = "/tokenfactory"}
      >
        <Link className="h-5 w-5" />
        <span className="flex flex-col items-center">
          <span>Token Factory Lab</span>
          <span className="text-xs">کارخانه توکن</span>
        </span>
      </Button>
    </div>
  );
};

export default SocialLinks;
