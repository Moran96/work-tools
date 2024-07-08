import { parseComponent } from "vue-template-compiler"
import readline from 'readline'
import fs from 'fs'

export function test (p = 'D:/project/general-web/src/views/device/detail/components/DebugAnalyze/index.vue') {
  // load file
  const file = fs.readFileSync(p, 'utf8')
  // parse sfc content
  const sfc = parseComponent(file)

  console.log(sfc.template.content)

  const str = sfc.template.content
  const str2 = str.replace(/(<!--.*?-->)/g, '')
  console.log(str2)
  // console.log(sfc.script)
  // console.log(sfc.styles)
}
