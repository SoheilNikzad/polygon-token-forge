
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, Box, Coins, Lock, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { initWeb3 } from "@/services/web3Service";

const Index = () => {
  useEffect(() => {
    // Initialize web3 connection when the component mounts
    const setup = async () => {
      await initWeb3();
    };
    setup();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/90 z-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#8247E5_0%,transparent_40%)]"></div>
        
        <div className="container relative z-10 mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Launch Your <span className="purple-gradient-text">Token</span> on{" "}
                <span className="purple-gradient-text">Polygon</span> in Minutes
              </h1>
              <p className="text-xl text-muted-foreground">
                Create, launch, and list your own token with our easy-to-use platform. 
                No coding required.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Button
                  as={Link}
                  to="/token-creator"
                  size="lg"
                  className="bg-polygon hover:bg-polygon-dark text-white font-medium"
                >
                  Create Token <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  as={Link}
                  to="/launchpad"
                  variant="outline"
                  size="lg"
                  className="border-polygon text-polygon hover:bg-polygon/10"
                >
                  Explore Projects
                </Button>
              </div>
            </div>
            
            <div className="relative lg:ml-10">
              <div className="glass-card p-6 md:p-8 max-w-md mx-auto lg:mx-0">
                <div className="absolute -top-3 -right-3 bg-polygon text-white text-xs px-3 py-1 rounded-full">
                  Polygon Network
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-polygon/20 flex items-center justify-center">
                      <Coins className="h-5 w-5 text-polygon" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Sample Token</h3>
                      <p className="text-xs text-muted-foreground">ERC-20 on Polygon</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-background rounded p-3">
                      <p className="text-xs text-muted-foreground">Supply</p>
                      <p className="font-medium">1,000,000 TKN</p>
                    </div>
                    <div className="bg-background rounded p-3">
                      <p className="text-xs text-muted-foreground">Presale Rate</p>
                      <p className="font-medium">100 TKN / MATIC</p>
                    </div>
                  </div>
                  
                  <div className="py-2">
                    <div className="w-full bg-muted rounded-full h-2 mb-1">
                      <div
                        className="bg-polygon h-2 rounded-full"
                        style={{ width: "65%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>65% Filled</span>
                      <span>195/300 MATIC</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="hidden lg:block absolute -bottom-10 -right-10 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 purple-gradient-text">
              Everything You Need to Launch a Token
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform provides all the tools needed to create and launch your token
              on Polygon blockchain, from token creation to DEX listing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature Card 1 */}
            <div className="bg-card shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                <Box className="h-6 w-6 text-polygon" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Token Creation</h3>
              <p className="text-muted-foreground">
                Create your own ERC20 token on Polygon with customizable parameters in just a few clicks.
              </p>
            </div>
            
            {/* Feature Card 2 */}
            <div className="bg-card shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                <BarChart2 className="h-6 w-6 text-polygon" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Token Sales</h3>
              <p className="text-muted-foreground">
                Launch your token with customizable presales and fair launches with detailed analytics.
              </p>
            </div>
            
            {/* Feature Card 3 */}
            <div className="bg-card shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                <Coins className="h-6 w-6 text-polygon" />
              </div>
              <h3 className="text-xl font-semibold mb-2">DEX Listing</h3>
              <p className="text-muted-foreground">
                Seamlessly add liquidity and list your token on QuickSwap, Polygon's leading DEX.
              </p>
            </div>
            
            {/* Feature Card 4 */}
            <div className="bg-card shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-polygon" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Liquidity Locking</h3>
              <p className="text-muted-foreground">
                Lock your liquidity to provide investors with confidence and security in your project.
              </p>
            </div>
            
            {/* Feature Card 5 */}
            <div className="bg-card shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-polygon" />
              </div>
              <h3 className="text-xl font-semibold mb-2">KYC & Audit</h3>
              <p className="text-muted-foreground">
                Optional KYC verification and smart contract audits to enhance your project's credibility.
              </p>
            </div>
            
            {/* Feature Card 6 */}
            <div className="bg-polygon shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-white">Ready to Launch?</h3>
              <p className="text-white/90 mb-4">
                Get started with creating your own token on Polygon in minutes.
              </p>
              <Button
                as={Link}
                to="/token-creator"
                variant="secondary"
                className="w-full"
              >
                Create Token
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-polygon-gradient text-white">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Launch Your Token?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-white/80">
            Join hundreds of projects that have successfully launched on our platform.
            Create your token, run a presale, and list on DEX - all in one place.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              as={Link}
              to="/token-creator"
              variant="secondary"
              size="lg"
              className="font-medium"
            >
              Launch Your Token
            </Button>
            <Button
              as={Link}
              to="/projects"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10 font-medium"
            >
              Explore Projects
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
