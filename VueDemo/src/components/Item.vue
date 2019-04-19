<template>
  <li :style="{background: bgColor}" @mouseenter="handleEnter(true)" @mouseleave="handleEnter(false)">
    <label>
      <input type="checkbox" v-model="completed"/>
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="deleteItem">删除</button>
  </li>
</template>

<script>

import Pubsub from 'pubsub-js'

export default {
  props: {
    todo: Object,
    index: Number,
    selectTodo: Function
  },

  data () {
    return {
      bgColor: 'white',
      isShow: false
    }
  },

  beforeMount () {
    this.completed = this.todo.completed
  },

  methods: {
    handleEnter (isEnter) {
      if (isEnter) {
        this.bgColor = '#ccc'
        this.isShow = true
      } else {
        this.bgColor = '#fff'
        this.isShow = false
      }
    },

    deleteItem () {
      if (window.confirm(`确认要删除${this.todo.title}吗？`)) {
        Pubsub.publish('deleteTodo', this.index)
      }
    }
  },

  computed: {
    completed: {
      get () {
        return this.todo.completed
      },

      set (value) {
        this.selectTodo(this.todo, value)
      }
    }
  }
}
</script>

<style scoped>
  li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
  }

  li label {
    float: left;
    cursor: pointer;
  }

  li label li input {
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
  }

  li button {
    float: right;
    margin-top: 3px;
  }

  li:before {
    content: initial;
  }

  li:last-child {
    border-bottom: none;
  }
</style>
