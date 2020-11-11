<template>
  <div>
    <h2>add Todo</h2>
    <div class="add">
      <form @submit.prevent="handleSubmit">
        <input type="text" v-model="title" />
        <input type="submit" value="Add" />
      </form>
    </div>
    <div class="hr"></div>
    {{ size }}
    <select class="select" @change="handleSelect($event)">
      <option value="200">200</option>
      <option value="100">100</option>
      <option value="50">50</option>
      <option value="20" selected>20</option>
    </select>
    <div class="hr"></div>
    <div class="action">
      <span>
        <span @click="flag = 1">所有</span>
      </span>
      <span>
        <span class="done_text" @click="flag = 2">完成</span>
      </span>
      <span>
        <span class="undone_text" @click="flag = 3">未完成</span>
      </span>
    </div>
    <div class="hr"></div>
    <div class="todos">
      <div
        v-for="(item, index) in getTodos()"
        :key="item.id"
        class="todo"
        :class="item.completed ? 'is_done' : ''"
        @click="handleToggle(item)"
        @dblclick="handleDelect(item, index)"
      >
        {{ item.title }}
      </div>
      <h2>
        一共<span>{{ getTodos().length }}</span
        >条数据
      </h2>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers, mapGetters, mapActions } from "vuex";
const todo = createNamespacedHelpers("Todo");

export default {
  data() {
    return {
      // 1 所有 2 完成 3 未完成
      flag: 1,
      size: 20,
      title: "",
    };
  },
  computed: {
    // ...todo.mapGetters(["getTodo", "completedTodos", "unCompletedTodos"]),
    // ...mapGetters("Todo", ["getTodo", "completedTodos", "unCompletedTodos"]),
    ...mapGetters("Todo", {
      g: "getTodo",
      c: "completedTodos",
      u: "unCompletedTodos",
    }),
    /*     g() {
      return this.$store.getters["Todo/getTodo"];
    },
    c() {
      return this.$store.getters["Todo/completedTodos"];
    },
    u() {
      return this.$store.getters["Todo/unCompletedTodos"];
    }, */
  },
  created() {
    // console.log("请求服务器数据并完成初始化操作");
    // this.i();
    this.$store.dispatch("Todo/initTodos");
  },
  methods: {
    // ...todo.mapActions(["initTodos", "toggle", "addTodo", "deleteTodo"]),
    // ...mapActions("Todo", ["initTodos", "toggle", "addTodo", "deleteTodo"]),
    ...mapActions("Todo", {
      i: "initTodos",
      t: "toggle",
      a: "addTodo",
      d: "deleteTodo",
    }),
    getTodos() {
      if (this.flag == 1) {
        return this.g;
      }
      if (this.flag == 2) {
        return this.c;
      }
      if (this.flag == 3) {
        return this.u;
      }
    },
    handleSelect(e) {
      // console.dir(e.target.value);
      this.size = e.target.value;
      this.i(this.size);
    },
    handleToggle(todo) {
      // this.t(todo);
      this.$store.dispatch("Todo/toggle", todo);
    },
    handleSubmit(e) {
      // console.log(this.title);
      if (!this.title) {
        alert("请输入点内容吧");
        return;
      }
      // this.a(this.title);
      this.$store.dispatch("Todo/addTodo", this.title);
      this.title = "";
    },
    handleDelect(todo, index) {
      // this.d({ todo, index });
      this.$store.dispatch("Todo/deleteTodo", { todo, index });
    },
  },
};
</script>

<style scoped>
.todos {
  /* 生成块级网格 */
  display: grid;
  /* 竖向排列 */
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0.1rem;
}
.todo {
  border: 1px solid #cccccc;
  background-color: #41b883;
  padding: 0.1rem;
  border-radius: 5px;
  text-align: center;
  position: relative;
  cursor: pointer;
}
.action {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}

.done_text {
  display: inline-block;
  width: 50px;
  height: 20px;
  background-color: #35495e;
  text-align: center;
}
.undone_text {
  display: inline-block;
  width: 50px;
  height: 20px;
  background-color: #41b883;
  text-align: center;
}
.is_done {
  background-color: #35495e;
  color: #ffffff;
}
.select {
  margin-top: 20px;
  padding: 2px;
  border: 2px solid #41b883;
}
.hr {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  height: 0.5px;
  border: 1px solid #41b883;
}
form {
  display: flex;
  margin-bottom: 10px;
}
input[type="text"] {
  flex: 10;
  padding: 10px;
  max-width: 400px;
  border: 1px solid #41b883;
  outline: none;
}
input[type="submit"] {
  flex: 10;
  padding: 10px;
  max-width: 100px;
  height: 40px;
  background-color: #41b883;
}
</style>