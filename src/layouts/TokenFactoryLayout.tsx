
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";

const TokenFactoryLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-muted py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 PolyLaunch. All rights reserved.</p>
          <p className="mt-2">
            Built for the Polygon network. Not affiliated with Polygon Labs.
          </p>
        </div>
      </footer>
    </>
  );
};

export default TokenFactoryLayout;
