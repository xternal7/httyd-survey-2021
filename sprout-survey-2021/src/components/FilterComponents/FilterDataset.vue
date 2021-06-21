<template>
  <div class="root flex flex-row">

    <!-- #region set info -->
    <div class="flex flex-nogrow flex-column">
      <div class="">
        <b>SET OPTIONS</b>
      </div>
      <div class="">
        Set name: <input v-model="setName" />
      </div>
      <div class="">
        <div class="set-color-key" :style="{'background-color': '#' + setColor, 'border-color': '#' + (setBorderColor || '000')}"></div>
        Set color:  #<input v-model="setColor" />
      </div>
      <div class="">
        <div class="set-color-key" :style="{'background-color': '#' + setColor, 'border-color': '#' + (setBorderColor || '000')}"></div>
        Set border:  #<input v-model="setBorderColor" />
      </div>
      <div class="">
        Set key: {{setKey}}
      </div>
    </div>
    <!-- #endregion -->
    <!-- #region set rules -->
    <div class="flex flex-grow flex-column">
      <div class="">
        <b>SET RULES</b>
      </div>
      <div class="">
        <filter-rule
          :value="filterFnTxt"
          @functionChanged="filterUpdated($event)"
        ></filter-rule>
      </div>
    </div>
    <!-- #endregion -->
    <div class="flex flex-nogrow flex-column">
      <div
        class=""
        @click="emitUpdated()"
      >
        Save
      </div>
      <div
        class=""
      >
        Delete (todo)
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FilterRule from './FilterRule.vue';

export default defineComponent({
  components: { FilterRule },
  name: 'FilterDataset',
  props: [
    'value'
  ],
  data() {
    return {
      setName: '',
      setColor: '',
      setBorderColor: '',
      setKey: '',
      filterFnTxt: 'if you see this the set is stuck. Try switching to a different set and then back again.',
    }
  },
  mounted() {
    if (this.value) {
      this.setName = this.value.set.name;
      this.setKey = this.value.set.key;
      this.setColor = this.value.set.color?.replace('#', '');
      this.setBorderColor = `${this.value.set.border?.split('#')[1] || ''}`;
      this.filterFnTxt = this.value.filterFnTxt;
    }
  },
  watch: {
    setName(newValue) {
      this.nameToKey();
    },
    value(newValue) {
      if (newValue) {
        this.setName = newValue.set.name;
        this.setKey = newValue.set.key;
        this.setColor = newValue.set.color?.replace('#', '');
        this.setBorderColor = `${newValue.set.border?.split('#')[1] || ''}`;
        this.filterFnTxt = newValue.filterFnTxt;
      }
    }
  },
  methods: {
    nameToKey() {
      this.setKey = this.setName.trim().toLowerCase().replaceAll(' ', '-');
    },
    filterUpdated(newValue) {
      this.filterFnTxt = newValue;
    },
    emitUpdated() {
      this.$emit(
        'save',
        {
          set: {
            name: this.setName,
            color: `#${this.setColor}`,
            border: this.setBorderColor ? `1px solid #${this.setBorderColor}` : undefined,
            key: this.setKey
          },
          filterFnTxt: this.filterFnTxt
        }
      )
    }
  }
});
</script>

<style lang="scss" scoped>
.set-color-key {
  display: inline-block;
  width: 1rem;
  height: 1rem;

  box-sizing: border-box;
  border: 1px solid;
}
</style>
