<template>
	<view class="app-login">
		<UniStatusBar bgcolor="transparent"></UniStatusBar>
		<view class="greeting">
			<!-- <view class="hello">Welcome</view> -->
			<view class="welcome">{{i18n.welcome_to}}</view>
			<view class="iconfont icon-cha" @tap.stop="goLogin"></view>
		</view>
		<view class="account-type">
			<view class="account-type-item" :class="[accountType==0?'active':'']" @tap="selectAccount('0')">
				{{i18n.phone_num}}
			</view>
			<view class="account-type-item" :class="[accountType==1?'active':'']" @tap="selectAccount('1')">
				{{i18n.email}}
			</view>
		</view>
		<view class="content">
			<template v-if="accountType==0">
				<view class="li">
					<input type="text" :placeholder="i18n.enter_username" v-model="username">
					<text class="iconfont icon-cha" @tap="username=''"></text>
				</view>
				<view class="li state" @tap="gotostate">
					<view class="left">+ {{getIncode.code}}</text></view>
					<view class="center">{{getLang == 1? getIncode.zh : getIncode.en}}</view>
					<view class="right iconfont icon-arrow-right"></view>
				</view>
				
				<view class="li">
					<input type="text" :placeholder="i18n.enter_phone" v-model="phone">
					<text class="iconfont icon-cha" @tap="phone=''"></text>
				</view>
			</template>
			<template v-else>
				<view class="li">
					<input type="text" :placeholder="i18n.enter_username" v-model="username">
					<text class="iconfont icon-cha" @tap="username=''"></text>
				</view>
				<view class="li">
					<input type="text" :placeholder="i18n.p_EmailAddressOfTheAccountToBeBound" v-model="phone">
					<text class="iconfont icon-cha" @tap="phone=''"></text>
				</view>
			</template>
			
			
	<!-- 		<view class="li">
				<input type="text" :placeholder="i18n.re_enter_phone" v-model="rephone">
				<text class="iconfont icon-cha" @tap="rephone=''"></text>
			</view> -->
			<view class="li">
				<input type="text" :placeholder="i18n.enter_vcode" v-model="vcode">
				<view class="v-code"><Vcode :account="phone" :type="getIncode.code?2:1"></Vcode></view>
			</view>
			<view class="li">
				<input :type="showiconyanjing1 ? 'password' : 'text'" :placeholder="i18n.enter_login_pass" v-model="pass">
				<text class="iconfont" :class="showiconyanjing1 ? 'icon-yanjing1' : 'icon-yanjing2'" @tap="showiconyanjing1 = !showiconyanjing1"></text>
			</view>
			<view class="li">
				<input :type="showiconyanjing2 ? 'password' : 'text'" :placeholder="i18n.enter_login_pass_again" v-model="repass">
				<text class="iconfont" :class="showiconyanjing2 ? 'icon-yanjing1' : 'icon-yanjing2'" @tap="showiconyanjing2 = !showiconyanjing2"></text>
			</view>
			<view class="li">
				<input type="text" :placeholder="i18n.enter_invitation" v-model="invitation">
			</view>
			<!-- <view class="tip">8-20个字符包含数字、字母或者符号, 字母区分大小写</view> -->
			<view class="btn-wrapper">
				
				<button type="default"
				class="sell-btn"
				:class="{'active':!disable}" 
				:disabled="disable"
				@tap.stop="doRegister"
				>{{i18n.register}}</button>
				
				<!-- <Btn :txt="i18n.register" @tapbtn="doRegister"></Btn> -->
			</view>
		</view>
		<view class="goLogin"  @tap="goLogin">{{i18n.go_login}}</view>
	
		<load v-if="showLoad"></load>
	</view>
</template>
<script>
	import UniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import UniStatusBar from '@/components/uni-status-bar/uni-status-bar.vue'
	import Load from '../../components/common/load.vue';
	import Btn from '@/components/btn/btn2.vue'
	import Vcode from '@/components/vcode/vcode.vue'
	import {mapGetters, mapMutations} from 'vuex'
	import {pageto, showToast, fetch, forceUpdate} from '@/common/js/util.js'
	import Validator from '../../common/js/validator.js';
	export default {
		data() {
			return {
				disable:true,
				accountType:0,
				showLoad:false,
				phone: '',
				rephone: '',
				vcode: '',
				pass: '',
				repass: '',
				invitation: '',
				showiconyanjing1: true,
				showiconyanjing2: true,
				isPhone: true,
				username: '',
				isCheck:false
			}
		},
		computed: {
			i18n() {
				return this.$t('message')
			},
			...mapGetters([
				'getLang',
				'getIncode',
				'getLoginInfo',
				'getLangType'
			])
		},
		onShow(){
			forceUpdate(this.getLangType);
		},
		onLoad() {
			this.phone = '';
			this.rephone = '';
			this.vcode = '';
			this.pass = '';
			this.repass = '';
			this.invitation = '';
			this.username=""
		},
		methods: {
			change(){
				if(this.phone && this.vcode && this.pass && this.repass && this.invitation){
					
					this.disable = false;
					return;
				}
				this.disable = true;
			},
			selectAccount(e){
				this.accountType = e;
				this.phone = '';
				this.rephone = '';
				this.vcode = '';
				this.pass = '';
				this.repass = '';
				this.invitation = '';
				if(e==1){
					this.isPhone = false
				}else{
					this.isPhone = true
				}
			},
			doRegister() {
				if(!this.phone) {
					showToast(this.i18n.enter_phone)
					return
				}
				// if(this.phone != this.rephone) {
				// 	showToast(this.i18n.Mailboxes_are_inconsistent)
				// 	return
				// }
				if(!this.vcode) {
					showToast(this.i18n.enter_yzm)
					return
				}
				if (!this.pass) {
					showToast(this.i18n.enter_login_pass)
					return
				}
				if (!this.repass) {
					showToast(this.i18n.enter_input_pass_again)
					return
				}
				if (this.pass != this.repass) {
					showToast(this.i18n.login_pass_inconsistent)
					return
				}
				if(this.isCheck) return
				this.isCheck  = true;
				// uni.showLoading()
				this.showLoad = true;
				let _data = {
					email: this.phone,
					password: this.pass,
					password1: this.repass,
					yzm: this.vcode,
					refer: this.invitation,
					lang_type: this.getLang,
					type: this.isPhone ? 2 : 1,
					code: this.isPhone ? this.getIncode.code : '',
					username: this.username,
				}
				fetch('/api/login/register', _data, "post")
					.then(res => {
						this.isCheck  = false;
						console.log(res)
						// uni.hideLoading() 
						showToast(res.data.msg)
						this.showLoad = false;
						
						if (res.statusCode == 200 && res.data.code == 1) {
							this.phone = '';
							this.rephone = '';
							this.vcode = '';
							this.pass = '';
							this.repass = '';
							this.invitation = '';
							this.username = '';
							this.setLogin({
								username: this.phone,
								password: this.pass
							})
							setTimeout(() => {
								pageto('/pages/login/login')
							}, 1500)
						}
						
					})
					.catch(err => {
						this.isCheck  = false;
						console.log(err);
						// uni.hideLoading()
						this.showLoad = false;
						console.log(err.data.msg)
					})
			},
			goLogin() {
				uni.navigateBack({
					delta:1
				})
			},
			gotostate() {
				pageto('./state')
			},
			...mapMutations([
				'setLogin'
			])
		},
		components: {
			UniNavBar,
			UniStatusBar,
			Btn,
			Vcode,
			Load
		},
		watch: {
			isPhone(newv) {
				
			},
			username(val){this.change()},
			phone(val){this.change()},
			vcode(val){this.change()},
			pass(val){this.change()},
			repass(val){this.change()},
			invitation(val){this.change()},
		}
	}
