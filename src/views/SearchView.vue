<script setup>
import {RouterLink, RouterView} from 'vue-router'

function onSubmit() {
}

function search(q) {
  fetch('http://localhost:4321/api/v1/posts?q=' + q)
      .then(res => res.json())
      .then(data => this.articles = data)
      .catch(err => console.log(err))
}
</script>

<template>
  <form @submit.prevent="search(q)">
    <input type="text" size="80" v-model="q" @input="search(q)">
    <button type="submit">Tìm kiếm</button>
  </form>
  <div class="article-wrapper2">
    <div v-for="(article, index) in articles" class="article-2" :key="index">
      <RouterLink :to="article._id" :key="article._id" class="article2-card">
        <img src="https://placehold.co/1280x720" alt="Image" class="article2-card-item" style="width: 300px">
        <div class="article2-card-item">
          <h3 style="margin-bottom: 10px"> {{ article.headline }} </h3>
          <p> {{ article.lead }} </p>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      q: "Ba",
      myKey: 0,
      articles: {},
    }
  },
  methods: {
    restart() {
      this.myKey += 1
    }
  },
  mounted() {
    fetch('http://localhost:4321/api/v1/posts?q=' + this.q)
        .then(res => res.json())
        .then(data => this.articles = data)
        .catch(err => console.log(err))
  }
}
</script>