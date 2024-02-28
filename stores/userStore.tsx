import { create } from 'zustand'

export const useUserStore = create((set, get) => ({
    user: null,
    userError: "",
    userLoading: false,
    userLogoutLoading: false,
    getUser: async () => {
        set({ userLoading: true })

        try {
            const token = localStorage.getItem("token")
            const response = await fetch("http://localhost:8080/api/users", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
                .then(response => response.json())
                .then(data => {
                    return data
                })

            set({ user: response, userError: "" })
        } catch (error) {
            set({ userError: error })
        }
        
        set({ userLoading: false })
    },
    logout: () => {
        set({ userLogoutLoading: true })
        localStorage.removeItem("token")
        set({
            user: null,
            userLogoutLoading: false,
        })
    }
}))
