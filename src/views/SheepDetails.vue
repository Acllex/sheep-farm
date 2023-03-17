<script setup lang='ts'>
import { useRoute } from 'vue-router'
import { useCounterStore } from '@/stores/counter'
const store = useCounterStore()
import * as echarts from 'echarts/core'
import { TooltipComponent } from 'echarts/components'
import { TreeChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([TooltipComponent, TreeChart, CanvasRenderer])
import { ref, watch } from 'vue'

const route = useRoute()
const { index } = route.query
const tableValue = ref(store.excelList[Number(index)])
const chart = ref(null)

watch(chart, (n) => {
  if (n) {
    drawTree(n)
  }
})
const getChildren = (data: any[], result: any, fid: string, mid: string) => {
  for (const item of data) {
    if (item['耳号'] === fid) {
      const newItem = { name: item['耳号'], parent: '父', ...item, children: [] }
      result.push(newItem)
      getChildren(data, newItem.children, item['父耳号'], item['母耳号'])
    }
    if (item['耳号'] === mid) {
      const newItem = { name: item['耳号'], parent: '母', ...item, children: [] }
      result.push(newItem)
      getChildren(data, newItem.children, item['父耳号'], item['母耳号'])
    }
  }
}

const arrayToTree = (data: any, fid: string, mid: string) => {
  const result: any = { name: tableValue.value['耳号'], ...tableValue.value, children: [] }
  getChildren(data, result.children, fid, mid)
  return result
}

const drawTree = (n: any) => {
  const myChart = echarts.init(n)
  const treeData = arrayToTree(store.excelList, tableValue.value['父耳号'], tableValue.value['母耳号'])
  console.log(treeData, 'treeData')

  let option
  myChart.showLoading()

  myChart.hideLoading()
  myChart.setOption(
    (option = {
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
      },
      series: [
        {
          type: 'tree',
          data: [treeData],
          top: '1%',
          left: '7%',
          bottom: '1%',
          right: '20%',
          symbolSize: 7,
          tooltip: {
            formatter: (param: any) => {
              const {data} = param;
              return `耳号：${data['耳号']}<br/>品种：${data['品种']}<br/>性别：${data['性别']}<br/>出生日期：${data['出生日期']}<br/>同胞数：${data['同胞数']}<br/>胎次：${data['胎次']}<br/>初生重：${data['初生重']}`
            }
          },
          label: {
            position: 'left',
            verticalAlign: 'middle',
            align: 'right',
            fontSize: 14,
            formatter: (param: any) => {
              if (param?.data?.parent) {
                return `${param.data.parent} ${param.name}`
              } else {
                return param.name
              }
            }
          },
          leaves: {
            label: {
              position: 'right',
              verticalAlign: 'middle',
              align: 'left'
            }
          },
          emphasis: {
            focus: 'descendant'
          },
          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750
        }
      ]
    })
  )
}


</script>

<template>
  <div class='body'>
    <main>
      <header>
        <h1>种羊系谱</h1>
      </header>
      <section>
        <div class='table'>
          <div class='table-head'>
            <div class='left-head'>基本情况</div>
            <div>种羊照片</div>
          </div>
          <div class='table-main'>
            <div class='main-left'>
              <div class='left-top'>
                <div>品种</div>
                <div>{{ tableValue['品种'] }}</div>
                <div>耳标号</div>
                <div>{{ tableValue['耳号'] }}</div>
                <div>性别</div>
                <div>{{ tableValue['性别'] }}</div>
                <div>出生日期</div>
                <div>{{ tableValue['出生日期'] }}</div>
                <div>同胞数</div>
                <div>{{ tableValue['同胞数'] }}</div>
                <div>胎次</div>
                <div>{{ tableValue['胎次'] }}</div>
                <div>初生重</div>
                <div>{{ tableValue['初生重'] }}</div>
                <div>备注</div>
                <div>{{ tableValue['备注'] }}</div>
              </div>
              <div class='left-button'>
                <div>断奶</div>
                <div>
                  <div class='button-info'>
                    <div>体重</div>
                    <div>{{ tableValue['体 重'] }}</div>
                  </div>
                  <div class='button-info'>
                    <div>体高</div>
                    <div>{{ tableValue['体 高'] }}</div>
                  </div>
                  <div class='button-info'>
                    <div>体长</div>
                    <div>{{ tableValue['体 长'] }}</div>
                  </div>
                  <div class='button-info'>
                    <div>胸围</div>
                    <div>{{ tableValue['胸 围'] }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class='main-right'>
            </div>
          </div>
          <div class='table-tree'>
            <div id='echarts' ref='chart'></div>
          </div>
        </div>
      </section>
      <div class='end'>
        <div class='end-info'>
          <div>记录：</div>
          <div>技术负责人签字：</div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.body {
  background: #eee;
  padding: 20px 0;
}

main {
  width: 21cm;
  /*min-height: 29.7cm;*/
  background: white;
  margin: 0 auto;
  overflow: auto;
  padding: 1cm 1cm 2cm 1.5cm;
}

header {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 18px;
}

section {
  width: 100%;
  display: flex;
  justify-content: center;
}

.table {
  width: 90%;
  border: 1px solid #000;
}

.table-head {
  display: flex;
  border-bottom: 1px solid #000;
}

.table-head > div {
  width: 50%;
  display: flex;
  justify-content: center;
  padding: 10px 0;
  font-size: 18px;
}

.left-head {
  border-right: 1px solid #000;
}

.table-main {
  width: 100%;
  display: flex;
}

.table-main > div {
  width: 50%;
  display: flex;
}

.main-left {
  display: flex;
  flex-direction: column;
  font-size: 16px;
}

.left-top {
  display: flex;
  flex-wrap: wrap;
}

.left-top > div {
  width: 25%;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  padding: 6px 0;
  display: flex;
  justify-content: center;
}

.left-button > div:first-child {
  width: 100%;
  display: flex;
  justify-content: center;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  padding: 6px 0;
}

.left-button > div:last-child {
  width: 100%;
  display: flex;
}

.button-info {
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-info > div {
  width: 100%;
  text-align: center;
  padding: 6px 0;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
}

.main-right {
  border-bottom: 1px solid #000;
}

.table-tree {
  width: 100%;
  height: 500px;
}

#echarts {
  width: 100%;
  height: 100%;
}
.end{
  width: 100%;
  display: flex;
  justify-content: center;
}
.end-info{
  width: 90%;
  display: flex;
  margin-top: 20px;
}
.end-info>div{
  width: 50%;
  font-size: 20px;
  padding-left: 80px;
}
</style>