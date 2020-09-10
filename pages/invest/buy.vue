<template>
	<view class="app-buy">
		<UniStatusBar bgc="transparent"></UniStatusBar>
		<UniNavBar leftIcon="arrow-left" :title="i18n.buy" @tapNavLeft="tapNavLeft"></UniNavBar>
		<view class="content">
			<view class="top">
				<view class="title">{{title}}</view>
				<view class="details">
					<view class="item">
						<text class="num green">{{sl | formatParsefloat}} %</text>
						<text class="txt">{{i18n.Daily_earnings}}</text>
					</view>
				<!-- 	<view class="item">
						<text class="num">{{day_fd | formatParsefloat}}%</text>
						<text class="txt">{{i18n.day_fd}}</text>
					</view> -->
					<view class="item">
						<text class="num">{{freeze | formatParsefloat}}USDT</text>
						<text class="txt">{{i18n.Contract_face_value}}</text>
					</view>
					<view class="item">
						<text class="num green">{{cb_num | formatParsefloat}} BTWT</text>
						<text class="txt">{{i18n.Total_revenue}}</text>
					</view>
				</view>
				<view class="split"></view>
				<view class="li">
					<view class="li_title">{{i18n.Buying_number}}</view>
					<input type="text" :placeholder="i18n.enter_buy_num" v-model="buyNum" />
					<view class="tip">{{i18n.xuyao}}{{(freeze * buyNum) | formatParsefloat}}USDT</view>
				</view>
				<view class="li">
					<view class="li_title">{{i18n.payCode}}</view>
					<input type="password" :placeholder="i18n.enter_six_num" v-model="buyPass" />
				</view>
			</view>
		</view>
		<view class="btn" :hover-class="computedBool ? 'hover-transform1' : 'none'" @tap.stop="showPop"  :style="{backgroundColor: bgc}">{{i18n.buy}}</view>
		
		
		<view class="popule" @tap.stop="showpopule=false" v-if="showpopule">
			<view class="popule-content" @tap.stop="">
				<view class="popule-title">{{i18n.prompt}}</view>
				<view class="close icon iconfont icon-cha" @tap.stop="showpopule=false"></view>
				
				<view class="popule-container">
					<view class="popule-container-li">
						<view>{{i18n.Deductions}}:{{buyNum}}</view>
					</view>
					<view class="popule-container-li">
						<view>{{i18n.deduction}}USDT{{i18n.__amount__}}:{{buyNum*freeze}}USDT</view>
					</view>
				</view>
				<view class="popule-bottom">
					<button type="default" @tap.stop="showpopule=false">{{i18n.cancel}}</button>
					<button type="default" @tap.stop="save">{{i18n.Confirm_purchase}}</button>
				</view>
				
			</view>
		</view>
		
	</view>
</template>

<script>
	import UniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import UniStatusBar from '@/components/uni-status-bar/uni-status-bar.vue'
	import {pageback, fetch, showToast} from '@/common/js/util.js'
	import {mapGetters, mapMutations} from 'vuex'
	export default {
		data() {
			return {
				showpopule:false,
				condition1: false,
				condition2: false,
				bgc: '',
				buyNum: '',
				buyPass: '',
				// onLoad
				title: '',
				day_cb: '',
				day_fd: '',
				day_zg: '',
				shopid: '',
				freeze: 0,
				// 最小和最高  购买额度
				buyMini: 500,
				buyMax: 10000,
				cb_num:'',
				sl:0,
				ischeck:false
			}
		},
		computed: {
			i18n(){
				return this.$t('message')
			},
			computedBool() {
				return this.condition1 && this.condition2
			},
			...mapGetters([
				'getRequestUrl',
				'getLoginInfo',
				'getLang'
			])
		},
		onShow() {
		},
		onLoad(e) {
			let {title, day_cb, day_fd, day_zg, shopid, freeze, cb_num, sl} = e
			console.log(e);
			this.title = title
			this.day_cb = day_cb
			this.day_fd = day_fd
			this.day_zg = day_zg
			this.shopid = shopid
			this.freeze = freeze
			this.cb_num = cb_num
			this.sl = sl
		},
		methods: {
			showPop(){
				this.showpopule = !this.showpopule
			},
			tapNavLeft() {
				pageback()
			},
			save() {
				if (!this.buyNum) {
					showToast(this.i18n.enter_buy_num)
					return
				}
				// if (this.buyNum < this.buyMini) {
				// 	showToast(this.i18n.buymini + this.buyMini)
				// 	return
				// }
				// if (this.buyNum > this.buyMax) {
				// 	showToast(this.i18n.buymax + this.buyMax)
				// 	return
				// }
				if (!this.buyPass) {
					showToast(this.i18n.enter_payment_code)
					return
				}
				if(this.ischeck) return;
				uni.showLoading()
				let _data = {
					id: this.getLoginInfo.id,
					token: this.getLoginInfo.token,
					lang_type: this.getLang,
					paypwd: this.buyPass,
					num: this.buyNum,
					shopid: this.shopid,
					token_id: 1
				}
				this.ischeck = true;
				// console.log(_data)
				fetch('/api/shop/buy_shop', _data, 'post')
					.then(res => {
						this.ischeck = false;
						// console.log(res)
						uni.hideLoading()
						this.showpopule = false
						if (res.statusCode == 200 && res.data.code == 1) {
							this.buyPass = ''
							this.buyNum =''
						}
						showToast(res.data.msg)
					})
					.catch(err => {
						this.ischeck = false;
						uni.hideLoading()
						console.log(err)
					})
			}
		},
		components: {
			UniStatusBar,
			UniNavBar
		},
		watch:  {
			buyPass(newv, oldv) {
				this.condition1 = !!newv
			},
			buyNum(newv, oldv) {
				this.condition2 = !!newv
			},
			computedBool(newv) {
				if (newv) {
					this.bgc = "#009F5E"
				} else {
					this.bgc = '#a4a4a4'
				}
			}
		}
	}
