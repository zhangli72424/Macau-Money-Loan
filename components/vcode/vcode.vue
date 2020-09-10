<template>
	<text @tap="handleclick" :class="{gray: yzm_state}">{{yzmContent || i18n.get_vcode }}</text>
</template>

<script>
	import {mapGetters} from 'vuex'
	import {showToast, fetch} from '@/common/js/util.js'
	export default {
		props: {
			account: {
				type: String,
				default: ''
			},
			type:{
				type: String,
				default: ''
			}
		},
		data() {
			return {
				// 防止连续点击
				hasClick: false,
				yzm_state: false,
				timer: null,
				yzmContent: '',
				yzmTime: 60
			}
		},
		computed: {
			i18n() {
				return this.$t('message')
			},
			isEmail() {
				return this._judgeEmail(this.account)
			},
			isPhone(){
				return this._judgePhone(this.account + '')
			},
			...mapGetters([
				'getRequestUrl',
				'getLang',
				'getIncode'
			])
		},
		methods: {
			handleclick() {
				console.log(this.account);
				// 防止连续点击
				if( this.hasClick ) return;
				// 验证输入的账号格式
				if ( !!this.account ) {
					if (!this.isEmail && !this.isPhone) {
						fetch('/api/login/resetpswd', {username: this.account, lang_type: this.getLang}, "post")
							.then(res => {
								if (res.statusCode == 200 && res.data.code == 1) {
									this._sms(res.data.data.email)
								} else {
									this._setStatus(false)
									showToast(res.data.msg)
								}
							})
							.catch(err => {
								this._setStatus(false)
								console.log(err)
							})
						return
					}else{
						this._sms()
					}
				} else if (!this.account) {
					this._setStatus(false)
					if(this.type){
						showToast(this.i18n.p_enter_check_in)
						return
					}
					showToast(this.i18n.enter_phone)
					return
				}
			},
			_sms(ttt) {
				// 修改状态
				this._setStatus(true)
				// 获取邮箱和手机的请求地址
				let _url = '';
				let _name= '';
				if (this.isPhone) {
					_url = '/api/sms/sendsms'
					_name = ttt || ((this.getIncode.code + '') + this.account)
				}
				if (this.isEmail) {
					_url = '/api/sms/emailverify'
					_name = ttt || this.account
				}
				if (!this.isEmail && !this.isPhone && !!ttt) {
					if (this._judgeEmail(ttt)) {
						_url ='/api/sms/emailverify'
					}
					if (this._judgePhone(ttt)) {
						_url = '/api/sms/sendsms'
					}
					_name = ttt
				}
				
				// 清除倒计时
				clearTimeout(this.timer);
				// 提交的data
				let _data = {name: _name, lang_type: this.getLang, type: 1};
				// console.log(_data,_url);return
				fetch(_url, _data, 'post')
					.then(res => {
						console.log(res)
						if (res.statusCode == 200 && res.data.code == 1) {
							showToast(res.data.msg)
							this._loopTime()
							
						} else {
							this._setStatus(false)
							showToast(res.data.msg)
						}
					})
					.catch(err => {
						this._setStatus(false)
						console.log(err)
					})
			},
			_judgeEmail(str) {
				let reg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
				return reg.test(str)
			},
			_judgePhone(str) {
				let reg = /^[0-9]{5,20}$/g
				return reg.test(str)
			},
			_setStatus(e) {
				this.hasClick = e
				this.yzm_state = e
			},
			_loopTime() {
				this.yzmTime--;
				this.yzmContent = this.yzmTime + "s";
				this.timer = setTimeout(this._loopTime, 1000)
				if(this.yzmTime < 0){
					this.yzmContent = this.i18n.resend_vcode
					clearTimeout(this.timer)
					this._setStatus(false)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
@import '@/common/scss/variable.scss';
text {
	color: $theme-color;
	font-size: 12px;
	&.gray {
		color: $text-gray-color6;
	}
}
</style>
