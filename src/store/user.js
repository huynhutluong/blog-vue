import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => ({
        user: null,
    }),

    actions: {
        async fetchUser() {
            const res = await fetch("http://localhost:4321/api/v1/users");

            const user = await res.json();
            this.user = user;
        },
        async signUp(email, password) {
            const res = await fetch("http://localhost:4321/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const user = await res.json()
            this.user = user;
        },
        async signIn(email, password) {
            const res = await fetch("http://localhost:4321/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const user = await res.json();
            this.user = user;
        },
    },
});