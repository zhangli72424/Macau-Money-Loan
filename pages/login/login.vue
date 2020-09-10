<template>
	<view class="app-login">
		<!-- #ifdef APP-PLUS -->
			<UniStatusBar bgcolor="transparent"></UniStatusBar>
		<!-- #endif -->
		
		<view class="title">
			<!-- #ifdef APP-PLUS -->
			<uni-status-bar bgcolor="transparent"></uni-status-bar>
			<!-- #endif -->
			<view class="title-text">
				{{i18n.login}}
				<text @tap.stop="goRegister">{{i18n.register}}</text>
			</view>
		</view>
		
		
		<view class="greeting">
			<!-- <view class="hello">Welcome</view> -->
			<view class="welcome">{{i18n.welcome_to}}</view>
		</view>
		<view class="lang">
			<text class="chs" :class="{active: curLang == 'chs'}" @tap="switchlang('chs')">{{i18n.chs}}</text> 
			<text class="hline">|</text>
			<text class="en" :class="{active: curLang == 'en'}" @tap="switchlang('en')">{{i18n.en}}</text>
		</view>
		<view class="content">
			<!-- <view class="login-title">登录</view> -->
			<!-- <view class="li state">
				<view class="left">+ 86</view>
				<view class="center">中国</view>
				<view class="right iconfont icon-arrow-right"></view>
			</view> -->
		<!-- 	<view class="li">
				<input type="text" placeholder="请输入用户名" v-model="name">
				<text class="iconfont icon-cha" @tap="name=''"></text>
			</view> -->
			<view class="li">
				<input type="text" :placeholder="i18n.enter_account" v-model="phone">
				<text class="iconfont icon-cha" @tap="phone=''"></text>
			</view>
			<view class="li">
				<input :type="showiconyanjing1 ? 'password' : 'text'" :placeholder="i18n.enter_login_pass" v-model="pass">
				<text class="iconfont" :class="showiconyanjing1 ? 'icon-yanjing1' : 'icon-yanjing2'" @tap="showiconyanjing1 = !showiconyanjing1"></text>
			</view>
			<view class="forget" @tap.stop="forget">{{i18n.forget}}</view>
			<view class="btn-wrapper">
				<!-- <Btn 
			backgroundColor="#333333" 
			:txt="i18n.login" 
			@tapbtn="doLogin"></Btn> -->
				<button type="default"
				:loading="showLoad"
				class="sell-btn"
				:class="{'active':!disable}" 
				:disabled="disable"
				@tap.stop="doLogin"
				>{{i18n.login}}</button>
			</view>
		</view>
		<!-- <view class="goLogin" @tap.stop="forget">{{i18n.forget}}</view> -->
		
		<view class="login-bottom">
			<image src="../../static/image/login-bottom.png" mode="widthFix" lazy-load></image>
		</view>
		<load v-if="showLoad"></load>
	</view>
</template>

<script>
	import UniStatusBar from '@/components/uni-status-bar/uni-status-bar.vue'
	import Load from '@/components/common/load.vue';
	import {mapGetters, mapMutations} from 'vuex'
	import {pageto, showToast, fetch, forceUpdate} from '@/common/js/util.js'
	let I18N = null
	export default {
		data() {
			return {
				name:'',
				showLoad:false,
				phone: '',
				pass: '',
				curLang: 'chs',
				showiconyanjing1: true,
				disable:true,
				type:'',
				isCheck:false
			}
		},
		computed: {
			i18n() {
				return this.$t('message')
			},
			...mapGetters([
				'getRequestUrl',
				'getLang',
				'getIncode',
				'getLogin',
				'getLangType',
				'getLoginInfo'
			])
		},
		onLoad(e){
			if(e.type){
				this.type = e.type
			}
		},
		onShow() {
			forceUpdate(this.getLangType)
			if(this.type==3){
				this.setLoginInfo('')
				this.setLogin('')
				return false;
			}
			this.name = this.getLoginInfo.username
			this.phone = this.getLogin.username
			this.pass = this.getLogin.password
			this.curLang = this.$i18n.locale
			// console.log(this.$i18n)
			I18N = this.$i18n
			console.log(this.getLoginInfo);
			if(this.getLoginInfo.email){
				if(this.getLoginInfo.token){
					if(this.type==2){
						let {email, id, incode, password, paypwd, ip, salt, status, token, username, gespwd, yqcode} = this.getLoginInfo
						let loginfo = {email, id, incode, password, ip, paypwd, salt, status, token:'', username, gespwd, yqcode}
						this.setLoginInfo(loginfo)
						return false;
					}
					let data = {
						id:this.getLoginInfo.id,
						token:this.getLoginInfo.token
					}
					this.showLoad = true
					fetch('/api/index/index',data,'POST').then(res=>{
						this.showLoad = false 
						console.log(res.data.code);
						if(res.data.code == 1){
							// return
							showToast('正在登陆...')
							setTimeout(()=>{
								uni.switchTab({
									url:'/pages/index/index' 
								})
							},1000)
						}else if(res.data.code=='0'){
							let {email, id, incode, password, paypwd, salt, ip, status, token, username, gespwd, yqcode} = this.getLoginInfo
							let loginfo = {email, id, incode, password, paypwd, salt, ip, status, token:'', username, gespwd, yqcode}
							this.setLoginInfo(loginfo)
							return false;
						}
					}).catch(err=>{
						this.showLoad = false
					})
				}
			}
		},
		methods: {
			change(){
				
				if(this.phone && this.pass){
					this.disable = false;
					return false;
				}
				this.disable  = true;
			},
			doLogin() {
				if (!this.phone) {
					showToast(this.i18n.enter_account)
					return
				}
				if (!this.pass) {
					showToast(this.i18n.enter_login_pass)
					return
				}
				this.showLoad = true
				let _data = {
					username: this.phone,
					password: this.pass,
					lang_type: this.getLang
				}
				if(this.isCheck) return
				this.isCheck  = true;
				fetch('/api/login/login', _data, "post")
					.then(res => {
						this.isCheck  = false;
						this.showLoad = false
						if (res.statusCode == 200 && res.data.code == 1) {
							let {email, id, incode, password, paypwd, salt, ip, status, token, username, gespwd, yqcode} = res.data.data
							let loginfo = {email, id, incode, password, paypwd, ip, salt, status, token, username, gespwd, yqcode}
							let time = res.data.time;
							this.setLoginInfo(loginfo)
							this.setLogin({
								username: this.phone,
								password: this.pass
							})
							
							this.setLoginTime(time);
							pageto('/pages/index/index', true)
						} else {
							showToast(res.data.msg)
						}
					})
					.catch(err => {
						this.isCheck  = false;
						this.showLoad = false
					})
			},
			goRegister() {
				pageto('/pages/register/register')
			},
			switchlang(str) {
				this.curLang  = str
			},
			forget() {
				// console.log('forget')
				pageto('/pages/forget/forget')
			},
			...mapMutations([
				'setLoginInfo',
				'setLogin',
				'setLoginTime',
				'setLangType'
			])
		},
		components: {
			UniStatusBar,
			Load
		},
		watch: {
			curLang(newv) {
				this.$i18n.locale = newv
				this.setLangType(newv)
			},
			phone(val){
				this.change()
			},
			pass(val){
				this.change()
			}
		}
	}
