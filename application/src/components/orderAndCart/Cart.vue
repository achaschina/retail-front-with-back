<template>
  <b-jumbotron :header="msg" lead="Меню">
    <p>its menu component</p>
  </b-jumbotron>
</template>

<script>
export default {
  name: "menu",
  data() {
    return {
      msg: "Имя ресторана"
    };
  }
};
</script>

<style scoped>
</style>


