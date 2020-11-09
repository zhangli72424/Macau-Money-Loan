import http from './http.js'
import Store from '@/store/index.js'
import I18N from '@/lang/index.js'
const baseUrl = Store.state.requestUrl

export function fetch(url, data, method) {
	return http({
		url,
		data,
		method
	})
}

export function get_chs_length(str) {
      let count = 0;
      let regEx = /[\u4e00-\u9fa5]/;
      let m = regEx.exec(str);
      while (!!m) {
        mmm(str, m)
        count++
      }

      function  mmm (string) {
          str  = string.slice(m['index'] + 1)
          m = regEx.exec(str);
        }
      return count
    }

export function pageback() {
	uni.navigateBack({
		delta: 1
	})
}

export function pageto(str, params) {
	if (!!params) {
		uni.switchTab({
			url: str,
			// success(e) {
			// 	console.log(e)
			// },
			// fail(err) {
			// 	console.log(err)
			// }
		})
	} else {
		uni.navigateTo({
			url: str
		})
	}
}

export function showToast(title="", duration=2000, mask=true, icon="none") {
	if (!title) {
		console.log("showToast title is wrong");
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}

export function diff_txt(time, lang) {
	let chs = {
		lang1: '今天',
		lang2: '昨天',
		lang3: '前天',
	}
	let en = {
		lang1: 'Today ',
		lang2: 'Yesterday ',
		lang3: 'The day before yesterday ',
	}
	let _lang = lang == "en" ? en: chs
	if (!time) return {};
            let time1 = (new Date(time)).getDate();
			let time2 = (new Date()).getDate();
			if ((new Date()).getFullYear() == (new Date(time)).getFullYear() && (new Date()).getMonth() == (new Date(time)).getMonth()) {
				if (time1 == time2) {
					return _lang.lang1 + time.slice(11);
				} else if (time2 - time1 == 1) {
					return _lang.lang2 + time.slice(11);
				} else if (time2 - time1 == 2) {
					return _lang.lang3 + time.slice(11);
				} else {
					return time;
				}
			}
			return time;
        }
		
export function _updataTabBar(arr, lang) {
			arr[lang].map((item,ind)=>{
				uni.setTabBarItem({
					index:  ind,
					text: arr[lang][ind]
				})
			})
		}
		
export	function redirectologin() {
		uni.redirectTo({
			url: "/pages/login/login"
		})
	}

export function forceUpdate (lang) {
	if (!lang) {
		redirectologin() 
		return 
	}
	// return
	let target = I18N.messages[lang].message.Language_type;
	// #ifdef APP-PLUS  
		// var server = "http://175.126.168.132/api/index/ve"; //检查更新地址
		var server = baseUrl + "/api/index/ve"; //检查更新地   http://27.102.127.203
		var req = { //升级检测数据  
			"appid": plus.runtime.appid,  
			"version": plus.runtime.version
		};
		let _this = this;
		uni.request({  
			url: server, 
			data: '',  
			success: (res) => {
				// console.log(res)
				if(res.statusCode == 200 && res.data.code == 1){
					let downs = res.data.data.down;
					if(res.data.data.is_up  == '1'){
							if(req.version  == res.data.data.ve){
							}else{
								uni.showModal({ //提醒用户更新
									title: target.update,  
									content: target.update_tip,
									success: (res) => {
										if (res.confirm) {
											uni.showToast(target.isJumping)
											setTimeout(()=>{
												plus.runtime.openURL(downs);
											}, 500)												 
										}else{
											uni.showToast(target.soon_update);
											setTimeout(() => {
												// #ifdef APP-PLUS  
												plus.runtime.quit();  
												// #endif
												redirectologin()
											}, 500)
										}
									},
									fail:(err)=>{
										showToast(target.fail)
									}
								})
							}
						
					}
				} else {
					redirectologin()
				}
			}  
		})
	//#endif
}


export function updownLine(type) {
	return fetch('/api/user/lineStatus', {type}, "post")
}

