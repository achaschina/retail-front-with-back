<template>
  <div id="main">
    <app-header></app-header>
    <router-view></router-view>
    <!-- <app-footer></app-footer> -->
  </div>
</template>

<script>
import appHeader from "./components/Layout/Header.vue";
import appFooter from "./components/Layout/Footer.vue";
export default {
  components: {
    appHeader,
    appFooter
  }
};
</script>

<style>
</style>
