<template>
	<view class="app-setting">
	<!-- 	<UniNavBar 
		:statusBar="true" 
		:border="false" 
		bgcolor="transparent" 
		color="#FFFFFF"
		:fixed="true"  
		backgroundColor="#3c393a" 
		title="关于我们" 
		>
		<view class="left-icon-left" slot="left">
			<i class="icon iconfont icon-fanhui"></i>
		</view>
		
		</UniNavBar> -->
		<view class="list">
			<view class="li" hover-class="hover-transform2"  @tap.stop="pageto('/pages/setting/protocol')">
				<text class="txt">{{i18n.protocol}}</text>
				<text class="iconfont icon-arrow-right"></text>
			</view>
			<view class="li" hover-class="hover-transform2" @tap.stop="serve">
				<text class="txt">{{i18n.service}}</text>
				<text class="iconfont icon-arrow-right"></text>
			</view>
			<view class="li" hover-class="hover-transform2">
				<text class="txt">{{i18n.current_version}}</text>
				<text class="version">{{version?version:'1.0.0'}}</text>
			</view>
			
		</view>
		
		<message
		:shows="showMes"
		:message="msg"
		@close="close"
		@jump="close"
		/>
		
		
	</view>
</template>

<script>
	import UniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import {pageback, checkLogin, pageto, fetch, forceUpdate} from '@/common/js/util.js'
	import {mapGetters, mapMutations} from "vuex"
	import Message from '@/components/common/message.vue';
	export default {
		components:{
			Message
		},
		data() {
			return {
				showMes:false,
				msg:'',
				isSHow: false,
				version: '',
				kefu:''
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
			this.getKefu()
		},
		methods: {
			close(){
				this.showMes = !this.showMes;
			},
			getKefu(){
				fetch('/api/User/kefu',{},'post')
					.then(res=>{
						if(res.data.code==1){
							this.kefu = res.data.data.kefuweixin
							
							// this.code_img = res.data.data.code_img
							// this.kefuweixin = res.data.data.kefuweixin
						}
					})
					.catch(err=>{
						
					})
			},
			serve(){
				if(this.kefu){
					this.showMes = true;
					this.msg = this.kefu
				}
			},
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
			UniNavBar
		}
	}
</script>
<style lang="scss">
@import '@/common/scss/variable.scss';
@import '@/common/scss/global.scss';
.left-icon-left{
	color: #FFFEFF;
}
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
