export default {
  getTodos () {
    return JSON.parse(localStorage.getItem('todos_key') || '[]')
  },

  saveTodos (todos) {
    localStorage.setItem('todos_key', JSON.stringify(todos))
  }
}
