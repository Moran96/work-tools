import fs from 'fs'
import { statistics } from './src/statistics.js'
import { translate } from './src/translation.js'
import { substringChinese } from './src/substringChinese.js'

// 每个单词首字母大写
function strUpperCase (s) {
  const countsOfWords = s.split(/\s+/).length
  if (countsOfWords > 4) {
    return sentenceUpperCase(s)
  } else {
    return wordsUpperCase(s)
  }
}

// 每个单词首字母大写
function wordsUpperCase (s) {
  return s.toLowerCase().split(/\s+/).map(function (item, index) {
    return item.slice(0, 1).toUpperCase() + item.slice(1)
  }).join(' ')
}

// 整个句子首字母大写
function sentenceUpperCase (s) {
  return s.slice(0, 1).toUpperCase() + s.slice(1)
}

const p = "./IO/en.js"
// const p = 'D:/xxxxxx/src/lang/en.js'
statistics(p).then(map => {
  const arr = []
  map.forEach((value, key, map) => {
    const format = substringChinese(value.trim())
    arr.push({
      lineCode: key,
      source: value,
      content: format
    })
  })
  if (!arr.length) {
    console.log('Not matched lines.')
    return
  }
  map.clear()
  const arrStr = arr.map(item => item.content)
  translate(arrStr.join('\n')).then(res => {
    const returnArr = res.split('\n')

    const data = fs.readFileSync(p, 'utf8').split('\n')

    arr.forEach((item, index) => {
      // const result = arr.length > 4 ? strFirstUpperCase(returnArr[index]) : strUpperCase(returnArr[index])
      const result = strUpperCase(returnArr[index])

      console.log(`${item.lineCode}\t ${item.content}\t ${result}`)
      data.splice(item.lineCode, 1, item.source.replace(item.content, result))
    })
    // write
    fs.writeFileSync(p, data.join('\n'), 'utf8')
  })
})
