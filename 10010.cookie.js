/*
 * 中国联通Cookie获取脚本
 * 使用说明：打开联通APP进行签到或抽奖操作，会自动获取Cookie
 */

const $ = new Env("联通Cookie");
const url = $request.url;
const headers = $request.headers;

if (url.includes("querySigninActivity") || 
    url.includes("daySign") || 
    url.includes("userLogin") || 
    url.includes("findActivityInfo")) {
    
    // 提取Cookie
    const cookie = headers["Cookie"] || headers["cookie"];
    
    if (cookie) {
        // 提取acw_tc
        const acwTcMatch = cookie.match(/acw_tc=([^;]+)/);
        // 提取JSESSIONID
        const jSessionIdMatch = cookie.match(/JSESSIONID=([^;]+)/);
        
        if (acwTcMatch) {
            $.setdata(acwTcMatch[1], "10010_token");
            $.log(`✅ 获取acw_tc成功: ${acwTcMatch[1].substring(0, 15)}...`);
        }
        
        if (jSessionIdMatch) {
            $.setdata(jSessionIdMatch[1], "10010_sessionId");
            $.log(`✅ 获取JSESSIONID成功: ${jSessionIdMatch[1].substring(0, 15)}...`);
        }
        
        // 保存User-Agent
        const userAgent = headers["User-Agent"] || headers["user-agent"];
        if (userAgent) {
            $.setdata(userAgent, "10010_ua");
        }
        
        if (acwTcMatch && jSessionIdMatch) {
            $.msg("联通Cookie", "✅ 获取成功", "请返回Quantumult X查看");
        }
    }
}

$done({});

function Env(name) {
    this.name = name;
    this.log = (...args) => {
        console.log(`[${this.name}]`, ...args);
    };
    this.setdata = (value, key) => {
        $prefs.setValueForKey(value, key);
    };
    this.getdata = (key) => {
        return $prefs.valueForKey(key);
    };
    this.msg = (title, subtitle, body) => {
        $notify(title, subtitle, body);
    };
}
