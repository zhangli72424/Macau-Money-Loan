<template>
	<view>
		<u-navbar :is-back="false" zIndex="9" :is-fixed="false" :background="background">
			<view class="index-top">
				{{i18n.Personal_Center}}
			</view>
		</u-navbar>
		<view class="person-top">
		<image src="../../static/image/index-to.png" mode="widthFix" lazy-load class="person-top-bg"></image>
			<view class="person-top-t">
				<image :src="user_img" mode="widthFix" lazy-load></image>
				<view class="person-name">
					<view class="">
						{{name}}
					</view>
					<text>{{i18n.invite_code}}:{{user_sn || '--'}}</text>
				</view>
			</view>
			
			<view class="person-bottom">
				<view class="person-bottom-item">
					<view>{{balance || 0}}</view>
					<text>{{i18n.Account_balance}}(usdt)</text>
				</view>
				<view class="person-bottom-item">
					<view>{{total || 0}}</view>
					<text>{{i18n.Cumulative_income}}(usdt)</text>
				</view>
			</view>
			
		</view>

		
		<view class="person-content">
			<block v-for="(item,index) in navList" :key="index">
				<view class="person-li" hover-class="active" @tap.stop="jump(item.url)">
					<view class="person-li-l">
						<image :src="item.image" mode="widthFix" lazy-load></image>
						<view>{{item.title}}</view>
					</view>
					<view class="person-li-r">
						<text>{{item.tips}}</text>
						<i class="icon iconfont iconxiangyou1"></i>
					</view>
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
				user_info:{},
				background:{
					background:'#141413'
				},
				zd_type:{},
				balance:'',
				total:'',
				user_sn:''
			};
		},
		onShow(){
			this.getWallet();
			this.name = this.getLoginInfo.email
			this.setFirstTeam(false)
			this.getIndex();
			this.getUser();
			console.log(this.getFirstTeam);
			this.navList = [
				// {
				// 	title:'我的理财',
				// 	image:require('../../static/image/p1.png'),
				// 	url:'/pages/investment/mining',
				// 	tips:'查理财 看收益'
				// },
				{
					title:this.i18n.invite_friends,
					image:require('../../static/image/invite.png'),
					url:'/pages/invite/advertising',
					tips:this.i18n.friends
				},
				{
					title:this.i18n.My_bill,
					image:require('../../static/image/p2.png'),
					url:'/pages/bill/bili',
					tips:this.i18n.financial
				},
				{
					title:this.i18n.My_team,
					image:require('../../static/image/p3.png'),
					url:'/pages/team/team',
					tips:this.i18n.members
				},
				{
					title:this.i18n.System_settings,
					image:require('../../static/image/p4.png'),
					url:'/pages/setting/setting'
				}
			]
		},
		methods:{
			...mapMutations(['setFirstTeam']),
			getWallet(){
				fetch('/api/wallet/wallet_list',{},'post')
					.then(res=>{
						
					})
			},
			getUser(){
				fetch('/api/aomen/user',{},'post')
					.then(res=>{
						if(res.data.code==1){
							this.balance =  parseInt(res.data.data.balance*100000000)/100000000
							this.total =  parseInt(res.data.data.tota*100000000)/100000000
							this.user_sn = res.data.data.user.user_sn 
						}
					})
					.catch(err=>{
						
					})
			},
			jump(url){
				if(url){
					if(url=='/pages/bill/bili'){
						if(this.zd_type){
							pageto(`/pages/bill/bili?tab=${JSON.stringify(this.zd_type)}`);
						}
						return
					}
					this.setFirstTeam(true)
					pageto(url)
				}
			},
			getIndex(){
				fetch('/api/index/index',{},'POST')
					.then(res=>{
						if(res.data.code==1){
							let info = res.data.data
							this.user_info = info
							this.zd_type  = res.data.data.zd_type
							this.user_img = require(`../../static/image/avatar.png`)
						}
					})
					.catch(err=>{
						
					})
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import '@/common/scss/variable.scss';
	.index-top{
		font-size: 40rpx;
		padding: 34rpx 0 36rpx 30rpx;
	}
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
		padding: 38rpx 35rpx 0;
		margin: 0 30rpx;
		// background: linear-gradient(to right, #937552, #ECD0A7);
		border-radius: 10rpx;
		position: relative;
		.person-top-bg{
			position: absolute;
			width: 690rpx;
			height: 350rpx;
			flex-shrink: 0;
			z-index: -1;
			left: 0;
			top: 0;
		}
		.person-top-t{
			display: flex;
			align-items: center;
			padding-bottom: 40rpx;
			image{
				width: 100rpx;
				height: 100rpx;
				border-radius: 50rpx; 
				flex-shrink: 0;
				margin-right: 10rpx;
			}
			.person-name{
				text{
					font-size: 24rpx;
					// padding: 8rpx 20rpx;
					// background: #C5A668;
					// border-radius: 20rpx;
					text-align: left;
					display: block;
				}
				view{
					font-size: 40rpx;
					font-weight: bold;
					margin-bottom: 14rpx;
				}
			}
		}
		.person-bottom{
			border-top: 1rpx solid #ECDDC3;
			display: flex;
			align-items: center;
			padding: 54rpx 0 45rpx;
			.person-bottom-item{
				flex: 1;
				text-align: left;
				&:last-of-type{
					text-align: right;
				}
				view{
					font-size: 40rpx;
					color: $white;
					margin-bottom: 20rpx;
				}
				text{
					font-size: 20rpx;
					color: #e0d8cd;
				}
			}
		}
	}
	.person-content{
		// background: $theme-dark-color;
		padding-top: 54rpx;
		.person-li{
			padding-left: 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background: #22211E;
			margin-bottom: 17rpx;
			&.active{
				background: #2a2929;
			}
			.person-li-l{
				display: flex;
				align-items: center;
				image{
					width: 60rpx;
					height: 60rpx;
					flex-shrink: 0;
					margin-right: 17rpx;
				}
				view{
					color: $white;
					flex: 1;
					line-height: 100rpx;
					font-size: 30rpx;
				}
				
			}
			.person-li-r{
				display: flex;
				align-items: center;
				color: #747470;
				padding-right: 30rpx;
				text{
					font-size: 22rpx;
				}
				.icon{
					
				}
			}
		}
	}
	
</style>
