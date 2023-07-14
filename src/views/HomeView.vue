<script setup lang="ts">
import UploadExcel from '@/components/UploadExcel.vue'
import { useCounterStore } from '@/stores/counter'
import { export_json_to_excel } from '@/utils/Export2Excel.js'
import router from '@/router'
import { downFileIframe } from '@/utils/index'
import { computed } from 'vue'
const store = useCounterStore()

const onDownload = () => {
  downFileIframe('/sheep-farm/favicon.ico')
  // window.open('/sheep-farm/favicon.ico', '_self')
  const tHeader = [
    '序号',
    '品种',
    '耳号',
    '性别',
    '出生日期',
    '同胞数',
    '胎次',
    '初生重',
    '父耳号',
    '母耳号',
    '照片',
    '体 重',
    '体 高',
    '体 长',
    '胸 围',
    '备注'
  ]
  // export_json_to_excel({
  //   header: tHeader,
  //   data: [],
  //   filename: '羊只基础数据情况表',
  //   autoWidth: false,
  //   bookType: 'xlsx',
  //   multiHeader: [
  //     ['羊只基础数据情况表', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  //     ['', '', '', '', '', '', '', '', '', '', '', '', '单位：只、公斤、厘米', '', '', ''],
  //     [
  //       '序号',
  //       '品种',
  //       '耳号',
  //       '性别',
  //       '出生日期',
  //       '同胞数',
  //       '胎次',
  //       '初生重',
  //       '父耳号',
  //       '母耳号',
  //       '照片',
  //       '断奶',
  //       '',
  //       '',
  //       '',
  //       '备注'
  //     ]
  //   ] as any,
  //   merges: [
  //     'A1:P1',
  //     'M2:P2',
  //     'A3:A4',
  //     'B3:B4',
  //     'C3:C4',
  //     'D3:D4',
  //     'E3:E4',
  //     'F3:F4',
  //     'G3:G4',
  //     'H3:H4',
  //     'I3:I4',
  //     'J3:J4',
  //     'K3:K4',
  //     'L3:O3',
  //     'P3:P4'
  //   ] as any
  // })
}

