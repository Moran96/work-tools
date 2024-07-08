import fs from 'fs'
import { getUserInput } from './src/userInput.js'
import { statistics } from './src/statistics.js'
import { substringChinese } from './src/substringChinese.js'

const listFile = []

function getFilesAndFoldersInDir (path) {
  const items = fs.readdirSync(path)
  const result = []
  items.forEach(item => {
    const itemPath = `${path}/${item}`
    const stat = fs.statSync(itemPath)
    if (stat.isDirectory()) {
      let data = {
        // 文件夹
        type: 'folder',
        name: item
      }
      let children = getFilesAndFoldersInDir(itemPath)
      if (children && children.length) {
        data.children = children
      }
      result.push(data);
    } else {
      listFile.push({ path: itemPath })
      // 文件
      result.push({
        type: 'file',
        name: item
      })
    }
  });
  return result
}

function test (p) {
  statistics(p).then(map => {
    const arr = []
    map.forEach((value, key, map) => {
      const format = substringChinese(value.trim())
      // console.log(`${key + 1}\t ${value} \t ${format}`)
      arr.push({
        lineCode: key + 1,
        content: format,
        source: value.trim()
      })
    })

    console.log(`%c${p}`, 'color: red;')
    console.table(arr)
    if (!arr.length) {
      console.log('Not matched lines.')
      return
    }
    map.clear()
  })
}

getUserInput('Please input file path:\n', (p) => {
  let list = getFilesAndFoldersInDir(p)
  // console.log(list)
  // console.log(listFile)
  listFile.forEach(item => {
    test(item.path)
  })
})

