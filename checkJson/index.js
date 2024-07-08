import en from './en.js'
import zh from './zh.js'

function getFieldInfo (obj) {
  if (typeof obj === 'object') {
    const objKeys = Object.keys(obj)
    return {
      count: objKeys.length,
      fields: objKeys.sort().join()
    }
  }
  if (typeof obj === 'string') {
    return {
      count: null,
      fields: null
    }
  }
  return {
    count: undefined,
    fields: undefined
  }
}

function checkLangs (langA, langB, filter = false) {
  const enSet = new Set(Object.keys(langA))
  const zhSet = new Set(Object.keys(langB))
  const union = new Set([...enSet, ...zhSet])

  const arrKeys = [...union]
  const arr = arrKeys.map((key) => {
    const infoA = getFieldInfo(langA[key])
    const infoB = getFieldInfo(langB[key])

    return {
      field: key,
      en: infoA.count,
      zh: infoB.count,
      countSame: Boolean(infoA.count === infoB.count),
      contentSame: infoA.fields === infoB.fields
    }
  })

  if (filter) {
    return arr.filter(item => {
      return Boolean(!item.countSame || !item.contentSame)
    })
  } else {
    return arr
  }
}

const table = checkLangs(en, zh, true)
console.table(table)
table.forEach(item => {
  const key = item.field
  console.log(key)
  console.table(checkLangs(en[key], zh[key], true))

})
