<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main>
    <div v-if="articles.length">
      <h2>BÀI VIẾT NỔI BẬT</h2>
        <div class="article-wrapper">
          <div v-for="article in articles" class="article-1">
            <RouterLink :to="article._id" :key="article._id" class="article-card">
              <img src="https://placehold.co/1280x720" alt="Image" class="article-card-item">
              <div class="article-card-item">
                <h3> {{ article.headline }} </h3>
              </div>
            </RouterLink>
          </div>
        </div>
      <h2>Tin công nghệ</h2>
      <div class="article-wrapper2">
        <div v-for="article1 in articles1" class="article-2">
          <RouterLink :to="article1._id" :key="article1._id" class="article2-card">
            <img src="https://placehold.co/1280x720" alt="Image" class="article2-card-item" style="width: 300px">
            <div class="article2-card-item">
              <h3 style="margin-bottom: 10px"> {{ article1.headline }} </h3>
              <p> {{ article1.lead }} </p>
            </div>
          </RouterLink>
        </div>
      </div>
      <h2>Tin thể thao</h2>
      <div class="article-wrapper2">
        <div v-for="article2 in articles2" class="article-2">
          <RouterLink :to="article2._id" :key="article2._id" class="article2-card">
            <img src="https://placehold.co/1280x720" alt="Image" class="article2-card-item" style="width: 300px">
            <div class="article2-card-item">
              <h3 style="margin-bottom: 10px"> {{ article2.headline }} </h3>
              <p> {{ article2.lead }} </p>
            </div>
          </RouterLink>
        </div>
      </div>
      </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      articles: {},
      articles1: {},
      articles2: {}
    }
  },
  mounted() {
    fetch('http://localhost:4321/api/v1/posts')
        .then(res => res.json())
        .then(data => this.articles = data)
        .catch(err => console.log(err))
    fetch('http://localhost:4321/api/v1/posts?topic=Tech')
        .then(res => res.json())
        .then(data => this.articles1 = data)
        .catch(err => console.log(err))
    fetch('http://localhost:4321/api/v1/posts?topic=Sport')
        .then(res => res.json())
        .then(data => this.articles2 = data)
        .catch(err => console.log(err))
  }
}
</script>

<style>

* {
  font-family: sans-serif, Arial;
}

.article-wrapper {
  display: grid;
  grid-gap: 5px;
  grid-template-areas:
      "left left right1"
      "left left right2";
}

.article-1:nth-child(1) {
  grid-area: left;
  margin: auto;
}

.article-1:nth-child(2) {
  grid-area: right1;
}

.article-1:nth-child(2) img {
  width: 95%;
}

.article-1:nth-child(3) img {
  width: 95%;
}

.article-1:nth-child(3) {
  grid-area: right2;
}

img {
  width: 100%;
  height: auto;
}

.article-card {
  position: relative;
}

.article-card-item:nth-child(2) {
  position: absolute;
  bottom: 15px;
  left: 15px;
}

h3 {
  color: black;
}

.article2-card {
  padding: 10px;
  margin: 30px 0;
  display: grid;
  grid-gap: 20px;
  grid-template-areas:
      "a b b b"
      "a b b b"
      "a b b b";
}

.article2-card:hover {

  border: 1px solid chocolate;
}

.article2-card-item:first-child {
  grid-area: a;
}

.article2-card-item {
  grid-area: b;
}

</style>