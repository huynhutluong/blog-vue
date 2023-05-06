<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="footer">
    <RouterLink to="/">Trang Chủ</RouterLink>
    <RouterLink to="/about">Thông tin chung</RouterLink>
  </div>
</template>>

<style>

a {
  text-decoration: none;
  margin-left: 15px;
  color: white;
}

a:hover {
  color: gold;
}

.footer {
  display: flex;
  justify-content: center;
  background-color: rgba(8, 14, 44, 1);
  padding: 40px;
  margin: auto;
}

</style>