import Store from '@/store/index.js'
const baseUrl = Store.state.requestUrl

// 定义常用的变量
const config = {
	baseUrl,
	method: "get"
}

// 接受拦截器函数
http.interceptor = {
	response: null,
	request: null
}

export default function http(options) {
	
	let reg = /^\/\w{1,16}\/\w{1,16}\/\w{1,16}$/
	if (!options.url || !reg.test(options.url)) {
		throw new Error("请求接口格式错误")
	}
	
	options.baseUrl = options.baseUrl || config.baseUrl
	options.url = options.baseUrl + options.url
	options.data = options.data || {}
	options.method = options.method || config.method
	
	return new Promise(function(resolve, reject) {
		let _config = null
		
		options.complete = response => {
			let statusCode  = response.statusCode
			
			if (http.interceptor.response) {
				let newResponse = http.interceptor.response(response)
				if (newResponse) {response = newResponse}
			}
			
			if (statusCode == 200) {
				resolve(response)
			} else {reject(response)}
		}
		
		
		_config = Object.assign({}, options)
		
		if(http.interceptor.request) {
			_config = http.interceptor.request(_config)
		}
		
		uni.request(_config)
	})
}

http.interceptor.response = response => {
	if (response.data.code == 2 || response.data.code == '3') {
		if(response.data.code == '3'){
			uni.redirectTo({
				url: '/pages/login/login?type=3'
			});
			uni.showToast({
				title:response.data.msg
			})
			return
		}
		uni.redirectTo({
			url: '/pages/login/login?type=2'
		});
		return {}
	}
	return response
}

http.interceptor.request = request => {
	const loginInfo = Store.state.loginInfo
	const lang_type = Store.state.lang_type == "chs" ? 1 : 2
	let config = {
		data: {
			id:  loginInfo.id ? loginInfo.id : '',
			token: loginInfo.token ? loginInfo.token : '',
			lang_type,
			...request.data
		}
	}
	return Object.assign({}, request, config)
}