import { create } from "zustand";
import * as authApi from "../../../shared/api/api.js"

const getAllUsers = authApi.getAllUsers;

export const useUserManagementStore = create((set, get) => ({
    users: [],
    loading: false,
    error: null,
    filters: {},
    
    setFilters: (filters) => set({filters}),
    setUsers: (users) => set({users}),

    fetchUsers: async (apiFn = getAllUsers, options) => {
        const { force = false} = options;
        const state = get();
        //Evitar llamadas duplicadas
        if(state.loading) return

        if(!force && state.users.length>0) return

        set({loading: true, error: null});
        
        try {
            
            const fetcher = typeof apiFn === "function" ? apiFn : getAllUsers;
            const result = await apiFn();
            
            set({users: result.users || result, loading: false});
            
        } catch (error) {
            set({error: error.message || "Error al cargar los usuarios", loading: false});
        }
    }
}))