<template>
	<view>
		<view class="wallet-top">
			 <!-- #ifdef APP-PLUS -->
			 <uni-status-bar bgcolor="transparent"></uni-status-bar>
			 <!-- #endif -->
			<view class="wallet-top-t">
				<text>总价值USDT</text>
				<view class="">
					{{total?(total):0}}
				</view>
			</view>
			<view class="wallet-top-nav">
				<view class="wallet-top-nav-l">
					<text>USDT余额</text>
					<view>{{total_usdt?total_usdt:'0'}}</view>
				</view>
				<view class="wallet-top-nav-r">
					<text>STD余额</text>
					<view>{{total_cny?(total_cny):0}}</view>
				</view>
			</view>
		</view>
		<block v-for="(item,index) in navList" :key="index">
			<view class="wallet-li" hover-class="active" @tap.stop="jump(item.url)">
				<view class="wallet-li-l">
					<image :src="item.image" mode="widthFix" lazy-load></image>
					<view>{{item.title}}</view>
				</view>
				<view class="wallet-li-r">
					<text>{{item.text}}</text>
					<i class="icon iconfont iconxiangyou1"></i>
				</view>
				
			</view>
		</block>
		<view class="popule-mask anima fadeIn fast" v-if="showpopule" @tap.stop="cancle">
			<view class="popule-content" @tap.stop="''">
				<view class="popule-content-title">
					<view>{{curInfo.title}}</view>
					<text>售价：{{curInfo.freeze | formatParsefloat}}</text>
				</view>
				<view class="popule-content-li">
					<text>实际支付价格</text>
					<view class="popule-content-li-n">{{relaNum}} STD</view>
				</view>
				<view class="popule-content-li">
					<text>实际支付价格</text>
					<view class="popule-content-li-num">
						<button type="default" 
						:disabled="num==1"
						hover-class="active"
						 @tap.stop="lower">-</button>
						<input type="text" placeholder="请输入数量" v-model="num">
						<button type="default" hover-class="active" @tap.stop="add">+</button>
					</view>
				</view>
				<view class="popule-content-btn">
					<button type="default" hover-class="active" @tap.stop="cancle">取消</button>
					<button type="default" hover-class="active" @tap.stop="confrim">下单</button>
				</view>
			</view>
		</view>
		<load v-if="showLoadings"/>
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
		data() {
			return {
				showpopule:false,
				showLoadings:'',
				navList:[],
				zd_type:'',
				curInfo:{},
				num:1,
				total_cny:'',
				total_usdt:'',
				total:'',
				b_total:'',
				j_total:'',
				cur:{},
				usdt_info:'',
				std_info:''
				
			};
		},
		computed:{
			relaNum(){
				return parseFloat(this.curInfo.freeze)*parseFloat(this.num);
			},
			formatParsefloat(val){
				if ((!val && val != 0) || val == null || val == undefined || val == 'undefined') {
					return 0
				}
				return parseFloat(val)
			},
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
		onLoad(){
			this.navList = [
				{
					title:'充值余额',
					text:'充值余额再入金',
					image:require('../../static/image/wallet-02.png'),
					url:'/pages/assets/recharge'
				},
				{
					title:'余额提现',
					text:'随存随取无门槛',
					image:require('../../static/image/wallet-03.png'),
					url:'/pages/assets/coin'
				},
				{
					title:'账单明细',
					text:'资金存取收益明细',
					image:require('../../static/image/wallet-04.png'),
					url:'/pages/bill/bili'
				},
				{
					title:'藏宝阁',
					text:'入金收益',
					image:require('../../static/image/wallet-05.png'),
					url:'/pages/wallet/treasure-court'
				}
			]
		},
		onShow(){
			this.get_wallet();
			this.getIndex();
			this.getShopList();
			this.getType()
			this.getCheckB()
		},
		methods:{
			getCheckB(){
				let _url = '/api/Wallet/check_b';
				fetch(_url,{},'POST').then(res=>{
					
				})
			},
			getType(){
				fetch('/api/User/detailed',{},'post')
					.then(res=>{
						if(res.data.code==1){
							this.zd_type = res.data.data.type
						}
					})
			},
			get_wallet(){
				fetch('/api/wallet/wallet_list',{},'post')
					.then(res=>{
						if(res.data.code==1){
							let list = res.data.data.list
							
							let lit = res.data.data.list.filter(item=>{
								return item.id==1;
							})
							let usdt = res.data.data.list.filter(item=>{
								return item.title_en=="USDT";
							})
							this.total_cny = (parseInt(lit[0].balance*1000000))/1000000
							this.cur = lit[0]
							this.total_usdt = (parseInt(usdt[0].balance*1000000))/1000000
							this.total = (parseInt(res.data.data.total_usd*1000000))/1000000
							
							
							let li = list.filter(item=>{
								return item.title_en=='USDT'
							})
							let std = list.filter(item=>{
								return item.title_en=='STD'
							})
							this.usdt_info = li[0]
							this.std_info = std[0]
							
							
						}
					})
			},
			lower(){
				if(this.num>1){
					this.num--;
					return
				}
				this.num=1
			},
			add(){
				this.num++
			},
			buy(){
				this.cancle()
			},
			confrim(){
				uni.navigateTo({
					url:`/pages/top-up/top-up?num=${this.num}`
				})
			},
			cancle(){
				if(this.showpopule==false){
					this.showpopule = true
					uni.hideTabBar({
						success: (res) => {
							
						}
					})
				}else{
					this.showpopule=false
					uni.showTabBar({
						success: (res) => {
							
						}
					})
				}
			},
			...mapMutations(['setPlan']),
			getShopList(){
				fetch('/api/Shop/shop_list',{},'post')
					.then(res=>{
						if(res.data.code==1){
							this.curInfo = res.data.data[0];
							this.setPlan(JSON.stringify(this.curInfo))
						}
					})
			},
			jump(url){
				
				switch (url){
					case '/pages/bill/bili':
					if(!this.zd_type) return
						uni.navigateTo({
							url:`/pages/bill/bili?tab=${JSON.stringify(this.zd_type)}`
						})
						break;
					case '/pages/assets/recharge':
						uni.navigateTo({
							url:`/pages/assets/recharge?item=${JSON.stringify(this.usdt_info)}`
						})
						break;
					case '/pages/assets/coin':
						uni.navigateTo({
							url:`/pages/assets/coin?item=${JSON.stringify(this.usdt_info)}`
						})
						break;
					default:
						uni.navigateTo({
							url:url
						})
				}
			},
			getIndex(){
				fetch('/api/index/index',{},'post')
					.then(res=>{
						if(res.data.code==1){
							this.b_total = res.data.data.freeze
							this.j_total = res.data.data.yeji
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
	.popule-mask{
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background: rgba(0,0,0,.3);
		z-index: 9;
		.popule-content{
			background-color: $theme-dark-color;
			position: fixed;
			left: 0;
			bottom: 0;
			right: 0;
			z-index: 10;
			border-top-left-radius: 20rpx;
			border-top-right-radius: 20rpx;
			padding: 60rpx;
			.popule-content-title{
				border-bottom: 1rpx solid #929191;
				padding-bottom: 38rpx;
				view{
					font-size: 36rpx;
					margin-bottom: 25rpx;
				}
				text{
					font-size: 26rpx;
				}
			}
			.popule-content-li{
				padding-top: 50rpx;
				text{
					color: #929191;
					font-size: 26rpx;
				}
				.popule-content-li-n{
					font-size: 46rpx;
					margin-top: 28rpx;
				}
				.popule-content-li-num{
					margin-top: 20rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					width: 475rpx;
					border-radius: 8rpx;
					border: 1rpx solid #929191;
					button{
						width: 80rpx;
						line-height: 80rpx;
						height: 80rpx;
						text-align: center;
						color: #929191;
						background: transparent;
						border-radius: 0;
						&:first-of-type{
							border-right: 1rpx solid #929191;
						}
						&:last-of-type{
							border-left: 1rpx solid #929191;
						}
						&.active{
							border: none;
							color: $white;
							background: $trans-color;
						}
						&::after{
							display: none;
						}
					}
					input{
						text-align: center;
						flex: 1;
					}
				}
				
			}
			.popule-content-btn{
				padding-top: 77rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				button{
					border-radius: 8rpx;
					width: 240rpx;
					font-size: 34rpx;
					&:first-of-type{
						background-color: #929191;
						color: #E9E9F4;
					}
					&:last-of-type{
						background: linear-gradient(to left, #d4ae6d, #fedf9d);;
						color: $white;
					}
					&.active{
						opacity: .95;
						transform: scale(.95);
					}
					&::after{
						display: none;
					}
				}
			}
		}
	}
	.wallet-top{
		background: linear-gradient(to bottom,#C6802C,#FFE1A2);
		text-align: center;
		padding: 27rpx 0 0;
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
			background: rgba(33,29,30,.08);
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
	.wallet-li{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 30rpx;
		margin-top: 30rpx;
		background: $theme-dark-color;
		&.active{
			background: #2a2929;
		}
		.wallet-li-l{
			display: flex;
			align-items: center;
			image{
				width: 60rpx;
				height: 60rpx;
				flex-shrink: 0;
				margin-right: 15rpx;
			}
			view{
				font-size: 34rpx;
			}
		}
		.wallet-li-r{
			display: flex;
			align-items: center;
			font-size: 22rpx;
			color: #A6A7AB;
			view{
				margin-left: 15rpx;
			}
		}
	}
</style>
