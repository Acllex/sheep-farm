/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time: any, cFormat: any) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  interface Map {
    [key: string]: any
  }
  const formatObj: Map = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result: any, key: string) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}
// 前端下载
export function downFileIframe(url: string, data?: { [x: string]: string }) {
  //文件下载通过iframe实现
  let iframe = document.createElement('iframe')
  const name = 'xxx' //这里最好是动态的，避免多个文件同时下载冲突
  iframe.name = name
  iframe.style.position = 'fixed'
  iframe.style.left = '10000px'
  document.body.appendChild(iframe)
  let form = document.createElement('form')
  form.action = url
  form.method = data ? 'POST' : 'GET'
  form.target = name
  if (data) {
    for (let k in data) {
      const input = document.createElement('input')
      input.name = k
      input.value = data[k]
      form.appendChild(input)
    }
  }
  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form) //提交完这个form就可以删了
  //iframe想删的话，延迟点儿时间，应为删的过快会造成还没开始下载就中断了请求
}
export function frontDownload() {
  var a = document.createElement('a') //创建一个<a></a>标签
  a.href = '/static/模板.xlsx' // 给a标签的href属性值加上地址，注意，这里是绝对路径，不用加 点.
  a.download = '下载啦.xlsx' //设置下载文件文件名，这里加上.xlsx指定文件类型，pdf文件就指定.fpd即可
  a.style.display = 'none' // 障眼法藏起来a标签
  document.body.appendChild(a) // 将a标签追加到文档对象中
  a.click() // 模拟点击了a标签，会触发a标签的href的读取，浏览器就会自动下载了
  a.remove() // 一次性的，用完就删除a标签
}
