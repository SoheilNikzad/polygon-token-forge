
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Wallet } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const { toast } = useToast();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        setWalletAddress(account);
        setIsConnected(true);
        toast({
          title: "Wallet Connected",
          description: `${account.slice(0, 6)}...${account.slice(-4)}`,
        });
      } catch (error) {
        console.error(error);
        toast({
          title: "Connection Failed",
          description: "Could not connect to wallet",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "MetaMask Not Found",
        description: "Please install MetaMask browser extension",
        variant: "destructive",
      });
    }
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Launch Token", path: "/token-creator" },
    { name: "Launchpad", path: "/launchpad" },
    { name: "Projects", path: "/projects" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-polygon-gradient flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="font-bold text-xl purple-gradient-text">PolyLaunch</span>
            </NavLink>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-polygon font-medium"
                      : "text-muted-foreground hover:text-polygon transition duration-150"
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <Button
              onClick={connectWallet}
              variant={isConnected ? "outline" : "default"}
              className={isConnected ? "border-polygon text-polygon" : "bg-polygon hover:bg-polygon-dark"}
            >
              <Wallet className="mr-2 h-4 w-4" />
              {isConnected ? truncateAddress(walletAddress) : "Connect Wallet"}
            </Button>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-polygon hover:bg-accent"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "block px-3 py-2 rounded-md text-base font-medium text-polygon bg-accent bg-opacity-30"
                    : "block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-polygon hover:bg-accent hover:bg-opacity-30"
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-border">
            <div className="px-2">
              <Button 
                onClick={connectWallet}
                variant={isConnected ? "outline" : "default"}
                className={`w-full ${isConnected ? "border-polygon text-polygon" : "bg-polygon hover:bg-polygon-dark"}`}
              >
                <Wallet className="mr-2 h-4 w-4" />
                {isConnected ? truncateAddress(walletAddress) : "Connect Wallet"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