</script>

<style lang="scss">
@import '@/common/scss/variable.scss';
@import '@/common/scss/global.scss';
	.login-bottom{
		width: 750rpx;
		height: 339rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		right: 0;
		image{
			width: 750rpx;
			height: 339rpx;
			flex-shrink: 0;
		}
		z-index: -1;
	}
	.login-bg{
		width: 750upx;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: -1;
		image{
			width: 750upx;
			height: 100vh;
		}
	}
	.title{
		background: #211d1e;
		color: $white;
		.title-text{
			line-height: 78upx;
			text-align: center;
			position: relative;
			font-size: 36upx;
			text{
				position: absolute;
				right: 30upx;
				top: 0;
				line-height: 78upx;
				display: block;
				font-size: 26upx;
				z-index: 99;
			}
		}
}
.app-login {
	.greeting {
		color: $black;
		margin-left: 30upx;
		margin-top: 20upx;
		font-weight: bold;
		.hello {
			font-size: 30px;
			margin-bottom: 16upx;
			color: $white;
		}
		.welcome {
			font-size: 48rpx;
			margin-top: 100rpx;
			color: $white;
		}
	}
	.lang {
		text-align: right;
		color: $white;
		margin-right: 86upx;
		margin-top: 60upx;
		.hline {
			margin: 0 20upx;
			color: #929191;
			font-weight: 200;
			font-size: 12px;
		}
		.chs, .en {
			width: 60upx;
			height: 60upx;
			font-size: 14px;
			color: #606060;
			display: inline-block;
			text-align: center;
			line-height: 60upx;
			&.active {
				color: $theme-color;
				font-weight: bold;
			}
		}
	}
	.content {
		width: 690upx;
		margin-left: 30upx;
		height: 540upx;
		padding: 40upx 30upx;
		.login-title {
			font-size: 14px;
			color: $split-line-color1;
			text-align: center;
			padding: 40upx 0 20upx;
		}
		.li {
			height: 84upx;
			position: relative;
			z-index: 1;
			position: relative;
			color: $white;
			// background-color: #EDEDED;
			// border-radius: 55upx;
			border-bottom: 1rpx solid #929191;
			input {
				height: 84upx;
				font-size: 12px;
				color: $white;	
				padding-left: 40upx;
			}
			.iconfont {
				position: absolute;
				right: 20upx;
				top: 0;
				width: 80upx;
				height: 84upx;
				line-height: 84upx;
				z-index: 5;
				text-align: center;
				color: $theme-color;
			}
			&+.li {
				margin-top: 30upx;
			}
		}
		.forget {
			font-size: 12px;
			font-weight: bold;
			color: $theme-color;
			text-align: right;
			margin-top: 29upx;
			margin-right: 40upx;
		}
		.btn-wrapper {
			.sell-btn{
				margin-top: 120upx;
				margin: 128upx 30upx 0;
				line-height: 88upx;
				height: 88upx;
				border-radius: 6upx;
				background: $text-gray-color3;
				color: $white;
				&.active{
					// background: linear-gradient(to right,#3083FF,#001EFF);
					background: $trans-color;
					color: $default-color;
					box-shadow: 0 0 10rpx rgba(251, 217, 148, .2);
				}
			}
		}
	}
	.goLogin {
		width: 328upx;
		height: 86upx;
		color: $theme-color;
		line-height: 86upx;
		text-align: center;
		font-size: 13px;
		margin: 60upx auto;
	}
}
</style>

