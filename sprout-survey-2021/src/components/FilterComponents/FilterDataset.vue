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
        <filter-rule></filter-rule>
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
      filters: [],
    }
  },
  created() {
    this.getRandomName();
    this.getRandomColor();

    this.nameToKey();
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
        this.setBorderColor = `${newValue.set.border?.split('#')[1]}`
      }
    }
  },
  methods: {
    getRandomArrayMember(array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    getRandomName() {
      const nameStore = ['Toothless', 'Hiccup', 'Stoick', 'Valka', 'Astrid', 'Stormfly', 'Thotfury', 'Cloudjumper', 'Drago', 'Hookfang', 'Eret', 'Skrill-ex', 'Gobber', 'Flying sausage'];
      return this.getRandomArrayMember(nameStore);
    },
    getRandomColor() {
      if (this.setName === 'Toothless')  {
        this.setColor = '000';
        this.setBorderColor = '6688FF';
        return;
      }
      if (this.setName === 'Thotfury') {
        this.setColor = 'fff';
        return;
      }
      // maybe not so random after all? 🐰🐰🐰🥚🥚🥚
      
      const colorStore = ['#f00', '#f80', '#a35', "#193", '#17a', '#149', '#ffeaa9', '#c98e30', '#c90000'];
      return this.getRandomArrayMember(colorStore);
    },
    nameToKey() {
      this.setKey = this.setName.trim().toLowerCase().replaceAll(' ', '-');
    },
    emitUpdated() {
      this.$emit(
        'input',
        {
          set: {
            name: this.setName,
            color: `#${this.setColor}`,
            border: `1px solid #${this.setBorderColor}`,
            key: this.setKey
          },
          filters: this.filters
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
