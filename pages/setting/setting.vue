<template>
	<view class="app-setting">
<!-- 		<UniNavBar 
		:statusBar="true" 
		:border="false" 
		bgcolor="transparent" 
		color="#FFFFFF"
		:fixed="true"  
		backgroundColor="#3c393a" 
		:title="i18n.setting" 
		></UniNavBar> -->
		<view class="list">
			<view class="li" hover-class="hover-transform2" @tap="selectLang">
				<text class="txt">{{i18n.select_lang}}</text>
				<text class="lang_txt">{{getLang == 1 ? i18n.chs_chs : i18n.en_en}}</text>
				<text class="iconfont icon-arrow-right"></text>
			</view>
			<view class="li" hover-class="hover-transform2" @tap="pageto('/pages/modify-login/modify-login')">
				<text class="txt">{{i18n.modify_login}}</text>
				<text class="iconfont icon-arrow-right"></text>
			</view>
			<view class="li" hover-class="hover-transform2" @tap="pageto('/pages/modify-pwd/modify-pwd')">
				<text class="txt">{{i18n.modify_pwd}}</text>
				<text class="iconfont icon-arrow-right"></text>
			</view>
			<!-- <view class="li" hover-class="hover-transform2" @tap="pageto('/pages/setting/modify-email')">
				<text class="txt"> {{getLoginInfo.incode=='0'?i18n.Bind_mailbox_modification:'绑定手机号码修改'}}</text>
				<text class="iconfont icon-arrow-right"></text>
			</view> -->
		</view>
		<Btn :txt="i18n.exit_login" @tapbtn="exit" backgroundColor="#E93841"></Btn>
		<SwitchLang :isSHow="isSHow" @cancel="cancel"></SwitchLang>
	</view>
</template>

<script>
	import UniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import SwitchLang from '@/components/switchlang/switchLang.vue'
	import {pageback, checkLogin, pageto, forceUpdate} from '@/common/js/util.js'
	import Btn from '@/components/btn/btn.vue'
	import {mapGetters, mapMutations} from "vuex"
	export default {
		data() {
			return {
				isSHow: false,
				version: ''
			}
		},
		created() {
			this._getVersion()
		},
		computed: {
			i18n() {
				return this.$t('message')
			},
			...mapGetters([
				'getLoginInfo',
				'getRequestUrl',
				"getLang",
				'getLangType'
			])
		},
		onShow(){
			forceUpdate(this.getLangType);
		},
		methods: {
			pageto(str) {pageto(str)},
			back() {
				pageback()
			},
			cancel() {
				this.isSHow = false
			},
			selectLang() {
				this.isSHow  = true
			},
			exit() {
				this.setLoginInfo('');
				uni.redirectTo({
					url: '/pages/login/login'
				})
			},
			_getVersion() {
				// #ifdef APP-PLUS
				this.version = plus.runtime.version
				// #endif
			},
			...mapMutations([
				'setLoginInfo'
			])
		},
		components: {
			UniNavBar,
			Btn,
			SwitchLang
		}
	}
</script>
<style lang="scss">
@import '@/common/scss/variable.scss';
@import '@/common/scss/global.scss';
.app-setting {
	.list {
		margin: 20upx 0 200upx;
		.li {
			padding:0 30upx;
			background-color: $default-color;
			border-bottom: 1upx solid #525050;
			&:last-of-type{
				border-bottom: none;
			}
			height: 100upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.txt {
				font-size: 14px;
				color: $white;
			}
			.lang_txt {
				flex: 1;
				text-align: right;
				font-size: 14px;
				margin-right: -50upx;
			}
			.version {
				flex: 1;
				text-align: right;
				font-size: 12px;
				margin-right: 15upx;
			}
			.iconfont {
				font-size: 15px;
				color: $text-gray-color5;
				width: 88upx;
				height: 88upx;
				line-height: 88upx;
				text-align: right;
			}
		}
	}
}
</style>
