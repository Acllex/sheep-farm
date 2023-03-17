<script setup lang='ts'>
import UploadExcel from '@/components/UploadExcel.vue'
import { useCounterStore } from '@/stores/counter'
import { export_json_to_excel } from '@/utils/Export2Excel.js'
import router from '@/router'

const store = useCounterStore()

const onDownload = () => {
  const tHeader = ['序号', '品种', '耳号', '性别', '出生日期', '同胞数', '胎次', '初生重', '父耳号', '母耳号', '照片', '体 重', '体 高', '体 长', '胸 围', '备注']
  export_json_to_excel({
    header: tHeader,
    data: [],
    filename: '羊只基础数据情况表',
    autoWidth: false,
    bookType: 'xlsx',
    multiHeader: [['羊只基础数据情况表', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', '', '', '单位：只、公斤、厘米', '', '', ''], ['序号', '品种', '耳号', '性别', '出生日期', '同胞数', '胎次', '初生重', '父耳号', '母耳号', '照片', '断奶', '', '', '', '备注']],
    merges: ['A1:P1', 'M2:P2', 'A3:A4', 'B3:B4', 'C3:C4', 'D3:D4', 'E3:E4', 'F3:F4', 'G3:G4', 'H3:H4', 'I3:I4', 'J3:J4', 'K3:K4', 'L3:O3', 'P3:P4']
  })
}

const onSuccess = ({ results }: any) => {
  if (results) {
    const tableArr = []
    for (let i = 3; i < results.length; i++) {
      const tableObj = {}
      const item = results[i]
      Object.keys(results[2]).forEach((key, index) => {
        if (Object.keys(item).indexOf(key)===-1){
          item[key] = '--';
        }
        tableObj[results[2][key]] = item[key];
      })
      tableArr.push(tableObj)
    }
    store.increment(tableArr)
    router.push('/excel-list')
  }
}
</script>

<template>
  <main>
    <div class='download'>
      <h1>请先下载当前系统的excel模板，填写好后上传</h1>
      <el-button size='large' type='primary' @click='onDownload'>下载模板</el-button>
    </div>

    <UploadExcel :on-success='onSuccess' />
    <!--    <ExportExcel></ExportExcel>-->
  </main>
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
</style>