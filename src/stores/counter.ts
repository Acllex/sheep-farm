import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore(
  'counter',
  () => {
    const excelList = ref([])
    const detailList = ref(null) as any
    // const doubleCount = computed(() => count.value * 2)
    function increment(value: any) {
      excelList.value = value
    }
    function setDetail(value: any) {
      detailList.value = value
    }
    return { excelList, detailList, increment, setDetail }
  },
  {
    persist: true
  }
)
