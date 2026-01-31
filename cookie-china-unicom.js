/**
 * @fileoverview Template to fetch China Unicom app cookie for Quantumult X
 * @Author: Your Name (iHuigu)
 */

// Quantumult X 规则：
// [rewrite_local]
// ^https:\/\/m\.client\.10010\.com url script-request-header cookie-china-unicom.js
// [mitm]
// hostname = m.client.10010.com

const CookieName = '中国联通'
const CookieKey = 'unicom_cookie'
const notify = (title, subtitle, body) => {
  $notify(title, subtitle, body)
}

const cookie = $request.headers['Cookie'] || $request.headers['cookie']

if (cookie) {
  if ($prefs.setValueForKey(cookie, CookieKey)) {
    notify(CookieName, '🎉 Cookie 获取成功！', '可以愉快地使用脚本啦！')
  } else {
    notify(CookieName, '❌ Cookie 保存失败', '请检查脚本设置')
  }
} else {
  notify(CookieName, '❌ 未获取到 Cookie', '请重新尝试获取')
}

$done({})
