import readline from 'readline'
import fs from 'fs'

/**
 * 解析多语言文本内容
 * @param line
 * @returns {string}
 */
function getText (line) {
  let array = line.match(/'(.*?)'/g)
  if (Array.isArray(array)) {
    let str = array[0]
    return str.substring(1, str.length - 1)
  }
  return ''
}

/**
 * 解析多语言字段 code
 * @param str
 * @returns {string}
 */
function getCode (str) {
  const indexColon = str.indexOf(':')
  if (indexColon === -1) {
    return ''
  }
  return str.substring(0, indexColon)
}

/**
 * 读取并逐行处理
 * @param filePath
 * @returns {Promise<unknown>}
 */
function readSource (filePath) {
  return new Promise((resolve, reject) => {
    // let count = 0
    let index = 0
    let map = []

    const rl = readline.createInterface({
      input: fs.createReadStream(filePath),
      crlfDelay: Infinity
    })

    rl.on('line', (line) => {
      const text = line.trim()

      const lineCode = index + 1
      const code = getCode(text)
      const content = getText(text)

      const str = `${lineCode},${code},"${content}"`
      map.push(str)
      index++
    })

    rl.on('close', () => {
      console.log(`total ${index + 1}.`)
      resolve(map)
    })
  })
}


function exportCsv (sourse, target) {
  readSource(sourse).then(map => {
    const mapStr = map.join('\n')
    const content = `\ufeff${mapStr}`
    fs.writeFile(target, content, { encoding: 'utf8' }, (err) => {
      console.log(err)
    })
  })
}

exportCsv('../IO/zh.js', '../IO/outZh.csv')
exportCsv('../IO/en.js', '../IO/outEn.csv')
