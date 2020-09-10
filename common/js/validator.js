/*
* validate
* validator
*/
export default {
	// name: key
	// 邮箱
	email: v => {
		if (!v.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
		    return false
		}
		return true;
	},
	// 手机号
	mobile: v => {
		if (!v.match(/^1(3|4|5|7|8)\d{9}$/)) {
		    return false
		}
		return true;
	},
	// name: key
	// 正整数
	posPattern : v => {
		if (!v.match(/^\d+$/)) {
		    return false
		}
		return true;
	},
	// 用户名
	username: () => {
		
	},
	// 登录密码
	// 6-16位的字母或者数字组合  单一数字或者字母都可以   但是下划线和.是不可以的
	passLogin: v => {
		if (!v.match(/^[0-9a-zA-Z]{6,16}$/)) {
			return false
		}
		return true;
	},
	// 交易密码
	passPwd: v => {
		if (!v.match(/^\d{6}$/)) {
			return false
		}
		return true
	},
	
	// 手机验证码验证
	yzm: v => {
		if (!v.match(/^\d{6}$/)) {
			return false
		}
		return true
	},
	//图形验证码验证
	yzmimg: v => {
		if (!v.match(/^[0-9a-zA-Z]{4}$/)) {
			return false
		}
		return true;
	},
	//邀请码验证
	yqm: v => {
		if (!v.match(/^[0-9]{1,}$/)) {
			return false
		}
		return true;
	},
	//用户名正则，4到16位（字母，数字，下划线，减号）
	chsVc: v => {
		if (!v.match(/^[a-zA-Z0-9_-]{4,16}$/)) {
			return false
		}
		return true;
	},
	//中文验证
	chsVchs: v => {
		if (!v.match(/[\u4E00-\u9FA5]/)) {
			return false
		}
		return true;
	},
	symbol: v=> {
		if (v.match(/\/|\~|\!|\#|\\$|\%|\^|\&|\*|\(|\)|\+|\{|\}|\:|\<|\>|\?|\[|\]|\,|\/|\;|\\' | \`|\-|\=|\\\|\|/ig)) {
			return false
		}
		return true;
	}
}