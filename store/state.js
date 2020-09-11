const state = {
	// requestUrl: "http://eakcs.blockcoinchipsup.com",
	// requestUrl: "http://116.204.169.72",
	requestUrl: "http://61.111.129.5",
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
		chs: [ "首页", "资产", "咨询", "我的" ],
		en: [ "Home", "Allet", "Consulting", "Mine" ]
	},
	bulletin: {},
	weixinzhifu: {},
	isUpline: false,
	plan:'',
	firstTeam:false
}
export default state