</script>
<style lang="scss">
@import '@/common/scss/variable.scss';
@import '@/common/scss/global.scss';
.app-login {
	.greeting {
		color: $white;
		margin-left: 30upx;
		margin-top: 20upx;
		font-weight: bold;
		position: relative;
		// border: 1px solid red;
		.hello {
			font-size: 30px;
			margin-bottom: 16upx;
		}
		.welcome {
			font-size: 15px;
		}
		.iconfont {
			position: absolute;
			right: 30upx;
			top: 15upx;
			font-size: 20px;
			color: #606060;
		}
	}
	.account-type{
		display: flex;
		align-items: center;
		margin-top: 30upx;
		padding: 20upx 0 20upx 30upx;
		// background-color: #f3f2f9;
		.account-type-item{
			margin-right: 40upx;
			font-size: 30upx;
			font-weight: bold;
			color: #929191;
			&.active{
				color:$theme-color;
				font-size: 40upx;
			}
		}
	}
	.content {
		width: 690upx;
		margin-left: 30upx;
		margin-top: 20upx;
		// border-radius: 16upx;
		// background-color: $default-color;
		padding: 20upx 30upx;
		// box-shadow: 0 5px 2px 0px $default-color;
		.login-title {
			font-size: 14px;
			color: $split-line-color1;
			text-align: center;
			// padding: 40upx 0 20upx;
			display: flex;
			flex-direction: row;
			.outer-text {
				flex: 1;
				display: inline-block;
				height: 70upx;
				line-height: 70upx;
				margin-top: 20upx;
				.inner-text {
					display: inline-block;
					width: 100%;
					&.active {
						font-size: 15px;
						font-weight: bold;
						color: $theme-color;
					}
				}
				&:last-child {
					.inner-text{
						border-left: 1upx solid $adorn-green;
					}
				}
			}
		}
		.li.state {
			height: 84upx;
			// border-bottom: 1upx solid $split-line-color2;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: $white;
			font-size: 14px;
			padding-left: 40upx;
			margin-top: 10upx;
			.left {
				height: 100%;
				line-height: 84upx;
				margin-right: 30upx;
				margin-left: 10upx;
			}
			.center {
				flex: 1;
				margin-left: 10px;
			}
			.right {
				width: 100upx;
				text-align: right;
				height: 100%;
				line-height: 80upx;
			}
		}
		.li {
			height: 84upx;
			// border-bottom: 1upx solid $split-line-color2;
			// background-color: #EDEDED;
			// border-radius: 110upx;
			border-bottom: 1rpx solid #929191;
			position: relative;
			z-index: 1;
			padding-left: 40upx;
			input {
				height: 84upx;
				font-size: 12px;
				color: $white;
			}
			.v-code {
				position: absolute;
				right: 40upx;
				top: 0;
				height: 84upx;
				color: $theme-color;
				font-weight: bold;
				line-height: 84upx;
				font-size: 13px;
				padding: 0 10upx;
				width: 100px;
				text-align: right;
				z-index: 10;
			}
			.iconfont {
				position: absolute;
				right: 40upx;
				top: 0;
				width: 80upx;
				height: 84upx;
				line-height: 84upx;
				z-index: 5;
				text-align: right;
				color: $theme-color;
			}
			&+.li {
				margin-top: 30upx;
			}
		}
		.btn-wrapper {
			margin-top: 50upx;
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
		.tip {
			font-size: 11px;
			color: $text-gray-color3;
			margin-bottom: 80upx;
			margin-top: 26upx;
		}
	}
	.goLogin {
		width: 690upx;
		height: 86upx;
		color: $theme-color;
		line-height: 86upx;
		text-align: center;
		font-size: 13px;
		margin-left: 30upx;
	}
}
</style>

