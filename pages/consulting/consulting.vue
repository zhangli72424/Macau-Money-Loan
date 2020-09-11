<template>
	<view class="consulting">
		<view class="container">
			<view class="tab_title">
				<text @tap="tab" data-id="1" :class="{'active':IndexId==1}">社区动态</text>
				<text @tap="tab" data-id="2" :class="{'active':IndexId==2}">快讯</text>
			</view>
			<!-- 动态社区 -->
			<block v-if="show">
				<view class="Community_dynamics">
					<view class="Community_dynamics_content">
						<view class="tiao">
							<image src="../../static/image/diandian.png" mode="image"></image>
						</view>
						<view class="dynamics_center">
							<view class="Data">
								<view class="time">
									<text>12</text>
								</view>
								<image src="../../static/image/dynamics.png" mode="dynamics"></image>
							</view>
							<view class="dynamics_title"></view>
							<view class="dynamics_test"></view>
							<view class="button">
								<button class="BTC">
									<text></text>
									<text class=""></text>
								</button>
								<button class="EOS">
									<text></text>
									<text></text>
								</button>
							</view>
						</view>
					</view>
				</view>
			</block>
			<!-- 快讯 -->
			<block v-else>
				<view class="news_flash">
					<view class="news_flash_banner">
						<image src=""></image>
					</view>
					<view class="news_flash_text">
						<view class="news_flash_title">动态 | 星客将打造全行业全场景的数字资产交易平台</view>
						<view class="news_flash_test">
							<text>据官方消息，在资产数字化改革道路上取得显著成果之后，星客交易所的交易类别已经囊括了许多传统企业的数字化资产项目，例如使用权、合同文本、积分、藏品、知识产权等等。借助专业的区块链研发技术，星客扶持一大批传统企业进行资产数字化改造，将原本没有流动性的资产转变成可交易的数字货币</text>
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>
<script>
	import uniStatusBar from '@/components/uni-status-bar/uni-status-bar.vue';
	export default{
		components:{
			uniStatusBar
		},
		data(){
			return{
				show:true,
				IndexId:1
			}
		},
		methods:{
			tab(e){
				console.log(e.currentTarget)
				let id=e.currentTarget.dataset.id;
				this.IndexId=id;
				if(id==="1"){
					this.show=true;
				}else{
					this.show=false;
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.consulting{
		background: #141413;
		.container{
			.tab_title{
				padding: 75rpx 0 0 30rpx;
				text{
					font-size:30rpx;
					color: #77746A;
					padding-right: 33rpx;
				}
				.active{
					color: #EEA935;
					font-size: 48rpx;
					position: relative;
					&::after{
						content: '';
						position: absolute;
						top:104%;
						left: 42%;
						transform: translateX(-50%);
						bottom: 4rpx;
						width:68rpx;
						height: 8rpx;
						background-color: #EEA935;
						border-radius: 4rpx;
					}
				}
			}
			.Community_dynamics{
				padding: 86rpx 9rpx 0 44rpx;
				display: flex;
				.Community_dynamics_content{
					width: 100%;
					overflow: visible;
					display: flex;
					.tiao{
						width:1rpx;
						height:100%;
						background-color: #FFE0BF;
						margin-right: 27rpx;
						position: relative;
						margin-top: 11rpx;
						image{
							position: absolute;
							top: 0;
							left:-4rpx;
							width: 12rpx;
							height: 12rpx;
						}
					}
					.dynamics_center{
						.Data{
							width: 138rpx;
							height: 36rpx;
							border-radius:10rpx;
							position: relative;
							image{
								width:100%;
								height:100%;
							}
							.time{
								width: 100%;
								height:100%;
								position: absolute;
								top:0;
								left:0;
								color: #FFFFFF;
								font-size:20rpx;
								display: flex;
								padding: 0 19rpx;
								text{
									width: 100%;
									height:100%;
									align-items: center;
									justify-content: space-between;
								}
							}
						}
					}
					.dynamics_title{
						font-size: 28rpx;
						color: #FFFFFF;
					}
					.dynamics_test{
						font-size: 20rpx;
						line-height: 36rpx;
						color: #77746A;
					}
					.button{
						display:flex;
						button{
							width:136rpx;
							height: 46rpx;
							align-items: center;
							justify-content: center;
							background-color:#22211E ;
							margin-right: 20rpx;
							border-radius:10rpx;
							color: #5A5A5A;
							display: flex;
							font-size: 18rpx;
							margin-top: 28rpx;
							padding: 0;
							text{
								align-items: center;
								justify-content: space-between;
							}
						}
					}
				}
			}
			.news_flash{
				padding:29rpx 31rpx ;
				.news_flash_banner{
					width: 690rpx;
					height: 250rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.news_flash_text{
					.news_flash_title{
						font-size: 24rpx;
						color: #FFFFFF;
						margin: 29rpx  0  28rpx 0;
					}
					.news_flash_test{
						font-size: 20rpx;
						line-height: 36rpx;
						color: #77746A;
					}
				}
			}
		}
	}
</style>
