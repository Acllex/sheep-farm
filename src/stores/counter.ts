import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const excelList = ref();
  // const doubleCount = computed(() => count.value * 2)
  function increment(value:any) {
    excelList.value = value;
  }

  return { excelList, increment }
})
