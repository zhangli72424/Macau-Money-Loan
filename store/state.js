const state = {
	// requestUrl: "http://eakcs.blockcoinchipsup.com",
	requestUrl: "http://aomen.wantengex.com",
	// requestUrl: "http://61.111.129.5",
	incode: uni.getStorageSync('code') || {code: 86, name: "中国"},
	lang_type: uni.getStorageSync('lang') || 'chs',
	area: uni.getStorageSync('area') || {},
	loginInfo: uni.getStorageSync('loginInfo') || {},
	login: uni.getStorageSync('login') || {},
	user: uni.getStorageSync('user') || '',
	pass: uni.getStorageSync('pass') || '',
	islogin:'',
	coins:'',
	gesturePassword:uni.getStorageSync('gesturePassword') || '',
	mdpass: uni.getStorageSync('mdpass') ||'',
	textArr: {
		chs: [ "首页",  "收益","资产", "资讯", "我的" ],
		en: [ "Home","Icome",  "Allet", "News", "Mine" ]
	},
	bulletin: {},
	weixinzhifu: {},
	isUpline: false,
	plan:'',
	firstTeam:false
}
export default state