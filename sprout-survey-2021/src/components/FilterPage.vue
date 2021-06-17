<template>
  <div class="filter-screen-root flex flex-column w-100">

    <!-- title bar -->
    <div class="title-bar flex-nogrow flex flex-row w-100">
      <div class="flex-grow">Filters</div>
      <div class="flex-nogrow close-button" @click="$emit('close')">X</div>
    </div>

    <!-- actual page -->
    <div class="content flex-grow">
      <div class="content">
        <p>
          Okay, ground rules: only unaccented latin letters used by English.
          No two sets may share the same name EVER.
          There's absolutely no input validation anywhere on this page.
          Violate any of the rules and shit may break.
          You're on your own. No hand holding. You will not be protected from easter eggs in enums. This page doesn't keep it clean,
          even tho the rest of the page is basically a <a href="https://www.youtube.com/watch?v=dEF6kb7Hh0Q" target="_blank">family show</a>.
          By now you should be able to tell that this is a 'behind the scenes' kind of page,
          given very little effort went into its design — yet despite this, this page is somehow still noticeably better than roll20,
          which goes to show that roll20 devs aren't just not putting any effort in roll20. They're putting in <i>negative</i> effort.
          But I digress, let's drop it before I start dropping <a href="https://knowyourmeme.com/memes/unsolicited-opinions-on-israel" target="_blank">
          unsolicited opinions on <span class="strike">Israel</span></a> VTTs.
        </p>
        <p>
          Good luck, have fun. May the RTFM and LMGTFY be with you.
        </p>
        <p>
          — Tam
        </p>
        <p>&nbsp;</p>
        <p><small>I know there's no M to RTF.</small></p>
      </div>
      <!-- #region display active filters -->

      <filter-dataset></filter-dataset>

      <!-- #endregion -->

    </div>
  </div>
  
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FilterDataset from './FilterComponents/FilterDataset.vue';

export default defineComponent({
  name: 'FilterPage',
  components: {
    FilterDataset
  },
  props: [
    'data',
  ],
  data() {
    return {
      datasets: [] as any[],
    }
  },
  methods: {

  }
});
</script>

<style lang="scss" scoped>
.filter-screen-root {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background-color: rgba(0,0,0,0.9);

  z-index: 1000;
}

.title-bar {
  text-align: center;
  width: 100%;
}

.close-button {
  width: 24px;
  height: 24px;
  background-color: #fa6;
  color: #000;

  cursor: pointer;
}

.content {
  overflow-y: auto;
}

.strike {
  text-decoration: line-through;
}
</style>