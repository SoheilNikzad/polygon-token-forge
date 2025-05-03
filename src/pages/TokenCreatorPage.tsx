
import React from "react";
import TokenCreator from "@/components/TokenCreator";
import { Card } from "@/components/ui/card";

const TokenCreatorPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Create Your Token</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Deploy your own ERC20 token on the Polygon network with just a few clicks.
          No coding required.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <TokenCreator />
        </div>

        <div className="w-full lg:w-1/3 space-y-6">
          <Card className="p-5">
            <h3 className="text-lg font-medium mb-3">Token Creation Guide</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li>Enter your token name and symbol</li>
              <li>Set token decimals (default: 18)</li>
              <li>Define the total supply</li>
              <li>Choose network (testnet/mainnet)</li>
              <li>Connect your wallet and create token</li>
            </ol>
          </Card>

          <Card className="p-5">
            <h3 className="text-lg font-medium mb-3">What's Next?</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Create a presale for your token</li>
              <li>Add liquidity and list on QuickSwap</li>
              <li>Lock your liquidity for added security</li>
              <li>Market your token to potential investors</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TokenCreatorPage;
