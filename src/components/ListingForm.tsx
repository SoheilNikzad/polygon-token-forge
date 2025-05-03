
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
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

// Form schema for DEX listing
const listingFormSchema = z.object({
  tokenAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, {
    message: "Please enter a valid token address",
  }),
  tokenAmount: z.string().regex(/^\d+(\.\d+)?$/, {
    message: "Please enter a valid token amount",
  }),
  maticAmount: z.string().regex(/^\d+(\.\d+)?$/, {
    message: "Please enter a valid MATIC amount",
  }),
});

type ListingFormValues = z.infer<typeof listingFormSchema>;

const ListingForm = () => {
  const [isListing, setIsListing] = useState(false);
  const [isListed, setIsListed] = useState(false);
  const [pairAddress, setPairAddress] = useState("");

  const form = useForm<ListingFormValues>({
    resolver: zodResolver(listingFormSchema),
    defaultValues: {
      tokenAddress: "",
      tokenAmount: "",
      maticAmount: "",
    },
  });

  const onSubmit = (data: ListingFormValues) => {
    setIsListing(true);
    console.log("Listing token with data:", data);

    // Simulate API call
    setTimeout(() => {
      // This would be a call to the DEX router contract in a real implementation
      const mockPairAddress = `0x${Array(40)
        .fill(0)
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join("")}`;

      setPairAddress(mockPairAddress);
      setIsListed(true);
      setIsListing(false);
      toast.success("Token liquidity added successfully!");
    }, 2000);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl purple-gradient-text">List on DEX</CardTitle>
        <CardDescription>
          Add liquidity to make your token tradable on QuickSwap
        </CardDescription>
      </CardHeader>

      <CardContent>
        {isListed ? (
          <div className="space-y-4 py-4">
            <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4">
              <h3 className="font-semibold text-green-800 dark:text-green-300">
                Liquidity Added Successfully!
              </h3>
              <p className="mt-2 text-sm text-green-700 dark:text-green-400">
                Your token is now tradable on QuickSwap
              </p>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Pair Address:</span>
                <code className="bg-muted p-1 rounded text-xs font-mono">
                  {pairAddress}
                </code>
              </div>

              <div className="flex space-x-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(pairAddress);
                    toast.success("Address copied to clipboard");
                  }}
                >
                  Copy Pair Address
                </Button>
                <Button
                  className="bg-polygon hover:bg-polygon-dark"
                  onClick={() =>
                    window.open(
                      `https://quickswap.exchange/#/swap?outputCurrency=${form.getValues().tokenAddress}`,
                      "_blank"
                    )
                  }
                >
                  View on QuickSwap
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="tokenAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Token Address</FormLabel>
                    <FormControl>
                      <Input placeholder="0x..." {...field} />
                    </FormControl>
                    <FormDescription>
                      The contract address of your ERC20 token
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="tokenAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Token Amount</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Amount of tokens to add as liquidity
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maticAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>MATIC Amount</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        MATIC to pair with your tokens
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="rounded-md bg-muted p-4">
                <h4 className="font-medium text-sm mb-2">Listing Information</h4>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>
                    Initial price will be{" "}
                    {form.watch("maticAmount") && form.watch("tokenAmount")
                      ? (
                          Number(form.watch("maticAmount")) /
                          Number(form.watch("tokenAmount"))
                        ).toFixed(6)
                      : "0"}{" "}
                    MATIC per token
                  </li>
                  <li>
                    Listing fee: 0.3% trading fee goes to liquidity providers
                  </li>
                  <li>
                    Your liquidity provider (LP) tokens will be sent to your
                    wallet
                  </li>
                </ul>
              </div>

              <Button
                type="submit"
                className="w-full bg-polygon hover:bg-polygon-dark"
                disabled={isListing}
              >
                {isListing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding Liquidity...
                  </>
                ) : (
                  "Add Liquidity & List Token"
                )}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>

      <CardFooter className="bg-muted/30 flex flex-col items-start">
        <p className="text-xs text-muted-foreground">
          Note: Adding liquidity pairs your token with MATIC, enabling trading on
          QuickSwap. You must approve the token before adding liquidity.
        </p>
      </CardFooter>
    </Card>
  );
};

export default ListingForm;
