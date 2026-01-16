import axios from "axios"
import { API_BASE_URL } from "../config"

const api = axios.create({
  baseURL: API_BASE_URL,
})

export const getMerchants = () => api.get("/merchants/")

// new
// src/api/merchantApi.js
export const getMerchantDetails = (id) => api.get(`/merchants/${id}/`);  // no /details

export const createMerchant = (data) => api.post("/merchants/", data)

export const updateMerchant = (id, data) =>
  api.patch(`/merchants/${id}/`, data)

export const deleteMerchant = (id) => api.delete(`/merchants/${id}/`)

export const updateMerchantStatus = (id, status) =>
  api.patch(`/merchants/${id}/update_status/`, { status })
