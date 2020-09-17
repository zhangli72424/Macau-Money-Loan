<template>
	<view>
		<view class="wallet-top">	
			<u-navbar :is-back="false" zIndex="9" :is-fixed="false" :background="background">
				<view class="nav-title">
					<view class="nav-title-box">
						<view class="Allet">资产</view>
					</view>
				</view>
			</u-navbar>
			<view class="assets">
				<view class="assets_image">
					<image src="../../static/image/allet_image.png" class="bg-class" mode="widthFix" lazy-load></image>
				
					<view class="assets-content">

						<view class="assets-right">
							<view class="assets-color assets-title">账户余额</view>
							<view class="assets-color assets_num">{{balance || 0}}</view>
							
						</view>
					</view>

					<view class="assets-content-center">
						<view class="profit">理财资产 {{totalw || 0}} USDT</view>
						<view class="profit">理财收益 {{totals || 0}} USDT</view>
					</view>
					<view class="assets-content-bottom">
						<view class="Withdraw-money btn" @tap.stop="getUrl('/pages/assets/recharge')">充币</view>
						<view class="Withdraw-money btn" @tap.stop="getUrl('/pages/assets/coin')">提币</view>
					</view>
				</view>
			</view>
		</view>
		<view class="nav-content">
			<view class="nav-content-l">
				<view :class="{'active':navIndex==0}" @tap.stop="selectNav('0')">理财记录</view>
				<view :class="{'active':navIndex==1}" @tap.stop="selectNav('1')">收益记录</view>
			</view>
			<view class="nav-content-r" @tap.stop="getUrl('/pages/assets/history')">
				<text>充提记录</text>
				<i class="icon iconfont iconxiangyou1"></i>
			</view>
		</view>
		
		<view class="list-content">
			<template v-if="list.length>0">
				<block v-for="(item,index) in list" :key="index">
					<view class="list">
						<view class="list-l">
							<view>{{item.typeStr}}X{{item.amount}}</view>
							<text>{{item.time}}</text>
						</view>
						<view class="list-r">
							<view>{{item.num}}</view>
							<text>金额(USDT）</text>
						</view>
					</view>
				</block>
				<view class="nodata" v-if="noMore">
					没有更多~
				</view>
			</template>
			
			<template v-else>
				<view class="nodata">{{i18n.nodata}}</view>
			</template>
		</view>
	</view>
</template>

<script>
	import Load from '@/components/common/load.vue';
	import uniStatusBar from '@/components/uni-status-bar/uni-status-bar.vue';
	import {pageto, showToast, fetch, updownLine, forceUpdate, diff_txt, _updataTabBar} from '@/common/js/util.js'
	import {mapGetters, mapMutations} from 'vuex' 
	import payPwd from '@/components/pay-pwd/pay-pwd.vue';
	import Message from '@/components/common/message.vue';
	export default {
		components:{
			uniStatusBar,Load,payPwd,Message
		},
		data() {
			return {
				background:{
					background:"#141413"
				},
				navIndex:0,
				list:[],
				page:1,
				totalw:'',
				balance:'',
				totals:'',
				noMore:false
			};
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
				'getTextArr'
			])
		},
		onPullDownRefresh(){
			this.page=1;
			this.list = []
			this.getHistory();
		},
		onReachBottom(){
			this.getHistory();
		},
		onShow(){
			this.getWallet();
			this.noMore = false;
			this.totalw=''
			this.balance='' 
			this.totals=''
			_updataTabBar(this.getTextArr,this.getLangType);
			this.isCheck = false;
			this.page=1;
			this.list = []
			this.getHistory();
			uni.showTabBar({
				success: (res) => {
					
				}
			})
		},
		methods:{
			getWallet(){
				fetch('/api/wallet/wallet_list',{},'post')
					.then(res=>{
						
					})
			},
			getUrl(url){
				if(url=='/pages/assets/history'){
					let jso = {
						token_id:3,
						title_en:'USDT'
					}
					uni.navigateTo({
						url:`/pages/assets/history?item=${JSON.stringify(jso)}`
					})
					return
				}
				
				pageto(url)
				
				
				
			},
			selectNav(index){
				this.navIndex = index;
				this.page=1
				this.list = []
				this.getHistory();
				// type 60 理财记录  
				// 61 收益记录
			},
			getHistory(){
				let _data_ = {
					page:this.page,
					rows:10,
					type:this.navIndex==1?61:60,   //0驳回 1审核中 2收益中 3已出局
				}
				if(this.isCheck) return
				this.isCheck = true;
				fetch('/api/aomen/userwealth',_data_,'post')
					.then(res=>{
						this.isCheck = false;
						
						this.balance = parseInt(res.data.data.balance*100000000)/100000000
						this.totals = parseInt(res.data.data.totals*100000000)/100000000
						this.totalw = parseInt(res.data.data.totalw*100000000)/100000000
						
						if(res.data.data.record.length ==0){
							uni.hideNavigationBarLoading();
							uni.showToast({
								title:this.i18n.nodata,
								icon:'none'
							})
							return;
						}
						if(res.data.code==1){
							res.data.data.record.forEach((item,index)=>{
								item.num = parseInt(item.num*1000000)/1000000
								item.amount =  parseInt(item.amount*1000000)/1000000
							})
							
							if(res.data.data.record.length<10){
								this.noMore = true
							}
							
							if(this.page==1){
								this.list = res.data.data.record
								
							}else{
								this.list = this.list.concat(res.data.data.record)
							}
							this.page++
						}
					})
					.catch(err=>{
						this.isCheck = false;
					})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	@flex {
		justify-content:space-between;
		align-items:center;
	}
	@import '@/common/scss/variable.scss';
	.nav-title{
		width: 100%;
		padding: 0 30rpx;
		.nav-title-box{
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.Allet{
				font-size: 40rpx;
				color: #FFFFFF;
			}
			.mi{
				font-size: 26rpx;
				color: #EEA935;
				display: flex;
				align-items: center;
				image{
					width: 14rpx;
					height: 24rpx;
					magrin-left:10rpx;
				}
			}
		}
			
	}
	.assets{
		width:750rpx;
		height: auto;
		margin: 30rpx;
		.assets_image{
			width: 690rpx;
			height: 332rpx;
			position: relative;
			.bg-class{
				position: absolute;
				left: 0;
				top: 0;
				z-index: -1;
				width: 690rpx;
				height:332rpx;
				// border-radius: 10rpx;
			}
			.assets-content{
				display: flex;
				top:0;
				left:0;
				padding-top:61rpx;
				// .assets-left{
				// 	width: 50%;
				// 	height: 100%;
				// 	text-align: left;
				// 	padding-left: 45rpx;
				// }
				.assets-right{
					width: 100%;
					height: 100%;
					text-align: center;
					// padding-right: 49rpx;
				}
				.assets_num{
					font-size: 48rpx;
					color: #EEA935;
				}
				.assets-title{
					font-size: 22rpx;
					color: #EEA935;
					margin-bottom: 20rpx;
				}
				.profit{
					color: #FFBC49;
					font-size: 48rpx;
				}
			}
			.assets-content-center{
				display: flex;
				align-items: center;
				justify-content: center;
				padding-top: 48rpx;
				.profit{
					color: #FFBC49;
					font-size: 24rpx;
					&:first-of-type{
						margin-right: 84rpx;
					}
				}
			}
			.assets-content-bottom{
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 34rpx 0 44rpx;
				.btn{
					background: linear-gradient(to top, #DCB87C , #CE9A55);
					width: 193rpx;
					height: 50rpx;
					line-height: 50rpx;
					text-align: center;
					border-radius: 6rpx;
					font-size: 26rpx;
					color: #181617;
					&:first-of-type{
						margin-right: 81rpx;
					}
				}
			}
		}
	}
	.main{
		width: 100%;
		height: auto;
		overflow: hidden;
		.mai-title{
			.all{
				image{
					width: 14rpx;
					height: 24rpx;
				}
			}
		}
	}
	
	.wallet-top{
		// background: linear-gradient(to bottom,#FFE09F,#D3AD6D);
		text-align: center;
		.wallet-top-t{
			padding: 40rpx 0 28rpx;
			text{
				font-size: 26rpx;
			}
			view{
				font-size: 64rpx;
				font-weight: bold;
				margin-top: 15rpx;
			}
		}
		.wallet-top-nav{
			display: flex;
			align-items: center;
			padding: 18rpx 30rpx;
			justify-content: space-between;
			background: linear-gradient(to right,#FFE09F,#D3AD6D);;
			.wallet-top-nav-l{
				text-align: left;
				text{
					font-size: 22rpx;
				}
				view{
					margin-top: 16rpx;
					font-size: 40rpx;
				}
			}
			.wallet-top-nav-r{
				text-align: right;
				text{
					font-size: 22rpx;
				}
				view{
					margin-top: 16rpx;
					font-size: 40rpx;
				}
			}
		}
	}
	
	.no-data{
		font-size: 26rpx;
		text-align: center;
		color: #AAAFBD;
		padding-top: 40rpx;
	}
	.nav-content{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 46rpx 30rpx;
		.nav-content-l{
			display: flex;
			align-items: center;
			view{
				font-size: 30rpx;
				color: #747470;
				margin-right: 33rpx;
				&.active{
					color: #EEA935;
					font-size: 48rpx;
					font-weight: bold;
				}
			}
		}
		.nav-content-r{
			display: flex;
			align-items: center;
			color: #747470;
			text{
				font-size: 30rpx;
			}
		}
	}
	.list-content{
		padding: 0 30rpx;
		.list{
			display: flex;
			align-items: center;
			justify-content: space-between;
			background: #22211E;
			padding: 61rpx 30rpx 53rpx;
			border-radius: 20rpx;
			margin-bottom: 20rpx;
			.list-l{
				view{
					font-size: 36rpx;
					font-weight: bold;
					margin-bottom: 30rpx;
				}
				text{
					font-size: 24rpx;
					color: #77746A;
				}
			}
			.list-r{
				text-align: right;
				view{
					font-size: 36rpx;
					font-weight: bold;
					margin-bottom: 30rpx;
				}
				text{
					font-size: 24rpx;
					color: #77746A;
				}
			}
		}
	}
	
	
</style>
