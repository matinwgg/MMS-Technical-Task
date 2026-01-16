"use client"

import { useState, useEffect, useMemo } from "react"
import { getMerchants, createMerchant, updateMerchant, deleteMerchant } from "../api/merchantApi";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Badge } from "./ui/badge"
import { Plus, Edit, Copy, Search, Trash } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "./ui/dialog" // adjust path if needed
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage"
import MerchantForm from "./MerchantForm"
import EditMerchantForm from "./EditMerchantForm"

const SAMPLE_MERCHANTS = [
  { businessType: ["LLC", "Corporation", "Sole Proprietorship", "Partnership"] },
  { industry: ["Food & Beverage", "Retail", "E-commerce", "Hospitality"] },
  { emailx: ["verified", "unverified", "pending", "bounce"] },
  { phonex: ["verified", "unverified", "pending", "invalid"] },
  { kycStatus: ["Approved", "Pending", "Rejected", "Under Review"] },
  { totalSales: ["$125,000", "$89,500", "$230,000", "$15,300"] },
  { customerCount: [342, 128, 760, 54] },
  { lastOrder: ["2025-01-14", "2025-01-12", "2025-01-10", "2025-01-08"] },
  { address: ["123 Oak St, Portland, OR 97214", "456 Pine St, Seattle, WA 98101", "789 Maple Ave, Denver, CO 80203", "321 Elm St, Austin, TX 78701"] },
  { country: ["United States", "Canada", "United Kingdom", "Germany"] },
  { taxId: ["45-1234567", "67-9876543", "12-3456789", "98-7654321"] },
  { primaryContact: ["Sarah Mitchell", "John Doe", "Emily Clark", "Michael Brown"] },
  { website: ["www.artisancoffee.com", "www.brewedawakening.com", "www.beanandco.com", "www.dailygrind.com"] },
  { paymentMethods: ["Credit Card, PayPal, Bank Transfer", "Credit Card, Stripe", "PayPal, Bank Transfer", "Credit Card, Apple Pay, Google Pay"] },
  { currency: ["USD", "CAD", "GBP", "EUR"] },
  { billingCycle: ["Monthly", "Quarterly", "Annually", "Bi-Monthly"] },
  { subscriptionPlan: ["Professional", "Basic", "Premium", "Enterprise"] },
  { storeName: ["Artisan Coffee Shop", "Brewed Awakening Store", "Bean & Co. Outlet", "Daily Grind Café"] },
  { productsCount: [24, 15, 40, 8] },
  { aov: ["$37.50", "$29.80", "$42.10", "$15.75"] },
  { activeListings: [24, 12, 40, 8] },
  { rating: [4.8, 4.5, 4.9, 4.2] },
  { verifiedDocs: ["Business License", "Tax Certificate", "Health Permit", "Insurance Certificate"] },
];

const STATUS_COLORS = {
  active: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  suspended: "bg-gray-200 text-gray-800",
  inactive: "bg-gray-200 text-gray-800",
}

