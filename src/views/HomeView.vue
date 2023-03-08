<script setup lang="ts">
import UploadExcel from "@/components/UploadExcel.vue";
import ExportExcel from "@/components/ExportExcel/index.vue";
import {ref} from "vue";

const excelData = ref();
const onSuccess = (data:any)=>{
  console.log(data, 'data')
}
</script>

<template>
  <main>
    <UploadExcel :on-success="onSuccess" />
    <ExportExcel></ExportExcel>
  </main>
</template>
