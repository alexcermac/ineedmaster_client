import { create } from 'zustand'

export const useUserStore = create((set) => ({
    user: null,
    userError: null,
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
                .then(response => {
                    console.log("response: ", response);
                    
                    return response.json()
                })
                .then(data => {
                    return data
                })
            

            set({ user: response })
        } catch (error) {
            console.log("error: ", typeof(error));
            console.log("error: ", error);
            
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
