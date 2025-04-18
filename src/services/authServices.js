import httpRequest from "../utils/httpRequest";

export const getCurrentUser = async () => {
  
  const res = await httpRequest.get("/auth/me");
  return res;
};

export const login = async (loginInfo) => {
  const res = await httpRequest.post("/auth/login", loginInfo);
  return res;
};

export const register = async (data) => {
  const res = await httpRequest.post("/auth/register", data);
  return res;
};

export const checkEmail = async (email) => {
  const res = await httpRequest.get("/auth/check-email", {
    params: { email },
  });
  return res?.exists ?? false;
};

export const editProfile = async (id, data) => {
  const isFormData = data instanceof FormData;
  const res = await httpRequest.put(`/users/${id}`, data, {
    headers: {
      ...(isFormData ? { "Content-Type": "multipart/form-data" } : {}),
    },
  });
  return res;
};

export default {
  getCurrentUser,
  login,
  register,
  checkEmail,
  editProfile,
};