import axios from "axios";

const state = {
  todos: [],
};

const getters = {
  getTodo: (state) => {
    return state.todos;
  },
  completedTodos: (state) => {
    return state.todos.filter((todo) => {
      return todo.completed;
    });
  },
  unCompletedTodos: (state) => {
    return state.todos.filter((todo) => {
      return !todo.completed;
    });
  },
};

const mutations = {
  initTodos: (state, todos) => {
    state.todos = todos;
  },
  toggle: (state, todo) => {
    state.todos.find((item) => {
      if (item.id == todo.id) {
        item.completed = todo.completed;
      }
    });
  },
  addTodo: (state, todo) => {
    state.todos.unshift(todo);
  },
  deleteTodo: (state, { todo, todoIndex }) => {
    // console.log("todoIndex", todoIndex); // state.todos.splice(todoIndex,1)
    let index = state.todos.findIndex((item) => {
      return item.id === todo.id;
    });
    // console.log("index", index);
    state.todos = state.todos.filter((item, _index) => {
      return index !== _index;
    });
  },
};

const actions = {
  initTodos: (context, size = 20) => {
    let { commit } = context;
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=" + size)
      .then((res) => {
        // console.log(res.data.splice(0, 20));
        // commit("initTodos", res.data.splice(0, 20));
        commit("initTodos", res.data);
      });
  },
  toggle: ({ commit }, todo) => {
    // console.log(todo);
    axios
      .put("https://jsonplaceholder.typicode.com/todos/" + todo.id, {
        completed: !todo.completed,
      })
      .then((res) => {
        // console.log(res);
        commit("toggle", res.data);
      });
  },
  addTodo: ({ commit }, title) => {
    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        title: title,
        completed: false,
      })
      .then((res) => {
        console.log(res.data);
        commit("addTodo", res.data);
      });
  },
  deleteTodo: ({ commit }, { todo, index }) => {
    axios
      .delete("https://jsonplaceholder.typicode.com/todos/" + todo.id)
      .then((res) => {
        console.log(res.data);
        commit("deleteTodo", { todo, todoIndex: index });
      });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
