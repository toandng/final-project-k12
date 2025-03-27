import httpRequest from "../utils/httpRequest";

export const login = async(loginInfo) =>{
    const res = await httpRequest.post("/auth/login",loginInfo);
    return res;
};

export const register = async(registerInfo) =>{
  const res = await httpRequest.post("/auth/register",registerInfo);
  return res;
};

export default {
  login,
  register,
};
