<template>
  <div id="root">
  <div class="todo-container">
    <div class="todo-wrap">
      <Header />
      <Main />
      <Footer />
    </div>
  </div>
</div>
</template>

<script>

import Header from './components/Header.vue'
import Main from './components/Main.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
     Header, Main, Footer
  }
}
</script>

<style>
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>
