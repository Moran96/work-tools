import { statistics } from './src/statistics.js'
import { test } from './src/statistics_v2.js'
import { getUserInput } from './src/userInput.js'
import { substringChinese } from './src/substringChinese.js'

getUserInput('Please input file path:\n', (p) => {
  // statistics(p).then(map => {
  //   const arr = []
  //   map.forEach((value, key, map) => {
  //     const format = substringChinese(value.trim())
  //     // console.log(`${key + 1}\t ${value} \t ${format}`)
  //     arr.push({
  //       lineCode: key + 1,
  //       content: format,
  //       source: value.trim()
  //     })
  //   })
  //   console.table(arr)
  //   if (!arr.length) {
  //     console.log('Not matched lines.')
  //     return
  //   }
  //   map.clear()
  // })
  test(p)
})
