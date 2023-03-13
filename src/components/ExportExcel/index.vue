<template>
  <div class="app-container">
    <div>
<!--      <FilenameOption v-model="filename" />-->
<!--      <AutoWidthOption v-model="autoWidth" />-->
<!--      <BookTypeOption v-model="bookType" />-->
      <el-button :loading="downloadLoading" style="margin:0 0 20px 0;" type="primary" @click="handleDownload">
        导出当前表格
      </el-button>
    </div>

    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading..." border fit highlight-current-row>
      <el-table-column align="center" label="Id" width="95">
        <template v-slot="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template v-slot="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template v-slot="scope">
          <el-tag>{{ scope.row.author }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Readings" width="115" align="center">
        <template v-slot="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Date" width="220">
        <template v-slot="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.timestamp }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { parseTime } from '@/utils';

export default {
  name: 'ExportExcel',
  data() {
    return {
      list: null,
      listLoading: true,
      downloadLoading: false,
      filename: '羊只基础数据情况表',
      autoWidth: false,
      bookType: 'xlsx'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      // fetchList().then(response => {
      //   this.list = response.data.items
        this.listLoading = false
      // })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/utils/Export2Excel').then(excel => {
        const tHeader = ['序号', '品种', '耳号', '性别','出生日期','同胞数', '胎次', '初生重','父耳号','母耳号','照片','体 重','体 高','体 长','胸 围','备注']
        const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
        const list = this.list||[];
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType,
          multiHeader: [['羊只基础数据情况表','','','','','','','','','','','','','','','',],['','','','','','','','','','','','','单位：只、公斤、厘米','','','',],['序号', '品种', '耳号', '性别','出生日期','同胞数', '胎次', '初生重','父耳号','母耳号','照片','断奶','','','','备注']],
          merges: ['A1:P1','M2:P2','A3:A4','B3:B4','C3:C4','D3:D4','E3:E4','F3:F4','G3:G4','H3:H4','I3:I4','J3:J4','K3:K4','L3:O3','P3:P4' ]
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style>
.radio-label {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 30px;
}
</style>