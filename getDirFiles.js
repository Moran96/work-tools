import fs from 'fs'
import chalk from 'chalk'
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

function processFile (p) {
  return new Promise((resolve, reject) => {
    statistics(p).then(map => {
      const arr = []
      map.forEach((value, key, map) => {
        const format = substringChinese(value.trim())
        arr.push({
          lineCode: key + 1,
          content: format,
          source: value.trim()
        })
      })

      map.clear()
      resolve(arr)
    })
  })
}

function processFiles (root, list) {
  let index = 0
  list.forEach((item) => {
    processFile(item.path).then((arr) => {
      ++index
      const idxLabel = `  ${index}  `
      const pathFromRoot = item.path.replace(root, '')

      console.log(chalk.bgCyan.hex('#FFFFFF')(idxLabel), chalk.redBright(pathFromRoot))
      console.table(arr)

      if (!arr.length) {
        console.log('Not matched lines.')
      }
    })
  })
}

getUserInput('Please input file path:\n', (p) => {
  getFilesAndFoldersInDir(p)
  processFiles(p, listFile)
})
