import readline from 'readline'

export function getUserInput (msg, cb) {
  const q1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  q1.question(msg, function (filePath) {
    console.log(`Reading file: ${filePath}`)
    // statistics(filePath)
    cb(filePath)
    q1.close()
  })
}
