import { defineStore } from 'pinia';
import '@/router';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    actions: {
        async login(email, password) {
            try {
                const user = await fetch("http://localhost:4321/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                });

                this.user = user;

                localStorage.setItem('user', JSON.stringify(user));
                router.push('/');
            } catch (error) {
                console.log(error)
            }
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/');
        }
    }
});