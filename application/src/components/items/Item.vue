<template>
  <b-container fluid>
    <b-row class="my-1">
      <b-col cols="1"></b-col>
      <b-col>
        
      </b-col>
      <b-col></b-col>
      <b-col cols="1"></b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "item",
  data() {
    return {
      id: this.$route.params.id
    };
  },

  mounted() {
    console.log(this.id)
  },

  methods: {}
};
</script>

<style scoped>
#tables-wrap {
  display: inline-flex;
  flex-wrap: wrap;
  /* position: absolute; */
  height: 100vh;
  padding-left: 150px;
}
.tables {
  width: 100px;
  height: 100px;
  background-color: #c3bfce;
  margin-left: 15px;
  margin-bottom: 15px;
  border: 1px solid #60557b;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>


