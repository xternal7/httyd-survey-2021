<template lang="html">
  <div class='tab' v-show='isActive'>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'tab',
  props: {
    title: {
      type: String,
      default: 'Tab'
    }
  },
  data () {
    return {
      isActive: true
    }
  }
});
</script>

<style lang="css">
  
</style>