export default function PromptLibrarySection({ onSelectPrompt, selectedPrompt }) {
  const [search, setSearch] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editMerchant, setEditMerchant] = useState(null); 
  const [merchantToDelete, setMerchantToDelete] = useState(null); 
  const [deleting, setDeleting] = useState(false);

  // FIX: Utility to pick random element
  const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // FIX: Generate extended merchant for each merchant in array
  const generateExtendedMerchant = (backendMerchant, sampleData) => {
    const extended = { ...backendMerchant };

    sampleData.forEach((fieldObj) => {
      const key = Object.keys(fieldObj)[0];
      const values = fieldObj[key];

      if (key === "verifiedDocs") {
        const shuffled = [...values].sort(() => 0.5 - Math.random());
        const count = Math.floor(Math.random() * shuffled.length) + 1;
        extended[key] = shuffled.slice(0, count);
      } else {
        extended[key] = getRandom(values);
      }
    });

    if (!extended.businessName) extended.businessName = backendMerchant.name;

    return extended;
  };

  // FIX: Only generate extended merchants after fetching
  const extendedMerchants = useMemo(() => {
    if (!merchants || merchants.length === 0) return [];
    return merchants.map((m) => generateExtendedMerchant(m, SAMPLE_MERCHANTS));
  }, [merchants]);

  useEffect(() => {
    getMerchants()
      .then(res => {
        const list = res?.data?.results ?? res?.data ?? [];
        setMerchants(Array.isArray(list) ? list : []);
      })
      .catch(() => setError("Failed to load merchants"))
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = async (data) => {
    try {
      const res = await createMerchant(data)
      const newMerchant = res?.data?.merchant ?? res?.data?.results ?? res?.data
      if (!newMerchant || !newMerchant.id) throw new Error("Invalid merchant response")
      setMerchants(prev => [newMerchant, ...prev])
    } catch (err) {
      console.error(err)
      alert("Failed to create merchant")
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteMerchant(id);
      setMerchants((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error("Failed to delete merchant", err.response ?? err);
      alert("Failed to delete merchant. Check console for details.");
    }
  };

  // FIX: Use extendedMerchants (array) for filtering
  const filteredMerchants = extendedMerchants.filter(
    (m) =>
      m.businessName?.toLowerCase().includes(search.toLowerCase()) ||
      (m.email ?? "").toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Loader text="Loading merchants..." />
  if (error) return <ErrorMessage message={error} />

  return (
    <Card className="border border-border shadow-sm h-full flex flex-col">
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-brighter font-bold text-2xl">Hey, Abdul!</CardTitle>
            <CardDescription className="font-noto">Total Merchants: {merchants.length}</CardDescription>
          </div>

          {/* Add Merchant Modal */}
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground gap-2 cursor-pointer transition-opacity duration-150 hover:opacity-90 active:opacity-80">
                <Plus size={16} />
                Add New Merchant
              </Button>
            </DialogTrigger>
            <DialogContent className="text-right sm:max-w-[600px] pt-10 shadow-none">
              <MerchantForm onCreate={handleCreate} onClose={() => setIsModalOpen(false)} />
            </DialogContent>
          </Dialog>

          {/* Edit Merchant Modal */}
          <Dialog open={!!editMerchant} onOpenChange={() => setEditMerchant(null)}>
            <DialogContent className="sm:max-w-[600px] pt-10 shadow-none">
              {editMerchant && (
                <EditMerchantForm
                  merchant={editMerchant}
                  onUpdate={(updatedMerchant) => {
                    setMerchants((prev) =>
                      prev.map((m) =>
                        m.id === updatedMerchant.id ? { ...m, ...updatedMerchant } : m
                      )
                    );
                    setEditMerchant(null);
                  }}
                  onCancel={() => setEditMerchant(null)}
                />
              )}
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation Modal */}
          <Dialog open={!!merchantToDelete} onOpenChange={() => setMerchantToDelete(null)}>
            <DialogContent className="sm:max-w-[400px] p-6">
              {merchantToDelete && (
                <>
                  <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">Confirm Delete</DialogTitle>
                  </DialogHeader>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Are you sure you want to delete <strong>{merchantToDelete.name}</strong>? This action cannot be undone.
                  </p>
                  <div className="mt-4 flex justify-end gap-2">
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                      className="bg-red-600 text-white hover:bg-red-700"
                      disabled={deleting}
                      onClick={async () => {
                        if (!merchantToDelete) return;
                        try {
                          setDeleting(true);
                          await handleDelete(merchantToDelete.id);
                          setMerchantToDelete(null);
                        } finally {
                          setDeleting(false);
                        }
                      }}
                    >
                      {deleting ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex flex-col flex-1 min-h-0">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2 bg-muted rounded-md px-3 py-2">
            <Search size={16} className="text-muted-foreground" />
            <Input
              placeholder="Search merchants..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-0 bg-transparent outline-none shadow-none ring-0 focus:ring-0"
            />
          </div>
        </div>

        <div className="relative px-4 w-full flex-1 overflow-y-auto custom-scrollbar">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border hover:bg-transparent dark:bg-gray-500">
                <TableHead className="font-semibold text-foreground whitespace-nowrap">Merchant Name</TableHead>
                <TableHead className="font-semibold text-foreground whitespace-nowrap">Email</TableHead>
                <TableHead className="font-semibold text-foreground whitespace-nowrap">Phone</TableHead>
                <TableHead className="font-semibold text-foreground whitespace-nowrap text-center pr-4">Status</TableHead>
                <TableHead className="font-semibold text-foreground text-center whitespace-nowrap">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredMerchants.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-6">
                    No merchants found
                  </TableCell>
                </TableRow>
              )}

              {filteredMerchants.map((merchant) => (
                <TableRow
                  key={merchant.id}
                  onClick={() => onSelectPrompt?.(merchant)}
                  className={`border-b border-border hover:bg-muted cursor-pointer transition-colors ${
                    selectedPrompt?.id === merchant.id ? "bg-muted" : ""
                  }`}
                >
                  <TableCell className="font-medium text-foreground whitespace-nowrap">{merchant.businessName ?? merchant.name}</TableCell>
                  <TableCell className="text-muted-foreground">{merchant.email}</TableCell>
                  <TableCell className="text-muted-foreground pr-5 whitespace-nowrap">{merchant.phone}</TableCell>
                  <TableCell className="text-muted-foreground pr-5 whitespace-nowrap flex justify-center items-center">
                    <Badge
                      className={`${STATUS_COLORS[merchant.status?.toLowerCase()]} font-sans font-medium h-6 w-18 flex items-center justify-center`}
                    >
                      {merchant.status?.charAt(0).toUpperCase() + merchant.status?.slice(1).toLowerCase()}
                    </Badge>

                  </TableCell>
                  <TableCell className="text-muted-foreground whitespace-nowrap">
                    <div className="flex gap-1 justify-end">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        onClick={() => setEditMerchant(merchant)}
                      >
                        <Edit size={14} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        onClick={() => setMerchantToDelete(merchant)}
                      >
                        <Trash size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
