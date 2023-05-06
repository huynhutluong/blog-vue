<script setup>
import { useStore } from '@/store/auth'
import router from "@/router";

const auth = useStore();

if (auth.user) {
  router.push('/');
}

async function onSubmit(email, password, lastName, firstName) {
  await auth.signUp(email, password, lastName, firstName);
}
</script>

<template>
  <div class="login-form centre-dis">
    <form @submit.prevent="onSubmit(email, password, lastName, firstName)" method="post">
      <div class="sb">
        <label for="email" style="padding: 5px 0">Email:</label>
        <input name="email" type="text" v-model="email" size="30">
      </div>
      <br>
      <div class="sb">
        <label for="mk" style="padding: 5px 0">Mật khẩu:</label>
        <input name="mk" type="password" v-model="password" size="30">
      </div>
      <br>
      <div class="sb">
        <label for="mk2" style="padding: 5px 0">Nhập lại mật khẩu:</label>
        <input name="mk2" type="password" size="30">
      </div>
      <br>
      <div class="sb">
        <label for="ln" style="padding: 5px 0">Họ</label>
        <input name="ln" type="text" v-model="lastName" size="30">
      </div>
      <br>
      <div class="sb">
        <label for="fn" style="padding: 5px 0">Tên</label>
        <input name="fn" type="text" v-model="firstName" size="30">
      </div>
      <br>
      <div class="centre-dis">
        <button type="submit" class="btn-login">Đăng ký</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    }
  }
}
</script>

<style>
.centre-dis {
  display: flex;
  justify-content: center;
  margin: auto;
}

.sb {
  display: flex;
  justify-content: space-between;
}

input {
  margin-left: 10px;
  padding: 5px 5px;
  border: solid 1px black;
  outline: none;
}

.btn-login {
  padding: 5px 10px;
  border: none;
  background-color: rgba(8, 14, 44, 1);
  color: white;
}

.btn-login:hover {
  background-color: white;
  color: rgba(8, 14, 44, 1);
  border: solid 1px rgba(8, 14, 44, 1);
}

.login-form {
  padding: 150px 0;
}

</style>