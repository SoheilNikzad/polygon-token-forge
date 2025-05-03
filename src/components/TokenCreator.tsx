
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { HelpCircle, CheckCircle2, Loader2 } from "lucide-react";
import { createToken, switchToPolygon } from "@/services/web3Service";
import { toast } from "sonner";

// Token creation schema
const tokenFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Token name must be at least 3 characters" })
    .max(50, { message: "Token name must not exceed 50 characters" }),
  symbol: z
    .string()
    .min(1, { message: "Symbol is required" })
    .max(10, { message: "Symbol must not exceed 10 characters" })
    .regex(/^[A-Z0-9]+$/, {
      message: "Symbol must contain only uppercase letters and numbers",
    }),
  decimals: z
    .number()
    .int()
    .min(0, { message: "Decimals must be a non-negative number" })
    .max(18, { message: "Decimals cannot exceed 18" }),
  totalSupply: z
    .string()
    .regex(/^\d+(\.\d+)?$/, {
      message: "Total supply must be a positive number",
    }),
});

type TokenFormValues = z.infer<typeof tokenFormSchema>;

const TokenCreator = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [tokenAddress, setTokenAddress] = useState<string | null>(null);
  const [isTestnet, setIsTestnet] = useState(true);

  const form = useForm<TokenFormValues>({
    resolver: zodResolver(tokenFormSchema),
    defaultValues: {
      name: "",
      symbol: "",
      decimals: 18,
      totalSupply: "1000000",
    },
  });

  const onSubmit = async (values: TokenFormValues) => {
    setIsCreating(true);

    try {
      // Switch to Polygon network first
      const switched = await switchToPolygon(isTestnet);
      if (!switched) {
        toast.error("Please connect to the Polygon network to continue");
        setIsCreating(false);
        return;
      }

      // Create token with provided values
      const address = await createToken(
        values.name,
        values.symbol,
        values.totalSupply,
        values.decimals
      );

      if (address) {
        setTokenAddress(address);
        toast.success("Token created successfully!");
      }
    } catch (error) {
      console.error("Token creation failed:", error);
      toast.error("Failed to create token");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl purple-gradient-text">Create Your Token</CardTitle>
        <CardDescription>
          Deploy your own ERC20 token on Polygon with just a few clicks
        </CardDescription>
      </CardHeader>
      <CardContent>
        {tokenAddress ? (
          <div className="space-y-4 py-4">
            <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4 flex items-center space-x-3">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
              <div>
                <h4 className="font-semibold">Token Created Successfully!</h4>
                <p className="text-sm mt-1">
                  Your token has been deployed to the Polygon{" "}
                  {isTestnet ? "Testnet" : "Mainnet"}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Token Address:</span>
                <span className="font-mono text-xs bg-muted p-1 rounded">
                  {tokenAddress}
                </span>
              </div>

              <div className="flex space-x-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(tokenAddress);
                    toast.success("Address copied to clipboard");
                  }}
                >
                  Copy Address
                </Button>
                <Button
                  onClick={() => {
                    window.open(
                      `https://${
                        isTestnet ? "mumbai." : ""
                      }polygonscan.com/token/${tokenAddress}`,
                      "_blank"
                    );
                  }}
                >
                  View on Explorer
                </Button>
              </div>
            </div>

            <Separator className="my-4" />

            <div>
              <h4 className="font-medium mb-2">Next Steps:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Create a token sale in the Launchpad section</li>
                <li>Add liquidity to decentralized exchanges</li>
                <li>Share your token with the community</li>
              </ul>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Token Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Example Token" {...field} />
                    </FormControl>
                    <FormDescription>
                      The full name of your token (e.g. "Polygon Token")
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="symbol"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Token Symbol</FormLabel>
                    <FormControl>
                      <Input placeholder="ETK" {...field} />
                    </FormControl>
                    <FormDescription>
                      A short identifier for your token (e.g. "MATIC")
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="decimals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        Decimals
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 ml-1 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p>
                                Number of decimal places for your token. Standard
                                is 18 (like ETH).
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="totalSupply"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Supply</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center space-x-2 my-4">
                <Button
                  type="button"
                  variant={isTestnet ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsTestnet(true)}
                  className={
                    isTestnet
                      ? "bg-polygon hover:bg-polygon-dark text-white"
                      : ""
                  }
                >
                  Testnet
                </Button>
                <Button
                  type="button"
                  variant={!isTestnet ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsTestnet(false)}
                  className={
                    !isTestnet
                      ? "bg-polygon hover:bg-polygon-dark text-white"
                      : ""
                  }
                >
                  Mainnet
                </Button>
                <span className="text-xs text-muted-foreground ml-2">
                  {isTestnet
                    ? "Use Mumbai testnet to try without real costs"
                    : "Use Polygon mainnet for production tokens"}
                </span>
              </div>

              <Button
                type="submit"
                disabled={isCreating}
                className="w-full bg-polygon hover:bg-polygon-dark"
              >
                {isCreating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Token"
                )}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
      <CardFooter className="bg-muted/30 flex flex-col items-start">
        <p className="text-xs text-muted-foreground">
          Note: Token creation requires MATIC for transaction fees.{" "}
          {isTestnet && "Use the Mumbai faucet to get test MATIC."}
        </p>
      </CardFooter>
    </Card>
  );
};

export default TokenCreator;