const onSuccess = ({ results }: any) => {
  if (results) {
    const tableArr = []
    for (let i = 3; i < results.length; i++) {
      const tableObj: any = {}
      const item = results[i]
      Object.keys(results[2]).forEach((key, index) => {
        if (Object.keys(item).indexOf(key) === -1) {
          item[key] = '--'
        }
        tableObj[results[2][key]] = item[key]
      })
      tableArr.push(tableObj)
    }
    store.increment(tableArr)
    // router.push('/excel-list')
  }
}
const onDetail = (data: any) => {
  if (data.length === 0) return
  const detailObj: any = {}
  data.forEach((item: { header?: any; results?: any }) => {
    const { header, results } = item
    const tableArr = []
    switch (header) {
      case '配种记录':
        for (let i = 2; i < results.length; i++) {
          const tableObj: any = {}
          const item = results[i]
          Object.keys(results[1]).forEach((key, index) => {
            if (Object.keys(item).indexOf(key) === -1) {
              item[key] = '--'
            }
            tableObj[key] = { name: results[1][key], value: item[key] }
          })
          tableArr.push(
            Object.values(tableObj)
              .slice(0, 5)
              .reduce((acc: any, curr: any) => {
                acc[curr.name] = curr.value
                return acc
              }, {})
          )
          tableArr.push(
            Object.values(tableObj)
              .slice(5)
              .reduce((acc: any, curr: any) => {
                acc[curr.name] = curr.value
                return acc
              }, {})
          )
        }
        break
      case '采精记录表':
        for (let i = 2; i < results.length; i++) {
          const tableObj: any = {}
          const item = results[i]

          Object.keys(results[1]).forEach((key) => {
            if (Object.keys(item).indexOf(key) === -1) {
              item[key] = '--'
            }

            tableObj[key] = { name: results[1][key], value: item[key] }
          })

          tableArr.push(
            Object.values(tableObj)
              .slice(0, 5)
              .reduce((acc: any, curr: any) => {
                acc[curr.name] = curr.value
                return acc
              }, {})
          )
          tableArr.push(
            Object.values(tableObj)
              .slice(5)
              .reduce((acc: any, curr: any) => {
                acc[curr.name] = curr.value
                return acc
              }, {})
          )
        }
        break
      case 'B超(测孕)记录表':
        for (let i = 3; i < results.length; i++) {
          const tableObj: any = {}
          const item = results[i]
          Object.keys(results[1]).forEach((key, index) => {
            if (results[1][key] === '是否怀孕') {
              if (key === '__EMPTY_1') {
                item[key] = item['__EMPTY_1'] || item['__EMPTY_2'] || '--'
              } else if (key === '__EMPTY_5') {
                item[key] = item['__EMPTY_5'] || item['__EMPTY_6'] || '--'
              }
            } else if (Object.keys(item).indexOf(key) === -1) {
              item[key] = '--'
            }
            tableObj[key] = { name: results[1][key], value: item[key] }
          })
          tableArr.push(
            Object.values(tableObj)
              .slice(0, 3)
              .reduce((acc: any, curr: any) => {
                acc[curr.name] = curr.value
                return acc
              }, {})
          )
          tableArr.push(
            Object.values(tableObj)
              .slice(3, 8)
              .reduce((acc: any, curr: any) => {
                acc[curr.name] = curr.value
                return acc
              }, {})
          )
        }
        break
      case '出生记录表':
        for (let i = 2; i < results.length; i++) {
          const tableObj: any = {}
          const item = results[i]
          Object.keys(results[1]).forEach((key, index) => {
            if (Object.keys(item).indexOf(key) === -1) {
              item[key] = '--'
            }
            tableObj[key] = { name: results[1][key], value: item[key] }
          })
          tableArr.push(
            Object.values(tableObj).reduce((acc: any, curr: any) => {
              acc[curr.name] = curr.value
              return acc
            }, {})
          )
        }
        break
      case '断奶羊只记录表':
        for (let i = 2; i < results.length; i++) {
          const tableObj: any = {}
          const item = results[i]
          Object.keys(results[1]).forEach((key, index) => {
            if (Object.keys(item).indexOf(key) === -1) {
              item[key] = '--'
            }
            tableObj[key] = { name: results[1][key], value: item[key] }
          })
          tableArr.push(
            Object.values(tableObj)
              .slice(0, 4)
              .reduce((acc: any, curr: any) => {
                acc[curr.name] = curr.value
                return acc
              }, {})
          )
          tableArr.push(
            Object.values(tableObj)
              .slice(4, 8)
              .reduce((acc: any, curr: any) => {
                acc[curr.name] = curr.value
                return acc
              }, {})
          )
        }
        break
      case '死淘记录表':
        for (let i = 1; i < results.length; i++) {
          const tableObj: any = {}
          const item = results[i]
          Object.keys(results[0]).forEach((key, index) => {
            if (Object.keys(item).indexOf(key) === -1) {
              item[key] = '--'
            }
            tableObj[key] = { name: results[0][key], value: item[key] }
          })
          tableArr.push(
            Object.values(tableObj).reduce((acc: any, curr: any) => {
              acc[curr.name] = curr.value
              return acc
            }, {})
          )
        }
        break
      case '转圈记录表':
        for (let i = 1; i < results.length; i++) {
          const tableObj: any = {}
          const item = results[i]
          Object.keys(results[0]).forEach((key, index) => {
            if (Object.keys(item).indexOf(key) === -1) {
              item[key] = '--'
            }
            tableObj[key] = { name: results[0][key], value: item[key] }
          })
          tableArr.push(
            Object.values(tableObj).reduce((acc: any, curr: any) => {
              acc[curr.name] = curr.value
              return acc
            }, {})
          )
        }
        break
      case '分娩记录':
        for (let i = 1; i < results.length; i++) {
          const tableObj: any = {}
          const item = results[i]
          Object.keys(results[0]).forEach((key, index) => {
            if (Object.keys(item).indexOf(key) === -1) {
              item[key] = '--'
            }
            tableObj[key] = { name: results[0][key], value: item[key] }
          })
          tableArr.push(
            Object.values(tableObj).reduce((acc: any, curr: any) => {
              acc[curr.name] = curr.value
              return acc
            }, {})
          )
        }
        break
      case '耳号变更表':
        for (let i = 1; i < results.length; i++) {
          const tableObj: any = {}
          const item = results[i]
          Object.keys(results[0]).forEach((key, index) => {
            if (Object.keys(item).indexOf(key) === -1) {
              item[key] = '--'
            }
            tableObj[key] = { name: results[0][key], value: item[key] }
          })
          tableArr.push(
            Object.values(tableObj).reduce((acc: any, curr: any) => {
              acc[curr.name] = curr.value
              return acc
            }, {})
          )
        }
        break
      default:
        break
    }
    detailObj[header] = tableArr
  })
  console.log(detailObj, 'detailObj')
  store.setDetail(detailObj)
}
const goToList = () => {
  console.log(store.detailList, store.excelList.length)

  if (!store.detailList || store.excelList.length === 0) return

  router.push('/excel-list')
}
const isToList = computed(() => {
  return store.detailList && store.excelList.length > 0 ? false : true
})
</script>

<template>
  <main>
    <div class="download">
      <h1>请先下载当前系统的excel模板，填写好后上传</h1>
      <el-button size="large" type="primary" @click="onDownload">下载模板</el-button>
    </div>
    <UploadExcel :on-success="onSuccess" :on-detail="onDetail" />
  </main>
  <footer>
    <el-button size="large" type="primary" @click="goToList" :disabled="isToList"
      >跳转列表页</el-button
    >
  </footer>
</template>
<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 24px;
}

main > .download {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0;
  margin-bottom: 24px;
}
footer {
  width: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 200px;
}
</style>
