import api from "./axios";

export const fetchUrls = (params) => {
  return api.get("/url", { params });
};

export const createUrl = (data) => {
  return api.post("/url", data);
};

export const deleteUrl = (shortCode) => {
  return api.delete(`/url/${shortCode}`);
};

export const fetchUrlByCode = (shortCode) => {
  return api.get(`/url/${shortCode}`);
};

export const updateUrl = (code, data) => {
  return api.patch(`/url/${code}`,data);
}