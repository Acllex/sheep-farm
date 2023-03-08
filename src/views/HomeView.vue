<script setup lang="ts">
import UploadExcel from "@/components/UploadExcel.vue";
import {useCounterStore} from "@/stores/counter";
import ExportExcel from "@/components/ExportExcel/index.vue";
const store = useCounterStore();

const onSuccess = ({header, results}:any)=>{
  if (results){
    console.log(results)
    store.increment(results);
  }
}
</script>

<template>
  <main>
    <UploadExcel :on-success="onSuccess" />
<!--    <ExportExcel></ExportExcel>-->
  </main>
</template>
