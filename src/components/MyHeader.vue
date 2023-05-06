<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useStore } from "@/store/auth";

const auth = useStore();

async function logOut() {
  await auth.logOut()
}

</script>

<template>
  <div class="navbar">
    <div class="nav-left">
      <span class="nav-item logo">LOGO</span>
      <RouterLink to="/" class="nav-item">Trang Chủ</RouterLink>
      <RouterLink to="/about" class="nav-item">Thông tin chung</RouterLink>
    </div>
    <div class="nav-right">
      <div v-if="auth.user">
        <span class="nav-item">Xin chào {{ auth.user._id }}</span>
        <button @click="logOut()" class="nav-item logout-button">Đăng xuất</button>
      </div>
      <div v-else>
        <RouterLink to="/login" class="nav-item">Đăng nhập</RouterLink>
        <RouterLink to="/register" class="nav-item">Đăng ký</RouterLink>
      </div>
    </div>
  </div>
</template>

<style>

.navbar {
  display: flex;
  justify-content: space-between;
  background-color: rgba(8, 14, 44, 1);
  padding: 40px;
  margin: auto;
  color: white;
}

.navbar a {
  text-decoration: none;
  color: white;
}

.navbar a:hover {
  color: gold;
}

.nav-item {
  margin-left: 20px;
}

.nav-left {
  margin: auto 0;
}

.logo {
  width: 50px;
  height: 50px;
}

.logout-button {
  padding: 5px 10px;
  border: none;
  background-color: chocolate;
  color: white;
}

.logout-button:hover {
  background-color: white;
  color: chocolate;
}

</style>