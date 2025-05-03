
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LinkedIn, Github, MessageCircle, Instagram, Facebook, Link } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <Card className="max-w-md w-full p-8 shadow-lg">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">سهیل نیک‌زاد</h1>
            <h2 className="text-xl text-muted-foreground">Soheil Nikzad</h2>
          </div>
          
          <p className="text-right text-lg">
            سلام! به صفحه شخصی من خوش آمدید. برای دسترسی به پروفایل های من در شبکه های اجتماعی و پروژه توکن فکتوری، روی دکمه های زیر کلیک کنید.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="flex justify-center items-center gap-2" onClick={() => window.open("https://www.linkedin.com/in/soheilnikzad/", "_blank")}>
              <LinkedIn className="h-5 w-5" />
              <span>LinkedIn</span>
            </Button>
            
            <Button variant="outline" className="flex justify-center items-center gap-2" onClick={() => window.open("https://github.com/SoheilNikzad", "_blank")}>
              <Github className="h-5 w-5" />
              <span>GitHub</span>
            </Button>
            
            <Button variant="outline" className="flex justify-center items-center gap-2" onClick={() => window.open("https://t.me/SoheilNikzad", "_blank")}>
              <MessageCircle className="h-5 w-5" />
              <span>Telegram</span>
            </Button>
            
            <Button variant="outline" className="flex justify-center items-center gap-2" onClick={() => window.open("https://www.instagram.com/amuzanjirbaaf/", "_blank")}>
              <Instagram className="h-5 w-5" />
              <span>Instagram</span>
            </Button>
            
            <Button variant="outline" className="flex justify-center items-center gap-2" onClick={() => window.open("https://www.facebook.com/mirsoheilnikzad/", "_blank")}>
              <Facebook className="h-5 w-5" />
              <span>Facebook</span>
            </Button>
            
            <Button className="bg-polygon hover:bg-polygon-dark text-white col-span-2 flex justify-center items-center gap-2" onClick={() => window.location.href = "/token-creator"}>
              <Link className="h-5 w-5" />
              <span>Token Factory Lab</span>
            </Button>
          </div>
          
          <p className="text-right text-sm text-muted-foreground pt-4">
            با تشکر از بازدید شما. برای ارتباط با من می‌توانید از طریق شبکه‌های اجتماعی اقدام کنید.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Index;
