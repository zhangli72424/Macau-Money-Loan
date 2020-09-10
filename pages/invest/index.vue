<template>
	<view class="app-invest">
		<UniStatusBar bgc="transparent"></UniStatusBar>
		<view class="pagetitle"><text>{{i18n.invest}}</text> <text class="toplan" @tap="toplan">{{i18n.my_mining}}</text></view>
		<view class="list">
			<block v-if="list.length > 0" v-for="(item,index) in list" :key="index">
				<view class="li">
					<image src="../../static/imgs/coin-icon01.png"></image>
					<view class="content">
						<view class="title">{{item.title}}</view>
						<view class="notes"><text class="note">{{i18n.Investment__range}}:{{(item.mini | formatParsefloat) + '-' + (item.max | formatParsefloat)}} BTW</text></view>
						<view class="notes"><text class="note">{{i18n.day_release}}: {{item.sl | formatParsefloat}} %</text></view>
						<view class="notes"><text class="note">{{i18n.day_for___value}}: {{item.day_cb | formatParsefloat}} %</text></view>
						<!-- <view class="percenter">{{freeze}} USDT</view> -->
					</view>
					<view class="btn" hover-class="hover-transform1" @tap="buyin(item,index)">{{i18n.invest}}</view>
				</view>
			</block>
		</view>
		<view class="nodata" v-if="list.length == 0">{{i18n.nodata}}</view>
	</view>
</template>

<script>
import UniStatusBar from '@/components/uni-status-bar/uni-status-bar.vue'
import {fetch, showToast, pageto} from '@/common/js/util.js'
import {mapGetters, mapMutations} from 'vuex'
export default {
	data(){
		return{
			list:[]
		}
	},
	onShow(){
		this.getList();
	},
	methods: {
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
	.pagetitle {
		display: flex;
		justify-content: space-between;
		.toplan{
			font-size: 13px;
			line-height: 40upx;
			font-weight: normal;
		}
	}
	.li {
		width: 690upx;
		height: 210upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0 30upx;
		background-color: $white;
		border-radius: 16upx;
		margin: 0 30upx 20upx;
		image {
			width: 80upx;
			height: 80upx;
			border-radius: 80upx;
			margin-right: 30upx;
		}
		.content {
			flex: 1;
			.title {
				font-size: 14px;
				color: $black;
				margin-bottom: 10upx;
				font-weight: bold;
				line-height: 1 !important;
			}
			.notes {
				.note {
					font-size: 11px;
					color: $black;
				}
				.note + .note {
					margin-left: 30upx;
				}
			}
			.percenter {
				font-size: 20px;
				color: $theme-color;
				font-weight: bold;
				margin-top: 32upx;
			}
		}
		.btn {
			background-color: $theme-color;
			width: 160upx;
			height: 60upx;
			border-radius: 8upx;
			color: $white;
			font-size: 15px;
			margin-left: 30upx;
			text-align: center;
			line-height: 60upx;
			transition: linear;
		}
	}
}
</style>
