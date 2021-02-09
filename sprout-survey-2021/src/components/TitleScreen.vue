<template>
  <div class="bg">
    <div class="title">
      <h1>HTTYD fandom survey 2021</h1>
      <p>In 2020, The Brussel Sprout created a survey to gauge the feelings of the HTTYD fandom towards the movie trilogy.</p>
      <p>About a year later, we've decided to repeat the study — but this time, with a wider variety of questions.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TitleScreen',
  props: {
    msg: String,
  },
});
</script>

<style lang="css" scoped>
.bg {
  background-image: url('../assets/bg.jpg');
  background-size: cover;
  width: 100%;
  height: 100%;
  margin: 0px;
  border: 1px solid transparent;
  box-sizing: border-box;
}

.title {
  margin-left: 25%;
  margin-top: 35vh;

  width: 10rem;

  padding: 1rem;
  width: auto;

  color: #ffffff;
  background-color: rgba(0,0,0,0.69)
}
</style>