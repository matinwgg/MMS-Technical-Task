"use client";

import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";
import { updateMerchant, updateMerchantStatus } from "../api/merchantApi";

export default function EditMerchantForm({ merchant, onUpdate, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    business_registration_number: "",
    email: "",
    phone: "",
    status: "PENDING",
  });

  const [loading, setLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [statusError, setStatusError] = useState(null);

  // Pre-fill form fields when merchant changes
  useEffect(() => {
    if (merchant) {
      const statusMap = {
        active: "ACTIVE",
        pending: "PENDING",
        suspended: "SUSPENDED",
      };
      const normalizedStatus =
        statusMap[(merchant.status?.toLowerCase() || "pending")] ?? "PENDING";

      setFormData({
        name: merchant.name || "",
        business_registration_number: merchant.business_registration_number || "",
        email: merchant.email || "",
        phone: merchant.phone || "",
        status: normalizedStatus,
      });

      // Reset errors
      setFormError(null);
      setStatusError(null);
    }
  }, [merchant]);

  // Generic input change handler
  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  // Validate form inputs
  const validateForm = () => {
    if (!formData.name.trim()) return "Business name is required";
    if (!formData.business_registration_number.trim())
      return "Registration number is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      return "Valid email is required";
    if (!formData.phone.trim()) return "Phone number is required";
    return null;
  };

  // Submit the other merchant details (name, email, phone, etc.)
  const handleSubmit = async (e) => {
  e.preventDefault();
  setFormError(null);
  setStatusError(null);

  const validationError = validateForm();
  if (validationError) {
    setFormError(validationError);
    return;
  }

  if (!merchant?.id) return;

  try {
    setLoading(true);

    // 1️⃣ Update general merchant info
    const { status, ...details } = formData; // exclude status
    const resDetails = await updateMerchant(merchant.id, details);
    const updatedDetails = resDetails?.data ?? { ...merchant, ...details };

    // 2️⃣ Update status separately if it changed
    let updatedStatus = updatedDetails.status;
    if (formData.status !== merchant.status) {
      try {
        const resStatus = await updateMerchantStatus(merchant.id, formData.status);
        updatedStatus = resStatus?.data?.status ?? formData.status;
      } catch (err) {
        console.error("Failed to update status:", err);
        setStatusError("Failed to update status");
      }
    }

    // 3️⃣ Merge everything and send to parent
    const updatedMerchant = { ...updatedDetails, status: updatedStatus };
    onUpdate(updatedMerchant);

  } catch (err) {
    console.error(err);
    setFormError("Failed to update merchant details");
  } finally {
    setLoading(false);
  }
};



  // Update status immediately when changed, with rollback on failure
 const handleStatusChange = (newStatus) => {
  setFormData((prev) => ({ ...prev, status: newStatus }));
  setStatusError(null);
};


  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg dark:bg-black">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold">Edit Merchant</h2>
      </div>

      {formError && (
        <p className="text-sm text-red-600 bg-red-50 p-3 rounded">{formError}</p>
      )}
      {statusError && (
        <p className="text-sm text-red-600 bg-red-50 p-3 rounded">{statusError}</p>
      )}

      <Input
        placeholder="Business Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <Input
        placeholder="Registration Number"
        name="business_registration_number"
        value={formData.business_registration_number}
        onChange={handleChange}
      />
      <Input
        placeholder="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        placeholder="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />

      <Select
        value={formData.status}
        onValueChange={handleStatusChange}
        disabled={statusLoading}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ACTIVE">Active</SelectItem>
          <SelectItem value="PENDING">Pending</SelectItem>
          <SelectItem value="SUSPENDED">Suspended</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex justify-end gap-3 mt-6">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={loading || statusLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={loading || statusLoading}
        >
          {loading ? "Updating..." : "Update Merchant"}
        </Button>
      </div>
    </form>
  );
}
