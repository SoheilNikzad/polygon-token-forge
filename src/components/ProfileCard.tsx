
import React from "react";
import { Card } from "@/components/ui/card";
import SocialLinks from "./SocialLinks";

const ProfileCard: React.FC = () => {
  return (
    <Card className="max-w-md w-full p-8 shadow-lg">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">سهیل نیک‌زاد</h1>
          <h2 className="text-xl text-muted-foreground">Soheil Nikzad</h2>
        </div>
        
        <div className="space-y-4">
          <p className="text-right text-lg">
            سلام! به صفحه شخصی من خوش آمدید. برای دسترسی به پروفایل های من در شبکه های اجتماعی و پروژه توکن فکتوری، روی دکمه های زیر کلیک کنید.
          </p>
          
          <p className="text-left text-lg">
            Hello! Welcome to my personal page. To access my social media profiles and the Token Factory project, please click on the buttons below.
          </p>
        </div>
        
        <SocialLinks />
        
        <div className="space-y-2 pt-4">
          <p className="text-right text-sm text-muted-foreground">
            با تشکر از بازدید شما. برای ارتباط با من می‌توانید از طریق شبکه‌های اجتماعی اقدام کنید.
          </p>
          
          <p className="text-left text-sm text-muted-foreground">
            Thank you for visiting. To contact me, please use one of the social media channels above.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
