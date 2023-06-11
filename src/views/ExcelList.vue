<script setup lang="ts">
import type { TabPaneName } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { useCounterStore } from '@/stores/counter'
import { reactive, ref } from 'vue'
import router from '@/router'

const store = useCounterStore()
const search = ref('')
const TableVisible = ref(false)
const activeName = ref('配种记录')
const searchList = ref([])
const exportObj = reactive({ downloadLoading: false })
const selectId = ref()
const tabListRef = ref([])
const formatJson = (filterVal: any, jsonData: any) => {
  return jsonData.map((v: { [x: string]: any }) =>
    filterVal.map((j: string | number) => {
      return v[j]
    })
  )
}
const handleDownload = () => {
  exportObj.downloadLoading = true
  import('@/utils/Export2Excel').then((excel) => {
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
    const data = formatJson(tHeader, store.excelList)
    excel.export_json_to_excel({
      header: tHeader,
      data,
      filename: '羊只基础数据情况表',
      autoWidth: false,
      bookType: 'xlsx',
      multiHeader: [
        ['羊只基础数据情况表', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', '', '单位：只、公斤、厘米', '', '', ''],
        [
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
          '断奶',
          '',
          '',
          '',
          '备注'
        ]
      ],
      merges: [
        'A1:P1',
        'M2:P2',
        'A3:A4',
        'B3:B4',
        'C3:C4',
        'D3:D4',
        'E3:E4',
        'F3:F4',
        'G3:G4',
        'H3:H4',
        'I3:I4',
        'J3:J4',
        'K3:K4',
        'L3:O3',
        'P3:P4'
      ]
    } as any)
    exportObj.downloadLoading = false
  })
}

const handleRead = (index: number, row: any) => {
  const href = router.resolve({ name: 'sheepDetails', query: { id: row['耳号'] } })
  window.open(href.href, '_blank')
}
const readSheep = (index: number, row: any) => {
  selectId.value = row['耳号']
  const tabList = store.detailList['配种记录'].filter((item: { [x: string]: any }) => {
    return item[getId('配种记录')] == selectId.value
  })

  tabListRef.value = tabList
  TableVisible.value = true
}
const onSearch = (value: string) => {
  const infoArr = store.excelList.filter((item: any) => {
    console.log(item['耳号'], '筛选')
    if (item['耳号'] === Number(value)) {
      return item
    }
  })
  console.log(infoArr, 'info')
  searchList.value = infoArr
}
const getId = (name: string) => {
  return name === '配种记录'
    ? '耳号'
    : name === '采精记录表'
    ? '公羊号'
    : name === '出生记录表'
    ? '电子耳号'
    : name === '死淘记录表'
    ? '耳标'
    : name === '转圈记录表'
    ? '耳号'
    : name === '分娩记录'
    ? '母羊耳号'
    : ''
}
const tabsClick = (name: TabPaneName) => {
  store.detailList &&
    Object.keys(store.detailList).forEach((key) => {
      if (key === name && store.detailList) {
        const tabList = store.detailList[key].filter((item: { [x: string]: any }) => {
          return item[getId(name)] == selectId.value
        })
        console.log(tabList, 'tabList')

        tabListRef.value = tabList
      }
    })
  // console.log(name)
}
</script>

<template>
  <main>
    <header>
      <el-button
        :loading="exportObj.downloadLoading"
        style="margin: 0 0 8px 0"
        type="primary"
        @click="handleDownload"
      >
        导出当前表格
      </el-button>
      <el-input
        v-model="search"
        class="search"
        placeholder="请输入耳号"
        :suffix-icon="Search"
        @change="onSearch"
      />
    </header>

    <el-table :data="searchList.length ? searchList : store.excelList" style="width: 100%">
      <el-table-column prop="序号" label="序号" width="80" />
      <el-table-column prop="品种" label="品种" width="100" />
      <el-table-column prop="耳号" label="耳号" width="120" />
      <el-table-column prop="性别" label="性别" width="60" />
      <el-table-column prop="出生日期" label="出生日期" />
      <el-table-column prop="同胞数" label="同胞数" width="80" />
      <el-table-column prop="胎次" label="胎次" width="80" />
      <el-table-column prop="初生重" label="初生重" width="100" />
      <el-table-column prop="父耳号" label="父耳号" width="120" />
      <el-table-column prop="母耳号" label="母耳号" width="120" />
      <el-table-column label="断奶">
        <el-table-column prop="体 重" label="体 重" width="80" />
        <el-table-column prop="体 高" label="体 高" width="80" />
        <el-table-column prop="体 长" label="体 长" width="80" />
        <el-table-column prop="胸 围" label="胸 围" width="80" />
      </el-table-column>
      <el-table-column prop="备注" label="备注" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" size="small" @click="readSheep(scope.$index, scope.row)"
            >查看详情</el-button
          >
          <el-button type="primary" size="small" @click="handleRead(scope.$index, scope.row)"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </main>
  <el-dialog v-model="TableVisible" title="详细信息">
    <el-tabs v-model="activeName" @tab-change="tabsClick">
      <el-tab-pane label="配种记录" name="配种记录">
        <el-table size="small" :data="tabListRef">
          <el-table-column prop="配种时间" label="配种时间" />
          <el-table-column prop="耳号" label="耳号" />
          <el-table-column prop="与配公羊" label="与配公羊" />
          <el-table-column prop="备注" label="备注" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="采精记录" name="采精记录表">
        <el-table size="small" :data="tabListRef">
          <el-table-column prop="时间" label="时间" />
          <el-table-column prop="公羊号" label="公羊号" />
          <el-table-column prop="精液量" label="精液量" />
          <el-table-column prop="密度" label="密度" />
          <el-table-column prop="活力" label="活力" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="出生记录" name="出生记录表">
        <el-table size="small" :data="tabListRef">
          <el-table-column prop="可视耳号" label="可视耳号" />
          <el-table-column prop="电子耳号" label="电子耳号" />
          <el-table-column prop="胎数" label="胎数" />
          <el-table-column prop="♂" label="♂" />
          <el-table-column prop="♀" label="♀" />
          <el-table-column prop="出生日期" label="出生日期" />
          <el-table-column prop="羔羊耳号、体重" label="羔羊耳号、体重" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="羊只死淘记录" name="死淘记录表">
        <el-table size="small" :data="tabListRef">
          <el-table-column prop="日期" label="日期" />
          <el-table-column prop="阶段" label="阶段" />
          <el-table-column prop="耳标" label="耳标" />
          <el-table-column prop="性别" label="性别" />
          <el-table-column prop="圈舍" label="圈舍" />
          <el-table-column prop="死/淘" label="死/淘" />
          <el-table-column prop="死淘原因" label="死淘原因" />
          <el-table-column prop="记录人员" label="记录人员" />
          <el-table-column prop="淘汰价格" label="淘汰价格" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="转圈记录" name="转圈记录表">
        <el-table size="small" :data="tabListRef">
          <el-table-column prop="日期" label="日期" />
          <el-table-column prop="转出圈舍" label="转出圈舍" />
          <el-table-column prop="转入圈舍" label="转入圈舍" />
          <el-table-column prop="耳号" label="耳号" />
          <el-table-column prop="调整数量" label="调整数量" />
          <el-table-column prop="调整原因" label="调整原因" />
          <el-table-column prop="记录人" label="记录人" />
          <el-table-column prop="备注" label="备注" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="分娩记录" name="分娩记录">
        <el-table size="small" :data="tabListRef">
          <el-table-column prop="分娩日期" label="分娩日期" />
          <el-table-column prop="序号" label="序号" />
          <el-table-column prop="母羊耳号" label="母羊耳号" />
          <el-table-column prop="转入栋舍" label="转入栋舍" />
          <el-table-column prop="转入栏位" label="转入栏位" />
          <el-table-column prop="母羊重量" label="母羊重量" />
          <el-table-column prop="健羔数" label="健羔数" />
          <el-table-column prop="弱羔数" label="弱羔数" />
          <el-table-column prop="畸形数" label="畸形数" />
          <el-table-column prop="死胎数" label="死胎数" />
          <el-table-column prop="木乃伊数" label="木乃伊数" />
          <el-table-column prop="窝总重" label="窝总重" />
          <el-table-column prop="产羔难易" label="产羔难易" />
          <el-table-column prop="负责人" label="负责人" />
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<style scoped>
main {
  padding: 12px;
}
header {
  display: flex;
  justify-content: space-between;
}
.search {
  width: 400px;
}
</style>
