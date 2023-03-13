<script setup lang="ts">
import ExportExcel from "@/components/ExportExcel/index.vue";
import {useCounterStore} from "@/stores/counter";
const store = useCounterStore();
</script>

<template>
  <div>
    <ExportExcel :excelData="store.excelList"></ExportExcel>
  </div>
</template>