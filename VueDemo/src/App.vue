<template>
  <div id="root">
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo"/>
      <Main :todos="todos" :selectTodo="selectTodo"/>
      <Footer :todos="todos" :selectAllTodos="selectAllTodos" :deleteAllCompleted="deleteAllCompleted"/>
    </div>
  </div>
</div>
</template>

<script>

import Pubsub from 'pubsub-js'
import Header from './components/Header.vue'
import Main from './components/Main.vue'
import Footer from './components/Footer.vue'
import StorageUtils from './utils/storageUtils.js'

export default {
  data () {
    return {
      todos: StorageUtils.getTodos()
    }
  },

  mounted () {
    Pubsub.subscribe('deleteTodo', (msgName, index) => {
      this.todos.splice(index, 1)
    })
  },

  components: {
     Header, Main, Footer
  },

  methods: {
    addTodo (todo) {
      this.todos.unshift(todo)
    },

    // deleteTodo (index) {
    //   this.todos.splice(index, 1)
    // },

    selectAllTodos (isCheck) {
      this.todos.forEach(todo => (todo.completed = isCheck))
    },

    deleteAllCompleted () {
      this.todos = this.todos.filter(todo => !todo.completed)
    },

    selectTodo (todo, isCheck) {
      todo.completed = isCheck
    }
  },

    watch: {
      todos: {
        deep: true,
        // handler: function (val) {
        //   localStorage.setItem('todos_key', JSON.stringify(val))
        // }
        handler: StorageUtils.saveTodos
      }
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
