<template>
  <div class="tab-root">
    {{tabs}} ← tabs
    <div class="tabs">
      <div 
        v-for="(tab, index) in tabs"
        :key="index"
        @click="selectTab(index)"
        class="tab"
        :class="{'selected': (index === selectedIndex)}"
      >
        {{tab.title}}
      </div>
    </div>

    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      selectedIndex: 0,
      tabs: [] as any,
    }
  },
  created() {
  },
  mounted() {
    setTimeout( () => {
      console.info("refs:", this.$refs);

      this.tabs = this.$refs.tabs;
      this.selectTab(0);
    }, 1000);
  },
  methods: {
    selectTab(tabIndex) {
      this.selectedIndex = tabIndex;

      if (this.tabs) {
        for (const index in this.tabs as any) {
          (this.tabs[index] as any).isActive = index === tabIndex;
        }
      }
    }
  }
})
</script>