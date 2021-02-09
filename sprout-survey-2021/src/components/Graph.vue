<template>
  <div>
    <div class="graph-header">
      <h1>{{title}}</h1>
      <div>{{description}}</div>
    </div>
    <div class="graph-main">
      <div
        v-for="column of columns"
        :key="column"
      >
        <div class="graph-bars">
          <template 
            v-for="set of column.datasets"
          >
            <div
              :key="set"
              style="height: {{set.count / set.total}}%; background-color: {{set.color || '#fff'}}"
            >
            </div>
          </template>
        </div>
        <div class="column-label">
          {{column.label}}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Graph',
  props: {
    title: String,
    description: String,
    columns: Object,
  },
});
</script>