var fs = require('fs-extra')
var os = require('os')
var rl =  require('readline')

export function readWriteFileByLineWithProcess (readName, writeName, callback){
  const readStream = fs.createReadStream(readName);
  const writeStream = fs.createWriteStream(writeName);
  const readLine = rl.createInterface({
    input: readStream
  })
  readLine.on('line',function(line){
    var rs = callback(line);
    writeStream.write(rs + os.EOL);
  })
}

exports.readWriteFileByLineWithProcess = readWriteFileByLineWithProcess
