
import React from "react";
import ListingForm from "@/components/ListingForm";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDownUp } from "lucide-react";

const TokenListingPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">List on DEX</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Add liquidity to your token and make it tradable on QuickSwap, 
          the leading decentralized exchange on Polygon
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <ListingForm />
        </div>

        <div className="w-full lg:w-1/3 space-y-6">
          <Card className="p-5">
            <h3 className="text-lg font-medium mb-3">What is DEX Listing?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Adding liquidity to a decentralized exchange (DEX) enables users to trade your token. 
              It requires pairing your token with MATIC to create a liquidity pool.
            </p>
            <div className="bg-muted p-3 rounded-md">
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">YOUR TOKEN</div>
                  <div className="font-medium">1000 TKN</div>
                </div>
                <ArrowDownUp className="mx-6 text-muted-foreground" />
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">MATIC</div>
                  <div className="font-medium">10 MATIC</div>
                </div>
              </div>
              <div className="text-xs text-center mt-3 text-muted-foreground">
                Initial Price: 0.01 MATIC per TKN
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="text-lg font-medium mb-3">Listing Recommendations</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Ensure you have approved token transfers for the DEX router</li>
              <li>Provide sufficient liquidity for healthy trading</li>
              <li>Consider locking liquidity to build investor trust</li>
              <li>The higher the liquidity, the lower the price impact on trades</li>
              <li>After listing, share your token on social media to build awareness</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TokenListingPage;
