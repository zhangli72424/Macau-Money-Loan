const getters = {
	getArea(state) {
		return state.area
	},
	getLogin(state) {
		return state.login
	},
	getLoginTime(state){
		return state.loginTime
	},
	getRequestUrl (state) {
		return state.requestUrl
	},
	getLangType(state) {
		return state.lang_type
	},
	getLang(state) {
		return state.lang_type == 'chs' ? 1 : 2
	},
	getLoginInfo(state) {
		return state.loginInfo;
	},
	getIncode(state) {
		return state.incode
	},
	getTextArr(state) {
		return state.textArr;
	},
	getUser(state) {
		return state.user;
	},
	getPass(state) {
		return state.pass;
	},
	getGesturePassword(state){
		return state.gesturePassword;
	},
	getCoin(state){
		return state.coins;
	},
	getMdpass(state) {
		return state.mdpass
	},
	getBulletin(state) {
		return state.bulletin;
	},
	getWeixinzhifu(state) {
		return state.weixinzhifu
	},
	getIsUpline(state){
		return state.isUpline
	},
	getPlan(state){
		return state.plan
	},
	getFirstTeam(state){
		return state.firstTeam
	}
	
	
}
export default getters