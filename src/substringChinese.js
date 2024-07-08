export function substringChinese (strValue) {
  if (!strValue) return ''

  const regexp = /[\u4e00-\u9fa5]/g
  const array = [...strValue.matchAll(regexp)]

  const first = array[0]
  const last = array[array.length - 1]
  return strValue.substring(first.index, last.index + 1)
}
