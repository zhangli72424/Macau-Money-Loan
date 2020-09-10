<template>
	<view>
		<view class="person-top">
			 <!-- #ifdef APP-PLUS -->
			 <uni-status-bar bgcolor="transparent"></uni-status-bar>
			 <!-- #endif -->
			<view class="person-top-t">
				<image :src="user_img" mode="widthFix" lazy-load></image>
				<view class="person-name">
					{{name}}
				</view>
				<text>{{user_info.name}}</text>
				
			</view>
		</view>
		
		<view class="person-bg-img">
			<image src="../../static/image/mine-bg-01.png" mode="widthFix" lazy-load></image>
		</view>
		
		<view class="person-content">
			<block v-for="(item,index) in navList" :key="index">
				<view class="person-li" hover-class="active" @tap.stop="jump(item.url)">
					<image :src="item.image" mode="widthFix" lazy-load></image>
					<view>{{item.title}}</view>
				</view>
			</block>
		</view>
		
	</view>
</template>

<script>
	import Load from '@/components/common/load.vue';
	import uniStatusBar from '@/components/uni-status-bar/uni-status-bar.vue';
	import {pageto, showToast, fetch, updownLine, forceUpdate, diff_txt, _updataTabBar} from '@/common/js/util.js'
	import {mapGetters, mapMutations} from 'vuex' 
	export default {
		components:{
			uniStatusBar,Load
		},
		computed:{
			i18n() {
				return this.$t('message')
			},
			...mapGetters([
				'getRequestUrl',
				'getLangType',
				'getLogin',
				'getLoginInfo',
				'getTextArr',
				'getFirstTeam'
			])
		},
		data() {
			return {
				user_img:'',
				navList:[],
				name:'',
				user_info:{}
			};
		},
		onLoad(){
			this.navList = [
				{
					title:'邀请好友',
					image:require('../../static/image/invite.png'),
					url:'/pages/invite/advertising'
				},
				{
					title:'团队业绩',
					image:require('../../static/image/team.png'),
					url:'/pages/team/team'
				},
				{
					title:'个人设置',
					image:require('../../static/image/mine.png'),
					url:'/pages/setting/setting'
				},
				{
					title:'关于我们',
					image:require('../../static/image/time.png'),
					url:'/pages/setting/about'
				}
			]
		},
		onShow(){
			this.name = this.getLoginInfo.email
			this.setFirstTeam(false)
			this.getIndex();
			this.getCheckB()
			console.log(this.getFirstTeam);
		},
		methods:{
			...mapMutations(['setFirstTeam']),
			getCheckB(){
				let _url = '/api/Wallet/check_b';
				fetch(_url,{},'POST').then(res=>{
					
				})
			},
			jump(url){
				if(url){
					pageto(url)
				}
			},
			getIndex(){
				fetch('/api/index/index',{},'POST')
					.then(res=>{
						if(res.data.code==1){
							let info = res.data.data
							this.user_info = info
							this.user_img = require(`../../static/image/avatar.png`)
						}
					})
					.catch(err=>{
						
					})
			}
		}
	}
</script>
<style>
	page{
		background: #212121 !important;
	}
</style>
<style lang="scss" scoped>
	@import '@/common/scss/variable.scss';
	.person-bg-img{
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		z-index: -1;
		image{
			width: 750rpx;
			height: 485rpx;
			flex-shrink: 0;
		}
	}
	.person-top{
		// background: linear-gradient(to right,#FFE09F,#D3AD6D);
		text-align: center;
		padding: 75rpx 0 90rpx;
		.person-top-t{
			padding: 0 0 28rpx;
			image{
				width: 170rpx;
				height: 170rpx;
				border-radius: 85rpx; 
				flex-shrink: 0;
			}
			text{
				font-size: 20rpx;
				padding: 8rpx 20rpx;
				background: #C5A668;
				border-radius: 20rpx;
			}
			view{
				font-size: 48rpx;
				margin-top: 18rpx;
			}
		}
	}
	.person-content{
		background: $theme-dark-color;
		border-top-left-radius: 40rpx;
		border-top-right-radius: 40rpx;
		margin-top: -50rpx;
		.person-li{
			padding-left: 30rpx;
			display: flex;
			align-items: center;
			&.active{
				background: #2a2929;
			}
			image{
				width: 60rpx;
				height: 60rpx;
				flex-shrink: 0;
				margin-right: 30rpx;
			}
			view{
				color: $theme-color;
				flex: 1;
				line-height: 130rpx;
				border-bottom: 1upx solid #525050;
				font-size: 34rpx;
			}
			
		}
	}
	
</style>
