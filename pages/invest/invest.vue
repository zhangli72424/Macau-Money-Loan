<template>
	<view class="app-invest">
		<view class="invites-top-bg">
			<image src="../../static/imgs/invites-top-bg.png" mode="widthFix" lazy-load></image>
		</view>
		<view class="invites-title-top-nav"  @tap.stop="toplan">
			<text>{{i18n.my_mining}}</text>
			<image src="../../static/imgs/invest-top-nav.png" mode="widthFix" lazy-load></image>
		</view>
		<view class="invites-title">
			<image 
			@tap.stop="jumpD"
			src="../../static/imgs/invest-top-img.png" 
			mode="widthFix" lazy-load></image>
			<!-- <view class="invites-title-top">
				<view class="items">
					<text>{{i18n.Total_output_value_of_mining_machine}}(BTWT)</text>
					<view>{{musInfo.taishu}} </view>
				</view>
				<view class="items">
					<text>{{i18n.Daily_earnings}}(BTWT)</text>
					<view>{{musInfo.sy_day}}</view>
				</view>
			</view>
			<view class="invites-title-bottom">
				<view class="items">
					{{i18n.Number_of_computing_power}}<text>{{musInfo.fereze}}{{i18n.station}}</text>
				</view>
				<view class="items">
					{{i18n.Hash_mining}}<text>{{musInfo.sy_num}} EH/S</text>
				</view>
			</view> -->
		</view>
		
		
		<view class="invest-container">
			
			<view class="invest-container-title">
				<view class="invest-container-title-l">
					{{i18n.Purchase_contract}}
				</view>
			<!-- 	<view class="invest-container-title-r" @tap.stop="toplan">
					{{i18n.my_mining}}
				</view> -->
			</view>
			<template v-if="list.length>0">
				<block v-for="(item,index) in list" :key="index">
					<view class="invest-container-list">
						<image src="../../static/imgs/invest-container-list.png" mode="widthFix" lazy-load></image>
						<view class="invest-container-con">
							<view class="items">
								<view class="items-title">
									{{item.title}}
								</view>
								<view class="items-container">
									<view class="items-container-t">
										<view>{{item.cb_num | formatParsefloat}}</view>
										<text>{{i18n.Total_revenue}}(USDT)</text>
									</view>
									<view class="items-container-t">
										<view>{{item.day_cb | formatParsefloat}} %</view>
										<text>{{i18n.day_for___value}}</text>
									</view>
								</view>
							</view>
							<view class="items-r">
								<text>{{i18n.Package_price}}</text>
								<view class="">{{item.freeze | formatParsefloat}} USDT</view>
								<button type="default" @tap.stop="buyin(item,index)">{{i18n.buy}}</button>
							</view>
						</view>
					</view>
				</block>
			</template>
			<template v-else>
				<view class="nodata" v-if="list.length == 0">{{i18n.nodata}}</view>
			</template>
		</view>
		
	</view>
</template>

<script>
import UniStatusBar from '@/components/uni-status-bar/uni-status-bar.vue'
import {fetch, showToast, pageto} from '@/common/js/util.js'
import {mapGetters, mapMutations} from 'vuex'
export default {
	data(){
		return{
			list:[],
			musInfo:{}
		}
	},
	onShow(){
		this.getList();
	},
	methods: {
		jumpD(){
			uni.navigateTo({
				url:'/pages/invest/reward'
			})
		},
		buyin(item, index) {
			console.log(item)
			let _data = {
				id: this.getLoginInfo.id,
				token: this.getLoginInfo.token
			}
			pageto(`./buy?day_cb=${item.day_cb}&day_fd=${item.day_fd}&day_zg=${item.day_zg}&title=${item.title}&shopid=${item.id}&freeze=${item.freeze}&cb_num=${item.cb_num}&sl=${item.sl}`)
			return
			fetch('/api/Shop/is_paypwd', _data, "post")
				.then(ret => {
					if (ret.statusCode == 200 && ret.data.code == 1) {
						pageto(`./buy?day_cb=${item.day_cb}&day_fd=${item.day_fd}&day_zg=${item.day_zg}&title=${item.title}&shopid=${item.id}&freeze=${item.freeze}`)
					} else {
						uni.showModal({
						    title: 'BTW',
						    content: (this.getLang == 1 ? "您现在还没有设置支付密码，现在去设置？" : "You have not set a payment password yet. Go to Settings now?"),
							confirmText: (this.getLang == 1 ? "去设置" : "Go"),
							cancelText: (this.getLang == 1 ? "取消" : "Cancel"),
						    success: function (res) {
						        if (res.confirm) {
									pageto('/pages/modify-pwd/modify-pwd')
						        } else if (res.cancel) {
						            console.log('用户点击取消');
						        }
						    }
						});
					}
				})
				.catch(err => {
					console.log(err)
				})
		},
		getList(){
			let data ={
				id:this.getLoginInfo.id,
				token:this.getLoginInfo.token
			}
			fetch('/api/Shop/shop_list', data, "POST")
				.then(res => {
					console.log(res)
					if (res.statusCode == 200 && res.data.code == 1) {
						console.log(res)
						this.list = res.data.data
						this.musInfo = res.data.msg
					} else {
						showToast(res.data.msg)
					}
				})
				.catch(err => {
					console.log(err)
				})
		},
		toplan() {
			pageto('./log')
		}
	},
	computed:{
		i18n() {
			return this.$t('message')
		},
		...mapGetters([
			'getLoginInfo',
			'getRequestUrl',
			'getLangType',
			'getTextArr',
			'getLang'
		])
	},
	components: {
		UniStatusBar
	}
}
</script>

