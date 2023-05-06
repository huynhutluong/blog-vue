<script setup>
import { RouterLink, RouterView } from 'vue-router'
import MyHeader from "@/components/MyHeader.vue";
import MyFooter from "@/components/MyFooter.vue";
</script>

<template>
  <div class="my-site">
    <MyHeader/>
    <br>
    <RouterView />
    <br>
    <MyFooter/>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}

.my-site {
  width: 80%;
  margin: auto;
}

</style>
