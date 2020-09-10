<template>
	<view class="list-item animated bounceInUp fast" @tap="clickDump(index)">
		<view class="list-item-top">
			<view class="item-l">
				<image :src="item.logo" mode="widthFix" lazy-load></image>
				<view class="items">
					<view class="">
						{{item.title_en}}
					</view>
					<text v-if="item.title_zh">{{item.title_zh}}</text>
				</view>
			</view>
			<view class="item-c" :style="{textAlign:(item.zdfisshow?'center !important':'right !important')}">
				<view class="">
					{{item.balance | formatParsefloat}}
				</view>
				<text>≈ $ {{item.usd_price | formatParsefloat}}</text>
			</view>
			<template v-if="item.zdfisshow">
				<view class="item-r">
					<view  :class="item.type?'green':'red'">
						{{item.type?'+':'-'}}{{item.zdf}}
					</view>
				</view>
			</template>
			
		</view>
		<view class="list-item-bottom" :class="item.show?'anima':''">
			<view class="list-item-bottoms">
				<view class="list-item-bottom-i" @tap.stop="jumpReceive(index)">
					<image src="../../static/image/receive.png" mode="widthFix" lazy-load></image>
					<text>{{i18n.recharge}}</text>
				</view>
				<view class="list-item-bottom-i" @tap.stop="jumpTurn(index)">
					<image src="../../static/image/turn.png" mode="widthFix" lazy-load></image>
					<text>{{i18n.withdrawal}}</text>
				</view>
				<view class="list-item-bottom-i" @tap.stop="jumpHistory(index)">
					<image src="../../static/image/history.png" mode="widthFix" lazy-load></image>
					<text>{{i18n.bili}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			item:Object,
			index:Number
		},
		computed:  {
			i18n() {
				return this.$t('message');
			}
		},
		methods:{
			clickDump(index){
				this.$emit('click-dump',index)
			},
			jumpReceive(index){
				this.$emit('jump-receive',index)
			},
			jumpTurn(index){
				this.$emit('jump-turn',index)
			},
			jumpHistory(index){
				this.$emit('jump-history',index)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/variable.scss';
	@import '@/common/scss/global.scss';
	@-webkit-keyframes test-animation {
	  0% { 
		  border-top:none;
		  height: 0;
		  opacity: 1;
		  }
	  100% { 
		  border-top:1upx solid #CACACA;
		  height: 100upx;
		  margin-top: 38upx;
		  padding-top: 38upx;
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
	  	  border-top:1upx solid #CACACA;
	  	  height: 110upx;
		  margin-top: 38upx;
		  padding-top: 38upx;
		  display: block !important;
	  	  }
	} 
	.list-item{
		padding:33upx 30upx;
		background-color: $default-color;
		border-radius:10upx;
		margin-bottom: 30upx;
		.list-item-top{
			display: flex;
			justify-content: space-between;
			.item-l{
				display: flex;
				image{
					width: 75upx;
					height: 75upx;
					background-color: #FFFFFF;
					border-radius:50%;
					flex-shrink: 0;
					margin-right: 14upx;
				}
				.items{
					flex: 1;
					// margin-left:29upx;
					display: flex;
					align-items: center;
					view{
						font-size: 30upx;
						color: $white;
						font-weight: bold;
					}
					text{
						font-size: 24upx;
						color: #464788;
					}
				}
			}
			.item-c{
				flex: 1;
				text-align: center;
				view{
					font-size: 30upx;
					color: $white;
				}
				text{
					font-size: 24upx;
					color: #464788;
				}
			}
			.item-r{
				display: flex;
				justify-content: center;
				align-items: center;
				color: $white;
				view{
					padding: 18upx 15upx;
					border-radius: 10upx;
					font-size: 24upx;
					&.green{
						color: #15D288;
					}
					&.red{
						color: #E43949;
						
					}
				}
			}
		}
		.list-item-bottom{
			height: 0;
			overflow: hidden;
			&.anima{
				animation: test-animation 1s linear 0s 1 forwards;
			}
			.list-item-bottoms{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.list-item-bottom-i{
					flex: 1;
					text-align: center;
					image{
						width: 52upx;
						height: 52upx;
						border-radius:50%;
						flex-shrink: 0;
					}
					text{
						display: block;
						font-size:24upx;
						color: #2a2a2a;
						margin-top: 13upx;
					}
				}
			}
		}
	}
</style>
