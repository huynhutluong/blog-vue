<script setup>
import {useStore} from "@/store/auth";
import {useRoute} from "vue-router";

const auth = useStore();
const route = useRoute();

async function submitComment(userComment) {
  if (confirm("Viết bình luận này")) {
    await fetch(
        "http://localhost:4321/api/v1/comments",
        {
          method: "PUT",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            article_id: route.params._id,
            user_id: auth.user._id,
            desc: userComment
          })
        }
    ).catch(error => console.log(error))
    alert("Viết bình luận thành công. Đang chờ duyệt.")
  }
}

async function changeComment(commentId, desc) {
  if (confirm("Sửa bình luận này?")) {
    await fetch(
        "http://localhost:4321/api/v1/comments",
        {
          method: "PATCH",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            comment_id: commentId,
            article_id: route.params._id,
            user_id: auth.user._id,
            desc: desc
          })
        }
    ).catch(error => console.log(error))
    alert("Đã sửa thành công!!!")
  }
}

async function deleteComment(commentId) {
  if (confirm("Xóa bình luận này?")) {
    await fetch(
        "http://localhost:4321/api/v1/comments",
        {
          method: "DELETE",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            article_id: route.params._id,
            comment_id: commentId
          })
        }
    ).catch(error => console.log(error))
    alert("Xóa thành công!!!")
  }
}
</script>

<template>
  <h1 v-html="article.headline" style="margin: 10px"></h1>
  <img src="https://placehold.co/1280x720" alt="Hình ảnh" style="width: 100%">
  <div style="margin: 25px 20px; display: flex; justify-content: space-between; opacity: 60%">
    <i> Viết bởi: {{ article.byline }} </i>
  </div>
  <i style="margin: 20px 20px; opacity: 80%"> {{ article.lead }} </i>
  <br>
  <div style="margin-left: 10px">
    <h4 style="margin: 10px 0">Bài viết liên quan</h4>
    <div v-for="(relatedArticle, index) in relatedArticles">
      >>> <Router-link :to="relatedArticle._id" :key="relatedArticle._id"> {{ relatedArticle.headline }} </Router-link>
    </div>
  </div>
  <div v-html="article.body" style="margin: 25px 10px"></div>
  <div v-if="auth.user">
    <div class="comment-card" style="padding: 10px 0">
      <h5 style="margin: 10px 10px"> {{ auth.user.email }} </h5>
      <form @submit.prevent="submitComment(userComment)">
        <textarea placeholder="Viết bình luận vào đây" v-model="userComment" rows="4" cols="50" style="padding: 10px ;margin: 10px; border: none; outline: none" required></textarea>
        <br>
        <button class="btn-save" type="submit" @click="init" style="margin: 10px">Lưu</button>
      </form>
    </div>
  </div>
  <h4 style="margin: 0 20px">BÌNH LUẬN</h4>
  <div class="comment-wrappper" :key="myKey">
    <div v-for="(comment, index) in article['comments']" class="comment-card" :key="index">
      <input type="hidden" :key="index">
      <h5> {{ comment['user'].full_name }} </h5>
      <div v-if="auth.user && (comment['user']._id === auth.user._id)">
        <form @submit.prevent="changeComment(comment._id, comment.desc)">
          <input type="text" v-model="comment.desc" :size="comment.desc.length" style="margin: 5px 0; text-decoration: underline; border: none; outline: none">
          <br>
          <button type="submit" class="btn-change">Chỉnh sửa</button>
          <br>
        </form>
        <button @click="deleteComment(comment._id)" class="btn-del" style="margin: 5px 0">
          Xóa
        </button>
      </div>
      <div v-else>
        <p>
          {{ comment.desc }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  props: ['_id'],
  methods: {
    init() {
      fetch('http://localhost:4321/api/v1/posts?id=' + this._id)
          .then(res => res.json())
          .then(data => this.article = data)
          .catch(err => console.log(err))
      fetch('http://localhost:4321/api/v1/relatedArticles?article_id=' + this._id)
          .then(res => res.json())
          .then(data => this.relatedArticles = data)
          .catch(err => console.log(err))
      this.myKey = !this.myKey
    }
  },
  data() {
    return {
      article: {},
      relatedArticles: {},
      index: 0
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style>
a {
  text-decoration: none;
  color: chocolate;
}

a:hover {
  color: rgba(8, 14, 44, 1);
}

.comment-wrappper {
  margin-top: 30px;
  text-align: right;
  padding: 10px;
}

.comment-card {
  margin: 15px;
  padding: 20px;
  border: 1px solid rgba(8, 14, 44, 1);
  border-radius: 10px;
  box-shadow: rgba(220, 220, 220, 0.8) 5px 10px;
}

.btn-save {
  padding: 5px 10px;
  border: none;
  background-color: limegreen;
  color: white;
}

.btn-save:hover {
  background-color: white;
  border: limegreen solid 1px;
  color: limegreen;
}

.btn-change {
  padding: 5px 10px;
  border: none;
  background-color: goldenrod;
  color: white;
}

.btn-change:hover {
  background-color: white;
  color: goldenrod;
  border: goldenrod solid 1px;
}

.btn-del {
  padding: 5px 10px;
  border: none;
  background-color: red;
  color: white;
}

.btn-del:hover {
  background-color: white;
  color: red;
  border: red solid 1px;
}
</style>