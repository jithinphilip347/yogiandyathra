import axios from "axios";

function apiBaseUrl(value: string | undefined, fallback: string): string {
  return (value || fallback).replace(/\/+$/, "");
}

export const yogiYatraApi = axios.create({
  baseURL: apiBaseUrl(process.env.YOGIYATRA_API_BASE_URL, "https://admin.varixialabs.com/workshopapi/public/api/v1/ecommerce"),
  timeout: 10_000,
  headers: { Accept: "application/json" },
});

export const yogifyWorkshopApi = axios.create({
  baseURL: apiBaseUrl(process.env.YOGIFY_WORKSHOP_API_BASE_URL, "https://admin.varixialabs.com/workshopapi/public/api/v1"),
  timeout: 10_000,
  headers: { Accept: "application/json" },
});

