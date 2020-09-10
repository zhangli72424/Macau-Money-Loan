<template>
	<view>
		<!-- #ifdef APP-PLUS -->
		<!-- <uni-status-bar bgcolor="#1B2640"></uni-status-bar> -->
		<!-- #endif -->
		<view class="assets-title animated bounceInUp fast">
			<view class="assets-title-top">
				<text>{{i18n.TotalAssets}}(USDT）</text> <i class="icon iconfont" @tap.stop="switchShow" :class="[isShow?'iconai-eye':'iconyanjing-bi']"></i>
			</view>
			<view class="assets-title-content">
				{{isShow?(total | formatParsefloat):'***'}}
			</view>
			<view class="assets-title-bottom">
				≈{{isShow?(total | formatParsefloat):'***'}}<text>(USDT)</text>
			</view>
		</view>
		
		<view class="assets-content">
			<view class="assets-content-title animated bounceInUp fast">{{i18n.Asset_list}}</view>
			<block v-for="(item,index) in list" :key="index">
				<view class="list animated bounceInUp fast" @tap.stop="clickDump(index)">
					<view class="list-top">
						<view class="_left">
							<image lazy-load :src="item.logo"></image>
							<view>
								<text>{{item.title_en}}</text>
								<text>{{item.title_zh}}</text>
							</view>
						</view>
						<view class="_right giving-text" v-if="item.id==1">
							<view class="">
								{{item.giving | formatParsefloat}}
							</view>
							<text>{{i18n.Frozen_quantity}}</text>
						</view>
						<view class="_right">
							<view class="">
								{{item.balance | formatParsefloat}}
							</view>
							<text>≈ $ {{item.usd_price | formatParsefloat}}</text>
						</view>
					</view>
					<view class="list-bottom" v-if="item.show" :class="{'anima':item.show}">
						<view class="items">
							<view @tap.stop="jumpReceive(index)"  v-if="item.open_type.cb==1">
								<image src="../../static/image/receive.png" mode="widthFix" lazy-load></image>{{i18n.Deposit}}
							</view>
						</view>
						<view class="items"  v-if="item.open_type.tb==1">
							<view @tap.stop="jumpTurn(index)">
								<image src="../../static/image/receive.png" mode="widthFix" lazy-load></image>{{i18n.withdrawal}}
							</view>
						</view>
						<view class="items"  v-if="item.open_type.hz==1">
							<view @tap.stop="jumpFlash(index)">
								<image src="../../static/image/receive.png" mode="widthFix" lazy-load></image>{{i18n.Transfer}}
							</view>
						</view>
						<view class="items"  v-if="item.open_type.sf==1">
							<view @tap.stop="jumpFlash(index)">
								<image src="../../static/image/receive.png" mode="widthFix" lazy-load></image>{{i18n.Flash_payment}}
							</view>
						</view>
						<view class="items">
							<view @tap.stop="jumpHistory(index)" v-if="item.open_type.zd==1">
								<image src="../../static/image/receive.png" mode="widthFix" lazy-load></image>账单
							</view>
						</view>
					</view>
				</view>
				
			</block>
		</view>
		
		<load v-if="showload"></load>
	</view>
</template>

<script>
	import uniStatusBar from '@/components/uni-status-bar/uni-status-bar.vue';
	import {pageto, showToast, fetch, _updataTabBar, forceUpdate} from '@/common/js/util.js';
	import {mapGetters,mapMutations} from "vuex";
	import load from '@/components/common/load.vue';
	export default {
		components:{
			uniStatusBar,load
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
			]),
		},
		onShow(){
			forceUpdate(this.getLangType);
			_updataTabBar(this.getTextArr,this.getLangType);
			this.list = []
			this.getList()
		},
		data() {
			return {
				total:0,
				isShow:false,
				list:[],
				showload:false
			};
		},
		methods:{
			switchShow(){this.isShow = !this.isShow;},
			getList(){
				let data = {
					id:this.getLoginInfo.id,
					token:this.getLoginInfo.token
				}
				this.showload = true;
				fetch('/api/wallet/wallet_list',data,'post')
					.then(res=>{
						this.showload = false;
						if(res.data.code){
							this.list = res.data.data.list;
							this.total = (parseInt((res.data.data.total)*10000)/10000).toFixed(4) ;
							this.list.forEach((item,index)=>{
								this.list[index].type = (item.zdf>=0?true:false)
								this.list[index].show = false;
								item.zdf = (item.zdf*100)+'%';
								console.log(item.open_type);
								if(item.token_id==1){
									this.list[index].showFlase = true;
								}
							})
						}
					})
					.catch(error=>{
						this.showload = false;
						console.log(error);
					})
			},
			jumpReceive(index){
				let item = JSON.stringify(this.list[index]);
				uni.navigateTo({
					url:`/pages/assets/recharge?item=${item}`
				})
			},
			jumpTurn(index){
				let item = JSON.stringify(this.list[index]);
				uni.navigateTo({
					url:`/pages/assets/coin?item=${item}`
				})
			},
			jumpHistory(index){
				let tokenId = this.list[index].token_id;
				uni.navigateTo({
					url:`/pages/assets/history?item=${JSON.stringify(this.list[index])}`
				})
			},
			jumpFlash(index){
				let tokenId = this.list[index].token_id;
				uni.navigateTo({
					url:`/pages/assets/transfer?item=${JSON.stringify(this.list[index])}`
				})
			},
			clickDump(index){
				// if(this.list[index].token_id==11)return;
				for	(let i = 0; i < this.list.length; i++){
					if(index == i && this.list[i].show==false){
						this.list[i].show = true
						this.$set(this.list, i,  this.list[i])
						// this.$forceUpdate();
					}else{
						this.list[i].show = false
						this.$set(this.list, i, this.list[i])
						// this.$forceUpdate();
					}
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/variable.scss';
	.assets-title{
		background: linear-gradient(to right,#3083FF,#001EFF);
		margin: 40upx 30upx;
		border-radius: 20upx;
		padding: 54upx 0 66upx 54upx;
		.assets-title-top{
			display: flex;
			align-items: center;
			text{
				margin-right: 15upx;
			}
		}
		.assets-title-content{
			font-size: 58upx;
			color: $white;
			margin: 38upx 0 32upx;
		}
		.assets-title-bottom{
			font-size: 40upx;
			text{
				font-size: 24upx;
				margin-left: 10upx;
			}
		}
	}
	@-webkit-keyframes test-animation {
	  0% { 
		  border-top:none;
		  height: 0;
		  opacity: 1;
		  }
	  100% { 
		  border-top:1upx solid #25314D;
		  height: 108upx;
		  margin-top: 38upx;
		  padding-top: 18upx;
		  padding-bottom: 10upx;
		  display: block !important;
		  }
	}
	@keyframes test-animation {
	  0% {
	  	  border-top:none;
	  	  height: 0;
	  	  opacity: 0;
	  	  }
	  100% { 
	  	  border-top:1upx solid #25314D;
	  	  height: 108upx;
		  margin-top: 38upx;
		  padding-top: 18upx;
		  padding-bottom: 10upx;
		  display: block !important;
	  	  }
	}
	.assets-content{
		.assets-content-title{
			padding:0 30upx 30upx;
			font-weight: 36upx;
			color: $white;
		}
		.list{
			background-color: #1B2640;
			border-radius: 8upx;
			margin:0 30upx 20upx;
			.list-top{
				padding: 36upx 36upx 40upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				._left{
					display: flex;
					// justify-content: space-between;
					align-items: center;
					image{
						width: 75upx;
						height: 75upx;
						background: $white;
						border-radius: 37.5upx;
					}
					view{
						text{
							
							display: block;
							padding-left: 26upx;
							color: $white;
							font-size: 28upx;
							font-weight: bold;
							margin-bottom: 2upx;
							&:last-of-type{
								font-size: 24upx;
								color: #58627D;
							}
						}
					}
				}
				._right{
					&.giving-text{
						text-align: center;
						view{
							text-align: center;
						}
					}
					view{
						text-align: right;
						font-size: 34upx;
						font-weight: bold;
						color: $white;
						margin-bottom: 24upx;
					}
					text{
						font-size: 24upx;
						color: #58627D;
					}
				}
			}
			.list-bottom{
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 0;
				// height: 148upx;
				// margin-top: 38upx;
				overflow: hidden;
				&.anima{
					animation: test-animation 1s linear 0s 1 forwards;
				}
				.items{
					flex: 1;
					view{
						width: 120upx;
						margin: 0 auto;
						height: 54upx;
						border-radius: 10upx;
						background: linear-gradient(to right,#3083FF,#001EFF);
						display: flex;
						align-items: center;
						font-size: 26upx;
						font-weight: 100;
						justify-content: center;
						image{
							width: 32upx;
							height: 32upx;
							flex-shrink: 0;
							margin-right: 10upx;
						}
					}
				}
			}
		}
	}
</style>
