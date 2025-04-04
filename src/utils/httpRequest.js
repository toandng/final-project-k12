import axios from "axios";

const httpRequest = axios.create({
    baseURL: "https://api01.f8team.dev/api",
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

const send = async (method, url, data, config) => {
    const isPutOrPatch = ["put", "patch"].includes(method.toLowerCase());
    const effectiveMethod = isPutOrPatch ? "post" : method;
    const effectivePath = isPutOrPatch
        ? `${url}${url.includes("?") ? "&" : "?"}_method=${method}`
        : url;

    try {
        const res = await httpRequest({
            method: effectiveMethod,
            url: effectivePath,
            data,
            ...config,
        });
        return res?.data;
    } catch (error) {
        console.error("HTTP Error:", error.response?.data || error.message);
        return error.response?.data || { error: "Đã xảy ra lỗi không xác định" };
    }
};

export const get = (url, config) => send("get", url, null, config);
export const post = (url, data, config) => send("post", url, data, config);
export const put = (url, data, config) => send("put", url, data, config);
export const patch = (url, data, config) => send("patch", url, data, config);
export const del = (url, config) => send("delete", url, null, config);

export const setToken = (token) => {
    httpRequest.defaults.headers["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
};

export default {
    get,
    put,
    post,
    patch,
    del,
    setToken,
};
