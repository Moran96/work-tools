import axios from 'axios'
import CryptoJS from 'crypto-js'

function truncate (q) {
  const len = q.length;
  if(len <= 20) return q
  return q.substring(0, 10) + len + q.substring(len-10, len)
}

function checkValid (result) {
  if (!result) return false
  if (!Array.isArray(result)) return false
  if (!result.length) return false
  return true
}

export function translate (str) {
  const appKey = '64c4a171bee57a5c';
  const key = '2B49MOA7gb4rhjX5zDbwRNVforhZiMzk';//注意：暴露appSecret，有被盗用造成损失的风险

  const salt = (new Date).getTime();
  const curtime = Math.round(new Date().getTime() / 1000)
  const query = str // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
  const str1 = appKey + truncate(query) + salt + curtime + key
  const sign = CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex);

  const data = {
    from: 'zh-CHS',
    to: 'en',
    signType: 'v3',
    curtime: curtime,
    salt: salt,
    sign: sign,
    appKey: appKey,
    q: query,
    vocabId: '' // 您的用户词表ID,
  }

  return new Promise((resolve, reject) => {
    axios.post('https://openapi.youdao.com/api', data, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(res => {
      if (!res.data) {
        reject(new Error('Not res.data'))
      }
      const result = res.data.translation
      const valid = checkValid(result)
      if (valid) {
        resolve(result[0])
      }
      reject(new Error('Result not valid'))
    }).catch(err => {
      reject(err)
    })
  })
}
