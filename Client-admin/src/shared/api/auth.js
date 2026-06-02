import { axiosAuth } from "./api";

export const login = async (data) => {
    return await axiosAuth.post("/auth/login", data);
}

export const forgotPassword = async (email) => {
    return await axiosAuth.post("/auth/forgot-password", { email });
}

export const resetPassword = async (token, newPassword) => {
    return await axiosAuth.post("/auth/reset-password", { token, newPassword });
}

export const getAllUsers = async () => {
    const { data } = await axiosAuth.get("/auth/users");
    return {users: data};
}