<style lang="scss">
@import '@/common/scss/global.scss';
@import '@/common/scss/variable.scss';
page {
	background-color: $page-bg-color1;
}
.app-invest {
	.invites-top-bg{
		width: 750upx;
		height: 361upx;
		position: absolute;
		left: 0;
		top: 0;
		z-index: -1;
		image{
			width: 750upx;
			height: 361upx;
			flex-shrink: 0;
		}
	}
	.invites-title-top-nav{
		display: flex;
		// justify-content: right;
		flex-direction: row-reverse;
		text-align: right;
		align-items: center;
		margin: 94upx 30upx 0;
		image{
			width: 32upx;
			height: 33upx;
			flex-shrink: 0;
		}
		text{
			font-size: 30upx;
			color: $white;
		}
	}
	.invites-title{
		// background-color: #FFFFFF;
		border-radius: 20upx;
		overflow: hidden;
		image{
			width: 690upx;
			height: 302upx;
			flex-shrink: 0;
		}
		box-shadow: 2upx 5upx 50upx rgba(48, 205, 141,.4);
		margin: 52upx 30upx 60upx;
		.invites-title-top{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding:  50upx 0 60upx;
			.items{
				flex: 1;
				text-align: center;
				text{
					color: #009F5E;
					font-size: 22upx;
				}
				view{
					margin-top: 15upx;
					color: #009F5E;
					font-size: 54upx;
					font-weight: bold;
				}
			}
		}
		.invites-title-bottom{
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-top: 1upx solid #E0E0E0;
			position: relative;
			&::after{
				content: "";
				position: absolute;
				left: 50%;
				top: 0;
				height: 80upx;
				width: 1upx;
				background-color: #E0E0E0;
				transform: translateX(-50%);
			}
			.items{
				flex: 1;
				line-height: 80upx;
				text-align: center;
				font-size: 26upx;
				color: #009F5E;
				text{
					margin-left: 13upx;
				}
			}
		}
	}
	.invest-container{
		.invest-container-title{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.invest-container-title-l{
				position: relative;
				padding-left: 47upx;
				font-size: 40upx;
				color: #020202;
				font-weight: bold;
				&::before{
					content: "";
					position: absolute;
					left: 30upx;
					bottom:0;
					width: 6upx;
					height: 40upx;
					background-color: #009F5E;
				}
			}
			.invest-container-title-r{
				padding-right: 30upx;
				font-size: 26upx;
			}
		}
		.invest-container-list{
			padding: 67upx  65upx 0 58upx;
			margin-bottom: 30upx;
			position: relative;
			image{
				width: 749upx;
				height: 378upx;
				flex-shrink: 0;
				position: absolute;
				left: 0;
				top: 0;
				z-index: -1;
			}
			.invest-container-con{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.items{
					.items-title{
						font-size: 30upx;
						color: #020202;
						margin-bottom: 45upx;
					}
					.items-container{
						display: flex;
						align-items: center;
						.items-container-t{
							margin-right: 58upx;
							view{
								font-size: 36upx;
								color: #D81A01;
								margin-bottom: 15upx;
							}
							text{
								font-size: 22upx;
								color: #b3b3b3;
							}
						}
					}
					
				}
				.items-r{
					text-align: center;
					text{
						font-size: 24upx;
						color: #AEAEAE;
					}
					view{
						color: #009F5E;
						font-size: 36upx;
						margin:  15upx 0;
					}
					button{
						width: 180upx;
						height: 54upx;
						line-height: 54upx;
						text-align: center;
						color: #FFFFFF;
						font-size: 24upx;
						border-radius: 27upx;
						background: linear-gradient(to right,#079f67, #36c790);
					}
				}
			}
		}
	}
}
</style>
