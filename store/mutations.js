const mutatinos = {
	setArea(state, val) {
		state.area = val;
		uni.setStorageSync('area', val);
	},
	setLogin(state, val) {
		state.login = val;
		uni.setStorageSync('login', val)
	},
	setLoginTime(state,val) {
		state.loginTime = val;
		uni.setStorageSync('loginTime', val);
	},
	setIncode(state, val) {
		state.incode = val;
		uni.setStorageSync('code', val);
	},
	setLoginInfo(state, val) {
		state.loginInfo = val;
		uni.setStorageSync('loginInfo', val);
	},
	setUser(state, val) {
		state.user = val;
		uni.setStorageSync('user', val);
	},
	setLangType(state, val) {
		state.lang_type = val;
		uni.setStorageSync('lang', val);
	},
	setPass(state, val) {
		state.pass = val;
		uni.setStorageSync('pass', val);
	},
	setIslogin(state,val) {
		state.islogin = val;
	},
	setGesturePassword(state,val){
		state.gesturePassword = val;
		uni.setStorageSync('gesturePassword', val);
	},
	setCoin(state,val){
		state.coins = val;
	},
	setMdpass(state, val) {
		state.mdpass = val;
		uni.setStorageSync('mdpass', val);
	},
	setBulletin(state,val) {
		state.bulletin = val;
	},
	setWeixinZhifu(state,val) {
		state.weixinzhifu = val
	},
	setIsUpline(state, val){
		state.isUpline = val
	},
	setPlan(state,val){
		state.plan = val;
	},
	setFirstTeam(state, val){
		state.firstTeam = val;
	}
}
export default mutatinos