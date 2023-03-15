<script setup lang='ts'>
import { useCounterStore } from '@/stores/counter'
import { reactive } from 'vue'

const store = useCounterStore()
const exportObj = reactive({ downloadLoading: false })
const formatJson = (filterVal, jsonData) => {
  return jsonData.map(v => filterVal.map(j => {
    return v[j]
  }))
}
const handleDownload = () => {
  exportObj.downloadLoading = true
  import('@/utils/Export2Excel').then(excel => {
    const tHeader = ['序号', '品种', '耳号', '性别', '出生日期', '同胞数', '胎次', '初生重', '父耳号', '母耳号', '照片', '体 重', '体 高', '体 长', '胸 围', '备注']
    const data = formatJson(tHeader, store.excelList)
    excel.export_json_to_excel({
      header: tHeader,
      data,
      filename: '羊只基础数据情况表',
      autoWidth: false,
      bookType: 'xlsx',
      multiHeader: [['羊只基础数据情况表', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', '', '', '单位：只、公斤、厘米', '', '', ''], ['序号', '品种', '耳号', '性别', '出生日期', '同胞数', '胎次', '初生重', '父耳号', '母耳号', '照片', '断奶', '', '', '', '备注']],
      merges: ['A1:P1', 'M2:P2', 'A3:A4', 'B3:B4', 'C3:C4', 'D3:D4', 'E3:E4', 'F3:F4', 'G3:G4', 'H3:H4', 'I3:I4', 'J3:J4', 'K3:K4', 'L3:O3', 'P3:P4']
    })
    exportObj.downloadLoading = false
  })
}

const handleRead = (index, row)=>{
  console.log(index, row)
}
</script>

<template>
  <main>
    <el-button :loading="exportObj.downloadLoading" style="margin:0 0 8px 0;" type="primary" @click="handleDownload">
      导出当前表格
    </el-button>
    <el-table :data='store.excelList' style='width: 100%'>
      <el-table-column prop='序号' label='序号' width='80' />
      <el-table-column prop='品种' label='品种' width='100' />
      <el-table-column prop='耳号' label='耳号' width='120' />
      <el-table-column prop='性别' label='性别' width='60' />
      <el-table-column prop='出生日期' label='出生日期' />
      <el-table-column prop='同胞数' label='同胞数' width='80' />
      <el-table-column prop='胎次' label='胎次' width='80' />
      <el-table-column prop='初生重' label='初生重' width='100' />
      <el-table-column prop='父耳号' label='父耳号' width='120' />
      <el-table-column prop='母耳号' label='母耳号' width='120' />
      <el-table-column prop='照片' label='照片' width='120' />
      <el-table-column label='断奶'>
        <el-table-column prop='体 重' label='体 重' width='80' />
        <el-table-column prop='体 高' label='体 高' width='80' />
        <el-table-column prop='体 长' label='体 长' width='80' />
        <el-table-column prop='胸 围' label='胸 围' width='80' />
      </el-table-column>
      <el-table-column prop='备注' label='备注' />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type='primary' size="small" @click="handleRead(scope.$index, scope.row)"
          >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </main>
</template>

<style scoped>
main{
  padding: 12px;
}
</style>