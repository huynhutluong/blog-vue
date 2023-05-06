import {defineStore} from 'pinia';
import router from "@/router";

export const useStore = defineStore('user', {
    state: () => ({
        user: null,
    }),
    actions: {
        async signIn(email, password) {
            await fetch("http://localhost:4321/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password})
            }).then(res => res.json())
                .then(data => this.user = data)
                .catch(err => console.log(err))
            await router.push('/')
        },
        async signUp(email, password, lastName, firstName) {
            await fetch("http://localhost:4321/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    last_name: lastName,
                    first_name: firstName
                })
            }).then(res => res.json())
                .then(data => this.user = data)
                .catch(err => console.log(err))
            await router.push('/')
        },
        async logOut() {
            this.user = null
            await router.push('/')
        }
    }
    // getters: {}
})