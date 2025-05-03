
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

// Presale form schema
const presaleFormSchema = z.object({
  tokenAddress: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, {
      message: "Please enter a valid Ethereum address",
    }),
  tokenAmount: z
    .string()
    .regex(/^\d+(\.\d+)?$/, { message: "Please enter a valid number" }),
  rate: z.string().regex(/^\d+(\.\d+)?$/, {
    message: "Please enter a valid rate (tokens per MATIC)",
  }),
  startDate: z.date({ required_error: "A start date is required" }),
  endDate: z.date({ required_error: "An end date is required" }),
  minContribution: z
    .string()
    .regex(/^\d+(\.\d+)?$/, { message: "Please enter a valid number" }),
  maxContribution: z
    .string()
    .regex(/^\d+(\.\d+)?$/, { message: "Please enter a valid number" }),
  softcap: z
    .string()
    .regex(/^\d+(\.\d+)?$/, { message: "Please enter a valid number" }),
  hardcap: z
    .string()
    .regex(/^\d+(\.\d+)?$/, { message: "Please enter a valid number" }),
});

type PresaleFormValues = z.infer<typeof presaleFormSchema>;

const Launchpad = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saleCreated, setSaleCreated] = useState(false);
  const [saleAddress, setSaleAddress] = useState("");

  const form = useForm<PresaleFormValues>({
    resolver: zodResolver(presaleFormSchema),
    defaultValues: {
      tokenAddress: "",
      tokenAmount: "",
      rate: "",
      minContribution: "0.1",
      maxContribution: "10",
      softcap: "",
      hardcap: "",
    },
  });

  const onSubmit = (data: PresaleFormValues) => {
    setIsSubmitting(true);
    console.log("Form submitted with data:", data);
    
    // Simulate API call
    setTimeout(() => {
      // This would be a call to the smart contract in a real implementation
      const mockSaleAddress = `0x${Array(40)
        .fill(0)
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join("")}`;
        
      setSaleAddress(mockSaleAddress);
      setSaleCreated(true);
      setIsSubmitting(false);
      toast.success("Presale created successfully!");
    }, 2000);
  };

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-2xl purple-gradient-text">Create Token Sale</CardTitle>
        <CardDescription>
          Launch your token with a customizable presale campaign
        </CardDescription>
      </CardHeader>

      <CardContent>
        {saleCreated ? (
          <div className="space-y-4 py-4">
            <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4">
              <h3 className="font-semibold text-green-800 dark:text-green-300">
                Presale Created Successfully!
              </h3>
              <p className="mt-2 text-sm text-green-700 dark:text-green-400">
                Your token presale has been created on Polygon network
              </p>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Sale Address:</span>
                <code className="bg-muted p-1 rounded text-xs font-mono">
                  {saleAddress}
                </code>
              </div>

              <div className="flex space-x-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(saleAddress);
                    toast.success("Address copied to clipboard");
                  }}
                >
                  Copy Sale Address
                </Button>
                <Button
                  className="bg-polygon hover:bg-polygon-dark"
                  onClick={() => window.location.href = "/projects"}
                >
                  View Project Page
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
                      <Input
                        placeholder="0x..."
                        {...field}
                      />
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
                      <FormLabel>Token Amount for Sale</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rate (Tokens per MATIC)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Sale Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Sale End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date <
                              (form.getValues("startDate") || new Date())
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="minContribution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Min Contribution (MATIC)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maxContribution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Contribution (MATIC)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="softcap"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Soft Cap (MATIC)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Minimum goal to be raised
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hardcap"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hard Cap (MATIC)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>Maximum amount to raise</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-polygon hover:bg-polygon-dark"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Sale...
                  </>
                ) : (
                  "Create Token Sale"
                )}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
      
      <CardFooter className="bg-muted/30 flex flex-col items-start">
        <p className="text-xs text-muted-foreground">
          Note: Creating a presale requires MATIC for transaction fees. Make sure
          you have approved token transfers for the launchpad contract.
        </p>
      </CardFooter>
    </Card>
  );
};

export default Launchpad;
