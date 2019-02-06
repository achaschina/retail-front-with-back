<template>
  <div>
    <b-jumbotron id="home-page" :header="msg" lead>
      <!-- <p>Для просмотра детальной информации по заказу войдите в личный кабинет</p>
      <b-btn variant="secondary" to="/category" style="margin-bottom:1rem;">Категории</b-btn> -->
      <carousel :perPage=1 :autoplay="true">
        <slide v-for="(pic, index) in sliderPics" v-bind:key="index"><img :src="getImg(index)"></slide>
      </carousel>
    </b-jumbotron>
  </div>
</template>

<script>
import data from './utilities/testData.js'
export default {
  name: "app",
  data() {
    return {
      msg: "",
      sliderPics: data.mainPageSlider, 
    };
  },
  mounted() {},
  methods: {
    getImg(i) {
      let imgUrl =data.mainPageSlider[i].url;
      return imgUrl ? require(`${imgUrl}`) : ''
    }
  }
};
</script>

<style scoped>
</style>
