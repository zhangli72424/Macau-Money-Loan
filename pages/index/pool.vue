<template>
	<view class="content">
		<view class="list-content">
			<view class="aboute">
				<view class="aboute-title">矿池数据</view>
				
				
				<view class="index-i-content">
					<view class="index-content-top">
						<view class="items">
							<text>持币收益(EKA)</text>
							<view>{{info.cbsy}}</view>
						</view>
						<view class="items">
							<text>推广收益(EKA)</text>
							<view>{{info.tgsy}}</view>
						</view>
					</view>
					<view class="index-content-bottom">
						<view class="items">
							<text>矿池EKA总量</text>
							<view>{{info.kcekazl}}</view>
						</view>
						<view class="items">
							<text>网络节点数量</text>
							<view>{{info.wljd}}</view>
						</view>
					</view>
				</view>
				
				
			<view class="pool-btn">
				<button type="default" hover-class="active" @tap.stop="goInfo">加入矿池</button>
			</view>
			
			</view>
		</view>
		<load v-if="laoding"></load>
	</view>
</template>

<script>
	import {mapGetters,mapMutations} from "vuex";
	import {pageto, showToast, fetch, forceUpdate} from '@/common/js/util.js'
	import Load from '@/components/common/load.vue';
	export default{
		components:{
			Load
		},
		data() {
			return {
				info:{},
				laoding:false,
				curInfo:[]
			}
		},
		computed:{
			i18n() {
				return this.$t('message')
			},
			...mapGetters([
				'getRequestUrl',
				'getLangType',
				'getLogin',
				'getLoginInfo'
			]),
		},
		onShow(){
			forceUpdate(this.getLangType);
			this.getInfo();
			this.getWallet();
		},
		onLoad(){
			// uni.setNavigationBarTitle({title:this.i18n.Post_purchase})
		},
		methods:{
			getWallet(){
				this.laoding = true;
				fetch('/api/wallet/wallet_list1','','post')
					.then(res=>{
						this.laoding = false;
						if(res.data.code){
							this.curInfo = res.data.data.list.filter((item=>{
								return item.title_en == "EKA"
							}))
							console.log(this.curInfo);
						}
					})
					.catch(err=>{
						this.laoding = false;
					})
			},
			goInfo(){
				uni.navigateTo({
					url:`/pages/assets/transfer?item=${JSON.stringify(this.curInfo[0])}`
				})
			},
			getInfo(){
				this.laoding = true;
				fetch('/api/index/index','','post')
					.then(res=>{
						this.laoding = false;
						if(res.data.code){
							this.info = res.data.data
						}
					})
					.catch(err=>{
						this.laoding = false;
					})
			}
		}
	}
</script>

<style scoped lang="scss">
	@import '@/common/scss/variable.scss';
	.content{
		.list-content{
			.pool-btn{
				button{
					margin: 128upx 30upx 0;
					line-height: 88upx;
					height: 88upx;
					border-radius: 6upx;
					background: linear-gradient(to right,#3083FF,#001EFF);
					color: $white;
					&.active{
						background: #58627D;
						color: #0F0C39;
					}
				}
			}
			.aboute{
				margin: 26upx 30upx;
				&.about-bg{
					// background-color: #1b2640;
					background: #52556f;
					padding: 40upx 20upx;
					border-radius: 20upx;
					.aboute-title{
						margin-bottom: 0;
						view{
							font-size: 38upx;
						}
						text{
							font-size: 26upx;
						}
					}
				}
				.aboute-title{
					padding-left: 20upx;
					position: relative;
					font-size: 38upx;
					margin-bottom: 35upx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					&::before{
						content: "";
						position: absolute;
						left: 0;
						top: 50%;
						width: 3upx;
						height: 35upx;
						background: #0063FF;
						transform: translateY(-50%);
					}
				}
				.index-i-content{
					background: #1B2640;
					border-radius: 20upx;
					// margin: 0 30upx; 
					// padding: 62upx 45upx;
					.index-content-top{
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 48upx 40upx 44upx;
						border-bottom: 1upx solid #454C5D;
						.items{
							flex: 1;
							text{
								color: #A6ABB9;
								font-size: 24upx;
							}
							view{
								font-size:28upx;
								color: #0063FF;
							}
							&:last-of-type{
								text-align: right;
								view{
									color: $white;
								}
							}
						}
					}
					.index-content-bottom{
						display: flex;
						justify-content: space-between;
						align-items: center;
						.items{
							flex: 1;
							text-align: center;
							font-size: 30rpx;
							line-height: 70rpx;
							padding-bottom: 20rpx;
							text{
								color: #A6ABB9;
								font-size: 24upx;
							}
							view{
								// margin-top: 32upx;
								font-size: 26upx;
							}
							&:first-of-type{
								position: relative;
								&::after{
									content: "";
									position: absolute;
									right: 0;
									top: 50%;
									transform: translateY(-50%);
									width: 2upx;
									height: 144upx;
									background-color: #454C5D;
								}
							}
						}
					}
				}
				.aboute-text{
					font-size: 26upx;
					text-indent: 50upx;
					line-height: 40upx;
					margin-bottom: 20upx;
				}
			}
		}
	}
</style>
