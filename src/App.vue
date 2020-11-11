<template>
  <div class="container">
    <Todo />
  </div>
</template>

<script>
import Todo from "./components/Todo";
export default {
  components: {
    Todo,
  },
};
</script>

<style >
body {
  line-height: 1.6;
  background-color: #e8f7f0;
}
.container {
  max-width: 1100px;
  margin: auto;
  overflow: auto;
  padding: 0 2rem;
}
</style>