</script>

<style lang="scss">
@import '@/common/scss/variable.scss';
@import '@/common/scss/global.scss';
.popule{
	content: "";
	position: fixed;  
	top:0;  
	left:0;  
	z-index:8;  
	width:100%;  
	height:100vh;  
	background:rgba(0,0,0,0.4);
	z-index: 2;
	.popule-content{
		margin-left: 50%;
		margin-top: 30%;
		transform: translate(-50%);
		z-index: 9;
		width: 600upx;
		position: relative;
		border-radius: 20upx;
		overflow: hidden;
		background-color: $white;
		.popule-title{
			line-height: 100upx;
			color: #009f5e;
			font-size: 26upx;
			text-align: center;
			border-bottom: 1upx solid #e4e4e4;
		}
		.close{
			position: absolute;
			right: 30upx;
			top: 30upx;
		}
		.popule-container{
			padding: 0 30upx;
			.popule-container-li{
				display: flex;
				justify-content: space-between;
				align-items: center;
				view{
					line-height: 100upx;
					font-size: 26upx;
				}
				text{
					line-height: 100upx;
					font-size: 30upx;
				}
			}
		}
		.popule-bottom{
			margin-top: 30upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			button{
				flex: 1;
				text-align: center;
				line-height: 100upx;
				border-radius: 0;
				border: none;
				box-shadow: none;
				font-size: 28upx;
				&:first-of-type{
					border: none;
				}
				&:last-of-type{
					border: none;
					background-color: #009f5e;
					color: $white;
				}
			}
		}
	}
}
.app-buy {
	.title {
		margin: 20upx 30upx 0;
		border-bottom: 1upx solid $split-line-color2;
		font-size: 15px;
		color: $black;
		padding: 24upx 0;
		font-weight: 500;
	}
	.details {
		margin: 0 30upx;
		display: flex;
		flex-direction: row;
		height: 184upx;
		.item {
			flex: 1;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			.num {
				font-size: 20px;
				font-weight: bold;
				color: $black;
				&.green {
					color: $theme-color;
				}
			}
			.txt {
				font-size: 12px;
				margin-top: 13upx;
				color: $text-gray-color7;
			}
		}
	}
	.split {
		width: 750upx;
		height: 12upx;
		background-color: $split-line-color2;
	}
	.li {
		margin: 38upx 30upx 0;
		.li_title {
			font-size: 15px;
			font-weight: bold;
			color: $black;
		}
		input {
			height: 90upx;
			line-height: 90upx;
			color: $black;
			font-size: 13px;
			border-bottom: 1upx solid $split-line-color2;
		}
		.tip {
			font-size: 11px;
			margin-top: 16upx;
			color: $adorn-pink;
		}
	}
	.btn {
		position: fixed;
		left: 0;
		bottom: 0;
		background-color: $text-gray-color2;
		width: 750upx;
		height: 100upx;
		line-height: 100upx;
		text-align: center;
		font-size: 16px;
		color: $white;
		transition: all .2s linear;
	}
}
</style>
