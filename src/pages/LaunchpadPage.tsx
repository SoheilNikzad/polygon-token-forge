
import React from "react";
import Launchpad from "@/components/Launchpad";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LaunchpadPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Token Launchpad</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Create a token sale to distribute your token and raise funds for your project.
          Choose between different launch options to suit your needs.
        </p>
      </div>

      <Tabs defaultValue="standard" className="w-full">
        <div className="flex justify-center mb-6">
          <TabsList>
            <TabsTrigger value="standard">Standard Sale</TabsTrigger>
            <TabsTrigger value="fair">Fair Launch</TabsTrigger>
            <TabsTrigger value="dutch">Dutch Auction</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="standard" className="mt-0">
          <div className="flex justify-center">
            <Launchpad />
          </div>
        </TabsContent>
        
        <TabsContent value="fair" className="mt-0">
          <div className="max-w-3xl mx-auto text-center bg-muted rounded-lg p-8">
            <h3 className="text-xl font-medium mb-2">Fair Launch</h3>
            <p className="text-muted-foreground mb-4">
              Fair launch option allows all participants to buy tokens at the same price without 
              any privileged allocations.
            </p>
            <p className="text-sm">Coming soon...</p>
          </div>
        </TabsContent>
        
        <TabsContent value="dutch" className="mt-0">
          <div className="max-w-3xl mx-auto text-center bg-muted rounded-lg p-8">
            <h3 className="text-xl font-medium mb-2">Dutch Auction</h3>
            <p className="text-muted-foreground mb-4">
              Dutch auction starts at a higher price and gradually decreases until all tokens are sold,
              ensuring fair price discovery.
            </p>
            <p className="text-sm">Coming soon...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LaunchpadPage;
