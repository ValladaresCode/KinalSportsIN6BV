import axios from "axios";

const axiosAuth = axios.create({
    baseURL: import.meta.env.VITE_AUTH_URL,
    timeout: 8000,
    headers: {
        "Content-Type": "application/json"
    }
})

axiosAuth.interceptors.request.use(
    async (config) => {
        config._axiosClient = "auth"

        try {
            const { useAuthStore } = await import("../../features/auth/store/authStore.js")
            const token = useAuthStore.getState().token
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
        } catch (err) {
            // Ignore missing store during initial module load or when running outside the app
        }

        return config
    },
    (error) => Promise.reject(error)
)

export { axiosAuth }