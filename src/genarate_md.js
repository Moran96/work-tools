/**
 * A-Z 65 to 90
 * a-z 97 to 122
 * 0-9 48 to 57
 */

function generateWord (start = 97, end = 122) {
  const arr = []
  for (let i = start; i < end + 1; i++) {
    const ele = String.fromCharCode(i)
    arr.push(ele)
  }
  return arr
}

function main () {
  const list = generateWord()
  list.forEach(word => {
    const template = `- [${word}] value is **${word}**`
    console.log(template)
  })
}

main()
