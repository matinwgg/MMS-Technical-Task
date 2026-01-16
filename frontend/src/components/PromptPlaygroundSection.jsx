"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Dialog, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { PencilLine } from "lucide-react"
import placeholderImg from "../assets/images/empty.png"

export default function PromptPlaygroundSection({ selectedPrompt }) {

  const getWebsiteFromName = (name) => {
    if (!name) return "";
    return (
      "www." +
      name
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .trim()
        .replace(/\s+/g, "") +
      ".com"
    );
  };

  return (
    <Card className="border border-border shadow-sm h-full flex flex-col w-full">
      <CardHeader className="border-b border-border flex justify-between items-center">
        {/* Left: Title + Description */}
        <div className="flex flex-col">
          <CardTitle className="font-brighter text-xl">{selectedPrompt?.name ?? "Select a merchant"}</CardTitle>
          <CardDescription className="font-noto">
            {selectedPrompt ? "High scoring merchant" : "No merchant selected"}
          </CardDescription>
        </div>

        {/* Right: Button */}
        {selectedPrompt && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="
                  bg-primary
                  text-primary-foreground
                  gap-2
                  cursor-pointer
                  transition-opacity
                  duration-150
                  hover:opacity-90
                  active:opacity-80
                "
              >
                <PencilLine size={16} />
                Update Merchant details
              </Button>
            </DialogTrigger>
          </Dialog>
        )}
      </CardHeader>

      <CardContent className="flex-1 w-full h-full px-0 py-0">
        {selectedPrompt ? (
          <div className="space-y-4 bg-muted rounded-lg p-4 border border-border">
            {/* Business Details Grid */}
            <div className="grid grid-cols-2 gap-3 text-sm mb-4">
              <div>
                <p className="font-poppins font-regular text-muted-foreground text-xs uppercase tracking-wide">Business Type</p>
                <p className="font-semibold text-foreground">{selectedPrompt?.businessType}</p>
              </div>
              <div>
                <p className="font-poppins font-regular text-muted-foreground text-xs uppercase tracking-wide">Industry</p>
                <p className="font-semibold text-foreground font-medium">{selectedPrompt?.industry}</p>
              </div>
              <div>
                <p className="font-poppins font-regular text-muted-foreground text-xs uppercase tracking-wide">Location</p>
                <p className="font-semibold text-foreground font-medium">{selectedPrompt?.country}</p>
              </div>
              <div>
                <p className="font-poppins font-regular text-muted-foreground text-xs uppercase tracking-wide">Tax ID</p>
                <p className="font-semibold text-foreground font-medium">{selectedPrompt?.taxId}</p>
              </div>
            </div>

            {/* Contact & Financial Info */}
            <div className="border-t border-border pt-3 mb-4">
              <p className="font-poppins font-regular text-xs uppercase tracking-wide text-muted-foreground mb-2">Contact & Payment</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="font-poppins font-light text-muted-foreground text-xs">Primary Contact</p>
                  <p className="font-poppins font-regular text-foreground">{selectedPrompt?.primaryContact}</p>
                </div>
                <div>
                  <p className="font-poppins font-light text-muted-foreground text-xs">Website</p>
                  <p className="text-foreground text-xs truncate">
                    {getWebsiteFromName(selectedPrompt?.businessName)}
                  </p>
                </div>
                <div>
                  <p className="font-poppins font-light text-muted-foreground text-xs">Payment Methods</p>
                  <p className="text-foreground text-xs">{selectedPrompt?.paymentMethods}</p>
                </div>
                <div>
                  <p className="font-poppins font-light text-muted-foreground text-xs">Billing Cycle</p>
                  <p className="text-foreground">{selectedPrompt?.billingCycle}</p>
                </div>
              </div>
            </div>

            {/* Verification Status */}
            <div className="border-t border-border pt-3 mb-4">
              <p className="font-poppins font-light  text-xs uppercase tracking-wide text-muted-foreground mb-2">Verification</p>
              <div className="flex flex-wrap gap-5">
                <Badge className={`${
                  selectedPrompt?.emailx === "verified" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }`}>
                  {selectedPrompt?.emailx === "verified" ? "✓ Email" : "○ Email"}
                </Badge>
                <Badge className={`${
                  selectedPrompt?.phonex === "verified" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }`}>
                  {selectedPrompt?.phonex === "verified" ? "✓ Phone" : "○ Phone"}
                </Badge>
                <Badge className="bg-blue-100 text-blue-800">KYC: {selectedPrompt?.kycStatus}</Badge>
              </div>
            </div>

            {/* Activity Metrics */}
            <div className="border-t border-border pt-3">
              <p className="font-poppins font-light text-xs uppercase tracking-wide text-muted-foreground mb-2">
                Activity Metrics
              </p>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-poppins font-light  text-muted-foreground text-xs">Total Sales</p>
                  <p className="text-foreground font-semibold">{selectedPrompt?.totalSales}</p>
                </div>

                <div>
                  <p className="font-poppins font-light  text-muted-foreground text-xs">Customers</p>
                  <p className="text-foreground font-semibold">{selectedPrompt?.customerCount}</p>
                </div>

                <div>
                  <p className="font-poppins font-light  text-muted-foreground text-xs">Avg Order Value</p>
                  <p className="text-foreground font-semibold">{selectedPrompt?.aov}</p>
                </div>

                <div>
                  <p className="font-poppins font-light  text-muted-foreground text-xs">Rating</p>
                  <p className="text-foreground font-semibold">{selectedPrompt?.rating}/5</p>
                </div>

                <div>
                  <p className="font-poppins font-light  text-muted-foreground text-xs">Active Products</p>
                  <p className="text-foreground font-semibold">{selectedPrompt?.activeListings}</p>
                </div>

                <div>
                  <p className="font-poppins font-light  text-muted-foreground text-xs">Last Order</p>
                  <p className="text-foreground font-semibold">{selectedPrompt?.lastOrder}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            {/* Placeholder Image */}
            <img
              src={placeholderImg} 
              alt="Select a merchant"
              className="w-100 h-100 object-contain opacity-70"
            />
            <p className="text-muted-foreground text-center">Select a merchant to view details</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
